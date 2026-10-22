
# from curl_cffi import requests
import requests
import time
import execjs
import re
import pprint
import json
from PIL import Image
import cv2
import random
import math
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
from trajectory_pool import TrajectoryPool


# 轨迹池单例 (首次加载 pool.json, 21ms)
_pool = TrajectoryPool(pool_json=os.path.join(os.path.dirname(os.path.abspath(__file__)), "../pool.json"))

with open("w_3.js", "r", encoding="utf-8") as f:
    js_code2 = f.read()
    js_run2=execjs.compile(js_code2)

with open("w_2.js","r",encoding="utf-8") as f:
    js_code1 = f.read()
    js_run1=execjs.compile(js_code1)

Ut = [
    39, 38, 48, 49, 41, 40, 46, 47, 35, 34, 50, 51,
    33, 32, 28, 29, 27, 26, 36, 37, 31, 30, 44, 45,
    43, 42, 12, 13, 23, 22, 14, 15, 21, 20, 8, 9,
    25, 24, 6, 7, 3, 2, 0, 1, 11, 10, 4, 5,
    19, 18, 16, 17
]
headers = {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "referer": "https://demos.geetest.com/",
    "sec-ch-ua": "\"Microsoft Edge\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "script",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0"
}

session =requests.session()

def generate_e_e():
    #密钥生成
    return ''.join(random.choice('0123456789abcdef') for _ in range(16))

def get_html():
    headers = {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "priority": "u=0, i",
        "sec-ch-ua": "\"Microsoft Edge\";v=\"149\", \"Chromium\";v=\"149\", \"Not)A;Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0"
    }
    url = 'https://demos.geetest.com/slide-float.html'
    response = session.get(url, headers=headers)

def get_challenge():
    url = "https://demos.geetest.com/gt/register-slide"

    params = {
        "t": round(time.time()*1000)
    }
    response =session.get(url, headers=headers, params=params)
    # print(response.text)
    # print(response)
    challenge=response.json()["challenge"]
    gt=response.json()["gt"]
    return challenge,gt

def get_one_w(challenge,e_e):
    w_1 = js_run1.call("get_w1", challenge,e_e)
    # print(w_1)
    cookies = {
        "GeeTestUser": "40decf42d2203749083f0c72c2b71f19",
        "language": "zh",
        "sensorsdata2015jssdkcross": "%7B%22distinct_id%22%3A%2219da07007d487e-0b9855f7268eda8-4c657b58-1821369-19da07007d521da%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Fwww.geetest.com%2Fadaptive-captcha%22%2C%22%24latest_utm_source%22%3A%22baidu%22%2C%22%24latest_utm_medium%22%3A%22cpc%22%2C%22%24latest_utm_campaign%22%3A%22%E7%99%BE%E5%BA%A6SEM%22%2C%22%24latest_utm_content%22%3A%22%E5%93%81%E7%89%8C%E8%AF%8D%E7%B3%BB%E5%88%97%22%2C%22%24latest_utm_term%22%3A%22%E6%9E%81%E9%AA%8C%22%7D%2C%22%24device_id%22%3A%2219da07007d487e-0b9855f7268eda8-4c657b58-1821369-19da07007d521da%22%7D",
        "Hm_lvt_25b04a5e7a64668b9b88e2711fb5f0c4": "1776513190,1776516537"
    }
    url = "https://apiv6.geetest.com/get.php"
    params = {
        "gt": "019924a82c70bb123aae90d483087f94",
        "challenge": challenge,
        "lang": "zh-cn",
        "pt": "0",
        "client_type": "web",
        "w": w_1,     #不能置成”“，随可以成功访问但后面不返回背景图等url
        "callback": "geetest_"+str(round(time.time()*1000))
    }
    response = session.get(url, headers=headers, params=params)
    # print("-----------------\n",response.text)
    s = re.search(r'"s":\s*"([^"]*)"', response.text).group(1)
    # print(s)
    return s

def get_two_w(challenge,gt,s,e_e):
    w_2 = js_run1.call("get_w_2", challenge,gt,s,e_e)
    # print(w_2)
    url = "https://api.geevisit.com/ajax.php"
    params = {
        "gt": gt,
        "challenge":challenge ,
        "lang": "zh-cn",
        "pt": "0",
        "client_type": "web",
        "w": w_2,  #也不能置空“”。虽然后续返回正常结果，但challenge已经被污染返回不了正常通过结果
        "callback": "geetest_"+str(round(time.time()*1000))
    }
    response = session.get(url, headers=headers, params=params)
    # GeeTestAjaxUser = response.cookies.get("GeeTestAjaxUser")
    # print("w2的返回结果：",response.text)

def get_pic(challenge,gt):
    # print(challenge)
    url = "https://api.geevisit.com/get.php"
    params = {
        "is_next": "true",
        "type": "slide3",
        "gt": gt,
        "challenge": challenge,
        "lang": "zh-cn",
        "https": "true",
        "protocol": "https://",
        "offline": "false",
        "product": "embed",
        "api_server": "api.geevisit.com",
        "isPC": "true",
        "autoReset": "true",
        "width": "100%",
        "callback": "geetest_1776842501554"
    }
    response = requests.get(url, headers=headers, params=params)
    # print(response.text)
    json_list = re.findall(r'geetest_\d+\((.*?)\)', response.text,re.S)
    # pprint.pprint(json_list)
    dict_text=json.loads(json_list[0])
    bg_url_part =dict_text["bg"]
    slice_url_part =dict_text["slice"]
    s_s = dict_text["s"]
    challenge_new =dict_text["challenge"]
    bg_url= "https://static.geetest.com/"+bg_url_part
    slice_url = "https://static.geetest.com/"+slice_url_part
    # print(s_s)
    return bg_url,slice_url,s_s,challenge_new

def load_picture(bg_url,slice_url):
    bg_img=requests.get(bg_url,headers=headers)
    slice_img=requests.get(slice_url,headers=headers)
    with open("bg.jpg","wb") as f:
        f.write(bg_img.content)
    with open("slice.jpg","wb") as f:
        f.write(slice_img.content)

def restore_slider(scrambled_path, output_path):
    # 打开打乱的图片
    img = Image.open(scrambled_path)
    a = 80                     # 每个小块的高度
    target_w = 260             # 26列 × 10px
    target_h = 160             # 2行 × 80px
    restored = Image.new('RGB', (target_w, target_h))
    for dst_idx in range(52):
        src_idx = Ut[dst_idx]          # 源块在打乱图中的索引
        col = src_idx % 26
        row = 0 if src_idx < 26 else 1
        # 源图中的裁剪区域（宽10，高80，x 偏移 +1）
        src_x = col * 12 + 1
        src_y = row * a
        box = (src_x, src_y, src_x + 10, src_y + a)

        # 目标图中的粘贴位置
        dst_col = dst_idx % 26
        dst_row = 0 if dst_idx < 26 else 1
        dst_x = dst_col * 10
        dst_y = dst_row * a

        region = img.crop(box)
        restored.paste(region, (dst_x, dst_y))

    restored.save(output_path)
    # print(f"还原完成，保存至：{output_path}")

def get_distance_robust(bg_path, slider_path):
    """
    鲁棒性模板匹配：先对图像进行Canny边缘检测，再用边缘图匹配。
    适用于滑块在任意位置，尤其能减少背景干扰。
    返回缺口左上角坐标 (x, y)
    """
    # 读取原图（彩色，因为后续Canny需要灰度图，但滑块可能需要透明通道处理）
    bg = cv2.imread(bg_path)
    slider = cv2.imread(slider_path, cv2.IMREAD_UNCHANGED)

    if bg is None or slider is None:
        print("图片读取失败")
        return None

    # 处理滑块图：提取掩码（如果有透明通道），并转为灰度
    if slider.shape[2] == 4:
        # 分离BGR和Alpha
        slider_bgr = slider[:, :, :3]
        slider_alpha = slider[:, :, 3]
        # 二值化掩码（透明部分为0，不透明为255）
        _, mask = cv2.threshold(slider_alpha, 10, 255, cv2.THRESH_BINARY)
        slider_gray = cv2.cvtColor(slider_bgr, cv2.COLOR_BGR2GRAY)
    else:
        slider_gray = cv2.cvtColor(slider, cv2.COLOR_BGR2GRAY)
        mask = None

    # 背景图转为灰度
    bg_gray = cv2.cvtColor(bg, cv2.COLOR_BGR2GRAY)

    # 对背景图和滑块图进行Canny边缘检测
    bg_edges = cv2.Canny(bg_gray, 50, 150)
    slider_edges = cv2.Canny(slider_gray, 50, 150)

    # 如果滑块有掩码，也对掩码进行边缘检测？不需要，因为掩码在匹配时使用。
    # 边缘匹配时也可以使用掩码，但这里为了简单，如果掩码存在，将滑块边缘图中掩码外的区域置0
    if mask is not None:
        slider_edges = cv2.bitwise_and(slider_edges, mask)

    # 模板匹配（用边缘图）
    result = cv2.matchTemplate(bg_edges, slider_edges, cv2.TM_CCOEFF_NORMED)
    _, _, _, max_loc = cv2.minMaxLoc(result)
    x, y = max_loc

    print(f"左上角坐标: x={x}, y={y}")
    return x, y

def get_validate(challenge,passtime,t,guiji,s,gt,e_e):

    w_3 = js_run2.call("get_w3",challenge,passtime,t,guiji,s,e_e)

    url = "https://api.geevisit.com/ajax.php"
    params = {
        "gt": gt,
        "challenge": challenge,
        "lang": "zh-cn",
        "%24_BCm": "0",
        "client_type": "web",
        "w": w_3,
        "callback": "geetest_"+str(round(time.time()*1000))
    }

    response = requests.get(url, headers=headers, params=params)

    print(response.text)

def main():
    e_e = generate_e_e()
    get_html()
    challenge,gt = get_challenge()
    s = get_one_w(challenge,e_e)
    #无感验证
    get_two_w(challenge, gt, s,e_e)
    bg_url, slice_url,s_s,challenge_new= get_pic(challenge,gt)#获取滑块的下载网址
    load_picture(bg_url,slice_url)#下载图片
    restore_slider('./bg.jpg', './bg_hy.jpg')#还原图片
   #得到滑块的滑动距离
    x, y = get_distance_robust("bg_hy.jpg", "slice.jpg")
    #生成滑块轨迹
    distance = x+2 # 需要滑动的距离
    # print(challenge)
    # print( challenge_new,s_s)
    guiji = _pool.get_track(distance)
    guiji.insert(0, [-39,-10,0])
    # print(guiji)
    total_time = guiji[-1][2]
    get_validate(challenge_new,total_time ,distance,guiji,s_s,gt,e_e)



if __name__ == '__main__':
    for i in range(1,10):
        time.sleep(1)
        main()


