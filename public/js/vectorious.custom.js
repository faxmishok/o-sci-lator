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
            // Matrix.prototype.gauss
            // ?> performs Gaussian elimination on a matrix
            // => returns the matrix in reduced row echelon form
            (e.prototype.gauss = function () {
              var l = this.shape[0],
                m = this.shape[1],
                o;

              var copy = new e(this),
                lead = 0,
                pivot,
                i,
                j;

              for (i = 0; i < l; i++) {
                if (m <= lead) return copy;

                j = i;
                while (Math.abs(copy.data[j * m + lead]) <= 1e-10) {
                  j++;
                  if (l === j) {
                    j = i;
                    lead++;

                    if (m === lead) return copy;
                  }
                }

                copy.swap(i, j);
                // console.log('A' + copy.toString());

                pivot = copy.data[i * m + lead];
                if (pivot !== 0) {
                  for (o = 0; o < m; o++) {
                    copy.data[i * m + o] /= pivot;
                  }
                }
                // console.log('B' + copy.toString());

                for (j = 0; j < l; j++) {
                  if (j !== i) {
                    var a = copy.data[j * m + lead];
                    for (o = 0; o < m; o++) {
                      copy.data[j * m + o] -= copy.data[i * m + o] * a;
                    }
                  }
                }
                // console.log('C' + copy.toString());
                lead++;
              }

              for (i = 0; i < l; i++) {
                pivot = 0;
                for (j = 0; j < m; j++)
                  if (!pivot) pivot = copy.data[i * m + j];

                if (pivot)
                  for (o = 0; o < m; o++)
                    copy.data[i * m + o] = copy.data[i * m + o] / pivot;
              }

              return copy;
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
