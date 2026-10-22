const crypto = require("crypto");
const forge = require("node-forge");
const CryptoJS = require("crypto-js");

function rsaEncrypt(plainText, modulusHex, exponentHex = "10001") {
    // 1. 转换为 forge 的大整数
    const n = new forge.jsbn.BigInteger(modulusHex, 16);
    const e = new forge.jsbn.BigInteger(exponentHex, 16);

    // 2. 生成 PEM 格式公钥
    const rsaKey = forge.pki.setRsaPublicKey(n, e);
    const pem = forge.pki.publicKeyToPem(rsaKey);  // -----BEGIN PUBLIC KEY-----

    // 3. 使用 Node.js 内置 crypto 进行 RSA 加密（PKCS#1 v1.5 填充）
    const encrypted = crypto.publicEncrypt(
        {
            key: pem,
            padding: crypto.constants.RSA_PKCS1_PADDING
        },
        Buffer.from(plainText, "utf8")
    );
    return encrypted.toString("hex");
}

function e() {
    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
}

p = {
        "\u0024\u005f\u0046\u004a\u0050": {
            "\u0024\u005f\u0047\u0041\u0046": 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()',
            "\u0024\u005f\u0047\u0042\u006e": '.',
            "\u0024\u005f\u0047\u0043\u0043": 7274496,
            "\u0024\u005f\u0047\u0044\u006e": 9483264,
            "\u0024\u005f\u0047\u0045\u005f": 19220,
            "\u0024\u005f\u0047\u0046\u0071": 235,
            "\u0024\u005f\u0047\u0047\u0048": 24
        },
        "\u0024\u005f\u0047\u0041\u0046": 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()',
        "\u0024\u005f\u0047\u0042\u006e": '.',
        "\u0024\u005f\u0047\u0043\u0043": 7274496,
        "\u0024\u005f\u0047\u0044\u006e": 9483264,
        "\u0024\u005f\u0047\u0045\u005f": 19220,
        "\u0024\u005f\u0047\u0046\u0071": 235,
        "\u0024\u005f\u0047\u0047\u0048": 24,
        "\u0024\u005f\u0047\u0048\u0055": function(e) {
            var $_IIIY = Vwtrj.$_CV
              , $_IIHc = ['$_IJBq'].concat($_IIIY)
              , $_IIJP = $_IIHc[1];
            $_IIHc.shift();
            var $_IJAb = $_IIHc[0];
            for (var t = [], n = 0, r = e[$_IIIY(71)]; n < r; n += 1)
                t[$_IIJP(67)](e[$_IIIY(49)](n));
            return t;
        },
        "\u0024\u005f\u0047\u0049\u0057": function(e) {
            var $_IJDj = Vwtrj.$_CV
              , $_IJCf = ['$_IJGn'].concat($_IJDj)
              , $_IJEb = $_IJCf[1];
            $_IJCf.shift();
            var $_IJFg = $_IJCf[0];
            for (var t = $_IJDj(239), n = 0, r = e[$_IJEb(71)]; n < r; n += 1)
                t += String[$_IJDj(456)](e[n]);
            return t;
        },
        "\u0024\u005f\u0047\u004a\u005f": function(e) {
            var t = this['$_GAF'];
            return e < 0 || e >= t['length'] ? '.' : t['charAt'](e);
        },
        "\u0024\u005f\u0048\u0041\u0041": function(e) {
            var $_JADa = Vwtrj.$_CV
              , $_JACl = ['$_JAGW'].concat($_JADa)
              , $_JAEe = $_JACl[1];
            $_JACl.shift();
            var $_JAFg = $_JACl[0];
            return this[$_JAEe(421)][$_JAEe(396)](e);
        },
        "\u0024\u005f\u0048\u0042\u005a": function(e, t) {
            return e >> t & 1;
        },
        "\u0024\u005f\u0048\u0043\u0042": function(e, o) {
            var i = this;
            o || (o = i);
            for (var t = function(e, t) {
                for (var n = 0, r = o["$_GGH"] - 1; 0 <= r; r -= 1)
                    1 === i["$_HBZ"](t, r) && (n = (n << 1) + i['$_HBZ'](e, r));
                return n;
            }, n = '', r = '', s = e['length'], a = 0; a < s; a += 3) {
                var _;
                if (a + 2 < s)
                    _ = (e[a] << 16) + (e[a + 1] << 8) + e[a + 2],
                    n += i['$_GJ_'](t(_, o['$_GCC'])) + i['$_GJ_'](t(_, o['$_GDn'])) + i['$_GJ_'](t(_, o['$_GE_'])) + i['$_GJ_'](t(_, o['$_GFq']));
                else {
                    var c = s % 3;
                    2 == c ? (_ = (e[a] << 16) + (e[a + 1] << 8),
                    n += i['$_GJ_'](t(_, o['$_GCC'])) + i['$_GJ_'](t(_, o['$_GDn'])) + i['$_GJ_'](t(_, o['$_GE_'])),
                    r = o['$_GBn']) : 1 == c && (_ = e[a] << 16,
                    n += i['$_GJ_'](t(_, o['$_GCC'])) + i['$_GJ_'](t(_, o['$_GDn'])),
                    r = o['$_GBn'] + o['$_GBn']);
                }
            }
            return {
                "\u0072\u0065\u0073": n,
                "\u0065\u006e\u0064": r
            };
        },
        "\u0024\u005f\u0048\u0044\u006c": function(e) {
            var $_JCDa = Vwtrj.$_CV
              , $_JCCR = ['$_JCGG'].concat($_JCDa)
              , $_JCEQ = $_JCCR[1];
            $_JCCR.shift();
            var $_JCFr = $_JCCR[0];
            var t = this[$_JCDa(497)](this[$_JCEQ(473)](e));
            return t[$_JCEQ(485)] + t[$_JCEQ(418)];
        },
        "\u0024\u005f\u0048\u0045\u004a": function(e) {
            var $_JCIT = Vwtrj.$_CV
              , $_JCHS = ['$_JDBx'].concat($_JCIT)
              , $_JCJA = $_JCHS[1];
            $_JCHS.shift();
            var $_JDAg = $_JCHS[0];
            var t = this[$_JCJA(497)](e);
            return t[$_JCJA(485)] + t[$_JCJA(418)];
        },
        "\u0024\u005f\u0048\u0046\u007a": function(e, i) {
            var $_JDDs = Vwtrj.$_CV
              , $_JDCf = ['$_JDGH'].concat($_JDDs)
              , $_JDEw = $_JDCf[1];
            $_JDCf.shift();
            var $_JDFu = $_JDCf[0];
            var s = this;
            i || (i = s);
            for (var t = function(e, t) {
                var $_JDIs = Vwtrj.$_CV
                  , $_JDHw = ['$_JEBp'].concat($_JDIs)
                  , $_JDJs = $_JDHw[1];
                $_JDHw.shift();
                var $_JEAz = $_JDHw[0];
                if (e < 0)
                    return 0;
                for (var n = 5, r = 0, o = i[$_JDJs(406)] - 1; 0 <= o; o -= 1)
                    1 === s[$_JDJs(435)](t, o) && (r += s[$_JDJs(435)](e, n) << o,
                    n -= 1);
                return r;
            }, n = e[$_JDDs(71)], r = $_JDEw(239), o = 0; o < n; o += 4) {
                var a = t(s[$_JDEw(490)](e[$_JDEw(433)](o)), i[$_JDEw(419)]) + t(s[$_JDEw(490)](e[$_JDEw(433)](o + 1)), i[$_JDEw(487)]) + t(s[$_JDDs(490)](e[$_JDEw(433)](o + 2)), i[$_JDDs(452)]) + t(s[$_JDDs(490)](e[$_JDDs(433)](o + 3)), i[$_JDEw(431)])
                  , _ = a >> 16 & 255;
                if (r += String[$_JDDs(456)](_),
                e[$_JDEw(433)](o + 2) !== i[$_JDEw(471)]) {
                    var c = a >> 8 & 255;
                    if (r += String[$_JDEw(456)](c),
                    e[$_JDEw(433)](o + 3) !== i[$_JDEw(471)]) {
                        var l = 255 & a;
                        r += String[$_JDDs(456)](l);
                    }
                }
            }
            return r;
        },
        "\u0024\u005f\u0048\u0047\u0066": function(e) {
            var $_JEDm = Vwtrj.$_CV
              , $_JECr = ['$_JEGl'].concat($_JEDm)
              , $_JEEI = $_JECr[1];
            $_JECr.shift();
            var $_JEFd = $_JECr[0];
            var t = 4 - e[$_JEDm(71)] % 4;
            if (t < 4)
                for (var n = 0; n < t; n += 1)
                    e += this[$_JEDm(471)];
            return this[$_JEEI(466)](e);
        },
        "\u0024\u005f\u0048\u0048\u006c": function(e) {
            var $_JEIQ = Vwtrj.$_CV
              , $_JEHM = ['$_JFBl'].concat($_JEIQ)
              , $_JEJT = $_JEHM[1];
            $_JEHM.shift();
            var $_JFAF = $_JEHM[0];
            return this[$_JEJT(495)](e);
        }
    }

function H(e) {
            var $_DDABJ = 19;
            for (; $_DDABJ !== 18; ) {
                switch ($_DDABJ) {
                case 19:
                    function _(e, t) {
                        var $_DDACf = 19;
                        for (; $_DDACf !== 18; ) {
                            switch ($_DDACf) {
                            case 19:
                                return e << t | e >>> 32 - t;
                                break;
                            }
                        }
                    }
                    function c(e, t) {
                        var $_DDADB = 19;
                        for (; $_DDADB !== 18; ) {
                            switch ($_DDADB) {
                            case 19:
                                var n, r, o, i, s;
                                return o = 2147483648 & e,
                                i = 2147483648 & t,
                                s = (1073741823 & e) + (1073741823 & t),
                                (n = 1073741824 & e) & (r = 1073741824 & t) ? 2147483648 ^ s ^ o ^ i : n | r ? 1073741824 & s ? 3221225472 ^ s ^ o ^ i : 1073741824 ^ s ^ o ^ i : s ^ o ^ i;
                                break;
                            }
                        }
                    }
                    function t(e, t, n, r, o, i, s) {
                        var $_DDAEN = 19;
                        for (; $_DDAEN !== 18; ) {
                            switch ($_DDAEN) {
                            case 19:
                                return c(_(e = c(e, c(c(function a(e, t, n) {
                                    return e & t | ~e & n;
                                }(t, n, r), o), s)), i), t);
                                break;
                            }
                        }
                    }
                    function n(e, t, n, r, o, i, s) {
                        var $_DDAFP =19;
                        for (; $_DDAFP !== 18; ) {
                            switch ($_DDAFP) {
                            case 19:
                                return c(_(e = c(e, c(c(function a(e, t, n) {
                                    return e & n | t & ~n;
                                }(t, n, r), o), s)), i), t);
                                break;
                            }
                        }
                    }
                    function r(e, t, n, r, o, i, s) {
                        var $_DDAGr = 19;
                        for (; $_DDAGr !== 18; ) {
                            switch ($_DDAGr) {
                            case 19:
                                return c(_(e = c(e, c(c(function a(e, t, n) {
                                    return e ^ t ^ n;
                                }(t, n, r), o), s)), i), t);
                                break;
                            }
                        }
                    }
                    function o(e, t, n, r, o, i, s) {
                        var $_DDAHx = 19;
                        for (; $_DDAHx !== 18; ) {
                            switch ($_DDAHx) {
                            case 19:
                                return c(_(e = c(e, c(c(function a(e, t, n) {
                                    return t ^ (e | ~n);
                                }(t, n, r), o), s)), i), t);
                                break;
                            }
                        }
                    }
                    function i(e) {
                        var $_DDAIG = 19;
                        for (; $_DDAIG !== 16; ) {
                            switch ($_DDAIG) {
                            case 19:
                                var t, n = '', r = '';
                                $_DDAIG = 18;
                                break;
                            case 18:
                                for (t = 0; t <= 3; t++)
                                    n += (r = '0' + (e >>> 8 * t & 255)['toString'](16))['substr'](r['length'] - 2, 2);
                                $_DDAIG = 17;
                                break;
                            case 17:
                                return n;
                                break;
                            }
                        }
                    }
                    var s, a, l, u, p, h, f, d, g, v;
                    for (s = function m(e) {
                        var t, n = e['length'], r = n + 8, o = 16 * (1 + (r - r % 64) / 64), i = Array(o - 1), s = 0, a = 0;
                        while (a < n)
                            s = a % 4 * 8,
                            i[t = (a - a % 4) / 4] = i[t] | e['charCodeAt'](a) << s,
                            a++;
                        return s = a % 4 * 8,
                        i[t = (a - a % 4) / 4] = i[t] | 128 << s,
                        i[o - 2] = n << 3,
                        i[o - 1] = n >>> 29,
                        i;
                    }(e = function x(e) {
                        e = e['replace'](/\r\n/g, '\n');
                        for (var t = '', n = 0; n < e['length']; n++) {
                            var r = e['charCodeAt'](n);
                            r < 128 ? t += String['fromCharCode'](r) : (127 < r && r < 2048 ? t += String['fromCharCode'](r >> 6 | 192) : (t += String['fromCharCode'](r >> 12 | 224),
                            t += String['fromCharCode'](r >> 6 & 63 | 128)),
                            t += String['fromCharCode'](63 & r | 128));
                        }
                        return t;
                    }(e)),
                    f = 1732584193,
                    d = 4023233417,
                    g = 2562383102,
                    v = 271733878,
                    a = 0; a < s['length']; a += 16)
                        d = o(d = o(d = o(d = o(d = r(d = r(d = r(d = r(d = n(d = n(d = n(d = n(d = t(d = t(d = t(d = t(u = d, g = t(p = g, v = t(h = v, f = t(l = f, d, g, v, s[a + 0], 7, 3614090360), d, g, s[a + 1], 12, 3905402710), f, d, s[a + 2], 17, 606105819), v, f, s[a + 3], 22, 3250441966), g = t(g, v = t(v, f = t(f, d, g, v, s[a + 4], 7, 4118548399), d, g, s[a + 5], 12, 1200080426), f, d, s[a + 6], 17, 2821735955), v, f, s[a + 7], 22, 4249261313), g = t(g, v = t(v, f = t(f, d, g, v, s[a + 8], 7, 1770035416), d, g, s[a + 9], 12, 2336552879), f, d, s[a + 10], 17, 4294925233), v, f, s[a + 11], 22, 2304563134), g = t(g, v = t(v, f = t(f, d, g, v, s[a + 12], 7, 1804603682), d, g, s[a + 13], 12, 4254626195), f, d, s[a + 14], 17, 2792965006), v, f, s[a + 15], 22, 1236535329), g = n(g, v = n(v, f = n(f, d, g, v, s[a + 1], 5, 4129170786), d, g, s[a + 6], 9, 3225465664), f, d, s[a + 11], 14, 643717713), v, f, s[a + 0], 20, 3921069994), g = n(g, v = n(v, f = n(f, d, g, v, s[a + 5], 5, 3593408605), d, g, s[a + 10], 9, 38016083), f, d, s[a + 15], 14, 3634488961), v, f, s[a + 4], 20, 3889429448), g = n(g, v = n(v, f = n(f, d, g, v, s[a + 9], 5, 568446438), d, g, s[a + 14], 9, 3275163606), f, d, s[a + 3], 14, 4107603335), v, f, s[a + 8], 20, 1163531501), g = n(g, v = n(v, f = n(f, d, g, v, s[a + 13], 5, 2850285829), d, g, s[a + 2], 9, 4243563512), f, d, s[a + 7], 14, 1735328473), v, f, s[a + 12], 20, 2368359562), g = r(g, v = r(v, f = r(f, d, g, v, s[a + 5], 4, 4294588738), d, g, s[a + 8], 11, 2272392833), f, d, s[a + 11], 16, 1839030562), v, f, s[a + 14], 23, 4259657740), g = r(g, v = r(v, f = r(f, d, g, v, s[a + 1], 4, 2763975236), d, g, s[a + 4], 11, 1272893353), f, d, s[a + 7], 16, 4139469664), v, f, s[a + 10], 23, 3200236656), g = r(g, v = r(v, f = r(f, d, g, v, s[a + 13], 4, 681279174), d, g, s[a + 0], 11, 3936430074), f, d, s[a + 3], 16, 3572445317), v, f, s[a + 6], 23, 76029189), g = r(g, v = r(v, f = r(f, d, g, v, s[a + 9], 4, 3654602809), d, g, s[a + 12], 11, 3873151461), f, d, s[a + 15], 16, 530742520), v, f, s[a + 2], 23, 3299628645), g = o(g, v = o(v, f = o(f, d, g, v, s[a + 0], 6, 4096336452), d, g, s[a + 7], 10, 1126891415), f, d, s[a + 14], 15, 2878612391), v, f, s[a + 5], 21, 4237533241), g = o(g, v = o(v, f = o(f, d, g, v, s[a + 12], 6, 1700485571), d, g, s[a + 3], 10, 2399980690), f, d, s[a + 10], 15, 4293915773), v, f, s[a + 1], 21, 2240044497), g = o(g, v = o(v, f = o(f, d, g, v, s[a + 8], 6, 1873313359), d, g, s[a + 15], 10, 4264355552), f, d, s[a + 6], 15, 2734768916), v, f, s[a + 13], 21, 1309151649), g = o(g, v = o(v, f = o(f, d, g, v, s[a + 4], 6, 4149444226), d, g, s[a + 11], 10, 3174756917), f, d, s[a + 2], 15, 718787259), v, f, s[a + 9], 21, 3951481745),
                        f = c(f, l),
                        d = c(d, u),
                        g = c(g, p),
                        v = c(v, h);
                    return (i(f) + i(d) + i(g) + i(v))['toLowerCase']();
                    break;
                }
            }
        }

function convertTimingToEncoded(timingObj) {
    // 属性名到单字母键的映射（按规范顺序）
    const keyMap = [
        'navigationStart',           // a
        'unloadEventStart',          // b
        'unloadEventEnd',            // c
        'redirectStart',             // d
        'redirectEnd',               // e
        'fetchStart',                // f
        'domainLookupStart',         // g
        'domainLookupEnd',           // h
        'connectStart',              // i
        'connectEnd',                // j
        'secureConnectionStart',     // k
        'requestStart',              // l
        'responseStart',             // m
        'responseEnd',               // n
        'domLoading',                // o
        'domInteractive',            // p
        'domContentLoadedEventStart',// q
        'domContentLoadedEventEnd',  // r
        'domComplete',               // s
        'loadEventStart',            // t
        'loadEventEnd'               // u
    ];

    const encoded = {};
    const startCharCode = 'a'.charCodeAt(0);

    keyMap.forEach((propName, index) => {
        const letter = String.fromCharCode(startCharCode + index);
        // 直接从输入对象中取值，若不存在则保持 0（与示例一致）
        encoded[letter] = timingObj[propName] !== undefined ? timingObj[propName] : 0;
    });

    return encoded;
}
const rawTiming = {
    "connectStart": 1776861203127,
    "secureConnectionStart": 1776861203149,
    "unloadEventEnd": 1776861203205,
    "domainLookupStart": 1776861203120,
    "domainLookupEnd": 1776861203127,
    "responseStart": 1776861203200,
    "connectEnd": 1776861203174,
    "responseEnd": 1776861203201,
    "requestStart": 1776861203174,
    "domLoading": 1776861203207,
    "redirectStart": 0,
    "loadEventEnd": 1776861203269,
    "domComplete": 1776861203269,
    "navigationStart": 1776861203104,
    "loadEventStart": 1776861203269,
    "domContentLoadedEventEnd": 1776861203268,
    "unloadEventStart": 1776861203205,
    "redirectEnd": 0,
    "domInteractive": 1776861203266,
    "fetchStart": 1776861203111,
    "domContentLoadedEventStart": 1776861203266
};

function H_2(t, e) {
            var $_DAJEd = 16;
            for (; $_DAJEd !== 14; ) {
                switch ($_DAJEd) {
                case 16:
                    for (var n = e['slice'](-2), r = [], i = 0; i < n['length']; i++) {
                        var o = n['charCodeAt'](i);
                        r[i] = 57 < o ? o - 87 : o - 48;
                    }
                    n = 36 * r[0] + r[1];
                    var s, a = Math['round'](t) + n, _ = [[], [], [], [], []], c = {}, u = 0;
                    i = 0;
                    $_DAJEd = 15;
                    break;
                case 15:
                    for (var l = (e = e['slice'](0, -2))['length']; i < l; i++)
                        c[s = e['charAt'](i)] || (c[s] = 1,
                        _[u]['push'](s),
                        u = 5 == ++u ? 0 : u);
                    var h, f = a, d = 4, p = '', g = [1, 2, 5, 10, 50];
                    while (0 < f)
                        0 <= f - g[d] ? (h = parseInt(Math['random']() * _[d]['length'], 10),
                        p += _[d][h],
                        f -= g[d]) : (_['splice'](d, 1),
                        g['splice'](d, 1),
                        d -= 1);
                    return p;
                    break;
                }
            }
        }

function aesEncryptToBytes(plaintext, key) {
    const keyWA = CryptoJS.enc.Utf8.parse(key);
    const ivWA = CryptoJS.enc.Utf8.parse("0000000000000000");
    const encrypted = CryptoJS.AES.encrypt(plaintext, keyWA, { iv: ivWA });
    const words = encrypted.ciphertext.words;
    const sigBytes = encrypted.ciphertext.sigBytes;
    const bytes = [];
    for (let i = 0; i < sigBytes; i++) {
        const byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        bytes.push(byte);
    }
    return bytes;
}

// n 函数：将数字转为 4 位十六进制小写字符串（常见极验实现）
function n(t) {
    var $_DBEAy = 16;
    for (; $_DBEAy !== 14; ) {
        switch ($_DBEAy) {
        case 16:
            var e = '()*,-./0123456789:?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqr'
              , n = e['length']
              , r = ''
              , i = Math['abs'](t)
              , o = parseInt(i / n);
            n <= o && (o = n - 1),
            o && (r = e['charAt'](o));
            $_DBEAy =15;
            break;
        case 15:
            var s = '';
            return t < 0 && (s += '!'),
            r && (s += '$'),
            s + r + e['charAt'](i %= n);
            break;
        }
    }
}

// 轨迹加密主函数
function encry_guiji(data) {
    // 1. 压缩轨迹：计算相邻点增量，合并连续的水平/垂直移动
    let compressed = (function(t) {
        let e, n, r, i = [], o = 0;
        for (let s = 0, a = t.length - 1; s < a; s++) {
            e = Math.round(t[s+1][0] - t[s][0]);
            n = Math.round(t[s+1][1] - t[s][1]);
            r = Math.round(t[s+1][2] - t[s][2]);
            // 全零跳过；若 e=n=0 则累加时间差；否则存入并重置累加器
            if (!(e === 0 && n === 0 && r === 0)) {
                if (e === 0 && n === 0) {
                    o += r;
                } else {
                    i.push([e, n, r + o]);
                    o = 0;
                }
            }
        }
        if (o !== 0) i.push([e, n, o]);
        return i;
    })(data);

    let r = [], i = [], o = [];  // 分别存储 x, y 方向编码和轨迹时间编码

    // 2. 遍历压缩后的轨迹点，编码每个点的 (dx, dy, dt)
    for (let idx = 0; idx < compressed.length; idx++) {
        let [dx, dy, dt] = compressed[idx];

        // 方向映射表（dx, dy）→ 单字符
        let dirMap = [[1,0],[2,0],[1,-1],[1,1],[0,1],[0,-1],[3,0],[2,-1],[2,1]];
        let dirChar = null;
        for (let d = 0; d < dirMap.length; d++) {
            if (dx === dirMap[d][0] && dy === dirMap[d][1]) {
                dirChar = "stuvwxyz~"[d];
                break;
            }
        }

        if (dirChar) {
            i.push(dirChar);               // 方向匹配，存入 i 数组
        } else {
            r.push(n(dx));                 // x 增量编码（4位十六进制）
            i.push(n(dy));                 // y 增量编码（4位十六进制）
        }
        o.push(n(dt));                     // 时间增量编码
    }

    // 3. 拼接结果：r 部分 + '!!' + i 部分 + '!!' + o 部分
    return r.join('') + '!!' + i.join('') + '!!' + o.join('');
}

function encry_2(t, e, n) {
    if (!e || !n)
        return t;
    var r, i = 0, o = t, s = e[0], a = e[2], _ = e[4];
    while (r = n['substr'](i, 2)) {
        i += 2;
        var c = parseInt(r, 16)
          , u = String['fromCharCode'](c)
          , l = (s * c * c + a * c + _) % t['length'];
        o = o['substr'](0, l) + u + o['substr'](l);
    }
    return o;
}

// const e_e = e() + e() + e() + e();
// console.log("明文:", e_e);



//---------------------------------------hh------------------------------------------------
function get_w3(challenge,passtime,t,guiji,s,e_e){
    const modulusHex = "00C1E3934D1614465B33053E7F48EE4EC87B14B95EF88947713D25EECBFF7E74C7977D02DC1D9451F79DD5D1C10C29ACB6A9B4D6FB7D0A0279B6719E1772565F09AF627715919221AEF91899CAE08C0D686D748B20A3603BE2318CA6BC2B59706592A9219D0BF05C9F65023A21D2330807252AE0066D59CEEFA5F2748EA80BAB81";
    const uu_u= rsaEncrypt(e_e, modulusHex);
    // console.log(uu_u.length)

   //--------------------------------rp------------√
    //------------------passtime是滑块的总时间-------
    const g_t="019924a82c70bb123aae90d483087f94"
    // const challenge="29bdfb59cc22a8623c1ea203f69aa7f546"

    // passtime=1168
    rp = H( g_t + challenge["slice"](0, 32) + passtime);
    // console.log(rp)

    //--------------------------------tm----------------
    const tm = convertTimingToEncoded(rawTiming);


    //--------------------------userresponse(每次生成的结果不同)------
    //t为滑动的距离
    // t=61
    userresponse = H_2(t, challenge)
    // console.log(userresponse)

    //------------------------------------aa(轨迹加密)-----------------
    // guiji=[
    //     [
    //         -37,
    //         -39,
    //         0
    //     ],
    //     [
    //         0,
    //         0,
    //         0
    //     ],
    //     [
    //         1,
    //         0,
    //         79
    //     ],
    //     [
    //         4,
    //         0,
    //         87
    //     ],
    //     [
    //         8,
    //         0,
    //         95
    //     ],
    //     [
    //         13,
    //         0,
    //         103
    //     ],
    //     [
    //         17,
    //         0,
    //         111
    //     ],
    //     [
    //         19,
    //         0,
    //         119
    //     ],
    //     [
    //         22,
    //         0,
    //         127
    //     ],
    //     [
    //         23,
    //         0,
    //         143
    //     ],
    //     [
    //         26,
    //         0,
    //         151
    //     ],
    //     [
    //         28,
    //         0,
    //         167
    //     ],
    //     [
    //         29,
    //         0,
    //         175
    //     ],
    //     [
    //         31,
    //         0,
    //         207
    //     ],
    //     [
    //         32,
    //         0,
    //         215
    //     ],
    //     [
    //         34,
    //         0,
    //         223
    //     ],
    //     [
    //         35,
    //         0,
    //         231
    //     ],
    //     [
    //         37,
    //         0,
    //         255
    //     ],
    //     [
    //         38,
    //         0,
    //         335
    //     ],
    //     [
    //         40,
    //         0,
    //         343
    //     ],
    //     [
    //         44,
    //         0,
    //         351
    //     ],
    //     [
    //         46,
    //         0,
    //         359
    //     ],
    //     [
    //         49,
    //         0,
    //         367
    //     ],
    //     [
    //         50,
    //         0,
    //         375
    //     ],
    //     [
    //         50,
    //         0,
    //         447
    //     ]
    // ]


    //-------------------s,shuzu(由图片url的网页返回)----------√
    // var s = "6c5f4477"
    shuzu=[
        12,
        58,
        98,
        36,
        43,
        95,
        62,
        15,
        12
    ]//不变

    var aa = encry_2(encry_guiji(guiji),shuzu,s)//完全√

    //----------------------------------imgload------------------
    max_num= 160
    min_num= 60
    imgload=  Math.round(min_num + Math.random()*(max_num-min_num))
    console.log(imgload)
    //-------------------------------oo--------------------
    oo={
        "lang": "zh-cn",
        "userresponse": userresponse,
        "passtime":passtime,
        "imgload": 140,
        "aa": aa,
        "ep": {
            "v": "7.9.3",
            "$_BIT": false,
            "me": true,
            "tm": tm,
            "td": -1
        },
        "h9s9": "1816378497",
        "rp": rp
    }
    // console.log(oo)

    //----------------------------------------------------------ll-----------------------------------√
    ll = aesEncryptToBytes(JSON.stringify(oo), e_e)


    //---------------------------------------------------------hh_h-----------------------------------√
    cc = p["$_HCB"](ll,undefined)
    hh_h=cc["res"]+cc["end"]

    w_3=hh_h+uu_u
    console.log(w_3)
    return w_3
}
//[-39,-10,0]
guiji=[[-39,-10,0],[0,0,0],[1,0,70],[2,0,82],[4,0,88],[7,0,100],[7,0,106],[8,0,112],[10,0,124],[12,0,130],[13,0,136],[17,0,148],[18,0,154],[20,0,160],[22,0,173],[23,0,179],[24,0,185],[25,0,197],[26,0,209],[27,0,227],[29,0,233],[30,0,251],[31,0,257],[32,0,269],[33,0,275],[34,0,282],[35,0,288],[36,0,300],[38,0,312],[39,0,324],[40,0,336],[41,0,348],[42,0,354],[43,0,360],[44,0,379],[45,0,397],[46,0,409],[47,0,427],[48,0,433],[49,0,445],[50,0,451],[50,0,457],[51,0,476],[52,0,506],[53,0,591],[54,0,663],[55,0,676],[55,0,817],[56,0,833],[57,0,845],[57,0,1168]]
passtime=1168
challenge='df90dfd25854dae7f5c6adb7f4f5a428cr'
t=57
ss='44334150'
// get_w3(challenge,passtime,t,guiji,ss)

