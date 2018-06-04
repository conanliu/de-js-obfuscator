/**
 *
 * @author: conanliu
 * @date: 2018/6/2
 */
var window = {};

var b = function (arr, c, d) {
    c = c - 0x0;
    var e = arr[c];
    if (b['WZDOeZ'] === undefined) {
        (function () {
            var f = function () {
                return window;
            };
            var i = f();
            var j = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            window['atob'] = function (k) {
                var l = String(k)['replace'](/=+$/, '');
                for (var m = 0x0, n, o, p = 0x0, q = ''; o = l['charAt'](p++); ~o && (n = m % 0x4 ? n * 0x40 + o : o, m++ % 0x4) ? q += String['fromCharCode'](0xff & n >> (-0x2 * m & 0x6)) : 0x0) {
                    o = j['indexOf'](o);
                }
                return q;
            };
        }());
        var r = function (s, t) {
            var u = [], v = 0x0, w, x = '', y = '';
            s = window.atob(s);
            for (var z = 0x0, A = s['length']; z < A; z++) {
                y += '%' + ('00' + s['charCodeAt'](z)['toString'](0x10))['slice'](-0x2);
            }
            s = decodeURIComponent(y);
            for (var B = 0x0; B < 0x100; B++) {
                u[B] = B;
            }
            for (B = 0x0; B < 0x100; B++) {
                v = (v + u[B] + t['charCodeAt'](B % t['length'])) % 0x100;
                w = u[B];
                u[B] = u[v];
                u[v] = w;
            }
            B = 0x0;
            v = 0x0;
            for (var C = 0x0; C < s['length']; C++) {
                B = (B + 0x1) % 0x100;
                v = (v + u[B]) % 0x100;
                w = u[B];
                u[B] = u[v];
                u[v] = w;
                x += String['fromCharCode'](s['charCodeAt'](C) ^ u[(u[B] + u[v]) % 0x100]);
            }
            return x;
        };
        b['KQUfKj'] = r;
        b['uJDXUo'] = {};
        b['WZDOeZ'] = !![];
    }
    var D = b['uJDXUo'][c];
    if (D === undefined) {
        if (b['yKBrRW'] === undefined) {
            b['yKBrRW'] = !![];
        }
        e = b['KQUfKj'](e, d);
        b['uJDXUo'][c] = e;
    } else {
        e = D;
    }
    return e;
};

module.exports = b;
