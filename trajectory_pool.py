"""
轨迹池 TrajectoryPool
=====================
- 从 CSV 目录加载全部轨迹，按终点距离每 3px 分桶
- 输入目标距离 → 查桶 → 随机取一条 → 微扰动 → 返回纯整数轨迹
- 首次加载后导出 pool.json，后续毫秒级启动
- 桶内不足时跨桶借调 + 终点微调
- 失败追踪: mark_failed / mark_passed, 连续失败 3 次自动移除
"""
import json
import os
import random
import numpy as np
from pathlib import Path


class TrajectoryPool:
    def __init__(self, data_dir=None, pool_json=None, bucket_size=3, max_failures=3):
        self.bucket_size = bucket_size
        self.max_failures = max_failures  # 连续失败次数阈值
        self.buckets = {}        # {bucket_key: [{"id": int, "pts": [[x,y,t],...]}, ...]}
        self.all_trajs = []      # 扁平列表, 同上格式
        self.d_min = None
        self.d_max = None
        self.total = 0
        self.failures = {}       # {track_id_str: count}
        self.failures_path = None
        self.csv_dir = None      # 轨迹 CSV 目录, 用于删除

        if pool_json:
            self._load_pool(pool_json)
        elif data_dir:
            self._load_from_csv(data_dir)
        else:
            raise ValueError("需要 data_dir 或 pool_json 之一")

    # ============================================================
    # 核心接口: 输入距离 → 返回轨迹
    # ============================================================
    def get_track(self, distance, perturb=True, with_id=False):
        """
        参数:
          distance: 目标滑动距离 (px), 整数
          perturb:  是否微扰动 (防重放), 默认开启
          with_id:  是否返回轨迹 ID (用于失败追踪)
        返回:
          默认: [[x, y, time_ms], ...]  全部为 int
          with_id=True: ([[x,y,time_ms],...], track_id)
                       track_id 可能为 None (跨桶借调的合成轨迹)
        """
        distance = int(distance)
        bucket_key = self._bucket_key(distance)
        pool = self.buckets.get(bucket_key, [])
        available = [t for t in pool if self.failures.get(str(t["id"]), 0) < self.max_failures]

        if len(available) >= 3:
            traj_dict = random.choice(available)
            traj = self._deepcopy_traj(traj_dict["pts"])
            track_id = traj_dict["id"]
        elif len(available) > 0:
            traj_dict = random.choice(available)
            traj = self._deepcopy_traj(traj_dict["pts"])
            track_id = traj_dict["id"]
        else:
            traj = self._borrow_from_neighbor(distance)
            track_id = None

        if perturb:
            traj = self._perturb(traj)

        if with_id:
            return traj, track_id
        return traj

    # ============================================================
    # 批量生成 (验证用)
    # ============================================================
    def get_tracks(self, distance, n=10, perturb=True):
        tracks = []
        seen = set()
        for _ in range(n * 3):
            if len(tracks) >= n:
                break
            t = self.get_track(distance, perturb=perturb)
            fingerprint = self._fingerprint(t)
            if fingerprint not in seen:
                seen.add(fingerprint)
                tracks.append(t)
        return tracks

    # ============================================================
    # 失败追踪
    # ============================================================
    def mark_failed(self, track_id):
        """标记一次失败, 累计到 3 次从内存移除并持久化"""
        if track_id is None:
            return 0
        tid_str = str(track_id)
        self.failures[tid_str] = self.failures.get(tid_str, 0) + 1
        count = self.failures[tid_str]

        if count >= self.max_failures:
            self._remove_from_memory(track_id)
            print(f"[TrajectoryPool] 轨迹 traj_{track_id}.csv "
                  f"连续失败 {self.max_failures} 次, 已从池中移除")

        self._save_failures()
        return count

    def mark_passed(self, track_id):
        """标记一次成功, 清零失败计数"""
        if track_id is None:
            return
        tid_str = str(track_id)
        if self.failures.get(tid_str, 0) > 0:
            self.failures[tid_str] = 0
            self._save_failures()

    def list_broken(self, min_failures=None):
        """返回失败次数 >= min_failures 的轨迹
        参数:
          min_failures: 最小失败次数阈值, 默认使用 self.max_failures
        """
        threshold = min_failures if min_failures is not None else self.max_failures
        broken = []
        for tid_str, count in self.failures.items():
            if count >= threshold:
                tid = int(tid_str)
                broken.append((tid, count, f"traj_{tid}.csv"))
        broken.sort(key=lambda x: x[0])
        return broken

    def remove_broken(self, ids=None, min_failures=None):
        """删除坏轨迹的 CSV 文件
        参数:
          ids: 要删除的 ID 列表. None 表示删除失败次数 >= min_failures 的全部轨迹.
          min_failures: 最小失败次数阈值, 默认使用 self.max_failures
        """
        if ids is None:
            ids = [tid for tid, _, _ in self.list_broken(min_failures)]

        for tid in ids:
            if self.csv_dir:
                csv_path = os.path.join(self.csv_dir, f"traj_{tid}.csv")
                if os.path.exists(csv_path):
                    os.remove(csv_path)
                    print(f"  已删除: traj_{tid}.csv")
                else:
                    print(f"  文件不存在, 跳过: traj_{tid}.csv")

            self._remove_from_memory(tid)
            self.failures[str(tid)] = -1  # 标记为已删除

        self._save_failures()

    # ============================================================
    # 持久化: pool.json
    # ============================================================
    def save_pool(self, path="pool.json"):
        data = {
            "bucket_size": self.bucket_size,
            "total": self.total,
            "d_min": self.d_min,
            "d_max": self.d_max,
            "buckets": {str(k): v for k, v in self.buckets.items()},
        }
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f)
        size_kb = os.path.getsize(path) / 1024
        print(f"轨迹池已导出 → {path} ({size_kb:.0f} KB, {self.total} 条, "
              f"{len(self.buckets)} 个桶)")

    # ============================================================
    # 统计信息
    # ============================================================
    def stats(self):
        counts = [len(v) for v in self.buckets.values()]
        return {
            "total_trajs": self.total,
            "buckets": len(self.buckets),
            "d_range": (self.d_min, self.d_max),
            "avg_per_bucket": round(np.mean(counts), 1) if counts else 0,
            "max_in_bucket": max(counts) if counts else 0,
            "buckets_ge3": sum(1 for c in counts if c >= 3),
            "buckets_lt3": sum(1 for c in counts if c < 3),
            "poor_buckets": [
                (k, len(v)) for k, v in self.buckets.items() if len(v) < 3
            ],
            "broken_count": sum(1 for c in self.failures.values() if c >= self.max_failures),
        }

    # ============================================================
    # 内部: 从 CSV 加载
    # ============================================================
    def _load_from_csv(self, data_dir):
        import pandas as pd

        self.csv_dir = data_dir
        self.failures_path = os.path.join(
            os.path.dirname(os.path.normpath(data_dir)), "failures.json")
        self._load_failures()

        csv_files = sorted(Path(data_dir).glob("*.csv"))
        if not csv_files:
            raise FileNotFoundError(f"{data_dir} 中没有 CSV 文件")

        loaded_ids = set()
        disk_ids = set()        # 磁盘上实际存在的 CSV ID（含被跳过的）
        skipped = 0

        for fp in csv_files:
            try:
                track_id = int(fp.stem.split("_")[-1])
            except (ValueError, IndexError):
                track_id = len(disk_ids)  # fallback
            disk_ids.add(track_id)

            # 跳过已标记为失败或已删除的
            fc = self.failures.get(str(track_id), 0)
            if fc >= self.max_failures or fc == -1:
                skipped += 1
                continue
            loaded_ids.add(track_id)

            df = pd.read_csv(fp)
            x = df["x"].values.astype(int)
            y = df["y"].values.astype(int)
            t = df["time_ms"].values.astype(int)

            D = int(x[-1])
            if D <= 0:
                continue

            pts = [[int(x[i]), int(y[i]), int(t[i])] for i in range(len(x))]
            self._add_traj({"id": track_id, "pts": pts}, D)

        # 清理 failures.json 中磁盘上已不存在的条目
        stale = [tid for tid in self.failures if int(tid) not in disk_ids]
        for tid in stale:
            self.failures[tid] = -1

        if skipped > 0:
            print(f"已跳过 {skipped} 条失败/已删除的轨迹")
        if stale:
            self._save_failures()

        print(f"从 CSV 加载: {self.total} 条轨迹, "
              f"距离 {self.d_min}~{self.d_max}, {len(self.buckets)} 个桶")

    def _add_traj(self, traj_dict, D):
        self.all_trajs.append(traj_dict)
        bk = self._bucket_key(D)
        self.buckets.setdefault(bk, []).append(traj_dict)
        self.total += 1
        if self.d_min is None:
            self.d_min = D
            self.d_max = D
        else:
            self.d_min = min(self.d_min, D)
            self.d_max = max(self.d_max, D)

    # ============================================================
    # 内部: 从 pool.json 加载
    # ============================================================
    def _load_pool(self, path):
        pool_dir = os.path.dirname(os.path.abspath(path))
        self.failures_path = os.path.join(pool_dir, "failures.json")
        # 推导 CSV 目录 (pool.json 在 滑块轨迹记录/, CSV 在 滑块轨迹记录/轨迹收集/)
        self.csv_dir = os.path.join(pool_dir, "轨迹收集")
        self._load_failures()

        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)

        self.bucket_size = data["bucket_size"]
        self.d_min = data["d_min"]
        self.d_max = data["d_max"]
        skipped = 0

        for bk_str, trajs in data["buckets"].items():
            bk = int(bk_str)
            for t in trajs:
                if isinstance(t, dict):
                    # 新格式: {"id": 137, "pts": [[...], ...]}
                    tid = t["id"]
                    pts = t["pts"]
                else:
                    # 旧格式兼容: 纯点列表, 无 ID (按顺序分配)
                    tid = len(self.all_trajs)
                    pts = t

                fc = self.failures.get(str(tid), 0)
                if fc >= self.max_failures or fc == -1:
                    skipped += 1
                    continue

                self._add_traj({"id": tid, "pts": pts}, pts[-1][0])

        if skipped > 0:
            print(f"已跳过 {skipped} 条失败/已删除的轨迹")
        print(f"从 pool.json 加载: {self.total} 条轨迹, "
              f"{len(self.buckets)} 个桶, {os.path.getsize(path) / 1024:.0f}KB")

    # ============================================================
    # 内部: failures.json
    # ============================================================
    def _load_failures(self):
        if self.failures_path and os.path.exists(self.failures_path):
            with open(self.failures_path, "r", encoding="utf-8") as f:
                self.failures = json.load(f)
        else:
            self.failures = {}

    def _save_failures(self):
        if not self.failures_path:
            return
        clean = {k: v for k, v in self.failures.items() if v not in (0, -1)}
        if clean:
            with open(self.failures_path, "w", encoding="utf-8") as f:
                json.dump(clean, f, indent=2)
        elif os.path.exists(self.failures_path):
            os.remove(self.failures_path)

    # ============================================================
    # 内部: 分桶键
    # ============================================================
    def _bucket_key(self, distance):
        return int(np.floor(distance / self.bucket_size)) * self.bucket_size

    # ============================================================
    # 内部: 跨桶借调
    # ============================================================
    def _borrow_from_neighbor(self, distance):
        """从相邻桶借一条轨迹, 跳过已失败的, 必要时微调终点"""
        for offset in range(self.bucket_size, self.bucket_size * 10, self.bucket_size):
            for direction in (-1, 1):
                neighbor_key = self._bucket_key(distance + offset * direction)
                pool = self.buckets.get(neighbor_key, [])
                available = [t for t in pool if self.failures.get(str(t["id"]), 0) < self.max_failures]
                if available:
                    traj_dict = random.choice(available)
                    traj = self._deepcopy_traj(traj_dict["pts"])
                    return self._adjust_endpoint(traj, distance)

        # 兜底: 全局随机 (也跳过已失败)
        available_all = [t for t in self.all_trajs if self.failures.get(str(t["id"]), 0) < self.max_failures]
        if available_all:
            traj_dict = random.choice(available_all)
        else:
            traj_dict = random.choice(self.all_trajs)  # 最后手段
        traj = self._deepcopy_traj(traj_dict["pts"])
        return self._adjust_endpoint(traj, distance)

    def _adjust_endpoint(self, traj, target_d):
        """微调轨迹终点到目标距离 (差距 <=5px, 末尾增删微调点)"""
        current_d = traj[-1][0]
        diff = target_d - current_d

        if diff == 0:
            return traj

        if -2 <= diff <= 2:
            if diff > 0:
                for _ in range(diff):
                    last = traj[-1]
                    traj.append([
                        last[0] + 1,
                        last[1] + random.randint(-1, 1),
                        last[2] + random.randint(15, 35),
                    ])
            else:
                traj.append([
                    target_d,
                    traj[-1][1] + random.randint(-1, 1),
                    traj[-1][2] + random.randint(30, 60),
                ])
        else:
            factor = target_d / max(current_d, 1)
            for i in range(max(0, len(traj) - 5), len(traj)):
                traj[i][0] = int(round(traj[i][0] * factor))
            traj[-1][0] = target_d

        return traj

    # ============================================================
    # 内部: 微扰动 (防重放, 全整数)
    # ============================================================
    def _perturb(self, traj):
        n = len(traj)
        prev_t = 0
        for i in range(n):
            if i == 0:
                traj[i][2] = 0
            else:
                dt = traj[i][2] - traj[i - 1][2]
                dt_new = max(1, dt + random.randint(-2, 2))
                prev_t += dt_new
                traj[i][2] = prev_t

        for i in range(1, n - 1):
            if random.random() < 0.30:
                traj[i][1] += random.choice([-1, 0, 1])

        if n >= 2:
            last_dt = traj[-1][2] - traj[-2][2]
            if last_dt > 100:
                traj[-1][2] = traj[-2][2] + last_dt + random.randint(-40, 40)

        return traj

    # ============================================================
    # 内部: 从内存移除
    # ============================================================
    def _remove_from_memory(self, track_id):
        for bk in list(self.buckets.keys()):
            self.buckets[bk] = [t for t in self.buckets[bk] if t["id"] != track_id]
        self.all_trajs = [t for t in self.all_trajs if t["id"] != track_id]
        self.total = len(self.all_trajs)

    # ============================================================
    # 工具
    # ============================================================
    def _deepcopy_traj(self, traj):
        return [[x, y, t] for x, y, t in traj]

    def _fingerprint(self, traj):
        return (
            traj[-1][0],
            traj[-1][2],
            len(traj),
            traj[len(traj) // 2][0],
        )


# ============================================================
# 便捷函数: 一步构建 + 导出
# ============================================================
def build_pool(csv_dir="./轨迹收集/", output="pool.json"):
    """从 CSV 目录构建轨迹池并导出 pool.json"""
    pool = TrajectoryPool(data_dir=csv_dir)
    pool.save_pool(output)
    stats = pool.stats()
    print(f"\n统计: {stats['total_trajs']} 条, {stats['buckets']} 个桶, "
          f"桶均 {stats['avg_per_bucket']} 条")
    poor = stats["poor_buckets"]
    if poor:
        print(f"弹药不足桶: {poor}")
    else:
        print("全部桶 >=3 条")
    return pool


# ============================================================
# 自测
# ============================================================
if __name__ == "__main__":
    pool = build_pool("./轨迹收集/", "pool.json")


    # data= pool.get_track(111)
    # print(data)

    # print(pool.failures)  # 看看有哪些失败记录
    # print(pool.list_broken())  # 看看 ≥3 次的有哪些
    print(pool.remove_broken(min_failures=1))

