const JSEncrypt = require("jsencrypt");
const forge = require('node-forge');
const CryptoJS = require("crypto-js");


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

function encry_guiji(e) {
    var p = {
        "move": 0,
        "\u0064\u006f\u0077\u006e": 1,
        "\u0075\u0070": 2,
        "\u0073\u0063\u0072\u006f\u006c\u006c": 3,
        "\u0066\u006f\u0063\u0075\u0073": 4,
        "\u0062\u006c\u0075\u0072": 5,
        "\u0075\u006e\u006c\u006f\u0061\u0064": 6,
        "\u0075\u006e\u006b\u006e\u006f\u0077\u006e": 7
    };
    function h(e, t) {
        var $_DDGHs = 19;
        for (; $_DDGHs !== 18; ) {
            switch ($_DDGHs) {
            case 19 :
                for (var n = e['toString'](2), r = '', o = n['length'] + 1; o <= t; o += 1)
                    r += '0';
                return n = r + n;
                break;
            }
        }
    }
    function f(e) {
        var $_DDGIH = 9;
        for (;true; ) {
            switch ($_DDGIH) {
            case 9:
                var t = []
                  , n = e['length']
                  , r = 0;
                $_DDGIH = 8;
                break;
            case 8:
                while (r < n) {
                    var o = e[r]
                      , i = 0;
                    while (1) {
                        if (16 <= i)
                            break;
                        var s = r + i + 1;
                        if (n <= s)
                            break;
                        if (e[s] !== o)
                            break;
                        i += 1;
                    }
                    r = r + 1 + i;
                    var a = p[o];
                    0 != i ? (t['push'](8 | a),
                    t['push'](i - 1)) : t['push'](a);
                }
                $_DDGIH = 7;
                break;
            case 7:
                for (var _ = h(32768 | n, 16), c = '', l = 0, u = t['length']; l < u; l += 1)
                    c += h(t[l], 4);
                $_DDGIH = 6;
                break;
            case 6:
                return _ + c;
                break;
            }
        }
    }
    function c(e, t) {
        var $_DDGJd = 19;
        for (; $_DDGJd !== 17; ) {
            switch ($_DDGJd) {
            case 19:
                for (var n = [], r = 0, o = e['length']; r < o; r += 1)
                    n['push'](t(e[r]));
                $_DDGJd = 18;
                break;
            case 18:
                return n;
                break;
            }
        }
    }
    function d(e, t) {
        var $_DDHAC = 19;
        for (; $_DDHAC !== 16; ) {
            switch ($_DDHAC) {
            case 19:
                e = function _(e) {
                    var t = 32767
                      , n = (e = c(e, function(e) {
                        return t < e ? t : e < -t ? -t : e;
                    }))['length']
                      , r = 0
                      , o = [];
                    while (r < n) {
                        var i = 1
                          , s = e[r]
                          , a = Math['abs'](s);
                        while (1) {
                            if (n <= r + i)
                                break;
                            if (e[r + i] !== s)
                                break;
                            if (127 <= a || 127 <= i)
                                break;
                            i += 1;
                        }
                        1 < i ? o['push']((s < 0 ? 49152 : 32768) | i << 7 | a) : o['push'](s),
                        r += i;
                    }
                    return o;
                }(e);
                var n, r = [], o = [];
                $_DDHAC = 18;
                break;
            case 18:
                c(e, function(e) {
                    var t = Math['ceil'](function n(e, t) {
                        return 0 === e ? 0 : Math['log'](e) / Math['log'](t);
                    }(Math['abs'](e) + 1, 16));
                    0 === t && (t = 1),
                    r['push'](h(t - 1, 2)),
                    o['push'](h(Math['abs'](e), 4 * t));
                });
                var i = r['join']('')
                  , s = o['join']('');
                $_DDHAC = 17;
                break;
            case 17:
                return n = t ? c(function a(e, t) {
                    var n = [];
                    return c(e, function(e) {
                        t(e) && n['push'](e);
                    }),
                    n;
                }(e, function(e) {
                    return 0 != e && e >> 15 != 1;
                }), function(e) {
                    return e < 0 ? "1": '0';
                })['join']('') : '',
                h(32768 | e['length'], 16) + i + s + n;
                break;
            }
        }
    }
    return function(e) {
        for (var t = [], n = [], r = [], o = [], i = 0, s = e['length']; i < s; i += 1) {
            var a = e[i]
              , _ = a['length'];
            t['push'](a[0]),
            n['push'](2 === _ ? a[1] : a[2]),
            3 === _ && (r['push'](a[1][0]),
            o['push'](a[1][1]));
        }
        var c = f(t) + d(n, !1) + d(r, !0) + d(o, !0)
          , l = c['length'];
        return l % 6 != 0 && (c += h(0, 6 - l % 6)),
        function u(e) {
            for (var t = '', n = e['length'] / 6, r = 0; r < n; r += 1)
                t += '()*,-./0123456789:?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~'['charAt'](parseInt(e['slice'](6 * r, 6 * (r + 1)), 2));
            return t;
        }(c);
    }(e);
}

function dec_fp_lp(_) {
    var t = 0
      , n = 0
      , r = []
        ,i=0
    for (var s = null, a = null, _, c = _['length'], l = c < 300 ? 0 : c - 300; l < c; l += 1) {
    var u = _[l]
      , p = u[0];
    if(p!=="focus"){
    s || (s = u),
    a = u,
    r['push']([p, [u[1] - t, u[2] - n], i ? u[3] - i : i]),
    t = u[1],
    n = u[2],
    i = u[3]
    }else {
        r['push']([p,i ? u[1] - i : i]),
        i = u[1]
        }
    }
    data= {fp : s, lp : a,r : r}
    return data
}

/**
 * 生成模拟的 performance.timing 编码对象（a-u 键）
 * @param {number} [baseTime] - 基准时间戳（毫秒），默认为当前时间
 * @returns {Object} 键为 a-u 的紧凑对象
 */
function generateEncodedTiming(baseTime = Date.now()) {
    // 时间偏移定义（单位：毫秒）
    const offsets = {
        navigationStart: 0,
        unloadEventStart: 45,
        unloadEventEnd: 48,
        redirectStart: 0,
        redirectEnd: 0,
        fetchStart: 2,
        domainLookupStart: 2,
        domainLookupEnd: 2,
        connectStart: 2,
        secureConnectionStart: 0,
        connectEnd: 2,
        requestStart: 8,
        responseStart: 42,
        responseEnd: 46,
        domLoading: 49,
        domInteractive: 135,
        domContentLoadedEventStart: 135,
        domContentLoadedEventEnd: 138,
        domComplete: 139,
        loadEventStart: 139,
        loadEventEnd: 140
    };

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
        const offset = offsets[propName];
        encoded[letter] = offset === 0 ? 0 : baseTime + offset;
    });

    // 确保 navigationStart（a）始终正确
    encoded.a = baseTime;

    return encoded;
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

function e() {
    // 生成4位十六进制随机字符串
    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
}

function generateTrack(targetX, targetY, startX, startY, baseTime = Date.now(), totalDuration = 1000) {
    const track = [];
    const steps = 35;                     // 轨迹点数（包含 move 事件）
    const moveDuration = totalDuration * 0.8; // move 阶段占 80%
    const startTime = baseTime;

    // 使用贝塞尔曲线生成平滑路径
    const points = [];
    for (let i = 0; i < steps; i++) {
        const t = i / (steps - 1);        // 归一化进度 [0,1]

        // 缓动函数：先加速后减速
        let eased;
        if (t < 0.5) {
            eased = 2 * t * t;
        } else {
            eased = 1 - Math.pow(-2 * t + 2, 2) / 2;
        }

        // 贝塞尔控制点
        const cp1x = startX + (targetX - startX) * 0.2;
        const cp1y = startY + (targetY - startY) * 0.1;
        const cp2x = startX + (targetX - startX) * 0.7;
        const cp2y = targetY - (targetY - startY) * 0.1;

        // 三次贝塞尔插值
        const mt = 1 - eased;
        const x = mt * mt * mt * startX
                + 3 * mt * mt * eased * cp1x
                + 3 * mt * eased * eased * cp2x
                + eased * eased * eased * targetX;
        const y = mt * mt * mt * startY
                + 3 * mt * mt * eased * cp1y
                + 3 * mt * eased * eased * cp2y
                + eased * eased * eased * targetY;

        // 微小抖动（±2px）
        const noiseX = (Math.random() - 0.5) * 4;
        const noiseY = (Math.random() - 0.5) * 4;

        points.push({
            x: Math.round(x + noiseX),
            y: Math.round(y + noiseY),
        });
    }

    // 最后一步强制对齐目标坐标
    points[points.length - 1] = { x: targetX, y: targetY };

    // 生成随机时间间隔（两端慢、中间快）
    const deltas = [];
    for (let i = 0; i < points.length - 1; i++) {
        const progress = i / (points.length - 1);
        if (progress < 0.2 || progress > 0.8) {
            deltas.push(12 + Math.floor(Math.random() * 8));   // 12~20ms
        } else {
            deltas.push(6 + Math.floor(Math.random() * 6));    // 6~12ms
        }
    }

    // 缩放时间间隔，使 move 总时长恰好为 moveDuration
    const sumDeltas = deltas.reduce((a, b) => a + b, 0);
    const scale = moveDuration / sumDeltas;
    let currentTime = startTime;
    for (let i = 0; i < points.length; i++) {
        if (i > 0) {
            currentTime += Math.round(deltas[i - 1] * scale);
        }
        track.push(["move", points[i].x, points[i].y, currentTime, "pointermove"]);
    }

    // 剩余时间分配给 down 和 up，确保 up 时间 = startTime + totalDuration
    const remainingDuration = totalDuration - moveDuration; // 200ms
    const downDelay = Math.floor(remainingDuration * (0.4 + Math.random() * 0.2)); // 40%~60% 给 down
    const upDelay = remainingDuration - downDelay;

    const downTime = currentTime + downDelay;
    track.push(["down", targetX, targetY, downTime, "pointerdown"]);

    // focus 比 down 稍早
    track.push(["focus", downTime - 5]);

    const upTime = downTime + upDelay; // 此时 upTime = startTime + totalDuration
    track.push(["up", targetX, targetY, upTime, "pointerup"]);

    return track;
}

function get_tt (e, t, n) {
    if (!t || !n)
        return e;
    var r, o = 0, i = e, s = t[0], a = t[2], _ = t[4];
    while (r = n["substr"](o, 2)) {
        o += 2;
        var c = parseInt(r, 16)
          , l = String["fromCharCode"](c)
          , u = (s * c * c + a * c + _) % e["length"];
        i = i["substr"](0, u) + l + i["substr"](u);
    }
    return i;
}


//----------------------------------------------------------------
const track = generateTrack(1187,238,1757,367)
// console.log(track)
data =dec_fp_lp(track);
// console.log(data["r"])
ee_ee1=data["r"]
o_c =[12,58,98,36,43,95,62,15,12]
o_s ="12346623432" //浏览器返回暂时固定
// tt = get_tt(encry_guiji(ee_ee1),o_c,o_s)
// console.log(tt)

rp=H("019924a82c70bb123aae90d483087f94" + '2d783abd8d70d688fb1df0627320d935' + 97846)
// console.log(rp)
//------------------------------tm的生成---------------------------
const tm = generateEncodedTiming();
// e_e=  "5a912135d08df88a"//e()+e()+e()+e()

//--------------------------------passtime,rp的生成-------------------------

function get_w_2(challenge,g_t,o_s,e_e){
    //----------------------------tt,fp,lp的生成---------------------
    ee_ee1=data["r"]
    o_c =[12,58,98,36,43,95,62,15,12]
    // o_s ="2d75416f" //浏览器返回暂时固定

    tt = get_tt(encry_guiji(ee_ee1),o_c,o_s)//tt
    console.log(tt);
    const fp=data["fp"]
    const lp=data["lp"]


    const max=2000,
    min=900
    passtime= min + Math.round(Math.random()*(max-min))
    //网页返回g_t,challenge
    // challenge="8527c0e2256cb800d8add440dd32077b"
    // g_t="019924a82c70bb123aae90d483087f94"
    rp=H(g_t + challenge + passtime)


    rr_r={
    "lang": "zh-cn",
    "type": "fullpage",
    "tt": tt,
    "light": "DIV_0",
    "s": "c7c3e21112fe4f741921cb3e4ff9f7cb",
    "h": "321f9af1e098233dbd03f250fd2b5e21",
    "hh": "39bd9cad9e425c3a8f51610fd506e3b3",
    "hi": "09eb21b3ae9542a9bc1e8b63b3d9a467",
    "vip_order": -1,
    "ct": -1,
    "ep": {
        "v": "9.2.0-guwyxh",
        "te": false,
        "$_BBn": true,
        "ven": "Google Inc. (NVIDIA)",
        "ren": "ANGLE (NVIDIA, NVIDIA GeForce RTX 3050 Laptop GPU (0x000025E2) Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "fp": fp,
        "lp": lp,
        "em": {
            "ph": 0,
            "cp": 0,
            "ek": "11",
            "wd": 1,
            "nt": 0,
            "si": 0,
            "sc": 0
        },
        "tm": tm,
        "dnf": "dnf",
        "by": 0
    },
    "passtime": passtime,
    "rp": rp,
    "captcha_token": "112439067",
    "tsfq": "xovrayel"
}
    // console.log(rr_r)
    rr_rr= JSON.stringify(rr_r)
    // console.log(rr_rr)
    ww= p["$_HCB"](aesEncryptToBytes(rr_rr,e_e))
    w_2=ww["res"]+ww["end"]
    // console.log(w_2)
    return w_2
}


// xxx= get_w_2('f92e6a4d5f6eb799cd6a20d008483385',"019924a82c70bb123aae90d483087f94",'5265516f')
// console.log(xxx.length)




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
function e() {
    // 生成4位十六进制随机字符串
    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
}

function RSA(test) {
    const modulusHex = "00C1E3934D1614465B33053E7F48EE4EC87B14B95EF88947713D25EECBFF7E74C7977D02DC1D9451F79DD5D1C10C29ACB6A9B4D6FB7D0A0279B6719E1772565F09AF627715919221AEF91899CAE08C0D686D748B20A3603BE2318CA6BC2B59706592A9219D0BF05C9F65023A21D2330807252AE0066D59CEEFA5F2748EA80BAB81";
    const exponentHex = "10001";

    // 转换为 forge 的 BigInteger
    const modulus = new forge.jsbn.BigInteger(modulusHex, 16);
    const exponent = new forge.jsbn.BigInteger(exponentHex, 16);

    // 创建 RSA 公钥对象并转为 PEM
    const rsaKey = forge.pki.setRsaPublicKey(modulus, exponent);
    const pem = forge.pki.publicKeyToPem(rsaKey);

    // 使用 JSEncrypt 加密
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(pem);

    const base64Cipher = encryptor.encrypt(test); // 例如 "NTm+9nr8..."
    // 将 Base64 转为十六进制
    const buffer = Buffer.from(base64Cipher, 'base64');
    const hexCipher = buffer.toString('hex');
    return hexCipher;
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


function get_w1(challenge,e_e){
    const rr = RSA(e_e);
    Config ={
    "gt": "019924a82c70bb123aae90d483087f94",
    "challenge": challenge,
    "offline": false,
    "new_captcha": true,
    "product": "float",
    "width": "300px",
    "https": true,
    "api_server": "apiv6.geetest.com",
    "protocol": "https://",
    "type": "fullpage",
    "static_servers": [
        "static.geetest.com/",
        "static.geevisit.com/"
    ],
    "voice": "/static/js/voice.1.2.6.js",
    "click": "/static/js/click.3.1.2.js",
    "beeline": "/static/js/beeline.1.0.1.js",
    "fullpage": "/static/js/fullpage.9.2.0-guwyxh.js",
    "slide": "/static/js/slide.7.9.3.js",
    "geetest": "/static/js/geetest.6.0.9.js",
    "aspect_radio": {
        "slide": 103,
        "click": 128,
        "voice": 128,
        "beeline": 50
    },
    "cc": 12,
    "ww": true,
    "i": "-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1"
    }
    ee=aesEncryptToBytes(JSON["stringify"](Config), e_e)

    cc = p["$_HCB"](ee,undefined)
    ii =cc["res"]+cc["end"]
    w_1 =ii+rr
    return w_1
}

// console.log(get_w1(13));