!(function t(r, e, n) {
  function o(i, s) {
    if (!e[i]) {
      if (!r[i]) {
        var h = 'function' == typeof require && require;
        if (!s && h) return h(i, !0);
        if (a) return a(i, !0);
        var u = new Error("Cannot find module '" + i + "'");
        throw ((u.code = 'MODULE_NOT_FOUND'), u);
      }
      var p = (e[i] = { exports: {} });
      r[i][0].call(
        p.exports,
        function (t) {
          var e = r[i][1][t];
          return o(e ? e : t);
        },
        p,
        p.exports,
        t,
        r,
        e,
        n
      );
    }
    return e[i].exports;
  }
  for (
    var a = 'function' == typeof require && require, i = 0;
    i < n.length;
    i++
  )
    o(n[i]);
  return o;
})(
  {
    1: [
      function (t, r, e) {
        !(function () {
          'use strict';
          function e(t, r) {
            return (
              (this.type = Float64Array),
              (this.shape = []),
              t && t.buffer && t.buffer instanceof ArrayBuffer
                ? e.fromTypedArray(t, r && r.shape)
                : t instanceof Array
                ? e.fromArray(t)
                : t instanceof n
                ? e.fromVector(t, r && r.shape)
                : t instanceof e
                ? e.fromMatrix(t)
                : 'number' == typeof t && 'number' == typeof r
                ? e.fromShape([t, r])
                : t && !t.buffer && t.shape
                ? e.fromShape(t.shape)
                : void 0
            );
          }
          var n = t('./vector');
          (e.fromTypedArray = function (t, r) {
            if (t.length !== r[0] * r[1])
              throw new Error('Shape does not match typed array dimensions.');
            var n = Object.create(e.prototype);
            return (n.shape = r), (n.data = t), (n.type = t.constructor), n;
          }),
            (e.fromArray = function (t) {
              var r,
                n,
                o = t.length,
                a = t[0].length,
                i = new Float64Array(o * a);
              for (r = 0; r < o; ++r)
                for (n = 0; n < a; ++n) i[r * a + n] = t[r][n];
              return e.fromTypedArray(i, [o, a]);
            }),
            (e.fromMatrix = function (t) {
              var r = Object.create(e.prototype);
              return (
                (r.shape = [t.shape[0], t.shape[1]]),
                (r.data = new t.type(t.data)),
                (r.type = t.type),
                r
              );
            }),
            (e.fromVector = function (t, r) {
              if (r && t.length !== r[0] * r[1])
                throw new Error('Shape does not match vector dimensions.');
              var n = Object.create(e.prototype);
              return (
                (n.shape = r ? r : [t.length, 1]),
                (n.data = new t.type(t.data)),
                (n.type = t.type),
                n
              );
            }),
            (e.fromShape = function (t) {
              var r = t[0],
                n = t[1];
              return e.fromTypedArray(new Float64Array(r * n), t);
            }),
            (e.binOp = function (t, r, n) {
              return new e(t).binOp(r, n);
            }),
            (e.prototype.binOp = function (t, r) {
              var e = this.shape[0],
                n = this.shape[1],
                o = e * n,
                a = this.data,
                i = t.data;
              if (e !== t.shape[0] || n !== t.shape[1])
                throw new Error('sizes do not match!');
              var s;
              for (s = 0; s < o; s++) a[s] = r(a[s], i[s], s);
              return this;
            }),
            (e.add = function (t, r) {
              return new e(t).add(r);
            }),
            (e.prototype.add = function (t) {
              return this.binOp(t, function (t, r) {
                return t + r;
              });
            }),
            (e.subtract = function (t, r) {
              return new e(t).subtract(r);
            }),
            (e.prototype.subtract = function (t) {
              return this.binOp(t, function (t, r) {
                return t - r;
              });
            }),
            (e.product = function (t, r) {
              return new e(t).product(r);
            }),
            (e.prototype.product = function (t) {
              return this.binOp(t, function (t, r) {
                return t * r;
              });
            }),
            (e.scale = function (t, r) {
              return new e(t).scale(r);
            }),
            (e.prototype.scale = function (t) {
              var r,
                e = this.shape[0],
                n = this.shape[1],
                o = e * n,
                a = this.data;
              for (r = 0; r < o; r++) a[r] *= t;
              return this;
            }),
            (e.fill = function (t, r, n, o) {
              if (t <= 0 || r <= 0) throw new Error('invalid size');
              (n = n || 0), (o = o || Float64Array);
              var a,
                i,
                s = t * r,
                h = new o(s),
                u = 'function' == typeof n,
                p = 0;
              for (a = 0; a < t; a++)
                for (i = 0; i < r; i++, p++) h[p] = u ? n(a, i) : n;
              return e.fromTypedArray(h, [t, r]);
            }),
            (e.zeros = function (t, r, n) {
              return e.fill(t, r, 0, n);
            }),
            (e.ones = function (t, r, n) {
              return e.fill(t, r, 1, n);
            }),
            (e.random = function (t, r, n, o, a) {
              return (
                (n = n || 1),
                (o = o || 0),
                e.fill(
                  t,
                  r,
                  function () {
                    return n * Math.random() + o;
                  },
                  a
                )
              );
            }),
            (e.multiply = function (t, r) {
              return t.multiply(r);
            }),
            (e.prototype.multiply = function (t) {
              var r = this.shape[0],
                n = this.shape[1],
                o = t.shape[0],
                a = t.shape[1],
                i = this.data,
                s = t.data;
              if (n !== o) throw new Error('sizes do not match');
              var h,
                u,
                p,
                f,
                c = new this.type(r * a);
              for (h = 0; h < r; h++)
                for (u = 0; u < a; u++) {
                  for (f = 0, p = 0; p < n; p++)
                    f += i[h * n + p] * s[u + p * a];
                  c[h * a + u] = f;
                }
              return e.fromTypedArray(c, [r, a]);
            }),
            Object.defineProperty(e.prototype, 'T', {
              get: function () {
                return this.transpose();
              },
            }),
            (e.prototype.transpose = function () {
              var t,
                r,
                n = this.shape[0],
                o = this.shape[1],
                a = new this.type(o * n);
              for (t = 0; t < n; t++)
                for (r = 0; r < o; r++) a[r * n + t] = this.data[t * o + r];
              return e.fromTypedArray(a, [o, n]);
            }),
            (e.prototype.inverse = function () {
              var t = this.shape[0],
                r = this.shape[1];
              if (t !== r) throw new Error('invalid dimensions');
              var n,
                o,
                a = e.identity(t),
                i = e.augment(this, a),
                s = i.gauss(),
                h = e.zeros(t, r),
                u = e.zeros(t, r),
                p = s.shape[1];
              for (n = 0; n < t; n++)
                for (o = 0; o < p; o++)
                  o < r
                    ? h.set(n, o, s.get(n, o))
                    : u.set(n, o - t, s.get(n, o));
              if (!h.equals(e.identity(t)))
                throw new Error('matrix is not invertible');
              return u;
            }),
            (e.prototype.gauss = function () {
              var c,
                g,
                h,
                i,
                a = this.shape[0],
                b = this.shape[1],
                d = new e(this),
                f = 0;
              for (h = 0; h < a; h++) {
                if (b <= f) return d;
                for (i = h; Math.abs(d.data[i * b + f]) <= 1e-10; )
                  if ((i++, a === i && ((i = h), f++, b === f))) return d;
                if ((d.swap(h, i), (g = d.data[h * b + f]), 0 !== g))
                  for (c = 0; c < b; c++) d.data[h * b + c] /= g;
                for (i = 0; i < a; i++)
                  if (i !== h) {
                    var j = d.data[i * b + f];
                    for (c = 0; c < b; c++)
                      d.data[i * b + c] -= d.data[h * b + c] * j;
                  }
                f++;
              }
              for (h = 0; h < a; h++) {
                for (g = 0, i = 0; i < b; i++) g || (g = d.data[h * b + i]);
                if (g)
                  for (c = 0; c < b; c++)
                    d.data[h * b + c] = d.data[h * b + c] / g;
              }
              return d;
            }),
            (e.prototype.lu = function () {
              var t,
                r,
                n = this.shape[0],
                o = this.shape[1],
                a = e.plu(this),
                i = a[1],
                s = (e.identity(n), new e(a[0])),
                h = new e(a[0]);
              for (t = 0; t < n; t++)
                for (r = t; r < o; r++) s.data[t * o + r] = t === r ? 1 : 0;
              for (t = 0; t < n; t++)
                for (r = 0; r < t && r < o; r++) h.data[t * o + r] = 0;
              return [s, h, i];
            }),
            (e.plu = function (t) {
              return new e(t).plu();
            }),
            (e.prototype.plu = function () {
              var t,
                r,
                e,
                n,
                o,
                a,
                i,
                s = this.data,
                h = this.shape[0],
                u = new Int32Array(h);
              for (i = 0; i < h; ++i) {
                for (n = i, t = Math.abs(s[i * h + i]), a = i + 1; a < h; ++a)
                  (r = Math.abs(s[a * h + i])), t < r && ((t = r), (n = a));
                for (
                  u[i] = n,
                    n !== i && this.swap(i, n),
                    e = s[i * h + i],
                    o = i + 1;
                  o < h;
                  ++o
                )
                  s[o * h + i] /= e;
                for (o = i + 1; o < h; ++o) {
                  for (a = i + 1; a < h - 1; ++a)
                    (s[o * h + a] -= s[o * h + i] * s[i * h + a]),
                      ++a,
                      (s[o * h + a] -= s[o * h + i] * s[i * h + a]);
                  a === h - 1 && (s[o * h + a] -= s[o * h + i] * s[i * h + a]);
                }
              }
              return [this, u];
            }),
            (e.prototype.lusolve = function (t, r) {
              var e,
                n,
                o,
                a = this.data,
                i = t.shape[0],
                s = t.shape[1],
                h = t.data;
              for (e = 0; e < r.length; e++) e !== r[e] && t.swap(e, r[e]);
              for (o = 0; o < s; o++) {
                for (e = 0; e < i; e++)
                  for (n = 0; n < e; n++)
                    h[e * s + o] -= a[e * i + n] * h[n * s + o];
                for (e = i - 1; e >= 0; e--) {
                  for (n = e + 1; n < i; n++)
                    h[e * s + o] -= a[e * i + n] * h[n * s + o];
                  h[e * s + o] /= a[e * i + e];
                }
              }
              return t;
            }),
            (e.prototype.solve = function (t) {
              var r = e.plu(this),
                n = r[0],
                o = r[1];
              return n.lusolve(new e(t), o);
            }),
            (e.augment = function (t, r) {
              return new e(t).augment(r);
            }),
            (e.prototype.augment = function (t) {
              if (0 === t.shape.length) return this;
              var r,
                e,
                n = this.shape[0],
                o = this.shape[1],
                a = t.shape[0],
                i = t.shape[1],
                s = this.data,
                h = t.data;
              if (n !== a) throw new Error('Rows do not match.');
              var u = o + i,
                p = new this.type(u * n);
              for (r = 0; r < n; r++)
                for (e = 0; e < o; e++) p[r * u + e] = s[r * o + e];
              for (r = 0; r < a; r++)
                for (e = 0; e < i; e++) p[r * u + e + o] = h[r * i + e];
              return (this.shape = [n, u]), (this.data = p), this;
            }),
            (e.identity = function (t, r) {
              return e.fill(t, t, function (t, r) {
                return t === r ? 1 : 0;
              });
            }),
            (e.magic = function (t, r) {
              function n(t, r, e) {
                return (r + 2 * e + 1) % t;
              }
              if (t < 0) throw new Error('invalid size');
              r = r || Float64Array;
              var o,
                a,
                i = new r(t * t);
              for (o = 0; o < t; o++)
                for (a = 0; a < t; a++)
                  i[(t - o - 1) * t + (t - a - 1)] =
                    n(t, t - a - 1, o) * t + n(t, a, o) + 1;
              return e.fromTypedArray(i, [t, t]);
            }),
            (e.prototype.diag = function () {
              var t,
                r = this.shape[0],
                e = this.shape[1],
                o = new this.type(Math.min(r, e));
              for (t = 0; t < r && t < e; t++) o[t] = this.data[t * e + t];
              return new n(o);
            }),
            (e.prototype.determinant = function () {
              if (this.shape[0] !== this.shape[1])
                throw new Error('matrix is not square');
              var t,
                r = e.plu(this),
                n = r.pop(),
                o = r.pop(),
                a = this.shape[0],
                i = this.shape[1],
                s = 1,
                h = 1;
              for (t = 0; t < a; t++) t !== n[t] && (h *= -1);
              for (t = 0; t < a; t++) s *= o.data[t * i + t];
              return h * s;
            }),
            (e.prototype.trace = function () {
              var t,
                r,
                e = this.diag(),
                n = 0;
              for (t = 0, r = e.length; t < r; t++) n += e.get(t);
              return n;
            }),
            (e.equals = function (t, r) {
              return t.equals(r);
            }),
            (e.prototype.equals = function (t) {
              var r = this.shape[0],
                e = this.shape[1],
                n = r * e,
                o = this.data,
                a = t.data;
              if (r !== t.shape[0] || e !== t.shape[1] || this.type !== t.type)
                return !1;
              var i;
              for (i = 0; i < n; i++) if (o[i] !== a[i]) return !1;
              return !0;
            }),
            (e.prototype.get = function (t, r) {
              if (
                t < 0 ||
                r < 0 ||
                t > this.shape[0] - 1 ||
                r > this.shape[1] - 1
              )
                throw new Error('index out of bounds');
              return this.data[t * this.shape[1] + r];
            }),
            (e.prototype.set = function (t, r, e) {
              if (
                t < 0 ||
                r < 0 ||
                t > this.shape[0] - 1 ||
                r > this.shape[1] - 1
              )
                throw new Error('index out of bounds');
              return (this.data[t * this.shape[1] + r] = e), this;
            }),
            (e.prototype.swap = function (t, r) {
              if (
                t < 0 ||
                r < 0 ||
                t > this.shape[0] - 1 ||
                r > this.shape[0] - 1
              )
                throw new Error('index out of bounds');
              var e = this.shape[1],
                n = this.data.slice(t * e, (t + 1) * e);
              return (
                this.data.copyWithin(t * e, r * e, (r + 1) * e),
                this.data.set(n, r * e),
                this
              );
            }),
            (e.prototype.map = function (t) {
              var r,
                n = this.shape[0],
                o = this.shape[1],
                a = n * o,
                i = new e(this),
                s = i.data;
              for (r = 0; r < a; r++)
                s[r] = t.call(i, s[r], (r / o) | 0, r % o, s);
              return i;
            }),
            (e.prototype.each = function (t) {
              var r,
                e = this.shape[0],
                n = this.shape[1],
                o = e * n;
              for (r = 0; r < o; r++)
                t.call(this, this.data[r], (r / n) | 0, r % n);
              return this;
            }),
            (e.prototype.reduce = function (t, r) {
              var e = this.shape[0],
                n = this.shape[1],
                o = e * n;
              if (0 === o && !r)
                throw new Error(
                  'Reduce of empty matrix with no initial value.'
                );
              for (var a = 0, i = r || this.data[a++]; a < o; a++)
                i = t.constructor.call(
                  this,
                  i,
                  this.data[a],
                  (a / n) | 0,
                  a % n
                );
              return i;
            }),
            (e.prototype.rank = function () {
              var t,
                r,
                e,
                o,
                a,
                i,
                s = this.toArray().map(function (t) {
                  return new n(t);
                }),
                h = this.shape[0],
                u = this.shape[1],
                p = 0;
              for (t = 0; t < h - 1; t++) {
                for (o = null, r = t; r < h; r++)
                  if (s[t].get(t)) {
                    t !== r && ((e = s[t]), (s[t] = s[r]), (s[r] = e)),
                      (o = s[t]);
                    break;
                  }
                if (o)
                  for (r = t + 1; r < h; r++)
                    (a = s[r]),
                      (i = a.get(t) / o.get(t)),
                      (s[r] = a.subtract(o.scale(i)));
              }
              for (t = 0; t < h; t++)
                for (r = 0; r < u; r++)
                  if (s[t].get(r)) {
                    p++;
                    break;
                  }
              return p;
            }),
            (e.rank = function (t) {
              return new e(t).rank();
            }),
            (e.prototype.toString = function () {
              var t,
                r = [],
                e = this.shape[0],
                n = this.shape[1];
              for (t = 0; t < e; t++)
                r.push(
                  '[' + this.data.subarray(t * n, (t + 1) * n).toString() + ']'
                );
              return '[' + r.join(', \n') + ']';
            }),
            (e.prototype.toArray = function () {
              var t,
                r = [],
                e = this.shape[0],
                n = this.shape[1];
              for (t = 0; t < e; t++)
                r.push(
                  Array.prototype.slice.call(
                    this.data.subarray(t * n, (t + 1) * n)
                  )
                );
              return r;
            }),
            (r.exports = e);
          try {
            window.Matrix = e;
          } catch (t) {}
        })();
      },
      { './vector': 2 },
    ],
    2: [
      function (t, r, e) {
        !(function () {
          'use strict';
          function t(r) {
            (this.type = Float64Array),
              (this.length = 0),
              r instanceof t
                ? this.combine(r)
                : r && r.shape
                ? ((this.data = new r.type(r.data)),
                  (this.length = r.shape[0] * r.shape[1]),
                  (this.type = r.type))
                : r instanceof Array
                ? ((this.data = new this.type(r)), (this.length = r.length))
                : r &&
                  r.buffer &&
                  r.buffer instanceof ArrayBuffer &&
                  ((this.data = r),
                  (this.length = r.length),
                  (this.type = r.constructor));
          }
          function e(t) {
            return {
              get: function () {
                return this.get(t);
              },
              set: function (r) {
                return this.set(t, r);
              },
            };
          }
          (t.binOp = function (r, e, n) {
            return new t(r).binOp(e, n);
          }),
            (t.prototype.binOp = function (t, r) {
              var e = this.length,
                n = t.length;
              if (e !== n) throw new Error('sizes do not match!');
              if (!e && !n) return this;
              var o;
              for (o = 0; o < e; o++)
                this.data[o] = r(this.data[o], t.data[o], o);
              return this;
            }),
            (t.add = function (r, e) {
              return new t(r).add(e);
            }),
            (t.prototype.add = function (t) {
              return this.binOp(t, function (t, r) {
                return t + r;
              });
            }),
            (t.subtract = function (r, e) {
              return new t(r).subtract(e);
            }),
            (t.prototype.subtract = function (t) {
              return this.binOp(t, function (t, r) {
                return t - r;
              });
            }),
            (t.scale = function (r, e) {
              return new t(r).scale(e);
            }),
            (t.prototype.scale = function (t) {
              return this.each(function (r, e, n) {
                n[e] *= t;
              });
            }),
            (t.normalize = function (r) {
              return new t(r).normalize();
            }),
            (t.prototype.normalize = function () {
              return this.scale(1 / this.magnitude());
            }),
            (t.project = function (r, e) {
              return r.project(new t(e));
            }),
            (t.prototype.project = function (t) {
              return t.scale(this.dot(t) / t.dot(t));
            }),
            (t.fill = function (r, e, n) {
              if (r < 0) throw new Error('invalid size');
              if (0 === r) return new t();
              (e = e || 0), (n = n || Float64Array);
              var o,
                a = new n(r),
                i = 'function' == typeof e;
              for (o = 0; o < r; o++) a[o] = i ? e(o) : e;
              return new t(a);
            }),
            (t.zeros = function (r, e) {
              return t.fill(r, 0, e);
            }),
            (t.ones = function (r, e) {
              return t.fill(r, 1, e);
            }),
            (t.random = function (r, e, n, o) {
              return (
                (e = e || 1),
                (n = n || 0),
                t.fill(
                  r,
                  function () {
                    return e * Math.random() + n;
                  },
                  o
                )
              );
            }),
            (t.range = function () {
              var r,
                e,
                n,
                o = [].slice.call(arguments, 0),
                a = !1,
                i = Float64Array;
              switch (
                ('function' == typeof o[o.length - 1] && (i = o.pop()),
                o.length)
              ) {
                case 2:
                  (n = o.pop()), (e = 1), (r = o.pop());
                  break;
                case 3:
                  (n = o.pop()), (e = o.pop()), (r = o.pop());
                  break;
                default:
                  throw new Error('invalid range');
              }
              if (n - r < 0) {
                var s = n;
                (n = r), (r = s), (a = !0);
              }
              if (e > n - r) throw new Error('invalid range');
              var h,
                u,
                p = new i(Math.ceil((n - r) / e));
              for (h = r, u = 0; h < n; h += e, u++) p[u] = a ? n - h + r : h;
              return new t(p);
            }),
            (t.dot = function (t, r) {
              return t.dot(r);
            }),
            (t.prototype.dot = function (t) {
              if (this.length !== t.length)
                throw new Error('sizes do not match');
              var r,
                e,
                n = this.data,
                o = t.data,
                a = 0;
              for (r = 0, e = this.length; r < e; r++) a += n[r] * o[r];
              return a;
            }),
            (t.prototype.magnitude = function () {
              if (!this.length) return 0;
              var t,
                r,
                e = 0,
                n = this.data;
              for (t = 0, r = this.length; t < r; t++) e += n[t] * n[t];
              return Math.sqrt(e);
            }),
            (t.angle = function (t, r) {
              return t.angle(r);
            }),
            (t.prototype.angle = function (t) {
              return Math.acos(this.dot(t) / this.magnitude() / t.magnitude());
            }),
            (t.equals = function (t, r) {
              return t.equals(r);
            }),
            (t.prototype.equals = function (t) {
              if (this.length !== t.length) return !1;
              for (
                var r = this.data, e = t.data, n = this.length, o = 0;
                o < n && r[o] === e[o];

              )
                o++;
              return o === n;
            }),
            (t.prototype.min = function () {
              return this.reduce(function (t, r) {
                return Math.min(t, r);
              }, Number.POSITIVE_INFINITY);
            }),
            (t.prototype.max = function () {
              return this.reduce(function (t, r) {
                return Math.max(t, r);
              }, Number.NEGATIVE_INFINITY);
            }),
            (t.prototype.check = function (t) {
              if (t < 0 || t > this.length - 1)
                throw new Error('index out of bounds');
            }),
            (t.prototype.get = function (t) {
              return this.check(t), this.data[t];
            }),
            (t.prototype.set = function (t, r) {
              return this.check(t), (this.data[t] = r), this;
            }),
            Object.defineProperties(t.prototype, {
              x: e(0),
              y: e(1),
              z: e(2),
              w: e(3),
            }),
            (t.combine = function (r, e) {
              return new t(r).combine(e);
            }),
            (t.prototype.combine = function (t) {
              if (!t.length) return this;
              if (!this.length)
                return (
                  (this.data = new t.type(t.data)),
                  (this.length = t.length),
                  (this.type = t.type),
                  this
                );
              var r = this.length,
                e = t.length,
                n = this.data,
                o = t.data,
                a = new this.type(r + e);
              return (
                a.set(n),
                a.set(o, r),
                (this.data = a),
                (this.length = r + e),
                this
              );
            }),
            (t.prototype.push = function (r) {
              return this.combine(new t([r]));
            }),
            (t.prototype.map = function (r) {
              var e,
                n = new t(this),
                o = n.data;
              for (e = 0; e < this.length; e++) o[e] = r.call(n, o[e], e, o);
              return n;
            }),
            (t.prototype.each = function (t) {
              var r;
              for (r = 0; r < this.length; r++)
                t.call(this, this.data[r], r, this.data);
              return this;
            }),
            (t.prototype.reduce = function (t, r) {
              var e = this.length;
              if (0 === e && !r)
                throw new Error(
                  'Reduce of empty matrix with no initial value.'
                );
              for (var n = 0, o = r || this.data[n++]; n < e; n++)
                o = t.call(this, o, this.data[n], n, this.data);
              return o;
            }),
            (t.prototype.toString = function () {
              var t,
                r = ['['];
              for (t = 0; t < this.length; t++)
                r.push(t > 0 ? ', ' + this.data[t] : this.data[t]);
              return r.push(']'), r.join('');
            }),
            (t.prototype.toArray = function () {
              return this.data ? Array.prototype.slice.call(this.data) : [];
            }),
            (r.exports = t);
          try {
            window.Vector = t;
          } catch (t) {}
        })();
      },
      {},
    ],
  },
  {},
  [2, 1]
);
!(function (e, d) {
  'object' == typeof module && 'object' == typeof module.exports
    ? (module.exports = e.document
        ? d(e, !0)
        : function (f) {
            if (!f.document) {
              throw new Error('jQuery requires a window with a document');
            }
            return d(f);
          })
    : d(e);
})('undefined' != typeof window ? window : this, function (a, b) {
  var c = [],
    d = a.document,
    e = c.slice,
    f = c.concat,
    g = c.push,
    h = c.indexOf,
    i = {},
    j = i.toString,
    k = i.hasOwnProperty,
    l = {},
    m = '1.12.4',
    n = function (a, b) {
      return new n.fn.init(a, b);
    },
    o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    p = /^-ms-/,
    q = /-([\da-z])/gi,
    r = function (a, b) {
      return b.toUpperCase();
    };
  (n.fn = n.prototype = {
    jquery: m,
    constructor: n,
    selector: '',
    length: 0,
    toArray: function () {
      return e.call(this);
    },
    get: function (a) {
      return null != a
        ? 0 > a
          ? this[a + this.length]
          : this[a]
        : e.call(this);
    },
    pushStack: function (a) {
      var b = n.merge(this.constructor(), a);
      return (b.prevObject = this), (b.context = this.context), b;
    },
    each: function (a) {
      return n.each(this, a);
    },
    map: function (a) {
      return this.pushStack(
        n.map(this, function (b, c) {
          return a.call(b, c, b);
        })
      );
    },
    slice: function () {
      return this.pushStack(e.apply(this, arguments));
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    eq: function (a) {
      var b = this.length,
        c = +a + (0 > a ? b : 0);
      return this.pushStack(c >= 0 && b > c ? [this[c]] : []);
    },
    end: function () {
      return this.prevObject || this.constructor();
    },
    push: g,
    sort: c.sort,
    splice: c.splice,
  }),
    (n.extend = n.fn.extend = function () {
      var a,
        b,
        c,
        d,
        e,
        f,
        g = arguments[0] || {},
        h = 1,
        i = arguments.length,
        j = !1;
      for (
        'boolean' == typeof g && ((j = g), (g = arguments[h] || {}), h++),
          'object' == typeof g || n.isFunction(g) || (g = {}),
          h === i && ((g = this), h--);
        i > h;
        h++
      ) {
        if (null != (e = arguments[h])) {
          for (d in e) {
            (a = g[d]),
              (c = e[d]),
              g !== c &&
                (j && c && (n.isPlainObject(c) || (b = n.isArray(c)))
                  ? (b
                      ? ((b = !1), (f = a && n.isArray(a) ? a : []))
                      : (f = a && n.isPlainObject(a) ? a : {}),
                    (g[d] = n.extend(j, f, c)))
                  : void 0 !== c && (g[d] = c));
          }
        }
      }
      return g;
    }),
    n.extend({
      expando: 'jQuery' + (m + Math.random()).replace(/\D/g, ''),
      isReady: !0,
      error: function (a) {
        throw new Error(a);
      },
      noop: function () {},
      isFunction: function (a) {
        return 'function' === n.type(a);
      },
      isArray:
        Array.isArray ||
        function (a) {
          return 'array' === n.type(a);
        },
      isWindow: function (a) {
        return null != a && a == a.window;
      },
      isNumeric: function (a) {
        var b = a && a.toString();
        return !n.isArray(a) && b - parseFloat(b) + 1 >= 0;
      },
      isEmptyObject: function (a) {
        var b;
        for (b in a) {
          return !1;
        }
        return !0;
      },
      isPlainObject: function (a) {
        var b;
        if (!a || 'object' !== n.type(a) || a.nodeType || n.isWindow(a)) {
          return !1;
        }
        try {
          if (
            a.constructor &&
            !k.call(a, 'constructor') &&
            !k.call(a.constructor.prototype, 'isPrototypeOf')
          ) {
            return !1;
          }
        } catch (c) {
          return !1;
        }
        if (!l.ownFirst) {
          for (b in a) {
            return k.call(a, b);
          }
        }
        for (b in a) {
        }
        return void 0 === b || k.call(a, b);
      },
      type: function (a) {
        return null == a
          ? a + ''
          : 'object' == typeof a || 'function' == typeof a
          ? i[j.call(a)] || 'object'
          : typeof a;
      },
      globalEval: function (b) {
        b &&
          n.trim(b) &&
          (
            a.execScript ||
            function (b) {
              a.eval.call(a, b);
            }
          )(b);
      },
      camelCase: function (a) {
        return a.replace(p, 'ms-').replace(q, r);
      },
      nodeName: function (a, b) {
        return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
      },
      each: function (a, b) {
        var c,
          d = 0;
        if (s(a)) {
          for (c = a.length; c > d; d++) {
            if (b.call(a[d], d, a[d]) === !1) {
              break;
            }
          }
        } else {
          for (d in a) {
            if (b.call(a[d], d, a[d]) === !1) {
              break;
            }
          }
        }
        return a;
      },
      trim: function (a) {
        return null == a ? '' : (a + '').replace(o, '');
      },
      makeArray: function (a, b) {
        var c = b || [];
        return (
          null != a &&
            (s(Object(a))
              ? n.merge(c, 'string' == typeof a ? [a] : a)
              : g.call(c, a)),
          c
        );
      },
      inArray: function (a, b, c) {
        var d;
        if (b) {
          if (h) {
            return h.call(b, a, c);
          }
          for (
            d = b.length, c = c ? (0 > c ? Math.max(0, d + c) : c) : 0;
            d > c;
            c++
          ) {
            if (c in b && b[c] === a) {
              return c;
            }
          }
        }
        return -1;
      },
      merge: function (a, b) {
        var c = +b.length,
          d = 0,
          e = a.length;
        while (c > d) {
          a[e++] = b[d++];
        }
        if (c !== c) {
          while (void 0 !== b[d]) {
            a[e++] = b[d++];
          }
        }
        return (a.length = e), a;
      },
      grep: function (a, b, c) {
        for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) {
          (d = !b(a[f], f)), d !== h && e.push(a[f]);
        }
        return e;
      },
      map: function (a, b, c) {
        var d,
          e,
          g = 0,
          h = [];
        if (s(a)) {
          for (d = a.length; d > g; g++) {
            (e = b(a[g], g, c)), null != e && h.push(e);
          }
        } else {
          for (g in a) {
            (e = b(a[g], g, c)), null != e && h.push(e);
          }
        }
        return f.apply([], h);
      },
      guid: 1,
      proxy: function (a, b) {
        var c, d, f;
        return (
          'string' == typeof b && ((f = a[b]), (b = a), (a = f)),
          n.isFunction(a)
            ? ((c = e.call(arguments, 2)),
              (d = function () {
                return a.apply(b || this, c.concat(e.call(arguments)));
              }),
              (d.guid = a.guid = a.guid || n.guid++),
              d)
            : void 0
        );
      },
      now: function () {
        return +new Date();
      },
      support: l,
    }),
    'function' == typeof Symbol && (n.fn[Symbol.iterator] = c[Symbol.iterator]),
    n.each(
      'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(
        ' '
      ),
      function (a, b) {
        i['[object ' + b + ']'] = b.toLowerCase();
      }
    );
  function s(a) {
    var b = !!a && 'length' in a && a.length,
      c = n.type(a);
    return 'function' === c || n.isWindow(a)
      ? !1
      : 'array' === c ||
          0 === b ||
          ('number' == typeof b && b > 0 && b - 1 in a);
  }
  var t = (function (a) {
    var b,
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      k,
      l,
      m,
      n,
      o,
      p,
      q,
      r,
      s,
      t,
      u = 'sizzle' + 1 * new Date(),
      v = a.document,
      w = 0,
      x = 0,
      y = ga(),
      z = ga(),
      A = ga(),
      B = function (a, b) {
        return a === b && (l = !0), 0;
      },
      C = 1 << 31,
      D = {}.hasOwnProperty,
      E = [],
      F = E.pop,
      G = E.push,
      H = E.push,
      I = E.slice,
      J = function (a, b) {
        for (var c = 0, d = a.length; d > c; c++) {
          if (a[c] === b) {
            return c;
          }
        }
        return -1;
      },
      K =
        'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
      L = '[\\x20\\t\\r\\n\\f]',
      M = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+',
      N =
        '\\[' +
        L +
        '*(' +
        M +
        ')(?:' +
        L +
        '*([*^$|!~]?=)' +
        L +
        '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
        M +
        '))|)' +
        L +
        '*\\]',
      O =
        ':(' +
        M +
        ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' +
        N +
        ')*)|.*)\\)|)',
      P = new RegExp(L + '+', 'g'),
      Q = new RegExp('^' + L + '+|((?:^|[^\\\\])(?:\\\\.)*)' + L + '+$', 'g'),
      R = new RegExp('^' + L + '*,' + L + '*'),
      S = new RegExp('^' + L + '*([>+~]|' + L + ')' + L + '*'),
      T = new RegExp('=' + L + '*([^\\]\'"]*?)' + L + '*\\]', 'g'),
      U = new RegExp(O),
      V = new RegExp('^' + M + '$'),
      W = {
        ID: new RegExp('^#(' + M + ')'),
        CLASS: new RegExp('^\\.(' + M + ')'),
        TAG: new RegExp('^(' + M + '|[*])'),
        ATTR: new RegExp('^' + N),
        PSEUDO: new RegExp('^' + O),
        CHILD: new RegExp(
          '^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
            L +
            '*(even|odd|(([+-]|)(\\d*)n|)' +
            L +
            '*(?:([+-]|)' +
            L +
            '*(\\d+)|))' +
            L +
            '*\\)|)',
          'i'
        ),
        bool: new RegExp('^(?:' + K + ')$', 'i'),
        needsContext: new RegExp(
          '^' +
            L +
            '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
            L +
            '*((?:-\\d)?\\d*)' +
            L +
            '*\\)|)(?=[^-]|$)',
          'i'
        ),
      },
      X = /^(?:input|select|textarea|button)$/i,
      Y = /^h\d$/i,
      Z = /^[^{]+\{\s*\[native \w/,
      $ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      _ = /[+~]/,
      aa = /'|\\/g,
      ba = new RegExp('\\\\([\\da-f]{1,6}' + L + '?|(' + L + ')|.)', 'ig'),
      ca = function (a, b, c) {
        var d = '0x' + b - 65536;
        return d !== d || c
          ? b
          : 0 > d
          ? String.fromCharCode(d + 65536)
          : String.fromCharCode((d >> 10) | 55296, (1023 & d) | 56320);
      },
      da = function () {
        m();
      };
    try {
      H.apply((E = I.call(v.childNodes)), v.childNodes),
        E[v.childNodes.length].nodeType;
    } catch (ea) {
      H = {
        apply: E.length
          ? function (a, b) {
              G.apply(a, I.call(b));
            }
          : function (a, b) {
              var c = a.length,
                d = 0;
              while ((a[c++] = b[d++])) {}
              a.length = c - 1;
            },
      };
    }
    function fa(a, b, d, e) {
      var f,
        h,
        j,
        k,
        l,
        o,
        r,
        s,
        w = b && b.ownerDocument,
        x = b ? b.nodeType : 9;
      if (
        ((d = d || []),
        'string' != typeof a || !a || (1 !== x && 9 !== x && 11 !== x))
      ) {
        return d;
      }
      if (
        !e &&
        ((b ? b.ownerDocument || b : v) !== n && m(b), (b = b || n), p)
      ) {
        if (11 !== x && (o = $.exec(a))) {
          if ((f = o[1])) {
            if (9 === x) {
              if (!(j = b.getElementById(f))) {
                return d;
              }
              if (j.id === f) {
                return d.push(j), d;
              }
            } else {
              if (w && (j = w.getElementById(f)) && t(b, j) && j.id === f) {
                return d.push(j), d;
              }
            }
          } else {
            if (o[2]) {
              return H.apply(d, b.getElementsByTagName(a)), d;
            }
            if (
              (f = o[3]) &&
              c.getElementsByClassName &&
              b.getElementsByClassName
            ) {
              return H.apply(d, b.getElementsByClassName(f)), d;
            }
          }
        }
        if (c.qsa && !A[a + ' '] && (!q || !q.test(a))) {
          if (1 !== x) {
            (w = b), (s = a);
          } else {
            if ('object' !== b.nodeName.toLowerCase()) {
              (k = b.getAttribute('id'))
                ? (k = k.replace(aa, '\\$&'))
                : b.setAttribute('id', (k = u)),
                (r = g(a)),
                (h = r.length),
                (l = V.test(k) ? '#' + k : "[id='" + k + "']");
              while (h--) {
                r[h] = l + ' ' + qa(r[h]);
              }
              (s = r.join(',')), (w = (_.test(a) && oa(b.parentNode)) || b);
            }
          }
          if (s) {
            try {
              return H.apply(d, w.querySelectorAll(s)), d;
            } catch (y) {
            } finally {
              k === u && b.removeAttribute('id');
            }
          }
        }
      }
      return i(a.replace(Q, '$1'), b, d, e);
    }
    function ga() {
      var a = [];
      function b(c, e) {
        return (
          a.push(c + ' ') > d.cacheLength && delete b[a.shift()],
          (b[c + ' '] = e)
        );
      }
      return b;
    }
    function ha(a) {
      return (a[u] = !0), a;
    }
    function ia(a) {
      var b = n.createElement('div');
      try {
        return !!a(b);
      } catch (c) {
        return !1;
      } finally {
        b.parentNode && b.parentNode.removeChild(b), (b = null);
      }
    }
    function ja(a, b) {
      var c = a.split('|'),
        e = c.length;
      while (e--) {
        d.attrHandle[c[e]] = b;
      }
    }
    function ka(a, b) {
      var c = b && a,
        d =
          c &&
          1 === a.nodeType &&
          1 === b.nodeType &&
          (~b.sourceIndex || C) - (~a.sourceIndex || C);
      if (d) {
        return d;
      }
      if (c) {
        while ((c = c.nextSibling)) {
          if (c === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    function la(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();
        return 'input' === c && b.type === a;
      };
    }
    function ma(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();
        return ('input' === c || 'button' === c) && b.type === a;
      };
    }
    function na(a) {
      return ha(function (b) {
        return (
          (b = +b),
          ha(function (c, d) {
            var e,
              f = a([], c.length, b),
              g = f.length;
            while (g--) {
              c[(e = f[g])] && (c[e] = !(d[e] = c[e]));
            }
          })
        );
      });
    }
    function oa(a) {
      return a && 'undefined' != typeof a.getElementsByTagName && a;
    }
    (c = fa.support = {}),
      (f = fa.isXML = function (a) {
        var b = a && (a.ownerDocument || a).documentElement;
        return b ? 'HTML' !== b.nodeName : !1;
      }),
      (m = fa.setDocument = function (a) {
        var b,
          e,
          g = a ? a.ownerDocument || a : v;
        return g !== n && 9 === g.nodeType && g.documentElement
          ? ((n = g),
            (o = n.documentElement),
            (p = !f(n)),
            (e = n.defaultView) &&
              e.top !== e &&
              (e.addEventListener
                ? e.addEventListener('unload', da, !1)
                : e.attachEvent && e.attachEvent('onunload', da)),
            (c.attributes = ia(function (a) {
              return (a.className = 'i'), !a.getAttribute('className');
            })),
            (c.getElementsByTagName = ia(function (a) {
              return (
                a.appendChild(n.createComment('')),
                !a.getElementsByTagName('*').length
              );
            })),
            (c.getElementsByClassName = Z.test(n.getElementsByClassName)),
            (c.getById = ia(function (a) {
              return (
                (o.appendChild(a).id = u),
                !n.getElementsByName || !n.getElementsByName(u).length
              );
            })),
            c.getById
              ? ((d.find.ID = function (a, b) {
                  if ('undefined' != typeof b.getElementById && p) {
                    var c = b.getElementById(a);
                    return c ? [c] : [];
                  }
                }),
                (d.filter.ID = function (a) {
                  var b = a.replace(ba, ca);
                  return function (a) {
                    return a.getAttribute('id') === b;
                  };
                }))
              : (delete d.find.ID,
                (d.filter.ID = function (a) {
                  var b = a.replace(ba, ca);
                  return function (a) {
                    var c =
                      'undefined' != typeof a.getAttributeNode &&
                      a.getAttributeNode('id');
                    return c && c.value === b;
                  };
                })),
            (d.find.TAG = c.getElementsByTagName
              ? function (a, b) {
                  return 'undefined' != typeof b.getElementsByTagName
                    ? b.getElementsByTagName(a)
                    : c.qsa
                    ? b.querySelectorAll(a)
                    : void 0;
                }
              : function (a, b) {
                  var c,
                    d = [],
                    e = 0,
                    f = b.getElementsByTagName(a);
                  if ('*' === a) {
                    while ((c = f[e++])) {
                      1 === c.nodeType && d.push(c);
                    }
                    return d;
                  }
                  return f;
                }),
            (d.find.CLASS =
              c.getElementsByClassName &&
              function (a, b) {
                return 'undefined' != typeof b.getElementsByClassName && p
                  ? b.getElementsByClassName(a)
                  : void 0;
              }),
            (r = []),
            (q = []),
            (c.qsa = Z.test(n.querySelectorAll)) &&
              (ia(function (a) {
                (o.appendChild(a).innerHTML =
                  "<a id='" +
                  u +
                  "'></a><select id='" +
                  u +
                  "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                  a.querySelectorAll("[msallowcapture^='']").length &&
                    q.push('[*^$]=' + L + '*(?:\'\'|"")'),
                  a.querySelectorAll('[selected]').length ||
                    q.push('\\[' + L + '*(?:value|' + K + ')'),
                  a.querySelectorAll('[id~=' + u + '-]').length || q.push('~='),
                  a.querySelectorAll(':checked').length || q.push(':checked'),
                  a.querySelectorAll('a#' + u + '+*').length ||
                    q.push('.#.+[+~]');
              }),
              ia(function (a) {
                var b = n.createElement('input');
                b.setAttribute('type', 'hidden'),
                  a.appendChild(b).setAttribute('name', 'D'),
                  a.querySelectorAll('[name=d]').length &&
                    q.push('name' + L + '*[*^$|!~]?='),
                  a.querySelectorAll(':enabled').length ||
                    q.push(':enabled', ':disabled'),
                  a.querySelectorAll('*,:x'),
                  q.push(',.*:');
              })),
            (c.matchesSelector = Z.test(
              (s =
                o.matches ||
                o.webkitMatchesSelector ||
                o.mozMatchesSelector ||
                o.oMatchesSelector ||
                o.msMatchesSelector)
            )) &&
              ia(function (a) {
                (c.disconnectedMatch = s.call(a, 'div')),
                  s.call(a, "[s!='']:x"),
                  r.push('!=', O);
              }),
            (q = q.length && new RegExp(q.join('|'))),
            (r = r.length && new RegExp(r.join('|'))),
            (b = Z.test(o.compareDocumentPosition)),
            (t =
              b || Z.test(o.contains)
                ? function (a, b) {
                    var c = 9 === a.nodeType ? a.documentElement : a,
                      d = b && b.parentNode;
                    return (
                      a === d ||
                      !(
                        !d ||
                        1 !== d.nodeType ||
                        !(c.contains
                          ? c.contains(d)
                          : a.compareDocumentPosition &&
                            16 & a.compareDocumentPosition(d))
                      )
                    );
                  }
                : function (a, b) {
                    if (b) {
                      while ((b = b.parentNode)) {
                        if (b === a) {
                          return !0;
                        }
                      }
                    }
                    return !1;
                  }),
            (B = b
              ? function (a, b) {
                  if (a === b) {
                    return (l = !0), 0;
                  }
                  var d =
                    !a.compareDocumentPosition - !b.compareDocumentPosition;
                  return d
                    ? d
                    : ((d =
                        (a.ownerDocument || a) === (b.ownerDocument || b)
                          ? a.compareDocumentPosition(b)
                          : 1),
                      1 & d ||
                      (!c.sortDetached && b.compareDocumentPosition(a) === d)
                        ? a === n || (a.ownerDocument === v && t(v, a))
                          ? -1
                          : b === n || (b.ownerDocument === v && t(v, b))
                          ? 1
                          : k
                          ? J(k, a) - J(k, b)
                          : 0
                        : 4 & d
                        ? -1
                        : 1);
                }
              : function (a, b) {
                  if (a === b) {
                    return (l = !0), 0;
                  }
                  var c,
                    d = 0,
                    e = a.parentNode,
                    f = b.parentNode,
                    g = [a],
                    h = [b];
                  if (!e || !f) {
                    return a === n
                      ? -1
                      : b === n
                      ? 1
                      : e
                      ? -1
                      : f
                      ? 1
                      : k
                      ? J(k, a) - J(k, b)
                      : 0;
                  }
                  if (e === f) {
                    return ka(a, b);
                  }
                  c = a;
                  while ((c = c.parentNode)) {
                    g.unshift(c);
                  }
                  c = b;
                  while ((c = c.parentNode)) {
                    h.unshift(c);
                  }
                  while (g[d] === h[d]) {
                    d++;
                  }
                  return d
                    ? ka(g[d], h[d])
                    : g[d] === v
                    ? -1
                    : h[d] === v
                    ? 1
                    : 0;
                }),
            n)
          : n;
      }),
      (fa.matches = function (a, b) {
        return fa(a, null, null, b);
      }),
      (fa.matchesSelector = function (a, b) {
        if (
          ((a.ownerDocument || a) !== n && m(a),
          (b = b.replace(T, "='$1']")),
          c.matchesSelector &&
            p &&
            !A[b + ' '] &&
            (!r || !r.test(b)) &&
            (!q || !q.test(b)))
        ) {
          try {
            var d = s.call(a, b);
            if (
              d ||
              c.disconnectedMatch ||
              (a.document && 11 !== a.document.nodeType)
            ) {
              return d;
            }
          } catch (e) {}
        }
        return fa(b, n, null, [a]).length > 0;
      }),
      (fa.contains = function (a, b) {
        return (a.ownerDocument || a) !== n && m(a), t(a, b);
      }),
      (fa.attr = function (a, b) {
        (a.ownerDocument || a) !== n && m(a);
        var e = d.attrHandle[b.toLowerCase()],
          f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
        return void 0 !== f
          ? f
          : c.attributes || !p
          ? a.getAttribute(b)
          : (f = a.getAttributeNode(b)) && f.specified
          ? f.value
          : null;
      }),
      (fa.error = function (a) {
        throw new Error('Syntax error, unrecognized expression: ' + a);
      }),
      (fa.uniqueSort = function (a) {
        var b,
          d = [],
          e = 0,
          f = 0;
        if (
          ((l = !c.detectDuplicates),
          (k = !c.sortStable && a.slice(0)),
          a.sort(B),
          l)
        ) {
          while ((b = a[f++])) {
            b === a[f] && (e = d.push(f));
          }
          while (e--) {
            a.splice(d[e], 1);
          }
        }
        return (k = null), a;
      }),
      (e = fa.getText = function (a) {
        var b,
          c = '',
          d = 0,
          f = a.nodeType;
        if (f) {
          if (1 === f || 9 === f || 11 === f) {
            if ('string' == typeof a.textContent) {
              return a.textContent;
            }
            for (a = a.firstChild; a; a = a.nextSibling) {
              c += e(a);
            }
          } else {
            if (3 === f || 4 === f) {
              return a.nodeValue;
            }
          }
        } else {
          while ((b = a[d++])) {
            c += e(b);
          }
        }
        return c;
      }),
      (d = fa.selectors = {
        cacheLength: 50,
        createPseudo: ha,
        match: W,
        attrHandle: {},
        find: {},
        relative: {
          '>': { dir: 'parentNode', first: !0 },
          ' ': { dir: 'parentNode' },
          '+': { dir: 'previousSibling', first: !0 },
          '~': { dir: 'previousSibling' },
        },
        preFilter: {
          ATTR: function (a) {
            return (
              (a[1] = a[1].replace(ba, ca)),
              (a[3] = (a[3] || a[4] || a[5] || '').replace(ba, ca)),
              '~=' === a[2] && (a[3] = ' ' + a[3] + ' '),
              a.slice(0, 4)
            );
          },
          CHILD: function (a) {
            return (
              (a[1] = a[1].toLowerCase()),
              'nth' === a[1].slice(0, 3)
                ? (a[3] || fa.error(a[0]),
                  (a[4] = +(a[4]
                    ? a[5] + (a[6] || 1)
                    : 2 * ('even' === a[3] || 'odd' === a[3]))),
                  (a[5] = +(a[7] + a[8] || 'odd' === a[3])))
                : a[3] && fa.error(a[0]),
              a
            );
          },
          PSEUDO: function (a) {
            var b,
              c = !a[6] && a[2];
            return W.CHILD.test(a[0])
              ? null
              : (a[3]
                  ? (a[2] = a[4] || a[5] || '')
                  : c &&
                    U.test(c) &&
                    (b = g(c, !0)) &&
                    (b = c.indexOf(')', c.length - b) - c.length) &&
                    ((a[0] = a[0].slice(0, b)), (a[2] = c.slice(0, b))),
                a.slice(0, 3));
          },
        },
        filter: {
          TAG: function (a) {
            var b = a.replace(ba, ca).toLowerCase();
            return '*' === a
              ? function () {
                  return !0;
                }
              : function (a) {
                  return a.nodeName && a.nodeName.toLowerCase() === b;
                };
          },
          CLASS: function (a) {
            var b = y[a + ' '];
            return (
              b ||
              ((b = new RegExp('(^|' + L + ')' + a + '(' + L + '|$)')) &&
                y(a, function (a) {
                  return b.test(
                    ('string' == typeof a.className && a.className) ||
                      ('undefined' != typeof a.getAttribute &&
                        a.getAttribute('class')) ||
                      ''
                  );
                }))
            );
          },
          ATTR: function (a, b, c) {
            return function (d) {
              var e = fa.attr(d, a);
              return null == e
                ? '!=' === b
                : b
                ? ((e += ''),
                  '=' === b
                    ? e === c
                    : '!=' === b
                    ? e !== c
                    : '^=' === b
                    ? c && 0 === e.indexOf(c)
                    : '*=' === b
                    ? c && e.indexOf(c) > -1
                    : '$=' === b
                    ? c && e.slice(-c.length) === c
                    : '~=' === b
                    ? (' ' + e.replace(P, ' ') + ' ').indexOf(c) > -1
                    : '|=' === b
                    ? e === c || e.slice(0, c.length + 1) === c + '-'
                    : !1)
                : !0;
            };
          },
          CHILD: function (a, b, c, d, e) {
            var f = 'nth' !== a.slice(0, 3),
              g = 'last' !== a.slice(-4),
              h = 'of-type' === b;
            return 1 === d && 0 === e
              ? function (a) {
                  return !!a.parentNode;
                }
              : function (b, c, i) {
                  var j,
                    k,
                    l,
                    m,
                    n,
                    o,
                    p = f !== g ? 'nextSibling' : 'previousSibling',
                    q = b.parentNode,
                    r = h && b.nodeName.toLowerCase(),
                    s = !i && !h,
                    t = !1;
                  if (q) {
                    if (f) {
                      while (p) {
                        m = b;
                        while ((m = m[p])) {
                          if (
                            h
                              ? m.nodeName.toLowerCase() === r
                              : 1 === m.nodeType
                          ) {
                            return !1;
                          }
                        }
                        o = p = 'only' === a && !o && 'nextSibling';
                      }
                      return !0;
                    }
                    if (((o = [g ? q.firstChild : q.lastChild]), g && s)) {
                      (m = q),
                        (l = m[u] || (m[u] = {})),
                        (k = l[m.uniqueID] || (l[m.uniqueID] = {})),
                        (j = k[a] || []),
                        (n = j[0] === w && j[1]),
                        (t = n && j[2]),
                        (m = n && q.childNodes[n]);
                      while (
                        (m = (++n && m && m[p]) || (t = n = 0) || o.pop())
                      ) {
                        if (1 === m.nodeType && ++t && m === b) {
                          k[a] = [w, n, t];
                          break;
                        }
                      }
                    } else {
                      if (
                        (s &&
                          ((m = b),
                          (l = m[u] || (m[u] = {})),
                          (k = l[m.uniqueID] || (l[m.uniqueID] = {})),
                          (j = k[a] || []),
                          (n = j[0] === w && j[1]),
                          (t = n)),
                        t === !1)
                      ) {
                        while (
                          (m = (++n && m && m[p]) || (t = n = 0) || o.pop())
                        ) {
                          if (
                            (h
                              ? m.nodeName.toLowerCase() === r
                              : 1 === m.nodeType) &&
                            ++t &&
                            (s &&
                              ((l = m[u] || (m[u] = {})),
                              (k = l[m.uniqueID] || (l[m.uniqueID] = {})),
                              (k[a] = [w, t])),
                            m === b)
                          ) {
                            break;
                          }
                        }
                      }
                    }
                    return (t -= e), t === d || (t % d === 0 && t / d >= 0);
                  }
                };
          },
          PSEUDO: function (a, b) {
            var c,
              e =
                d.pseudos[a] ||
                d.setFilters[a.toLowerCase()] ||
                fa.error('unsupported pseudo: ' + a);
            return e[u]
              ? e(b)
              : e.length > 1
              ? ((c = [a, a, '', b]),
                d.setFilters.hasOwnProperty(a.toLowerCase())
                  ? ha(function (a, c) {
                      var d,
                        f = e(a, b),
                        g = f.length;
                      while (g--) {
                        (d = J(a, f[g])), (a[d] = !(c[d] = f[g]));
                      }
                    })
                  : function (a) {
                      return e(a, 0, c);
                    })
              : e;
          },
        },
        pseudos: {
          not: ha(function (a) {
            var b = [],
              c = [],
              d = h(a.replace(Q, '$1'));
            return d[u]
              ? ha(function (a, b, c, e) {
                  var f,
                    g = d(a, null, e, []),
                    h = a.length;
                  while (h--) {
                    (f = g[h]) && (a[h] = !(b[h] = f));
                  }
                })
              : function (a, e, f) {
                  return (b[0] = a), d(b, null, f, c), (b[0] = null), !c.pop();
                };
          }),
          has: ha(function (a) {
            return function (b) {
              return fa(a, b).length > 0;
            };
          }),
          contains: ha(function (a) {
            return (
              (a = a.replace(ba, ca)),
              function (b) {
                return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;
              }
            );
          }),
          lang: ha(function (a) {
            return (
              V.test(a || '') || fa.error('unsupported lang: ' + a),
              (a = a.replace(ba, ca).toLowerCase()),
              function (b) {
                var c;
                do {
                  if (
                    (c = p
                      ? b.lang
                      : b.getAttribute('xml:lang') || b.getAttribute('lang'))
                  ) {
                    return (
                      (c = c.toLowerCase()), c === a || 0 === c.indexOf(a + '-')
                    );
                  }
                } while ((b = b.parentNode) && 1 === b.nodeType);
                return !1;
              }
            );
          }),
          target: function (b) {
            var c = a.location && a.location.hash;
            return c && c.slice(1) === b.id;
          },
          root: function (a) {
            return a === o;
          },
          focus: function (a) {
            return (
              a === n.activeElement &&
              (!n.hasFocus || n.hasFocus()) &&
              !!(a.type || a.href || ~a.tabIndex)
            );
          },
          enabled: function (a) {
            return a.disabled === !1;
          },
          disabled: function (a) {
            return a.disabled === !0;
          },
          checked: function (a) {
            var b = a.nodeName.toLowerCase();
            return (
              ('input' === b && !!a.checked) || ('option' === b && !!a.selected)
            );
          },
          selected: function (a) {
            return (
              a.parentNode && a.parentNode.selectedIndex, a.selected === !0
            );
          },
          empty: function (a) {
            for (a = a.firstChild; a; a = a.nextSibling) {
              if (a.nodeType < 6) {
                return !1;
              }
            }
            return !0;
          },
          parent: function (a) {
            return !d.pseudos.empty(a);
          },
          header: function (a) {
            return Y.test(a.nodeName);
          },
          input: function (a) {
            return X.test(a.nodeName);
          },
          button: function (a) {
            var b = a.nodeName.toLowerCase();
            return ('input' === b && 'button' === a.type) || 'button' === b;
          },
          text: function (a) {
            var b;
            return (
              'input' === a.nodeName.toLowerCase() &&
              'text' === a.type &&
              (null == (b = a.getAttribute('type')) ||
                'text' === b.toLowerCase())
            );
          },
          first: na(function () {
            return [0];
          }),
          last: na(function (a, b) {
            return [b - 1];
          }),
          eq: na(function (a, b, c) {
            return [0 > c ? c + b : c];
          }),
          even: na(function (a, b) {
            for (var c = 0; b > c; c += 2) {
              a.push(c);
            }
            return a;
          }),
          odd: na(function (a, b) {
            for (var c = 1; b > c; c += 2) {
              a.push(c);
            }
            return a;
          }),
          lt: na(function (a, b, c) {
            for (var d = 0 > c ? c + b : c; --d >= 0; ) {
              a.push(d);
            }
            return a;
          }),
          gt: na(function (a, b, c) {
            for (var d = 0 > c ? c + b : c; ++d < b; ) {
              a.push(d);
            }
            return a;
          }),
        },
      }),
      (d.pseudos.nth = d.pseudos.eq);
    for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) {
      d.pseudos[b] = la(b);
    }
    for (b in { submit: !0, reset: !0 }) {
      d.pseudos[b] = ma(b);
    }
    function pa() {}
    (pa.prototype = d.filters = d.pseudos),
      (d.setFilters = new pa()),
      (g = fa.tokenize = function (a, b) {
        var c,
          e,
          f,
          g,
          h,
          i,
          j,
          k = z[a + ' '];
        if (k) {
          return b ? 0 : k.slice(0);
        }
        (h = a), (i = []), (j = d.preFilter);
        while (h) {
          (c && !(e = R.exec(h))) ||
            (e && (h = h.slice(e[0].length) || h), i.push((f = []))),
            (c = !1),
            (e = S.exec(h)) &&
              ((c = e.shift()),
              f.push({ value: c, type: e[0].replace(Q, ' ') }),
              (h = h.slice(c.length)));
          for (g in d.filter) {
            !(e = W[g].exec(h)) ||
              (j[g] && !(e = j[g](e))) ||
              ((c = e.shift()),
              f.push({ value: c, type: g, matches: e }),
              (h = h.slice(c.length)));
          }
          if (!c) {
            break;
          }
        }
        return b ? h.length : h ? fa.error(a) : z(a, i).slice(0);
      });
    function qa(a) {
      for (var b = 0, c = a.length, d = ''; c > b; b++) {
        d += a[b].value;
      }
      return d;
    }
    function ra(a, b, c) {
      var d = b.dir,
        e = c && 'parentNode' === d,
        f = x++;
      return b.first
        ? function (b, c, f) {
            while ((b = b[d])) {
              if (1 === b.nodeType || e) {
                return a(b, c, f);
              }
            }
          }
        : function (b, c, g) {
            var h,
              i,
              j,
              k = [w, f];
            if (g) {
              while ((b = b[d])) {
                if ((1 === b.nodeType || e) && a(b, c, g)) {
                  return !0;
                }
              }
            } else {
              while ((b = b[d])) {
                if (1 === b.nodeType || e) {
                  if (
                    ((j = b[u] || (b[u] = {})),
                    (i = j[b.uniqueID] || (j[b.uniqueID] = {})),
                    (h = i[d]) && h[0] === w && h[1] === f)
                  ) {
                    return (k[2] = h[2]);
                  }
                  if (((i[d] = k), (k[2] = a(b, c, g)))) {
                    return !0;
                  }
                }
              }
            }
          };
    }
    function sa(a) {
      return a.length > 1
        ? function (b, c, d) {
            var e = a.length;
            while (e--) {
              if (!a[e](b, c, d)) {
                return !1;
              }
            }
            return !0;
          }
        : a[0];
    }
    function ta(a, b, c) {
      for (var d = 0, e = b.length; e > d; d++) {
        fa(a, b[d], c);
      }
      return c;
    }
    function ua(a, b, c, d, e) {
      for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) {
        (f = a[h]) && ((c && !c(f, d, e)) || (g.push(f), j && b.push(h)));
      }
      return g;
    }
    function va(a, b, c, d, e, f) {
      return (
        d && !d[u] && (d = va(d)),
        e && !e[u] && (e = va(e, f)),
        ha(function (f, g, h, i) {
          var j,
            k,
            l,
            m = [],
            n = [],
            o = g.length,
            p = f || ta(b || '*', h.nodeType ? [h] : h, []),
            q = !a || (!f && b) ? p : ua(p, m, a, h, i),
            r = c ? (e || (f ? a : o || d) ? [] : g) : q;
          if ((c && c(q, r, h, i), d)) {
            (j = ua(r, n)), d(j, [], h, i), (k = j.length);
            while (k--) {
              (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
            }
          }
          if (f) {
            if (e || a) {
              if (e) {
                (j = []), (k = r.length);
                while (k--) {
                  (l = r[k]) && j.push((q[k] = l));
                }
                e(null, (r = []), j, i);
              }
              k = r.length;
              while (k--) {
                (l = r[k]) &&
                  (j = e ? J(f, l) : m[k]) > -1 &&
                  (f[j] = !(g[j] = l));
              }
            }
          } else {
            (r = ua(r === g ? r.splice(o, r.length) : r)),
              e ? e(null, g, r, i) : H.apply(g, r);
          }
        })
      );
    }
    function wa(a) {
      for (
        var b,
          c,
          e,
          f = a.length,
          g = d.relative[a[0].type],
          h = g || d.relative[' '],
          i = g ? 1 : 0,
          k = ra(
            function (a) {
              return a === b;
            },
            h,
            !0
          ),
          l = ra(
            function (a) {
              return J(b, a) > -1;
            },
            h,
            !0
          ),
          m = [
            function (a, c, d) {
              var e =
                (!g && (d || c !== j)) ||
                ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
              return (b = null), e;
            },
          ];
        f > i;
        i++
      ) {
        if ((c = d.relative[a[i].type])) {
          m = [ra(sa(m), c)];
        } else {
          if (((c = d.filter[a[i].type].apply(null, a[i].matches)), c[u])) {
            for (e = ++i; f > e; e++) {
              if (d.relative[a[e].type]) {
                break;
              }
            }
            return va(
              i > 1 && sa(m),
              i > 1 &&
                qa(
                  a
                    .slice(0, i - 1)
                    .concat({ value: ' ' === a[i - 2].type ? '*' : '' })
                ).replace(Q, '$1'),
              c,
              e > i && wa(a.slice(i, e)),
              f > e && wa((a = a.slice(e))),
              f > e && qa(a)
            );
          }
          m.push(c);
        }
      }
      return sa(m);
    }
    function xa(a, b) {
      var c = b.length > 0,
        e = a.length > 0,
        f = function (f, g, h, i, k) {
          var l,
            o,
            q,
            r = 0,
            s = '0',
            t = f && [],
            u = [],
            v = j,
            x = f || (e && d.find.TAG('*', k)),
            y = (w += null == v ? 1 : Math.random() || 0.1),
            z = x.length;
          for (
            k && (j = g === n || g || k);
            s !== z && null != (l = x[s]);
            s++
          ) {
            if (e && l) {
              (o = 0), g || l.ownerDocument === n || (m(l), (h = !p));
              while ((q = a[o++])) {
                if (q(l, g || n, h)) {
                  i.push(l);
                  break;
                }
              }
              k && (w = y);
            }
            c && ((l = !q && l) && r--, f && t.push(l));
          }
          if (((r += s), c && s !== r)) {
            o = 0;
            while ((q = b[o++])) {
              q(t, u, g, h);
            }
            if (f) {
              if (r > 0) {
                while (s--) {
                  t[s] || u[s] || (u[s] = F.call(i));
                }
              }
              u = ua(u);
            }
            H.apply(i, u),
              k && !f && u.length > 0 && r + b.length > 1 && fa.uniqueSort(i);
          }
          return k && ((w = y), (j = v)), t;
        };
      return c ? ha(f) : f;
    }
    return (
      (h = fa.compile = function (a, b) {
        var c,
          d = [],
          e = [],
          f = A[a + ' '];
        if (!f) {
          b || (b = g(a)), (c = b.length);
          while (c--) {
            (f = wa(b[c])), f[u] ? d.push(f) : e.push(f);
          }
          (f = A(a, xa(e, d))), (f.selector = a);
        }
        return f;
      }),
      (i = fa.select = function (a, b, e, f) {
        var i,
          j,
          k,
          l,
          m,
          n = 'function' == typeof a && a,
          o = !f && g((a = n.selector || a));
        if (((e = e || []), 1 === o.length)) {
          if (
            ((j = o[0] = o[0].slice(0)),
            j.length > 2 &&
              'ID' === (k = j[0]).type &&
              c.getById &&
              9 === b.nodeType &&
              p &&
              d.relative[j[1].type])
          ) {
            if (
              ((b = (d.find.ID(k.matches[0].replace(ba, ca), b) || [])[0]), !b)
            ) {
              return e;
            }
            n && (b = b.parentNode), (a = a.slice(j.shift().value.length));
          }
          i = W.needsContext.test(a) ? 0 : j.length;
          while (i--) {
            if (((k = j[i]), d.relative[(l = k.type)])) {
              break;
            }
            if (
              (m = d.find[l]) &&
              (f = m(
                k.matches[0].replace(ba, ca),
                (_.test(j[0].type) && oa(b.parentNode)) || b
              ))
            ) {
              if ((j.splice(i, 1), (a = f.length && qa(j)), !a)) {
                return H.apply(e, f), e;
              }
              break;
            }
          }
        }
        return (
          (n || h(a, o))(
            f,
            b,
            !p,
            e,
            !b || (_.test(a) && oa(b.parentNode)) || b
          ),
          e
        );
      }),
      (c.sortStable = u.split('').sort(B).join('') === u),
      (c.detectDuplicates = !!l),
      m(),
      (c.sortDetached = ia(function (a) {
        return 1 & a.compareDocumentPosition(n.createElement('div'));
      })),
      ia(function (a) {
        return (
          (a.innerHTML = "<a href='#'></a>"),
          '#' === a.firstChild.getAttribute('href')
        );
      }) ||
        ja('type|href|height|width', function (a, b, c) {
          return c
            ? void 0
            : a.getAttribute(b, 'type' === b.toLowerCase() ? 1 : 2);
        }),
      (c.attributes &&
        ia(function (a) {
          return (
            (a.innerHTML = '<input/>'),
            a.firstChild.setAttribute('value', ''),
            '' === a.firstChild.getAttribute('value')
          );
        })) ||
        ja('value', function (a, b, c) {
          return c || 'input' !== a.nodeName.toLowerCase()
            ? void 0
            : a.defaultValue;
        }),
      ia(function (a) {
        return null == a.getAttribute('disabled');
      }) ||
        ja(K, function (a, b, c) {
          var d;
          return c
            ? void 0
            : a[b] === !0
            ? b.toLowerCase()
            : (d = a.getAttributeNode(b)) && d.specified
            ? d.value
            : null;
        }),
      fa
    );
  })(a);
  (n.find = t),
    (n.expr = t.selectors),
    (n.expr[':'] = n.expr.pseudos),
    (n.uniqueSort = n.unique = t.uniqueSort),
    (n.text = t.getText),
    (n.isXMLDoc = t.isXML),
    (n.contains = t.contains);
  var u = function (a, b, c) {
      var d = [],
        e = void 0 !== c;
      while ((a = a[b]) && 9 !== a.nodeType) {
        if (1 === a.nodeType) {
          if (e && n(a).is(c)) {
            break;
          }
          d.push(a);
        }
      }
      return d;
    },
    v = function (a, b) {
      for (var c = []; a; a = a.nextSibling) {
        1 === a.nodeType && a !== b && c.push(a);
      }
      return c;
    },
    w = n.expr.match.needsContext,
    x = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
    y = /^.[^:#\[\.,]*$/;
  function z(a, b, c) {
    if (n.isFunction(b)) {
      return n.grep(a, function (a, d) {
        return !!b.call(a, d, a) !== c;
      });
    }
    if (b.nodeType) {
      return n.grep(a, function (a) {
        return (a === b) !== c;
      });
    }
    if ('string' == typeof b) {
      if (y.test(b)) {
        return n.filter(b, a, c);
      }
      b = n.filter(b, a);
    }
    return n.grep(a, function (a) {
      return n.inArray(a, b) > -1 !== c;
    });
  }
  (n.filter = function (a, b, c) {
    var d = b[0];
    return (
      c && (a = ':not(' + a + ')'),
      1 === b.length && 1 === d.nodeType
        ? n.find.matchesSelector(d, a)
          ? [d]
          : []
        : n.find.matches(
            a,
            n.grep(b, function (a) {
              return 1 === a.nodeType;
            })
          )
    );
  }),
    n.fn.extend({
      find: function (a) {
        var b,
          c = [],
          d = this,
          e = d.length;
        if ('string' != typeof a) {
          return this.pushStack(
            n(a).filter(function () {
              for (b = 0; e > b; b++) {
                if (n.contains(d[b], this)) {
                  return !0;
                }
              }
            })
          );
        }
        for (b = 0; e > b; b++) {
          n.find(a, d[b], c);
        }
        return (
          (c = this.pushStack(e > 1 ? n.unique(c) : c)),
          (c.selector = this.selector ? this.selector + ' ' + a : a),
          c
        );
      },
      filter: function (a) {
        return this.pushStack(z(this, a || [], !1));
      },
      not: function (a) {
        return this.pushStack(z(this, a || [], !0));
      },
      is: function (a) {
        return !!z(this, 'string' == typeof a && w.test(a) ? n(a) : a || [], !1)
          .length;
      },
    });
  var A,
    B = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    C = (n.fn.init = function (a, b, c) {
      var e, f;
      if (!a) {
        return this;
      }
      if (((c = c || A), 'string' == typeof a)) {
        if (
          ((e =
            '<' === a.charAt(0) &&
            '>' === a.charAt(a.length - 1) &&
            a.length >= 3
              ? [null, a, null]
              : B.exec(a)),
          !e || (!e[1] && b))
        ) {
          return !b || b.jquery
            ? (b || c).find(a)
            : this.constructor(b).find(a);
        }
        if (e[1]) {
          if (
            ((b = b instanceof n ? b[0] : b),
            n.merge(
              this,
              n.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)
            ),
            x.test(e[1]) && n.isPlainObject(b))
          ) {
            for (e in b) {
              n.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);
            }
          }
          return this;
        }
        if (((f = d.getElementById(e[2])), f && f.parentNode)) {
          if (f.id !== e[2]) {
            return A.find(a);
          }
          (this.length = 1), (this[0] = f);
        }
        return (this.context = d), (this.selector = a), this;
      }
      return a.nodeType
        ? ((this.context = this[0] = a), (this.length = 1), this)
        : n.isFunction(a)
        ? 'undefined' != typeof c.ready
          ? c.ready(a)
          : a(n)
        : (void 0 !== a.selector &&
            ((this.selector = a.selector), (this.context = a.context)),
          n.makeArray(a, this));
    });
  (C.prototype = n.fn), (A = n(d));
  var D = /^(?:parents|prev(?:Until|All))/,
    E = { children: !0, contents: !0, next: !0, prev: !0 };
  n.fn.extend({
    has: function (a) {
      var b,
        c = n(a, this),
        d = c.length;
      return this.filter(function () {
        for (b = 0; d > b; b++) {
          if (n.contains(this, c[b])) {
            return !0;
          }
        }
      });
    },
    closest: function (a, b) {
      for (
        var c,
          d = 0,
          e = this.length,
          f = [],
          g = w.test(a) || 'string' != typeof a ? n(a, b || this.context) : 0;
        e > d;
        d++
      ) {
        for (c = this[d]; c && c !== b; c = c.parentNode) {
          if (
            c.nodeType < 11 &&
            (g
              ? g.index(c) > -1
              : 1 === c.nodeType && n.find.matchesSelector(c, a))
          ) {
            f.push(c);
            break;
          }
        }
      }
      return this.pushStack(f.length > 1 ? n.uniqueSort(f) : f);
    },
    index: function (a) {
      return a
        ? 'string' == typeof a
          ? n.inArray(this[0], n(a))
          : n.inArray(a.jquery ? a[0] : a, this)
        : this[0] && this[0].parentNode
        ? this.first().prevAll().length
        : -1;
    },
    add: function (a, b) {
      return this.pushStack(n.uniqueSort(n.merge(this.get(), n(a, b))));
    },
    addBack: function (a) {
      return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
    },
  });
  function F(a, b) {
    do {
      a = a[b];
    } while (a && 1 !== a.nodeType);
    return a;
  }
  n.each(
    {
      parent: function (a) {
        var b = a.parentNode;
        return b && 11 !== b.nodeType ? b : null;
      },
      parents: function (a) {
        return u(a, 'parentNode');
      },
      parentsUntil: function (a, b, c) {
        return u(a, 'parentNode', c);
      },
      next: function (a) {
        return F(a, 'nextSibling');
      },
      prev: function (a) {
        return F(a, 'previousSibling');
      },
      nextAll: function (a) {
        return u(a, 'nextSibling');
      },
      prevAll: function (a) {
        return u(a, 'previousSibling');
      },
      nextUntil: function (a, b, c) {
        return u(a, 'nextSibling', c);
      },
      prevUntil: function (a, b, c) {
        return u(a, 'previousSibling', c);
      },
      siblings: function (a) {
        return v((a.parentNode || {}).firstChild, a);
      },
      children: function (a) {
        return v(a.firstChild);
      },
      contents: function (a) {
        return n.nodeName(a, 'iframe')
          ? a.contentDocument || a.contentWindow.document
          : n.merge([], a.childNodes);
      },
    },
    function (a, b) {
      n.fn[a] = function (c, d) {
        var e = n.map(this, b, c);
        return (
          'Until' !== a.slice(-5) && (d = c),
          d && 'string' == typeof d && (e = n.filter(d, e)),
          this.length > 1 &&
            (E[a] || (e = n.uniqueSort(e)), D.test(a) && (e = e.reverse())),
          this.pushStack(e)
        );
      };
    }
  );
  var G = /\S+/g;
  function H(a) {
    var b = {};
    return (
      n.each(a.match(G) || [], function (a, c) {
        b[c] = !0;
      }),
      b
    );
  }
  (n.Callbacks = function (a) {
    a = 'string' == typeof a ? H(a) : n.extend({}, a);
    var b,
      c,
      d,
      e,
      f = [],
      g = [],
      h = -1,
      i = function () {
        for (e = a.once, d = b = !0; g.length; h = -1) {
          c = g.shift();
          while (++h < f.length) {
            f[h].apply(c[0], c[1]) === !1 &&
              a.stopOnFalse &&
              ((h = f.length), (c = !1));
          }
        }
        a.memory || (c = !1), (b = !1), e && (f = c ? [] : '');
      },
      j = {
        add: function () {
          return (
            f &&
              (c && !b && ((h = f.length - 1), g.push(c)),
              (function d(b) {
                n.each(b, function (b, c) {
                  n.isFunction(c)
                    ? (a.unique && j.has(c)) || f.push(c)
                    : c && c.length && 'string' !== n.type(c) && d(c);
                });
              })(arguments),
              c && !b && i()),
            this
          );
        },
        remove: function () {
          return (
            n.each(arguments, function (a, b) {
              var c;
              while ((c = n.inArray(b, f, c)) > -1) {
                f.splice(c, 1), h >= c && h--;
              }
            }),
            this
          );
        },
        has: function (a) {
          return a ? n.inArray(a, f) > -1 : f.length > 0;
        },
        empty: function () {
          return f && (f = []), this;
        },
        disable: function () {
          return (e = g = []), (f = c = ''), this;
        },
        disabled: function () {
          return !f;
        },
        lock: function () {
          return (e = !0), c || j.disable(), this;
        },
        locked: function () {
          return !!e;
        },
        fireWith: function (a, c) {
          return (
            e ||
              ((c = c || []),
              (c = [a, c.slice ? c.slice() : c]),
              g.push(c),
              b || i()),
            this
          );
        },
        fire: function () {
          return j.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!d;
        },
      };
    return j;
  }),
    n.extend({
      Deferred: function (a) {
        var b = [
            ['resolve', 'done', n.Callbacks('once memory'), 'resolved'],
            ['reject', 'fail', n.Callbacks('once memory'), 'rejected'],
            ['notify', 'progress', n.Callbacks('memory')],
          ],
          c = 'pending',
          d = {
            state: function () {
              return c;
            },
            always: function () {
              return e.done(arguments).fail(arguments), this;
            },
            then: function () {
              var a = arguments;
              return n
                .Deferred(function (c) {
                  n.each(b, function (b, f) {
                    var g = n.isFunction(a[b]) && a[b];
                    e[f[1]](function () {
                      var a = g && g.apply(this, arguments);
                      a && n.isFunction(a.promise)
                        ? a
                            .promise()
                            .progress(c.notify)
                            .done(c.resolve)
                            .fail(c.reject)
                        : c[f[0] + 'With'](
                            this === d ? c.promise() : this,
                            g ? [a] : arguments
                          );
                    });
                  }),
                    (a = null);
                })
                .promise();
            },
            promise: function (a) {
              return null != a ? n.extend(a, d) : d;
            },
          },
          e = {};
        return (
          (d.pipe = d.then),
          n.each(b, function (a, f) {
            var g = f[2],
              h = f[3];
            (d[f[1]] = g.add),
              h &&
                g.add(
                  function () {
                    c = h;
                  },
                  b[1 ^ a][2].disable,
                  b[2][2].lock
                ),
              (e[f[0]] = function () {
                return e[f[0] + 'With'](this === e ? d : this, arguments), this;
              }),
              (e[f[0] + 'With'] = g.fireWith);
          }),
          d.promise(e),
          a && a.call(e, e),
          e
        );
      },
      when: function (a) {
        var b = 0,
          c = e.call(arguments),
          d = c.length,
          f = 1 !== d || (a && n.isFunction(a.promise)) ? d : 0,
          g = 1 === f ? a : n.Deferred(),
          h = function (a, b, c) {
            return function (d) {
              (b[a] = this),
                (c[a] = arguments.length > 1 ? e.call(arguments) : d),
                c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c);
            };
          },
          i,
          j,
          k;
        if (d > 1) {
          for (
            i = new Array(d), j = new Array(d), k = new Array(d);
            d > b;
            b++
          ) {
            c[b] && n.isFunction(c[b].promise)
              ? c[b]
                  .promise()
                  .progress(h(b, j, i))
                  .done(h(b, k, c))
                  .fail(g.reject)
              : --f;
          }
        }
        return f || g.resolveWith(k, c), g.promise();
      },
    });
  var I;
  (n.fn.ready = function (a) {
    return n.ready.promise().done(a), this;
  }),
    n.extend({
      isReady: !1,
      readyWait: 1,
      holdReady: function (a) {
        a ? n.readyWait++ : n.ready(!0);
      },
      ready: function (a) {
        (a === !0 ? --n.readyWait : n.isReady) ||
          ((n.isReady = !0),
          (a !== !0 && --n.readyWait > 0) ||
            (I.resolveWith(d, [n]),
            n.fn.triggerHandler &&
              (n(d).triggerHandler('ready'), n(d).off('ready'))));
      },
    });
  function J() {
    d.addEventListener
      ? (d.removeEventListener('DOMContentLoaded', K),
        a.removeEventListener('load', K))
      : (d.detachEvent('onreadystatechange', K), a.detachEvent('onload', K));
  }
  function K() {
    (d.addEventListener ||
      'load' === a.event.type ||
      'complete' === d.readyState) &&
      (J(), n.ready());
  }
  (n.ready.promise = function (b) {
    if (!I) {
      if (
        ((I = n.Deferred()),
        'complete' === d.readyState ||
          ('loading' !== d.readyState && !d.documentElement.doScroll))
      ) {
        a.setTimeout(n.ready);
      } else {
        if (d.addEventListener) {
          d.addEventListener('DOMContentLoaded', K),
            a.addEventListener('load', K);
        } else {
          d.attachEvent('onreadystatechange', K), a.attachEvent('onload', K);
          var c = !1;
          try {
            c = null == a.frameElement && d.documentElement;
          } catch (e) {}
          c &&
            c.doScroll &&
            !(function f() {
              if (!n.isReady) {
                try {
                  c.doScroll('left');
                } catch (b) {
                  return a.setTimeout(f, 50);
                }
                J(), n.ready();
              }
            })();
        }
      }
    }
    return I.promise(b);
  }),
    n.ready.promise();
  var L;
  for (L in n(l)) {
    break;
  }
  (l.ownFirst = '0' === L),
    (l.inlineBlockNeedsLayout = !1),
    n(function () {
      var a, b, c, e;
      (c = d.getElementsByTagName('body')[0]),
        c &&
          c.style &&
          ((b = d.createElement('div')),
          (e = d.createElement('div')),
          (e.style.cssText =
            'position:absolute;border:0;width:0;height:0;top:0;left:-9999px'),
          c.appendChild(e).appendChild(b),
          'undefined' != typeof b.style.zoom &&
            ((b.style.cssText =
              'display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1'),
            (l.inlineBlockNeedsLayout = a = 3 === b.offsetWidth),
            a && (c.style.zoom = 1)),
          c.removeChild(e));
    }),
    (function () {
      var a = d.createElement('div');
      l.deleteExpando = !0;
      try {
        delete a.test;
      } catch (b) {
        l.deleteExpando = !1;
      }
      a = null;
    })();
  var M = function (a) {
      var b = n.noData[(a.nodeName + ' ').toLowerCase()],
        c = +a.nodeType || 1;
      return 1 !== c && 9 !== c
        ? !1
        : !b || (b !== !0 && a.getAttribute('classid') === b);
    },
    N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    O = /([A-Z])/g;
  function P(a, b, c) {
    if (void 0 === c && 1 === a.nodeType) {
      var d = 'data-' + b.replace(O, '-$1').toLowerCase();
      if (((c = a.getAttribute(d)), 'string' == typeof c)) {
        try {
          c =
            'true' === c
              ? !0
              : 'false' === c
              ? !1
              : 'null' === c
              ? null
              : +c + '' === c
              ? +c
              : N.test(c)
              ? n.parseJSON(c)
              : c;
        } catch (e) {}
        n.data(a, b, c);
      } else {
        c = void 0;
      }
    }
    return c;
  }
  function Q(a) {
    var b;
    for (b in a) {
      if (('data' !== b || !n.isEmptyObject(a[b])) && 'toJSON' !== b) {
        return !1;
      }
    }
    return !0;
  }
  function R(a, b, d, e) {
    if (M(a)) {
      var f,
        g,
        h = n.expando,
        i = a.nodeType,
        j = i ? n.cache : a,
        k = i ? a[h] : a[h] && h;
      if (
        (k && j[k] && (e || j[k].data)) ||
        void 0 !== d ||
        'string' != typeof b
      ) {
        return (
          k || (k = i ? (a[h] = c.pop() || n.guid++) : h),
          j[k] || (j[k] = i ? {} : { toJSON: n.noop }),
          ('object' != typeof b && 'function' != typeof b) ||
            (e
              ? (j[k] = n.extend(j[k], b))
              : (j[k].data = n.extend(j[k].data, b))),
          (g = j[k]),
          e || (g.data || (g.data = {}), (g = g.data)),
          void 0 !== d && (g[n.camelCase(b)] = d),
          'string' == typeof b
            ? ((f = g[b]), null == f && (f = g[n.camelCase(b)]))
            : (f = g),
          f
        );
      }
    }
  }
  function S(a, b, c) {
    if (M(a)) {
      var d,
        e,
        f = a.nodeType,
        g = f ? n.cache : a,
        h = f ? a[n.expando] : n.expando;
      if (g[h]) {
        if (b && (d = c ? g[h] : g[h].data)) {
          n.isArray(b)
            ? (b = b.concat(n.map(b, n.camelCase)))
            : b in d
            ? (b = [b])
            : ((b = n.camelCase(b)), (b = b in d ? [b] : b.split(' '))),
            (e = b.length);
          while (e--) {
            delete d[b[e]];
          }
          if (c ? !Q(d) : !n.isEmptyObject(d)) {
            return;
          }
        }
        (c || (delete g[h].data, Q(g[h]))) &&
          (f
            ? n.cleanData([a], !0)
            : l.deleteExpando || g != g.window
            ? delete g[h]
            : (g[h] = void 0));
      }
    }
  }
  n.extend({
    cache: {},
    noData: {
      'applet ': !0,
      'embed ': !0,
      'object ': 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000',
    },
    hasData: function (a) {
      return (
        (a = a.nodeType ? n.cache[a[n.expando]] : a[n.expando]), !!a && !Q(a)
      );
    },
    data: function (a, b, c) {
      return R(a, b, c);
    },
    removeData: function (a, b) {
      return S(a, b);
    },
    _data: function (a, b, c) {
      return R(a, b, c, !0);
    },
    _removeData: function (a, b) {
      return S(a, b, !0);
    },
  }),
    n.fn.extend({
      data: function (a, b) {
        var c,
          d,
          e,
          f = this[0],
          g = f && f.attributes;
        if (void 0 === a) {
          if (
            this.length &&
            ((e = n.data(f)), 1 === f.nodeType && !n._data(f, 'parsedAttrs'))
          ) {
            c = g.length;
            while (c--) {
              g[c] &&
                ((d = g[c].name),
                0 === d.indexOf('data-') &&
                  ((d = n.camelCase(d.slice(5))), P(f, d, e[d])));
            }
            n._data(f, 'parsedAttrs', !0);
          }
          return e;
        }
        return 'object' == typeof a
          ? this.each(function () {
              n.data(this, a);
            })
          : arguments.length > 1
          ? this.each(function () {
              n.data(this, a, b);
            })
          : f
          ? P(f, a, n.data(f, a))
          : void 0;
      },
      removeData: function (a) {
        return this.each(function () {
          n.removeData(this, a);
        });
      },
    }),
    n.extend({
      queue: function (a, b, c) {
        var d;
        return a
          ? ((b = (b || 'fx') + 'queue'),
            (d = n._data(a, b)),
            c &&
              (!d || n.isArray(c)
                ? (d = n._data(a, b, n.makeArray(c)))
                : d.push(c)),
            d || [])
          : void 0;
      },
      dequeue: function (a, b) {
        b = b || 'fx';
        var c = n.queue(a, b),
          d = c.length,
          e = c.shift(),
          f = n._queueHooks(a, b),
          g = function () {
            n.dequeue(a, b);
          };
        'inprogress' === e && ((e = c.shift()), d--),
          e &&
            ('fx' === b && c.unshift('inprogress'),
            delete f.stop,
            e.call(a, g, f)),
          !d && f && f.empty.fire();
      },
      _queueHooks: function (a, b) {
        var c = b + 'queueHooks';
        return (
          n._data(a, c) ||
          n._data(a, c, {
            empty: n.Callbacks('once memory').add(function () {
              n._removeData(a, b + 'queue'), n._removeData(a, c);
            }),
          })
        );
      },
    }),
    n.fn.extend({
      queue: function (a, b) {
        var c = 2;
        return (
          'string' != typeof a && ((b = a), (a = 'fx'), c--),
          arguments.length < c
            ? n.queue(this[0], a)
            : void 0 === b
            ? this
            : this.each(function () {
                var c = n.queue(this, a, b);
                n._queueHooks(this, a),
                  'fx' === a && 'inprogress' !== c[0] && n.dequeue(this, a);
              })
        );
      },
      dequeue: function (a) {
        return this.each(function () {
          n.dequeue(this, a);
        });
      },
      clearQueue: function (a) {
        return this.queue(a || 'fx', []);
      },
      promise: function (a, b) {
        var c,
          d = 1,
          e = n.Deferred(),
          f = this,
          g = this.length,
          h = function () {
            --d || e.resolveWith(f, [f]);
          };
        'string' != typeof a && ((b = a), (a = void 0)), (a = a || 'fx');
        while (g--) {
          (c = n._data(f[g], a + 'queueHooks')),
            c && c.empty && (d++, c.empty.add(h));
        }
        return h(), e.promise(b);
      },
    }),
    (function () {
      var a;
      l.shrinkWrapBlocks = function () {
        if (null != a) {
          return a;
        }
        a = !1;
        var b, c, e;
        return (
          (c = d.getElementsByTagName('body')[0]),
          c && c.style
            ? ((b = d.createElement('div')),
              (e = d.createElement('div')),
              (e.style.cssText =
                'position:absolute;border:0;width:0;height:0;top:0;left:-9999px'),
              c.appendChild(e).appendChild(b),
              'undefined' != typeof b.style.zoom &&
                ((b.style.cssText =
                  '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1'),
                (b.appendChild(d.createElement('div')).style.width = '5px'),
                (a = 3 !== b.offsetWidth)),
              c.removeChild(e),
              a)
            : void 0
        );
      };
    })();
  var T = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    U = new RegExp('^(?:([+-])=|)(' + T + ')([a-z%]*)$', 'i'),
    V = ['Top', 'Right', 'Bottom', 'Left'],
    W = function (a, b) {
      return (
        (a = b || a),
        'none' === n.css(a, 'display') || !n.contains(a.ownerDocument, a)
      );
    };
  function X(a, b, c, d) {
    var e,
      f = 1,
      g = 20,
      h = d
        ? function () {
            return d.cur();
          }
        : function () {
            return n.css(a, b, '');
          },
      i = h(),
      j = (c && c[3]) || (n.cssNumber[b] ? '' : 'px'),
      k = (n.cssNumber[b] || ('px' !== j && +i)) && U.exec(n.css(a, b));
    if (k && k[3] !== j) {
      (j = j || k[3]), (c = c || []), (k = +i || 1);
      do {
        (f = f || '.5'), (k /= f), n.style(a, b, k + j);
      } while (f !== (f = h() / i) && 1 !== f && --g);
    }
    return (
      c &&
        ((k = +k || +i || 0),
        (e = c[1] ? k + (c[1] + 1) * c[2] : +c[2]),
        d && ((d.unit = j), (d.start = k), (d.end = e))),
      e
    );
  }
  var Y = function (a, b, c, d, e, f, g) {
      var h = 0,
        i = a.length,
        j = null == c;
      if ('object' === n.type(c)) {
        e = !0;
        for (h in c) {
          Y(a, b, h, c[h], !0, f, g);
        }
      } else {
        if (
          void 0 !== d &&
          ((e = !0),
          n.isFunction(d) || (g = !0),
          j &&
            (g
              ? (b.call(a, d), (b = null))
              : ((j = b),
                (b = function (a, b, c) {
                  return j.call(n(a), c);
                }))),
          b)
        ) {
          for (; i > h; h++) {
            b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
          }
        }
      }
      return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
    },
    Z = /^(?:checkbox|radio)$/i,
    $ = /<([\w:-]+)/,
    _ = /^$|\/(?:java|ecma)script/i,
    aa = /^\s+/,
    ba =
      'abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video';
  function ca(a) {
    var b = ba.split('|'),
      c = a.createDocumentFragment();
    if (c.createElement) {
      while (b.length) {
        c.createElement(b.pop());
      }
    }
    return c;
  }
  !(function () {
    var a = d.createElement('div'),
      b = d.createDocumentFragment(),
      c = d.createElement('input');
    (a.innerHTML =
      "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
      (l.leadingWhitespace = 3 === a.firstChild.nodeType),
      (l.tbody = !a.getElementsByTagName('tbody').length),
      (l.htmlSerialize = !!a.getElementsByTagName('link').length),
      (l.html5Clone =
        '<:nav></:nav>' !== d.createElement('nav').cloneNode(!0).outerHTML),
      (c.type = 'checkbox'),
      (c.checked = !0),
      b.appendChild(c),
      (l.appendChecked = c.checked),
      (a.innerHTML = '<textarea>x</textarea>'),
      (l.noCloneChecked = !!a.cloneNode(!0).lastChild.defaultValue),
      b.appendChild(a),
      (c = d.createElement('input')),
      c.setAttribute('type', 'radio'),
      c.setAttribute('checked', 'checked'),
      c.setAttribute('name', 't'),
      a.appendChild(c),
      (l.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked),
      (l.noCloneEvent = !!a.addEventListener),
      (a[n.expando] = 1),
      (l.attributes = !a.getAttribute(n.expando));
  })();
  var da = {
    option: [1, "<select multiple='multiple'>", '</select>'],
    legend: [1, '<fieldset>', '</fieldset>'],
    area: [1, '<map>', '</map>'],
    param: [1, '<object>', '</object>'],
    thead: [1, '<table>', '</table>'],
    tr: [2, '<table><tbody>', '</tbody></table>'],
    col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
    td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
    _default: l.htmlSerialize ? [0, '', ''] : [1, 'X<div>', '</div>'],
  };
  (da.optgroup = da.option),
    (da.tbody = da.tfoot = da.colgroup = da.caption = da.thead),
    (da.th = da.td);
  function ea(a, b) {
    var c,
      d,
      e = 0,
      f =
        'undefined' != typeof a.getElementsByTagName
          ? a.getElementsByTagName(b || '*')
          : 'undefined' != typeof a.querySelectorAll
          ? a.querySelectorAll(b || '*')
          : void 0;
    if (!f) {
      for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) {
        !b || n.nodeName(d, b) ? f.push(d) : n.merge(f, ea(d, b));
      }
    }
    return void 0 === b || (b && n.nodeName(a, b)) ? n.merge([a], f) : f;
  }
  function fa(a, b) {
    for (var c, d = 0; null != (c = a[d]); d++) {
      n._data(c, 'globalEval', !b || n._data(b[d], 'globalEval'));
    }
  }
  var ga = /<|&#?\w+;/,
    ha = /<tbody/i;
  function ia(a) {
    Z.test(a.type) && (a.defaultChecked = a.checked);
  }
  function ja(a, b, c, d, e) {
    for (
      var f, g, h, i, j, k, m, o = a.length, p = ca(b), q = [], r = 0;
      o > r;
      r++
    ) {
      if (((g = a[r]), g || 0 === g)) {
        if ('object' === n.type(g)) {
          n.merge(q, g.nodeType ? [g] : g);
        } else {
          if (ga.test(g)) {
            (i = i || p.appendChild(b.createElement('div'))),
              (j = ($.exec(g) || ['', ''])[1].toLowerCase()),
              (m = da[j] || da._default),
              (i.innerHTML = m[1] + n.htmlPrefilter(g) + m[2]),
              (f = m[0]);
            while (f--) {
              i = i.lastChild;
            }
            if (
              (!l.leadingWhitespace &&
                aa.test(g) &&
                q.push(b.createTextNode(aa.exec(g)[0])),
              !l.tbody)
            ) {
              (g =
                'table' !== j || ha.test(g)
                  ? '<table>' !== m[1] || ha.test(g)
                    ? 0
                    : i
                  : i.firstChild),
                (f = g && g.childNodes.length);
              while (f--) {
                n.nodeName((k = g.childNodes[f]), 'tbody') &&
                  !k.childNodes.length &&
                  g.removeChild(k);
              }
            }
            n.merge(q, i.childNodes), (i.textContent = '');
            while (i.firstChild) {
              i.removeChild(i.firstChild);
            }
            i = p.lastChild;
          } else {
            q.push(b.createTextNode(g));
          }
        }
      }
    }
    i && p.removeChild(i),
      l.appendChecked || n.grep(ea(q, 'input'), ia),
      (r = 0);
    while ((g = q[r++])) {
      if (d && n.inArray(g, d) > -1) {
        e && e.push(g);
      } else {
        if (
          ((h = n.contains(g.ownerDocument, g)),
          (i = ea(p.appendChild(g), 'script')),
          h && fa(i),
          c)
        ) {
          f = 0;
          while ((g = i[f++])) {
            _.test(g.type || '') && c.push(g);
          }
        }
      }
    }
    return (i = null), p;
  }
  !(function () {
    var b,
      c,
      e = d.createElement('div');
    for (b in { submit: !0, change: !0, focusin: !0 }) {
      (c = 'on' + b),
        (l[b] = c in a) ||
          (e.setAttribute(c, 't'), (l[b] = e.attributes[c].expando === !1));
    }
    e = null;
  })();
  var ka = /^(?:input|select|textarea)$/i,
    la = /^key/,
    ma = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    na = /^(?:focusinfocus|focusoutblur)$/,
    oa = /^([^.]*)(?:\.(.+)|)/;
  function pa() {
    return !0;
  }
  function qa() {
    return !1;
  }
  function ra() {
    try {
      return d.activeElement;
    } catch (a) {}
  }
  function sa(a, b, c, d, e, f) {
    var g, h;
    if ('object' == typeof b) {
      'string' != typeof c && ((d = d || c), (c = void 0));
      for (h in b) {
        sa(a, h, c, d, b[h], f);
      }
      return a;
    }
    if (
      (null == d && null == e
        ? ((e = c), (d = c = void 0))
        : null == e &&
          ('string' == typeof c
            ? ((e = d), (d = void 0))
            : ((e = d), (d = c), (c = void 0))),
      e === !1)
    ) {
      e = qa;
    } else {
      if (!e) {
        return a;
      }
    }
    return (
      1 === f &&
        ((g = e),
        (e = function (a) {
          return n().off(a), g.apply(this, arguments);
        }),
        (e.guid = g.guid || (g.guid = n.guid++))),
      a.each(function () {
        n.event.add(this, b, e, d, c);
      })
    );
  }
  (n.event = {
    global: {},
    add: function (a, b, c, d, e) {
      var f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        o,
        p,
        q,
        r = n._data(a);
      if (r) {
        c.handler && ((i = c), (c = i.handler), (e = i.selector)),
          c.guid || (c.guid = n.guid++),
          (g = r.events) || (g = r.events = {}),
          (k = r.handle) ||
            ((k = r.handle = function (a) {
              return 'undefined' == typeof n ||
                (a && n.event.triggered === a.type)
                ? void 0
                : n.event.dispatch.apply(k.elem, arguments);
            }),
            (k.elem = a)),
          (b = (b || '').match(G) || ['']),
          (h = b.length);
        while (h--) {
          (f = oa.exec(b[h]) || []),
            (o = q = f[1]),
            (p = (f[2] || '').split('.').sort()),
            o &&
              ((j = n.event.special[o] || {}),
              (o = (e ? j.delegateType : j.bindType) || o),
              (j = n.event.special[o] || {}),
              (l = n.extend(
                {
                  type: o,
                  origType: q,
                  data: d,
                  handler: c,
                  guid: c.guid,
                  selector: e,
                  needsContext: e && n.expr.match.needsContext.test(e),
                  namespace: p.join('.'),
                },
                i
              )),
              (m = g[o]) ||
                ((m = g[o] = []),
                (m.delegateCount = 0),
                (j.setup && j.setup.call(a, d, p, k) !== !1) ||
                  (a.addEventListener
                    ? a.addEventListener(o, k, !1)
                    : a.attachEvent && a.attachEvent('on' + o, k))),
              j.add &&
                (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)),
              e ? m.splice(m.delegateCount++, 0, l) : m.push(l),
              (n.event.global[o] = !0));
        }
        a = null;
      }
    },
    remove: function (a, b, c, d, e) {
      var f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        o,
        p,
        q,
        r = n.hasData(a) && n._data(a);
      if (r && (k = r.events)) {
        (b = (b || '').match(G) || ['']), (j = b.length);
        while (j--) {
          if (
            ((h = oa.exec(b[j]) || []),
            (o = q = h[1]),
            (p = (h[2] || '').split('.').sort()),
            o)
          ) {
            (l = n.event.special[o] || {}),
              (o = (d ? l.delegateType : l.bindType) || o),
              (m = k[o] || []),
              (h =
                h[2] &&
                new RegExp('(^|\\.)' + p.join('\\.(?:.*\\.|)') + '(\\.|$)')),
              (i = f = m.length);
            while (f--) {
              (g = m[f]),
                (!e && q !== g.origType) ||
                  (c && c.guid !== g.guid) ||
                  (h && !h.test(g.namespace)) ||
                  (d && d !== g.selector && ('**' !== d || !g.selector)) ||
                  (m.splice(f, 1),
                  g.selector && m.delegateCount--,
                  l.remove && l.remove.call(a, g));
            }
            i &&
              !m.length &&
              ((l.teardown && l.teardown.call(a, p, r.handle) !== !1) ||
                n.removeEvent(a, o, r.handle),
              delete k[o]);
          } else {
            for (o in k) {
              n.event.remove(a, o + b[j], c, d, !0);
            }
          }
        }
        n.isEmptyObject(k) && (delete r.handle, n._removeData(a, 'events'));
      }
    },
    trigger: function (b, c, e, f) {
      var g,
        h,
        i,
        j,
        l,
        m,
        o,
        p = [e || d],
        q = k.call(b, 'type') ? b.type : b,
        r = k.call(b, 'namespace') ? b.namespace.split('.') : [];
      if (
        ((i = m = e = e || d),
        3 !== e.nodeType &&
          8 !== e.nodeType &&
          !na.test(q + n.event.triggered) &&
          (q.indexOf('.') > -1 &&
            ((r = q.split('.')), (q = r.shift()), r.sort()),
          (h = q.indexOf(':') < 0 && 'on' + q),
          (b = b[n.expando] ? b : new n.Event(q, 'object' == typeof b && b)),
          (b.isTrigger = f ? 2 : 3),
          (b.namespace = r.join('.')),
          (b.rnamespace = b.namespace
            ? new RegExp('(^|\\.)' + r.join('\\.(?:.*\\.|)') + '(\\.|$)')
            : null),
          (b.result = void 0),
          b.target || (b.target = e),
          (c = null == c ? [b] : n.makeArray(c, [b])),
          (l = n.event.special[q] || {}),
          f || !l.trigger || l.trigger.apply(e, c) !== !1))
      ) {
        if (!f && !l.noBubble && !n.isWindow(e)) {
          for (
            j = l.delegateType || q, na.test(j + q) || (i = i.parentNode);
            i;
            i = i.parentNode
          ) {
            p.push(i), (m = i);
          }
          m === (e.ownerDocument || d) &&
            p.push(m.defaultView || m.parentWindow || a);
        }
        o = 0;
        while ((i = p[o++]) && !b.isPropagationStopped()) {
          (b.type = o > 1 ? j : l.bindType || q),
            (g = (n._data(i, 'events') || {})[b.type] && n._data(i, 'handle')),
            g && g.apply(i, c),
            (g = h && i[h]),
            g &&
              g.apply &&
              M(i) &&
              ((b.result = g.apply(i, c)),
              b.result === !1 && b.preventDefault());
        }
        if (
          ((b.type = q),
          !f &&
            !b.isDefaultPrevented() &&
            (!l._default || l._default.apply(p.pop(), c) === !1) &&
            M(e) &&
            h &&
            e[q] &&
            !n.isWindow(e))
        ) {
          (m = e[h]), m && (e[h] = null), (n.event.triggered = q);
          try {
            e[q]();
          } catch (s) {}
          (n.event.triggered = void 0), m && (e[h] = m);
        }
        return b.result;
      }
    },
    dispatch: function (a) {
      a = n.event.fix(a);
      var b,
        c,
        d,
        f,
        g,
        h = [],
        i = e.call(arguments),
        j = (n._data(this, 'events') || {})[a.type] || [],
        k = n.event.special[a.type] || {};
      if (
        ((i[0] = a),
        (a.delegateTarget = this),
        !k.preDispatch || k.preDispatch.call(this, a) !== !1)
      ) {
        (h = n.event.handlers.call(this, a, j)), (b = 0);
        while ((f = h[b++]) && !a.isPropagationStopped()) {
          (a.currentTarget = f.elem), (c = 0);
          while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped()) {
            (a.rnamespace && !a.rnamespace.test(g.namespace)) ||
              ((a.handleObj = g),
              (a.data = g.data),
              (d = (
                (n.event.special[g.origType] || {}).handle || g.handler
              ).apply(f.elem, i)),
              void 0 !== d &&
                (a.result = d) === !1 &&
                (a.preventDefault(), a.stopPropagation()));
          }
        }
        return k.postDispatch && k.postDispatch.call(this, a), a.result;
      }
    },
    handlers: function (a, b) {
      var c,
        d,
        e,
        f,
        g = [],
        h = b.delegateCount,
        i = a.target;
      if (
        h &&
        i.nodeType &&
        ('click' !== a.type || isNaN(a.button) || a.button < 1)
      ) {
        for (; i != this; i = i.parentNode || this) {
          if (1 === i.nodeType && (i.disabled !== !0 || 'click' !== a.type)) {
            for (d = [], c = 0; h > c; c++) {
              (f = b[c]),
                (e = f.selector + ' '),
                void 0 === d[e] &&
                  (d[e] = f.needsContext
                    ? n(e, this).index(i) > -1
                    : n.find(e, this, null, [i]).length),
                d[e] && d.push(f);
            }
            d.length && g.push({ elem: i, handlers: d });
          }
        }
      }
      return h < b.length && g.push({ elem: this, handlers: b.slice(h) }), g;
    },
    fix: function (a) {
      if (a[n.expando]) {
        return a;
      }
      var b,
        c,
        e,
        f = a.type,
        g = a,
        h = this.fixHooks[f];
      h ||
        (this.fixHooks[f] = h = ma.test(f)
          ? this.mouseHooks
          : la.test(f)
          ? this.keyHooks
          : {}),
        (e = h.props ? this.props.concat(h.props) : this.props),
        (a = new n.Event(g)),
        (b = e.length);
      while (b--) {
        (c = e[b]), (a[c] = g[c]);
      }
      return (
        a.target || (a.target = g.srcElement || d),
        3 === a.target.nodeType && (a.target = a.target.parentNode),
        (a.metaKey = !!a.metaKey),
        h.filter ? h.filter(a, g) : a
      );
    },
    props: 'altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(
      ' '
    ),
    fixHooks: {},
    keyHooks: {
      props: 'char charCode key keyCode'.split(' '),
      filter: function (a, b) {
        return (
          null == a.which &&
            (a.which = null != b.charCode ? b.charCode : b.keyCode),
          a
        );
      },
    },
    mouseHooks: {
      props: 'button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement'.split(
        ' '
      ),
      filter: function (a, b) {
        var c,
          e,
          f,
          g = b.button,
          h = b.fromElement;
        return (
          null == a.pageX &&
            null != b.clientX &&
            ((e = a.target.ownerDocument || d),
            (f = e.documentElement),
            (c = e.body),
            (a.pageX =
              b.clientX +
              ((f && f.scrollLeft) || (c && c.scrollLeft) || 0) -
              ((f && f.clientLeft) || (c && c.clientLeft) || 0)),
            (a.pageY =
              b.clientY +
              ((f && f.scrollTop) || (c && c.scrollTop) || 0) -
              ((f && f.clientTop) || (c && c.clientTop) || 0))),
          !a.relatedTarget &&
            h &&
            (a.relatedTarget = h === a.target ? b.toElement : h),
          a.which ||
            void 0 === g ||
            (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0),
          a
        );
      },
    },
    special: {
      load: { noBubble: !0 },
      focus: {
        trigger: function () {
          if (this !== ra() && this.focus) {
            try {
              return this.focus(), !1;
            } catch (a) {}
          }
        },
        delegateType: 'focusin',
      },
      blur: {
        trigger: function () {
          return this === ra() && this.blur ? (this.blur(), !1) : void 0;
        },
        delegateType: 'focusout',
      },
      click: {
        trigger: function () {
          return n.nodeName(this, 'input') &&
            'checkbox' === this.type &&
            this.click
            ? (this.click(), !1)
            : void 0;
        },
        _default: function (a) {
          return n.nodeName(a.target, 'a');
        },
      },
      beforeunload: {
        postDispatch: function (a) {
          void 0 !== a.result &&
            a.originalEvent &&
            (a.originalEvent.returnValue = a.result);
        },
      },
    },
    simulate: function (a, b, c) {
      var d = n.extend(new n.Event(), c, { type: a, isSimulated: !0 });
      n.event.trigger(d, null, b), d.isDefaultPrevented() && c.preventDefault();
    },
  }),
    (n.removeEvent = d.removeEventListener
      ? function (a, b, c) {
          a.removeEventListener && a.removeEventListener(b, c);
        }
      : function (a, b, c) {
          var d = 'on' + b;
          a.detachEvent &&
            ('undefined' == typeof a[d] && (a[d] = null), a.detachEvent(d, c));
        }),
    (n.Event = function (a, b) {
      return this instanceof n.Event
        ? (a && a.type
            ? ((this.originalEvent = a),
              (this.type = a.type),
              (this.isDefaultPrevented =
                a.defaultPrevented ||
                (void 0 === a.defaultPrevented && a.returnValue === !1)
                  ? pa
                  : qa))
            : (this.type = a),
          b && n.extend(this, b),
          (this.timeStamp = (a && a.timeStamp) || n.now()),
          void (this[n.expando] = !0))
        : new n.Event(a, b);
    }),
    (n.Event.prototype = {
      constructor: n.Event,
      isDefaultPrevented: qa,
      isPropagationStopped: qa,
      isImmediatePropagationStopped: qa,
      preventDefault: function () {
        var a = this.originalEvent;
        (this.isDefaultPrevented = pa),
          a && (a.preventDefault ? a.preventDefault() : (a.returnValue = !1));
      },
      stopPropagation: function () {
        var a = this.originalEvent;
        (this.isPropagationStopped = pa),
          a &&
            !this.isSimulated &&
            (a.stopPropagation && a.stopPropagation(), (a.cancelBubble = !0));
      },
      stopImmediatePropagation: function () {
        var a = this.originalEvent;
        (this.isImmediatePropagationStopped = pa),
          a && a.stopImmediatePropagation && a.stopImmediatePropagation(),
          this.stopPropagation();
      },
    }),
    n.each(
      {
        mouseenter: 'mouseover',
        mouseleave: 'mouseout',
        pointerenter: 'pointerover',
        pointerleave: 'pointerout',
      },
      function (a, b) {
        n.event.special[a] = {
          delegateType: b,
          bindType: b,
          handle: function (a) {
            var c,
              d = this,
              e = a.relatedTarget,
              f = a.handleObj;
            return (
              (e && (e === d || n.contains(d, e))) ||
                ((a.type = f.origType),
                (c = f.handler.apply(this, arguments)),
                (a.type = b)),
              c
            );
          },
        };
      }
    ),
    l.submit ||
      (n.event.special.submit = {
        setup: function () {
          return n.nodeName(this, 'form')
            ? !1
            : void n.event.add(
                this,
                'click._submit keypress._submit',
                function (a) {
                  var b = a.target,
                    c =
                      n.nodeName(b, 'input') || n.nodeName(b, 'button')
                        ? n.prop(b, 'form')
                        : void 0;
                  c &&
                    !n._data(c, 'submit') &&
                    (n.event.add(c, 'submit._submit', function (a) {
                      a._submitBubble = !0;
                    }),
                    n._data(c, 'submit', !0));
                }
              );
        },
        postDispatch: function (a) {
          a._submitBubble &&
            (delete a._submitBubble,
            this.parentNode &&
              !a.isTrigger &&
              n.event.simulate('submit', this.parentNode, a));
        },
        teardown: function () {
          return n.nodeName(this, 'form')
            ? !1
            : void n.event.remove(this, '._submit');
        },
      }),
    l.change ||
      (n.event.special.change = {
        setup: function () {
          return ka.test(this.nodeName)
            ? (('checkbox' !== this.type && 'radio' !== this.type) ||
                (n.event.add(this, 'propertychange._change', function (a) {
                  'checked' === a.originalEvent.propertyName &&
                    (this._justChanged = !0);
                }),
                n.event.add(this, 'click._change', function (a) {
                  this._justChanged && !a.isTrigger && (this._justChanged = !1),
                    n.event.simulate('change', this, a);
                })),
              !1)
            : void n.event.add(this, 'beforeactivate._change', function (a) {
                var b = a.target;
                ka.test(b.nodeName) &&
                  !n._data(b, 'change') &&
                  (n.event.add(b, 'change._change', function (a) {
                    !this.parentNode ||
                      a.isSimulated ||
                      a.isTrigger ||
                      n.event.simulate('change', this.parentNode, a);
                  }),
                  n._data(b, 'change', !0));
              });
        },
        handle: function (a) {
          var b = a.target;
          return this !== b ||
            a.isSimulated ||
            a.isTrigger ||
            ('radio' !== b.type && 'checkbox' !== b.type)
            ? a.handleObj.handler.apply(this, arguments)
            : void 0;
        },
        teardown: function () {
          return n.event.remove(this, '._change'), !ka.test(this.nodeName);
        },
      }),
    l.focusin ||
      n.each({ focus: 'focusin', blur: 'focusout' }, function (a, b) {
        var c = function (a) {
          n.event.simulate(b, a.target, n.event.fix(a));
        };
        n.event.special[b] = {
          setup: function () {
            var d = this.ownerDocument || this,
              e = n._data(d, b);
            e || d.addEventListener(a, c, !0), n._data(d, b, (e || 0) + 1);
          },
          teardown: function () {
            var d = this.ownerDocument || this,
              e = n._data(d, b) - 1;
            e
              ? n._data(d, b, e)
              : (d.removeEventListener(a, c, !0), n._removeData(d, b));
          },
        };
      }),
    n.fn.extend({
      on: function (a, b, c, d) {
        return sa(this, a, b, c, d);
      },
      one: function (a, b, c, d) {
        return sa(this, a, b, c, d, 1);
      },
      off: function (a, b, c) {
        var d, e;
        if (a && a.preventDefault && a.handleObj) {
          return (
            (d = a.handleObj),
            n(a.delegateTarget).off(
              d.namespace ? d.origType + '.' + d.namespace : d.origType,
              d.selector,
              d.handler
            ),
            this
          );
        }
        if ('object' == typeof a) {
          for (e in a) {
            this.off(e, b, a[e]);
          }
          return this;
        }
        return (
          (b !== !1 && 'function' != typeof b) || ((c = b), (b = void 0)),
          c === !1 && (c = qa),
          this.each(function () {
            n.event.remove(this, a, c, b);
          })
        );
      },
      trigger: function (a, b) {
        return this.each(function () {
          n.event.trigger(a, b, this);
        });
      },
      triggerHandler: function (a, b) {
        var c = this[0];
        return c ? n.event.trigger(a, b, c, !0) : void 0;
      },
    });
  var ta = / jQuery\d+="(?:null|\d+)"/g,
    ua = new RegExp('<(?:' + ba + ')[\\s/>]', 'i'),
    va = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
    wa = /<script|<style|<link/i,
    xa = /checked\s*(?:[^=]|=\s*.checked.)/i,
    ya = /^true\/(.*)/,
    za = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    Aa = ca(d),
    Ba = Aa.appendChild(d.createElement('div'));
  function Ca(a, b) {
    return n.nodeName(a, 'table') &&
      n.nodeName(11 !== b.nodeType ? b : b.firstChild, 'tr')
      ? a.getElementsByTagName('tbody')[0] ||
          a.appendChild(a.ownerDocument.createElement('tbody'))
      : a;
  }
  function Da(a) {
    return (a.type = (null !== n.find.attr(a, 'type')) + '/' + a.type), a;
  }
  function Ea(a) {
    var b = ya.exec(a.type);
    return b ? (a.type = b[1]) : a.removeAttribute('type'), a;
  }
  function Fa(a, b) {
    if (1 === b.nodeType && n.hasData(a)) {
      var c,
        d,
        e,
        f = n._data(a),
        g = n._data(b, f),
        h = f.events;
      if (h) {
        delete g.handle, (g.events = {});
        for (c in h) {
          for (d = 0, e = h[c].length; e > d; d++) {
            n.event.add(b, c, h[c][d]);
          }
        }
      }
      g.data && (g.data = n.extend({}, g.data));
    }
  }
  function Ga(a, b) {
    var c, d, e;
    if (1 === b.nodeType) {
      if (((c = b.nodeName.toLowerCase()), !l.noCloneEvent && b[n.expando])) {
        e = n._data(b);
        for (d in e.events) {
          n.removeEvent(b, d, e.handle);
        }
        b.removeAttribute(n.expando);
      }
      'script' === c && b.text !== a.text
        ? ((Da(b).text = a.text), Ea(b))
        : 'object' === c
        ? (b.parentNode && (b.outerHTML = a.outerHTML),
          l.html5Clone &&
            a.innerHTML &&
            !n.trim(b.innerHTML) &&
            (b.innerHTML = a.innerHTML))
        : 'input' === c && Z.test(a.type)
        ? ((b.defaultChecked = b.checked = a.checked),
          b.value !== a.value && (b.value = a.value))
        : 'option' === c
        ? (b.defaultSelected = b.selected = a.defaultSelected)
        : ('input' !== c && 'textarea' !== c) ||
          (b.defaultValue = a.defaultValue);
    }
  }
  function Ha(a, b, c, d) {
    b = f.apply([], b);
    var e,
      g,
      h,
      i,
      j,
      k,
      m = 0,
      o = a.length,
      p = o - 1,
      q = b[0],
      r = n.isFunction(q);
    if (r || (o > 1 && 'string' == typeof q && !l.checkClone && xa.test(q))) {
      return a.each(function (e) {
        var f = a.eq(e);
        r && (b[0] = q.call(this, e, f.html())), Ha(f, b, c, d);
      });
    }
    if (
      o &&
      ((k = ja(b, a[0].ownerDocument, !1, a, d)),
      (e = k.firstChild),
      1 === k.childNodes.length && (k = e),
      e || d)
    ) {
      for (i = n.map(ea(k, 'script'), Da), h = i.length; o > m; m++) {
        (g = k),
          m !== p &&
            ((g = n.clone(g, !0, !0)), h && n.merge(i, ea(g, 'script'))),
          c.call(a[m], g, m);
      }
      if (h) {
        for (
          j = i[i.length - 1].ownerDocument, n.map(i, Ea), m = 0;
          h > m;
          m++
        ) {
          (g = i[m]),
            _.test(g.type || '') &&
              !n._data(g, 'globalEval') &&
              n.contains(j, g) &&
              (g.src
                ? n._evalUrl && n._evalUrl(g.src)
                : n.globalEval(
                    (g.text || g.textContent || g.innerHTML || '').replace(
                      za,
                      ''
                    )
                  ));
        }
      }
      k = e = null;
    }
    return a;
  }
  function Ia(a, b, c) {
    for (var d, e = b ? n.filter(b, a) : a, f = 0; null != (d = e[f]); f++) {
      c || 1 !== d.nodeType || n.cleanData(ea(d)),
        d.parentNode &&
          (c && n.contains(d.ownerDocument, d) && fa(ea(d, 'script')),
          d.parentNode.removeChild(d));
    }
    return a;
  }
  n.extend({
    htmlPrefilter: function (a) {
      return a.replace(va, '<$1></$2>');
    },
    clone: function (a, b, c) {
      var d,
        e,
        f,
        g,
        h,
        i = n.contains(a.ownerDocument, a);
      if (
        (l.html5Clone || n.isXMLDoc(a) || !ua.test('<' + a.nodeName + '>')
          ? (f = a.cloneNode(!0))
          : ((Ba.innerHTML = a.outerHTML), Ba.removeChild((f = Ba.firstChild))),
        !(
          (l.noCloneEvent && l.noCloneChecked) ||
          (1 !== a.nodeType && 11 !== a.nodeType) ||
          n.isXMLDoc(a)
        ))
      ) {
        for (d = ea(f), h = ea(a), g = 0; null != (e = h[g]); ++g) {
          d[g] && Ga(e, d[g]);
        }
      }
      if (b) {
        if (c) {
          for (h = h || ea(a), d = d || ea(f), g = 0; null != (e = h[g]); g++) {
            Fa(e, d[g]);
          }
        } else {
          Fa(a, f);
        }
      }
      return (
        (d = ea(f, 'script')),
        d.length > 0 && fa(d, !i && ea(a, 'script')),
        (d = h = e = null),
        f
      );
    },
    cleanData: function (a, b) {
      for (
        var d,
          e,
          f,
          g,
          h = 0,
          i = n.expando,
          j = n.cache,
          k = l.attributes,
          m = n.event.special;
        null != (d = a[h]);
        h++
      ) {
        if ((b || M(d)) && ((f = d[i]), (g = f && j[f]))) {
          if (g.events) {
            for (e in g.events) {
              m[e] ? n.event.remove(d, e) : n.removeEvent(d, e, g.handle);
            }
          }
          j[f] &&
            (delete j[f],
            k || 'undefined' == typeof d.removeAttribute
              ? (d[i] = void 0)
              : d.removeAttribute(i),
            c.push(f));
        }
      }
    },
  }),
    n.fn.extend({
      domManip: Ha,
      detach: function (a) {
        return Ia(this, a, !0);
      },
      remove: function (a) {
        return Ia(this, a);
      },
      text: function (a) {
        return Y(
          this,
          function (a) {
            return void 0 === a
              ? n.text(this)
              : this.empty().append(
                  ((this[0] && this[0].ownerDocument) || d).createTextNode(a)
                );
          },
          null,
          a,
          arguments.length
        );
      },
      append: function () {
        return Ha(this, arguments, function (a) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var b = Ca(this, a);
            b.appendChild(a);
          }
        });
      },
      prepend: function () {
        return Ha(this, arguments, function (a) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var b = Ca(this, a);
            b.insertBefore(a, b.firstChild);
          }
        });
      },
      before: function () {
        return Ha(this, arguments, function (a) {
          this.parentNode && this.parentNode.insertBefore(a, this);
        });
      },
      after: function () {
        return Ha(this, arguments, function (a) {
          this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
        });
      },
      empty: function () {
        for (var a, b = 0; null != (a = this[b]); b++) {
          1 === a.nodeType && n.cleanData(ea(a, !1));
          while (a.firstChild) {
            a.removeChild(a.firstChild);
          }
          a.options && n.nodeName(a, 'select') && (a.options.length = 0);
        }
        return this;
      },
      clone: function (a, b) {
        return (
          (a = null == a ? !1 : a),
          (b = null == b ? a : b),
          this.map(function () {
            return n.clone(this, a, b);
          })
        );
      },
      html: function (a) {
        return Y(
          this,
          function (a) {
            var b = this[0] || {},
              c = 0,
              d = this.length;
            if (void 0 === a) {
              return 1 === b.nodeType ? b.innerHTML.replace(ta, '') : void 0;
            }
            if (
              'string' == typeof a &&
              !wa.test(a) &&
              (l.htmlSerialize || !ua.test(a)) &&
              (l.leadingWhitespace || !aa.test(a)) &&
              !da[($.exec(a) || ['', ''])[1].toLowerCase()]
            ) {
              a = n.htmlPrefilter(a);
              try {
                for (; d > c; c++) {
                  (b = this[c] || {}),
                    1 === b.nodeType &&
                      (n.cleanData(ea(b, !1)), (b.innerHTML = a));
                }
                b = 0;
              } catch (e) {}
            }
            b && this.empty().append(a);
          },
          null,
          a,
          arguments.length
        );
      },
      replaceWith: function () {
        var a = [];
        return Ha(
          this,
          arguments,
          function (b) {
            var c = this.parentNode;
            n.inArray(this, a) < 0 &&
              (n.cleanData(ea(this)), c && c.replaceChild(b, this));
          },
          a
        );
      },
    }),
    n.each(
      {
        appendTo: 'append',
        prependTo: 'prepend',
        insertBefore: 'before',
        insertAfter: 'after',
        replaceAll: 'replaceWith',
      },
      function (a, b) {
        n.fn[a] = function (a) {
          for (var c, d = 0, e = [], f = n(a), h = f.length - 1; h >= d; d++) {
            (c = d === h ? this : this.clone(!0)),
              n(f[d])[b](c),
              g.apply(e, c.get());
          }
          return this.pushStack(e);
        };
      }
    );
  var Ja,
    Ka = { HTML: 'block', BODY: 'block' };
  function La(a, b) {
    var c = n(b.createElement(a)).appendTo(b.body),
      d = n.css(c[0], 'display');
    return c.detach(), d;
  }
  function Ma(a) {
    var b = d,
      c = Ka[a];
    return (
      c ||
        ((c = La(a, b)),
        ('none' !== c && c) ||
          ((Ja = (
            Ja || n("<iframe frameborder='0' width='0' height='0'/>")
          ).appendTo(b.documentElement)),
          (b = (Ja[0].contentWindow || Ja[0].contentDocument).document),
          b.write(),
          b.close(),
          (c = La(a, b)),
          Ja.detach()),
        (Ka[a] = c)),
      c
    );
  }
  var Na = /^margin/,
    Oa = new RegExp('^(' + T + ')(?!px)[a-z%]+$', 'i'),
    Pa = function (a, b, c, d) {
      var e,
        f,
        g = {};
      for (f in b) {
        (g[f] = a.style[f]), (a.style[f] = b[f]);
      }
      e = c.apply(a, d || []);
      for (f in b) {
        a.style[f] = g[f];
      }
      return e;
    },
    Qa = d.documentElement;
  !(function () {
    var b,
      c,
      e,
      f,
      g,
      h,
      i = d.createElement('div'),
      j = d.createElement('div');
    if (j.style) {
      (j.style.cssText = 'float:left;opacity:.5'),
        (l.opacity = '0.5' === j.style.opacity),
        (l.cssFloat = !!j.style.cssFloat),
        (j.style.backgroundClip = 'content-box'),
        (j.cloneNode(!0).style.backgroundClip = ''),
        (l.clearCloneStyle = 'content-box' === j.style.backgroundClip),
        (i = d.createElement('div')),
        (i.style.cssText =
          'border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute'),
        (j.innerHTML = ''),
        i.appendChild(j),
        (l.boxSizing =
          '' === j.style.boxSizing ||
          '' === j.style.MozBoxSizing ||
          '' === j.style.WebkitBoxSizing),
        n.extend(l, {
          reliableHiddenOffsets: function () {
            return null == b && k(), f;
          },
          boxSizingReliable: function () {
            return null == b && k(), e;
          },
          pixelMarginRight: function () {
            return null == b && k(), c;
          },
          pixelPosition: function () {
            return null == b && k(), b;
          },
          reliableMarginRight: function () {
            return null == b && k(), g;
          },
          reliableMarginLeft: function () {
            return null == b && k(), h;
          },
        });
      function k() {
        var k,
          l,
          m = d.documentElement;
        m.appendChild(i),
          (j.style.cssText =
            '-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%'),
          (b = e = h = !1),
          (c = g = !0),
          a.getComputedStyle &&
            ((l = a.getComputedStyle(j)),
            (b = '1%' !== (l || {}).top),
            (h = '2px' === (l || {}).marginLeft),
            (e = '4px' === (l || { width: '4px' }).width),
            (j.style.marginRight = '50%'),
            (c = '4px' === (l || { marginRight: '4px' }).marginRight),
            (k = j.appendChild(d.createElement('div'))),
            (k.style.cssText = j.style.cssText =
              '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0'),
            (k.style.marginRight = k.style.width = '0'),
            (j.style.width = '1px'),
            (g = !parseFloat((a.getComputedStyle(k) || {}).marginRight)),
            j.removeChild(k)),
          (j.style.display = 'none'),
          (f = 0 === j.getClientRects().length),
          f &&
            ((j.style.display = ''),
            (j.innerHTML = '<table><tr><td></td><td>t</td></tr></table>'),
            (j.childNodes[0].style.borderCollapse = 'separate'),
            (k = j.getElementsByTagName('td')),
            (k[0].style.cssText = 'margin:0;border:0;padding:0;display:none'),
            (f = 0 === k[0].offsetHeight),
            f &&
              ((k[0].style.display = ''),
              (k[1].style.display = 'none'),
              (f = 0 === k[0].offsetHeight))),
          m.removeChild(i);
      }
    }
  })();
  var Ra,
    Sa,
    Ta = /^(top|right|bottom|left)$/;
  a.getComputedStyle
    ? ((Ra = function (b) {
        var c = b.ownerDocument.defaultView;
        return (c && c.opener) || (c = a), c.getComputedStyle(b);
      }),
      (Sa = function (a, b, c) {
        var d,
          e,
          f,
          g,
          h = a.style;
        return (
          (c = c || Ra(a)),
          (g = c ? c.getPropertyValue(b) || c[b] : void 0),
          ('' !== g && void 0 !== g) ||
            n.contains(a.ownerDocument, a) ||
            (g = n.style(a, b)),
          c &&
            !l.pixelMarginRight() &&
            Oa.test(g) &&
            Na.test(b) &&
            ((d = h.width),
            (e = h.minWidth),
            (f = h.maxWidth),
            (h.minWidth = h.maxWidth = h.width = g),
            (g = c.width),
            (h.width = d),
            (h.minWidth = e),
            (h.maxWidth = f)),
          void 0 === g ? g : g + ''
        );
      }))
    : Qa.currentStyle &&
      ((Ra = function (a) {
        return a.currentStyle;
      }),
      (Sa = function (a, b, c) {
        var d,
          e,
          f,
          g,
          h = a.style;
        return (
          (c = c || Ra(a)),
          (g = c ? c[b] : void 0),
          null == g && h && h[b] && (g = h[b]),
          Oa.test(g) &&
            !Ta.test(b) &&
            ((d = h.left),
            (e = a.runtimeStyle),
            (f = e && e.left),
            f && (e.left = a.currentStyle.left),
            (h.left = 'fontSize' === b ? '1em' : g),
            (g = h.pixelLeft + 'px'),
            (h.left = d),
            f && (e.left = f)),
          void 0 === g ? g : g + '' || 'auto'
        );
      }));
  function Ua(a, b) {
    return {
      get: function () {
        return a()
          ? void delete this.get
          : (this.get = b).apply(this, arguments);
      },
    };
  }
  var Va = /alpha\([^)]*\)/i,
    Wa = /opacity\s*=\s*([^)]*)/i,
    Xa = /^(none|table(?!-c[ea]).+)/,
    Ya = new RegExp('^(' + T + ')(.*)$', 'i'),
    Za = { position: 'absolute', visibility: 'hidden', display: 'block' },
    $a = { letterSpacing: '0', fontWeight: '400' },
    _a = ['Webkit', 'O', 'Moz', 'ms'],
    ab = d.createElement('div').style;
  function bb(a) {
    if (a in ab) {
      return a;
    }
    var b = a.charAt(0).toUpperCase() + a.slice(1),
      c = _a.length;
    while (c--) {
      if (((a = _a[c] + b), a in ab)) {
        return a;
      }
    }
  }
  function cb(a, b) {
    for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) {
      (d = a[g]),
        d.style &&
          ((f[g] = n._data(d, 'olddisplay')),
          (c = d.style.display),
          b
            ? (f[g] || 'none' !== c || (d.style.display = ''),
              '' === d.style.display &&
                W(d) &&
                (f[g] = n._data(d, 'olddisplay', Ma(d.nodeName))))
            : ((e = W(d)),
              ((c && 'none' !== c) || !e) &&
                n._data(d, 'olddisplay', e ? c : n.css(d, 'display'))));
    }
    for (g = 0; h > g; g++) {
      (d = a[g]),
        d.style &&
          ((b && 'none' !== d.style.display && '' !== d.style.display) ||
            (d.style.display = b ? f[g] || '' : 'none'));
    }
    return a;
  }
  function db(a, b, c) {
    var d = Ya.exec(b);
    return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || 'px') : b;
  }
  function eb(a, b, c, d, e) {
    for (
      var f = c === (d ? 'border' : 'content') ? 4 : 'width' === b ? 1 : 0,
        g = 0;
      4 > f;
      f += 2
    ) {
      'margin' === c && (g += n.css(a, c + V[f], !0, e)),
        d
          ? ('content' === c && (g -= n.css(a, 'padding' + V[f], !0, e)),
            'margin' !== c && (g -= n.css(a, 'border' + V[f] + 'Width', !0, e)))
          : ((g += n.css(a, 'padding' + V[f], !0, e)),
            'padding' !== c &&
              (g += n.css(a, 'border' + V[f] + 'Width', !0, e)));
    }
    return g;
  }
  function fb(a, b, c) {
    var d = !0,
      e = 'width' === b ? a.offsetWidth : a.offsetHeight,
      f = Ra(a),
      g = l.boxSizing && 'border-box' === n.css(a, 'boxSizing', !1, f);
    if (0 >= e || null == e) {
      if (
        ((e = Sa(a, b, f)),
        (0 > e || null == e) && (e = a.style[b]),
        Oa.test(e))
      ) {
        return e;
      }
      (d = g && (l.boxSizingReliable() || e === a.style[b])),
        (e = parseFloat(e) || 0);
    }
    return e + eb(a, b, c || (g ? 'border' : 'content'), d, f) + 'px';
  }
  n.extend({
    cssHooks: {
      opacity: {
        get: function (a, b) {
          if (b) {
            var c = Sa(a, 'opacity');
            return '' === c ? '1' : c;
          }
        },
      },
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
    },
    cssProps: { float: l.cssFloat ? 'cssFloat' : 'styleFloat' },
    style: function (a, b, c, d) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var e,
          f,
          g,
          h = n.camelCase(b),
          i = a.style;
        if (
          ((b = n.cssProps[h] || (n.cssProps[h] = bb(h) || h)),
          (g = n.cssHooks[b] || n.cssHooks[h]),
          void 0 === c)
        ) {
          return g && 'get' in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
        }
        if (
          ((f = typeof c),
          'string' === f &&
            (e = U.exec(c)) &&
            e[1] &&
            ((c = X(a, b, e)), (f = 'number')),
          null != c &&
            c === c &&
            ('number' === f &&
              (c += (e && e[3]) || (n.cssNumber[h] ? '' : 'px')),
            l.clearCloneStyle ||
              '' !== c ||
              0 !== b.indexOf('background') ||
              (i[b] = 'inherit'),
            !(g && 'set' in g && void 0 === (c = g.set(a, c, d)))))
        ) {
          try {
            i[b] = c;
          } catch (j) {}
        }
      }
    },
    css: function (a, b, c, d) {
      var e,
        f,
        g,
        h = n.camelCase(b);
      return (
        (b = n.cssProps[h] || (n.cssProps[h] = bb(h) || h)),
        (g = n.cssHooks[b] || n.cssHooks[h]),
        g && 'get' in g && (f = g.get(a, !0, c)),
        void 0 === f && (f = Sa(a, b, d)),
        'normal' === f && b in $a && (f = $a[b]),
        '' === c || c
          ? ((e = parseFloat(f)), c === !0 || isFinite(e) ? e || 0 : f)
          : f
      );
    },
  }),
    n.each(['height', 'width'], function (a, b) {
      n.cssHooks[b] = {
        get: function (a, c, d) {
          return c
            ? Xa.test(n.css(a, 'display')) && 0 === a.offsetWidth
              ? Pa(a, Za, function () {
                  return fb(a, b, d);
                })
              : fb(a, b, d)
            : void 0;
        },
        set: function (a, c, d) {
          var e = d && Ra(a);
          return db(
            a,
            c,
            d
              ? eb(
                  a,
                  b,
                  d,
                  l.boxSizing && 'border-box' === n.css(a, 'boxSizing', !1, e),
                  e
                )
              : 0
          );
        },
      };
    }),
    l.opacity ||
      (n.cssHooks.opacity = {
        get: function (a, b) {
          return Wa.test(
            (b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || ''
          )
            ? 0.01 * parseFloat(RegExp.$1) + ''
            : b
            ? '1'
            : '';
        },
        set: function (a, b) {
          var c = a.style,
            d = a.currentStyle,
            e = n.isNumeric(b) ? 'alpha(opacity=' + 100 * b + ')' : '',
            f = (d && d.filter) || c.filter || '';
          (c.zoom = 1),
            ((b >= 1 || '' === b) &&
              '' === n.trim(f.replace(Va, '')) &&
              c.removeAttribute &&
              (c.removeAttribute('filter'), '' === b || (d && !d.filter))) ||
              (c.filter = Va.test(f) ? f.replace(Va, e) : f + ' ' + e);
        },
      }),
    (n.cssHooks.marginRight = Ua(l.reliableMarginRight, function (a, b) {
      return b
        ? Pa(a, { display: 'inline-block' }, Sa, [a, 'marginRight'])
        : void 0;
    })),
    (n.cssHooks.marginLeft = Ua(l.reliableMarginLeft, function (a, b) {
      return b
        ? (parseFloat(Sa(a, 'marginLeft')) ||
            (n.contains(a.ownerDocument, a)
              ? a.getBoundingClientRect().left -
                Pa(a, { marginLeft: 0 }, function () {
                  return a.getBoundingClientRect().left;
                })
              : 0)) + 'px'
        : void 0;
    })),
    n.each({ margin: '', padding: '', border: 'Width' }, function (a, b) {
      (n.cssHooks[a + b] = {
        expand: function (c) {
          for (
            var d = 0, e = {}, f = 'string' == typeof c ? c.split(' ') : [c];
            4 > d;
            d++
          ) {
            e[a + V[d] + b] = f[d] || f[d - 2] || f[0];
          }
          return e;
        },
      }),
        Na.test(a) || (n.cssHooks[a + b].set = db);
    }),
    n.fn.extend({
      css: function (a, b) {
        return Y(
          this,
          function (a, b, c) {
            var d,
              e,
              f = {},
              g = 0;
            if (n.isArray(b)) {
              for (d = Ra(a), e = b.length; e > g; g++) {
                f[b[g]] = n.css(a, b[g], !1, d);
              }
              return f;
            }
            return void 0 !== c ? n.style(a, b, c) : n.css(a, b);
          },
          a,
          b,
          arguments.length > 1
        );
      },
      show: function () {
        return cb(this, !0);
      },
      hide: function () {
        return cb(this);
      },
      toggle: function (a) {
        return 'boolean' == typeof a
          ? a
            ? this.show()
            : this.hide()
          : this.each(function () {
              W(this) ? n(this).show() : n(this).hide();
            });
      },
    });
  function gb(a, b, c, d, e) {
    return new gb.prototype.init(a, b, c, d, e);
  }
  (n.Tween = gb),
    (gb.prototype = {
      constructor: gb,
      init: function (a, b, c, d, e, f) {
        (this.elem = a),
          (this.prop = c),
          (this.easing = e || n.easing._default),
          (this.options = b),
          (this.start = this.now = this.cur()),
          (this.end = d),
          (this.unit = f || (n.cssNumber[c] ? '' : 'px'));
      },
      cur: function () {
        var a = gb.propHooks[this.prop];
        return a && a.get ? a.get(this) : gb.propHooks._default.get(this);
      },
      run: function (a) {
        var b,
          c = gb.propHooks[this.prop];
        return (
          this.options.duration
            ? (this.pos = b = n.easing[this.easing](
                a,
                this.options.duration * a,
                0,
                1,
                this.options.duration
              ))
            : (this.pos = b = a),
          (this.now = (this.end - this.start) * b + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          c && c.set ? c.set(this) : gb.propHooks._default.set(this),
          this
        );
      },
    }),
    (gb.prototype.init.prototype = gb.prototype),
    (gb.propHooks = {
      _default: {
        get: function (a) {
          var b;
          return 1 !== a.elem.nodeType ||
            (null != a.elem[a.prop] && null == a.elem.style[a.prop])
            ? a.elem[a.prop]
            : ((b = n.css(a.elem, a.prop, '')), b && 'auto' !== b ? b : 0);
        },
        set: function (a) {
          n.fx.step[a.prop]
            ? n.fx.step[a.prop](a)
            : 1 !== a.elem.nodeType ||
              (null == a.elem.style[n.cssProps[a.prop]] && !n.cssHooks[a.prop])
            ? (a.elem[a.prop] = a.now)
            : n.style(a.elem, a.prop, a.now + a.unit);
        },
      },
    }),
    (gb.propHooks.scrollTop = gb.propHooks.scrollLeft = {
      set: function (a) {
        a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
      },
    }),
    (n.easing = {
      linear: function (a) {
        return a;
      },
      swing: function (a) {
        return 0.5 - Math.cos(a * Math.PI) / 2;
      },
      _default: 'swing',
    }),
    (n.fx = gb.prototype.init),
    (n.fx.step = {});
  var hb,
    ib,
    jb = /^(?:toggle|show|hide)$/,
    kb = /queueHooks$/;
  function lb() {
    return (
      a.setTimeout(function () {
        hb = void 0;
      }),
      (hb = n.now())
    );
  }
  function mb(a, b) {
    var c,
      d = { height: a },
      e = 0;
    for (b = b ? 1 : 0; 4 > e; e += 2 - b) {
      (c = V[e]), (d['margin' + c] = d['padding' + c] = a);
    }
    return b && (d.opacity = d.width = a), d;
  }
  function nb(a, b, c) {
    for (
      var d,
        e = (qb.tweeners[b] || []).concat(qb.tweeners['*']),
        f = 0,
        g = e.length;
      g > f;
      f++
    ) {
      if ((d = e[f].call(c, b, a))) {
        return d;
      }
    }
  }
  function ob(a, b, c) {
    var d,
      e,
      f,
      g,
      h,
      i,
      j,
      k,
      m = this,
      o = {},
      p = a.style,
      q = a.nodeType && W(a),
      r = n._data(a, 'fxshow');
    c.queue ||
      ((h = n._queueHooks(a, 'fx')),
      null == h.unqueued &&
        ((h.unqueued = 0),
        (i = h.empty.fire),
        (h.empty.fire = function () {
          h.unqueued || i();
        })),
      h.unqueued++,
      m.always(function () {
        m.always(function () {
          h.unqueued--, n.queue(a, 'fx').length || h.empty.fire();
        });
      })),
      1 === a.nodeType &&
        ('height' in b || 'width' in b) &&
        ((c.overflow = [p.overflow, p.overflowX, p.overflowY]),
        (j = n.css(a, 'display')),
        (k = 'none' === j ? n._data(a, 'olddisplay') || Ma(a.nodeName) : j),
        'inline' === k &&
          'none' === n.css(a, 'float') &&
          (l.inlineBlockNeedsLayout && 'inline' !== Ma(a.nodeName)
            ? (p.zoom = 1)
            : (p.display = 'inline-block'))),
      c.overflow &&
        ((p.overflow = 'hidden'),
        l.shrinkWrapBlocks() ||
          m.always(function () {
            (p.overflow = c.overflow[0]),
              (p.overflowX = c.overflow[1]),
              (p.overflowY = c.overflow[2]);
          }));
    for (d in b) {
      if (((e = b[d]), jb.exec(e))) {
        if (
          (delete b[d], (f = f || 'toggle' === e), e === (q ? 'hide' : 'show'))
        ) {
          if ('show' !== e || !r || void 0 === r[d]) {
            continue;
          }
          q = !0;
        }
        o[d] = (r && r[d]) || n.style(a, d);
      } else {
        j = void 0;
      }
    }
    if (n.isEmptyObject(o)) {
      'inline' === ('none' === j ? Ma(a.nodeName) : j) && (p.display = j);
    } else {
      r ? 'hidden' in r && (q = r.hidden) : (r = n._data(a, 'fxshow', {})),
        f && (r.hidden = !q),
        q
          ? n(a).show()
          : m.done(function () {
              n(a).hide();
            }),
        m.done(function () {
          var b;
          n._removeData(a, 'fxshow');
          for (b in o) {
            n.style(a, b, o[b]);
          }
        });
      for (d in o) {
        (g = nb(q ? r[d] : 0, d, m)),
          d in r ||
            ((r[d] = g.start),
            q &&
              ((g.end = g.start),
              (g.start = 'width' === d || 'height' === d ? 1 : 0)));
      }
    }
  }
  function pb(a, b) {
    var c, d, e, f, g;
    for (c in a) {
      if (
        ((d = n.camelCase(c)),
        (e = b[d]),
        (f = a[c]),
        n.isArray(f) && ((e = f[1]), (f = a[c] = f[0])),
        c !== d && ((a[d] = f), delete a[c]),
        (g = n.cssHooks[d]),
        g && 'expand' in g)
      ) {
        (f = g.expand(f)), delete a[d];
        for (c in f) {
          c in a || ((a[c] = f[c]), (b[c] = e));
        }
      } else {
        b[d] = e;
      }
    }
  }
  function qb(a, b, c) {
    var d,
      e,
      f = 0,
      g = qb.prefilters.length,
      h = n.Deferred().always(function () {
        delete i.elem;
      }),
      i = function () {
        if (e) {
          return !1;
        }
        for (
          var b = hb || lb(),
            c = Math.max(0, j.startTime + j.duration - b),
            d = c / j.duration || 0,
            f = 1 - d,
            g = 0,
            i = j.tweens.length;
          i > g;
          g++
        ) {
          j.tweens[g].run(f);
        }
        return (
          h.notifyWith(a, [j, f, c]),
          1 > f && i ? c : (h.resolveWith(a, [j]), !1)
        );
      },
      j = h.promise({
        elem: a,
        props: n.extend({}, b),
        opts: n.extend(!0, { specialEasing: {}, easing: n.easing._default }, c),
        originalProperties: b,
        originalOptions: c,
        startTime: hb || lb(),
        duration: c.duration,
        tweens: [],
        createTween: function (b, c) {
          var d = n.Tween(
            a,
            j.opts,
            b,
            c,
            j.opts.specialEasing[b] || j.opts.easing
          );
          return j.tweens.push(d), d;
        },
        stop: function (b) {
          var c = 0,
            d = b ? j.tweens.length : 0;
          if (e) {
            return this;
          }
          for (e = !0; d > c; c++) {
            j.tweens[c].run(1);
          }
          return (
            b
              ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b]))
              : h.rejectWith(a, [j, b]),
            this
          );
        },
      }),
      k = j.props;
    for (pb(k, j.opts.specialEasing); g > f; f++) {
      if ((d = qb.prefilters[f].call(j, a, k, j.opts))) {
        return (
          n.isFunction(d.stop) &&
            (n._queueHooks(j.elem, j.opts.queue).stop = n.proxy(d.stop, d)),
          d
        );
      }
    }
    return (
      n.map(k, nb, j),
      n.isFunction(j.opts.start) && j.opts.start.call(a, j),
      n.fx.timer(n.extend(i, { elem: a, anim: j, queue: j.opts.queue })),
      j
        .progress(j.opts.progress)
        .done(j.opts.done, j.opts.complete)
        .fail(j.opts.fail)
        .always(j.opts.always)
    );
  }
  (n.Animation = n.extend(qb, {
    tweeners: {
      '*': [
        function (a, b) {
          var c = this.createTween(a, b);
          return X(c.elem, a, U.exec(b), c), c;
        },
      ],
    },
    tweener: function (a, b) {
      n.isFunction(a) ? ((b = a), (a = ['*'])) : (a = a.match(G));
      for (var c, d = 0, e = a.length; e > d; d++) {
        (c = a[d]),
          (qb.tweeners[c] = qb.tweeners[c] || []),
          qb.tweeners[c].unshift(b);
      }
    },
    prefilters: [ob],
    prefilter: function (a, b) {
      b ? qb.prefilters.unshift(a) : qb.prefilters.push(a);
    },
  })),
    (n.speed = function (a, b, c) {
      var d =
        a && 'object' == typeof a
          ? n.extend({}, a)
          : {
              complete: c || (!c && b) || (n.isFunction(a) && a),
              duration: a,
              easing: (c && b) || (b && !n.isFunction(b) && b),
            };
      return (
        (d.duration = n.fx.off
          ? 0
          : 'number' == typeof d.duration
          ? d.duration
          : d.duration in n.fx.speeds
          ? n.fx.speeds[d.duration]
          : n.fx.speeds._default),
        (null != d.queue && d.queue !== !0) || (d.queue = 'fx'),
        (d.old = d.complete),
        (d.complete = function () {
          n.isFunction(d.old) && d.old.call(this),
            d.queue && n.dequeue(this, d.queue);
        }),
        d
      );
    }),
    n.fn.extend({
      fadeTo: function (a, b, c, d) {
        return this.filter(W)
          .css('opacity', 0)
          .show()
          .end()
          .animate({ opacity: b }, a, c, d);
      },
      animate: function (a, b, c, d) {
        var e = n.isEmptyObject(a),
          f = n.speed(b, c, d),
          g = function () {
            var b = qb(this, n.extend({}, a), f);
            (e || n._data(this, 'finish')) && b.stop(!0);
          };
        return (
          (g.finish = g),
          e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        );
      },
      stop: function (a, b, c) {
        var d = function (a) {
          var b = a.stop;
          delete a.stop, b(c);
        };
        return (
          'string' != typeof a && ((c = b), (b = a), (a = void 0)),
          b && a !== !1 && this.queue(a || 'fx', []),
          this.each(function () {
            var b = !0,
              e = null != a && a + 'queueHooks',
              f = n.timers,
              g = n._data(this);
            if (e) {
              g[e] && g[e].stop && d(g[e]);
            } else {
              for (e in g) {
                g[e] && g[e].stop && kb.test(e) && d(g[e]);
              }
            }
            for (e = f.length; e--; ) {
              f[e].elem !== this ||
                (null != a && f[e].queue !== a) ||
                (f[e].anim.stop(c), (b = !1), f.splice(e, 1));
            }
            (!b && c) || n.dequeue(this, a);
          })
        );
      },
      finish: function (a) {
        return (
          a !== !1 && (a = a || 'fx'),
          this.each(function () {
            var b,
              c = n._data(this),
              d = c[a + 'queue'],
              e = c[a + 'queueHooks'],
              f = n.timers,
              g = d ? d.length : 0;
            for (
              c.finish = !0,
                n.queue(this, a, []),
                e && e.stop && e.stop.call(this, !0),
                b = f.length;
              b--;

            ) {
              f[b].elem === this &&
                f[b].queue === a &&
                (f[b].anim.stop(!0), f.splice(b, 1));
            }
            for (b = 0; g > b; b++) {
              d[b] && d[b].finish && d[b].finish.call(this);
            }
            delete c.finish;
          })
        );
      },
    }),
    n.each(['toggle', 'show', 'hide'], function (a, b) {
      var c = n.fn[b];
      n.fn[b] = function (a, d, e) {
        return null == a || 'boolean' == typeof a
          ? c.apply(this, arguments)
          : this.animate(mb(b, !0), a, d, e);
      };
    }),
    n.each(
      {
        slideDown: mb('show'),
        slideUp: mb('hide'),
        slideToggle: mb('toggle'),
        fadeIn: { opacity: 'show' },
        fadeOut: { opacity: 'hide' },
        fadeToggle: { opacity: 'toggle' },
      },
      function (a, b) {
        n.fn[a] = function (a, c, d) {
          return this.animate(b, a, c, d);
        };
      }
    ),
    (n.timers = []),
    (n.fx.tick = function () {
      var a,
        b = n.timers,
        c = 0;
      for (hb = n.now(); c < b.length; c++) {
        (a = b[c]), a() || b[c] !== a || b.splice(c--, 1);
      }
      b.length || n.fx.stop(), (hb = void 0);
    }),
    (n.fx.timer = function (a) {
      n.timers.push(a), a() ? n.fx.start() : n.timers.pop();
    }),
    (n.fx.interval = 13),
    (n.fx.start = function () {
      ib || (ib = a.setInterval(n.fx.tick, n.fx.interval));
    }),
    (n.fx.stop = function () {
      a.clearInterval(ib), (ib = null);
    }),
    (n.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (n.fn.delay = function (b, c) {
      return (
        (b = n.fx ? n.fx.speeds[b] || b : b),
        (c = c || 'fx'),
        this.queue(c, function (c, d) {
          var e = a.setTimeout(c, b);
          d.stop = function () {
            a.clearTimeout(e);
          };
        })
      );
    }),
    (function () {
      var a,
        b = d.createElement('input'),
        c = d.createElement('div'),
        e = d.createElement('select'),
        f = e.appendChild(d.createElement('option'));
      (c = d.createElement('div')),
        c.setAttribute('className', 't'),
        (c.innerHTML =
          "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
        (a = c.getElementsByTagName('a')[0]),
        b.setAttribute('type', 'checkbox'),
        c.appendChild(b),
        (a = c.getElementsByTagName('a')[0]),
        (a.style.cssText = 'top:1px'),
        (l.getSetAttribute = 't' !== c.className),
        (l.style = /top/.test(a.getAttribute('style'))),
        (l.hrefNormalized = '/a' === a.getAttribute('href')),
        (l.checkOn = !!b.value),
        (l.optSelected = f.selected),
        (l.enctype = !!d.createElement('form').enctype),
        (e.disabled = !0),
        (l.optDisabled = !f.disabled),
        (b = d.createElement('input')),
        b.setAttribute('value', ''),
        (l.input = '' === b.getAttribute('value')),
        (b.value = 't'),
        b.setAttribute('type', 'radio'),
        (l.radioValue = 't' === b.value);
    })();
  var rb = /\r/g,
    sb = /[\x20\t\r\n\f]+/g;
  n.fn.extend({
    val: function (a) {
      var b,
        c,
        d,
        e = this[0];
      if (arguments.length) {
        return (
          (d = n.isFunction(a)),
          this.each(function (c) {
            var e;
            1 === this.nodeType &&
              ((e = d ? a.call(this, c, n(this).val()) : a),
              null == e
                ? (e = '')
                : 'number' == typeof e
                ? (e += '')
                : n.isArray(e) &&
                  (e = n.map(e, function (a) {
                    return null == a ? '' : a + '';
                  })),
              (b =
                n.valHooks[this.type] ||
                n.valHooks[this.nodeName.toLowerCase()]),
              (b && 'set' in b && void 0 !== b.set(this, e, 'value')) ||
                (this.value = e));
          })
        );
      }
      if (e) {
        return (
          (b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()]),
          b && 'get' in b && void 0 !== (c = b.get(e, 'value'))
            ? c
            : ((c = e.value),
              'string' == typeof c ? c.replace(rb, '') : null == c ? '' : c)
        );
      }
    },
  }),
    n.extend({
      valHooks: {
        option: {
          get: function (a) {
            var b = n.find.attr(a, 'value');
            return null != b ? b : n.trim(n.text(a)).replace(sb, ' ');
          },
        },
        select: {
          get: function (a) {
            for (
              var b,
                c,
                d = a.options,
                e = a.selectedIndex,
                f = 'select-one' === a.type || 0 > e,
                g = f ? null : [],
                h = f ? e + 1 : d.length,
                i = 0 > e ? h : f ? e : 0;
              h > i;
              i++
            ) {
              if (
                ((c = d[i]),
                (c.selected || i === e) &&
                  (l.optDisabled
                    ? !c.disabled
                    : null === c.getAttribute('disabled')) &&
                  (!c.parentNode.disabled ||
                    !n.nodeName(c.parentNode, 'optgroup')))
              ) {
                if (((b = n(c).val()), f)) {
                  return b;
                }
                g.push(b);
              }
            }
            return g;
          },
          set: function (a, b) {
            var c,
              d,
              e = a.options,
              f = n.makeArray(b),
              g = e.length;
            while (g--) {
              if (((d = e[g]), n.inArray(n.valHooks.option.get(d), f) > -1)) {
                try {
                  d.selected = c = !0;
                } catch (h) {
                  d.scrollHeight;
                }
              } else {
                d.selected = !1;
              }
            }
            return c || (a.selectedIndex = -1), e;
          },
        },
      },
    }),
    n.each(['radio', 'checkbox'], function () {
      (n.valHooks[this] = {
        set: function (a, b) {
          return n.isArray(b)
            ? (a.checked = n.inArray(n(a).val(), b) > -1)
            : void 0;
        },
      }),
        l.checkOn ||
          (n.valHooks[this].get = function (a) {
            return null === a.getAttribute('value') ? 'on' : a.value;
          });
    });
  var tb,
    ub,
    vb = n.expr.attrHandle,
    wb = /^(?:checked|selected)$/i,
    xb = l.getSetAttribute,
    yb = l.input;
  n.fn.extend({
    attr: function (a, b) {
      return Y(this, n.attr, a, b, arguments.length > 1);
    },
    removeAttr: function (a) {
      return this.each(function () {
        n.removeAttr(this, a);
      });
    },
  }),
    n.extend({
      attr: function (a, b, c) {
        var d,
          e,
          f = a.nodeType;
        if (3 !== f && 8 !== f && 2 !== f) {
          return 'undefined' == typeof a.getAttribute
            ? n.prop(a, b, c)
            : ((1 === f && n.isXMLDoc(a)) ||
                ((b = b.toLowerCase()),
                (e = n.attrHooks[b] || (n.expr.match.bool.test(b) ? ub : tb))),
              void 0 !== c
                ? null === c
                  ? void n.removeAttr(a, b)
                  : e && 'set' in e && void 0 !== (d = e.set(a, c, b))
                  ? d
                  : (a.setAttribute(b, c + ''), c)
                : e && 'get' in e && null !== (d = e.get(a, b))
                ? d
                : ((d = n.find.attr(a, b)), null == d ? void 0 : d));
        }
      },
      attrHooks: {
        type: {
          set: function (a, b) {
            if (!l.radioValue && 'radio' === b && n.nodeName(a, 'input')) {
              var c = a.value;
              return a.setAttribute('type', b), c && (a.value = c), b;
            }
          },
        },
      },
      removeAttr: function (a, b) {
        var c,
          d,
          e = 0,
          f = b && b.match(G);
        if (f && 1 === a.nodeType) {
          while ((c = f[e++])) {
            (d = n.propFix[c] || c),
              n.expr.match.bool.test(c)
                ? (yb && xb) || !wb.test(c)
                  ? (a[d] = !1)
                  : (a[n.camelCase('default-' + c)] = a[d] = !1)
                : n.attr(a, c, ''),
              a.removeAttribute(xb ? c : d);
          }
        }
      },
    }),
    (ub = {
      set: function (a, b, c) {
        return (
          b === !1
            ? n.removeAttr(a, c)
            : (yb && xb) || !wb.test(c)
            ? a.setAttribute((!xb && n.propFix[c]) || c, c)
            : (a[n.camelCase('default-' + c)] = a[c] = !0),
          c
        );
      },
    }),
    n.each(n.expr.match.bool.source.match(/\w+/g), function (a, b) {
      var c = vb[b] || n.find.attr;
      (yb && xb) || !wb.test(b)
        ? (vb[b] = function (a, b, d) {
            var e, f;
            return (
              d ||
                ((f = vb[b]),
                (vb[b] = e),
                (e = null != c(a, b, d) ? b.toLowerCase() : null),
                (vb[b] = f)),
              e
            );
          })
        : (vb[b] = function (a, b, c) {
            return c
              ? void 0
              : a[n.camelCase('default-' + b)]
              ? b.toLowerCase()
              : null;
          });
    }),
    (yb && xb) ||
      (n.attrHooks.value = {
        set: function (a, b, c) {
          return n.nodeName(a, 'input')
            ? void (a.defaultValue = b)
            : tb && tb.set(a, b, c);
        },
      }),
    xb ||
      ((tb = {
        set: function (a, b, c) {
          var d = a.getAttributeNode(c);
          return (
            d || a.setAttributeNode((d = a.ownerDocument.createAttribute(c))),
            (d.value = b += ''),
            'value' === c || b === a.getAttribute(c) ? b : void 0
          );
        },
      }),
      (vb.id = vb.name = vb.coords = function (a, b, c) {
        var d;
        return c
          ? void 0
          : (d = a.getAttributeNode(b)) && '' !== d.value
          ? d.value
          : null;
      }),
      (n.valHooks.button = {
        get: function (a, b) {
          var c = a.getAttributeNode(b);
          return c && c.specified ? c.value : void 0;
        },
        set: tb.set,
      }),
      (n.attrHooks.contenteditable = {
        set: function (a, b, c) {
          tb.set(a, '' === b ? !1 : b, c);
        },
      }),
      n.each(['width', 'height'], function (a, b) {
        n.attrHooks[b] = {
          set: function (a, c) {
            return '' === c ? (a.setAttribute(b, 'auto'), c) : void 0;
          },
        };
      })),
    l.style ||
      (n.attrHooks.style = {
        get: function (a) {
          return a.style.cssText || void 0;
        },
        set: function (a, b) {
          return (a.style.cssText = b + '');
        },
      });
  var zb = /^(?:input|select|textarea|button|object)$/i,
    Ab = /^(?:a|area)$/i;
  n.fn.extend({
    prop: function (a, b) {
      return Y(this, n.prop, a, b, arguments.length > 1);
    },
    removeProp: function (a) {
      return (
        (a = n.propFix[a] || a),
        this.each(function () {
          try {
            (this[a] = void 0), delete this[a];
          } catch (b) {}
        })
      );
    },
  }),
    n.extend({
      prop: function (a, b, c) {
        var d,
          e,
          f = a.nodeType;
        if (3 !== f && 8 !== f && 2 !== f) {
          return (
            (1 === f && n.isXMLDoc(a)) ||
              ((b = n.propFix[b] || b), (e = n.propHooks[b])),
            void 0 !== c
              ? e && 'set' in e && void 0 !== (d = e.set(a, c, b))
                ? d
                : (a[b] = c)
              : e && 'get' in e && null !== (d = e.get(a, b))
              ? d
              : a[b]
          );
        }
      },
      propHooks: {
        tabIndex: {
          get: function (a) {
            var b = n.find.attr(a, 'tabindex');
            return b
              ? parseInt(b, 10)
              : zb.test(a.nodeName) || (Ab.test(a.nodeName) && a.href)
              ? 0
              : -1;
          },
        },
      },
      propFix: { for: 'htmlFor', class: 'className' },
    }),
    l.hrefNormalized ||
      n.each(['href', 'src'], function (a, b) {
        n.propHooks[b] = {
          get: function (a) {
            return a.getAttribute(b, 4);
          },
        };
      }),
    l.optSelected ||
      (n.propHooks.selected = {
        get: function (a) {
          var b = a.parentNode;
          return (
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex),
            null
          );
        },
        set: function (a) {
          var b = a.parentNode;
          b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
        },
      }),
    n.each(
      [
        'tabIndex',
        'readOnly',
        'maxLength',
        'cellSpacing',
        'cellPadding',
        'rowSpan',
        'colSpan',
        'useMap',
        'frameBorder',
        'contentEditable',
      ],
      function () {
        n.propFix[this.toLowerCase()] = this;
      }
    ),
    l.enctype || (n.propFix.enctype = 'encoding');
  var Bb = /[\t\r\n\f]/g;
  function Cb(a) {
    return n.attr(a, 'class') || '';
  }
  n.fn.extend({
    addClass: function (a) {
      var b,
        c,
        d,
        e,
        f,
        g,
        h,
        i = 0;
      if (n.isFunction(a)) {
        return this.each(function (b) {
          n(this).addClass(a.call(this, b, Cb(this)));
        });
      }
      if ('string' == typeof a && a) {
        b = a.match(G) || [];
        while ((c = this[i++])) {
          if (
            ((e = Cb(c)),
            (d = 1 === c.nodeType && (' ' + e + ' ').replace(Bb, ' ')))
          ) {
            g = 0;
            while ((f = b[g++])) {
              d.indexOf(' ' + f + ' ') < 0 && (d += f + ' ');
            }
            (h = n.trim(d)), e !== h && n.attr(c, 'class', h);
          }
        }
      }
      return this;
    },
    removeClass: function (a) {
      var b,
        c,
        d,
        e,
        f,
        g,
        h,
        i = 0;
      if (n.isFunction(a)) {
        return this.each(function (b) {
          n(this).removeClass(a.call(this, b, Cb(this)));
        });
      }
      if (!arguments.length) {
        return this.attr('class', '');
      }
      if ('string' == typeof a && a) {
        b = a.match(G) || [];
        while ((c = this[i++])) {
          if (
            ((e = Cb(c)),
            (d = 1 === c.nodeType && (' ' + e + ' ').replace(Bb, ' ')))
          ) {
            g = 0;
            while ((f = b[g++])) {
              while (d.indexOf(' ' + f + ' ') > -1) {
                d = d.replace(' ' + f + ' ', ' ');
              }
            }
            (h = n.trim(d)), e !== h && n.attr(c, 'class', h);
          }
        }
      }
      return this;
    },
    toggleClass: function (a, b) {
      var c = typeof a;
      return 'boolean' == typeof b && 'string' === c
        ? b
          ? this.addClass(a)
          : this.removeClass(a)
        : n.isFunction(a)
        ? this.each(function (c) {
            n(this).toggleClass(a.call(this, c, Cb(this), b), b);
          })
        : this.each(function () {
            var b, d, e, f;
            if ('string' === c) {
              (d = 0), (e = n(this)), (f = a.match(G) || []);
              while ((b = f[d++])) {
                e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
              }
            } else {
              (void 0 !== a && 'boolean' !== c) ||
                ((b = Cb(this)),
                b && n._data(this, '__className__', b),
                n.attr(
                  this,
                  'class',
                  b || a === !1 ? '' : n._data(this, '__className__') || ''
                ));
            }
          });
    },
    hasClass: function (a) {
      var b,
        c,
        d = 0;
      b = ' ' + a + ' ';
      while ((c = this[d++])) {
        if (
          1 === c.nodeType &&
          (' ' + Cb(c) + ' ').replace(Bb, ' ').indexOf(b) > -1
        ) {
          return !0;
        }
      }
      return !1;
    },
  }),
    n.each(
      'blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(
        ' '
      ),
      function (a, b) {
        n.fn[b] = function (a, c) {
          return arguments.length > 0
            ? this.on(b, null, a, c)
            : this.trigger(b);
        };
      }
    ),
    n.fn.extend({
      hover: function (a, b) {
        return this.mouseenter(a).mouseleave(b || a);
      },
    });
  var Db = a.location,
    Eb = n.now(),
    Fb = /\?/,
    Gb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  (n.parseJSON = function (b) {
    if (a.JSON && a.JSON.parse) {
      return a.JSON.parse(b + '');
    }
    var c,
      d = null,
      e = n.trim(b + '');
    return e &&
      !n.trim(
        e.replace(Gb, function (a, b, e, f) {
          return (
            c && b && (d = 0), 0 === d ? a : ((c = e || b), (d += !f - !e), '')
          );
        })
      )
      ? Function('return ' + e)()
      : n.error('Invalid JSON: ' + b);
  }),
    (n.parseXML = function (b) {
      var c, d;
      if (!b || 'string' != typeof b) {
        return null;
      }
      try {
        a.DOMParser
          ? ((d = new a.DOMParser()), (c = d.parseFromString(b, 'text/xml')))
          : ((c = new a.ActiveXObject('Microsoft.XMLDOM')),
            (c.async = 'false'),
            c.loadXML(b));
      } catch (e) {
        c = void 0;
      }
      return (
        (c &&
          c.documentElement &&
          !c.getElementsByTagName('parsererror').length) ||
          n.error('Invalid XML: ' + b),
        c
      );
    });
  var Hb = /#.*$/,
    Ib = /([?&])_=[^&]*/,
    Jb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    Kb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    Lb = /^(?:GET|HEAD)$/,
    Mb = /^\/\//,
    Nb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    Ob = {},
    Pb = {},
    Qb = '*/'.concat('*'),
    Rb = Db.href,
    Sb = Nb.exec(Rb.toLowerCase()) || [];
  function Tb(a) {
    return function (b, c) {
      'string' != typeof b && ((c = b), (b = '*'));
      var d,
        e = 0,
        f = b.toLowerCase().match(G) || [];
      if (n.isFunction(c)) {
        while ((d = f[e++])) {
          '+' === d.charAt(0)
            ? ((d = d.slice(1) || '*'), (a[d] = a[d] || []).unshift(c))
            : (a[d] = a[d] || []).push(c);
        }
      }
    };
  }
  function Ub(a, b, c, d) {
    var e = {},
      f = a === Pb;
    function g(h) {
      var i;
      return (
        (e[h] = !0),
        n.each(a[h] || [], function (a, h) {
          var j = h(b, c, d);
          return 'string' != typeof j || f || e[j]
            ? f
              ? !(i = j)
              : void 0
            : (b.dataTypes.unshift(j), g(j), !1);
        }),
        i
      );
    }
    return g(b.dataTypes[0]) || (!e['*'] && g('*'));
  }
  function Vb(a, b) {
    var c,
      d,
      e = n.ajaxSettings.flatOptions || {};
    for (d in b) {
      void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
    }
    return c && n.extend(!0, a, c), a;
  }
  function Wb(a, b, c) {
    var d,
      e,
      f,
      g,
      h = a.contents,
      i = a.dataTypes;
    while ('*' === i[0]) {
      i.shift(),
        void 0 === e && (e = a.mimeType || b.getResponseHeader('Content-Type'));
    }
    if (e) {
      for (g in h) {
        if (h[g] && h[g].test(e)) {
          i.unshift(g);
          break;
        }
      }
    }
    if (i[0] in c) {
      f = i[0];
    } else {
      for (g in c) {
        if (!i[0] || a.converters[g + ' ' + i[0]]) {
          f = g;
          break;
        }
        d || (d = g);
      }
      f = f || d;
    }
    return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
  }
  function Xb(a, b, c, d) {
    var e,
      f,
      g,
      h,
      i,
      j = {},
      k = a.dataTypes.slice();
    if (k[1]) {
      for (g in a.converters) {
        j[g.toLowerCase()] = a.converters[g];
      }
    }
    f = k.shift();
    while (f) {
      if (
        (a.responseFields[f] && (c[a.responseFields[f]] = b),
        !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)),
        (i = f),
        (f = k.shift()))
      ) {
        if ('*' === f) {
          f = i;
        } else {
          if ('*' !== i && i !== f) {
            if (((g = j[i + ' ' + f] || j['* ' + f]), !g)) {
              for (e in j) {
                if (
                  ((h = e.split(' ')),
                  h[1] === f && (g = j[i + ' ' + h[0]] || j['* ' + h[0]]))
                ) {
                  g === !0
                    ? (g = j[e])
                    : j[e] !== !0 && ((f = h[0]), k.unshift(h[1]));
                  break;
                }
              }
            }
            if (g !== !0) {
              if (g && a['throws']) {
                b = g(b);
              } else {
                try {
                  b = g(b);
                } catch (l) {
                  return {
                    state: 'parsererror',
                    error: g ? l : 'No conversion from ' + i + ' to ' + f,
                  };
                }
              }
            }
          }
        }
      }
    }
    return { state: 'success', data: b };
  }
  n.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: Rb,
      type: 'GET',
      isLocal: Kb.test(Sb[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      accepts: {
        '*': Qb,
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript',
      },
      contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
      responseFields: {
        xml: 'responseXML',
        text: 'responseText',
        json: 'responseJSON',
      },
      converters: {
        '* text': String,
        'text html': !0,
        'text json': n.parseJSON,
        'text xml': n.parseXML,
      },
      flatOptions: { url: !0, context: !0 },
    },
    ajaxSetup: function (a, b) {
      return b ? Vb(Vb(a, n.ajaxSettings), b) : Vb(n.ajaxSettings, a);
    },
    ajaxPrefilter: Tb(Ob),
    ajaxTransport: Tb(Pb),
    ajax: function (b, c) {
      'object' == typeof b && ((c = b), (b = void 0)), (c = c || {});
      var d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l = n.ajaxSetup({}, c),
        m = l.context || l,
        o = l.context && (m.nodeType || m.jquery) ? n(m) : n.event,
        p = n.Deferred(),
        q = n.Callbacks('once memory'),
        r = l.statusCode || {},
        s = {},
        t = {},
        u = 0,
        v = 'canceled',
        w = {
          readyState: 0,
          getResponseHeader: function (a) {
            var b;
            if (2 === u) {
              if (!k) {
                k = {};
                while ((b = Jb.exec(g))) {
                  k[b[1].toLowerCase()] = b[2];
                }
              }
              b = k[a.toLowerCase()];
            }
            return null == b ? null : b;
          },
          getAllResponseHeaders: function () {
            return 2 === u ? g : null;
          },
          setRequestHeader: function (a, b) {
            var c = a.toLowerCase();
            return u || ((a = t[c] = t[c] || a), (s[a] = b)), this;
          },
          overrideMimeType: function (a) {
            return u || (l.mimeType = a), this;
          },
          statusCode: function (a) {
            var b;
            if (a) {
              if (2 > u) {
                for (b in a) {
                  r[b] = [r[b], a[b]];
                }
              } else {
                w.always(a[w.status]);
              }
            }
            return this;
          },
          abort: function (a) {
            var b = a || v;
            return j && j.abort(b), y(0, b), this;
          },
        };
      if (
        ((p.promise(w).complete = q.add),
        (w.success = w.done),
        (w.error = w.fail),
        (l.url = ((b || l.url || Rb) + '')
          .replace(Hb, '')
          .replace(Mb, Sb[1] + '//')),
        (l.type = c.method || c.type || l.method || l.type),
        (l.dataTypes = n
          .trim(l.dataType || '*')
          .toLowerCase()
          .match(G) || ['']),
        null == l.crossDomain &&
          ((d = Nb.exec(l.url.toLowerCase())),
          (l.crossDomain = !(
            !d ||
            (d[1] === Sb[1] &&
              d[2] === Sb[2] &&
              (d[3] || ('http:' === d[1] ? '80' : '443')) ===
                (Sb[3] || ('http:' === Sb[1] ? '80' : '443')))
          ))),
        l.data &&
          l.processData &&
          'string' != typeof l.data &&
          (l.data = n.param(l.data, l.traditional)),
        Ub(Ob, l, c, w),
        2 === u)
      ) {
        return w;
      }
      (i = n.event && l.global),
        i && 0 === n.active++ && n.event.trigger('ajaxStart'),
        (l.type = l.type.toUpperCase()),
        (l.hasContent = !Lb.test(l.type)),
        (f = l.url),
        l.hasContent ||
          (l.data &&
            ((f = l.url += (Fb.test(f) ? '&' : '?') + l.data), delete l.data),
          l.cache === !1 &&
            (l.url = Ib.test(f)
              ? f.replace(Ib, '$1_=' + Eb++)
              : f + (Fb.test(f) ? '&' : '?') + '_=' + Eb++)),
        l.ifModified &&
          (n.lastModified[f] &&
            w.setRequestHeader('If-Modified-Since', n.lastModified[f]),
          n.etag[f] && w.setRequestHeader('If-None-Match', n.etag[f])),
        ((l.data && l.hasContent && l.contentType !== !1) || c.contentType) &&
          w.setRequestHeader('Content-Type', l.contentType),
        w.setRequestHeader(
          'Accept',
          l.dataTypes[0] && l.accepts[l.dataTypes[0]]
            ? l.accepts[l.dataTypes[0]] +
                ('*' !== l.dataTypes[0] ? ', ' + Qb + '; q=0.01' : '')
            : l.accepts['*']
        );
      for (e in l.headers) {
        w.setRequestHeader(e, l.headers[e]);
      }
      if (l.beforeSend && (l.beforeSend.call(m, w, l) === !1 || 2 === u)) {
        return w.abort();
      }
      v = 'abort';
      for (e in { success: 1, error: 1, complete: 1 }) {
        w[e](l[e]);
      }
      if ((j = Ub(Pb, l, c, w))) {
        if (((w.readyState = 1), i && o.trigger('ajaxSend', [w, l]), 2 === u)) {
          return w;
        }
        l.async &&
          l.timeout > 0 &&
          (h = a.setTimeout(function () {
            w.abort('timeout');
          }, l.timeout));
        try {
          (u = 1), j.send(s, y);
        } catch (x) {
          if (!(2 > u)) {
            throw x;
          }
          y(-1, x);
        }
      } else {
        y(-1, 'No Transport');
      }
      function y(b, c, d, e) {
        var k,
          s,
          t,
          v,
          x,
          y = c;
        2 !== u &&
          ((u = 2),
          h && a.clearTimeout(h),
          (j = void 0),
          (g = e || ''),
          (w.readyState = b > 0 ? 4 : 0),
          (k = (b >= 200 && 300 > b) || 304 === b),
          d && (v = Wb(l, w, d)),
          (v = Xb(l, v, w, k)),
          k
            ? (l.ifModified &&
                ((x = w.getResponseHeader('Last-Modified')),
                x && (n.lastModified[f] = x),
                (x = w.getResponseHeader('etag')),
                x && (n.etag[f] = x)),
              204 === b || 'HEAD' === l.type
                ? (y = 'nocontent')
                : 304 === b
                ? (y = 'notmodified')
                : ((y = v.state), (s = v.data), (t = v.error), (k = !t)))
            : ((t = y), (!b && y) || ((y = 'error'), 0 > b && (b = 0))),
          (w.status = b),
          (w.statusText = (c || y) + ''),
          k ? p.resolveWith(m, [s, y, w]) : p.rejectWith(m, [w, y, t]),
          w.statusCode(r),
          (r = void 0),
          i && o.trigger(k ? 'ajaxSuccess' : 'ajaxError', [w, l, k ? s : t]),
          q.fireWith(m, [w, y]),
          i &&
            (o.trigger('ajaxComplete', [w, l]),
            --n.active || n.event.trigger('ajaxStop')));
      }
      return w;
    },
    getJSON: function (a, b, c) {
      return n.get(a, b, c, 'json');
    },
    getScript: function (a, b) {
      return n.get(a, void 0, b, 'script');
    },
  }),
    n.each(['get', 'post'], function (a, b) {
      n[b] = function (a, c, d, e) {
        return (
          n.isFunction(c) && ((e = e || d), (d = c), (c = void 0)),
          n.ajax(
            n.extend(
              { url: a, type: b, dataType: e, data: c, success: d },
              n.isPlainObject(a) && a
            )
          )
        );
      };
    }),
    (n._evalUrl = function (a) {
      return n.ajax({
        url: a,
        type: 'GET',
        dataType: 'script',
        cache: !0,
        async: !1,
        global: !1,
        throws: !0,
      });
    }),
    n.fn.extend({
      wrapAll: function (a) {
        if (n.isFunction(a)) {
          return this.each(function (b) {
            n(this).wrapAll(a.call(this, b));
          });
        }
        if (this[0]) {
          var b = n(a, this[0].ownerDocument).eq(0).clone(!0);
          this[0].parentNode && b.insertBefore(this[0]),
            b
              .map(function () {
                var a = this;
                while (a.firstChild && 1 === a.firstChild.nodeType) {
                  a = a.firstChild;
                }
                return a;
              })
              .append(this);
        }
        return this;
      },
      wrapInner: function (a) {
        return n.isFunction(a)
          ? this.each(function (b) {
              n(this).wrapInner(a.call(this, b));
            })
          : this.each(function () {
              var b = n(this),
                c = b.contents();
              c.length ? c.wrapAll(a) : b.append(a);
            });
      },
      wrap: function (a) {
        var b = n.isFunction(a);
        return this.each(function (c) {
          n(this).wrapAll(b ? a.call(this, c) : a);
        });
      },
      unwrap: function () {
        return this.parent()
          .each(function () {
            n.nodeName(this, 'body') || n(this).replaceWith(this.childNodes);
          })
          .end();
      },
    });
  function Yb(a) {
    return (a.style && a.style.display) || n.css(a, 'display');
  }
  function Zb(a) {
    if (!n.contains(a.ownerDocument || d, a)) {
      return !0;
    }
    while (a && 1 === a.nodeType) {
      if ('none' === Yb(a) || 'hidden' === a.type) {
        return !0;
      }
      a = a.parentNode;
    }
    return !1;
  }
  (n.expr.filters.hidden = function (a) {
    return l.reliableHiddenOffsets()
      ? a.offsetWidth <= 0 && a.offsetHeight <= 0 && !a.getClientRects().length
      : Zb(a);
  }),
    (n.expr.filters.visible = function (a) {
      return !n.expr.filters.hidden(a);
    });
  var $b = /%20/g,
    _b = /\[\]$/,
    ac = /\r?\n/g,
    bc = /^(?:submit|button|image|reset|file)$/i,
    cc = /^(?:input|select|textarea|keygen)/i;
  function dc(a, b, c, d) {
    var e;
    if (n.isArray(b)) {
      n.each(b, function (b, e) {
        c || _b.test(a)
          ? d(a, e)
          : dc(
              a + '[' + ('object' == typeof e && null != e ? b : '') + ']',
              e,
              c,
              d
            );
      });
    } else {
      if (c || 'object' !== n.type(b)) {
        d(a, b);
      } else {
        for (e in b) {
          dc(a + '[' + e + ']', b[e], c, d);
        }
      }
    }
  }
  (n.param = function (a, b) {
    var c,
      d = [],
      e = function (a, b) {
        (b = n.isFunction(b) ? b() : null == b ? '' : b),
          (d[d.length] = encodeURIComponent(a) + '=' + encodeURIComponent(b));
      };
    if (
      (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional),
      n.isArray(a) || (a.jquery && !n.isPlainObject(a)))
    ) {
      n.each(a, function () {
        e(this.name, this.value);
      });
    } else {
      for (c in a) {
        dc(c, a[c], b, e);
      }
    }
    return d.join('&').replace($b, '+');
  }),
    n.fn.extend({
      serialize: function () {
        return n.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          var a = n.prop(this, 'elements');
          return a ? n.makeArray(a) : this;
        })
          .filter(function () {
            var a = this.type;
            return (
              this.name &&
              !n(this).is(':disabled') &&
              cc.test(this.nodeName) &&
              !bc.test(a) &&
              (this.checked || !Z.test(a))
            );
          })
          .map(function (a, b) {
            var c = n(this).val();
            return null == c
              ? null
              : n.isArray(c)
              ? n.map(c, function (a) {
                  return { name: b.name, value: a.replace(ac, '\r\n') };
                })
              : { name: b.name, value: c.replace(ac, '\r\n') };
          })
          .get();
      },
    }),
    (n.ajaxSettings.xhr =
      void 0 !== a.ActiveXObject
        ? function () {
            return this.isLocal
              ? ic()
              : d.documentMode > 8
              ? hc()
              : (/^(get|post|head|put|delete|options)$/i.test(this.type) &&
                  hc()) ||
                ic();
          }
        : hc);
  var ec = 0,
    fc = {},
    gc = n.ajaxSettings.xhr();
  a.attachEvent &&
    a.attachEvent('onunload', function () {
      for (var a in fc) {
        fc[a](void 0, !0);
      }
    }),
    (l.cors = !!gc && 'withCredentials' in gc),
    (gc = l.ajax = !!gc),
    gc &&
      n.ajaxTransport(function (b) {
        if (!b.crossDomain || l.cors) {
          var c;
          return {
            send: function (d, e) {
              var f,
                g = b.xhr(),
                h = ++ec;
              if (
                (g.open(b.type, b.url, b.async, b.username, b.password),
                b.xhrFields)
              ) {
                for (f in b.xhrFields) {
                  g[f] = b.xhrFields[f];
                }
              }
              b.mimeType &&
                g.overrideMimeType &&
                g.overrideMimeType(b.mimeType),
                b.crossDomain ||
                  d['X-Requested-With'] ||
                  (d['X-Requested-With'] = 'XMLHttpRequest');
              for (f in d) {
                void 0 !== d[f] && g.setRequestHeader(f, d[f] + '');
              }
              g.send((b.hasContent && b.data) || null),
                (c = function (a, d) {
                  var f, i, j;
                  if (c && (d || 4 === g.readyState)) {
                    if (
                      (delete fc[h],
                      (c = void 0),
                      (g.onreadystatechange = n.noop),
                      d)
                    ) {
                      4 !== g.readyState && g.abort();
                    } else {
                      (j = {}),
                        (f = g.status),
                        'string' == typeof g.responseText &&
                          (j.text = g.responseText);
                      try {
                        i = g.statusText;
                      } catch (k) {
                        i = '';
                      }
                      f || !b.isLocal || b.crossDomain
                        ? 1223 === f && (f = 204)
                        : (f = j.text ? 200 : 404);
                    }
                  }
                  j && e(f, i, j, g.getAllResponseHeaders());
                }),
                b.async
                  ? 4 === g.readyState
                    ? a.setTimeout(c)
                    : (g.onreadystatechange = fc[h] = c)
                  : c();
            },
            abort: function () {
              c && c(void 0, !0);
            },
          };
        }
      });
  function hc() {
    try {
      return new a.XMLHttpRequest();
    } catch (b) {}
  }
  function ic() {
    try {
      return new a.ActiveXObject('Microsoft.XMLHTTP');
    } catch (b) {}
  }
  n.ajaxSetup({
    accepts: {
      script:
        'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
    },
    contents: { script: /\b(?:java|ecma)script\b/ },
    converters: {
      'text script': function (a) {
        return n.globalEval(a), a;
      },
    },
  }),
    n.ajaxPrefilter('script', function (a) {
      void 0 === a.cache && (a.cache = !1),
        a.crossDomain && ((a.type = 'GET'), (a.global = !1));
    }),
    n.ajaxTransport('script', function (a) {
      if (a.crossDomain) {
        var b,
          c = d.head || n('head')[0] || d.documentElement;
        return {
          send: function (e, f) {
            (b = d.createElement('script')),
              (b.async = !0),
              a.scriptCharset && (b.charset = a.scriptCharset),
              (b.src = a.url),
              (b.onload = b.onreadystatechange = function (a, c) {
                (c || !b.readyState || /loaded|complete/.test(b.readyState)) &&
                  ((b.onload = b.onreadystatechange = null),
                  b.parentNode && b.parentNode.removeChild(b),
                  (b = null),
                  c || f(200, 'success'));
              }),
              c.insertBefore(b, c.firstChild);
          },
          abort: function () {
            b && b.onload(void 0, !0);
          },
        };
      }
    });
  var jc = [],
    kc = /(=)\?(?=&|$)|\?\?/;
  n.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback: function () {
      var a = jc.pop() || n.expando + '_' + Eb++;
      return (this[a] = !0), a;
    },
  }),
    n.ajaxPrefilter('json jsonp', function (b, c, d) {
      var e,
        f,
        g,
        h =
          b.jsonp !== !1 &&
          (kc.test(b.url)
            ? 'url'
            : 'string' == typeof b.data &&
              0 ===
                (b.contentType || '').indexOf(
                  'application/x-www-form-urlencoded'
                ) &&
              kc.test(b.data) &&
              'data');
      return h || 'jsonp' === b.dataTypes[0]
        ? ((e = b.jsonpCallback = n.isFunction(b.jsonpCallback)
            ? b.jsonpCallback()
            : b.jsonpCallback),
          h
            ? (b[h] = b[h].replace(kc, '$1' + e))
            : b.jsonp !== !1 &&
              (b.url += (Fb.test(b.url) ? '&' : '?') + b.jsonp + '=' + e),
          (b.converters['script json'] = function () {
            return g || n.error(e + ' was not called'), g[0];
          }),
          (b.dataTypes[0] = 'json'),
          (f = a[e]),
          (a[e] = function () {
            g = arguments;
          }),
          d.always(function () {
            void 0 === f ? n(a).removeProp(e) : (a[e] = f),
              b[e] && ((b.jsonpCallback = c.jsonpCallback), jc.push(e)),
              g && n.isFunction(f) && f(g[0]),
              (g = f = void 0);
          }),
          'script')
        : void 0;
    }),
    (n.parseHTML = function (a, b, c) {
      if (!a || 'string' != typeof a) {
        return null;
      }
      'boolean' == typeof b && ((c = b), (b = !1)), (b = b || d);
      var e = x.exec(a),
        f = !c && [];
      return e
        ? [b.createElement(e[1])]
        : ((e = ja([a], b, f)),
          f && f.length && n(f).remove(),
          n.merge([], e.childNodes));
    });
  var lc = n.fn.load;
  (n.fn.load = function (a, b, c) {
    if ('string' != typeof a && lc) {
      return lc.apply(this, arguments);
    }
    var d,
      e,
      f,
      g = this,
      h = a.indexOf(' ');
    return (
      h > -1 && ((d = n.trim(a.slice(h, a.length))), (a = a.slice(0, h))),
      n.isFunction(b)
        ? ((c = b), (b = void 0))
        : b && 'object' == typeof b && (e = 'POST'),
      g.length > 0 &&
        n
          .ajax({ url: a, type: e || 'GET', dataType: 'html', data: b })
          .done(function (a) {
            (f = arguments),
              g.html(d ? n('<div>').append(n.parseHTML(a)).find(d) : a);
          })
          .always(
            c &&
              function (a, b) {
                g.each(function () {
                  c.apply(this, f || [a.responseText, b, a]);
                });
              }
          ),
      this
    );
  }),
    n.each(
      [
        'ajaxStart',
        'ajaxStop',
        'ajaxComplete',
        'ajaxError',
        'ajaxSuccess',
        'ajaxSend',
      ],
      function (a, b) {
        n.fn[b] = function (a) {
          return this.on(b, a);
        };
      }
    ),
    (n.expr.filters.animated = function (a) {
      return n.grep(n.timers, function (b) {
        return a === b.elem;
      }).length;
    });
  function mc(a) {
    return n.isWindow(a)
      ? a
      : 9 === a.nodeType
      ? a.defaultView || a.parentWindow
      : !1;
  }
  (n.offset = {
    setOffset: function (a, b, c) {
      var d,
        e,
        f,
        g,
        h,
        i,
        j,
        k = n.css(a, 'position'),
        l = n(a),
        m = {};
      'static' === k && (a.style.position = 'relative'),
        (h = l.offset()),
        (f = n.css(a, 'top')),
        (i = n.css(a, 'left')),
        (j =
          ('absolute' === k || 'fixed' === k) &&
          n.inArray('auto', [f, i]) > -1),
        j
          ? ((d = l.position()), (g = d.top), (e = d.left))
          : ((g = parseFloat(f) || 0), (e = parseFloat(i) || 0)),
        n.isFunction(b) && (b = b.call(a, c, n.extend({}, h))),
        null != b.top && (m.top = b.top - h.top + g),
        null != b.left && (m.left = b.left - h.left + e),
        'using' in b ? b.using.call(a, m) : l.css(m);
    },
  }),
    n.fn.extend({
      offset: function (a) {
        if (arguments.length) {
          return void 0 === a
            ? this
            : this.each(function (b) {
                n.offset.setOffset(this, a, b);
              });
        }
        var b,
          c,
          d = { top: 0, left: 0 },
          e = this[0],
          f = e && e.ownerDocument;
        if (f) {
          return (
            (b = f.documentElement),
            n.contains(b, e)
              ? ('undefined' != typeof e.getBoundingClientRect &&
                  (d = e.getBoundingClientRect()),
                (c = mc(f)),
                {
                  top:
                    d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                  left:
                    d.left +
                    (c.pageXOffset || b.scrollLeft) -
                    (b.clientLeft || 0),
                })
              : d
          );
        }
      },
      position: function () {
        if (this[0]) {
          var a,
            b,
            c = { top: 0, left: 0 },
            d = this[0];
          return (
            'fixed' === n.css(d, 'position')
              ? (b = d.getBoundingClientRect())
              : ((a = this.offsetParent()),
                (b = this.offset()),
                n.nodeName(a[0], 'html') || (c = a.offset()),
                (c.top += n.css(a[0], 'borderTopWidth', !0)),
                (c.left += n.css(a[0], 'borderLeftWidth', !0))),
            {
              top: b.top - c.top - n.css(d, 'marginTop', !0),
              left: b.left - c.left - n.css(d, 'marginLeft', !0),
            }
          );
        }
      },
      offsetParent: function () {
        return this.map(function () {
          var a = this.offsetParent;
          while (
            a &&
            !n.nodeName(a, 'html') &&
            'static' === n.css(a, 'position')
          ) {
            a = a.offsetParent;
          }
          return a || Qa;
        });
      },
    }),
    n.each(
      { scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' },
      function (a, b) {
        var c = /Y/.test(b);
        n.fn[a] = function (d) {
          return Y(
            this,
            function (a, d, e) {
              var f = mc(a);
              return void 0 === e
                ? f
                  ? b in f
                    ? f[b]
                    : f.document.documentElement[d]
                  : a[d]
                : void (f
                    ? f.scrollTo(
                        c ? n(f).scrollLeft() : e,
                        c ? e : n(f).scrollTop()
                      )
                    : (a[d] = e));
            },
            a,
            d,
            arguments.length,
            null
          );
        };
      }
    ),
    n.each(['top', 'left'], function (a, b) {
      n.cssHooks[b] = Ua(l.pixelPosition, function (a, c) {
        return c
          ? ((c = Sa(a, b)), Oa.test(c) ? n(a).position()[b] + 'px' : c)
          : void 0;
      });
    }),
    n.each({ Height: 'height', Width: 'width' }, function (a, b) {
      n.each(
        { padding: 'inner' + a, content: b, '': 'outer' + a },
        function (c, d) {
          n.fn[d] = function (d, e) {
            var f = arguments.length && (c || 'boolean' != typeof d),
              g = c || (d === !0 || e === !0 ? 'margin' : 'border');
            return Y(
              this,
              function (b, c, d) {
                var e;
                return n.isWindow(b)
                  ? b.document.documentElement['client' + a]
                  : 9 === b.nodeType
                  ? ((e = b.documentElement),
                    Math.max(
                      b.body['scroll' + a],
                      e['scroll' + a],
                      b.body['offset' + a],
                      e['offset' + a],
                      e['client' + a]
                    ))
                  : void 0 === d
                  ? n.css(b, c, g)
                  : n.style(b, c, d, g);
              },
              b,
              f ? d : void 0,
              f,
              null
            );
          };
        }
      );
    }),
    n.fn.extend({
      bind: function (a, b, c) {
        return this.on(a, null, b, c);
      },
      unbind: function (a, b) {
        return this.off(a, null, b);
      },
      delegate: function (a, b, c, d) {
        return this.on(b, a, c, d);
      },
      undelegate: function (a, b, c) {
        return 1 === arguments.length
          ? this.off(a, '**')
          : this.off(b, a || '**', c);
      },
    }),
    (n.fn.size = function () {
      return this.length;
    }),
    (n.fn.andSelf = n.fn.addBack),
    'function' == typeof define &&
      define.amd &&
      define('jquery', [], function () {
        return n;
      });
  var nc = a.jQuery,
    oc = a.$;
  return (
    (n.noConflict = function (b) {
      return a.$ === n && (a.$ = oc), b && a.jQuery === n && (a.jQuery = nc), n;
    }),
    b || (a.jQuery = a.$ = n),
    n
  );
});

Math.log10 ||
  (Math.log10 = function (a) {
    return Math.log(a) / Math.log(10);
  });
Math.sign ||
  (Math.sign = function (a) {
    if (a > 0) {
      return 1;
    } else {
      if (a < 0) {
        return -1;
      }
    }
    return 0;
  });
function SigNum(m, h, d) {
  if (m === undefined || m === null) {
    m = 0;
  }
  if (d === undefined || d === null) {
    d = '';
  }
  this.value = 0;
  this.sf = h;
  if (h === undefined) {
    this.sf = Infinity;
  }
  var g = d;
  if (m.constructor == SigNum) {
    this.value = m.value;
    if (h === undefined) {
      this.sf = m.sf;
    }
  } else {
    if (typeof m == 'string') {
      var n = 0;
      var f = '';
      var l = 0;
      var a = false;
      var k = false;
      for (var e = 0; e < m.length; ++e) {
        if (m[e] == '0') {
          if (k) {
            if (a) {
              ++n;
            } else {
              ++l;
            }
          }
          f += '0';
        } else {
          if (m[e] == '.') {
            if (a) {
              console.log(
                'Warning: invalid number format. More than one decimal point detected.'
              );
            } else {
              a = true;
              n += l;
              l = 0;
            }
            f += m[e];
          } else {
            if (m[e] > '0' && m[e] <= '9') {
              k = true;
              ++n;
              f += m[e];
              if (!a) {
                n += l;
                l = 0;
              }
            } else {
              if (m[e] == '#') {
                n = Infinity;
              } else {
                if (m[e] == ',') {
                } else {
                  console.log(
                    "Warning: invalid number format. Character '" +
                      m[e] +
                      "' at position " +
                      e +
                      ' is not valid. Only 0-9 and .,# are accepted.'
                  );
                }
              }
            }
          }
        }
      }
      this.value = Number(f);
      if (h === undefined) {
        this.sf = n;
      }
    } else {
      this.value = m;
    }
  }
  var o = function (i, p) {
    if (typeof p === 'undefined' || +p === 0) {
      return Math.round(i);
    }
    i = +i;
    p = +p;
    if (isNaN(i) || !(typeof p === 'number' && p % 1 === 0)) {
      return NaN;
    }
    i = i.toString().split('e');
    i = Math.round(+(i[0] + 'e' + (i[1] ? +i[1] + p : p)));
    i = i.toString().split('e');
    return +(i[0] + 'e' + (i[1] ? +i[1] - p : -p));
  };
  this.roundToSF = function () {
    if (this.sf <= 0) {
      this.sf = Infinity;
    }
    if (this.sf == Infinity) {
      return this;
    }
    this.value = o(this.value, this.decimalPlaces());
    return this;
  };
  var j = function (q, p) {
    if (SigNum.enableSF == false) {
      return;
    }
    var i = SigNum.roundingMode;
    if (i == SigNum.EnumRoundingMode.AFTER_EACH_OP) {
      p.roundToSF();
    } else {
      if (i == SigNum.EnumRoundingMode.AFTER_EACH_OP_TYPE) {
        if (g != '' && g != q) {
          p.roundToSF();
        }
      }
    }
    g = q;
  };
  this.copy = function () {
    return new SigNum(this.value, this.sf, g);
  };
  this.decimalPlaces = function () {
    if (this.sf <= 0) {
      this.sf = Infinity;
    }
    if (this.sf == Infinity) {
      return Infinity;
    }
    var i = Math.floor(Math.log10(Math.abs(this.value)));
    i -= this.sf - 1;
    return -i;
  };
  this.plus = function (i) {
    j('+', this);
    var r = new SigNum(0, Infinity, g);
    if (i.constructor == SigNum) {
      r.value = this.value + i.value;
      var q = Math.min(i.decimalPlaces(), this.decimalPlaces());
      var p = Math.floor(Math.log10(Math.abs(r.value)));
      r.sf = q + p + 1;
    } else {
      r.value = this.value + i;
      var p = Math.floor(Math.log10(Math.abs(r.value)));
      r.sf = this.decimalPlaces() + p + 1;
    }
    return r;
  };
  this.minus = function (i) {
    j('+', this);
    var r = new SigNum(0, Infinity, g);
    if (i.constructor == SigNum) {
      r.value = this.value - i.value;
      var q = Math.min(i.decimalPlaces(), this.decimalPlaces());
      var p = Math.floor(Math.log10(Math.abs(r.value)));
      r.sf = q + p + 1;
    } else {
      r.value = this.value - i;
      var p = Math.floor(Math.log10(Math.abs(r.value)));
      r.sf = this.decimalPlaces() + p + 1;
    }
    return r;
  };
  this.times = function (i) {
    j('*', this);
    var q = new SigNum(0, Infinity, g);
    if (i.constructor == SigNum) {
      q.value = this.value * i.value;
      if (
        this.sf == Infinity &&
        Math.abs(this.value) > 1 &&
        Math.abs(this.value) % 1 < 1e-300
      ) {
        var p = Math.floor(Math.log10(Math.abs(q.value)));
        q.sf = p + i.decimalPlaces() + 1;
      } else {
        if (
          i.sf == Infinity &&
          Math.abs(i.value) > 1 &&
          Math.abs(i.value) % 1 < 1e-300
        ) {
          var p = Math.floor(Math.log10(Math.abs(q.value)));
          q.sf = p + this.decimalPlaces() + 1;
        } else {
          q.sf = Math.min(this.sf, i.sf);
        }
      }
    } else {
      q.value = this.value * i;
      var p = Math.floor(Math.log10(Math.abs(q.value)));
      if (Math.abs(i) % 1 < 1e-300 && Math.abs(i) > 1) {
        q.sf = p + this.decimalPlaces() + 1;
      } else {
        q.sf = this.sf;
      }
    }
    return q;
  };
  this.scale = function (i) {
    j('*', this);
    var q = new SigNum(0, Infinity, g);
    if (i.constructor == SigNum) {
      q.value = this.value * i.value;
      q.sf = Math.min(this.sf, i.sf);
    } else {
      q.value = this.value * i;
      var p = Math.floor(Math.log10(Math.abs(q.value)));
      q.sf = this.sf;
    }
    return q;
  };
  this.div = function (i) {
    j('*', this);
    var p = new SigNum(0, Infinity, g);
    if (i.constructor == SigNum) {
      p.value = this.value / i.value;
      p.sf = Math.min(i.sf, this.sf);
    } else {
      p.value = this.value / i;
      p.sf = this.sf;
    }
    return p;
  };
  this.mod = function (i) {
    j('*', this);
    var p = new SigNum(0, Infinity, g);
    if (i.constructor == SigNum) {
      p.value = this.value % i.value;
      p.sf = Math.min(i.sf, this.sf);
    } else {
      p.value = this.value % i;
      p.sf = this.sf;
    }
    return p;
  };
  this.expo = function (i) {
    j('^', this);
    var q = new SigNum(0, Infinity, g);
    if (i.constructor == SigNum) {
      q.value = Math.pow(this.value, i.value);
      if (this.value == 10 && i.decimalPlaces() <= 0) {
        q.sf = Infinity;
        return q;
      }
      var p = i.decimalPlaces();
      if (p <= 0) {
        q.sf = this.sf;
      } else {
        q.sf = p;
      }
      if (q.sf == -Infinity) {
        q.sf = Infinity;
      }
    } else {
      q.value = Math.pow(this.value, i);
      q.sf = this.sf;
    }
    return q;
  };
  this.log = function (i) {
    j('log', this);
    var p = new SigNum(0, Infinity, g);
    if (i === undefined) {
      p.value = Math.log(this.value);
    } else {
      if (i == 10 && Math.log10) {
        p.value = Math.log10(this.value);
      } else {
        if (i == 2 && Math.log2) {
          p.value = Math.log2(this.value);
        } else {
          p.value = Math.log(this.value) / Math.log(i);
        }
      }
    }
    p.sf = this.sf + Math.floor(Math.log10(Math.abs(p.value))) + 1;
    return p;
  };
  this.ln = function () {
    j('log', this);
    var i = new SigNum(0, Infinity, g);
    i.value = Math.log(this.value);
    i.sf = this.sf + Math.floor(Math.log10(Math.abs(i.value))) + 1;
    return i;
  };
  this.root = function (i) {
    j('^', this);
    var p = new SigNum(0, Infinity, g);
    if (i.constructor != SigNum || i.sf == Infinity) {
      p.value = Math.pow(this.value, 1 / i);
      p.sf = this.sf;
    } else {
      p.value = Math.pow(this.value, 1 / i.value);
      p.sf = i.decimalPlaces();
    }
    return p;
  };
  this.shl = function (i) {
    j('shift', this);
    var p = new SigNum(0, Infinity, g);
    p.value = p.value << i;
    p.sf = this.decimalPlaces();
    return p;
  };
  this.shr = function (i) {
    j('bitwise', this);
    var p = new SigNum(0, Infinity, g);
    p.value = p.value >> i;
    p.sf = this.sf;
    return p;
  };
  this.and = function (i) {
    j('bitwise', this);
    var p = new SigNum(0, Infinity, g);
    p.value = this.value & i;
    p.sf = this.sf;
    return p;
  };
  this.or = function (i) {
    j('bitwise', this);
    var p = new SigNum(0, Infinity, g);
    p.value = this.value | i;
    p.sf = this.decimalPlaces();
    return p;
  };
  this.or = function (i) {
    j('bitwise', this);
    var p = new SigNum(0, Infinity, g);
    p.value = this.value ^ i;
    p.sf = this.decimalPlaces();
    return p;
  };
  this.not = function () {
    j('bitwise', this);
    var i = new SigNum(0, Infinity, g);
    i.value = ~this.value;
    i.sf = this.decimalPlaces();
    return i;
  };
}
SigNum.EnumRoundingMode = Object.freeze({
  NONE: 0,
  AFTER_EACH_OP: 1,
  AFTER_EACH_OP_TYPE: 2,
});
SigNum.roundingMode = SigNum.EnumRoundingMode.AFTER_EACH_OP_TYPE;
SigNum.enableSF = true;
var autoMapFunction = function (d, a) {
  if (a.constructor == SigNum) {
    a.roundToSF();
    var e = new SigNum(0, Infinity, '');
    e.value = d(a.value);
    e.sf = a.sf;
    return e;
  } else {
    var e = new SigNum(0, Infinity, '');
    e.value = d(a);
    return e;
  }
};
SigNum.root = function (d, e) {
  if (d.constructor != SigNum) {
    d = new SigNum(d);
  }
  return d.expo(new SigNum(1).div(e));
};
SigNum.sqrt = function (a) {
  return autoMapFunction(Math.sqrt, a);
};
SigNum.cbrt = function (a) {
  return autoMapFunction(Math.cbrt, a);
};
SigNum.sin = function (a) {
  return autoMapFunction(Math.sin, a);
};
SigNum.cos = function (a) {
  return autoMapFunction(Math.cos, a);
};
SigNum.tan = function (a) {
  return autoMapFunction(Math.tan, a);
};
SigNum.asin = function (a) {
  return autoMapFunction(Math.asin, a);
};
SigNum.acos = function (a) {
  return autoMapFunction(Math.acos, a);
};
SigNum.atan = function (a) {
  return autoMapFunction(Math.atan, a);
};
SigNum.sinh = function (a) {
  return autoMapFunction(Math.sinh, a);
};
SigNum.cosh = function (a) {
  return autoMapFunction(Math.cosh, a);
};
SigNum.tanh = function (a) {
  return autoMapFunction(Math.tanh, a);
};
SigNum.asinh = function (a) {
  return autoMapFunction(Math.asinh, a);
};
SigNum.acosh = function (a) {
  return autoMapFunction(Math.acosh, a);
};
SigNum.atanh = function (a) {
  return autoMapFunction(Math.atanh, a);
};
SigNum.floor = function (a) {
  return autoMapFunction(Math.floor, a);
};
SigNum.ceil = function (a) {
  return autoMapFunction(Math.ceil, a);
};
SigNum.round = function (a) {
  return autoMapFunction(Math.round, a);
};
SigNum.trunc = function (a) {
  return autoMapFunction(Math.trunc, a);
};
SigNum.sign = function (a) {
  return autoMapFunction(Math.sign, a);
};
SigNum.abs = function (a) {
  return autoMapFunction(Math.abs, a);
};
SigNum.exp = function (a) {
  return autoMapFunction(Math.exp, a);
};
SigNum.expm1 = function (a) {
  return autoMapFunction(Math.expm1, a);
};
SigNum.log1p = function (a) {
  return autoMapFunction(Math.log1p, a);
};
SigNum.log = function (e, d) {
  if (e.constructor != SigNum) {
    e = new SigNum(e);
  }
  return e.log(d);
};
SigNum.log10 = function (d) {
  return SigNum.log(d, 10);
};
SigNum.log2 = function (d) {
  return SigNum.log(d, 2);
};
SigNum.pow = function (e, d) {
  if (e.constructor != SigNum) {
    e = new SigNum(e);
  }
  return e.expo(d);
};
SigNum.max = function (e, d) {
  if (e.constructor != SigNum) {
    e = new SigNum(e);
  }
  if (d.constructor != SigNum) {
    d = new SigNum(d);
  }
  if (e.value > d.value) {
    return e;
  }
  return d;
};
SigNum.min = function (e, d) {
  if (e.constructor != SigNum) {
    e = new SigNum(e);
  }
  if (d.constructor != SigNum) {
    d = new SigNum(d);
  }
  if (e.value < d.value) {
    return e;
  }
  return d;
};
SigNum.random = function (a) {
  return new SigNum(Math.random());
};
SigNum.PI = new SigNum(Math.PI.toString());
SigNum.E = new SigNum(Math.E.toString());
SigNum.prototype.toFullNumber = function () {
  if (this.sf <= 0) {
    this.sf = Infinity;
  }
  var m = this.copy();
  m.value = Math.abs(m.value);
  if (SigNum.enableSF == false || this.sf == Infinity) {
    return (Math.sign(this.value) * m.value).toString();
  }
  m.roundToSF();
  if (this.value == 0) {
    return '0';
  }
  if (this.value == Infinity) {
    return 'Infinity';
  }
  if (this.value == -Infinity) {
    return '-Infinity';
  }
  var e = Math.floor(Math.log10(m.value));
  var n = -m.decimalPlaces();
  var j = this.value < 0 ? '-' : '';
  var d = m.value;
  var a = Math.max(Math.pow(10, n - e - 1), 1e-15);
  var k = false;
  if (e < 0) {
    j = j.concat('0.');
    k = true;
  }
  var h = 0;
  for (var g = -1; g > e; --g) {
    ++h;
    if (h > 650) {
      console.log('Warning: forced to break out of infinite loop.');
      break;
    }
    j = j.concat('0');
  }
  var o = 0;
  h = 0;
  for (var g = e; g >= Math.max(n, e - 15); --g) {
    ++h;
    if (h > 650) {
      console.log('Warning: forced to break out of infinite loop.');
      break;
    }
    var f = (d / Math.pow(10, g)) % 10;
    var l = Math.abs(Math.ceil(f) - f);
    if (l < a && l !== 0) {
      f += 1;
    }
    if (f >= 10) {
      f %= 10;
    }
    if (f == 0) {
      ++o;
    } else {
      o = 0;
    }
    f = Math.floor(f);
    j = j.concat(f.toString());
    if (!isFinite(n) && d % Math.pow(10, g) < Math.pow(10, g) * 1e-15) {
      n = g - 1;
      break;
    }
    if (g == 0 && (g != Math.max(n, -16) || o > 0)) {
      j = j.concat('.');
      k = true;
    }
  }
  if (k && !isFinite(n)) {
    j = j.substring(0, j.length - o);
  } else {
    h = 0;
    for (var g = Math.max(n, e - 15) - 1; g >= 0; --g) {
      ++h;
      if (h > 1000) {
        console.log('Warning: forced to break out of infinite loop.');
        break;
      }
      j = j.concat('0');
    }
  }
  if (o > 0 && !k && SigNum.enableSF === true && isFinite(m.sf)) {
    j = j.concat('(' + m.sf + 'sf)');
  }
  return j;
};
SigNum.prototype.toExponential = function () {
  if (this.sf <= 0) {
    this.sf = Infinity;
  }
  if (this.sf == Infinity || SigNum.enableSF == false) {
    return this.value.toExponential();
  }
  var l = this.copy();
  l.value = Math.abs(l.value);
  l.roundToSF();
  var e = Math.floor(Math.log10(l.value));
  var m = -l.decimalPlaces();
  var j = this.value < 0 ? '-' : '';
  var d = l.value;
  var a = Math.pow(10, m - e - 1);
  var h = 0;
  for (var g = e; g >= m; --g) {
    var f = (d / Math.pow(10, g)) % 10;
    ++h;
    if (h > 1000) {
      console.log('Warning: forced to break out of infinite loop.');
      break;
    }
    var k = Math.abs(Math.ceil(f) - f);
    if (k < a && k !== 0) {
      f += 1;
    }
    if (f >= 10) {
      f %= 10;
    }
    f = Math.floor(f);
    j = j.concat(f.toString());
    if (g == e && e != m) {
      j = j.concat('.');
    }
  }
  if (j.trim() == '') {
    return '0';
  }
  j = j
    .concat('e')
    .concat(e > 0 ? '+' : '')
    .concat(e);
  return j;
};
var NUM_SCI_SPLIT = 5;
SigNum.prototype.toString = function () {
  if (
    this.value != 0 &&
    (Math.abs(this.value) >= Math.pow(10, NUM_SCI_SPLIT) ||
      Math.abs(this.value) <= Math.pow(10, -NUM_SCI_SPLIT))
  ) {
    return this.toExponential();
  } else {
    return this.toFullNumber();
  }
};
SigNum.prototype.valueOf = function () {
  var a = this.copy();
  a.roundToSF();
  return a.value;
};
SigNum.create = function (a) {
  return new SigNum(a);
};
(function () {
  var a = window.jQuery,
    B,
    aO = 'mathquill-command-id',
    aG = 'mathquill-block-id',
    aQ = Math.min,
    w = Math.max;
  function az() {}
  var p = [].slice;
  function ag(P) {
    var L = P.length - 1;
    return function () {
      var R = p.call(arguments, 0, L);
      var aZ = p.call(arguments, L);
      return P.apply(this, R.concat([aZ]));
    };
  }
  var X = ag(function (P, L) {
    return ag(function (aZ, R) {
      if (P in aZ) {
        return aZ[P].apply(aZ, L.concat(R));
      }
    });
  });
  function aH(L) {
    return ag(function (aZ, R) {
      if (typeof aZ !== 'function') {
        aZ = X(aZ);
      }
      var P = function (a0) {
        return aZ.apply(a0, [a0].concat(R));
      };
      return L.call(this, P);
    });
  }
  function aN(L) {
    var P = p.call(arguments, 1);
    return function () {
      return L.apply(this, P);
    };
  }
  function aW(P, L) {
    if (!L) {
      throw new Error('prayer failed: ' + P);
    }
  }
  var ah = (function (R, aZ, a3) {
    function L(P) {
      return typeof P === 'object';
    }
    function a2(P) {
      return typeof P === 'function';
    }
    function a1() {}
    return function a0(a8, a4) {
      if (a4 === a3) {
        a4 = a8;
        a8 = Object;
      }
      function a9() {
        var ba = new P();
        if (a2(ba.init)) {
          ba.init.apply(ba, arguments);
        }
        return ba;
      }
      function P() {}
      a9.Bare = P;
      var a7 = (a1[R] = a8[R]);
      var a6 = (P[R] = a9[R] = a9.p = new a1());
      var a5;
      a6.constructor = a9;
      a9.mixin = function (ba) {
        P[R] = a9[R] = a0(a9, ba)[R];
        return a9;
      };
      return (a9.open = function (bb) {
        a5 = {};
        if (a2(bb)) {
          a5 = bb.call(a9, a6, a7, a9, a8);
        } else {
          if (L(bb)) {
            a5 = bb;
          }
        }
        if (L(a5)) {
          for (var ba in a5) {
            if (aZ.call(a5, ba)) {
              a6[ba] = a5[ba];
            }
          }
        }
        if (!a2(a6.init)) {
          a6.init = a8;
        }
        return a9;
      })(a4);
    };
  })('prototype', {}.hasOwnProperty);
  var ak = -1;
  var af = 1;
  function ap(L) {
    aW('a direction was passed', L === ak || L === af);
  }
  var aD = ah(a, function (L) {
    L.insDirOf = function (P, R) {
      return P === ak
        ? this.insertBefore(R.first())
        : this.insertAfter(R.last());
    };
    L.insAtDirEnd = function (P, R) {
      return P === ak ? this.prependTo(R) : this.appendTo(R);
    };
  });
  var h = ah(function (L) {
    L.parent = 0;
    L[ak] = 0;
    L[af] = 0;
    L.init = function (R, P, aZ) {
      this.parent = R;
      this[ak] = P;
      this[af] = aZ;
    };
    this.copy = function (P) {
      return h(P.parent, P[ak], P[af]);
    };
  });
  var aB = ah(function (L) {
    L[ak] = 0;
    L[af] = 0;
    L.parent = 0;
    var R = 0;
    function P() {
      return (R += 1);
    }
    this.byId = {};
    L.init = function () {
      this.id = P();
      aB.byId[this.id] = this;
      this.ends = {};
      this.ends[ak] = 0;
      this.ends[af] = 0;
    };
    L.dispose = function () {
      delete aB.byId[this.id];
    };
    L.toString = function () {
      return '{{ MathQuill Node #' + this.id + ' }}';
    };
    L.jQ = aD();
    L.jQadd = function (aZ) {
      return (this.jQ = this.jQ.add(aZ));
    };
    L.jQize = function (a1) {
      var a1 = aD(a1 || this.html());
      function a0(a4) {
        if (a4.getAttribute) {
          var a2 = a4.getAttribute('mathquill-command-id');
          var a3 = a4.getAttribute('mathquill-block-id');
          if (a2) {
            aB.byId[a2].jQadd(a4);
          }
          if (a3) {
            aB.byId[a3].jQadd(a4);
          }
        }
        for (a4 = a4.firstChild; a4; a4 = a4.nextSibling) {
          a0(a4);
        }
      }
      for (var aZ = 0; aZ < a1.length; aZ += 1) {
        a0(a1[aZ]);
      }
      return a1;
    };
    L.createDir = function (aZ, a1) {
      ap(aZ);
      var a0 = this;
      a0.jQize();
      a0.jQ.insDirOf(aZ, a1.jQ);
      a1[aZ] = a0.adopt(a1.parent, a1[ak], a1[af]);
      return a0;
    };
    L.createLeftOf = function (aZ) {
      return this.createDir(ak, aZ);
    };
    L.selectChildren = function (aZ, a0) {
      return aU(aZ, a0);
    };
    L.bubble = aH(function (a0) {
      for (var a1 = this; a1; a1 = a1.parent) {
        var aZ = a0(a1);
        if (aZ === false) {
          break;
        }
      }
      return this;
    });
    L.postOrder = aH(function (aZ) {
      (function a0(a1) {
        a1.eachChild(a0);
        aZ(a1);
      })(this);
      return this;
    });
    L.isEmpty = function () {
      return this.ends[ak] === 0 && this.ends[af] === 0;
    };
    L.children = function () {
      return A(this.ends[ak], this.ends[af]);
    };
    L.eachChild = function () {
      var aZ = this.children();
      aZ.each.apply(aZ, arguments);
      return this;
    };
    L.foldChildren = function (aZ, a0) {
      return this.children().fold(aZ, a0);
    };
    L.withDirAdopt = function (a0, a1, aZ, a2) {
      A(this, this).withDirAdopt(a0, a1, aZ, a2);
      return this;
    };
    L.adopt = function (a0, aZ, a1) {
      A(this, this).adopt(a0, aZ, a1);
      return this;
    };
    L.disown = function () {
      A(this, this).disown();
      return this;
    };
    L.remove = function () {
      this.jQ.remove();
      this.postOrder('dispose');
      return this.disown();
    };
  });
  function Y(P, L, R) {
    aW('a parent is always present', P);
    aW(
      'leftward is properly set up',
      (function () {
        if (!L) {
          return P.ends[ak] === R;
        }
        return L[af] === R && L.parent === P;
      })()
    );
    aW(
      'rightward is properly set up',
      (function () {
        if (!R) {
          return P.ends[af] === L;
        }
        return R[ak] === L && R.parent === P;
      })()
    );
  }
  var A = ah(function (L) {
    L.init = function (P, a0, aZ) {
      if (aZ === B) {
        aZ = ak;
      }
      ap(aZ);
      aW('no half-empty fragments', !P === !a0);
      this.ends = {};
      if (!P) {
        return;
      }
      aW('withDir is passed to Fragment', P instanceof aB);
      aW('oppDir is passed to Fragment', a0 instanceof aB);
      aW('withDir and oppDir have the same parent', P.parent === a0.parent);
      this.ends[aZ] = P;
      this.ends[-aZ] = a0;
      var R = this.fold([], function (a1, a2) {
        a1.push.apply(a1, a2.jQ.get());
        return a1;
      });
      this.jQ = this.jQ.add(R);
    };
    L.jQ = aD();
    L.withDirAdopt = function (R, aZ, P, a0) {
      return R === ak ? this.adopt(aZ, P, a0) : this.adopt(aZ, a0, P);
    };
    L.adopt = function (aZ, R, a1) {
      Y(aZ, R, a1);
      var P = this;
      P.disowned = false;
      var a0 = P.ends[ak];
      if (!a0) {
        return this;
      }
      var a2 = P.ends[af];
      if (R) {
      } else {
        aZ.ends[ak] = a0;
      }
      if (a1) {
        a1[ak] = a2;
      } else {
        aZ.ends[af] = a2;
      }
      P.ends[af][af] = a1;
      P.each(function (a3) {
        a3[ak] = R;
        a3.parent = aZ;
        if (R) {
          R[af] = a3;
        }
        R = a3;
      });
      return P;
    };
    L.disown = function () {
      var P = this;
      var aZ = P.ends[ak];
      if (!aZ || P.disowned) {
        return P;
      }
      P.disowned = true;
      var a0 = P.ends[af];
      var R = aZ.parent;
      Y(R, aZ[ak], aZ);
      Y(R, a0, a0[af]);
      if (aZ[ak]) {
        aZ[ak][af] = a0[af];
      } else {
        R.ends[ak] = a0[af];
      }
      if (a0[af]) {
        a0[af][ak] = aZ[ak];
      } else {
        R.ends[af] = aZ[ak];
      }
      return P;
    };
    L.remove = function () {
      this.jQ.remove();
      this.each('postOrder', 'dispose');
      return this.disown();
    };
    L.each = aH(function (R) {
      var aZ = this;
      var a0 = aZ.ends[ak];
      if (!a0) {
        return aZ;
      }
      for (; a0 !== aZ.ends[af][af]; a0 = a0[af]) {
        var P = R(a0);
        if (P === false) {
          break;
        }
      }
      return aZ;
    });
    L.fold = function (P, R) {
      this.each(function (aZ) {
        P = R.call(this, P, aZ);
      });
      return P;
    };
  });
  var ay = {},
    aL = {};
  var z = ah(h, function (L) {
    L.init = function (R, P) {
      this.parent = R;
      this.options = P;
      var aZ = (this.jQ = this._jQ = aD(
        '<span class="mq-cursor">&#8203;</span>'
      ));
      this.blink = function () {
        aZ.toggleClass('mq-blink');
      };
      this.upDownCache = {};
    };
    L.show = function () {
      this.jQ = this._jQ.removeClass('mq-blink');
      if ('intervalId' in this) {
        clearInterval(this.intervalId);
      } else {
        if (this[af]) {
          if (this.selection && this.selection.ends[ak][ak] === this[ak]) {
            this.jQ.insertBefore(this.selection.jQ);
          } else {
            this.jQ.insertBefore(this[af].jQ.first());
          }
        } else {
          this.jQ.appendTo(this.parent.jQ);
        }
        this.parent.focus();
      }
      this.intervalId = setInterval(this.blink, 500);
      return this;
    };
    L.hide = function () {
      if ('intervalId' in this) {
        clearInterval(this.intervalId);
      }
      delete this.intervalId;
      this.jQ.detach();
      this.jQ = aD();
      return this;
    };
    L.withDirInsertAt = function (R, a0, P, a1) {
      var aZ = this.parent;
      this.parent = a0;
      this[R] = P;
      this[-R] = a1;
      if (aZ !== a0 && aZ.blur) {
        aZ.blur();
      }
    };
    L.insDirOf = function (P, R) {
      ap(P);
      this.jQ.insDirOf(P, R.jQ);
      this.withDirInsertAt(P, R.parent, R[P], R);
      this.parent.jQ.addClass('mq-hasCursor');
      return this;
    };
    L.insLeftOf = function (P) {
      return this.insDirOf(ak, P);
    };
    L.insRightOf = function (P) {
      return this.insDirOf(af, P);
    };
    L.insAtDirEnd = function (P, R) {
      ap(P);
      this.jQ.insAtDirEnd(P, R.jQ);
      this.withDirInsertAt(P, R, 0, R.ends[P]);
      R.focus();
      return this;
    };
    L.insAtLeftEnd = function (P) {
      return this.insAtDirEnd(ak, P);
    };
    L.insAtRightEnd = function (P) {
      return this.insAtDirEnd(af, P);
    };
    L.jumpUpDown = function (a1, a0) {
      var P = this;
      P.upDownCache[a1.id] = h.copy(P);
      var aZ = P.upDownCache[a0.id];
      if (aZ) {
        aZ[af] ? P.insLeftOf(aZ[af]) : P.insAtRightEnd(aZ.parent);
      } else {
        var R = P.offset().left;
        a0.seek(R, P);
      }
    };
    L.offset = function () {
      var P = this,
        R = P.jQ.removeClass('mq-cursor').offset();
      P.jQ.addClass('mq-cursor');
      return R;
    };
    L.unwrapGramp = function () {
      var aZ = this.parent.parent;
      var P = aZ.parent;
      var a0 = aZ[af];
      var a1 = this;
      var R = aZ[ak];
      aZ.disown().eachChild(function (a2) {
        if (a2.isEmpty()) {
          return;
        }
        a2.children()
          .adopt(P, R, a0)
          .each(function (a3) {
            a3.jQ.insertBefore(aZ.jQ.first());
          });
        R = a2.ends[af];
      });
      if (!this[af]) {
        if (this[ak]) {
          this[af] = this[ak][af];
        } else {
          while (!this[af]) {
            this.parent = this.parent[af];
            if (this.parent) {
              this[af] = this.parent.ends[ak];
            } else {
              this[af] = aZ[af];
              this.parent = P;
              break;
            }
          }
        }
      }
      if (this[af]) {
        this.insLeftOf(this[af]);
      } else {
        this.insAtRightEnd(P);
      }
      aZ.jQ.remove();
      if (aZ[ak].siblingDeleted) {
        aZ[ak].siblingDeleted(a1.options, af);
      }
      if (aZ[af].siblingDeleted) {
        aZ[af].siblingDeleted(a1.options, ak);
      }
    };
    L.startSelection = function () {
      var P = (this.anticursor = h.copy(this));
      var aZ = (P.ancestors = {});
      for (var R = P; R.parent; R = R.parent) {
        aZ[R.parent.id] = R;
      }
    };
    L.endSelection = function () {
      delete this.anticursor;
    };
    L.select = function () {
      var R = this.anticursor;
      if (this[ak] === R[ak] && this.parent === R.parent) {
        return false;
      }
      for (var a0 = this; a0.parent; a0 = a0.parent) {
        if (a0.parent.id in R.ancestors) {
          var a4 = a0.parent;
          break;
        }
      }
      aW('cursor and anticursor in the same tree', a4);
      var P = R.ancestors[a4.id];
      var a1,
        a3,
        aZ = af;
      if (a0[ak] !== P) {
        for (var a2 = a0; a2; a2 = a2[af]) {
          if (a2[af] === P[af]) {
            aZ = ak;
            a1 = a0;
            a3 = P;
            break;
          }
        }
      }
      if (aZ === af) {
        a1 = P;
        a3 = a0;
      }
      if (a1 instanceof h) {
        a1 = a1[af];
      }
      if (a3 instanceof h) {
        a3 = a3[ak];
      }
      this.hide().selection = a4.selectChildren(a1, a3);
      this.insDirOf(aZ, this.selection.ends[aZ]);
      this.selectionChanged();
      return true;
    };
    L.clearSelection = function () {
      if (this.selection) {
        this.selection.clear();
        delete this.selection;
        this.selectionChanged();
      }
      return this;
    };
    L.deleteSelection = function () {
      if (!this.selection) {
        return;
      }
      this[ak] = this.selection.ends[ak][ak];
      this[af] = this.selection.ends[af][af];
      this.selection.remove();
      this.selectionChanged();
      delete this.selection;
    };
    L.replaceSelection = function () {
      var P = this.selection;
      if (P) {
        this[ak] = P.ends[ak][ak];
        this[af] = P.ends[af][af];
        delete this.selection;
      }
      return P;
    };
  });
  var aU = ah(A, function (P, L) {
    P.init = function () {
      L.init.apply(this, arguments);
      this.jQ = this.jQ.wrapAll('<span class="mq-selection"></span>').parent();
    };
    P.adopt = function () {
      this.jQ.replaceWith((this.jQ = this.jQ.children()));
      return L.adopt.apply(this, arguments);
    };
    P.clear = function () {
      this.jQ.replaceWith(this.jQ[0].childNodes);
      return this;
    };
    P.join = function (R) {
      return this.fold('', function (aZ, a0) {
        return aZ + a0[R]();
      });
    };
  });
  var M = ah(function (L) {
    L.init = function (aZ, R, a0) {
      this.id = aZ.id;
      this.data = {};
      this.root = aZ;
      this.container = R;
      this.options = a0;
      aZ.controller = this;
      this.cursor = aZ.cursor = z(aZ, a0);
    };
    L.handle = function (a0, aZ) {
      var R = this.options.handlers;
      if (R && R.fns[a0]) {
        var a1 = R.APIClasses[this.KIND_OF_MQ](this);
        if (aZ === ak || aZ === af) {
          R.fns[a0](aZ, a1);
        } else {
          R.fns[a0](a1);
        }
      }
    };
    var P = [];
    this.onNotify = function (R) {
      P.push(R);
    };
    L.notify = function () {
      for (var R = 0; R < P.length; R += 1) {
        P[R].apply(this.cursor, arguments);
      }
      return this;
    };
  });
  var ai = {},
    F = ah(),
    aT = {},
    aS = ah(),
    S = {};
  function r() {
    if (window.console) {
      console.warn(
        'You are using the MathQuill API without specifying an interface version, which will fail in v1.0.0. You can fix this easily by doing this before doing anything else:\n\n    MathQuill = MathQuill.getInterface(1);\n    // now MathQuill.MathField() works like it used to\n\nSee also the "`dev` branch (2014\u20132015) \u2192 v0.10.0 Migration Guide" at\n  https://github.com/mathquill/mathquill/wiki/%60dev%60-branch-(2014%E2%80%932015)-%E2%86%92-v0.10.0-Migration-Guide'
      );
    }
  }
  function D(L) {
    r();
    return s(L);
  }
  D.prototype = aS.p;
  D.interfaceVersion = function (L) {
    if (L !== 1) {
      throw 'Only interface version 1 supported. You specified: ' + L;
    }
    r = function () {
      if (window.console) {
        console.warn(
          'You called MathQuill.interfaceVersion(1); to specify the interface version, which will fail in v1.0.0. You can fix this easily by doing this before doing anything else:\n\n    MathQuill = MathQuill.getInterface(1);\n    // now MathQuill.MathField() works like it used to\n\nSee also the "`dev` branch (2014\u20132015) \u2192 v0.10.0 Migration Guide" at\n  https://github.com/mathquill/mathquill/wiki/%60dev%60-branch-(2014%E2%80%932015)-%E2%86%92-v0.10.0-Migration-Guide'
        );
      }
    };
    r();
    return D;
  };
  D.getInterface = aV;
  var J = (aV.MIN = 1),
    ae = (aV.MAX = 2);
  function aV(L) {
    if (!(J <= L && L <= ae)) {
      throw (
        'Only interface versions between ' +
        J +
        ' and ' +
        ae +
        ' supported. You specified: ' +
        L
      );
    }
    function a0(a4) {
      if (!a4 || !a4.nodeType) {
        return null;
      }
      var a3 = aD(a4).children('.mq-root-block').attr(aG);
      var a2 = a3 && aB.byId[a3].controller;
      return a2 ? aZ[a2.KIND_OF_MQ](a2) : null;
    }
    var aZ = {};
    a0.L = ak;
    a0.R = af;
    function P(a2, a6) {
      if (a6 && a6.handlers) {
        a6.handlers = { fns: a6.handlers, APIClasses: aZ };
      }
      for (var a3 in a6) {
        if (a6.hasOwnProperty(a3)) {
          var a5 = a6[a3],
            a4 = aT[a3];
          a2[a3] = a4 ? a4(a5) : a5;
        }
      }
    }
    a0.config = function (a2) {
      P(F.p, a2);
      return this;
    };
    a0.registerEmbed = function (a3, a2) {
      if (!/^[a-z][a-z0-9]*$/i.test(a3)) {
        throw 'Embed name must start with letter and be only letters and digits';
      }
      S[a3] = a2;
    };
    var a1 = (aZ.AbstractMathQuill = ah(aS, function (a2) {
      a2.init = function (a3) {
        this.__controller = a3;
        this.__options = a3.options;
        this.id = a3.id;
        this.data = a3.data;
      };
      a2.__mathquillify = function (a7) {
        var a4 = this.__controller,
          a3 = a4.root,
          a5 = a4.container;
        a4.createTextarea();
        var a6 = a5.addClass(a7).contents().detach();
        a3.jQ = aD('<span class="mq-root-block"/>')
          .attr(aG, a3.id)
          .appendTo(a5);
        this.latex(a6.text());
        this.revert = function () {
          return a5
            .empty()
            .unbind('.mathquill')
            .removeClass('mq-editable-field mq-math-mode mq-text-mode')
            .append(a6);
        };
      };
      a2.config = function (a3) {
        P(this.__options, a3);
        return this;
      };
      a2.el = function () {
        return this.__controller.container[0];
      };
      a2.text = function () {
        return this.__controller.exportText();
      };
      a2.latex = function (a3) {
        if (arguments.length > 0) {
          this.__controller.renderLatexMath(a3);
          if (this.__controller.blurred) {
            this.__controller.cursor.hide().parent.blur();
          }
          return this;
        }
        return this.__controller.exportLatex();
      };
      a2.html = function () {
        return this.__controller.root.jQ
          .html()
          .replace(/ mathquill-(?:command|block)-id="?\d+"?/g, '')
          .replace(/<span class="?mq-cursor( mq-blink)?"?>.?<\/span>/i, '')
          .replace(/ mq-hasCursor|mq-hasCursor ?/, '')
          .replace(/ class=(""|(?= |>))/g, '');
      };
      a2.reflow = function () {
        this.__controller.root.postOrder('reflow');
        return this;
      };
    }));
    a0.prototype = a1.prototype;
    aZ.EditableField = ah(a1, function (a3, a2) {
      a3.__mathquillify = function () {
        a2.__mathquillify.apply(this, arguments);
        this.__controller.editable = true;
        this.__controller.delegateMouseEvents();
        this.__controller.editablesTextareaEvents();
        return this;
      };
      a3.focus = function () {
        this.__controller.textarea.focus();
        return this;
      };
      a3.blur = function () {
        this.__controller.textarea.blur();
        return this;
      };
      a3.write = function (a4) {
        this.__controller.writeLatex(a4);
        this.__controller.scrollHoriz();
        if (this.__controller.blurred) {
          this.__controller.cursor.hide().parent.blur();
        }
        return this;
      };
      a3.cmd = function (a6) {
        var a5 = this.__controller.notify(),
          a7 = a5.cursor;
        if (/^\\[a-z]+$/i.test(a6)) {
          a6 = a6.slice(1);
          var a4 = ay[a6];
          if (a4) {
            a6 = a4(a6);
            if (a7.selection) {
              a6.replaces(a7.replaceSelection());
            }
            a6.createLeftOf(a7.show());
            this.__controller.scrollHoriz();
          } else {
          }
        } else {
          a7.parent.write(a7, a6);
        }
        if (a5.blurred) {
          a7.hide().parent.blur();
        }
        return this;
      };
      a3.select = function () {
        var a4 = this.__controller;
        a4.notify('move').cursor.insAtRightEnd(a4.root);
        while (a4.cursor[ak]) {
          a4.selectLeft();
        }
        return this;
      };
      a3.clearSelection = function () {
        this.__controller.cursor.clearSelection();
        return this;
      };
      a3.moveToDirEnd = function (a4) {
        this.__controller
          .notify('move')
          .cursor.insAtDirEnd(a4, this.__controller.root);
        return this;
      };
      a3.moveToLeftEnd = function () {
        return this.moveToDirEnd(ak);
      };
      a3.moveToRightEnd = function () {
        return this.moveToDirEnd(af);
      };
      a3.keystroke = function (a5) {
        var a5 = a5.replace(/^\s+|\s+$/g, '').split(/\s+/);
        for (var a4 = 0; a4 < a5.length; a4 += 1) {
          this.__controller.keystroke(a5[a4], { preventDefault: az });
        }
        return this;
      };
      a3.typedText = function (a5) {
        for (var a4 = 0; a4 < a5.length; a4 += 1) {
          this.__controller.typedText(a5.charAt(a4));
        }
        return this;
      };
      a3.dropEmbedded = function (a8, a5, a4) {
        var a9 = a8 - aD(window).scrollLeft();
        var a7 = a5 - aD(window).scrollTop();
        var a6 = document.elementFromPoint(a9, a7);
        this.__controller.seek(aD(a6), a8, a5);
        var ba = aF().setOptions(a4);
        ba.createLeftOf(this.__controller.cursor);
      };
    });
    a0.EditableField = function () {
      throw "wtf don't call me, I'm 'abstract'";
    };
    a0.EditableField.prototype = aZ.EditableField.prototype;
    for (var R in ai) {
      (function (a3, a2) {
        var a4 = (aZ[a3] = a2(aZ));
        a0[a3] = function (a7, a8) {
          var a6 = a0(a7);
          if (a6 instanceof a4 || !a7 || !a7.nodeType) {
            return a6;
          }
          var a5 = M(a4.RootBlock(), aD(a7), F());
          a5.KIND_OF_MQ = a3;
          return a4(a5).__mathquillify(a8, L);
        };
        a0[a3].prototype = a4.prototype;
      })(R, ai[R]);
    }
    return a0;
  }
  D.noConflict = function () {
    window.MathQuill = U;
    return D;
  };
  var U = window.MathQuill;
  window.MathQuill = D;
  function aR(L) {
    var R = 'moveOutOf deleteOutOf selectOutOf upOutOf downOutOf'.split(' ');
    for (var P = 0; P < R.length; P += 1) {
      (function (aZ) {
        L[aZ] = function (a0) {
          this.controller.handle(aZ, a0);
        };
      })(R[P]);
    }
    L.reflow = function () {
      this.controller.handle('reflow');
      this.controller.handle('edited');
      this.controller.handle('edit');
    };
  }
  var ad = ah(function (bb, L, a1) {
    function a2(be, bd) {
      if (be) {
        be = "'" + be + "'";
      } else {
        be = 'EOF';
      }
      throw 'Parse Error: ' + bd + ' at ' + be;
    }
    bb.init = function (bd) {
      this._ = bd;
    };
    bb.parse = function (be) {
      return this.skip(bc)._('' + be, bd, a2);
      function bd(bg, bf) {
        return bf;
      }
    };
    bb.or = function (be) {
      aW('or is passed a parser', be instanceof a1);
      var bd = this;
      return a1(function (bi, bh, bg) {
        return bd._(bi, bh, bf);
        function bf(bj) {
          return be._(bi, bh, bg);
        }
      });
    };
    bb.then = function (be) {
      var bd = this;
      return a1(function (bi, bh, bf) {
        return bd._(bi, bg, bf);
        function bg(bl, bj) {
          var bk = be instanceof a1 ? be : be(bj);
          aW('a parser is returned', bk instanceof a1);
          return bk._(bl, bh, bf);
        }
      });
    };
    bb.many = function () {
      var bd = this;
      return a1(function (bj, bi, bg) {
        var bf = [];
        while (bd._(bj, bh, be)) {}
        return bi(bj, bf);
        function bh(bl, bk) {
          bj = bl;
          bf.push(bk);
          return true;
        }
        function be() {
          return false;
        }
      });
    };
    bb.times = function (bf, bd) {
      if (arguments.length < 2) {
        bd = bf;
      }
      var be = this;
      return a1(function (bn, bm, bg) {
        var bi = [];
        var bp = true;
        var bh;
        for (var bk = 0; bk < bf; bk += 1) {
          bp = be._(bn, bo, bj);
          if (!bp) {
            return bg(bn, bh);
          }
        }
        for (; bk < bd && bp; bk += 1) {
          bp = be._(bn, bo, bl);
        }
        return bm(bn, bi);
        function bo(br, bq) {
          bi.push(bq);
          bn = br;
          return true;
        }
        function bj(br, bq) {
          bh = bq;
          bn = br;
          return false;
        }
        function bl(br, bq) {
          return false;
        }
      });
    };
    bb.result = function (bd) {
      return this.then(a3(bd));
    };
    bb.atMost = function (bd) {
      return this.times(0, bd);
    };
    bb.atLeast = function (be) {
      var bd = this;
      return bd.times(be).then(function (bf) {
        return bd.many().map(function (bg) {
          return bf.concat(bg);
        });
      });
    };
    bb.map = function (bd) {
      return this.then(function (be) {
        return a3(bd(be));
      });
    };
    bb.skip = function (bd) {
      return this.then(function (be) {
        return bd.result(be);
      });
    };
    var a4 = (this.string = function (bf) {
      var bd = bf.length;
      var be = "expected '" + bf + "'";
      return a1(function (bj, bi, bh) {
        var bg = bj.slice(0, bd);
        if (bg === bf) {
          return bi(bj.slice(bd), bg);
        } else {
          return bh(bj, be);
        }
      });
    });
    var a9 = (this.regex = function (bd) {
      aW('regexp parser is anchored', bd.toString().charAt(1) === '^');
      var be = 'expected ' + bd;
      return a1(function (bj, bi, bh) {
        var bg = bd.exec(bj);
        if (bg) {
          var bf = bg[0];
          return bi(bj.slice(bf.length), bf);
        } else {
          return bh(bj, be);
        }
      });
    });
    var a3 = (a1.succeed = function (bd) {
      return a1(function (bf, be) {
        return be(bf, bd);
      });
    });
    var a0 = (a1.fail = function (bd) {
      return a1(function (bg, be, bf) {
        return bf(bg, bd);
      });
    });
    var aZ = (a1.letter = a9(/^[a-z]/i));
    var a6 = (a1.letters = a9(/^[a-z]*/i));
    var a8 = (a1.digit = a9(/^[0-9]/));
    var R = (a1.digits = a9(/^[0-9]*/));
    var P = (a1.whitespace = a9(/^\s+/));
    var a7 = (a1.optWhitespace = a9(/^\s*/));
    var a5 = (a1.any = a1(function (bf, be, bd) {
      if (!bf) {
        return bd(bf, 'expected any character');
      }
      return be(bf.slice(1), bf.charAt(0));
    }));
    var ba = (a1.all = a1(function (bf, be, bd) {
      return be('', bf);
    }));
    var bc = (a1.eof = a1(function (bf, be, bd) {
      if (bf) {
        return bd(bf, 'expected EOF');
      }
      return be(bf, bf);
    }));
  });
  var an = (function () {
    var L = {
      8: 'Backspace',
      9: 'Tab',
      10: 'Enter',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      20: 'CapsLock',
      27: 'Esc',
      32: 'Spacebar',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'Left',
      38: 'Up',
      39: 'Right',
      40: 'Down',
      45: 'Insert',
      46: 'Del',
      144: 'NumLock',
    };
    function R(a0) {
      var a3 = a0.which || a0.keyCode;
      var aZ = L[a3];
      var a2;
      var a1 = [];
      if (a0.ctrlKey) {
        a1.push('Ctrl');
      }
      if (a0.originalEvent && a0.originalEvent.metaKey) {
        a1.push('Meta');
      }
      if (a0.altKey) {
        a1.push('Alt');
      }
      if (a0.shiftKey) {
        a1.push('Shift');
      }
      a2 = aZ || String.fromCharCode(a3);
      if (!a1.length && !aZ) {
        return a2;
      }
      a1.push(a2);
      return a1.join('-');
    }
    return function P(a0, ba) {
      var a8 = null;
      var a3 = null;
      var a7 = a(a0);
      var bh = a(ba.container || a7);
      var a4 = az,
        a2;
      function bf(bi) {
        a4 = bi;
        clearTimeout(a2);
        a2 = setTimeout(bi);
      }
      bh.bind('keydown keypress input keyup focusout paste', function (bi) {
        a4(bi);
      });
      function a9(bi) {
        a4();
        a4 = az;
        clearTimeout(a2);
        a7.val(bi);
        if (bi && a7[0].select) {
          a7[0].select();
        }
        be = !!bi;
      }
      var be = false;
      function bd() {
        var bi = a7[0];
        if (!('selectionStart' in bi)) {
          return false;
        }
        return bi.selectionStart !== bi.selectionEnd;
      }
      function a6() {
        ba.keystroke(R(a8), a8);
      }
      function bg(bi) {
        a8 = bi;
        a3 = null;
        if (be) {
          bf(function (bj) {
            if (!(bj && bj.type === 'focusout') && a7[0].select) {
              a7[0].select();
            }
            a4 = az;
            clearTimeout(a2);
          });
        }
        a6();
      }
      function a1(bi) {
        if (a8 && a3) {
          a6();
        }
        a3 = bi;
        bf(bc);
      }
      function bc() {
        if (bd()) {
          return;
        }
        var bi = a7.val();
        if (bi.length === 1) {
          a7.val('');
          ba.typedText(bi);
        } else {
          if (bi && a7[0].select) {
            a7[0].select();
          }
        }
      }
      function a5() {
        a8 = a3 = null;
      }
      function aZ(bi) {
        a7.focus();
        bf(bb);
      }
      function bb() {
        var bi = a7.val();
        a7.val('');
        if (bi) {
          ba.paste(bi);
        }
      }
      bh.bind({ keydown: bg, keypress: a1, focusout: a5, paste: aZ });
      return { select: a9 };
    };
  })();
  M.open(function (P, L) {
    P.exportText = function () {
      return this.root.foldChildren('', function (R, aZ) {
        return R + aZ.text();
      });
    };
  });
  M.open(function (L) {
    L.focusBlurEvents = function () {
      var R = this,
        P = R.root,
        a1 = R.cursor;
      var a2;
      R.textarea
        .focus(function () {
          R.blurred = false;
          clearTimeout(a2);
          R.container.addClass('mq-focused');
          if (!a1.parent) {
            a1.insAtRightEnd(P);
          }
          if (a1.selection) {
            a1.selection.jQ.removeClass('mq-blur');
            R.selectionChanged();
          } else {
            a1.show();
          }
        })
        .blur(function () {
          R.blurred = true;
          a2 = setTimeout(function () {
            P.postOrder('intentionalBlur');
            a1.clearSelection().endSelection();
            a0();
          });
          aD(window).on('blur', aZ);
        });
      function aZ() {
        clearTimeout(a2);
        if (a1.selection) {
          a1.selection.jQ.addClass('mq-blur');
        }
        a0();
      }
      function a0() {
        a1.hide().parent.blur();
        R.container.removeClass('mq-focused');
        aD(window).off('blur', aZ);
      }
      R.blurred = true;
      a1.hide().parent.blur();
    };
  });
  M.open(function (L) {
    L.keystroke = function (R, P) {
      this.cursor.parent.keystroke(R, P, this);
    };
  });
  aB.open(function (L) {
    L.keystroke = function (R, aZ, P) {
      var a0 = P.cursor;
      switch (R) {
        case 'Ctrl-Shift-Backspace':
        case 'Ctrl-Backspace':
          P.ctrlDeleteDir(ak);
          break;
        case 'Shift-Backspace':
        case 'Backspace':
          P.backspace();
          break;
        case 'Esc':
        case 'Tab':
          P.escapeDir(af, R, aZ);
          return;
        case 'Shift-Tab':
        case 'Shift-Esc':
          P.escapeDir(ak, R, aZ);
          return;
        case 'End':
          P.notify('move').cursor.insAtRightEnd(a0.parent);
          break;
        case 'Ctrl-End':
          P.notify('move').cursor.insAtRightEnd(P.root);
          break;
        case 'Shift-End':
          while (a0[af]) {
            P.selectRight();
          }
          break;
        case 'Ctrl-Shift-End':
          while (a0[af] || a0.parent !== P.root) {
            P.selectRight();
          }
          break;
        case 'Home':
          P.notify('move').cursor.insAtLeftEnd(a0.parent);
          break;
        case 'Ctrl-Home':
          P.notify('move').cursor.insAtLeftEnd(P.root);
          break;
        case 'Shift-Home':
          while (a0[ak]) {
            P.selectLeft();
          }
          break;
        case 'Ctrl-Shift-Home':
          while (a0[ak] || a0.parent !== P.root) {
            P.selectLeft();
          }
          break;
        case 'Left':
          P.moveLeft();
          break;
        case 'Shift-Left':
          P.selectLeft();
          break;
        case 'Ctrl-Left':
          break;
        case 'Right':
          P.moveRight();
          break;
        case 'Shift-Right':
          P.selectRight();
          break;
        case 'Ctrl-Right':
          break;
        case 'Up':
          P.moveUp();
          break;
        case 'Down':
          P.moveDown();
          break;
        case 'Shift-Up':
          if (a0[ak]) {
            while (a0[ak]) {
              P.selectLeft();
            }
          } else {
            P.selectLeft();
          }
        case 'Shift-Down':
          if (a0[af]) {
            while (a0[af]) {
              P.selectRight();
            }
          } else {
            P.selectRight();
          }
        case 'Ctrl-Up':
          break;
        case 'Ctrl-Down':
          break;
        case 'Ctrl-Shift-Del':
        case 'Ctrl-Del':
          P.ctrlDeleteDir(af);
          break;
        case 'Shift-Del':
        case 'Del':
          P.deleteForward();
          break;
        case 'Meta-A':
        case 'Ctrl-A':
          P.notify('move').cursor.insAtRightEnd(P.root);
          while (a0[ak]) {
            P.selectLeft();
          }
          break;
        default:
          return;
      }
      aZ.preventDefault();
      P.scrollHoriz();
    };
    L.moveOutOf = L.moveTowards = L.deleteOutOf = L.deleteTowards = L.unselectInto = L.selectOutOf = L.selectTowards = function () {
      aW('overridden or never called on this node');
    };
  });
  M.open(function (P) {
    this.onNotify(function (R) {
      if (R === 'move' || R === 'upDown') {
        this.show().clearSelection();
      }
    });
    P.escapeDir = function (R, aZ, a0) {
      ap(R);
      var a1 = this.cursor;
      if (a1.parent !== this.root) {
        a0.preventDefault();
      }
      if (a1.parent === this.root) {
        return;
      }
      a1.parent.moveOutOf(R, a1);
      return this.notify('move');
    };
    aT.leftRightIntoCmdGoes = function (R) {
      if (R && R !== 'up' && R !== 'down') {
        throw (
          '"up" or "down" required for leftRightIntoCmdGoes option, got "' +
          R +
          '"'
        );
      }
      return R;
    };
    P.moveDir = function (R) {
      ap(R);
      var a0 = this.cursor,
        aZ = a0.options.leftRightIntoCmdGoes;
      if (a0.selection) {
        a0.insDirOf(R, a0.selection.ends[R]);
      } else {
        if (a0[R]) {
          a0[R].moveTowards(R, a0, aZ);
        } else {
          a0.parent.moveOutOf(R, a0, aZ);
        }
      }
      return this.notify('move');
    };
    P.moveLeft = function () {
      return this.moveDir(ak);
    };
    P.moveRight = function () {
      return this.moveDir(af);
    };
    P.moveUp = function () {
      return L(this, 'up');
    };
    P.moveDown = function () {
      return L(this, 'down');
    };
    function L(R, aZ) {
      var a2 = R.notify('upDown').cursor;
      var a1 = aZ + 'Into',
        a0 = aZ + 'OutOf';
      if (a2[af][a1]) {
        a2.insAtLeftEnd(a2[af][a1]);
      } else {
        if (a2[ak][a1]) {
          a2.insAtRightEnd(a2[ak][a1]);
        } else {
          a2.parent.bubble(function (a3) {
            var a4 = a3[a0];
            if (a4) {
              if (typeof a4 === 'function') {
                a4 = a3[a0](a2);
              }
              if (a4 instanceof aB) {
                a2.jumpUpDown(a3, a4);
              }
              if (a4 !== true) {
                return false;
              }
            }
          });
        }
      }
      return R;
    }
    this.onNotify(function (R) {
      if (R !== 'upDown') {
        this.upDownCache = {};
      }
    });
    this.onNotify(function (R) {
      if (R === 'edit') {
        this.show().deleteSelection();
      }
    });
    P.deleteDir = function (aZ) {
      ap(aZ);
      var a0 = this.cursor;
      var R = a0.selection;
      this.notify('edit');
      if (!R) {
        if (a0[aZ]) {
          a0[aZ].deleteTowards(aZ, a0);
        } else {
          a0.parent.deleteOutOf(aZ, a0);
        }
      }
      if (a0[ak].siblingDeleted) {
        a0[ak].siblingDeleted(a0.options, af);
      }
      if (a0[af].siblingDeleted) {
        a0[af].siblingDeleted(a0.options, ak);
      }
      a0.parent.bubble('reflow');
      return this;
    };
    P.ctrlDeleteDir = function (R) {
      ap(R);
      var aZ = this.cursor;
      if (!aZ[ak] || aZ.selection) {
        return ctrlr.deleteDir();
      }
      this.notify('edit');
      A(aZ.parent.ends[ak], aZ[ak]).remove();
      aZ.insAtDirEnd(ak, aZ.parent);
      if (aZ[ak].siblingDeleted) {
        aZ[ak].siblingDeleted(aZ.options, af);
      }
      if (aZ[af].siblingDeleted) {
        aZ[af].siblingDeleted(aZ.options, ak);
      }
      aZ.parent.bubble('reflow');
      return this;
    };
    P.backspace = function () {
      return this.deleteDir(ak);
    };
    P.deleteForward = function () {
      return this.deleteDir(af);
    };
    this.onNotify(function (R) {
      if (R !== 'select') {
        this.endSelection();
      }
    });
    P.selectDir = function (R) {
      var a1 = this.notify('select').cursor,
        aZ = a1.selection;
      ap(R);
      if (!a1.anticursor) {
        a1.startSelection();
      }
      var a0 = a1[R];
      if (a0) {
        if (aZ && aZ.ends[R] === a0 && a1.anticursor[-R] !== a0) {
          a0.unselectInto(R, a1);
        } else {
          a0.selectTowards(R, a1);
        }
      } else {
        a1.parent.selectOutOf(R, a1);
      }
      a1.clearSelection();
      a1.select() || a1.show();
    };
    P.selectLeft = function () {
      return this.selectDir(ak);
    };
    P.selectRight = function () {
      return this.selectDir(af);
    };
  });
  var aE = (function () {
    function bb(be) {
      var bf = o();
      be.adopt(bf, 0, 0);
      return bf;
    }
    function a4(bg) {
      var bf = bg[0] || o();
      for (var be = 1; be < bg.length; be += 1) {
        bg[be].children().adopt(bf, bf.ends[af], 0);
      }
      return bf;
    }
    var L = ad.string;
    var aZ = ad.regex;
    var bd = ad.letter;
    var a5 = ad.any;
    var ba = ad.optWhitespace;
    var bc = ad.succeed;
    var a3 = ad.fail;
    var a6 = bd.map(function (be) {
      return t(be);
    });
    var a7 = aZ(/^[^${}\\_^]/).map(function (be) {
      return ax(be);
    });
    var P = aZ(/^[^\\a-eg-zA-Z]/)
      .or(
        L('\\').then(
          aZ(/^[a-z]+/i)
            .or(aZ(/^\s+/).result(' '))
            .or(a5)
        )
      )
      .then(function (bf) {
        var be = ay[bf];
        if (be) {
          return be(bf).parser();
        } else {
          return a3('unknown command: \\' + bf);
        }
      });
    var a0 = P.or(a6).or(a7);
    var a2 = L('{')
      .then(function () {
        return a9;
      })
      .skip(L('}'));
    var a1 = ba.then(a2.or(a0.map(bb)));
    var a9 = a1.many().map(a4).skip(ba);
    var a8 = L('[')
      .then(
        a1
          .then(function (be) {
            return be.join('latex') !== ']' ? bc(be) : a3();
          })
          .many()
          .map(a4)
          .skip(ba)
      )
      .skip(L(']'));
    var R = a9;
    R.block = a1;
    R.optBlock = a8;
    return R;
  })();
  M.open(function (P, L) {
    P.exportLatex = function () {
      return this.root.latex().replace(/(\\[a-z]+) (?![a-z])/gi, '$1');
    };
    P.writeLatex = function (a0) {
      var a3 = this.notify('edit').cursor;
      var aZ = ad.all;
      var R = ad.eof;
      var a2 = aE.skip(R).or(aZ.result(false)).parse(a0);
      if (a2 && !a2.isEmpty()) {
        a2.children().adopt(a3.parent, a3[ak], a3[af]);
        var a1 = a2.jQize();
        a1.insertBefore(a3.jQ);
        a3[ak] = a2.ends[af];
        a2.finalizeInsert(a3.options, a3);
        if (a2.ends[af][af].siblingCreated) {
          a2.ends[af][af].siblingCreated(a3.options, ak);
        }
        if (a2.ends[ak][ak].siblingCreated) {
          a2.ends[ak][ak].siblingCreated(a3.options, af);
        }
        a3.parent.bubble('reflow');
      }
      return this;
    };
    P.renderLatexMath = function (a2) {
      var aZ = this.root,
        a5 = this.cursor;
      var a1 = ad.all;
      var R = ad.eof;
      var a4 = aE.skip(R).or(a1.result(false)).parse(a2);
      aZ.eachChild('postOrder', 'dispose');
      aZ.ends[ak] = aZ.ends[af] = 0;
      if (a4) {
        a4.children().adopt(aZ, 0, 0);
      }
      var a3 = aZ.jQ;
      if (a4) {
        var a0 = a4.join('html');
        a3.html(a0);
        aZ.jQize(a3.children());
        aZ.finalizeInsert(a5.options);
      } else {
        a3.empty();
      }
      delete a5.selection;
      a5.insAtRightEnd(aZ);
    };
    P.renderLatexText = function (a1) {
      var a5 = this.root,
        a9 = this.cursor;
      a5.jQ.children().slice(1).remove();
      a5.eachChild('postOrder', 'dispose');
      a5.ends[ak] = a5.ends[af] = 0;
      delete a9.selection;
      a9.show().insAtRightEnd(a5);
      var a6 = ad.regex;
      var a3 = ad.string;
      var ba = ad.eof;
      var a8 = ad.all;
      var a4 = a3('$')
        .then(aE)
        .skip(a3('$').or(ba))
        .map(function (bd) {
          var bc = aw(a9);
          bc.createBlocks();
          var bb = bc.ends[ak];
          bd.children().adopt(bb, 0, 0);
          return bc;
        });
      var a7 = a3('\\$').result('$');
      var aZ = a7.or(a6(/^[^$]/)).map(ax);
      var R = a4.or(aZ).many();
      var a0 = R.skip(ba).or(a8.result(false)).parse(a1);
      if (a0) {
        for (var a2 = 0; a2 < a0.length; a2 += 1) {
          a0[a2].adopt(a5, a5.ends[af], 0);
        }
        a5.jQize().appendTo(a5.jQ);
        a5.finalizeInsert(a9.options);
      }
    };
  });
  M.open(function (L) {
    L.delegateMouseEvents = function () {
      var P = this.root.jQ;
      this.container.bind('mousedown.mathquill', function (a4) {
        var R = aD(a4.target).closest('.mq-root-block');
        var a6 = aB.byId[R.attr(aG) || P.attr(aG)];
        var a1 = a6.controller,
          a8 = a1.cursor,
          aZ = a8.blink;
        var a9 = a1.textareaSpan,
          a7 = a1.textarea;
        var a3;
        function a2(ba) {
          a3 = aD(ba.target);
        }
        function a5(ba) {
          if (!a8.anticursor) {
            a8.startSelection();
          }
          a1.seek(a3, ba.pageX, ba.pageY).cursor.select();
          a3 = B;
        }
        function a0(ba) {
          a8.blink = aZ;
          if (!a8.selection) {
            if (a1.editable) {
              a8.show();
            } else {
              a9.detach();
            }
          }
          R.unbind('mousemove', a2);
          aD(ba.target.ownerDocument)
            .unbind('mousemove', a5)
            .unbind('mouseup', a0);
        }
        if (a1.blurred) {
          if (!a1.editable) {
            R.prepend(a9);
          }
          a7.focus();
        }
        a4.preventDefault();
        a4.target.unselectable = true;
        a8.blink = az;
        a1.seek(aD(a4.target), a4.pageX, a4.pageY).cursor.startSelection();
        R.mousemove(a2);
        aD(a4.target.ownerDocument).mousemove(a5).mouseup(a0);
      });
    };
  });
  M.open(function (L) {
    L.seek = function (a1, aZ, P) {
      var a3 = this.notify('select').cursor;
      if (a1) {
        var a2 = a1.attr(aG) || a1.attr(aO);
        if (!a2) {
          var R = a1.parent();
          a2 = R.attr(aG) || R.attr(aO);
        }
      }
      var a0 = a2 ? aB.byId[a2] : this.root;
      aW('nodeId is the id of some Node that exists', a0);
      a3.clearSelection().show();
      a0.seek(aZ, a3);
      this.scrollHoriz();
      return this;
    };
  });
  M.open(function (L) {
    L.scrollHoriz = function () {
      var a4 = this.cursor,
        a1 = a4.selection;
      var a0 = this.root.jQ[0].getBoundingClientRect();
      if (!a1) {
        var R = a4.jQ[0].getBoundingClientRect().left;
        if (R > a0.right - 20) {
          var P = R - (a0.right - 20);
        } else {
          if (R < a0.left + 20) {
            var P = R - (a0.left + 20);
          } else {
            return;
          }
        }
      } else {
        var a2 = a1.jQ[0].getBoundingClientRect();
        var aZ = a2.left - (a0.left + 20);
        var a3 = a2.right - (a0.right - 20);
        if (a1.ends[ak] === a4[af]) {
          if (aZ < 0) {
            var P = aZ;
          } else {
            if (a3 > 0) {
              if (a2.left - a3 < a0.left + 20) {
                var P = aZ;
              } else {
                var P = a3;
              }
            } else {
              return;
            }
          }
        } else {
          if (a3 > 0) {
            var P = a3;
          } else {
            if (aZ < 0) {
              if (a2.right - aZ > a0.right - 20) {
                var P = a3;
              } else {
                var P = aZ;
              }
            } else {
              return;
            }
          }
        }
      }
      this.root.jQ.stop().animate({ scrollLeft: '+=' + P }, 100);
    };
  });
  M.open(function (L) {
    F.p.substituteTextarea = function () {
      return aD(
        '<textarea autocapitalize=off autocomplete=off autocorrect=off spellcheck=false x-palm-disable-ste-all=true />'
      )[0];
    };
    L.createTextarea = function () {
      var aZ = (this.textareaSpan = aD('<span class="mq-textarea"></span>')),
        R = this.options.substituteTextarea();
      if (!R.nodeType) {
        throw 'substituteTextarea() must return a DOM element, got ' + R;
      }
      R = this.textarea = aD(R).appendTo(aZ);
      var P = this;
      P.cursor.selectionChanged = function () {
        P.selectionChanged();
      };
      P.container.bind('copy', function () {
        P.setTextareaSelection();
      });
    };
    L.selectionChanged = function () {
      var P = this;
      aj(P.container[0]);
      if (P.textareaSelectionTimeout === B) {
        P.textareaSelectionTimeout = setTimeout(function () {
          P.setTextareaSelection();
        });
      }
    };
    L.setTextareaSelection = function () {
      this.textareaSelectionTimeout = B;
      var P = '';
      if (this.cursor.selection) {
        P = this.cursor.selection.join('latex');
        if (this.options.statelessClipboard) {
          P = '$' + P + '$';
        }
      }
      this.selectFn(P);
    };
    L.staticMathTextareaEvents = function () {
      var aZ = this,
        R = aZ.root,
        a2 = aZ.cursor,
        P = aZ.textarea,
        a1 = aZ.textareaSpan;
      this.container.prepend(
        '<span class="mq-selectable">$' + aZ.exportLatex() + '$</span>'
      );
      aZ.blurred = true;
      P.bind('cut paste', false)
        .focus(function () {
          aZ.blurred = false;
        })
        .blur(function () {
          if (a2.selection) {
            a2.selection.clear();
          }
          setTimeout(a0);
        });
      function a0() {
        a1.detach();
        aZ.blurred = true;
      }
      aZ.selectFn = function (a3) {
        P.val(a3);
        if (a3) {
          P.select();
        }
      };
    };
    L.editablesTextareaEvents = function () {
      var aZ = this,
        R = aZ.root,
        a2 = aZ.cursor,
        P = aZ.textarea,
        a1 = aZ.textareaSpan;
      var a0 = an(P, this);
      this.selectFn = function (a3) {
        a0.select(a3);
      };
      this.container.prepend(a1).on('cut', function (a3) {
        if (a2.selection) {
          setTimeout(function () {
            aZ.notify('edit');
            a2.parent.bubble('reflow');
          });
        }
      });
      this.focusBlurEvents();
    };
    L.typedText = function (P) {
      if (P === '\n') {
        return this.handle('enter');
      }
      var R = this.notify().cursor;
      R.parent.write(R, P);
      this.scrollHoriz();
    };
    L.paste = function (P) {
      if (this.options.statelessClipboard) {
        if (P.slice(0, 1) === '$' && P.slice(-1) === '$') {
          P = P.slice(1, -1);
        } else {
          P = '\\text{' + P + '}';
        }
      }
      this.writeLatex(P).cursor.show();
    };
  });
  var I = ah(aB, function (P, L) {
    P.finalizeInsert = function (aZ, a0) {
      var R = this;
      R.postOrder('finalizeTree', aZ);
      R.postOrder('contactWeld', a0);
      R.postOrder('blur');
      R.postOrder('reflow');
      if (R[af].siblingCreated) {
        R[af].siblingCreated(aZ, ak);
      }
      if (R[ak].siblingCreated) {
        R[ak].siblingCreated(aZ, af);
      }
      R.bubble('reflow');
    };
  });
  var aK = ah(I, function (P, L) {
    P.init = function (a0, a1, R) {
      var aZ = this;
      L.init.call(aZ);
      if (!aZ.ctrlSeq) {
        aZ.ctrlSeq = a0;
      }
      if (a1) {
        aZ.htmlTemplate = a1;
      }
      if (R) {
        aZ.textTemplate = R;
      }
    };
    P.replaces = function (R) {
      R.disown();
      this.replacedFragment = R;
    };
    P.isEmpty = function () {
      return this.foldChildren(true, function (R, aZ) {
        return R && aZ.isEmpty();
      });
    };
    P.parser = function () {
      var aZ = aE.block;
      var R = this;
      return aZ.times(R.numBlocks()).map(function (a1) {
        R.blocks = a1;
        for (var a0 = 0; a0 < a1.length; a0 += 1) {
          a1[a0].adopt(R, R.ends[af], 0);
        }
        return R;
      });
    };
    P.createLeftOf = function (a0) {
      var R = this;
      var aZ = R.replacedFragment;
      R.createBlocks();
      L.createLeftOf.call(R, a0);
      if (aZ) {
        aZ.adopt(R.ends[ak], 0, 0);
        aZ.jQ.appendTo(R.ends[ak].jQ);
      }
      R.finalizeInsert(a0.options);
      R.placeCursor(a0);
    };
    P.createBlocks = function () {
      var aZ = this,
        a1 = aZ.numBlocks(),
        a0 = (aZ.blocks = Array(a1));
      for (var R = 0; R < a1; R += 1) {
        var a2 = (a0[R] = o());
        a2.adopt(aZ, aZ.ends[af], 0);
      }
    };
    P.placeCursor = function (R) {
      R.insAtRightEnd(
        this.foldChildren(this.ends[ak], function (aZ, a0) {
          return aZ.isEmpty() ? aZ : a0;
        })
      );
    };
    P.moveTowards = function (aZ, a1, a0) {
      var R = a0 && this[a0 + 'Into'];
      a1.insAtDirEnd(-aZ, R || this.ends[-aZ]);
    };
    P.deleteTowards = function (R, aZ) {
      if (this.isEmpty()) {
        aZ[R] = this.remove()[R];
      } else {
        this.moveTowards(R, aZ, null);
      }
    };
    P.selectTowards = function (R, aZ) {
      aZ[-R] = this;
      aZ[R] = this[R];
    };
    P.selectChildren = function () {
      return aU(this, this);
    };
    P.unselectInto = function (R, aZ) {
      aZ.insAtDirEnd(-R, aZ.anticursor.ancestors[this.id]);
    };
    P.seek = function (a1, a3) {
      function a0(a5) {
        var a4 = {};
        a4[ak] = a5.jQ.offset().left;
        a4[af] = a4[ak] + a5.jQ.outerWidth();
        return a4;
      }
      var a2 = this;
      var aZ = a0(a2);
      if (a1 < aZ[ak]) {
        return a3.insLeftOf(a2);
      }
      if (a1 > aZ[af]) {
        return a3.insRightOf(a2);
      }
      var R = aZ[ak];
      a2.eachChild(function (a5) {
        var a4 = a0(a5);
        if (a1 < a4[ak]) {
          if (a1 - R < a4[ak] - a1) {
            if (a5[ak]) {
              a3.insAtRightEnd(a5[ak]);
            } else {
              a3.insLeftOf(a2);
            }
          } else {
            a3.insAtLeftEnd(a5);
          }
          return false;
        } else {
          if (a1 > a4[af]) {
            if (a5[af]) {
              R = a4[af];
            } else {
              if (aZ[af] - a1 < a1 - a4[af]) {
                a3.insRightOf(a2);
              } else {
                a3.insAtRightEnd(a5);
              }
            }
          } else {
            a5.seek(a1, a3);
            return false;
          }
        }
      });
    };
    P.numBlocks = function () {
      var R = this.htmlTemplate.match(/&\d+/g);
      return R ? R.length : 0;
    };
    P.html = function () {
      var a2 = this;
      var a4 = a2.blocks;
      var R = ' mathquill-command-id=' + a2.id;
      var a3 = a2.htmlTemplate.match(/<[^<>]+>|[^<>]+/g);
      aW('no unmatched angle brackets', a3.join('') === this.htmlTemplate);
      for (var a0 = 0, aZ = a3[0]; aZ; a0 += 1, aZ = a3[a0]) {
        if (aZ.slice(-2) === '/>') {
          a3[a0] = aZ.slice(0, -2) + R + '/>';
        } else {
          if (aZ.charAt(0) === '<') {
            aW('not an unmatched top-level close tag', aZ.charAt(1) !== '/');
            a3[a0] = aZ.slice(0, -1) + R + '>';
            var a1 = 1;
            do {
              (a0 += 1), (aZ = a3[a0]);
              aW('no missing close tags', aZ);
              if (aZ.slice(0, 2) === '</') {
                a1 -= 1;
              } else {
                if (aZ.charAt(0) === '<' && aZ.slice(-2) !== '/>') {
                  a1 += 1;
                }
              }
            } while (a1 > 0);
          }
        }
      }
      return a3.join('').replace(/>&(\d+)/g, function (a6, a5) {
        return ' mathquill-block-id=' + a4[a5].id + '>' + a4[a5].join('html');
      });
    };
    P.latex = function () {
      return this.foldChildren(this.ctrlSeq, function (R, aZ) {
        return R + '{' + (aZ.latex() || ' ') + '}';
      });
    };
    P.textTemplate = [''];
    P.text = function () {
      var aZ = this,
        R = 0;
      return aZ.foldChildren(aZ.textTemplate[R], function (a1, a2) {
        R += 1;
        var a0 = a2.text();
        if (
          a1 &&
          aZ.textTemplate[R] === '(' &&
          a0[0] === '(' &&
          a0.slice(-1) === ')'
        ) {
          return a1 + a0.slice(1, -1) + aZ.textTemplate[R];
        }
        return a1 + a2.text() + (aZ.textTemplate[R] || '');
      });
    };
  });
  var H = ah(aK, function (P, L) {
    P.init = function (aZ, R, a0) {
      if (!a0) {
        a0 = aZ && aZ.length > 1 ? aZ.slice(1) : aZ;
      }
      L.init.call(this, aZ, R, [a0]);
    };
    P.parser = function () {
      return ad.succeed(this);
    };
    P.numBlocks = function () {
      return 0;
    };
    P.replaces = function (R) {
      R.remove();
    };
    P.createBlocks = az;
    P.moveTowards = function (R, aZ) {
      aZ.jQ.insDirOf(R, this.jQ);
      aZ[-R] = this;
      aZ[R] = this[R];
    };
    P.deleteTowards = function (R, aZ) {
      aZ[R] = this.remove()[R];
    };
    P.seek = function (R, aZ) {
      if (R - this.jQ.offset().left < this.jQ.outerWidth() / 2) {
        aZ.insLeftOf(this);
      } else {
        aZ.insRightOf(this);
      }
    };
    P.latex = function () {
      return this.ctrlSeq;
    };
    P.text = function () {
      return this.textTemplate;
    };
    P.placeCursor = az;
    P.isEmpty = function () {
      return true;
    };
  });
  var ax = ah(H, function (P, L) {
    P.init = function (aZ, R) {
      L.init.call(this, aZ, '<span>' + (R || aZ) + '</span>');
    };
  });
  var ar = ah(H, function (P, L) {
    P.init = function (aZ, R, a0) {
      L.init.call(
        this,
        aZ,
        '<span class="mq-binary-operator">' + R + '</span>',
        a0
      );
    };
  });
  var o = ah(I, function (P, L) {
    P.join = function (R) {
      return this.foldChildren('', function (aZ, a0) {
        return aZ + a0[R]();
      });
    };
    P.html = function () {
      return this.join('html');
    };
    P.latex = function () {
      return this.join('latex');
    };
    P.text = function () {
      return this.ends[ak] === this.ends[af] && this.ends[ak] !== 0
        ? this.ends[ak].text()
        : this.join('text');
    };
    P.keystroke = function (aZ, a0, R) {
      if (
        R.options.spaceBehavesLikeTab &&
        (aZ === 'Spacebar' || aZ === 'Shift-Spacebar')
      ) {
        a0.preventDefault();
        R.escapeDir(aZ === 'Shift-Spacebar' ? ak : af, aZ, a0);
        return;
      }
      return L.keystroke.apply(this, arguments);
    };
    P.moveOutOf = function (aZ, a1, a0) {
      var R = a0 && this.parent[a0 + 'Into'];
      if (!R && this[aZ]) {
        a1.insAtDirEnd(-aZ, this[aZ]);
      } else {
        a1.insDirOf(aZ, this.parent);
      }
    };
    P.selectOutOf = function (R, aZ) {
      aZ.insDirOf(R, this.parent);
    };
    P.deleteOutOf = function (R, aZ) {
      aZ.unwrapGramp();
    };
    P.seek = function (R, a0) {
      var aZ = this.ends[af];
      if (!aZ || aZ.jQ.offset().left + aZ.jQ.outerWidth() < R) {
        return a0.insAtRightEnd(this);
      }
      if (R < this.ends[ak].jQ.offset().left) {
        return a0.insAtLeftEnd(this);
      }
      while (R < aZ.jQ.offset().left) {
        aZ = aZ[ak];
      }
      return aZ.seek(R, a0);
    };
    P.chToCmd = function (aZ) {
      var R;
      if (aZ.match(/^[a-eg-zA-Z]$/)) {
        return t(aZ);
      } else {
        if (/^\d$/.test(aZ)) {
          return f(aZ);
        } else {
          if ((R = aL[aZ] || ay[aZ])) {
            return R(aZ);
          } else {
            return ax(aZ);
          }
        }
      }
    };
    P.write = function (a0, R) {
      var aZ = this.chToCmd(R);
      if (a0.selection) {
        aZ.replaces(a0.replaceSelection());
      }
      aZ.createLeftOf(a0.show());
    };
    P.focus = function () {
      this.jQ.addClass('mq-hasCursor');
      this.jQ.removeClass('mq-empty');
      return this;
    };
    P.blur = function () {
      this.jQ.removeClass('mq-hasCursor');
      if (this.isEmpty()) {
        this.jQ.addClass('mq-empty');
      }
      return this;
    };
  });
  ai.StaticMath = function (L) {
    return ah(L.AbstractMathQuill, function (R, P) {
      this.RootBlock = o;
      R.__mathquillify = function () {
        P.__mathquillify.call(this, 'mq-math-mode');
        this.__controller.delegateMouseEvents();
        this.__controller.staticMathTextareaEvents();
        return this;
      };
      R.init = function () {
        P.init.apply(this, arguments);
        this.__controller.root.postOrder(
          'registerInnerField',
          (this.innerFields = []),
          L.MathField
        );
      };
      R.latex = function () {
        var aZ = P.latex.apply(this, arguments);
        if (arguments.length > 0) {
          this.__controller.root.postOrder(
            'registerInnerField',
            (this.innerFields = []),
            L.MathField
          );
        }
        return aZ;
      };
    });
  };
  var av = ah(o, aR);
  ai.MathField = function (L) {
    return ah(L.EditableField, function (R, P) {
      this.RootBlock = av;
      R.__mathquillify = function (aZ, a0) {
        this.config(aZ);
        if (a0 > 1) {
          this.__controller.root.reflow = az;
        }
        P.__mathquillify.call(this, 'mq-editable-field mq-math-mode');
        delete this.__controller.root.reflow;
        return this;
      };
    });
  };
  var W = ah(aB, function (P, L) {
    P.ctrlSeq = '\\text';
    P.replaces = function (aZ) {
      if (aZ instanceof A) {
        this.replacedText = aZ.remove().jQ.text();
      } else {
        if (typeof aZ === 'string') {
          this.replacedText = aZ;
        }
      }
    };
    P.jQadd = function (aZ) {
      L.jQadd.call(this, aZ);
      if (this.ends[ak]) {
        this.ends[ak].jQadd(this.jQ[0].firstChild);
      }
    };
    P.createLeftOf = function (a1) {
      return;
      var aZ = this;
      L.createLeftOf.call(this, a1);
      if (aZ[af].siblingCreated) {
        aZ[af].siblingCreated(a1.options, ak);
      }
      if (aZ[ak].siblingCreated) {
        aZ[ak].siblingCreated(a1.options, af);
      }
      aZ.bubble('reflow');
      a1.insAtRightEnd(aZ);
      if (aZ.replacedText) {
        for (var a0 = 0; a0 < aZ.replacedText.length; a0 += 1) {
          aZ.write(a1, aZ.replacedText.charAt(a0));
        }
      }
    };
    P.parser = function () {
      var aZ = this;
      var a0 = ad.string;
      var a1 = ad.regex;
      var a2 = ad.optWhitespace;
      return a2
        .then(a0('{'))
        .then(a1(/^[^}]*/))
        .skip(a0('}'))
        .map(function (a3) {
          j(a3).adopt(aZ, 0, 0);
          return aZ;
        });
    };
    P.textContents = function () {
      return this.foldChildren('', function (aZ, a0) {
        return aZ + a0.text;
      });
    };
    P.text = function () {
      return '"' + this.textContents() + '"';
    };
    P.latex = function () {
      return '\\text{' + this.textContents() + '}';
    };
    P.html = function () {
      return (
        '<span class="mq-text-mode" mathquill-command-id=' +
        this.id +
        '>' +
        this.textContents() +
        '</span>'
      );
    };
    P.moveTowards = function (aZ, a0) {
      a0.insAtDirEnd(-aZ, this);
    };
    P.moveOutOf = function (aZ, a0) {
      a0.insDirOf(aZ, this);
    };
    P.unselectInto = P.moveTowards;
    P.selectTowards = aK.prototype.selectTowards;
    P.deleteTowards = aK.prototype.deleteTowards;
    P.selectOutOf = function (aZ, a0) {
      a0.insDirOf(aZ, this);
    };
    P.deleteOutOf = function (aZ, a0) {
      if (this.isEmpty()) {
        a0.insRightOf(this);
      }
    };
    P.write = function (a1, a0) {
      a1.show().deleteSelection();
      if (a0 !== '$') {
        if (!a1[ak]) {
          j(a0).createLeftOf(a1);
        } else {
          a1[ak].appendText(a0);
        }
      } else {
        if (this.isEmpty()) {
          a1.insRightOf(this);
          ax('\\$', '$').createLeftOf(a1);
        } else {
          if (!a1[af]) {
            a1.insRightOf(this);
          } else {
            if (!a1[ak]) {
              a1.insLeftOf(this);
            } else {
              var aZ = W();
              var a2 = this.ends[ak];
              a2.disown();
              a2.adopt(aZ, 0, 0);
              a1.insLeftOf(this);
              L.createLeftOf.call(aZ, a1);
            }
          }
        }
      }
    };
    P.seek = function (a2, a7) {
      a7.hide();
      var a4 = R(this);
      var a5 = this.jQ.width() / this.text.length;
      var a3 = Math.round((a2 - this.jQ.offset().left) / a5);
      if (a3 <= 0) {
        a7.insAtLeftEnd(this);
      } else {
        if (a3 >= a4.text.length) {
          a7.insAtRightEnd(this);
        } else {
          a7.insLeftOf(a4.splitRight(a3));
        }
      }
      var a0 = a2 - a7.show().offset().left;
      var a1 = a0 && a0 < 0 ? ak : af;
      var a8 = a1;
      while (a7[a1] && a0 * a8 > 0) {
        a7[a1].moveTowards(a1, a7);
        a8 = a0;
        a0 = a2 - a7.offset().left;
      }
      if (a1 * a0 < -a1 * a8) {
        a7[-a1].moveTowards(-a1, a7);
      }
      if (!a7.anticursor) {
        this.anticursorPosition = a7[ak] && a7[ak].text.length;
      } else {
        if (a7.anticursor.parent === this) {
          var aZ = a7[ak] && a7[ak].text.length;
          if (this.anticursorPosition === aZ) {
            a7.anticursor = h.copy(a7);
          } else {
            if (this.anticursorPosition < aZ) {
              var a6 = a7[ak].splitRight(this.anticursorPosition);
              a7[ak] = a6;
            } else {
              var a6 = a7[af].splitRight(this.anticursorPosition - aZ);
            }
            a7.anticursor = h(this, a6[ak], a6);
          }
        }
      }
    };
    P.blur = function () {
      o.prototype.blur.call(this);
      R(this);
    };
    function R(aZ) {
      aZ.jQ[0].normalize();
      var a1 = aZ.jQ[0].firstChild;
      aW('only node in TextBlock span is Text node', a1.nodeType === 3);
      var a0 = j(a1.data);
      a0.jQadd(a1);
      aZ.children().disown();
      a0.adopt(aZ, 0, 0);
    }
    P.focus = o.prototype.focus;
  });
  var j = ah(aB, function (P, L) {
    P.init = function (aZ) {
      L.init.call(this);
      this.text = aZ;
    };
    P.jQadd = function (aZ) {
      this.dom = aZ;
      this.jQ = aD(aZ);
    };
    P.jQize = function () {
      return this.jQadd(document.createTextNode(this.text));
    };
    P.appendText = function (aZ) {
      this.text += aZ;
      this.dom.appendData(aZ);
    };
    P.prependText = function (aZ) {
      this.text = aZ + this.text;
      this.dom.insertData(0, aZ);
    };
    P.insTextAtDirEnd = function (a0, aZ) {
      ap(aZ);
      if (aZ === af) {
        this.appendText(a0);
      } else {
        this.prependText(a0);
      }
    };
    P.splitRight = function (aZ) {
      var a0 = j(this.text.slice(aZ)).adopt(this.parent, this, this[af]);
      a0.jQadd(this.dom.splitText(aZ));
      this.text = this.text.slice(0, aZ);
      return a0;
    };
    function R(aZ, a0) {
      return a0.charAt(aZ === ak ? 0 : -1 + a0.length);
    }
    P.moveTowards = function (aZ, a1) {
      ap(aZ);
      var a0 = R(-aZ, this.text);
      var a2 = this[-aZ];
      if (a2) {
        a2.insTextAtDirEnd(a0, aZ);
      } else {
        j(a0).createDir(-aZ, a1);
      }
      return this.deleteTowards(aZ, a1);
    };
    P.latex = function () {
      return this.text;
    };
    P.deleteTowards = function (aZ, a0) {
      if (this.text.length > 1) {
        if (aZ === af) {
          this.dom.deleteData(0, 1);
          this.text = this.text.slice(1);
        } else {
          this.dom.deleteData(-1 + this.text.length, 1);
          this.text = this.text.slice(0, -1);
        }
      } else {
        this.remove();
        this.jQ.remove();
        a0[aZ] = this[aZ];
      }
    };
    P.selectTowards = function (a0, a3) {
      ap(a0);
      var aZ = a3.anticursor;
      var a1 = R(-a0, this.text);
      if (aZ[a0] === this) {
        var a2 = j(a1).createDir(a0, a3);
        aZ[a0] = a2;
        a3.insDirOf(a0, a2);
      } else {
        var a4 = this[-a0];
        if (a4) {
          a4.insTextAtDirEnd(a1, a0);
        } else {
          var a2 = j(a1).createDir(-a0, a3);
          a2.jQ.insDirOf(-a0, a3.selection.jQ);
        }
        if (this.text.length === 1 && aZ[-a0] === this) {
          aZ[-a0] = this[-a0];
        }
      }
      return this.deleteTowards(a0, a3);
    };
  });
  aL.$ = ay.text = ay.textnormal = ay.textrm = ay.textup = ay.textmd = W;
  function T(R, P, L) {
    return ah(W, {
      ctrlSeq: R,
      htmlTemplate: '<' + P + ' ' + L + '>&0</' + P + '>',
    });
  }
  ay.em = ay.italic = ay.italics = ay.emph = ay.textit = ay.textsl = T(
    '\\textit',
    'i',
    'class="mq-text-mode"'
  );
  ay.strong = ay.bold = ay.textbf = T('\\textbf', 'b', 'class="mq-text-mode"');
  ay.sf = ay.textsf = T(
    '\\textsf',
    'span',
    'class="mq-sans-serif mq-text-mode"'
  );
  ay.tt = ay.texttt = T(
    '\\texttt',
    'span',
    'class="mq-monospace mq-text-mode"'
  );
  ay.textsc = T(
    '\\textsc',
    'span',
    'style="font-variant:small-caps" class="mq-text-mode"'
  );
  ay.uppercase = T(
    '\\uppercase',
    'span',
    'style="text-transform:uppercase" class="mq-text-mode"'
  );
  ay.lowercase = T(
    '\\lowercase',
    'span',
    'style="text-transform:lowercase" class="mq-text-mode"'
  );
  var aw = ah(aK, function (P, L) {
    P.init = function (R) {
      L.init.call(this, '$');
      this.cursor = R;
    };
    P.htmlTemplate = '<span class="mq-math-mode">&0</span>';
    P.createBlocks = function () {
      L.createBlocks.call(this);
      this.ends[ak].cursor = this.cursor;
      this.ends[ak].write = function (aZ, R) {
        if (R !== '$') {
          o.prototype.write.call(this, aZ, R);
        } else {
          if (this.isEmpty()) {
            aZ.insRightOf(this.parent);
            this.parent.deleteTowards(dir, aZ);
            ax('\\$', '$').createLeftOf(aZ.show());
          } else {
            if (!aZ[af]) {
              aZ.insRightOf(this.parent);
            } else {
              if (!aZ[ak]) {
                aZ.insLeftOf(this.parent);
              } else {
                o.prototype.write.call(this, aZ, R);
              }
            }
          }
        }
      };
    };
    P.latex = function () {
      return '$' + this.ends[ak].latex() + '$';
    };
  });
  var k = ah(av, function (P, L) {
    P.keystroke = function (R) {
      if (R === 'Spacebar' || R === 'Shift-Spacebar') {
        return;
      }
      return L.keystroke.apply(this, arguments);
    };
    P.write = function (a0, aZ) {
      a0.show().deleteSelection();
      if (aZ === '$') {
        aw(a0).createLeftOf(a0);
      } else {
        var R;
        if (aZ === '<') {
          R = '&lt;';
        } else {
          if (aZ === '>') {
            R = '&gt;';
          }
        }
        ax(aZ, R).createLeftOf(a0);
      }
    };
  });
  ai.TextField = function (L) {
    return ah(L.EditableField, function (R, P) {
      this.RootBlock = k;
      R.__mathquillify = function () {
        return P.__mathquillify.call(this, 'mq-editable-field mq-text-mode');
      };
      R.latex = function (aZ) {
        if (arguments.length > 0) {
          this.__controller.renderLatexText(aZ);
          if (this.__controller.blurred) {
            this.__controller.cursor.hide().parent.blur();
          }
          return this;
        }
        return this.__controller.exportLatex();
      };
    });
  };
  var au = (aL['\\'] = ah(aK, function (P, L) {
    P.ctrlSeq = '\\';
    P.replaces = function (R) {
      this._replacedFragment = R.disown();
      this.isEmpty = function () {
        return false;
      };
    };
    P.htmlTemplate =
      '<span class="mq-latex-command-input mq-non-leaf">\\<span>&0</span></span>';
    P.textTemplate = ['\\'];
    P.createBlocks = function () {
      L.createBlocks.call(this);
      this.ends[ak].focus = function () {
        this.parent.jQ.addClass('mq-hasCursor');
        if (this.isEmpty()) {
          this.parent.jQ.removeClass('mq-empty');
        }
        return this;
      };
      this.ends[ak].blur = function () {
        this.parent.jQ.removeClass('mq-hasCursor');
        if (this.isEmpty()) {
          this.parent.jQ.addClass('mq-empty');
        }
        return this;
      };
      this.ends[ak].write = function (aZ, R) {
        aZ.show().deleteSelection();
        if (R.match(/[a-z]/i)) {
          ax(R).createLeftOf(aZ);
        } else {
          this.parent.renderCommand(aZ);
          if (R !== '\\' || !this.isEmpty()) {
            this.parent.parent.write(aZ, R);
          }
        }
      };
      this.ends[ak].keystroke = function (aZ, a0, R) {
        if (aZ === 'Tab' || aZ === 'Enter' || aZ === 'Spacebar') {
          this.parent.renderCommand(R.cursor);
          a0.preventDefault();
          return;
        }
        return L.keystroke.apply(this, arguments);
      };
    };
    P.createLeftOf = function (aZ) {
      L.createLeftOf.call(this, aZ);
      if (this._replacedFragment) {
        var R = this.jQ[0];
        this.jQ = this._replacedFragment.jQ
          .addClass('mq-blur')
          .bind('mousedown mousemove', function (a0) {
            aD((a0.target = R)).trigger(a0);
            return false;
          })
          .insertBefore(this.jQ)
          .add(this.jQ);
      }
    };
    P.latex = function () {
      return '\\' + this.ends[ak].latex() + ' ';
    };
    P.renderCommand = function (a0) {
      this.jQ = this.jQ.last();
      this.remove();
      if (this[af]) {
        a0.insLeftOf(this[af]);
      } else {
        a0.insAtRightEnd(this.parent);
      }
      var aZ = this.ends[ak].latex();
      if (!aZ) {
        aZ = ' ';
      }
      var R = ay[aZ];
      if (R) {
        R = R(aZ);
        if (this._replacedFragment) {
          R.replaces(this._replacedFragment);
        }
        R.createLeftOf(a0);
      } else {
        R = W();
        R.replaces(aZ);
        R.createLeftOf(a0);
        a0.insRightOf(R);
        if (this._replacedFragment) {
          this._replacedFragment.remove();
        }
      }
    };
  }));
  ay.notin = ay.cong = ay.equiv = ay.oplus = ay.otimes = ah(
    ar,
    function (P, L) {
      P.init = function (R) {
        L.init.call(this, '\\' + R + ' ', '&' + R + ';');
      };
    }
  );
  ay['\u2260'] = ay.ne = ay.neq = aN(ar, '\\ne ', '&ne;');
  ay.ast = ay.star = ay.loast = ay.lowast = aN(ar, '\\ast ', '&lowast;');
  ay.therefor = ay.therefore = aN(ar, '\\therefore ', '&there4;');
  ay.cuz = ay.because = aN(ar, '\\because ', '&#8757;');
  ay.prop = ay.propto = aN(ar, '\\propto ', '&prop;');
  ay['\u2248'] = ay.asymp = ay.approx = aN(ar, '\\approx ', '&asymp;');
  ay.isin = ay['in'] = aN(ar, '\\in ', '&isin;');
  ay.ni = ay.contains = aN(ar, '\\ni ', '&ni;');
  ay.notni = ay.niton = ay.notcontains = ay.doesnotcontain = aN(
    ar,
    '\\not\\ni ',
    '&#8716;'
  );
  ay.sub = ay.subset = aN(ar, '\\subset ', '&sub;');
  ay.sup = ay.supset = ay.superset = aN(ar, '\\supset ', '&sup;');
  ay.nsub = ay.notsub = ay.nsubset = ay.notsubset = aN(
    ar,
    '\\not\\subset ',
    '&#8836;'
  );
  ay.nsup = ay.notsup = ay.nsupset = ay.notsupset = ay.nsuperset = ay.notsuperset = aN(
    ar,
    '\\not\\supset ',
    '&#8837;'
  );
  ay.sube = ay.subeq = ay.subsete = ay.subseteq = aN(
    ar,
    '\\subseteq ',
    '&sube;'
  );
  ay.supe = ay.supeq = ay.supsete = ay.supseteq = ay.supersete = ay.superseteq = aN(
    ar,
    '\\supseteq ',
    '&supe;'
  );
  ay.nsube = ay.nsubeq = ay.notsube = ay.notsubeq = ay.nsubsete = ay.nsubseteq = ay.notsubsete = ay.notsubseteq = aN(
    ar,
    '\\not\\subseteq ',
    '&#8840;'
  );
  ay.nsupe = ay.nsupeq = ay.notsupe = ay.notsupeq = ay.nsupsete = ay.nsupseteq = ay.notsupsete = ay.notsupseteq = ay.nsupersete = ay.nsuperseteq = ay.notsupersete = ay.notsuperseteq = aN(
    ar,
    '\\not\\supseteq ',
    '&#8841;'
  );
  ay.N = ay.naturals = ay.Naturals = aN(ax, '\\mathbb{N}', '&#8469;');
  ay.P = ay.primes = ay.Primes = ay.projective = ay.Projective = ay.probability = ay.Probability = aN(
    ax,
    '\\mathbb{P}',
    '&#8473;'
  );
  ay.Z = ay.integers = ay.Integers = aN(ax, '\\mathbb{Z}', '&#8484;');
  ay.Q = ay.rationals = ay.Rationals = aN(ax, '\\mathbb{Q}', '&#8474;');
  ay.R = ay.reals = ay.Reals = aN(ax, '\\mathbb{R}', '&#8477;');
  ay.C = ay.complex = ay.Complex = ay.complexes = ay.Complexes = ay.complexplane = ay.Complexplane = ay.ComplexPlane = aN(
    ax,
    '\\mathbb{C}',
    '&#8450;'
  );
  ay.H = ay.Hamiltonian = ay.quaternions = ay.Quaternions = aN(
    ax,
    '\\mathbb{H}',
    '&#8461;'
  );
  ay.quad = ay.emsp = aN(ax, '\\quad ', '    ');
  ay.qquad = aN(ax, '\\qquad ', '        ');
  ay.diamond = aN(ax, '\\diamond ', '&#9671;');
  ay.bigtriangleup = aN(ax, '\\bigtriangleup ', '&#9651;');
  ay.ominus = aN(ax, '\\ominus ', '&#8854;');
  ay.uplus = aN(ax, '\\uplus ', '&#8846;');
  ay.bigtriangledown = aN(ax, '\\bigtriangledown ', '&#9661;');
  ay.sqcap = aN(ax, '\\sqcap ', '&#8851;');
  ay.triangleleft = aN(ax, '\\triangleleft ', '&#8882;');
  ay.sqcup = aN(ax, '\\sqcup ', '&#8852;');
  ay.triangleright = aN(ax, '\\triangleright ', '&#8883;');
  ay.odot = ay.circledot = aN(ax, '\\odot ', '&#8857;');
  ay.bigcirc = aN(ax, '\\bigcirc ', '&#9711;');
  ay.dagger = aN(ax, '\\dagger ', '&#0134;');
  ay.ddagger = aN(ax, '\\ddagger ', '&#135;');
  ay.wr = aN(ax, '\\wr ', '&#8768;');
  ay.amalg = aN(ax, '\\amalg ', '&#8720;');
  ay.models = aN(ax, '\\models ', '&#8872;');
  ay.prec = aN(ax, '\\prec ', '&#8826;');
  ay.succ = aN(ax, '\\succ ', '&#8827;');
  ay.preceq = aN(ax, '\\preceq ', '&#8828;');
  ay.succeq = aN(ax, '\\succeq ', '&#8829;');
  ay.simeq = aN(ax, '\\simeq ', '&#8771;');
  ay.mid = aN(ax, '\\mid ', '&#8739;');
  ay.ll = aN(ax, '\\ll ', '&#8810;');
  ay.gg = aN(ax, '\\gg ', '&#8811;');
  ay.parallel = aN(ax, '\\parallel ', '&#8741;');
  ay.nparallel = aN(ax, '\\nparallel ', '&#8742;');
  ay.bowtie = aN(ax, '\\bowtie ', '&#8904;');
  ay.sqsubset = aN(ax, '\\sqsubset ', '&#8847;');
  ay.sqsupset = aN(ax, '\\sqsupset ', '&#8848;');
  ay.smile = aN(ax, '\\smile ', '&#8995;');
  ay.sqsubseteq = aN(ax, '\\sqsubseteq ', '&#8849;');
  ay.sqsupseteq = aN(ax, '\\sqsupseteq ', '&#8850;');
  ay.doteq = aN(ax, '\\doteq ', '&#8784;');
  ay.frown = aN(ax, '\\frown ', '&#8994;');
  ay.vdash = aN(ax, '\\vdash ', '&#8870;');
  ay.dashv = aN(ax, '\\dashv ', '&#8867;');
  ay.nless = aN(ax, '\\nless ', '&#8814;');
  ay.ngtr = aN(ax, '\\ngtr ', '&#8815;');
  ay.longleftarrow = aN(ax, '\\longleftarrow ', '&#8592;');
  ay.longrightarrow = aN(ax, '\\longrightarrow ', '&#8594;');
  ay.Longleftarrow = aN(ax, '\\Longleftarrow ', '&#8656;');
  ay.Longrightarrow = aN(ax, '\\Longrightarrow ', '&#8658;');
  ay.longleftrightarrow = aN(ax, '\\longleftrightarrow ', '&#8596;');
  ay.updownarrow = aN(ax, '\\updownarrow ', '&#8597;');
  ay.Longleftrightarrow = aN(ax, '\\Longleftrightarrow ', '&#8660;');
  ay.Updownarrow = aN(ax, '\\Updownarrow ', '&#8661;');
  ay.mapsto = aN(ax, '\\mapsto ', '&#8614;');
  ay.nearrow = aN(ax, '\\nearrow ', '&#8599;');
  ay.hookleftarrow = aN(ax, '\\hookleftarrow ', '&#8617;');
  ay.hookrightarrow = aN(ax, '\\hookrightarrow ', '&#8618;');
  ay.searrow = aN(ax, '\\searrow ', '&#8600;');
  ay.leftharpoonup = aN(ax, '\\leftharpoonup ', '&#8636;');
  ay.rightharpoonup = aN(ax, '\\rightharpoonup ', '&#8640;');
  ay.swarrow = aN(ax, '\\swarrow ', '&#8601;');
  ay.leftharpoondown = aN(ax, '\\leftharpoondown ', '&#8637;');
  ay.rightharpoondown = aN(ax, '\\rightharpoondown ', '&#8641;');
  ay.nwarrow = aN(ax, '\\nwarrow ', '&#8598;');
  ay.ldots = aN(ax, '\\ldots ', '&#8230;');
  ay.cdots = aN(ax, '\\cdots ', '&#8943;');
  ay.vdots = aN(ax, '\\vdots ', '&#8942;');
  ay.ddots = aN(ax, '\\ddots ', '&#8945;');
  ay.surd = aN(ax, '\\surd ', '&#8730;');
  ay.triangle = aN(ax, '\\triangle ', '&#9651;');
  ay.ell = aN(ax, '\\ell ', '&#8467;');
  ay.top = aN(ax, '\\top ', '&#8868;');
  ay.flat = aN(ax, '\\flat ', '&#9837;');
  ay.natural = aN(ax, '\\natural ', '&#9838;');
  ay.sharp = aN(ax, '\\sharp ', '&#9839;');
  ay.wp = aN(ax, '\\wp ', '&#8472;');
  ay.bot = aN(ax, '\\bot ', '&#8869;');
  ay.clubsuit = aN(ax, '\\clubsuit ', '&#9827;');
  ay.diamondsuit = aN(ax, '\\diamondsuit ', '&#9826;');
  ay.heartsuit = aN(ax, '\\heartsuit ', '&#9825;');
  ay.spadesuit = aN(ax, '\\spadesuit ', '&#9824;');
  ay.parallelogram = aN(ax, '\\parallelogram ', '&#9649;');
  ay.square = aN(ax, '\\square ', '&#11036;');
  ay.oint = aN(ax, '\\oint ', '&#8750;');
  ay.bigcap = aN(ax, '\\bigcap ', '&#8745;');
  ay.bigcup = aN(ax, '\\bigcup ', '&#8746;');
  ay.bigsqcup = aN(ax, '\\bigsqcup ', '&#8852;');
  ay.bigvee = aN(ax, '\\bigvee ', '&#8744;');
  ay.bigwedge = aN(ax, '\\bigwedge ', '&#8743;');
  ay.bigodot = aN(ax, '\\bigodot ', '&#8857;');
  ay.bigotimes = aN(ax, '\\bigotimes ', '&#8855;');
  ay.bigoplus = aN(ax, '\\bigoplus ', '&#8853;');
  ay.biguplus = aN(ax, '\\biguplus ', '&#8846;');
  ay.lfloor = aN(ax, '\\lfloor ', '&#8970;');
  ay.rfloor = aN(ax, '\\rfloor ', '&#8971;');
  ay.lceil = aN(ax, '\\lceil ', '&#8968;');
  ay.rceil = aN(ax, '\\rceil ', '&#8969;');
  ay.opencurlybrace = ay.lbrace = aN(ax, '\\lbrace ', '{');
  ay.closecurlybrace = ay.rbrace = aN(ax, '\\rbrace ', '}');
  ay.lbrack = aN(ax, '[');
  ay.rbrack = aN(ax, ']');
  ay['\u222b'] = ay['int'] = ay.integral = aN(H, '\\int ', '<big>&int;</big>');
  ay.slash = aN(ax, '/');
  ay.vert = aN(ax, '|');
  ay.perp = ay.perpendicular = aN(ax, '\\perp ', '&perp;');
  ay.nabla = ay.del = aN(ax, '\\nabla ', '&nabla;');
  ay.hbar = aN(ax, '\\hbar ', '&#8463;');
  ay.AA = ay.Angstrom = ay.angstrom = aN(ax, '\\text\\AA ', '&#8491;');
  ay.ring = ay.circ = ay.circle = aN(ax, '\\circ ', '&#8728;');
  ay.bull = ay.bullet = aN(ax, '\\bullet ', '&bull;');
  ay.setminus = ay.smallsetminus = aN(ax, '\\setminus ', '&#8726;');
  ay.not = ay['\u00ac'] = ay.neg = aN(ax, '\\neg ', '&not;');
  ay[
    '\u2026'
  ] = ay.dots = ay.ellip = ay.hellip = ay.ellipsis = ay.hellipsis = aN(
    ax,
    '\\dots ',
    '&hellip;'
  );
  ay.converges = ay.darr = ay.dnarr = ay.dnarrow = ay.downarrow = aN(
    ax,
    '\\downarrow ',
    '&darr;'
  );
  ay.dArr = ay.dnArr = ay.dnArrow = ay.Downarrow = aN(
    ax,
    '\\Downarrow ',
    '&dArr;'
  );
  ay.diverges = ay.uarr = ay.uparrow = aN(ax, '\\uparrow ', '&uarr;');
  ay.uArr = ay.Uparrow = aN(ax, '\\Uparrow ', '&uArr;');
  ay.to = aN(ar, '\\to ', '&rarr;');
  ay.rarr = ay.rightarrow = aN(ax, '\\rightarrow ', '&rarr;');
  ay.implies = aN(ar, '\\Rightarrow ', '&rArr;');
  ay.rArr = ay.Rightarrow = aN(ax, '\\Rightarrow ', '&rArr;');
  ay.gets = aN(ar, '\\gets ', '&larr;');
  ay.larr = ay.leftarrow = aN(ax, '\\leftarrow ', '&larr;');
  ay.impliedby = aN(ar, '\\Leftarrow ', '&lArr;');
  ay.lArr = ay.Leftarrow = aN(ax, '\\Leftarrow ', '&lArr;');
  ay.harr = ay.lrarr = ay.leftrightarrow = aN(
    ax,
    '\\leftrightarrow ',
    '&harr;'
  );
  ay.iff = aN(ar, '\\Leftrightarrow ', '&hArr;');
  ay.hArr = ay.lrArr = ay.Leftrightarrow = aN(
    ax,
    '\\Leftrightarrow ',
    '&hArr;'
  );
  ay.Re = ay.Real = ay.real = aN(ax, '\\Re ', '&real;');
  ay.Im = ay.imag = ay.image = ay.imagin = ay.imaginary = ay.Imaginary = aN(
    ax,
    '\\Im ',
    '&image;'
  );
  ay.part = ay.partial = aN(ax, '\\partial ', '&part;');
  ay.infty = ay.infin = ay.infinity = aN(ax, '\\infty ', '&infin;');
  ay.alef = ay.alefsym = ay.aleph = ay.alephsym = aN(
    ax,
    '\\aleph ',
    '&alefsym;'
  );
  ay.xist = ay.xists = ay.exist = ay.exists = aN(ax, '\\exists ', '&exist;');
  ay.and = ay.land = ay.wedge = aN(ax, '\\wedge ', '&and;');
  ay.or = ay.lor = ay.vee = aN(ax, '\\vee ', '&or;');
  ay.o = ay.O = ay.empty = ay.emptyset = ay.oslash = ay.Oslash = ay.nothing = ay.varnothing = aN(
    ar,
    '\\varnothing ',
    '&empty;'
  );
  ay.cup = ay.union = aN(ar, '\\cup ', '&cup;');
  ay.cap = ay.intersect = ay.intersection = aN(ar, '\\cap ', '&cap;');
  ay.deg = ay.degree = aN(ax, '\\degree ', '&deg;');
  ay.ang = ay.angle = aN(ax, '\\angle ', '&ang;');
  ay.measuredangle = aN(ax, '\\measuredangle ', '&#8737;');
  var f = ah(ax, function (P, L) {
    P.createLeftOf = function (R) {
      if (
        R.options.autoSubscriptNumerals &&
        R.parent !== R.parent.parent.sub &&
        ((R[ak] instanceof x && R[ak].isItalic !== false) ||
          (R[ak] instanceof ao &&
            R[ak][ak] instanceof x &&
            R[ak][ak].isItalic !== false))
      ) {
        ay._().createLeftOf(R);
        L.createLeftOf.call(this, R);
        R.insRightOf(R.parent.parent);
      } else {
        L.createLeftOf.call(this, R);
      }
    };
  });
  var x = ah(H, function (P, L) {
    P.init = function (aZ, R) {
      L.init.call(this, aZ, '<var>' + (R || aZ) + '</var>');
    };
    P.text = function () {
      var R = this.ctrlSeq;
      if (
        this[ak] &&
        !(this[ak] instanceof x) &&
        !(this[ak] instanceof ar) &&
        this[ak].ctrlSeq !== '\\ '
      ) {
        R = '*' + R;
      }
      if (this[af] && !(this[af] instanceof ar) && !(this[af] instanceof ao)) {
        R += '*';
      }
      return R;
    };
  });
  F.p.autoCommands = { _maxLength: 0 };
  aT.autoCommands = function (L) {
    if (!/^[a-z]+(?: [a-z]+)*$/i.test(L)) {
      throw '"' + L + '" not a space-delimited list of only letters';
    }
    var a0 = L.split(' '),
      a1 = {},
      P = 0;
    for (var R = 0; R < a0.length; R += 1) {
      var aZ = a0[R];
      if (aZ.length < 2) {
        throw 'autocommand "' + aZ + '" not minimum length of 2';
      }
      if (ay[aZ] === i) {
        throw '"' + aZ + '" is a built-in operator name';
      }
      a1[aZ] = 1;
      P = w(P, aZ.length);
    }
    a1._maxLength = P;
    return a1;
  };
  var t = ah(x, function (R, P) {
    R.init = function (aZ) {
      return P.init.call(this, (this.letter = aZ));
    };
    R.createLeftOf = function (a4) {
      var a2 = a4.options.autoCommands,
        a0 = a2._maxLength;
      if (a0 > 0) {
        var a3 = this.letter,
          aZ = a4[ak],
          a1 = 1;
        while (aZ instanceof t && a1 < a0) {
          (a3 = aZ.letter + a3), (aZ = aZ[ak]), (a1 += 1);
        }
        while (a3.length) {
          if (a2.hasOwnProperty(a3)) {
            for (
              var a1 = 2, aZ = a4[ak];
              a1 < a3.length;
              a1 += 1, aZ = aZ[ak]
            ) {}
            A(aZ, a4[ak]).remove();
            a4[ak] = aZ[ak];
            return ay[a3](a3).createLeftOf(a4);
          }
          a3 = a3.slice(1);
        }
      }
      P.createLeftOf.apply(this, arguments);
    };
    R.italicize = function (aZ) {
      this.isItalic = aZ;
      this.jQ.toggleClass('mq-operator-name', !aZ);
      return this;
    };
    R.finalizeTree = R.siblingDeleted = R.siblingCreated = function (a0, aZ) {
      if (aZ !== ak && this[af] instanceof t) {
        return;
      }
      this.autoUnItalicize(a0);
    };
    R.autoUnItalicize = function (aZ) {
      var a9 = aZ.autoOperatorNames;
      if (a9._maxLength === 0) {
        return;
      }
      var ba = this.letter;
      for (var a4 = this[ak]; a4 instanceof t; a4 = a4[ak]) {
        ba = a4.letter + ba;
      }
      for (var a0 = this[af]; a0 instanceof t; a0 = a0[af]) {
        ba += a0.letter;
      }
      A(a4[af] || this.parent.ends[ak], a0[ak] || this.parent.ends[af]).each(
        function (bc) {
          bc.italicize(true).jQ.removeClass('mq-first mq-last');
          bc.ctrlSeq = bc.letter;
        }
      );
      outer: for (
        var a6 = 0, a7 = a4[af] || this.parent.ends[ak];
        a6 < ba.length;
        a6 += 1, a7 = a7[af]
      ) {
        for (var a8 = aQ(a9._maxLength, ba.length - a6); a8 > 0; a8 -= 1) {
          var a1 = ba.slice(a6, a6 + a8);
          if (a9.hasOwnProperty(a1)) {
            for (var a5 = 0, a3 = a7; a5 < a8; a5 += 1, a3 = a3[af]) {
              a3.italicize(false);
              var bb = a3;
            }
            var a2 = u.hasOwnProperty(a1);
            a7.ctrlSeq = (a2 ? '\\' : '\\operatorname{') + a7.ctrlSeq;
            bb.ctrlSeq += a2 ? ' ' : '}';
            if (aA.hasOwnProperty(a1)) {
              bb[ak][ak][ak].jQ.addClass('mq-last');
            }
            if (L(a7[ak])) {
              a7.jQ.addClass('mq-first');
            }
            if (L(bb[af])) {
              bb.jQ.addClass('mq-last');
            }
            a6 += a8 - 1;
            a7 = bb;
            continue outer;
          }
        }
      }
    };
    function L(aZ) {
      return aZ instanceof H && !(aZ instanceof ar);
    }
  });
  var u = {};
  var Z = (F.p.autoOperatorNames = { _maxLength: 9 });
  var aA = { limsup: 1, liminf: 1, projlim: 1, injlim: 1 };
  (function () {
    var P = 'arg deg det dim exp gcd hom inf ker lg lim ln log max min sup limsup liminf injlim projlim Pr'.split(
      ' '
    );
    for (var R = 0; R < P.length; R += 1) {
      u[P[R]] = Z[P[R]] = 1;
    }
    var a0 = 'sin cos tan arcsin arccos arctan sinh cosh tanh sec csc cot coth'.split(
      ' '
    );
    for (var R = 0; R < a0.length; R += 1) {
      u[a0[R]] = 1;
    }
    var aZ = 'sin cos tan sec cosec csc cotan cot ctg'.split(' ');
    for (var R = 0; R < aZ.length; R += 1) {
      Z[aZ[R]] = Z['arc' + aZ[R]] = Z[aZ[R] + 'h'] = Z['ar' + aZ[R] + 'h'] = Z[
        'arc' + aZ[R] + 'h'
      ] = 1;
    }
    var L = 'gcf hcf lcm proj span'.split(' ');
    for (var R = 0; R < L.length; R += 1) {
      Z[L[R]] = 1;
    }
  })();
  aT.autoOperatorNames = function (L) {
    if (!/^[a-z]+(?: [a-z]+)*$/i.test(L)) {
      throw '"' + L + '" not a space-delimited list of only letters';
    }
    var a0 = L.split(' '),
      a1 = {},
      P = 0;
    for (var R = 0; R < a0.length; R += 1) {
      var aZ = a0[R];
      if (aZ.length < 2) {
        throw '"' + aZ + '" not minimum length of 2';
      }
      a1[aZ] = 1;
      P = w(P, aZ.length);
    }
    a1._maxLength = P;
    return a1;
  };
  var i = ah(H, function (P, L) {
    P.init = function (R) {
      this.ctrlSeq = R;
    };
    P.createLeftOf = function (a0) {
      var aZ = this.ctrlSeq;
      for (var R = 0; R < aZ.length; R += 1) {
        t(aZ.charAt(R)).createLeftOf(a0);
      }
    };
    P.parser = function () {
      var aZ = this.ctrlSeq;
      var a0 = o();
      for (var R = 0; R < aZ.length; R += 1) {
        t(aZ.charAt(R)).adopt(a0, a0.ends[af], 0);
      }
      return ad.succeed(a0.children());
    };
  });
  for (var aJ in Z) {
    if (Z.hasOwnProperty(aJ)) {
      ay[aJ] = i;
    }
  }
  ay.operatorname = ah(aK, function (L) {
    L.createLeftOf = az;
    L.numBlocks = function () {
      return 1;
    };
    L.parser = function () {
      return aE.block.map(function (P) {
        return P.children();
      });
    };
  });
  ay.f = ah(t, function (P, L) {
    P.init = function () {
      H.p.init.call(this, (this.letter = 'f'), '<var class="mq-f">f</var>');
    };
    P.italicize = function (R) {
      this.jQ.html('f').toggleClass('mq-f', R);
      return L.italicize.apply(this, arguments);
    };
  });
  ay[' '] = ay.space = aN(ax, '\\ ', '&nbsp;');
  ay["'"] = ay.prime = aN(ax, "'", '&prime;');
  ay.backslash = aN(ax, '\\backslash ', '\\');
  if (!aL['\\']) {
    aL['\\'] = ay.backslash;
  }
  ay.$ = aN(ax, '\\$', '$');
  var aI = ah(H, function (P, L) {
    P.init = function (aZ, R) {
      L.init.call(
        this,
        aZ,
        '<span class="mq-nonSymbola">' + (R || aZ) + '</span>'
      );
    };
  });
  ay['@'] = aI;
  ay['&'] = aN(aI, '\\&', '&amp;');
  ay['%'] = aN(aI, '\\%', '%');
  ay.alpha = ay.beta = ay.gamma = ay.delta = ay.zeta = ay.eta = ay.theta = ay.iota = ay.kappa = ay.mu = ay.nu = ay.xi = ay.rho = ay.sigma = ay.tau = ay.chi = ay.psi = ay.omega = ah(
    x,
    function (P, L) {
      P.init = function (R) {
        L.init.call(this, '\\' + R + ' ', '&' + R + ';');
      };
    }
  );
  ay.phi = aN(x, '\\phi ', '&#981;');
  ay.phiv = ay.varphi = aN(x, '\\varphi ', '&phi;');
  ay.epsilon = aN(x, '\\epsilon ', '&#1013;');
  ay.epsiv = ay.varepsilon = aN(x, '\\varepsilon ', '&epsilon;');
  ay.piv = ay.varpi = aN(x, '\\varpi ', '&piv;');
  ay.sigmaf = ay.sigmav = ay.varsigma = aN(x, '\\varsigma ', '&sigmaf;');
  ay.thetav = ay.vartheta = ay.thetasym = aN(x, '\\vartheta ', '&thetasym;');
  ay.upsilon = ay.upsi = aN(x, '\\upsilon ', '&upsilon;');
  ay.gammad = ay.Gammad = ay.digamma = aN(x, '\\digamma ', '&#989;');
  ay.kappav = ay.varkappa = aN(x, '\\varkappa ', '&#1008;');
  ay.rhov = ay.varrho = aN(x, '\\varrho ', '&#1009;');
  ay.pi = ay['\u03c0'] = aN(aI, '\\pi ', '&pi;');
  ay.lambda = aN(aI, '\\lambda ', '&lambda;');
  ay.Upsilon = ay.Upsi = ay.upsih = ay.Upsih = aN(
    H,
    '\\Upsilon ',
    '<var style="font-family: serif">&upsih;</var>'
  );
  ay.Gamma = ay.Delta = ay.Theta = ay.Lambda = ay.Xi = ay.Pi = ay.Sigma = ay.Phi = ay.Psi = ay.Omega = ay.forall = ah(
    ax,
    function (P, L) {
      P.init = function (R) {
        L.init.call(this, '\\' + R + ' ', '&' + R + ';');
      };
    }
  );
  var K = ah(aK, function (L) {
    L.init = function (P) {
      this.latex = P;
    };
    L.createLeftOf = function (R) {
      var P = aE.parse(this.latex);
      P.children().adopt(R.parent, R[ak], R[af]);
      R[ak] = P.ends[af];
      P.jQize().insertBefore(R.jQ);
      P.finalizeInsert(R.options, R);
      if (P.ends[af][af].siblingCreated) {
        P.ends[af][af].siblingCreated(R.options, ak);
      }
      if (P.ends[ak][ak].siblingCreated) {
        P.ends[ak][ak].siblingCreated(R.options, af);
      }
      R.parent.bubble('reflow');
    };
    L.parser = function () {
      var P = aE.parse(this.latex).children();
      return ad.succeed(P);
    };
  });
  ay['\u00b9'] = aN(K, '^1');
  ay['\u00b2'] = aN(K, '^2');
  ay['\u00b3'] = aN(K, '^3');
  ay['\u00bc'] = aN(K, '\\frac14');
  ay['\u00bd'] = aN(K, '\\frac12');
  ay['\u00be'] = aN(K, '\\frac34');
  var n = ah(ar, function (L) {
    L.init = ax.prototype.init;
    L.contactWeld = L.siblingCreated = L.siblingDeleted = function (R, P) {
      if (P === af) {
        return;
      }
      this.jQ[0].className =
        !this[ak] || this[ak] instanceof ar ? '' : 'mq-binary-operator';
      return this;
    };
  });
  ay['+'] = aN(n, '+', '+');
  ay['\u2013'] = ay['-'] = aN(n, '-', '&minus;');
  ay['\u00b1'] = ay.pm = ay.plusmn = ay.plusminus = aN(n, '\\pm ', '&plusmn;');
  ay.mp = ay.mnplus = ay.minusplus = aN(n, '\\mp ', '&#8723;');
  aL['*'] = ay.sdot = ay.cdot = aN(ar, '\\cdot ', '&middot;', '*');
  var m = ah(ar, function (P, L) {
    P.init = function (a0, R) {
      this.data = a0;
      this.strict = R;
      var aZ = R ? 'Strict' : '';
      L.init.call(this, a0['ctrlSeq' + aZ], a0['html' + aZ], a0['text' + aZ]);
    };
    P.swap = function (R) {
      this.strict = R;
      var aZ = R ? 'Strict' : '';
      this.ctrlSeq = this.data['ctrlSeq' + aZ];
      this.jQ.html(this.data['html' + aZ]);
      this.textTemplate = [this.data['text' + aZ]];
    };
    P.deleteTowards = function (R, aZ) {
      if (R === ak && !this.strict) {
        this.swap(true);
        this.bubble('reflow');
        return;
      }
      L.deleteTowards.apply(this, arguments);
    };
  });
  var Q = {
    ctrlSeq: '\\le ',
    html: '&le;',
    text: '\u2264',
    ctrlSeqStrict: '<',
    htmlStrict: '&lt;',
    textStrict: '<',
  };
  var y = {
    ctrlSeq: '\\ge ',
    html: '&ge;',
    text: '\u2265',
    ctrlSeqStrict: '>',
    htmlStrict: '&gt;',
    textStrict: '>',
  };
  ay['<'] = ay.lt = aN(m, Q, true);
  ay['>'] = ay.gt = aN(m, y, true);
  ay['\u2264'] = ay.le = ay.leq = aN(m, Q, false);
  ay['\u2265'] = ay.ge = ay.geq = aN(m, y, false);
  var e = ah(ar, function (P, L) {
    P.init = function () {
      L.init.call(this, '=', '=');
    };
    P.createLeftOf = function (R) {
      if (R[ak] instanceof m && R[ak].strict) {
        R[ak].swap(false);
        R[ak].bubble('reflow');
        return;
      }
      L.createLeftOf.apply(this, arguments);
    };
  });
  ay['='] = e;
  ay['\u00d7'] = ay.times = aN(ar, '\\times ', '&times;', '[x]');
  ay['\u00f7'] = ay.div = ay.divide = ay.divides = aN(
    ar,
    '\\div ',
    '&divide;',
    '[/]'
  );
  aL['~'] = ay.sim = aN(ar, '\\sim ', '~', '~');
  var aC,
    aj = az,
    v = document.createElement('div'),
    l = v.style,
    aq = {
      transform: 1,
      WebkitTransform: 1,
      MozTransform: 1,
      OTransform: 1,
      msTransform: 1,
    },
    g;
  for (var at in aq) {
    if (at in l) {
      g = at;
      break;
    }
  }
  if (g) {
    aC = function (P, L, R) {
      P.css(g, 'scale(' + L + ',' + R + ')');
    };
  } else {
    if ('filter' in l) {
      aj = function (L) {
        L.className = L.className;
      };
      aC = function (aZ, L, a1) {
        L /= 1 + (a1 - 1) / 2;
        aZ.css('fontSize', a1 + 'em');
        if (!aZ.hasClass('mq-matrixed-container')) {
          aZ.addClass('mq-matrixed-container').wrapInner(
            '<span class="mq-matrixed"></span>'
          );
        }
        var a0 = aZ
          .children()
          .css(
            'filter',
            'progid:DXImageTransform.Microsoft.Matrix(M11=' +
              L +
              ",SizingMethod='auto expand')"
          );
        function R() {
          aZ.css('marginRight', ((a0.width() - 1) * (L - 1)) / L + 'px');
        }
        R();
        var P = setInterval(R);
        aD(window).load(function () {
          clearTimeout(P);
          R();
        });
      };
    } else {
      aC = function (P, L, R) {
        P.css('fontSize', R + 'em');
      };
    }
  }
  var ab = ah(aK, function (P, L) {
    P.init = function (a0, aZ, R) {
      L.init.call(this, a0, '<' + aZ + ' ' + R + '>&0</' + aZ + '>');
    };
  });
  ay.mathrm = aN(ab, '\\mathrm', 'span', 'class="mq-roman mq-font"');
  ay.mathit = aN(ab, '\\mathit', 'i', 'class="mq-font"');
  ay.mathbf = aN(ab, '\\mathbf', 'b', 'class="mq-font"');
  ay.mathsf = aN(ab, '\\mathsf', 'span', 'class="mq-sans-serif mq-font"');
  ay.mathtt = aN(ab, '\\mathtt', 'span', 'class="mq-monospace mq-font"');
  ay.underline = aN(
    ab,
    '\\underline',
    'span',
    'class="mq-non-leaf mq-underline"'
  );
  ay.overline = ay.bar = aN(
    ab,
    '\\overline',
    'span',
    'class="mq-non-leaf mq-overline"'
  );
  ay.overrightarrow = aN(
    ab,
    '\\overrightarrow',
    'span',
    'class="mq-non-leaf mq-overarrow mq-arrow-right"'
  );
  ay.overleftarrow = aN(
    ab,
    '\\overleftarrow',
    'span',
    'class="mq-non-leaf mq-overarrow mq-arrow-left"'
  );
  var V = (ay.textcolor = ah(aK, function (P, L) {
    P.setColor = function (R) {
      this.color = R;
      this.htmlTemplate =
        '<span class="mq-textcolor" style="color:' + R + '">&0</span>';
    };
    P.latex = function () {
      return '\\textcolor{' + this.color + '}{' + this.blocks[0].latex() + '}';
    };
    P.parser = function () {
      var R = this;
      var a1 = ad.optWhitespace;
      var aZ = ad.string;
      var a0 = ad.regex;
      return a1
        .then(aZ('{'))
        .then(a0(/^[#\w\s.,()%-]*/))
        .skip(aZ('}'))
        .then(function (a2) {
          R.setColor(a2);
          return L.parser.call(R);
        });
    };
  }));
  var aM = (ay['class'] = ah(aK, function (P, L) {
    P.parser = function () {
      var R = this,
        aZ = ad.string,
        a0 = ad.regex;
      return ad.optWhitespace
        .then(aZ('{'))
        .then(a0(/^[-\w\s\\\xA0-\xFF]*/))
        .skip(aZ('}'))
        .then(function (a1) {
          R.htmlTemplate = '<span class="mq-class ' + a1 + '">&0</span>';
          return L.parser.call(R);
        });
    };
  }));
  var ao = ah(aK, function (P, L) {
    P.ctrlSeq = '_{...}^{...}';
    P.createLeftOf = function (R) {
      if (!R[ak] && R.options.supSubsRequireOperand) {
        return;
      }
      return L.createLeftOf.apply(this, arguments);
    };
    P.contactWeld = function (a4) {
      for (var aZ = ak; aZ; aZ = aZ === ak ? af : false) {
        if (this[aZ] instanceof ao) {
          for (var a1 = 'sub'; a1; a1 = a1 === 'sub' ? 'sup' : false) {
            var a3 = this[a1],
              R = this[aZ][a1];
            if (!a3) {
              continue;
            }
            if (!R) {
              this[aZ].addBlock(a3.disown());
            } else {
              if (!a3.isEmpty()) {
                a3.jQ.children().insAtDirEnd(-aZ, R.jQ);
                var a0 = a3.children().disown();
                var a2 = h(R, a0.ends[af], R.ends[ak]);
                if (aZ === ak) {
                  a0.adopt(R, R.ends[af], 0);
                } else {
                  a0.adopt(R, 0, R.ends[ak]);
                }
              } else {
                var a2 = h(R, 0, R.ends[ak]);
              }
            }
            this.placeCursor = (function (a5, a6) {
              return function (a7) {
                a7.insAtDirEnd(-aZ, a5 || a6);
              };
            })(R, a3);
          }
          this.remove();
          if (a4 && a4[ak] === this) {
            if (aZ === af && a2) {
              a2[ak] ? a4.insRightOf(a2[ak]) : a4.insAtLeftEnd(a2.parent);
            } else {
              a4.insRightOf(this[aZ]);
            }
          }
          break;
        }
      }
      this.respace();
    };
    F.p.charsThatBreakOutOfSupSub = '';
    P.finalizeTree = function () {
      this.ends[ak].write = function (a0, R) {
        if (a0.options.autoSubscriptNumerals && this === this.parent.sub) {
          if (R === '_') {
            return;
          }
          var aZ = this.chToCmd(R);
          if (aZ instanceof H) {
            a0.deleteSelection();
          } else {
            a0.clearSelection().insRightOf(this.parent);
          }
          return aZ.createLeftOf(a0.show());
        }
        if (
          a0[ak] &&
          !a0[af] &&
          !a0.selection &&
          a0.options.charsThatBreakOutOfSupSub.indexOf(R) > -1
        ) {
          a0.insRightOf(this.parent);
        }
        o.p.write.apply(this, arguments);
      };
    };
    P.moveTowards = function (R, a0, aZ) {
      if (a0.options.autoSubscriptNumerals && !this.sup) {
        a0.insDirOf(R, this);
      } else {
        L.moveTowards.apply(this, arguments);
      }
    };
    P.deleteTowards = function (R, a0) {
      if (a0.options.autoSubscriptNumerals && this.sub) {
        var aZ = this.sub.ends[-R];
        if (aZ instanceof H) {
          aZ.remove();
        } else {
          if (aZ) {
            aZ.deleteTowards(R, a0.insAtDirEnd(-R, this.sub));
          }
        }
        if (this.sub.isEmpty()) {
          this.sub.deleteOutOf(ak, a0.insAtLeftEnd(this.sub));
          if (this.sup) {
            a0.insDirOf(-R, this);
          }
        }
      } else {
        L.deleteTowards.apply(this, arguments);
      }
    };
    P.latex = function () {
      function R(a0, a1) {
        var aZ = a1 && a1.latex();
        return a1 ? a0 + (aZ.length === 1 ? aZ : '{' + (aZ || ' ') + '}') : '';
      }
      return R('_', this.sub) + R('^', this.sup);
    };
    P.respace = P.siblingCreated = P.siblingDeleted = function (aZ, R) {
      if (R === af) {
        return;
      }
      this.jQ.toggleClass('mq-limit', this[ak].ctrlSeq === '\\int ');
    };
    P.addBlock = function (aZ) {
      if (this.supsub === 'sub') {
        this.sup = this.upInto = this.sub.upOutOf = aZ;
        aZ.adopt(this, this.sub, 0).downOutOf = this.sub;
        aZ.jQ = aD('<span class="mq-sup"/>')
          .append(aZ.jQ.children())
          .attr(aG, aZ.id)
          .prependTo(this.jQ);
      } else {
        this.sub = this.downInto = this.sup.downOutOf = aZ;
        aZ.adopt(this, 0, this.sup).upOutOf = this.sup;
        aZ.jQ = aD('<span class="mq-sub"></span>')
          .append(aZ.jQ.children())
          .attr(aG, aZ.id)
          .appendTo(this.jQ.removeClass('mq-sup-only'));
        this.jQ.append(
          '<span style="display:inline-block;width:0">&#8203;</span>'
        );
      }
      for (var R = 0; R < 2; R += 1) {
        (function (a3, a0, a2, a1) {
          a3[a0].deleteOutOf = function (a5, a6) {
            a6.insDirOf(this[a5] ? -a5 : a5, this.parent);
            if (!this.isEmpty()) {
              var a4 = this.ends[a5];
              this.children()
                .disown()
                .withDirAdopt(a5, a6.parent, a6[a5], a6[-a5])
                .jQ.insDirOf(-a5, a6.jQ);
              a6[-a5] = a4;
            }
            a3.supsub = a2;
            delete a3[a0];
            delete a3[a1 + 'Into'];
            a3[a2][a1 + 'OutOf'] = N;
            delete a3[a2].deleteOutOf;
            if (a0 === 'sub') {
              aD(a3.jQ.addClass('mq-sup-only')[0].lastChild).remove();
            }
            this.remove();
          };
        })(
          this,
          'sub sup'.split(' ')[R],
          'sup sub'.split(' ')[R],
          'down up'.split(' ')[R]
        );
      }
    };
  });
  function N(R) {
    var L = this.parent,
      P = R;
    do {
      if (P[af]) {
        return R.insLeftOf(L);
      }
      P = P.parent.parent;
    } while (P !== L);
    R.insRightOf(L);
  }
  ay.subscript = ay._ = ah(ao, function (P, L) {
    P.supsub = 'sub';
    P.htmlTemplate =
      '<span class="mq-supsub mq-non-leaf"><span class="mq-sub">&0</span><span style="display:inline-block;width:0">&#8203;</span></span>';
    P.textTemplate = ['_'];
    P.finalizeTree = function () {
      this.downInto = this.sub = this.ends[ak];
      this.sub.upOutOf = N;
      L.finalizeTree.call(this);
    };
  });
  ay.superscript = ay.supscript = ay['^'] = ah(ao, function (P, L) {
    P.supsub = 'sup';
    P.htmlTemplate =
      '<span class="mq-supsub mq-non-leaf mq-sup-only"><span class="mq-sup">&0</span></span>';
    P.textTemplate = ['^'];
    P.finalizeTree = function () {
      this.upInto = this.sup = this.ends[af];
      this.sup.downOutOf = N;
      L.finalizeTree.call(this);
    };
  });
  var d = ah(aK, function (P, L) {
    P.init = function (aZ, R) {
      var a0 =
        '<span class="mq-large-operator mq-non-leaf"><span class="mq-to"><span>&1</span></span><big>' +
        R +
        '</big><span class="mq-from"><span>&0</span></span></span>';
      H.prototype.init.call(this, aZ, a0);
    };
    P.createLeftOf = function (R) {
      L.createLeftOf.apply(this, arguments);
      if (R.options.sumStartsWithNEquals) {
        t('n').createLeftOf(R);
        e().createLeftOf(R);
      }
    };
    P.latex = function () {
      function R(aZ) {
        return aZ.length === 1 ? aZ : '{' + (aZ || ' ') + '}';
      }
      return (
        this.ctrlSeq +
        '_' +
        R(this.ends[ak].latex()) +
        '^' +
        R(this.ends[af].latex())
      );
    };
    P.parser = function () {
      var aZ = ad.string;
      var a2 = ad.optWhitespace;
      var a1 = ad.succeed;
      var a4 = aE.block;
      var R = this;
      var a3 = (R.blocks = [o(), o()]);
      for (var a0 = 0; a0 < a3.length; a0 += 1) {
        a3[a0].adopt(R, R.ends[af], 0);
      }
      return a2
        .then(aZ('_').or(aZ('^')))
        .then(function (a5) {
          var a6 = a3[a5 === '_' ? 0 : 1];
          return a4.then(function (a7) {
            a7.children().adopt(a6, a6.ends[af], 0);
            return a1(R);
          });
        })
        .many()
        .result(R);
    };
    P.finalizeTree = function () {
      this.downInto = this.ends[ak];
      this.upInto = this.ends[af];
      this.ends[ak].upOutOf = this.ends[af];
      this.ends[af].downOutOf = this.ends[ak];
    };
  });
  ay['\u2211'] = ay.sum = ay.summation = aN(d, '\\sum ', '&sum;');
  ay['\u220f'] = ay.prod = ay.product = aN(d, '\\prod ', '&prod;');
  ay.coprod = ay.coproduct = aN(d, '\\coprod ', '&#8720;');
  var aP = (ay.frac = ay.dfrac = ay.cfrac = ay.fraction = ah(
    aK,
    function (P, L) {
      P.ctrlSeq = '\\frac';
      P.htmlTemplate =
        '<span class="mq-fraction mq-non-leaf"><span class="mq-numerator">&0</span><span class="mq-denominator">&1</span><span style="display:inline-block;width:0">&#8203;</span></span>';
      P.textTemplate = ['(', ')/(', ')'];
      P.finalizeTree = function () {
        this.upInto = this.ends[af].upOutOf = this.ends[ak];
        this.downInto = this.ends[ak].downOutOf = this.ends[af];
      };
    }
  ));
  var G = (ay.over = aL['/'] = ah(aP, function (P, L) {
    P.createLeftOf = function (aZ) {
      if (!this.replacedFragment) {
        var R = aZ[ak];
        while (
          R &&
          !(
            R instanceof ar ||
            R instanceof (ay.text || az) ||
            R instanceof d ||
            R.ctrlSeq === '\\ ' ||
            /^[,;:]$/.test(R.ctrlSeq)
          )
        ) {
          R = R[ak];
        }
        if (R instanceof d && R[af] instanceof ao) {
          R = R[af];
          if (R[af] instanceof ao && R[af].ctrlSeq != R.ctrlSeq) {
            R = R[af];
          }
        }
        if (R !== aZ[ak]) {
          this.replaces(A(R[af] || aZ.parent.ends[ak], aZ[ak]));
          aZ[ak] = R;
        }
      }
      L.createLeftOf.call(this, aZ);
    };
  }));
  var aX = (ay.sqrt = ay['\u221a'] = ah(aK, function (P, L) {
    P.ctrlSeq = '\\sqrt';
    P.htmlTemplate =
      '<span class="mq-non-leaf"><span class="mq-scaled mq-sqrt-prefix">&radic;</span><span class="mq-non-leaf mq-sqrt-stem">&0</span></span>';
    P.textTemplate = ['sqrt(', ')'];
    P.parser = function () {
      return aE.optBlock
        .then(function (R) {
          return aE.block.map(function (a0) {
            var aZ = am();
            aZ.blocks = [R, a0];
            R.adopt(aZ, 0, 0);
            a0.adopt(aZ, R, 0);
            return aZ;
          });
        })
        .or(L.parser.call(this));
    };
    P.reflow = function () {
      var R = this.ends[af].jQ;
      aC(R.prev(), 1, R.innerHeight() / +R.css('fontSize').slice(0, -2) - 0.1);
    };
  }));
  var O = (ay.vec = ah(aK, function (P, L) {
    P.ctrlSeq = '\\vec';
    P.htmlTemplate =
      '<span class="mq-non-leaf"><span class="mq-vector-prefix">&rarr;</span><span class="mq-vector-stem">&0</span></span>';
    P.textTemplate = ['vec(', ')'];
  }));
  var am = (ay.nthroot = ah(aX, function (P, L) {
    P.htmlTemplate =
      '<sup class="mq-nthroot mq-non-leaf">&0</sup><span class="mq-scaled"><span class="mq-sqrt-prefix mq-scaled">&radic;</span><span class="mq-sqrt-stem mq-non-leaf">&1</span></span>';
    P.textTemplate = ['sqrt[', '](', ')'];
    P.latex = function () {
      return (
        '\\sqrt[' + this.ends[ak].latex() + ']{' + this.ends[af].latex() + '}'
      );
    };
  }));
  function C(P, L) {
    P.jQadd = function () {
      L.jQadd.apply(this, arguments);
      this.delimjQs = this.jQ.children(':first').add(this.jQ.children(':last'));
      this.contentjQ = this.jQ.children(':eq(1)');
    };
    P.reflow = function () {
      var R =
        this.contentjQ.outerHeight() /
        parseFloat(this.contentjQ.css('fontSize'));
      aC(this.delimjQs, aQ(1 + 0.2 * (R - 1), 1.2), 1.2 * R);
    };
  }
  var aY = ah(ah(aK, C), function (P, L) {
    P.init = function (a0, aZ, a2, a1, R) {
      L.init.call(this, '\\left' + a1, B, [aZ, a2]);
      this.side = a0;
      this.sides = {};
      this.sides[ak] = { ch: aZ, ctrlSeq: a1 };
      this.sides[af] = { ch: a2, ctrlSeq: R };
    };
    P.numBlocks = function () {
      return 1;
    };
    P.html = function () {
      this.htmlTemplate =
        '<span class="mq-non-leaf"><span class="mq-scaled mq-paren' +
        (this.side === af ? ' mq-ghost' : '') +
        '">' +
        this.sides[ak].ch +
        '</span><span class="mq-non-leaf">&0</span><span class="mq-scaled mq-paren' +
        (this.side === ak ? ' mq-ghost' : '') +
        '">' +
        this.sides[af].ch +
        '</span></span>';
      return L.html.call(this);
    };
    P.latex = function () {
      return (
        '\\left' +
        this.sides[ak].ctrlSeq +
        this.ends[ak].latex() +
        '\\right' +
        this.sides[af].ctrlSeq
      );
    };
    P.oppBrack = function (a0, aZ, R) {
      return (
        aZ instanceof aY &&
        aZ.side &&
        aZ.side !== -R &&
        (this.sides[this.side].ch === '|' || aZ.side === -this.side) &&
        (!a0.restrictMismatchedBrackets ||
          aa[this.sides[this.side].ch] === aZ.sides[aZ.side].ch ||
          { '(': ']', '[': ')' }[this.sides[ak].ch] === aZ.sides[af].ch) &&
        aZ
      );
    };
    P.closeOpposing = function (R) {
      R.side = 0;
      R.sides[this.side] = this.sides[this.side];
      R.delimjQs
        .eq(this.side === ak ? 0 : 1)
        .removeClass('mq-ghost')
        .html(this.sides[this.side].ch);
    };
    P.createLeftOf = function (a1) {
      if (!this.replacedFragment) {
        var a0 = a1.options;
        var R =
          this.oppBrack(a0, a1[ak], ak) ||
          this.oppBrack(a0, a1[af], af) ||
          this.oppBrack(a0, a1.parent.parent);
      }
      if (R) {
        var aZ = (this.side = -R.side);
        this.closeOpposing(R);
        if (R === a1.parent.parent && a1[aZ]) {
          A(a1[aZ], a1.parent.ends[aZ], -aZ)
            .disown()
            .withDirAdopt(-aZ, R.parent, R, R[aZ])
            .jQ.insDirOf(aZ, R.jQ);
          R.bubble('reflow');
        }
      } else {
        (R = this), (aZ = R.side);
        if (R.replacedFragment) {
          R.side = 0;
        } else {
          if (a1[-aZ]) {
            R.replaces(A(a1[-aZ], a1.parent.ends[-aZ], aZ));
            a1[-aZ] = 0;
          }
        }
        L.createLeftOf.call(R, a1);
      }
      if (aZ === ak) {
        a1.insAtLeftEnd(R.ends[ak]);
      } else {
        a1.insRightOf(R);
      }
    };
    P.placeCursor = az;
    P.unwrap = function () {
      this.ends[ak]
        .children()
        .disown()
        .adopt(this.parent, this, this[af])
        .jQ.insertAfter(this.jQ);
      this.remove();
    };
    P.deleteSide = function (a4, a0, a6) {
      var a5 = this.parent,
        a1 = this[a4],
        a2 = a5.ends[a4];
      if (a4 === this.side) {
        this.unwrap();
        a1 ? a6.insDirOf(-a4, a1) : a6.insAtDirEnd(a4, a5);
        return;
      }
      var R = a6.options,
        aZ = !this.side;
      this.side = -a4;
      if (this.oppBrack(R, this.ends[ak].ends[this.side], a4)) {
        this.closeOpposing(this.ends[ak].ends[this.side]);
        var a3 = this.ends[ak].ends[a4];
        this.unwrap();
        if (a3.siblingCreated) {
          a3.siblingCreated(a6.options, a4);
        }
        a1 ? a6.insDirOf(-a4, a1) : a6.insAtDirEnd(a4, a5);
      } else {
        if (this.oppBrack(R, this.parent.parent, a4)) {
          this.parent.parent.closeOpposing(this);
          this.parent.parent.unwrap();
        } else {
          if (a0 && aZ) {
            this.unwrap();
            a1 ? a6.insDirOf(-a4, a1) : a6.insAtDirEnd(a4, a5);
            return;
          } else {
            this.sides[a4] = {
              ch: aa[this.sides[this.side].ch],
              ctrlSeq: aa[this.sides[this.side].ctrlSeq],
            };
            this.delimjQs
              .removeClass('mq-ghost')
              .eq(a4 === ak ? 0 : 1)
              .addClass('mq-ghost')
              .html(this.sides[a4].ch);
          }
        }
        if (a1) {
          var a3 = this.ends[ak].ends[a4];
          A(a1, a2, -a4)
            .disown()
            .withDirAdopt(-a4, this.ends[ak], a3, 0)
            .jQ.insAtDirEnd(a4, this.ends[ak].jQ.removeClass('mq-empty'));
          if (a3.siblingCreated) {
            a3.siblingCreated(a6.options, a4);
          }
          a6.insDirOf(-a4, a1);
        } else {
          a0 ? a6.insDirOf(a4, this) : a6.insAtDirEnd(a4, this.ends[ak]);
        }
      }
    };
    P.deleteTowards = function (R, aZ) {
      this.deleteSide(-R, false, aZ);
    };
    P.finalizeTree = function () {
      this.ends[ak].deleteOutOf = function (R, aZ) {
        this.parent.deleteSide(R, true, aZ);
      };
      this.finalizeTree = this.intentionalBlur = function () {
        this.delimjQs.eq(this.side === ak ? 1 : 0).removeClass('mq-ghost');
        this.side = 0;
      };
    };
    P.siblingCreated = function (aZ, R) {
      if (R === -this.side) {
        this.finalizeTree();
      }
    };
  });
  var aa = {
    '(': ')',
    ')': '(',
    '[': ']',
    ']': '[',
    '{': '}',
    '}': '{',
    '\\{': '\\}',
    '\\}': '\\{',
    '&lang;': '&rang;',
    '&rang;': '&lang;',
    '\\langle ': '\\rangle ',
    '\\rangle ': '\\langle ',
    '|': '|',
  };
  function E(P, R) {
    var R = R || P,
      aZ = aa[P],
      L = aa[R];
    aL[P] = aN(aY, ak, P, aZ, R, L);
    aL[aZ] = aN(aY, af, P, aZ, R, L);
  }
  E('(');
  E('[');
  E('{', '\\{');
  ay.langle = aN(aY, ak, '&lang;', '&rang;', '\\langle ', '\\rangle ');
  ay.rangle = aN(aY, af, '&lang;', '&rang;', '\\langle ', '\\rangle ');
  aL['|'] = aN(aY, ak, '|', '|', '|', '|');
  ay.left = ah(aK, function (L) {
    L.parser = function () {
      var R = ad.regex;
      var P = ad.string;
      var aZ = ad.succeed;
      var a0 = ad.optWhitespace;
      return a0.then(R(/^(?:[([|]|\\\{)/)).then(function (a2) {
        var a1 = a2.charAt(0) === '\\' ? a2.slice(1) : a2;
        return aE.then(function (a3) {
          return P('\\right')
            .skip(a0)
            .then(R(/^(?:[\])|]|\\\})/))
            .map(function (a4) {
              var a6 = a4.charAt(0) === '\\' ? a4.slice(1) : a4;
              var a5 = aY(0, a1, a6, a2, a4);
              a5.blocks = [a3];
              a3.adopt(a5, 0, 0);
              return a5;
            });
        });
      });
    };
  });
  ay.right = ah(aK, function (L) {
    L.parser = function () {
      return ad.fail('unmatched \\right');
    };
  });
  var ac = (ay.binom = ay.binomial = ah(ah(aK, C), function (P, L) {
    P.ctrlSeq = '\\binom';
    P.htmlTemplate =
      '<span class="mq-non-leaf"><span class="mq-paren mq-scaled">(</span><span class="mq-non-leaf"><span class="mq-array mq-non-leaf"><span>&0</span><span>&1</span></span></span><span class="mq-paren mq-scaled">)</span></span>';
    P.textTemplate = ['choose(', ',', ')'];
  }));
  var q = (ay.choose = ah(ac, function (L) {
    L.createLeftOf = G.prototype.createLeftOf;
  }));
  ay.editable = ay.MathQuillMathField = ah(aK, function (P, L) {
    P.ctrlSeq = '\\MathQuillMathField';
    P.htmlTemplate =
      '<span class="mq-editable-field"><span class="mq-root-block">&0</span></span>';
    P.parser = function () {
      var R = this,
        aZ = ad.string,
        a0 = ad.regex,
        a1 = ad.succeed;
      return aZ('[')
        .then(a0(/^[a-z][a-z0-9]*/i))
        .skip(aZ(']'))
        .map(function (a2) {
          R.name = a2;
        })
        .or(a1())
        .then(L.parser.call(R));
    };
    P.finalizeTree = function () {
      var R = M(this.ends[ak], this.jQ, F());
      R.KIND_OF_MQ = 'MathField';
      R.editable = true;
      R.createTextarea();
      R.editablesTextareaEvents();
      R.cursor.insAtRightEnd(R.root);
      aR(R.root);
    };
    P.registerInnerField = function (aZ, R) {
      aZ.push((aZ[this.name] = R(this.ends[ak].controller)));
    };
    P.latex = function () {
      return this.ends[ak].latex();
    };
    P.text = function () {
      return this.ends[ak].text();
    };
  });
  var aF = (ay.embed = ah(H, function (P, L) {
    P.setOptions = function (R) {
      function aZ() {
        return '';
      }
      this.text = R.text || aZ;
      this.htmlTemplate = R.htmlString || '';
      this.latex = R.latex || aZ;
      return this;
    };
    P.parser = function () {
      var R = this;
      (string = ad.string), (regex = ad.regex), (succeed = ad.succeed);
      return string('{')
        .then(regex(/^[a-z][a-z0-9]*/i))
        .skip(string('}'))
        .then(function (aZ) {
          return string('[')
            .then(regex(/^[-\w\s]*/))
            .skip(string(']'))
            .or(succeed())
            .map(function (a0) {
              return R.setOptions(S[aZ](a0));
            });
        });
    };
  }));
  var s = aV(1);
  for (var al in s) {
    (function (L, P) {
      if (typeof P === 'function') {
        D[L] = function () {
          r();
          return P.apply(this, arguments);
        };
        D[L].prototype = P.prototype;
      } else {
        D[L] = P;
      }
    })(al, s[al]);
  }
})();
Array.prototype.indexOf ||
  (Array.prototype.indexOf = function (i, h) {
    var g;
    if (null == this) {
      throw new TypeError('"this" is null or not defined');
    }
    var j = Object(this),
      f = j.length >>> 0;
    if (0 === f) {
      return -1;
    }
    g = +h || 0;
    Infinity === Math.abs(g) && (g = 0);
    if (g >= f) {
      return -1;
    }
    for (g = Math.max(0 <= g ? g : f - Math.abs(g), 0); g < f; ) {
      if (g in j && j[g] === i) {
        return g;
      }
      g++;
    }
    return -1;
  });
Array.prototype.lastIndexOf ||
  (Array.prototype.lastIndexOf = function (i, h) {
    var g;
    if (null == this) {
      throw new TypeError('"this" is null or not defined');
    }
    var j = Object(this),
      f = j.length >>> 0;
    if (0 === f) {
      return -1;
    }
    g = +h || 0;
    Infinity === Math.abs(g) && (g = 0);
    if (g >= f) {
      return -1;
    }
    for (g = Math.max(0 <= g ? g : f - Math.abs(g), 0); g < f; ) {
      if (g in j && j[g] === i) {
        return g;
      }
      g++;
    }
    return -1;
  });
Math.log10 ||
  (Math.log10 = function (a) {
    return Math.log(a) / Math.log(10);
  });
Math.log2 ||
  (Math.log2 = function (a) {
    return Math.log(a) / Math.log(2);
  });
Math.sign ||
  (Math.sign = function (a) {
    if (a > 0) {
      return 1;
    } else {
      if (a < 0) {
        return -1;
      }
    }
    return 0;
  });
var GET = function (d) {
  var a = null,
    e = [];
  location.search
    .substr(1)
    .split('&')
    .forEach(function (f) {
      e = f.split('=');
      if (e[0] === d) {
        a = decodeURIComponent(e[1]);
      }
    });
  return a;
};
(window.Modernizr = (function (ay, ax, aw) {
  function U(d) {
    ao.cssText = d;
  }
  function T(e, d) {
    return U(ak.join(e + ';') + (d || ''));
  }
  function S(e, d) {
    return typeof e === d;
  }
  function R(e, d) {
    return !!~('' + e).indexOf(d);
  }
  function Q(g, f) {
    for (var i in g) {
      var h = g[i];
      if (!R(h, '-') && ao[h] !== aw) {
        return f == 'pfx' ? h : !0;
      }
    }
    return !1;
  }
  function P(h, g, k) {
    for (var j in h) {
      var i = g[h[j]];
      if (i !== aw) {
        return k === !1 ? h[j] : S(i, 'function') ? i.bind(k || g) : i;
      }
    }
    return !1;
  }
  function O(g, f, j) {
    var i = g.charAt(0).toUpperCase() + g.slice(1),
      h = (g + ' ' + ai.join(i + ' ') + i).split(' ');
    return S(f, 'string') || S(f, 'undefined')
      ? Q(h, f)
      : ((h = (g + ' ' + ah.join(i + ' ') + i).split(' ')), P(h, f, j));
  }
  function N() {
    (au.input = (function (g) {
      for (var f = 0, a = g.length; f < a; f++) {
        ad[g[f]] = g[f] in an;
      }
      return (
        ad.list &&
          (ad.list =
            !!ax.createElement('datalist') && !!ay.HTMLDataListElement),
        ad
      );
    })(
      'autocomplete autofocus list placeholder max min multiple pattern required step'.split(
        ' '
      )
    )),
      (au.inputtypes = (function (g) {
        for (var n = 0, m, l, k, j = g.length; n < j; n++) {
          an.setAttribute('type', (l = g[n])),
            (m = an.type !== 'text'),
            m &&
              ((an.value = am),
              (an.style.cssText = 'position:absolute;visibility:hidden;'),
              /^range$/.test(l) && an.style.WebkitAppearance !== aw
                ? (ar.appendChild(an),
                  (k = ax.defaultView),
                  (m =
                    k.getComputedStyle &&
                    k.getComputedStyle(an, null).WebkitAppearance !==
                      'textfield' &&
                    an.offsetHeight !== 0),
                  ar.removeChild(an))
                : /^(search|tel)$/.test(l) ||
                  (/^(url|email)$/.test(l)
                    ? (m = an.checkValidity && an.checkValidity() === !1)
                    : (m = an.value != am))),
            (ae[g[n]] = !!m);
        }
        return ae;
      })(
        'search tel url email datetime date month week time datetime-local number range color'.split(
          ' '
        )
      ));
  }
  var av = '2.8.3',
    au = {},
    at = !0,
    ar = ax.documentElement,
    aq = 'modernizr',
    ap = ax.createElement(aq),
    ao = ap.style,
    an = ax.createElement('input'),
    am = ':)',
    al = {}.toString,
    ak = ' -webkit- -moz- -o- -ms- '.split(' '),
    aj = 'Webkit Moz O ms',
    ai = aj.split(' '),
    ah = aj.toLowerCase().split(' '),
    ag = { svg: 'http://www.w3.org/2000/svg' },
    af = {},
    ae = {},
    ad = {},
    ac = [],
    ab = ac.slice,
    aa,
    Z = function (w, v, u, t) {
      var s,
        r,
        q,
        p,
        o = ax.createElement('div'),
        h = ax.body,
        g = h || ax.createElement('body');
      if (parseInt(u, 10)) {
        while (u--) {
          (q = ax.createElement('div')),
            (q.id = t ? t[u] : aq + (u + 1)),
            o.appendChild(q);
        }
      }
      return (
        (s = ['&#173;', '<style id="s', aq, '">', w, '</style>'].join('')),
        (o.id = aq),
        ((h ? o : g).innerHTML += s),
        g.appendChild(o),
        h ||
          ((g.style.background = ''),
          (g.style.overflow = 'hidden'),
          (p = ar.style.overflow),
          (ar.style.overflow = 'hidden'),
          ar.appendChild(g)),
        (r = v(o, w)),
        h
          ? o.parentNode.removeChild(o)
          : (g.parentNode.removeChild(g), (ar.style.overflow = p)),
        !!r
      );
    },
    Y = function (a) {
      var f = ay.matchMedia || ay.msMatchMedia;
      if (f) {
        return (f(a) && f(a).matches) || !1;
      }
      var e;
      return (
        Z(
          '@media ' + a + ' { #' + aq + ' { position: absolute; } }',
          function (d) {
            e =
              (ay.getComputedStyle
                ? getComputedStyle(d, null)
                : d.currentStyle)['position'] == 'absolute';
          }
        ),
        e
      );
    },
    X = (function () {
      function f(h, g) {
        (g = g || ax.createElement(e[h] || 'div')), (h = 'on' + h);
        var a = h in g;
        return (
          a ||
            (g.setAttribute || (g = ax.createElement('div')),
            g.setAttribute &&
              g.removeAttribute &&
              (g.setAttribute(h, ''),
              (a = S(g[h], 'function')),
              S(g[h], 'undefined') || (g[h] = aw),
              g.removeAttribute(h))),
          (g = null),
          a
        );
      }
      var e = {
        select: 'input',
        change: 'input',
        submit: 'form',
        reset: 'form',
        error: 'img',
        load: 'img',
        abort: 'img',
      };
      return f;
    })(),
    W = {}.hasOwnProperty,
    V;
  !S(W, 'undefined') && !S(W.call, 'undefined')
    ? (V = function (e, d) {
        return W.call(e, d);
      })
    : (V = function (e, d) {
        return d in e && S(e.constructor.prototype[d], 'undefined');
      }),
    Function.prototype.bind ||
      (Function.prototype.bind = function (a) {
        var h = this;
        if (typeof h != 'function') {
          throw new TypeError();
        }
        var g = ab.call(arguments, 1),
          f = function () {
            if (this instanceof f) {
              var d = function () {};
              d.prototype = h.prototype;
              var i = new d(),
                e = h.apply(i, g.concat(ab.call(arguments)));
              return Object(e) === e ? e : i;
            }
            return h.apply(a, g.concat(ab.call(arguments)));
          };
        return f;
      }),
    (af.flexbox = function () {
      return O('flexWrap');
    }),
    (af.canvas = function () {
      var d = ax.createElement('canvas');
      return !!d.getContext && !!d.getContext('2d');
    }),
    (af.canvastext = function () {
      return (
        !!au.canvas &&
        !!S(ax.createElement('canvas').getContext('2d').fillText, 'function')
      );
    }),
    (af.webgl = function () {
      return !!ay.WebGLRenderingContext;
    }),
    (af.touch = function () {
      var a;
      return (
        'ontouchstart' in ay ||
        (ay.DocumentTouch && ax instanceof DocumentTouch)
          ? (a = !0)
          : Z(
              [
                '@media (',
                ak.join('touch-enabled),('),
                aq,
                ')',
                '{#modernizr{top:9px;position:absolute}}',
              ].join(''),
              function (d) {
                a = d.offsetTop === 9;
              }
            ),
        a
      );
    }),
    (af.geolocation = function () {
      return 'geolocation' in navigator;
    }),
    (af.postmessage = function () {
      return !!ay.postMessage;
    }),
    (af.websqldatabase = function () {
      return !!ay.openDatabase;
    }),
    (af.indexedDB = function () {
      return !!O('indexedDB', ay);
    }),
    (af.hashchange = function () {
      return (
        X('hashchange', ay) && (ax.documentMode === aw || ax.documentMode > 7)
      );
    }),
    (af.history = function () {
      return !!ay.history && !!history.pushState;
    }),
    (af.draganddrop = function () {
      var d = ax.createElement('div');
      return 'draggable' in d || ('ondragstart' in d && 'ondrop' in d);
    }),
    (af.websockets = function () {
      return 'WebSocket' in ay || 'MozWebSocket' in ay;
    }),
    (af.rgba = function () {
      return (
        U('background-color:rgba(150,255,150,.5)'),
        R(ao.backgroundColor, 'rgba')
      );
    }),
    (af.hsla = function () {
      return (
        U('background-color:hsla(120,40%,100%,.5)'),
        R(ao.backgroundColor, 'rgba') || R(ao.backgroundColor, 'hsla')
      );
    }),
    (af.multiplebgs = function () {
      return (
        U('background:url(https://),url(https://),red url(https://)'),
        /(url\s*\(.*?){3}/.test(ao.background)
      );
    }),
    (af.backgroundsize = function () {
      return O('backgroundSize');
    }),
    (af.borderimage = function () {
      return O('borderImage');
    }),
    (af.borderradius = function () {
      return O('borderRadius');
    }),
    (af.boxshadow = function () {
      return O('boxShadow');
    }),
    (af.textshadow = function () {
      return ax.createElement('div').style.textShadow === '';
    }),
    (af.opacity = function () {
      return T('opacity:.55'), /^0.55$/.test(ao.opacity);
    }),
    (af.cssanimations = function () {
      return O('animationName');
    }),
    (af.csscolumns = function () {
      return O('columnCount');
    }),
    (af.cssgradients = function () {
      var e = 'background-image:',
        d = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
        f = 'linear-gradient(left top,#9f9, white);';
      return (
        U(
          (e + '-webkit- '.split(' ').join(d + e) + ak.join(f + e)).slice(
            0,
            -e.length
          )
        ),
        R(ao.backgroundImage, 'gradient')
      );
    }),
    (af.cssreflections = function () {
      return O('boxReflect');
    }),
    (af.csstransforms = function () {
      return !!O('transform');
    }),
    (af.csstransforms3d = function () {
      var d = !!O('perspective');
      return (
        d &&
          'webkitPerspective' in ar.style &&
          Z(
            '@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}',
            function (a, e) {
              d = a.offsetLeft === 9 && a.offsetHeight === 3;
            }
          ),
        d
      );
    }),
    (af.csstransitions = function () {
      return O('transition');
    }),
    (af.fontface = function () {
      var d;
      return (
        Z(
          '@font-face {font-family:"font";src:url("https://")}',
          function (k, j) {
            var i = ax.getElementById('smodernizr'),
              h = i.sheet || i.styleSheet,
              a = h
                ? h.cssRules && h.cssRules[0]
                  ? h.cssRules[0].cssText
                  : h.cssText || ''
                : '';
            d = /src/i.test(a) && a.indexOf(j.split(' ')[0]) === 0;
          }
        ),
        d
      );
    }),
    (af.generatedcontent = function () {
      var d;
      return (
        Z(
          [
            '#',
            aq,
            '{font:0/0 a}#',
            aq,
            ':after{content:"',
            am,
            '";visibility:hidden;font:3px/1 a}',
          ].join(''),
          function (a) {
            d = a.offsetHeight >= 3;
          }
        ),
        d
      );
    }),
    (af.video = function () {
      var e = ax.createElement('video'),
        g = !1;
      try {
        if ((g = !!e.canPlayType)) {
          (g = new Boolean(g)),
            (g.ogg = e
              .canPlayType('video/ogg; codecs="theora"')
              .replace(/^no$/, '')),
            (g.h264 = e
              .canPlayType('video/mp4; codecs="avc1.42E01E"')
              .replace(/^no$/, '')),
            (g.webm = e
              .canPlayType('video/webm; codecs="vp8, vorbis"')
              .replace(/^no$/, ''));
        }
      } catch (f) {}
      return g;
    }),
    (af.audio = function () {
      var e = ax.createElement('audio'),
        g = !1;
      try {
        if ((g = !!e.canPlayType)) {
          (g = new Boolean(g)),
            (g.ogg = e
              .canPlayType('audio/ogg; codecs="vorbis"')
              .replace(/^no$/, '')),
            (g.mp3 = e.canPlayType('audio/mpeg;').replace(/^no$/, '')),
            (g.wav = e
              .canPlayType('audio/wav; codecs="1"')
              .replace(/^no$/, '')),
            (g.m4a = (
              e.canPlayType('audio/x-m4a;') || e.canPlayType('audio/aac;')
            ).replace(/^no$/, ''));
        }
      } catch (f) {}
      return g;
    }),
    (af.localstorage = function () {
      try {
        return localStorage.setItem(aq, aq), localStorage.removeItem(aq), !0;
      } catch (d) {
        return !1;
      }
    }),
    (af.sessionstorage = function () {
      try {
        return (
          sessionStorage.setItem(aq, aq), sessionStorage.removeItem(aq), !0
        );
      } catch (d) {
        return !1;
      }
    }),
    (af.webworkers = function () {
      return !!ay.Worker;
    }),
    (af.applicationcache = function () {
      return !!ay.applicationCache;
    }),
    (af.svg = function () {
      return (
        !!ax.createElementNS &&
        !!ax.createElementNS(ag.svg, 'svg').createSVGRect
      );
    }),
    (af.inlinesvg = function () {
      var d = ax.createElement('div');
      return (
        (d.innerHTML = '<svg/>'),
        (d.firstChild && d.firstChild.namespaceURI) == ag.svg
      );
    }),
    (af.smil = function () {
      return (
        !!ax.createElementNS &&
        /SVGAnimate/.test(al.call(ax.createElementNS(ag.svg, 'animate')))
      );
    }),
    (af.svgclippaths = function () {
      return (
        !!ax.createElementNS &&
        /SVGClipPath/.test(al.call(ax.createElementNS(ag.svg, 'clipPath')))
      );
    });
  for (var M in af) {
    V(af, M) &&
      ((aa = M.toLowerCase()),
      (au[aa] = af[M]()),
      ac.push((au[aa] ? '' : 'no-') + aa));
  }
  return (
    au.input || N(),
    (au.addTest = function (f, e) {
      if (typeof f == 'object') {
        for (var g in f) {
          V(f, g) && au.addTest(g, f[g]);
        }
      } else {
        f = f.toLowerCase();
        if (au[f] !== aw) {
          return au;
        }
        (e = typeof e == 'function' ? e() : e),
          typeof at != 'undefined' &&
            at &&
            (ar.className += ' ' + (e ? '' : 'no-') + f),
          (au[f] = e);
      }
      return au;
    }),
    U(''),
    (ap = an = null),
    (function (L, K) {
      function A(f, e) {
        var h = f.createElement('p'),
          g = f.getElementsByTagName('head')[0] || f.documentElement;
        return (
          (h.innerHTML = 'x<style>' + e + '</style>'),
          g.insertBefore(h.lastChild, g.firstChild)
        );
      }
      function z() {
        var d = t.elements;
        return typeof d == 'string' ? d.split(' ') : d;
      }
      function y(e) {
        var d = C[e[E]];
        return d || ((d = {}), D++, (e[E] = D), (C[D] = d)), d;
      }
      function x(e, i, h) {
        i || (i = K);
        if (B) {
          return i.createElement(e);
        }
        h || (h = y(i));
        var f;
        return (
          h.cache[e]
            ? (f = h.cache[e].cloneNode())
            : G.test(e)
            ? (f = (h.cache[e] = h.createElem(e)).cloneNode())
            : (f = h.createElem(e)),
          f.canHaveChildren && !H.test(e) && !f.tagUrn
            ? h.frag.appendChild(f)
            : f
        );
      }
      function w(h, m) {
        h || (h = K);
        if (B) {
          return h.createDocumentFragment();
        }
        m = m || y(h);
        var l = m.frag.cloneNode(),
          k = 0,
          j = z(),
          i = j.length;
        for (; k < i; k++) {
          l.createElement(j[k]);
        }
        return l;
      }
      function v(e, d) {
        d.cache ||
          ((d.cache = {}),
          (d.createElem = e.createElement),
          (d.createFrag = e.createDocumentFragment),
          (d.frag = d.createFrag())),
          (e.createElement = function (a) {
            return t.shivMethods ? x(a, e, d) : d.createElem(a);
          }),
          (e.createDocumentFragment = Function(
            'h,f',
            'return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(' +
              z()
                .join()
                .replace(/[\w\-]+/g, function (f) {
                  return (
                    d.createElem(f), d.frag.createElement(f), 'c("' + f + '")'
                  );
                }) +
              ');return n}'
          )(t, d.frag));
      }
      function u(d) {
        d || (d = K);
        var e = y(d);
        return (
          t.shivCSS &&
            !F &&
            !e.hasCSS &&
            (e.hasCSS = !!A(
              d,
              'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}'
            )),
          B || v(d, e),
          d
        );
      }
      var J = '3.7.0',
        I = L.html5 || {},
        H = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        G = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
        F,
        E = '_html5shiv',
        D = 0,
        C = {},
        B;
      (function () {
        try {
          var d = K.createElement('a');
          (d.innerHTML = '<xyz></xyz>'),
            (F = 'hidden' in d),
            (B =
              d.childNodes.length == 1 ||
              (function () {
                K.createElement('a');
                var f = K.createDocumentFragment();
                return (
                  typeof f.cloneNode == 'undefined' ||
                  typeof f.createDocumentFragment == 'undefined' ||
                  typeof f.createElement == 'undefined'
                );
              })());
        } catch (e) {
          (F = !0), (B = !0);
        }
      })();
      var t = {
        elements:
          I.elements ||
          'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',
        version: J,
        shivCSS: I.shivCSS !== !1,
        supportsUnknownElements: B,
        shivMethods: I.shivMethods !== !1,
        type: 'default',
        shivDocument: u,
        createElement: x,
        createDocumentFragment: w,
      };
      (L.html5 = t), u(K);
    })(this, ax),
    (au._version = av),
    (au._prefixes = ak),
    (au._domPrefixes = ah),
    (au._cssomPrefixes = ai),
    (au.mq = Y),
    (au.hasEvent = X),
    (au.testProp = function (d) {
      return Q([d]);
    }),
    (au.testAllProps = O),
    (au.testStyles = Z),
    (au.prefixed = function (e, d, f) {
      return d ? O(e, d, f) : O(e, 'pfx');
    }),
    (ar.className =
      ar.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +
      (at ? ' js ' + ac.join(' ') : '')),
    au
  );
})(this, this.document)),
  (function (ad, ac, ab) {
    function aa(d) {
      return '[object Function]' == P.call(d);
    }
    function Z(d) {
      return 'string' == typeof d;
    }
    function Y() {}
    function X(d) {
      return !d || 'loaded' == d || 'complete' == d || 'uninitialized' == d;
    }
    function W() {
      var d = O.shift();
      (M = 1),
        d
          ? d.t
            ? R(function () {
                ('c' == d.t
                  ? L.injectCss
                  : L.injectJs)(d.s, 0, d.a, d.x, d.e, 1);
              }, 0)
            : (d(), W())
          : (M = 0);
    }
    function V(x, w, v, t, s, q, p) {
      function n(a) {
        if (
          !h &&
          X(m.readyState) &&
          ((y.r = h = 1),
          !M && W(),
          (m.onload = m.onreadystatechange = null),
          a)
        ) {
          'img' != x &&
            R(function () {
              I.removeChild(m);
            }, 50);
          for (var e in D[w]) {
            D[w].hasOwnProperty(e) && D[w][e].onload();
          }
        }
      }
      var p = p || L.errorTimeout,
        m = ac.createElement(x),
        h = 0,
        g = 0,
        y = { t: v, s: w, e: s, a: q, x: p };
      1 === D[w] && ((g = 1), (D[w] = [])),
        'object' == x ? (m.data = w) : ((m.src = w), (m.type = x)),
        (m.width = m.height = '0'),
        (m.onerror = m.onload = m.onreadystatechange = function () {
          n.call(this, g);
        }),
        O.splice(t, 0, y),
        'img' != x &&
          (g || 2 === D[w]
            ? (I.insertBefore(m, J ? null : Q), R(n, p))
            : D[w].push(m));
    }
    function U(g, e, j, i, h) {
      return (
        (M = 0),
        (e = e || 'j'),
        Z(g)
          ? V('c' == e ? G : H, g, e, this.i++, j, i, h)
          : (O.splice(this.i++, 0, g), 1 == O.length && W()),
        this
      );
    }
    function T() {
      var d = L;
      return (d.loader = { load: U, i: 0 }), d;
    }
    var S = ac.documentElement,
      R = ad.setTimeout,
      Q = ac.getElementsByTagName('script')[0],
      P = {}.toString,
      O = [],
      M = 0,
      K = 'MozAppearance' in S.style,
      J = K && !!ac.createRange().compareNode,
      I = J ? S : Q.parentNode,
      S = ad.opera && '[object Opera]' == P.call(ad.opera),
      S = !!ac.attachEvent && !S,
      H = K ? 'object' : S ? 'script' : 'img',
      G = S ? 'script' : H,
      F =
        Array.isArray ||
        function (d) {
          return '[object Array]' == P.call(d);
        },
      E = [],
      D = {},
      C = {
        timeout: function (e, d) {
          return d.length && (e.timeout = d[0]), e;
        },
      },
      N,
      L;
    (L = function (f) {
      function d(i) {
        var i = i.split('!'),
          h = E.length,
          r = i.pop(),
          q = i.length,
          r = { url: r, origUrl: r, prefixes: i },
          p,
          l,
          j;
        for (l = 0; l < q; l++) {
          (j = i[l].split('=')), (p = C[j.shift()]) && (r = p(r, j));
        }
        for (l = 0; l < h; l++) {
          r = E[l](r);
        }
        return r;
      }
      function o(l, u, t, s, r) {
        var q = d(l),
          p = q.autoCallback;
        q.url.split('.').pop().split('?').shift(),
          q.bypass ||
            (u &&
              (u = aa(u)
                ? u
                : u[l] || u[s] || u[l.split('/').pop().split('?')[0]]),
            q.instead
              ? q.instead(l, u, t, s, r)
              : (D[q.url] ? (q.noexec = !0) : (D[q.url] = 1),
                t.load(
                  q.url,
                  q.forceCSS ||
                    (!q.forceJS &&
                      'css' == q.url.split('.').pop().split('?').shift())
                    ? 'c'
                    : ab,
                  q.noexec,
                  q.attrs,
                  q.timeout
                ),
                (aa(u) || aa(p)) &&
                  t.load(function () {
                    T(),
                      u && u(q.origUrl, r, s),
                      p && p(q.origUrl, r, s),
                      (D[q.url] = 2);
                  })));
      }
      function n(x, w) {
        function v(h, i) {
          if (h) {
            if (Z(h)) {
              i ||
                (s = function () {
                  var j = [].slice.call(arguments);
                  r.apply(this, j), q();
                }),
                o(h, s, w, 0, u);
            } else {
              if (Object(h) === h) {
                for (g in ((p = (function () {
                  var a = 0,
                    j;
                  for (j in h) {
                    h.hasOwnProperty(j) && a++;
                  }
                  return a;
                })()),
                h)) {
                  h.hasOwnProperty(g) &&
                    (!i &&
                      !--p &&
                      (aa(s)
                        ? (s = function () {
                            var j = [].slice.call(arguments);
                            r.apply(this, j), q();
                          })
                        : (s[g] = (function (j) {
                            return function () {
                              var a = [].slice.call(arguments);
                              j && j.apply(this, a), q();
                            };
                          })(r[g]))),
                    o(h[g], s, w, g, u));
                }
              }
            }
          } else {
            !i && q();
          }
        }
        var u = !!x.test,
          t = x.load || x.both,
          s = x.callback || Y,
          r = s,
          q = x.complete || Y,
          p,
          g;
        v(u ? x.yep : x.nope, !!t), t && v(t);
      }
      var m,
        k,
        e = this.yepnope.loader;
      if (Z(f)) {
        o(f, 0, e, 0);
      } else {
        if (F(f)) {
          for (m = 0; m < f.length; m++) {
            (k = f[m]),
              Z(k) ? o(k, 0, e, 0) : F(k) ? L(k) : Object(k) === k && n(k, e);
          }
        } else {
          Object(f) === f && n(f, e);
        }
      }
    }),
      (L.addPrefix = function (e, d) {
        C[e] = d;
      }),
      (L.addFilter = function (d) {
        E.push(d);
      }),
      (L.errorTimeout = 10000),
      null == ac.readyState &&
        ac.addEventListener &&
        ((ac.readyState = 'loading'),
        ac.addEventListener(
          'DOMContentLoaded',
          (N = function () {
            ac.removeEventListener('DOMContentLoaded', N, 0),
              (ac.readyState = 'complete');
          }),
          0
        )),
      (ad.yepnope = T()),
      (ad.yepnope.executeStack = W),
      (ad.yepnope.injectJs = function (s, r, q, p, n, m) {
        var h = ac.createElement('script'),
          g,
          f,
          p = p || L.errorTimeout;
        h.src = s;
        for (f in q) {
          h.setAttribute(f, q[f]);
        }
        (r = m ? W : r || Y),
          (h.onreadystatechange = h.onload = function () {
            !g &&
              X(h.readyState) &&
              ((g = 1), r(), (h.onload = h.onreadystatechange = null));
          }),
          R(function () {
            g || ((g = 1), r(1));
          }, p),
          n ? h.onload() : Q.parentNode.insertBefore(h, Q);
      }),
      (ad.yepnope.injectCss = function (f, o, n, m, l, k) {
        var m = ac.createElement('link'),
          h,
          o = k ? W : o || Y;
        (m.href = f), (m.rel = 'stylesheet'), (m.type = 'text/css');
        for (h in n) {
          m.setAttribute(h, n[h]);
        }
        l || (Q.parentNode.insertBefore(m, Q), R(o, 0));
      });
  })(this, document),
  (Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0));
  });

!(function (d) {
  d.matchMedia =
    d.matchMedia ||
    (function (h) {
      var g,
        l = h.documentElement,
        k = l.firstElementChild || l.firstChild,
        j = h.createElement('body'),
        i = h.createElement('div');
      return (
        (i.id = 'mq-test-1'),
        (i.style.cssText = 'position:absolute;top:-100em'),
        (j.style.background = 'none'),
        j.appendChild(i),
        function (e) {
          return (
            (i.innerHTML =
              '&shy;<style media="' +
              e +
              '"> #mq-test-1 { width: 42px; }</style>'),
            l.insertBefore(j, k),
            (g = 42 === i.offsetWidth),
            l.removeChild(j),
            { matches: g, media: e }
          );
        }
      );
    })(d.document);
})(this),
  (function (X) {
    function W() {
      C(!0);
    }
    var V = {};
    (X.respond = V), (V.update = function () {});
    var U = [],
      T = (function () {
        var a = !1;
        try {
          a = new X.XMLHttpRequest();
        } catch (d) {
          a = new X.ActiveXObject('Microsoft.XMLHTTP');
        }
        return function () {
          return a;
        };
      })(),
      S = function (e, d) {
        var f = T();
        f &&
          (f.open('GET', e, !0),
          (f.onreadystatechange = function () {
            4 !== f.readyState ||
              (200 !== f.status && 304 !== f.status) ||
              d(f.responseText);
          }),
          4 !== f.readyState && f.send(null));
      },
      R = function (d) {
        return d.replace(V.regex.minmaxwh, '').match(V.regex.other);
      };
    if (
      ((V.ajax = S),
      (V.queue = U),
      (V.unsupportedmq = R),
      (V.regex = {
        media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
        keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
        comments: /\/\*[^*]*\*+([^/][^*]*\*+)*\//gi,
        urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
        findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
        only: /(only\s+)?([a-zA-Z]+)\s?/,
        minw: /\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
        maxw: /\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
        minmaxwh: /\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,
        other: /\([^\)]*\)/g,
      }),
      (V.mediaQueriesSupported =
        X.matchMedia &&
        null !== X.matchMedia('only all') &&
        X.matchMedia('only all').matches),
      !V.mediaQueriesSupported)
    ) {
      var Q,
        P,
        O,
        N = X.document,
        M = N.documentElement,
        L = [],
        K = [],
        J = [],
        I = {},
        H = 30,
        G = N.getElementsByTagName('head')[0] || M,
        F = N.getElementsByTagName('base')[0],
        E = G.getElementsByTagName('link'),
        D = function () {
          var h,
            g = N.createElement('div'),
            l = N.body,
            k = M.style.fontSize,
            j = l && l.style.fontSize,
            i = !1;
          return (
            (g.style.cssText = 'position:absolute;font-size:1em;width:1em'),
            l ||
              ((l = i = N.createElement('body')),
              (l.style.background = 'none')),
            (M.style.fontSize = '100%'),
            (l.style.fontSize = '100%'),
            l.appendChild(g),
            i && M.insertBefore(l, M.firstChild),
            (h = g.offsetWidth),
            i ? M.removeChild(l) : l.removeChild(g),
            (M.style.fontSize = k),
            j && (l.style.fontSize = j),
            (h = O = parseFloat(h))
          );
        },
        C = function (ab) {
          var aa = 'clientWidth',
            Z = M[aa],
            Y = ('CSS1Compat' === N.compatMode && Z) || N.body[aa] || Z,
            v = {},
            u = E[E.length - 1],
            t = new Date().getTime();
          if (ab && Q && H > t - Q) {
            return X.clearTimeout(P), (P = X.setTimeout(C, H)), void 0;
          }
          Q = t;
          for (var m in L) {
            if (L.hasOwnProperty(m)) {
              var j = L[m],
                i = j.minw,
                h = j.maxw,
                a = null === i,
                r = null === h,
                q = 'em';
              i && (i = parseFloat(i) * (i.indexOf(q) > -1 ? O || D() : 1)),
                h && (h = parseFloat(h) * (h.indexOf(q) > -1 ? O || D() : 1)),
                (j.hasquery &&
                  ((a && r) || !(a || Y >= i) || !(r || h >= Y))) ||
                  (v[j.media] || (v[j.media] = []),
                  v[j.media].push(K[j.rules]));
            }
          }
          for (var o in J) {
            J.hasOwnProperty(o) &&
              J[o] &&
              J[o].parentNode === G &&
              G.removeChild(J[o]);
          }
          J.length = 0;
          for (var n in v) {
            if (v.hasOwnProperty(n)) {
              var l = N.createElement('style'),
                k = v[n].join('\n');
              (l.type = 'text/css'),
                (l.media = n),
                G.insertBefore(l, u.nextSibling),
                l.styleSheet
                  ? (l.styleSheet.cssText = k)
                  : l.appendChild(N.createTextNode(k)),
                J.push(l);
            }
          }
        },
        B = function (Z, Y, y) {
          var x = Z.replace(V.regex.comments, '')
              .replace(V.regex.keyframes, '')
              .match(V.regex.media),
            w = (x && x.length) || 0;
          Y = Y.substring(0, Y.lastIndexOf('/'));
          var v = function (d) {
              return d.replace(V.regex.urls, '$1' + Y + '$2$3');
            },
            u = !w && y;
          Y.length && (Y += '/'), u && (w = 1);
          for (var t = 0; w > t; t++) {
            var s, r, n, m;
            u
              ? ((s = y), K.push(v(Z)))
              : ((s = x[t].match(V.regex.findStyles) && RegExp.$1),
                K.push(RegExp.$2 && v(RegExp.$2))),
              (n = s.split(',')),
              (m = n.length);
            for (var g = 0; m > g; g++) {
              (r = n[g]),
                R(r) ||
                  L.push({
                    media:
                      (r.split('(')[0].match(V.regex.only) && RegExp.$2) ||
                      'all',
                    rules: K.length - 1,
                    hasquery: r.indexOf('(') > -1,
                    minw:
                      r.match(V.regex.minw) &&
                      parseFloat(RegExp.$1) + (RegExp.$2 || ''),
                    maxw:
                      r.match(V.regex.maxw) &&
                      parseFloat(RegExp.$1) + (RegExp.$2 || ''),
                  });
            }
          }
          C();
        },
        A = function () {
          if (U.length) {
            var a = U.shift();
            S(a.href, function (d) {
              B(d, a.href, a.media),
                (I[a.href] = !0),
                X.setTimeout(function () {
                  A();
                }, 0);
            });
          }
        },
        z = function () {
          for (var a = 0; a < E.length; a++) {
            var j = E[a],
              i = j.href,
              h = j.media,
              d = j.rel && 'stylesheet' === j.rel.toLowerCase();
            i &&
              d &&
              !I[i] &&
              (j.styleSheet && j.styleSheet.rawCssText
                ? (B(j.styleSheet.rawCssText, i, h), (I[i] = !0))
                : ((!/^([a-zA-Z:]*\/\/)/.test(i) && !F) ||
                    i.replace(RegExp.$1, '').split('/')[0] ===
                      X.location.host) &&
                  ('//' === i.substring(0, 2) && (i = X.location.protocol + i),
                  U.push({ href: i, media: h })));
          }
          A();
        };
      z(),
        (V.update = z),
        (V.getEmValue = D),
        X.addEventListener
          ? X.addEventListener('resize', W, !1)
          : X.attachEvent && X.attachEvent('onresize', W);
    }
  })(this);
var $ = jQuery;
var Calculator = new (function () {
  this.prevAns = [];
  this.history = [];
  this.funcs = {
    sf: function (e, d) {
      if (d === undefined) {
        if (e.constructor == SigNum) {
          return e.sf;
        } else {
          return Infinity;
        }
      } else {
        if (e.constructor == SigNum) {
          return new SigNum(e.value, d);
        } else {
          if (typeof e == 'number') {
            return new SigNum(e, d);
          } else {
            return NaN;
          }
        }
      }
    },
    pow: function (e, d) {
      return SigNum.pow(e, d);
    },
    max: function (e, d) {
      return SigNum.max(e, d);
    },
    min: function (e, d) {
      return SigNum.min(e, d);
    },
    abs: function (e, d) {
      return SigNum.abs(e, d);
    },
    log: function (e, d) {
      if (d === undefined) {
        return SigNum.log10(e);
      } else {
        return SigNum.log2(e) / SigNum.log2(d);
      }
    },
    sqrt: function (d) {
      return SigNum.sqrt(d);
    },
    cbrt: function (d) {
      return SigNum.cbrt(d);
    },
    floor: function (d) {
      return SigNum.floor(d);
    },
    ceil: function (d) {
      return SigNum.ceil(d);
    },
    trunc: function (d) {
      return SigNum.trunc(d);
    },
    round: function (d) {
      return SigNum.round(d);
    },
    sin: function (d) {
      return SigNum.sin(d);
    },
    cos: function (d) {
      return SigNum.cos(d);
    },
    tan: function (d) {
      return SigNum.tan(d);
    },
    sinh: function (d) {
      return SigNum.sinh(d);
    },
    cosh: function (d) {
      return SigNum.cosh(d);
    },
    tanh: function (d) {
      return SigNum.tanh(d);
    },
    asin: function (d) {
      return SigNum.asin(d);
    },
    acos: function (d) {
      return SigNum.acos(d);
    },
    atan: function (d) {
      return SigNum.atan(d);
    },
    asinh: function (d) {
      return SigNum.asinh(d);
    },
    acosh: function (d) {
      return SigNum.acosh(d);
    },
    atanh: function (d) {
      return SigNum.atanh(d);
    },
    sign: function (d) {
      return SigNum.sign(d);
    },
    ka: function (d) {
      return Calculator.funcs.Ka(d);
    },
    Ka: function (d) {
      return Calculator.data.ka[
        d.toString().replace('_', '').replace('{', '').replace('}', '')
      ];
    },
    pka: function (d) {
      return Calculator.funcs.pKa(d);
    },
    pKa: function (d) {
      return -SigNum.log10(
        Calculator.data.ka[
          d.toString().replace('_', '').replace('{', '').replace('}', '')
        ]
      );
    },
    kb: function (d) {
      return Calculator.funcs.Kb(b);
    },
    Kb: function (a) {
      return Calculator.data.kb[
        a.toString().replace('_', '').replace('{', '').replace('}', '')
      ];
    },
    pkb: function (a) {
      return Calculator.funcs.pKb(a);
    },
    pKb: function (a) {
      return -SigNum.log10(
        Calculator.data.kb[
          a.toString().replace('_', '').replace('{', '').replace('}', '')
        ]
      );
    },
    ksp: function (a) {
      return Calculator.funcs.Ksp(a);
    },
    Ksp: function (a) {
      return Calculator.data.ksp[
        a.toString().replace('_', '').replace('{', '').replace('}', '')
      ];
    },
    isacid: function (d) {
      var f = Calculator.data.ka[d.toString()];
      var e = Calculator.data.kb[d.toString()];
      return (e == null && f != null) || f > e;
    },
    elemmass: function (a) {
      return Calculator.data.mass[a.toString()];
    },
    molmass: function (g) {
      var f = Calculator.tokenizeChemFormula(g);
      var e = new SigNum(0, Infinity);
      for (var d = 0; d < f.length; ++d) {
        var a = f[d];
        if (a.type == 'element') {
          e = e.plus(Calculator.data.mass[a.name].times(new SigNum(a.count)));
        } else {
          if (a.type == 'polyatomic') {
            e = e.plus(
              Calculator.funcs.molmass(a.name).times(new SigNum(a.count))
            );
          }
        }
      }
      return e;
    },
    charge: function (e) {
      e = e.replace('_', '').replace('{', '').replace('}', '');
      var a = Calculator.data.symbols.indexOf(e);
      var d;
      if (a >= 0) {
        d = Calculator.data.charges[a];
      } else {
        d = Calculator.data.polycharges[e];
      }
      if (d == null || d == undefined) {
        return null;
      }
      if (d.length == 1) {
        d = d[0];
      }
      return d;
    },
    soluble: function (j) {
      j = j
        .replace('\\left', '')
        .replace('\\right', '')
        .replace('_', '')
        .replace('{', '')
        .replace('}', '');
      var k = Calculator.tokenizeChemFormula(j);
      if (k.length < 2) {
        return 'unknown';
      }
      var i = k[0].name;
      var h = k[1].name;
      var a = k[0].count;
      var o = k[1].count;
      if (k.length > 2) {
        i = '';
        h = '';
        var e = 0;
        if (j[0] == '(') {
          e = j.indexOf(')') + 1;
          i = j.substring(1, e - 1);
        } else {
          for (var d in Calculator.data.polycharges) {
            if (j.length >= d.length && j.substring(0, d.length) == d) {
              i = d;
              e = d.length;
              break;
            }
          }
          if (i == '') {
            i = j[0];
            ++e;
            while (j[e] >= 'a' && j[e] <= 'z') {
              i += j[e];
              ++e;
            }
          }
        }
        a = null;
        while (j[e] >= '0' && j[e] <= '9') {
          if (a == null) {
            a = 0;
          }
          a = a * 10 + Number(j[e]);
          ++e;
        }
        if (a == null) {
          a = 1;
        }
        j = j.substring(e);
        e = 0;
        if (j[0] == '(') {
          e = j.indexOf(')') + 1;
          h = j.substring(1, e - 1);
        } else {
          for (var d in Calculator.data.polycharges) {
            if (j.length >= d.length && j.substring(0, d.length) == d) {
              h = d;
              e = d.length;
              break;
            }
          }
          if (h == '') {
            h = j[0];
            ++e;
            while (j[e] >= 'a' && j[e] <= 'z') {
              h += j[e];
              ++e;
            }
          }
        }
        o = null;
        while (j[e] >= '0' && j[e] <= '9') {
          if (o == null) {
            o = 0;
          }
          o = o * 10 + number(j[e]);
          ++e;
        }
        if (o == null) {
          o = 1;
        }
      }
      var n = Calculator.funcs.charge(i);
      var m = Calculator.funcs.charge(h);
      if (n.constructor != Array) {
        n = [n];
      }
      if (m.constructor != Array) {
        m = [m];
      }
      if (n.length == 0 || m.length == 0 || (n.length > 1 && m.length > 1)) {
        return 'unknown';
      }
      var g = n[0] + 0;
      var f = m[0] + 0;
      if (n.length > 1 && m.length == 1) {
        g = (-f * o) / a;
      } else {
        if (n.length == 1 && m.length > 1) {
          f = (-g * a) / o;
        }
      }
      if (g % 1 > 1e-256 || f % 1 > 1e-256) {
        return 'unknown';
      }
      if (
        ['Li', 'Na', 'K', 'Rb', 'Cs', 'Fr', 'H', 'NH4'].indexOf(i) != -1 ||
        ['NO3', 'ClO3', 'ClO4'].indexOf(h) != -1
      ) {
        return true;
      } else {
        if (['Cl', 'Br', 'I'].indexOf(h) != -1) {
          if (i == 'Ag' || (i == 'Pb' && g == 2) || (i == 'Cu' && g == 1)) {
            return false;
          } else {
            return true;
          }
        } else {
          if (h == 'SO4') {
            if (
              ['Ag', 'Ca', 'Sr', 'Ba'].indexOf(i) != -1 ||
              (i == 'Pb' && g == 2)
            ) {
              return false;
            } else {
              return true;
            }
          } else {
            if (h == 'S') {
              if (['Be', 'Mg', 'Ca', 'Sr', 'Ba'].indexOf(i) != -1) {
                return true;
              } else {
                return false;
              }
            } else {
              if (h == 'OH') {
                if (i == 'Sr') {
                  return true;
                } else {
                  return false;
                }
              } else {
                if (['PO4', 'CO3', 'SO3', 'Cr2O7'].indexOf(h) != -1) {
                  return false;
                }
              }
            }
          }
        }
      }
      return 'unknown';
    },
    balance: function (a) {
      return Calculator.Balance.balance(a.toString());
    },
    random: function (e, d) {
      if (d === undefined) {
        if (e === undefined) {
          return SigNum.random();
        } else {
          return SigNum.random() * e;
        }
      } else {
        return SigNum.random() * (d - e) + e;
      }
    },
    qdtc: function (e, d, f) {
      if (e.constructor != SigNum) {
        e = new SigNum(e);
      }
      if (d.constructor != SigNum) {
        d = new SigNum(d);
      }
      if (f.constructor != SigNum) {
        f = new SigNum(f);
      }
      if (d.times(d) - e.times(f).times(4) > 0) {
        return [
          new SigNum(
            d.times(-1).plus(SigNum.sqrt(d.times(d) - e.times(f).times(4))) /
              e.times(2),
            Math.min(Math.min(e.sf, d.sf), f.sf)
          ),
          new SigNum(
            d.times(-1).minus(SigNum.sqrt(d.times(d) - e.times(f).times(4))) /
              e.times(2),
            Math.min(Math.min(e.sf, d.sf), f.sf)
          ),
        ];
      } else {
        if (d.times(d) - e.times(f).times(4).value == 0) {
          return new SigNum(
            d.times(-1).plus(SigNum.sqrt(d.times(d) - e.times(f).times(4))) /
              e.times(2),
            Math.min(Math.min(e.sf, d.sf), f.sf)
          );
        } else {
          return undefined;
        }
      }
    },
    qdtcp: function (e, d, f) {
      if (e.constructor != SigNum) {
        e = new SigNum(e);
      }
      if (d.constructor != SigNum) {
        d = new SigNum(d);
      }
      if (f.constructor != SigNum) {
        f = new SigNum(f);
      }
      return new SigNum(
        d.times(-1).plus(SigNum.sqrt(d.times(d) - e.times(f).times(4))) /
          e.times(2),
        Math.min(Math.min(e.sf, d.sf), f.sf)
      );
    },
    qdtcn: function (e, d, f) {
      if (e.constructor != SigNum) {
        e = new SigNum(e);
      }
      if (d.constructor != SigNum) {
        d = new SigNum(d);
      }
      if (f.constructor != SigNum) {
        f = new SigNum(f);
      }
      return new SigNum(
        d.times(-1).minus(SigNum.sqrt(d.times(d) - e.times(f).times(4))) /
          e.times(2),
        Math.min(Math.min(e.sf, d.sf), f.sf)
      );
    },
    qdtcacid: function (e, d) {
      if (e.constructor != SigNum) {
        e = new SigNum(e);
      }
      if (d.constructor != SigNum) {
        d = new SigNum(d);
      }
      if (c.constructor != SigNum) {
        c = new SigNum(c);
      }
      return qdtcp(1, e, e.times(d).times(-1));
    },
  };
  this.vars = { A: new SigNum(6.022140857e23, 10), Kw: new SigNum(1e-14, 4) };
  this.data = new (function () {
    this.symbols = [
      'H',
      'He',
      'Li',
      'Be',
      'B',
      'C',
      'N',
      'O',
      'F',
      'Ne',
      'Na',
      'Mg',
      'Al',
      'Si',
      'P',
      'S',
      'Cl',
      'Ar',
      'K',
      'Ca',
      'Sc',
      'Ti',
      'V',
      'Cr',
      'Mn',
      'Fe',
      'Co',
      'Ni',
      'Cu',
      'Zn',
      'Ga',
      'Ge',
      'As',
      'Se',
      'Br',
      'Kr',
      'Rb',
      'Sr',
      'Y',
      'Zr',
      'Nb',
      'Mo',
      'Tc',
      'Ru',
      'Rh',
      'Pd',
      'Ag',
      'Cd',
      'In',
      'Sn',
      'Sb',
      'Te',
      'I',
      'Xe',
      'Cs',
      'Ba',
      'La',
      'Ce',
      'Pr',
      'Nd',
      'Pm',
      'Sm',
      'Eu',
      'Gd',
      'Tb',
      'Dy',
      'Ho',
      'Er',
      'Tm',
      'Yb',
      'Lu',
      'Hf',
      'Ta',
      'W',
      'Re',
      'Os',
      'Ir',
      'Pt',
      'Au',
      'Hg',
      'Tl',
      'Pb',
      'Bi',
      'Po',
      'At',
      'Rn',
      'Fr',
      'Ra',
      'Ac',
      'Th',
      'Pa',
      'U',
      'Np',
      'Pu',
      'Am',
      'Cm',
      'Bk',
      'Cf',
      'Es',
      'Fm',
      'Md',
      'No',
      'Lr',
      'Rf',
      'Db',
      'Sg',
      'Bh',
      'Hs',
      'Mt',
      'Ds',
      'Rg',
      'Cn',
      'Uut',
      'Fl',
      'Uup',
      'Lv',
      'Uus',
      'Uuo',
    ];
    this.ka = {
      HClO4: new SigNum(Infinity),
      HI: new SigNum(Infinity),
      HBr: new SigNum(Infinity),
      HCl: new SigNum(Infinity),
      HNO3: new SigNum(Infinity),
      H2SO4: new SigNum(Infinity),
      H3O: new SigNum(1, 2),
      HIO3: new SigNum(0.17, 2),
      H2C2O4: new SigNum(0.059, 2),
      H2SO3: new SigNum(0.015, 2),
      HSO4: new SigNum(0.012, 2),
      H3PO4: new SigNum(0.0075, 2),
      'Fe(H2O)6': new SigNum(0.006, 2),
      H3C6H5O7: new SigNum(0.00071, 2),
      HNO2: new SigNum(0.00046, 2),
      HF: new SigNum(0.00035, 2),
      HCOOH: new SigNum(0.00018, 2),
      'Cr(H2O)6': new SigNum(0.00015, 2),
      C6H5COOH: new SigNum(0.000065, 2),
      HC2O4: new SigNum(0.000064, 2),
      CH3COOH: new SigNum(0.000018, 2),
      H2C6H5O7: new SigNum(0.000017, 2),
      'Al(H2O)6': new SigNum(0.000014, 2),
      H2CO3: new SigNum(4.3e-7, 2),
      HC6H5O7: new SigNum(4.1e-7, 2),
      HSO3: new SigNum(1e-7, 2),
      H2S: new SigNum(9.1e-8, 2),
      H2PO4: new SigNum(6.2e-8, 2),
      H3BO3: new SigNum(7.3e-10, 2),
      NH4: new SigNum(5.6e-10, 2),
      HCN: new SigNum(4.9e-10, 2),
      C6H5OH: new SigNum(1.3e-10, 2),
      HCO3: new SigNum(5.6e-11, 2),
      H2O2: new SigNum(2.4e-12, 2),
      HPO4: new SigNum(2.2e-13, 2),
      H2O: new SigNum(1e-14, 2),
      OH: new SigNum(0),
      NH3: new SigNum(0),
    };
    this.kb = {
      'NH2-': new SigNum(Infinity),
      O: new SigNum(Infinity),
      OH: new SigNum(1, 2),
      PO4: new SigNum(0.045, 2),
      HO2: new SigNum(0.0042, 2),
      CO3: new SigNum(0.00018, 2),
      C6H5O: new SigNum(0.000077, 2),
      CN: new SigNum(0.00002, 2),
      NH3: new SigNum(0.000018, 2),
      H2BO3: new SigNum(0.000014, 2),
      HPO4: new SigNum(1.6e-7, 2),
      HS: new SigNum(1.1e-7, 2),
      SO3: new SigNum(1e-7, 2),
      C6H5O7: new SigNum(2.4e-8, 2),
      HCO3: new SigNum(2.3e-8, 2),
      'Al(H2O)5(OH)': new SigNum(7.1e-10, 2),
      HC6H5O7: new SigNum(5.9e-10, 2),
      CH3COO: new SigNum(5.6e-10, 2),
      C2O4: new SigNum(1.6e-10, 2),
      C6H5COO: new SigNum(1.5e-10, 2),
      'Cr(H2O)5(OH)': new SigNum(6.7e-11, 2),
      HCOO: new SigNum(5.6e-11, 2),
      F: new SigNum(2.9e-11, 2),
      NO2: new SigNum(2.2e-11, 2),
      H2C6H5O7: new SigNum(1.4e-11, 2),
      'Fe(H2O)5(OH)': new SigNum(1.7e-12, 2),
      H2PO4: new SigNum(1.3e-12, 2),
      SO4: new SigNum(8.3e-13, 2),
      HSO3: new SigNum(6.7e-13, 2),
      HC2O4: new SigNum(1.7e-13, 2),
      IO3: new SigNum(5.9e-14, 2),
      H2O: new SigNum(1e-14, 2),
      HClO4: new SigNum(0),
      HI: new SigNum(0),
      HBr: new SigNum(0),
      HCl: new SigNum(0),
      HNO3: new SigNum(0),
      H2SO4: new SigNum(0),
      HSO4: new SigNum(0),
    };
    this.ksp = {
      BaCO3: new SigNum(2.6e-9, 2),
      BaCrO4: new SigNum(1.2e-10, 2),
      BaSO4: new SigNum(1.1e-10, 2),
      CaCO3: new SigNum(5e-9, 2),
      CaC2O4: new SigNum(2.3e-9, 2),
      CaSO4: new SigNum(0.000071, 2),
      CuI: new SigNum(1.3e-12, 2),
      'Cu(IO3)2': new SigNum(6.9e-8, 2),
      CuS: new SigNum(6e-37, 2),
      'Fe(OH)2': new SigNum(4.9e-17, 2),
      FeS: new SigNum(6e-19, 2),
      'Fe(OH)3': new SigNum(2.6e-39, 2),
      PbBr2: new SigNum(0.0000066, 2),
      PbCl2: new SigNum(0.000012, 2),
      'Pb(IO3)2': new SigNum(3.7e-13, 2),
      PbI2: new SigNum(8.5e-9, 2),
      PbSO4: new SigNum(1.8e-8, 2),
      MgCO3: new SigNum(0.0000068, 2),
      'Mg(OH)2': new SigNum(5.6e-12, 2),
      AgBrO3: new SigNum(0.000053, 2),
      AgBr: new SigNum(5.4e-13, 2),
      Ag2CO3: new SigNum(8.5e-12, 2),
      AgCl: new SigNum(1.8e-10, 2),
      Ag2CrO4: new SigNum(1.1e-12, 2),
      AgIO3: new SigNum(3.2e-8, 2),
      AgI: new SigNum(8.5e-17, 2),
      SrCO3: new SigNum(5.6e-10, 2),
      SrF2: new SigNum(4.3e-9, 2),
      SrSO4: new SigNum(3.4e-7, 2),
      ZnS: new SigNum(2e-25, 2),
    };
    this.mass = {
      H: new SigNum('1.008'),
      He: new SigNum('4.00'),
      Li: new SigNum('6.94'),
      Be: new SigNum('9.01'),
      B: new SigNum('10.8'),
      C: new SigNum('12.01'),
      N: new SigNum('14.01'),
      O: new SigNum('16.00'),
      F: new SigNum('19.0'),
      Ne: new SigNum('20.2'),
      Na: new SigNum('23.0'),
      Mg: new SigNum('24.3'),
      Al: new SigNum('27.0'),
      Si: new SigNum('28.1'),
      P: new SigNum('31.0'),
      S: new SigNum('32.1'),
      Cl: new SigNum('35.5'),
      Ar: new SigNum('39.9'),
      K: new SigNum('39.1'),
      Ca: new SigNum('40.1'),
      Sc: new SigNum('45.0'),
      Ti: new SigNum('47.9'),
      V: new SigNum('50.9'),
      Cr: new SigNum('52.0'),
      Mn: new SigNum('54.9'),
      Fe: new SigNum('55.8'),
      Co: new SigNum('58.9'),
      Ni: new SigNum('58.7'),
      Cu: new SigNum('63.5'),
      Zn: new SigNum('65.4'),
      Ga: new SigNum('69.7'),
      Ge: new SigNum('72.6'),
      As: new SigNum('74.9'),
      Se: new SigNum('79.0'),
      Br: new SigNum('79.9'),
      Kr: new SigNum('83.8'),
      Rb: new SigNum('85.5'),
      Sr: new SigNum('87.6'),
      Y: new SigNum('88.9'),
      Zr: new SigNum('91.2'),
      Nb: new SigNum('92.9'),
      Mo: new SigNum('95.9'),
      Tc: new SigNum('99'),
      Ru: new SigNum('101.1'),
      Rh: new SigNum('102.9'),
      Pd: new SigNum('106.4'),
      Ag: new SigNum('107.9'),
      Cd: new SigNum('112.4'),
      In: new SigNum('114.8'),
      Sn: new SigNum('118.7'),
      Sb: new SigNum('121.8'),
      Te: new SigNum('127.6'),
      I: new SigNum('126.9'),
      Xe: new SigNum('131.3'),
      Cs: new SigNum('132.9'),
      Ba: new SigNum('137.3'),
      La: new SigNum('138.9'),
      Ce: new SigNum('140.1'),
      Pr: new SigNum('140.9'),
      Nd: new SigNum('144.2'),
      Pm: new SigNum('147'),
      Sm: new SigNum('150.4'),
      Eu: new SigNum('152.0'),
      Gd: new SigNum('157.3'),
      Tb: new SigNum('158.9'),
      Dy: new SigNum('162.5'),
      Ho: new SigNum('164.9'),
      Er: new SigNum('167.3'),
      Tm: new SigNum('168.9'),
      Yb: new SigNum('173.0'),
      Lu: new SigNum('175.0'),
      Hf: new SigNum('178.5'),
      Ta: new SigNum('180.9'),
      W: new SigNum('183.9'),
      Re: new SigNum('186.2'),
      Os: new SigNum('190.2'),
      Ir: new SigNum('192.2'),
      Pt: new SigNum('195.1'),
      Au: new SigNum('197.0'),
      Hg: new SigNum('200.6'),
      Tl: new SigNum('204.4'),
      Pb: new SigNum('207.2'),
      Bi: new SigNum('209.0'),
      Po: new SigNum('209'),
      At: new SigNum('210'),
      Rn: new SigNum('222'),
      Fr: new SigNum('223'),
      Ra: new SigNum('226'),
      Ac: new SigNum('227'),
      Th: new SigNum('232.0'),
      Pa: new SigNum('231'),
      U: new SigNum('238.0'),
      Np: new SigNum('237'),
      Pu: new SigNum('242'),
      Am: new SigNum('243'),
      Cm: new SigNum('247'),
      Bk: new SigNum('245'),
      Cf: new SigNum('251'),
      Es: new SigNum('254'),
      Fm: new SigNum('253'),
      Md: new SigNum('254'),
      No: new SigNum('254'),
      Lr: new SigNum('257'),
      Lw: new SigNum('257'),
      Rf: new SigNum('261'),
      Db: new SigNum('262'),
      Sg: new SigNum('266'),
      Bh: new SigNum('264'),
      Hs: new SigNum('269'),
      Mt: new SigNum('268'),
      Ds: new SigNum('269'),
      Rg: new SigNum('272'),
      Cn: new SigNum('277'),
      Uut: new SigNum(NaN),
      Fl: new SigNum('289'),
      Uup: new SigNum(NaN),
      Lv: new SigNum('298'),
      Uus: new SigNum(NaN),
      Uuo: new SigNum(NaN),
    };
    this.charges = [
      [new SigNum(1)],
      [new SigNum(0)],
      [new SigNum(1)],
      [new SigNum(2)],
      [new SigNum(-3), new SigNum(3)],
      [new SigNum(4)],
      [new SigNum(-3)],
      [new SigNum(-2)],
      [new SigNum(-1)],
      [new SigNum(0)],
      [new SigNum(1)],
      [new SigNum(2)],
      [new SigNum(3)],
      [new SigNum(4), new SigNum(-4)],
      [new SigNum(5), new SigNum(3), new SigNum(-3)],
      [new SigNum(-2), new SigNum(2), new SigNum(4), new SigNum(6)],
      [new SigNum(-1)],
      [new SigNum(0)],
      [new SigNum(1)],
      [new SigNum(2)],
      [new SigNum(3)],
      [new SigNum(4), new SigNum(3)],
      [new SigNum(2), new SigNum(3), new SigNum(4), new SigNum(5)],
      [new SigNum(2), new SigNum(3), new SigNum(6)],
      [new SigNum(2), new SigNum(4), new SigNum(7)],
      [new SigNum(2), new SigNum(3)],
      [new SigNum(2), new SigNum(3)],
      [new SigNum(2)],
      [new SigNum(1), new SigNum(2)],
      [new SigNum(2)],
      [new SigNum(3)],
      [new SigNum(-4), new SigNum(2), new SigNum(4)],
      [new SigNum(-3), new SigNum(3), new SigNum(5)],
      [new SigNum(-2), new SigNum(4), new SigNum(6)],
      [new SigNum(-1), new SigNum(1), new SigNum(5)],
      [new SigNum(0)],
      [new SigNum(1)],
      [new SigNum(2)],
      [new SigNum(3)],
      [new SigNum(4)],
      [new SigNum(3), new SigNum(5)],
      [new SigNum(3), new SigNum(6)],
      [new SigNum(6)],
      [new SigNum(3), new SigNum(4), new SigNum(8)],
      [new SigNum(4)],
      [new SigNum(2), new SigNum(4)],
      [new SigNum(1)],
      [new SigNum(2)],
      [new SigNum(3)],
      [new SigNum(2), new SigNum(4)],
      [new SigNum(-3), new SigNum(3), new SigNum(5)],
      [new SigNum(-2), new SigNum(4), new SigNum(6)],
      [new SigNum(-1)],
      [new SigNum(0)],
      [new SigNum(1)],
      [new SigNum(2)],
      [new SigNum(3)],
      [new SigNum(3), new SigNum(4)],
      [new SigNum(3)],
      [new SigNum(3), new SigNum(4)],
      [new SigNum(3)],
      [new SigNum(3)],
      [new SigNum(3)],
      [new SigNum(3)],
      [new SigNum(3), new SigNum(4)],
      [new SigNum(3)],
      [new SigNum(3)],
      [new SigNum(3)],
      [new SigNum(3)],
      [new SigNum(3)],
      [new SigNum(3)],
      [new SigNum(4)],
      [new SigNum(5)],
      [new SigNum(6)],
      [new SigNum(2), new SigNum(4), new SigNum(6), new SigNum(7)],
      [new SigNum(3), new SigNum(4), new SigNum(6), new SigNum(8)],
      [new SigNum(3), new SigNum(4), new SigNum(6)],
      [new SigNum(2), new SigNum(4), new SigNum(6)],
      [new SigNum(1), new SigNum(2), new SigNum(3)],
      [new SigNum(1), new SigNum(2)],
      [new SigNum(1), new SigNum(3)],
      [new SigNum(2), new SigNum(4)],
      [new SigNum(3)],
      [new SigNum(2), new SigNum(4)],
      [],
      [new SigNum(0)],
      [],
      [new SigNum(2)],
      [new SigNum(3)],
      [new SigNum(4)],
      [new SigNum(5)],
      [new SigNum(3), new SigNum(4), new SigNum(6)],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];
    this.polycharges = {
      NH4: new SigNum(1),
      H3O: new SigNum(1),
      C2H3O2: new SigNum(-1),
      CH3COOH: new SigNum(-1),
      HCO3: new SigNum(-1),
      HSO4: new SigNum(-1),
      ClO: new SigNum(-1),
      ClO3: new SigNum(-1),
      ClO2: new SigNum(-1),
      OCN: new SigNum(-1),
      CN: new SigNum(-1),
      H2PO4: new SigNum(-1),
      OH: new SigNum(-1),
      NO3: new SigNum(-1),
      NO2: new SigNum(-1),
      ClO4: new SigNum(-1),
      MnO4: new SigNum(-1),
      SCN: new SigNum(-1),
      BrO3: new SigNum(-1),
      IO3: new SigNum(-1),
      CO3: new SigNum(-2),
      CrO4: new SigNum(-2),
      Cr2O7: new SigNum(-2),
      C2O4: new SigNum(-2),
      HPO4: new SigNum(-2),
      O2: new SigNum(-2),
      SO4: new SigNum(-2),
      SO3: new SigNum(-2),
      S2O3: new SigNum(-2),
      BO3: new SigNum(-3),
      PO4: new SigNum(-3),
      PO3: new SigNum(-3),
    };
  })();
})();
$(document).ready(function () {
  var $ = jQuery;
  jQuery.noConflict();
  var MQ = MathQuill.getInterface(2);
  var varsLoaded = false;
  if (Modernizr.touch) {
    $('#editor textarea').attr('readonly', 'readonly');
  }
  Calculator.DefaultParser = Calculator.Eval;
  Calculator.eval = function (expr) {
    return Calculator.DefaultParser.parse(expr);
  };
  var exprFieldSpan = document.getElementById('expr-field');
  var resultSpan = document.getElementById('result-field');
  var latexSpan = document.getElementById('latex');
  var historyList = $('#history');
  var resultField = MQ.StaticMath(resultSpan);
  var resval = undefined;
  var eToExp = function (res, mode) {
    if (mode === undefined || mode === null) {
      mode = 'latex';
    }
    if (res.indexOf('e') != -1) {
      var idx = res.indexOf('e');
      var t1 = res.substring(0, idx);
      var t2 = res.substring(idx + 1);
      if (t2.length > 0 && t2[0] == '+') {
        t2 = t2.substring(1);
      }
      if (mode == 'html') {
        return t1 + '&#8226;10<sup>' + t2 + '</sup>';
      } else {
        if (mode == 'kbd') {
          return t1 + '*10^' + t2;
        } else {
          return t1 + '\\cdot10^{' + t2 + '}';
        }
      }
    }
    return res;
  };
  var updateMemoryTitles = function () {
    $('.memory-tile').each(function (idx, ele) {
      $this = $(ele);
      var val = Calculator.vars[$this.attr('var')];
      if (val === undefined || val === null) {
        $this.prop('title', 'undefined');
      } else {
        $this.prop('title', val.toString());
      }
    });
  };
  var resval = undefined;
  var evalExpr = function () {
    try {
      if (exprField.latex().trim() == '') {
        resultField.latex('0 = 0 \\cdot 10^0');
        resval = undefined;
      } else {
        resval = Calculator.eval(exprField.latex());
        if (resval.constructor == SigNum) {
          var res = resval.toExponential();
          res = eToExp(res);
          res = resval.toFullNumber() + ' = ' + res;
          resultField.latex(res);
        } else {
          var res = resval.toString();
          if (res.indexOf('e') != -1 && typeof resval == 'number') {
            var idx = res.indexOf('e');
            var t1 = res.substring(0, idx);
            var t2 = res.substring(idx + 1);
            if (t2.length > 0 && t2[0] == '+') {
              t2 = t2.substring(1);
            }
            res = t1 + '\\cdot10^{' + t2 + '}';
          }
          resultField.latex(res);
        }
        updateMemoryTitles();
        if (varsLoaded) {
          try {
            localStorage.setItem('vars', JSON.stringify(Calculator.vars));
          } catch (ignore) {}
        }
      }
    } catch (err) {
      resultField.latex("\\text{Something's not right...}");
    }
  };
  var ignoreEdit = false;
  var timer = null;
  var exprField = MQ.MathField(exprFieldSpan, {
    spaceBehavesLikeTab: true,
    charsThatBreakOutOfSupSub: '*/=<>ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    autoCommands:
      'pi theta omega alpha beta gamma Theta Omega Alpha Beta Gamma sqrt nthroot',
    autoOperatorNames: 'true false mod log',
    leftRightIntoCmdGoes: 'up',
    handlers: {
      edit: function () {
        if (timer) {
          clearTimeout(timer);
          timer = 1;
        }
        timer = setTimeout(
          function () {
            try {
              localStorage.setItem('exprLatex', exprField.latex());
            } catch (ignore) {}
            evalExpr();
            try {
              if (ignoreEdit) {
                ignoreEdit = false;
              } else {
                if (exprField.latex() != GET('expr')) {
                  Calculator.history = Calculator.history
                    .concat([exprField.latex()])
                    .slice(-50);
                  history.replaceState(
                    null,
                    'Scientific Calculator - O-Sci-Lator',
                    '?expr=' + encodeURIComponent(exprField.latex())
                  );
                }
              }
            } catch (ignore) {}
            timer = null;
          },
          timer ? 300 : 0
        );
      },
      enter: function () {
        if (resval !== undefined && resval !== null) {
          Calculator.prevAns = Calculator.prevAns.concat([resval]).slice(-50);
          rebuildAnsList();
        }
      },
    },
  });
  var saveAnsList = function () {
    var prevAnsTxt = '';
    for (var i = 0; i < Calculator.prevAns.length; ++i) {
      if (i != 0) {
        prevAnsTxt += ';';
      }
      if (Calculator.prevAns[i].constructor == SigNum) {
        prevAnsTxt +=
          Calculator.prevAns[i].value + ':' + Calculator.prevAns[i].sf;
      } else {
        prevAnsTxt += Calculator.prevAns[i];
      }
    }
    localStorage.setItem('prevAns', prevAnsTxt);
  };
  var rebuildAnsList = function () {
    var txt = '';
    for (var i = 0; i < Calculator.prevAns.length; ++i) {
      var str = Calculator.prevAns[i].toString();
      var val = str;
      if (Calculator.prevAns[i].constructor == SigNum) {
        str = eToExp(str, 'html');
        val = eToExp(val, 'latex');
      }
      txt = txt.concat(
        '<div class="history-tile" position="' +
          i +
          '" value="' +
          val +
          '" title="Click to enter saved result into textbox"><span class="history-text">' +
          str +
          '</span> <span class="history-delete" title="Delete saved result"></span></div>'
      );
    }
    txt +=
      '\n<p class="history-tip"><strong>Saved Results</strong> &nbsp;|&nbsp; <span class="mobile-hide">Press <kbd>enter</kbd> in the textbox to save the current result (max 50 results) &nbsp;| </span><a class="history-clear">Clear</a></p>';
    historyList.html(txt);
    var histTimer = null;
    $('.history-tile').bind('contextmenu', function (e) {
      return false;
    });
    $('.history-tile')
      .mousedown(function (e) {
        $this = $(this);
        histTimer = setTimeout(function () {
          onLongTapHist($this);
        }, 750);
      })
      .on('touchend mouseup', function (event) {
        $this = $(this);
        var name = $this.attr('var');
        if (event.button == 0) {
          exprField.write($this.attr('value'));
          window.scrollTo(
            0,
            document.getElementsByClassName('header-container')[0].offsetHeight
          );
        } else {
          onLongTapHist($this);
        }
        histTimer = null;
        if (!Modernizr.touch) {
          exprField.focus();
        }
      });
    var onLongTapHist = function ($this) {
      if (!$this) {
        return;
      }
      var name = $this.attr('var');
      Calculator.prevAns.splice(Number($this.attr('position')), 1);
      saveAnsList();
      $this.animate({ opacity: 0 }, 500, 'linear', function () {
        $this.remove();
        rebuildAnsList();
      });
    };
    $('.history-delete').mouseup(function (e) {
      window.event.cancelBubble = true;
      e.stopPropagation();
    });
    $('.history-delete').click(function (e) {
      var tile = $(this).parent();
      Calculator.prevAns.splice(Number(tile.attr('position')), 1);
      try {
        saveAnsList();
      } catch (ignore) {}
      tile.animate({ opacity: 0 }, 500, 'linear', function () {
        tile.remove();
        rebuildAnsList();
      });
      window.event.cancelBubble = true;
      e.stopPropagation();
    });
    $('.history-clear').click(function (e) {
      Calculator.prevAns = [];
      $('.history-tile').animate({ opacity: 0 }, 400, 'linear');
      setTimeout(function () {
        rebuildAnsList();
      }, 1000);
    });
    saveAnsList();
  };
  var timeoutTracker = 0;
  var evtname = 'mousedown';
  if (Modernizr.touch) {
    evtname = 'touchend';
  }
  var $this = null;
  var ct = 0;
  var exec = function () {
    if (
      ct == 0 ||
      ct > 50 ||
      (ct > 10 && ct % 5 == 0) ||
      (ct < 10 && ct % 10 == 0)
    ) {
      if ($this.attr('latex-to-write')) {
        exprField.write($this.attr('latex-to-write'));
      }
      if ($this.attr('text-to-add')) {
        exprField.typedText($this.attr('text-to-add'));
      }
      if ($this.attr('keys-to-type')) {
        exprField.keystroke($this.attr('keys-to-type'));
      }
      if ($this.attr('shift')) {
        var toType = '';
        var shNum = Number($this.attr('shift'));
        if (shNum > 0) {
          for (var i = 0; i < shNum; ++i) {
            toType += 'Right ';
          }
        } else {
          for (var i = 0; i > shNum; --i) {
            toType += 'Left ';
          }
        }
        exprField.keystroke(toType.trim());
      }
    }
    ++ct;
  };
  var cancelPress = false;
  $('.key, .ptable-key').on(evtname, function (e) {
    if (cancelPress) {
      cancelPress = false;
      return;
    }
    ct = 0;
    $this = $(this);
    exec();
    if (!Modernizr.touch) {
      timeoutTracker = setInterval(exec, 20);
    } else {
      document.activeElement.blur();
    }
  });
  $('.key, .ptable-key').on('touchmove', function (e) {
    cancelPress = true;
  });
  if (!Modernizr.touch) {
    $('.key, .ptable-key').on('mouseup mouseleave', function () {
      clearInterval(timeoutTracker);
      exprField.focus();
    });
  }
  $('.memory-tile').bind('contextmenu', function (e) {
    return false;
  });
  var memTimer;
  $('.memory-tile')
    .on('touchstart', function (event) {
      $this = $(this);
      memTimer = setTimeout(function () {
        onLongTapMem($this);
      }, 750);
    })
    .on('touchend mouseup', function (event) {
      $this = $(this);
      var name = $this.attr('var');
      if (memTimer) {
        clearTimeout(memTimer);
        if (event.button == 0) {
          name = $this.attr('latex-to-write')
            ? $this.attr('latex-to-write')
            : $this.attr('var');
          exprField.write(name);
          window.scrollTo(
            0,
            document.getElementsByClassName('header-container')[0].offsetHeight
          );
        } else {
          onLongTapMem($this);
        }
      }
      if (!Modernizr.touch) {
        exprField.focus();
      }
    });
  var onLongTapMem = function ($this) {
    if (!$this) {
      return;
    }
    var name = $this.attr('var');
    if (resval !== undefined && resval !== null) {
      Calculator.vars[name] = resval;
      $this.attr('title', resval.toString());
    } else {
      Calculator.vars[name] = undefined;
      $this.attr('title', 'undefined');
    }
    if (varsLoaded) {
      try {
        localStorage.setItem('vars', JSON.stringify(Calculator.vars));
      } catch (ignore) {}
    }
    if (!Modernizr.touch) {
      exprField.focus();
    }
  };
  $('#config-sf input').change(function () {
    var $this = $(this);
    var val = Number($this.attr('value'));
    if (val < 0) {
      SigNum.enableSF = false;
    } else {
      SigNum.enableSF = true;
      SigNum.roundingMode = val;
    }
    try {
      localStorage.setItem('sfMode', val);
    } catch (ignore) {}
    evalExpr();
  });
  $('#allclear-btn').click(function () {
    exprField.latex('');
    if (!Modernizr.touch) {
      exprField.focus();
    }
  });
  $('#enter-btn').click(function () {
    if (resval !== undefined && resval !== null) {
      Calculator.prevAns = Calculator.prevAns.concat([resval]).slice(-50);
      rebuildAnsList();
    }
    if (!Modernizr.touch) {
      exprField.focus();
    }
  });
  var ptable = $('#periodic-table');
  var ignorePtable = false;
  $('#periodic-btn')
    .on('touchstart', function () {
      ignorePtable = false;
    })
    .on('touchmove', function () {
      ignorePtable = true;
    })
    .click(function () {
      if (ignorePtable) {
        return;
      }
      var ptableClose = $('#periodic-table-close');
      if (ptable.css('display') == 'block') {
        ptable.animate({ opacity: 0 }, 1000, function () {
          ptable.css('display', 'none');
        });
      } else {
        ptable.css('opacity', 0);
        ptable.css('display', 'block');
        ptableClose.css('top', ptable.position().top + 10 + 'px');
        ptable.animate({ opacity: 1 }, 1000);
      }
      if (!Modernizr.touch) {
        exprField.focus();
      }
    });
  $('#periodic-table-close').click(function () {
    var ptable = $('#periodic-table');
    ptable.css('opacity', 1);
    ptable.animate({ opacity: 0 }, 1000, function () {
      ptable.css('display', 'none');
    });
    if (!Modernizr.touch) {
      exprField.focus();
    }
  });
  $(window).resize(function () {
    if (ptable.css('display') == 'block') {
      var ptableClose = $('#periodic-table-close');
      ptableClose.css('top', ptable.position().top + 10 + 'px');
    }
  });
  $('#periodic-table td').click(function () {
    var $this = $(this);
    exprField.write($this.children('.elem-name').text());
    if (!Modernizr.touch) {
      exprField.focus();
    }
  });
  try {
    var exprLatex = GET('expr') || localStorage.getItem('exprLatex') || '';
    exprField.latex(exprLatex || '');
    history.pushState(
      null,
      'Scientific Calculator - O-Sci-Lator',
      '?expr=' + encodeURIComponent(exprLatex)
    );
    window.onpopstate = function () {
      ignoreEdit = true;
      exprField.latex(GET('expr') || localStorage.getItem('exprLatex') || '');
      Calculator.history = Calculator.history.slice(0, -1);
    };
    var prevAns = localStorage.getItem('prevAns');
    if (prevAns !== undefined && prevAns !== null && prevAns.trim() != '') {
      Calculator.prevAns = prevAns.split(';');
      for (var i = 0; i < Calculator.prevAns.length; ++i) {
        if (Calculator.prevAns[i].indexOf(':') >= 0) {
          var spl = Calculator.prevAns[i].split(':');
          Calculator.prevAns[i] = new SigNum(Number(spl[0]), Number(spl[1]));
        } else {
          if (
            Calculator.prevAns[i] == 'true' ||
            Calculator.prevAns[i] == 'false'
          ) {
            Calculator.prevAns[i] = Boolean(Calculator.prevAns[i]);
          }
        }
      }
    }
    var sfMode = localStorage.getItem('sfMode');
    if (sfMode !== undefined && sfMode !== null && sfMode.trim() != '') {
      if (Number(sfMode) < 0) {
        SigNum.enableSF = false;
      } else {
        SigNum.enableSF = true;
        SigNum.roundingMode = Number(sfMode);
      }
      $('#sf-c' + sfMode).attr('checked', true);
    } else {
      try {
        localStorage.setItem('sfMode', 2);
      } catch (ignore) {}
      SigNum.enableSF = true;
      SigNum.roundingMode = 2;
      $('#sf-c2').attr('checked', true);
    }
    var vars = JSON.parse(localStorage.getItem('vars'));
    if (vars !== undefined && vars !== null) {
      for (var key in vars) {
        if (typeof vars[key] == 'object' && vars[key]['value'] !== undefined) {
          var sf = vars[key]['sf'];
          if (sf === null) {
            sf = Infinity;
          }
          Calculator.vars[key] = new SigNum(vars[key]['value'], sf);
        } else {
          Calculator.vars[key] = vars[key];
        }
      }
    }
    varsLoaded = true;
    rebuildAnsList();
    updateMemoryTitles();
  } catch (ex) {
    console.log(ex.message);
  }
  $('.site-container').animate({ opacity: 1 }, 1000);
  $('#loading-spinner').animate({ opacity: 0 }, 1000, function () {
    $('#loading-spinner').remove();
  });
  if (Modernizr.touch) {
    setTimeout(function () {
      window.scrollTo(
        0,
        document.getElementsByClassName('header-container')[0].offsetHeight
      );
      $('textarea').attr('readonly', 'readonly');
    }, 1500);
  }
  exprField.select();
  exprField.focus();
});

Calculator || (Calculator = {});
Calculator.Eval = (function () {
  var ab = function (at, ar, au, aq) {
      for (au = au || {}, aq = at.length; aq--; au[at[aq]] = ar) {}
      return au;
    },
    w = [1, 6],
    v = [1, 3],
    u = [1, 4],
    t = [1, 5],
    s = [1, 7],
    r = [1, 8],
    p = [1, 9],
    n = [1, 10],
    m = [1, 11],
    l = [1, 12],
    aa = [1, 13],
    Z = [1, 14],
    Y = [1, 16],
    X = [1, 15],
    W = [1, 17],
    V = [1, 18],
    U = [1, 19],
    T = [1, 20],
    S = [1, 21],
    R = [1, 22],
    Q = [1, 24],
    P = [1, 25],
    O = [1, 26],
    N = [1, 27],
    M = [1, 28],
    L = [1, 29],
    K = [1, 30],
    I = [1, 31],
    H = [1, 32],
    G = [1, 33],
    F = [1, 34],
    E = [1, 35],
    D = [1, 36],
    C = [1, 37],
    B = [1, 38],
    A = [1, 39],
    k = [1, 40],
    j = [1, 41],
    h = [1, 42],
    g = [1, 43],
    f = [1, 44],
    e = [1, 45],
    d = [1, 46],
    a = [
      5,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      18,
      19,
      20,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      35,
      37,
      39,
      41,
    ],
    ap = [2, 46],
    ao = [1, 62],
    an = [1, 61],
    am = [1, 64],
    al = [1, 63],
    ak = [
      5,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      18,
      19,
      20,
      22,
      23,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      35,
      37,
      39,
      41,
    ],
    aj = [
      5,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      26,
      27,
      28,
      29,
      30,
      31,
      35,
      37,
      39,
      41,
    ],
    ai = [5, 7, 8, 9, 12, 14, 15, 16, 26, 27, 28, 29, 30, 31, 35, 37, 39, 41],
    ah = [5, 7, 12, 14, 16, 35, 37, 39, 41],
    ag = [
      5,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      18,
      20,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      35,
      37,
      39,
      41,
    ],
    af = [5, 7, 12, 14, 15, 16, 26, 27, 28, 29, 30, 31, 35, 37, 39, 41],
    ae = [1, 119],
    ad = [7, 35];
  var J = {
    trace: function z() {},
    yy: {},
    symbols_: {
      error: 2,
      expressions: 3,
      e: 4,
      EOF: 5,
      expression_list: 6,
      ',': 7,
      '+': 8,
      '-': 9,
      '*': 10,
      '/': 11,
      '|': 12,
      MOD: 13,
      OR: 14,
      AND: 15,
      XOR: 16,
      NOT: 17,
      BOR: 18,
      BAND: 19,
      BXOR: 20,
      BNOT: 21,
      '>>': 22,
      '<<': 23,
      EXP: 24,
      '^': 25,
      '=': 26,
      '!=': 27,
      '<': 28,
      '>': 29,
      '<=': 30,
      '>=': 31,
      '!': 32,
      '%': 33,
      '(': 34,
      ')': 35,
      '[': 36,
      ']': 37,
      '{': 38,
      '}': 39,
      '|l': 40,
      '|r': 41,
      FRAC: 42,
      SQRT: 43,
      NTHROOT: 44,
      LOGS: 45,
      NUMBER: 46,
      LOG: 47,
      NAME: 48,
      ':=': 49,
      FORMULA: 50,
      E: 51,
      PI: 52,
      T: 53,
      F: 54,
      $accept: 0,
      $end: 1,
    },
    terminals_: {
      2: 'error',
      5: 'EOF',
      7: ',',
      8: '+',
      9: '-',
      10: '*',
      11: '/',
      12: '|',
      13: 'MOD',
      14: 'OR',
      15: 'AND',
      16: 'XOR',
      17: 'NOT',
      18: 'BOR',
      19: 'BAND',
      20: 'BXOR',
      21: 'BNOT',
      22: '>>',
      23: '<<',
      24: 'EXP',
      25: '^',
      26: '=',
      27: '!=',
      28: '<',
      29: '>',
      30: '<=',
      31: '>=',
      32: '!',
      33: '%',
      34: '(',
      35: ')',
      36: '[',
      37: ']',
      38: '{',
      39: '}',
      40: '|l',
      41: '|r',
      42: 'FRAC',
      43: 'SQRT',
      44: 'NTHROOT',
      45: 'LOGS',
      46: 'NUMBER',
      47: 'LOG',
      48: 'NAME',
      49: ':=',
      50: 'FORMULA',
      51: 'E',
      52: 'PI',
      53: 'T',
      54: 'F',
    },
    productions_: [
      0,
      [3, 2],
      [6, 3],
      [6, 1],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 2],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 2],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 2],
      [4, 2],
      [4, 2],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 6],
      [4, 3],
      [4, 6],
      [4, 2],
      [4, 5],
      [4, 5],
      [4, 5],
      [4, 4],
      [4, 6],
      [4, 6],
      [4, 6],
      [4, 1],
      [4, 4],
      [4, 5],
      [4, 3],
      [4, 4],
      [4, 3],
      [4, 1],
      [4, 1],
      [4, 2],
      [4, 2],
      [4, 4],
      [4, 1],
      [4, 1],
      [4, 2],
      [4, 2],
      [4, 1],
      [4, 1],
    ],
    performAction: function y(av, aw, o, ax, ay, az, ar) {
      var at = az.length - 1;
      switch (ay) {
        case 1:
          if (typeof console == 'undefined') {
            print(az[at - 1]);
          }
          return az[at - 1];
          break;
        case 2:
          this.$ = az[at - 2].concat([az[at]]);
          break;
        case 3:
          this.$ = [az[at]];
          break;
        case 4:
          this.$ = az[at - 2].plus(az[at]);
          break;
        case 5:
          this.$ = az[at - 2].minus(az[at]);
          break;
        case 6:
          this.$ = az[at - 2].times(az[at]);
          break;
        case 7:
          this.$ = az[at - 2].div(az[at]);
          break;
        case 8:
        case 34:
          this.$ = SigNum.abs(az[at - 1]);
          break;
        case 9:
          this.$ = az[at - 2].mod(az[at]);
          break;
        case 10:
          this.$ = az[at - 2] || az[at];
          break;
        case 11:
          this.$ = az[at - 2] && az[at];
          break;
        case 12:
          this.$ = (az[at - 2] || az[at]) && !(az[at - 2] && az[at]);
          break;
        case 13:
          this.$ = !az[at];
          break;
        case 14:
          this.$ = az[at - 2].or(az[at]);
          break;
        case 15:
          this.$ = az[at - 2].and(az[at]);
          break;
        case 16:
          this.$ = az[at - 2].xor(az[at]);
          break;
        case 17:
          this.$ = az[at].not();
          break;
        case 18:
          this.$ = az[at - 2].shr(az[at]);
          break;
        case 19:
          this.$ = az[at - 2].shl(az[at]);
          break;
        case 20:
          this.$ = az[at - 2].scale(SigNum.pow(10, az[at]));
          break;
        case 21:
          this.$ = az[at - 2].expo(az[at]);
          break;
        case 22:
          this.$ =
            az[at - 2].value != undefined
              ? az[at - 2].value == az[at].value
              : az[at - 2] == az[at];
          break;
        case 23:
          this.$ =
            az[at - 2].value != undefined
              ? az[at - 2].value != az[at].value
              : az[at - 2] != az[at];
          break;
        case 24:
          this.$ = az[at - 2] < az[at];
          break;
        case 25:
          this.$ = az[at - 2] > az[at];
          break;
        case 26:
          this.$ = az[at - 2] <= az[at];
          break;
        case 27:
          this.$ = az[at - 2] >= az[at];
          break;
        case 28:
          this.$ = (function aA(aB) {
            return aB == 0 ? 1 : aA(aB.minus(1)).times(aB);
          })(az[at - 1]);
          break;
        case 29:
          this.$ = az[at - 1].times(0.01);
          break;
        case 30:
          this.$ = az[at].times(-1);
          break;
        case 31:
        case 32:
        case 33:
          this.$ = az[at - 1];
          break;
        case 35:
          this.$ = az[at - 4].div(az[at - 1]);
          break;
        case 36:
          this.$ = SigNum.sqrt(az[at - 1]);
          break;
        case 37:
          this.$ = SigNum.root(az[at - 1], az[at - 4]);
          break;
        case 38:
          var au = SigNum.floor(
            az[at].div(SigNum.pow(10, SigNum.floor(SigNum.log10(az[at]))))
          );
          var aq = az[at].minus(
            au.times(SigNum.pow(10, SigNum.floor(SigNum.log10(az[at]))))
          );
          this.$ = SigNum.log(aq, au);
          break;
        case 39:
        case 40:
        case 41:
          this.$ = SigNum.log(az[at - 1], az[at - 3]);
          break;
        case 42:
          this.$ = SigNum.log(az[at], az[at - 2]);
          break;
        case 43:
        case 44:
        case 45:
          this.$ = SigNum.log(az[at - 1], az[at - 4]);
          break;
        case 46:
          this.$ = new SigNum(av);
          break;
        case 47:
          if (az[at - 3][0] == '\\') {
            az[at - 3] = az[at - 3].substring(1);
          }
          this.$ = Calculator.funcs[az[at - 3]].apply(undefined, az[at - 1]);
          break;
        case 48:
          if (az[at - 3][0] == '\\') {
            az[at - 3] = az[at - 3].substring(1);
          }
          this.$ =
            az[at - 4] *
            Calculator.funcs[az[at - 3]].apply(undefined, az[at - 1]);
          break;
        case 49:
          if (az[at - 2][0] == '\\') {
            az[at - 2] = az[at - 2].substring(1);
          }
          this.$ = Calculator.funcs[az[at - 2]].apply(undefined, []);
          break;
        case 50:
          if (az[at - 2][0] == '\\') {
            az[at - 2] = az[at - 2].substring(1);
          }
          this.$ =
            az[at - 3] * Calculator.funcs[az[at - 2]].apply(undefined, []);
          break;
        case 51:
          Calculator.vars[az[at - 2]] = az[at];
          this.$ = Calculator.vars[az[at - 2]];
          break;
        case 52:
          this.$ = Calculator.vars[az[at]];
          break;
        case 53:
          this.$ = az[at].toString().substring(1, az[at].toString().length - 1);
          break;
        case 54:
          this.$ = az[at - 1].times(Calculator.vars[az[at]]);
          break;
        case 55:
          this.$ = az[at - 1].times(az[at]);
          break;
        case 56:
          this.$ = Calculator.vars[az[at - 3].concat(az[at - 1])];
          break;
        case 57:
          this.$ = SigNum.E;
          break;
        case 58:
          this.$ = SigNum.PI;
          break;
        case 59:
          this.$ = az[at - 1].times(SigNum.PI);
          break;
        case 60:
          this.$ = az[at - 1].times(SigNum.E);
          break;
        case 61:
          this.$ = true;
          break;
        case 62:
          this.$ = false;
          break;
      }
    },
    table: [
      {
        3: 1,
        4: 2,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      { 1: [3] },
      {
        5: [1, 23],
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
      },
      {
        4: 47,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 48,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 49,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 50,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 51,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 52,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 53,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 54,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 55,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 56,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 57,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 58,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: [1, 59],
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 60,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      ab(a, ap, { 46: ao, 48: an, 51: am, 52: al }),
      ab(a, [2, 52], { 34: [1, 65], 38: [1, 67], 49: [1, 66] }),
      ab(a, [2, 53]),
      ab(a, [2, 57]),
      ab(a, [2, 58]),
      ab(a, [2, 61]),
      ab(a, [2, 62]),
      { 1: [2, 1] },
      {
        4: 68,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 69,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 70,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 71,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 72,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 73,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 74,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 75,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 76,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 77,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 78,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 79,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 80,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 81,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 82,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 83,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 84,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 85,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 86,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 87,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 88,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      ab(a, [2, 28]),
      ab(a, [2, 29]),
      {
        8: Q,
        9: P,
        10: O,
        11: N,
        12: [1, 89],
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
      },
      ab(ak, [2, 13], { 24: C }),
      ab(ak, [2, 17], { 24: C }),
      ab(ak, [2, 30], { 24: C }),
      {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
        35: [1, 90],
      },
      {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
        37: [1, 91],
      },
      {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
        39: [1, 92],
      },
      {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
        41: [1, 93],
      },
      {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
        39: [1, 94],
      },
      {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
        39: [1, 95],
      },
      {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
        37: [1, 96],
      },
      ab(aj, [2, 38], {
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        32: e,
        33: d,
      }),
      ab(a, ap, {
        34: [1, 97],
        36: [1, 98],
        38: [1, 99],
        46: ao,
        48: an,
        51: am,
        52: al,
      }),
      {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
        39: [1, 100],
      },
      ab(a, [2, 54], { 34: [1, 101] }),
      ab(a, [2, 55]),
      ab(a, [2, 59]),
      ab(a, [2, 60]),
      {
        4: 104,
        6: 102,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        35: [1, 103],
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 105,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 106,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      ab(ai, [2, 4], {
        10: O,
        11: N,
        13: M,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        32: e,
        33: d,
      }),
      ab(ai, [2, 5], {
        10: O,
        11: N,
        13: M,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        32: e,
        33: d,
      }),
      ab(aj, [2, 6], {
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        32: e,
        33: d,
      }),
      ab(aj, [2, 7], {
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        32: e,
        33: d,
      }),
      ab(aj, [2, 9], {
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        32: e,
        33: d,
      }),
      ab(ah, [2, 10], {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        15: K,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
      }),
      ab([5, 7, 12, 14, 15, 16, 35, 37, 39, 41], [2, 11], {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
      }),
      ab(ah, [2, 12], {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        15: K,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
      }),
      ab(ag, [2, 14], { 19: G, 22: E, 23: D, 24: C }),
      ab(
        [
          5,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          18,
          19,
          20,
          25,
          26,
          27,
          28,
          29,
          30,
          31,
          32,
          33,
          35,
          37,
          39,
          41,
        ],
        [2, 15],
        { 22: E, 23: D, 24: C }
      ),
      ab(ag, [2, 16], { 19: G, 22: E, 23: D, 24: C }),
      ab(ak, [2, 18], { 24: C }),
      ab(ak, [2, 19], { 24: C }),
      ab(a, [2, 20]),
      ab(
        [
          5,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          25,
          26,
          27,
          28,
          29,
          30,
          31,
          35,
          37,
          39,
          41,
        ],
        [2, 21],
        { 18: H, 19: G, 20: F, 22: E, 23: D, 24: C, 32: e, 33: d }
      ),
      ab(af, [2, 22], {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        32: e,
        33: d,
      }),
      ab(af, [2, 23], {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        32: e,
        33: d,
      }),
      ab(af, [2, 24], {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        32: e,
        33: d,
      }),
      ab(af, [2, 25], {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        32: e,
        33: d,
      }),
      ab(af, [2, 26], {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        32: e,
        33: d,
      }),
      ab(af, [2, 27], {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        32: e,
        33: d,
      }),
      ab(a, [2, 8]),
      ab(a, [2, 31]),
      ab(a, [2, 32]),
      ab(a, [2, 33]),
      ab(a, [2, 34]),
      { 38: [1, 107] },
      ab(a, [2, 36]),
      { 38: [1, 108] },
      {
        4: 109,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 110,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 111,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      { 34: [1, 113], 36: [1, 114], 38: [1, 115], 46: [1, 112] },
      {
        4: 104,
        6: 116,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        35: [1, 117],
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      { 7: ae, 35: [1, 118] },
      ab(a, [2, 49]),
      ab(ad, [2, 3], {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
      }),
      ab([5, 7, 12, 35, 37, 39, 41], [2, 51], {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
      }),
      {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
        39: [1, 120],
      },
      {
        4: 121,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 122,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
        35: [1, 123],
      },
      {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
        37: [1, 124],
      },
      {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
        39: [1, 125],
      },
      ab(a, [2, 42]),
      {
        4: 126,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 127,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      {
        4: 128,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      { 7: ae, 35: [1, 129] },
      ab(a, [2, 50]),
      ab(a, [2, 47]),
      {
        4: 130,
        9: w,
        12: v,
        17: u,
        21: t,
        34: s,
        36: r,
        38: p,
        40: n,
        42: m,
        43: l,
        44: aa,
        45: Z,
        46: Y,
        47: X,
        48: W,
        50: V,
        51: U,
        52: T,
        53: S,
        54: R,
      },
      ab(a, [2, 56]),
      {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
        39: [1, 131],
      },
      {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
        39: [1, 132],
      },
      ab(a, [2, 39]),
      ab(a, [2, 40]),
      ab(a, [2, 41]),
      {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
        35: [1, 133],
      },
      {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
        37: [1, 134],
      },
      {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
        39: [1, 135],
      },
      ab(a, [2, 48]),
      ab(ad, [2, 2], {
        8: Q,
        9: P,
        10: O,
        11: N,
        13: M,
        14: L,
        15: K,
        16: I,
        18: H,
        19: G,
        20: F,
        22: E,
        23: D,
        24: C,
        25: B,
        26: A,
        27: k,
        28: j,
        29: h,
        30: g,
        31: f,
        32: e,
        33: d,
      }),
      ab(a, [2, 35]),
      ab(a, [2, 37]),
      ab(a, [2, 43]),
      ab(a, [2, 44]),
      ab(a, [2, 45]),
    ],
    defaultActions: { 23: [2, 1] },
    parseError: function q(ar, aq) {
      if (aq.recoverable) {
        this.trace(ar);
      } else {
        function o(au, at) {
          this.message = au;
          this.hash = at;
        }
        o.prototype = Error;
        throw new o(ar, aq);
      }
    },
    parse: function x(aB) {
      var aJ = this,
        ay = [0],
        aI = [],
        aT = [null],
        aD = [],
        aV = this.table,
        ar = '',
        aC = 0,
        aR = 0,
        au = 0,
        aA = 2,
        aH = 1;
      var av = aD.slice.call(arguments, 1);
      var o = Object.create(this.lexer);
      var aU = { yy: {} };
      for (var aQ in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, aQ)) {
          aU.yy[aQ] = this.yy[aQ];
        }
      }
      o.setInput(aB, aU.yy);
      aU.yy.lexer = o;
      aU.yy.parser = this;
      if (typeof o.yylloc == 'undefined') {
        o.yylloc = {};
      }
      var at = o.yylloc;
      aD.push(at);
      var aw = o.options && o.options.ranges;
      if (typeof aU.yy.parseError === 'function') {
        this.parseError = aU.yy.parseError;
      } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
      }
      function aG(aX) {
        ay.length = ay.length - 2 * aX;
        aT.length = aT.length - aX;
        aD.length = aD.length - aX;
      }
      _token_stack: var aF = function () {
        var aX;
        aX = o.lex() || aH;
        if (typeof aX !== 'number') {
          aX = aJ.symbols_[aX] || aX;
        }
        return aX;
      };
      var aP,
        aL,
        ax,
        aO,
        aW,
        aE,
        aN = {},
        aK,
        aS,
        aq,
        az;
      while (true) {
        ax = ay[ay.length - 1];
        if (this.defaultActions[ax]) {
          aO = this.defaultActions[ax];
        } else {
          if (aP === null || typeof aP == 'undefined') {
            aP = aF();
          }
          aO = aV[ax] && aV[ax][aP];
        }
        if (typeof aO === 'undefined' || !aO.length || !aO[0]) {
          var aM = '';
          az = [];
          for (aK in aV[ax]) {
            if (this.terminals_[aK] && aK > aA) {
              az.push("'" + this.terminals_[aK] + "'");
            }
          }
          if (o.showPosition) {
            aM =
              'Parse error on line ' +
              (aC + 1) +
              ':\n' +
              o.showPosition() +
              '\nExpecting ' +
              az.join(', ') +
              ", got '" +
              (this.terminals_[aP] || aP) +
              "'";
          } else {
            aM =
              'Parse error on line ' +
              (aC + 1) +
              ': Unexpected ' +
              (aP == aH
                ? 'end of input'
                : "'" + (this.terminals_[aP] || aP) + "'");
          }
          this.parseError(aM, {
            text: o.match,
            token: this.terminals_[aP] || aP,
            line: o.yylineno,
            loc: at,
            expected: az,
          });
        }
        if (aO[0] instanceof Array && aO.length > 1) {
          throw new Error(
            'Parse Error: multiple actions possible at state: ' +
              ax +
              ', token: ' +
              aP
          );
        }
        switch (aO[0]) {
          case 1:
            ay.push(aP);
            aT.push(o.yytext);
            aD.push(o.yylloc);
            ay.push(aO[1]);
            aP = null;
            if (!aL) {
              aR = o.yyleng;
              ar = o.yytext;
              aC = o.yylineno;
              at = o.yylloc;
              if (au > 0) {
                au--;
              }
            } else {
              aP = aL;
              aL = null;
            }
            break;
          case 2:
            aS = this.productions_[aO[1]][1];
            aN.$ = aT[aT.length - aS];
            aN._$ = {
              first_line: aD[aD.length - (aS || 1)].first_line,
              last_line: aD[aD.length - 1].last_line,
              first_column: aD[aD.length - (aS || 1)].first_column,
              last_column: aD[aD.length - 1].last_column,
            };
            if (aw) {
              aN._$.range = [
                aD[aD.length - (aS || 1)].range[0],
                aD[aD.length - 1].range[1],
              ];
            }
            aE = this.performAction.apply(
              aN,
              [ar, aR, aC, aU.yy, aO[1], aT, aD].concat(av)
            );
            if (typeof aE !== 'undefined') {
              return aE;
            }
            if (aS) {
              ay = ay.slice(0, -1 * aS * 2);
              aT = aT.slice(0, -1 * aS);
              aD = aD.slice(0, -1 * aS);
            }
            ay.push(this.productions_[aO[1]][0]);
            aT.push(aN.$);
            aD.push(aN._$);
            aq = aV[ay[ay.length - 2]][ay[ay.length - 1]];
            ay.push(aq);
            break;
          case 3:
            return true;
        }
      }
      return true;
    },
  };
  var ac = (function () {
    var ar = {
      EOF: 1,
      parseError: function at(aB, aA) {
        if (this.yy.parser) {
          this.yy.parser.parseError(aB, aA);
        } else {
          throw new Error(aB);
        }
      },
      setInput: function (aA, aB) {
        this.yy = aB || this.yy || {};
        this._input = aA;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0,
        };
        if (this.options.ranges) {
          this.yylloc.range = [0, 0];
        }
        this.offset = 0;
        return this;
      },
      input: function () {
        var aB = this._input[0];
        this.yytext += aB;
        this.yyleng++;
        this.offset++;
        this.match += aB;
        this.matched += aB;
        var aA = aB.match(/(?:\r\n?|\n).*/g);
        if (aA) {
          this.yylineno++;
          this.yylloc.last_line++;
        } else {
          this.yylloc.last_column++;
        }
        if (this.options.ranges) {
          this.yylloc.range[1]++;
        }
        this._input = this._input.slice(1);
        return aB;
      },
      unput: function (aC) {
        var aA = aC.length;
        var aB = aC.split(/(?:\r\n?|\n)/g);
        this._input = aC + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - aA);
        this.offset -= aA;
        var aE = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);
        if (aB.length - 1) {
          this.yylineno -= aB.length - 1;
        }
        var aD = this.yylloc.range;
        this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: aB
            ? (aB.length === aE.length ? this.yylloc.first_column : 0) +
              aE[aE.length - aB.length].length -
              aB[0].length
            : this.yylloc.first_column - aA,
        };
        if (this.options.ranges) {
          this.yylloc.range = [aD[0], aD[0] + this.yyleng - aA];
        }
        this.yyleng = this.yytext.length;
        return this;
      },
      more: function () {
        this._more = true;
        return this;
      },
      reject: function () {
        if (this.options.backtrack_lexer) {
          this._backtrack = true;
        } else {
          return this.parseError(
            'Lexical error on line ' +
              (this.yylineno + 1) +
              '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' +
              this.showPosition(),
            { text: '', token: null, line: this.yylineno }
          );
        }
        return this;
      },
      less: function (aA) {
        this.unput(this.match.slice(aA));
      },
      pastInput: function () {
        var aA = this.matched.substr(
          0,
          this.matched.length - this.match.length
        );
        return (
          (aA.length > 20 ? '...' : '') + aA.substr(-20).replace(/\n/g, '')
        );
      },
      upcomingInput: function () {
        var aA = this.match;
        if (aA.length < 20) {
          aA += this._input.substr(0, 20 - aA.length);
        }
        return (aA.substr(0, 20) + (aA.length > 20 ? '...' : '')).replace(
          /\n/g,
          ''
        );
      },
      showPosition: function () {
        var aA = this.pastInput();
        var aB = new Array(aA.length + 1).join('-');
        return aA + this.upcomingInput() + '\n' + aB + '^';
      },
      test_match: function (aE, aC) {
        var aF, aA, aD;
        if (this.options.backtrack_lexer) {
          aD = {
            yylineno: this.yylineno,
            yylloc: {
              first_line: this.yylloc.first_line,
              last_line: this.last_line,
              first_column: this.yylloc.first_column,
              last_column: this.yylloc.last_column,
            },
            yytext: this.yytext,
            match: this.match,
            matches: this.matches,
            matched: this.matched,
            yyleng: this.yyleng,
            offset: this.offset,
            _more: this._more,
            _input: this._input,
            yy: this.yy,
            conditionStack: this.conditionStack.slice(0),
            done: this.done,
          };
          if (this.options.ranges) {
            aD.yylloc.range = this.yylloc.range.slice(0);
          }
        }
        aA = aE[0].match(/(?:\r\n?|\n).*/g);
        if (aA) {
          this.yylineno += aA.length;
        }
        this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: aA
            ? aA[aA.length - 1].length -
              aA[aA.length - 1].match(/\r?\n?/)[0].length
            : this.yylloc.last_column + aE[0].length,
        };
        this.yytext += aE[0];
        this.match += aE[0];
        this.matches = aE;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
          this.yylloc.range = [this.offset, (this.offset += this.yyleng)];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(aE[0].length);
        this.matched += aE[0];
        aF = this.performAction.call(
          this,
          this.yy,
          this,
          aC,
          this.conditionStack[this.conditionStack.length - 1]
        );
        if (this.done && this._input) {
          this.done = false;
        }
        if (aF) {
          return aF;
        } else {
          if (this._backtrack) {
            for (var aB in aD) {
              this[aB] = aD[aB];
            }
            return false;
          }
        }
        return false;
      },
      next: function () {
        if (this.done) {
          return this.EOF;
        }
        if (!this._input) {
          this.done = true;
        }
        var aE, aC, aA, aB;
        if (!this._more) {
          this.yytext = '';
          this.match = '';
        }
        var aF = this._currentRules();
        for (var aD = 0; aD < aF.length; aD++) {
          aA = this._input.match(this.rules[aF[aD]]);
          if (aA && (!aC || aA[0].length > aC[0].length)) {
            aC = aA;
            aB = aD;
            if (this.options.backtrack_lexer) {
              aE = this.test_match(aA, aF[aD]);
              if (aE !== false) {
                return aE;
              } else {
                if (this._backtrack) {
                  aC = false;
                  continue;
                } else {
                  return false;
                }
              }
            } else {
              if (!this.options.flex) {
                break;
              }
            }
          }
        }
        if (aC) {
          aE = this.test_match(aC, aF[aB]);
          if (aE !== false) {
            return aE;
          }
          return false;
        }
        if (this._input === '') {
          return this.EOF;
        } else {
          return this.parseError(
            'Lexical error on line ' +
              (this.yylineno + 1) +
              '. Unrecognized text.\n' +
              this.showPosition(),
            { text: '', token: null, line: this.yylineno }
          );
        }
      },
      lex: function o() {
        var aA = this.next();
        if (aA) {
          return aA;
        } else {
          return this.lex();
        }
      },
      begin: function aq(aA) {
        this.conditionStack.push(aA);
      },
      popState: function au() {
        var aA = this.conditionStack.length - 1;
        if (aA > 0) {
          return this.conditionStack.pop();
        } else {
          return this.conditionStack[0];
        }
      },
      _currentRules: function az() {
        if (
          this.conditionStack.length &&
          this.conditionStack[this.conditionStack.length - 1]
        ) {
          return this.conditions[
            this.conditionStack[this.conditionStack.length - 1]
          ].rules;
        } else {
          return this.conditions.INITIAL.rules;
        }
      },
      topState: function ax(aA) {
        aA = this.conditionStack.length - 1 - Math.abs(aA || 0);
        if (aA >= 0) {
          return this.conditionStack[aA];
        } else {
          return 'INITIAL';
        }
      },
      pushState: function aw(aA) {
        this.begin(aA);
      },
      stateStackSize: function av() {
        return this.conditionStack.length;
      },
      options: {},
      performAction: function ay(aE, aB, aD, aA) {
        var aC = aA;
        switch (aD) {
          case 0:
            break;
          case 1:
            return 46;
            break;
          case 2:
            return 46;
            break;
          case 3:
            return 42;
            break;
          case 4:
            return 10;
            break;
          case 5:
            return 34;
            break;
          case 6:
            return 35;
            break;
          case 7:
            return 36;
            break;
          case 8:
            return 37;
            break;
          case 9:
            return 38;
            break;
          case 10:
            return 39;
            break;
          case 11:
            return 40;
            break;
          case 12:
            return 41;
            break;
          case 13:
            return 47;
            break;
          case 14:
            return 45;
            break;
          case 15:
            return 43;
            break;
          case 16:
            return 44;
            break;
          case 17:
            return 16;
            break;
          case 18:
            return 10;
            break;
          case 19:
            return 10;
            break;
          case 20:
            return 11;
            break;
          case 21:
            return 11;
            break;
          case 22:
            return 52;
            break;
          case 23:
            return 52;
            break;
          case 24:
            return 51;
            break;
          case 25:
            return 53;
            break;
          case 26:
            return 54;
            break;
          case 27:
            return 53;
            break;
          case 28:
            return 54;
            break;
          case 29:
            return 24;
            break;
          case 30:
            return 13;
            break;
          case 31:
            return 13;
            break;
          case 32:
            return 17;
            break;
          case 33:
            return 17;
            break;
          case 34:
            return 15;
            break;
          case 35:
            return 15;
            break;
          case 36:
            return 14;
            break;
          case 37:
            return 14;
            break;
          case 38:
            return 16;
            break;
          case 39:
            return 16;
            break;
          case 40:
            return 19;
            break;
          case 41:
            return 19;
            break;
          case 42:
            return 18;
            break;
          case 43:
            return 18;
            break;
          case 44:
            return 20;
            break;
          case 45:
            return 20;
            break;
          case 46:
            return 21;
            break;
          case 47:
            return 21;
            break;
          case 48:
            return 30;
            break;
          case 49:
            return 31;
            break;
          case 50:
            return 50;
            break;
          case 51:
            return 48;
            break;
          case 52:
            return 48;
            break;
          case 53:
            return 48;
            break;
          case 54:
            return 48;
            break;
          case 55:
            return 10;
            break;
          case 56:
            return 11;
            break;
          case 57:
            return 9;
            break;
          case 58:
            return 8;
            break;
          case 59:
            return 25;
            break;
          case 60:
            return 33;
            break;
          case 61:
            return 22;
            break;
          case 62:
            return 23;
            break;
          case 63:
            return 49;
            break;
          case 64:
            return 26;
            break;
          case 65:
            return 27;
            break;
          case 66:
            return 26;
            break;
          case 67:
            return 28;
            break;
          case 68:
            return 29;
            break;
          case 69:
            return 32;
            break;
          case 70:
            return 38;
            break;
          case 71:
            return 39;
            break;
          case 72:
            return 33;
            break;
          case 73:
            return 36;
            break;
          case 74:
            return 37;
            break;
          case 75:
            return 34;
            break;
          case 76:
            return 35;
            break;
          case 77:
            return 7;
            break;
          case 78:
            return 5;
            break;
          case 79:
            return 'INVALID';
            break;
        }
      },
      rules: [
        /^(?:\s+)/,
        /^(?:#?[0-9]+\.?([0-9#]+)?)/,
        /^(?:(#?\.?[0-9#]+))/,
        /^(?:(\\frac\{))/,
        /^(?:(\\cdot))/,
        /^(?:(\\left\())/,
        /^(?:(\\right\)))/,
        /^(?:(\\left\[))/,
        /^(?:(\\right\]))/,
        /^(?:(\\left\\\{))/,
        /^(?:(\\right\\\}))/,
        /^(?:(\\left\|))/,
        /^(?:(\\right\|))/,
        /^(?:(\\log_\{))/,
        /^(?:(\\log_))/,
        /^(?:(\\sqrt\{))/,
        /^(?:(\\sqrt\[))/,
        /^(?:(\\oplus))/,
        /^(?:(\\times))/,
        /^(?:(\\otimes))/,
        /^(?:(\\divide))/,
        /^(?:(\\div))/,
        /^(?:pi\b)/,
        /^(?:\\pi\b)/,
        /^(?:e\b)/,
        /^(?:(true))/,
        /^(?:(false))/,
        /^(?:(\\operatorname\{true\}))/,
        /^(?:(\\operatorname\{false\}))/,
        /^(?:(E))/,
        /^(?:(mod))/,
        /^(?:(\\operatorname\{mod\}))/,
        /^(?:(not))/,
        /^(?:(\\operatorname\{not\}))/,
        /^(?:(and))/,
        /^(?:(\\operatorname\{and\}))/,
        /^(?:(or))/,
        /^(?:(\\operatorname\{or\}))/,
        /^(?:(xor))/,
        /^(?:(\\operatorname\{xor\}))/,
        /^(?:(bitand))/,
        /^(?:(\\operatorname\{bitand\}))/,
        /^(?:(bitor))/,
        /^(?:(\\operatorname\{bitor\}))/,
        /^(?:(bitxor))/,
        /^(?:(\\operatorname\{bitxor\}))/,
        /^(?:(bitnot))/,
        /^(?:(\\operatorname\{bitnot\}))/,
        /^(?:(\\le))/,
        /^(?:(\\ge))/,
        /^(?:"(.+?)?")/,
        /^(?:\\[a-zA-Z"$"]+([0-9a-zA-Z"$"]+)?_\{([0-9a-zA-Z"_$"]+\}))/,
        /^(?:\\[a-zA-Z"_$"]+([0-9a-zA-Z"_$"]+)?)/,
        /^(?:[a-zA-Z"$"]+([0-9a-zA-Z"$"]+)?_\{([0-9a-zA-Z"_$"]+\}))/,
        /^(?:[a-zA-Z"_$"]+([0-9a-zA-Z"_$"]+)?)/,
        /^(?:\*)/,
        /^(?:\/)/,
        /^(?:-)/,
        /^(?:\+)/,
        /^(?:\^)/,
        /^(?:(\\%))/,
        /^(?:>>)/,
        /^(?:<<)/,
        /^(?::=)/,
        /^(?:==)/,
        /^(?:!=)/,
        /^(?:=)/,
        /^(?:<)/,
        /^(?:>)/,
        /^(?:!)/,
        /^(?:\{)/,
        /^(?:\})/,
        /^(?:%)/,
        /^(?:\[)/,
        /^(?:\])/,
        /^(?:\()/,
        /^(?:\))/,
        /^(?:,)/,
        /^(?:$)/,
        /^(?:.)/,
      ],
      conditions: {
        INITIAL: {
          rules: [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            46,
            47,
            48,
            49,
            50,
            51,
            52,
            53,
            54,
            55,
            56,
            57,
            58,
            59,
            60,
            61,
            62,
            63,
            64,
            65,
            66,
            67,
            68,
            69,
            70,
            71,
            72,
            73,
            74,
            75,
            76,
            77,
            78,
            79,
          ],
          inclusive: true,
        },
      },
    };
    return ar;
  })();
  J.lexer = ac;
  function i() {
    this.yy = {};
  }
  i.prototype = J;
  J.Parser = i;
  return new i();
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
  exports.parser = Calculator.Eval;
  exports.Parser = Calculator.Eval.Parser;
  exports.parse = function () {
    return Calculator.Eval.parse.apply(Calculator.Eval, arguments);
  };
  exports.main = function commonjsMain(a) {
    if (!a[1]) {
      console.log('Usage: ' + a[0] + ' FILE');
      process.exit(1);
    }
    var d = require('fs').readFileSync(require('path').normalize(a[1]), 'utf8');
    return exports.parser.parse(d);
  };
  if (typeof module !== 'undefined' && require.main === module) {
    exports.main(process.argv.slice(1));
  }
}
