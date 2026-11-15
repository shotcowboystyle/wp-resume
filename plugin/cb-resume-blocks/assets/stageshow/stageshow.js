var _t, P, ur, Oe, bn, _r, It, nn, Gt, Kt, dr, st = {}, fr = [], io = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, Et = Array.isArray;
function Ne(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function hr(e) {
  e && e.parentNode && e.parentNode.removeChild(e);
}
function Jt(e, t, n) {
  var r, o, a, s = {};
  for (a in t) a == "key" ? r = t[a] : a == "ref" ? o = t[a] : s[a] = t[a];
  if (arguments.length > 2 && (s.children = arguments.length > 3 ? _t.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null) for (a in e.defaultProps) s[a] === void 0 && (s[a] = e.defaultProps[a]);
  return ot(e, s, r, o, null);
}
function ot(e, t, n, r, o) {
  var a = { type: e, props: t, key: n, ref: r, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: o ?? ++ur, __i: -1, __u: 0 };
  return o == null && P.vnode != null && P.vnode(a), a;
}
function Ee(e) {
  return e.children;
}
function Se(e, t) {
  this.props = e, this.context = t;
}
function Ye(e, t) {
  if (t == null) return e.__ ? Ye(e.__, e.__i + 1) : null;
  for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
  return typeof e.type == "function" ? Ye(e) : null;
}
function pr(e) {
  var t, n;
  if ((e = e.__) != null && e.__c != null) {
    for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) {
      e.__e = e.__c.base = n.__e;
      break;
    }
    return pr(e);
  }
}
function Yt(e) {
  (!e.__d && (e.__d = !0) && Oe.push(e) && !Nt.__r++ || bn !== P.debounceRendering) && ((bn = P.debounceRendering) || _r)(Nt);
}
function Nt() {
  var e, t, n, r, o, a, s, c;
  for (Oe.sort(It); e = Oe.shift(); ) e.__d && (t = Oe.length, r = void 0, a = (o = (n = e).__v).__e, s = [], c = [], n.__P && ((r = Ne({}, o)).__v = o.__v + 1, P.vnode && P.vnode(r), rn(n.__P, r, o, n.__n, n.__P.namespaceURI, 32 & o.__u ? [a] : null, s, a ?? Ye(o), !!(32 & o.__u), c), r.__v = o.__v, r.__.__k[r.__i] = r, vr(s, r, c), r.__e != a && pr(r)), Oe.length > t && Oe.sort(It));
  Nt.__r = 0;
}
function mr(e, t, n, r, o, a, s, c, d, l, h) {
  var _, u, f, k, A, N = r && r.__k || fr, p = t.length;
  for (n.__d = d, co(n, t, N), d = n.__d, _ = 0; _ < p; _++) (f = n.__k[_]) != null && (u = f.__i === -1 ? st : N[f.__i] || st, f.__i = _, rn(e, f, u, o, a, s, c, d, l, h), k = f.__e, f.ref && u.ref != f.ref && (u.ref && on(u.ref, null, f), h.push(f.ref, f.__c || k, f)), A == null && k != null && (A = k), 65536 & f.__u || u.__k === f.__k ? d = yr(f, d, e) : typeof f.type == "function" && f.__d !== void 0 ? d = f.__d : k && (d = k.nextSibling), f.__d = void 0, f.__u &= -196609);
  n.__d = d, n.__e = A;
}
function co(e, t, n) {
  var r, o, a, s, c, d = t.length, l = n.length, h = l, _ = 0;
  for (e.__k = [], r = 0; r < d; r++) (o = t[r]) != null && typeof o != "boolean" && typeof o != "function" ? (s = r + _, (o = e.__k[r] = typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? ot(null, o, null, null, null) : Et(o) ? ot(Ee, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? ot(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : o).__ = e, o.__b = e.__b + 1, a = null, (c = o.__i = lo(o, n, s, h)) !== -1 && (h--, (a = n[c]) && (a.__u |= 131072)), a == null || a.__v === null ? (c == -1 && _--, typeof o.type != "function" && (o.__u |= 65536)) : c !== s && (c == s - 1 ? _-- : c == s + 1 ? _++ : (c > s ? _-- : _++, o.__u |= 65536))) : o = e.__k[r] = null;
  if (h) for (r = 0; r < l; r++) (a = n[r]) != null && (131072 & a.__u) == 0 && (a.__e == e.__d && (e.__d = Ye(a)), gr(a, a));
}
function yr(e, t, n) {
  var r, o;
  if (typeof e.type == "function") {
    for (r = e.__k, o = 0; r && o < r.length; o++) r[o] && (r[o].__ = e, t = yr(r[o], t, n));
    return t;
  }
  e.__e != t && (t && e.type && !n.contains(t) && (t = Ye(e)), n.insertBefore(e.__e, t || null), t = e.__e);
  do
    t = t && t.nextSibling;
  while (t != null && t.nodeType === 8);
  return t;
}
function Ce(e, t) {
  return t = t || [], e == null || typeof e == "boolean" || (Et(e) ? e.some(function(n) {
    Ce(n, t);
  }) : t.push(e)), t;
}
function lo(e, t, n, r) {
  var o = e.key, a = e.type, s = n - 1, c = n + 1, d = t[n];
  if (d === null || d && o == d.key && a === d.type && (131072 & d.__u) == 0) return n;
  if (r > (d != null && (131072 & d.__u) == 0 ? 1 : 0)) for (; s >= 0 || c < t.length; ) {
    if (s >= 0) {
      if ((d = t[s]) && (131072 & d.__u) == 0 && o == d.key && a === d.type) return s;
      s--;
    }
    if (c < t.length) {
      if ((d = t[c]) && (131072 & d.__u) == 0 && o == d.key && a === d.type) return c;
      c++;
    }
  }
  return -1;
}
function kn(e, t, n) {
  t[0] === "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || io.test(t) ? n : n + "px";
}
function vt(e, t, n, r, o) {
  var a;
  e: if (t === "style") if (typeof n == "string") e.style.cssText = n;
  else {
    if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || kn(e.style, t, "");
    if (n) for (t in n) r && n[t] === r[t] || kn(e.style, t, n[t]);
  }
  else if (t[0] === "o" && t[1] === "n") a = t !== (t = t.replace(/(PointerCapture)$|Capture$/i, "$1")), t = t.toLowerCase() in e || t === "onFocusOut" || t === "onFocusIn" ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + a] = n, n ? r ? n.u = r.u : (n.u = nn, e.addEventListener(t, a ? Kt : Gt, a)) : e.removeEventListener(t, a ? Kt : Gt, a);
  else {
    if (o == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
      e[t] = n ?? "";
      break e;
    } catch {
    }
    typeof n == "function" || (n == null || n === !1 && t[4] !== "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
  }
}
function xn(e) {
  return function(t) {
    if (this.l) {
      var n = this.l[t.type + e];
      if (t.t == null) t.t = nn++;
      else if (t.t < n.u) return;
      return n(P.event ? P.event(t) : t);
    }
  };
}
function rn(e, t, n, r, o, a, s, c, d, l) {
  var h, _, u, f, k, A, N, p, x, F, z, W, K, S, m, R, M = t.type;
  if (t.constructor !== void 0) return null;
  128 & n.__u && (d = !!(32 & n.__u), a = [c = t.__e = n.__e]), (h = P.__b) && h(t);
  e: if (typeof M == "function") try {
    if (p = t.props, x = "prototype" in M && M.prototype.render, F = (h = M.contextType) && r[h.__c], z = h ? F ? F.props.value : h.__ : r, n.__c ? N = (_ = t.__c = n.__c).__ = _.__E : (x ? t.__c = _ = new M(p, z) : (t.__c = _ = new Se(p, z), _.constructor = M, _.render = _o), F && F.sub(_), _.props = p, _.state || (_.state = {}), _.context = z, _.__n = r, u = _.__d = !0, _.__h = [], _._sb = []), x && _.__s == null && (_.__s = _.state), x && M.getDerivedStateFromProps != null && (_.__s == _.state && (_.__s = Ne({}, _.__s)), Ne(_.__s, M.getDerivedStateFromProps(p, _.__s))), f = _.props, k = _.state, _.__v = t, u) x && M.getDerivedStateFromProps == null && _.componentWillMount != null && _.componentWillMount(), x && _.componentDidMount != null && _.__h.push(_.componentDidMount);
    else {
      if (x && M.getDerivedStateFromProps == null && p !== f && _.componentWillReceiveProps != null && _.componentWillReceiveProps(p, z), !_.__e && (_.shouldComponentUpdate != null && _.shouldComponentUpdate(p, _.__s, z) === !1 || t.__v === n.__v)) {
        for (t.__v !== n.__v && (_.props = p, _.state = _.__s, _.__d = !1), t.__e = n.__e, t.__k = n.__k, t.__k.some(function(C) {
          C && (C.__ = t);
        }), W = 0; W < _._sb.length; W++) _.__h.push(_._sb[W]);
        _._sb = [], _.__h.length && s.push(_);
        break e;
      }
      _.componentWillUpdate != null && _.componentWillUpdate(p, _.__s, z), x && _.componentDidUpdate != null && _.__h.push(function() {
        _.componentDidUpdate(f, k, A);
      });
    }
    if (_.context = z, _.props = p, _.__P = e, _.__e = !1, K = P.__r, S = 0, x) {
      for (_.state = _.__s, _.__d = !1, K && K(t), h = _.render(_.props, _.state, _.context), m = 0; m < _._sb.length; m++) _.__h.push(_._sb[m]);
      _._sb = [];
    } else do
      _.__d = !1, K && K(t), h = _.render(_.props, _.state, _.context), _.state = _.__s;
    while (_.__d && ++S < 25);
    _.state = _.__s, _.getChildContext != null && (r = Ne(Ne({}, r), _.getChildContext())), x && !u && _.getSnapshotBeforeUpdate != null && (A = _.getSnapshotBeforeUpdate(f, k)), mr(e, Et(R = h != null && h.type === Ee && h.key == null ? h.props.children : h) ? R : [R], t, n, r, o, a, s, c, d, l), _.base = t.__e, t.__u &= -161, _.__h.length && s.push(_), N && (_.__E = _.__ = null);
  } catch (C) {
    if (t.__v = null, d || a != null) {
      for (t.__u |= d ? 160 : 128; c && c.nodeType === 8 && c.nextSibling; ) c = c.nextSibling;
      a[a.indexOf(c)] = null, t.__e = c;
    } else t.__e = n.__e, t.__k = n.__k;
    P.__e(C, t, n);
  }
  else a == null && t.__v === n.__v ? (t.__k = n.__k, t.__e = n.__e) : t.__e = uo(n.__e, t, n, r, o, a, s, d, l);
  (h = P.diffed) && h(t);
}
function vr(e, t, n) {
  t.__d = void 0;
  for (var r = 0; r < n.length; r++) on(n[r], n[++r], n[++r]);
  P.__c && P.__c(t, e), e.some(function(o) {
    try {
      e = o.__h, o.__h = [], e.some(function(a) {
        a.call(o);
      });
    } catch (a) {
      P.__e(a, o.__v);
    }
  });
}
function uo(e, t, n, r, o, a, s, c, d) {
  var l, h, _, u, f, k, A, N = n.props, p = t.props, x = t.type;
  if (x === "svg" ? o = "http://www.w3.org/2000/svg" : x === "math" ? o = "http://www.w3.org/1998/Math/MathML" : o || (o = "http://www.w3.org/1999/xhtml"), a != null) {
    for (l = 0; l < a.length; l++) if ((f = a[l]) && "setAttribute" in f == !!x && (x ? f.localName === x : f.nodeType === 3)) {
      e = f, a[l] = null;
      break;
    }
  }
  if (e == null) {
    if (x === null) return document.createTextNode(p);
    e = document.createElementNS(o, x, p.is && p), c && (P.__m && P.__m(t, a), c = !1), a = null;
  }
  if (x === null) N === p || c && e.data === p || (e.data = p);
  else {
    if (a = a && _t.call(e.childNodes), N = n.props || st, !c && a != null) for (N = {}, l = 0; l < e.attributes.length; l++) N[(f = e.attributes[l]).name] = f.value;
    for (l in N) if (f = N[l], l != "children") {
      if (l == "dangerouslySetInnerHTML") _ = f;
      else if (!(l in p)) {
        if (l == "value" && "defaultValue" in p || l == "checked" && "defaultChecked" in p) continue;
        vt(e, l, null, f, o);
      }
    }
    for (l in p) f = p[l], l == "children" ? u = f : l == "dangerouslySetInnerHTML" ? h = f : l == "value" ? k = f : l == "checked" ? A = f : c && typeof f != "function" || N[l] === f || vt(e, l, f, N[l], o);
    if (h) c || _ && (h.__html === _.__html || h.__html === e.innerHTML) || (e.innerHTML = h.__html), t.__k = [];
    else if (_ && (e.innerHTML = ""), mr(e, Et(u) ? u : [u], t, n, r, x === "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, a, s, a ? a[0] : n.__k && Ye(n, 0), c, d), a != null) for (l = a.length; l--; ) hr(a[l]);
    c || (l = "value", x === "progress" && k == null ? e.removeAttribute("value") : k !== void 0 && (k !== e[l] || x === "progress" && !k || x === "option" && k !== N[l]) && vt(e, l, k, N[l], o), l = "checked", A !== void 0 && A !== e[l] && vt(e, l, A, N[l], o));
  }
  return e;
}
function on(e, t, n) {
  try {
    if (typeof e == "function") {
      var r = typeof e.__u == "function";
      r && e.__u(), r && t == null || (e.__u = e(t));
    } else e.current = t;
  } catch (o) {
    P.__e(o, n);
  }
}
function gr(e, t, n) {
  var r, o;
  if (P.unmount && P.unmount(e), (r = e.ref) && (r.current && r.current !== e.__e || on(r, null, t)), (r = e.__c) != null) {
    if (r.componentWillUnmount) try {
      r.componentWillUnmount();
    } catch (a) {
      P.__e(a, t);
    }
    r.base = r.__P = null;
  }
  if (r = e.__k) for (o = 0; o < r.length; o++) r[o] && gr(r[o], t, n || typeof e.type != "function");
  n || hr(e.__e), e.__c = e.__ = e.__e = e.__d = void 0;
}
function _o(e, t, n) {
  return this.constructor(e, n);
}
function wr(e, t, n) {
  var r, o, a, s;
  P.__ && P.__(e, t), o = (r = !1) ? null : t.__k, a = [], s = [], rn(t, e = t.__k = Jt(Ee, null, [e]), o || st, st, t.namespaceURI, o ? null : t.firstChild ? _t.call(t.childNodes) : null, a, o ? o.__e : t.firstChild, r, s), vr(a, e, s);
}
function fo(e, t, n) {
  var r, o, a, s, c = Ne({}, e.props);
  for (a in e.type && e.type.defaultProps && (s = e.type.defaultProps), t) a == "key" ? r = t[a] : a == "ref" ? o = t[a] : c[a] = t[a] === void 0 && s !== void 0 ? s[a] : t[a];
  return arguments.length > 2 && (c.children = arguments.length > 3 ? _t.call(arguments, 2) : n), ot(e.type, c, r || e.key, o || e.ref, null);
}
function an(e, t) {
  var n = { __c: t = "__cC" + dr++, __: e, Consumer: function(r, o) {
    return r.children(o);
  }, Provider: function(r) {
    var o, a;
    return this.getChildContext || (o = /* @__PURE__ */ new Set(), (a = {})[t] = this, this.getChildContext = function() {
      return a;
    }, this.componentWillUnmount = function() {
      o = null;
    }, this.shouldComponentUpdate = function(s) {
      this.props.value !== s.value && o.forEach(function(c) {
        c.__e = !0, Yt(c);
      });
    }, this.sub = function(s) {
      o.add(s);
      var c = s.componentWillUnmount;
      s.componentWillUnmount = function() {
        o && o.delete(s), c && c.call(s);
      };
    }), r.children;
  } };
  return n.Provider.__ = n.Consumer.contextType = n;
}
_t = fr.slice, P = { __e: function(e, t, n, r) {
  for (var o, a, s; t = t.__; ) if ((o = t.__c) && !o.__) try {
    if ((a = o.constructor) && a.getDerivedStateFromError != null && (o.setState(a.getDerivedStateFromError(e)), s = o.__d), o.componentDidCatch != null && (o.componentDidCatch(e, r || {}), s = o.__d), s) return o.__E = o;
  } catch (c) {
    e = c;
  }
  throw e;
} }, ur = 0, Se.prototype.setState = function(e, t) {
  var n;
  n = this.__s != null && this.__s !== this.state ? this.__s : this.__s = Ne({}, this.state), typeof e == "function" && (e = e(Ne({}, n), this.props)), e && Ne(n, e), e != null && this.__v && (t && this._sb.push(t), Yt(this));
}, Se.prototype.forceUpdate = function(e) {
  this.__v && (this.__e = !0, e && this.__h.push(e), Yt(this));
}, Se.prototype.render = Ee, Oe = [], _r = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, It = function(e, t) {
  return e.__v.__b - t.__v.__b;
}, Nt.__r = 0, nn = 0, Gt = xn(!1), Kt = xn(!0), dr = 0;
var ze, J, qt, $n, it = 0, br = [], re = P, Mn = re.__b, Nn = re.__r, An = re.diffed, Sn = re.__c, Cn = re.unmount, Ln = re.__;
function dt(e, t) {
  re.__h && re.__h(J, e, it || t), it = 0;
  var n = J.__H || (J.__H = { __: [], __h: [] });
  return e >= n.__.length && n.__.push({}), n.__[e];
}
function ue(e) {
  return it = 1, ho(kr, e);
}
function ho(e, t, n) {
  var r = dt(ze++, 2);
  if (r.t = e, !r.__c && (r.__ = [n ? n(t) : kr(void 0, t), function(c) {
    var d = r.__N ? r.__N[0] : r.__[0], l = r.t(d, c);
    d !== l && (r.__N = [l, r.__[1]], r.__c.setState({}));
  }], r.__c = J, !J.u)) {
    var o = function(c, d, l) {
      if (!r.__c.__H) return !0;
      var h = r.__c.__H.__.filter(function(u) {
        return !!u.__c;
      });
      if (h.every(function(u) {
        return !u.__N;
      })) return !a || a.call(this, c, d, l);
      var _ = !1;
      return h.forEach(function(u) {
        if (u.__N) {
          var f = u.__[0];
          u.__ = u.__N, u.__N = void 0, f !== u.__[0] && (_ = !0);
        }
      }), !(!_ && r.__c.props === c) && (!a || a.call(this, c, d, l));
    };
    J.u = !0;
    var a = J.shouldComponentUpdate, s = J.componentWillUpdate;
    J.componentWillUpdate = function(c, d, l) {
      if (this.__e) {
        var h = a;
        a = void 0, o(c, d, l), a = h;
      }
      s && s.call(this, c, d, l);
    }, J.shouldComponentUpdate = o;
  }
  return r.__N || r.__;
}
function Xe(e, t) {
  var n = dt(ze++, 3);
  !re.__s && cn(n.__H, t) && (n.__ = e, n.i = t, J.__H.__h.push(n));
}
function me(e, t) {
  var n = dt(ze++, 4);
  !re.__s && cn(n.__H, t) && (n.__ = e, n.i = t, J.__h.push(n));
}
function Z(e) {
  return it = 5, At(function() {
    return { current: e };
  }, []);
}
function At(e, t) {
  var n = dt(ze++, 7);
  return cn(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function We(e, t) {
  return it = 8, At(function() {
    return e;
  }, t);
}
function sn(e) {
  var t = J.context[e.__c], n = dt(ze++, 9);
  return n.c = e, t ? (n.__ == null && (n.__ = !0, t.sub(J)), t.props.value) : e.__;
}
function po() {
  for (var e; e = br.shift(); ) if (e.__P && e.__H) try {
    e.__H.__h.forEach(kt), e.__H.__h.forEach(Xt), e.__H.__h = [];
  } catch (t) {
    e.__H.__h = [], re.__e(t, e.__v);
  }
}
re.__b = function(e) {
  J = null, Mn && Mn(e);
}, re.__ = function(e, t) {
  e && t.__k && t.__k.__m && (e.__m = t.__k.__m), Ln && Ln(e, t);
}, re.__r = function(e) {
  Nn && Nn(e), ze = 0;
  var t = (J = e.__c).__H;
  t && (qt === J ? (t.__h = [], J.__h = [], t.__.forEach(function(n) {
    n.__N && (n.__ = n.__N), n.i = n.__N = void 0;
  })) : (t.__h.forEach(kt), t.__h.forEach(Xt), t.__h = [], ze = 0)), qt = J;
}, re.diffed = function(e) {
  An && An(e);
  var t = e.__c;
  t && t.__H && (t.__H.__h.length && (br.push(t) !== 1 && $n === re.requestAnimationFrame || (($n = re.requestAnimationFrame) || mo)(po)), t.__H.__.forEach(function(n) {
    n.i && (n.__H = n.i), n.i = void 0;
  })), qt = J = null;
}, re.__c = function(e, t) {
  t.some(function(n) {
    try {
      n.__h.forEach(kt), n.__h = n.__h.filter(function(r) {
        return !r.__ || Xt(r);
      });
    } catch (r) {
      t.some(function(o) {
        o.__h && (o.__h = []);
      }), t = [], re.__e(r, n.__v);
    }
  }), Sn && Sn(e, t);
}, re.unmount = function(e) {
  Cn && Cn(e);
  var t, n = e.__c;
  n && n.__H && (n.__H.__.forEach(function(r) {
    try {
      kt(r);
    } catch (o) {
      t = o;
    }
  }), n.__H = void 0, t && re.__e(t, n.__v));
};
var En = typeof requestAnimationFrame == "function";
function mo(e) {
  var t, n = function() {
    clearTimeout(r), En && cancelAnimationFrame(t), setTimeout(e);
  }, r = setTimeout(n, 100);
  En && (t = requestAnimationFrame(n));
}
function kt(e) {
  var t = J, n = e.__c;
  typeof n == "function" && (e.__c = void 0, n()), J = t;
}
function Xt(e) {
  var t = J;
  e.__c = e.__(), J = t;
}
function cn(e, t) {
  return !e || e.length !== t.length || t.some(function(n, r) {
    return n !== e[r];
  });
}
function kr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Pn(e, t) {
  for (var n in e) if (n !== "__source" && !(n in t)) return !0;
  for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
  return !1;
}
function Rn(e, t) {
  this.props = e, this.context = t;
}
(Rn.prototype = new Se()).isPureReactComponent = !0, Rn.prototype.shouldComponentUpdate = function(e, t) {
  return Pn(this.props, e) || Pn(this.state, t);
};
var Tn = P.__b;
P.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), Tn && Tn(e);
};
var Hn = function(e, t) {
  return e == null ? null : Ce(Ce(e).map(t));
}, yo = { map: Hn, forEach: Hn, count: function(e) {
  return e ? Ce(e).length : 0;
}, only: function(e) {
  var t = Ce(e);
  if (t.length !== 1) throw "Children.only";
  return t[0];
}, toArray: Ce }, vo = P.__e;
P.__e = function(e, t, n, r) {
  if (e.then) {
    for (var o, a = t; a = a.__; ) if ((o = a.__c) && o.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k), o.__c(e, t);
  }
  vo(e, t, n, r);
};
var Wn = P.unmount;
function xr(e, t, n) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = (function(r, o) {
    for (var a in o) r[a] = o[a];
    return r;
  })({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return xr(r, t, n);
  })), e;
}
function $r(e, t, n) {
  return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return $r(r, t, n);
  }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function Zt() {
  this.__u = 0, this.t = null, this.__b = null;
}
function Mr(e) {
  var t = e.__.__c;
  return t && t.__a && t.__a(e);
}
function gt() {
  this.u = null, this.o = null;
}
P.unmount = function(e) {
  var t = e.__c;
  t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), Wn && Wn(e);
}, (Zt.prototype = new Se()).__c = function(e, t) {
  var n = t.__c, r = this;
  r.t == null && (r.t = []), r.t.push(n);
  var o = Mr(r.__v), a = !1, s = function() {
    a || (a = !0, n.__R = null, o ? o(c) : c());
  };
  n.__R = s;
  var c = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var d = r.state.__a;
        r.__v.__k[0] = $r(d, d.__c.__P, d.__c.__O);
      }
      var l;
      for (r.setState({ __a: r.__b = null }); l = r.t.pop(); ) l.forceUpdate();
    }
  };
  r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(s, s);
}, Zt.prototype.componentWillUnmount = function() {
  this.t = [];
}, Zt.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = xr(this.__b, n, r.__O = r.__P);
    }
    this.__b = null;
  }
  var o = t.__a && Jt(Ee, null, e.fallback);
  return o && (o.__u &= -33), [Jt(Ee, null, t.__a ? null : e.children), o];
};
var On = function(e, t, n) {
  if (++n[1] === n[0] && e.o.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.o.size)) for (n = e.u; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    e.u = n = n[2];
  }
};
(gt.prototype = new Se()).__a = function(e) {
  var t = this, n = Mr(t.__v), r = t.o.get(e);
  return r[0]++, function(o) {
    var a = function() {
      t.props.revealOrder ? (r.push(o), On(t, e, r)) : o();
    };
    n ? n(a) : a();
  };
}, gt.prototype.render = function(e) {
  this.u = null, this.o = /* @__PURE__ */ new Map();
  var t = Ce(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var n = t.length; n--; ) this.o.set(t[n], this.u = [1, 0, this.u]);
  return e.children;
}, gt.prototype.componentDidUpdate = gt.prototype.componentDidMount = function() {
  var e = this;
  this.o.forEach(function(t, n) {
    On(e, n, t);
  });
};
var Nr = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, go = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, wo = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, bo = /[A-Z0-9]/g, ko = typeof document < "u", xo = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
function $o(e, t, n) {
  return t.__k == null && (t.textContent = ""), wr(e, t), typeof n == "function" && n(), e ? e.__c : null;
}
Se.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(Se.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var Fn = P.event;
function Mo() {
}
function No() {
  return this.cancelBubble;
}
function Ao() {
  return this.defaultPrevented;
}
P.event = function(e) {
  return Fn && (e = Fn(e)), e.persist = Mo, e.isPropagationStopped = No, e.isDefaultPrevented = Ao, e.nativeEvent = e;
};
var So = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, zn = P.vnode;
P.vnode = function(e) {
  typeof e.type == "string" && (function(t) {
    var n = t.props, r = t.type, o = {}, a = r.indexOf("-") === -1;
    for (var s in n) {
      var c = n[s];
      if (!(s === "value" && "defaultValue" in n && c == null || ko && s === "children" && r === "noscript" || s === "class" || s === "className")) {
        var d = s.toLowerCase();
        s === "defaultValue" && "value" in n && n.value == null ? s = "value" : s === "download" && c === !0 ? c = "" : d === "translate" && c === "no" ? c = !1 : d[0] === "o" && d[1] === "n" ? d === "ondoubleclick" ? s = "ondblclick" : d !== "onchange" || r !== "input" && r !== "textarea" || xo(n.type) ? d === "onfocus" ? s = "onfocusin" : d === "onblur" ? s = "onfocusout" : wo.test(s) && (s = d) : d = s = "oninput" : a && go.test(s) ? s = s.replace(bo, "-$&").toLowerCase() : c === null && (c = void 0), d === "oninput" && o[s = d] && (s = "oninputCapture"), o[s] = c;
      }
    }
    r == "select" && o.multiple && Array.isArray(o.value) && (o.value = Ce(n.children).forEach(function(l) {
      l.props.selected = o.value.indexOf(l.props.value) != -1;
    })), r == "select" && o.defaultValue != null && (o.value = Ce(n.children).forEach(function(l) {
      l.props.selected = o.multiple ? o.defaultValue.indexOf(l.props.value) != -1 : o.defaultValue == l.props.value;
    })), n.class && !n.className ? (o.class = n.class, Object.defineProperty(o, "className", So)) : (n.className && !n.class || n.class && n.className) && (o.class = o.className = n.className), t.props = o;
  })(e), e.$$typeof = Nr, zn && zn(e);
};
var Bn = P.__r;
P.__r = function(e) {
  Bn && Bn(e), e.__c;
};
var Un = P.diffed;
P.diffed = function(e) {
  Un && Un(e);
  var t = e.props, n = e.__e;
  n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
function Ar(e) {
  return !!e && e.$$typeof === Nr;
}
function Co(e) {
  return Ar(e) ? fo.apply(null, arguments) : e;
}
function Lo(e) {
  return !!e.__k && (wr(null, e), !0);
}
var Dn = function(e, t) {
  return e(t);
}, Eo = 0;
function i(e, t, n, r, o, a) {
  t || (t = {});
  var s, c, d = t;
  "ref" in t && (s = t.ref, delete t.ref);
  var l = { type: e, props: d, key: n, ref: s, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: --Eo, __i: -1, __u: 0, __source: o, __self: a };
  if (typeof e == "function" && (s = e.defaultProps)) for (c in s) d[c] === void 0 && (d[c] = s[c]);
  return P.vnode && P.vnode(l), l;
}
function Po(e) {
  return {
    // eslint-disable-next-line
    render: function(t) {
      $o(t, e);
    },
    // eslint-disable-next-line
    unmount: function() {
      Lo(e);
    }
  };
}
const Ro = { cmd: "⌘", shift: "⇧", alt: "⌥", option: "⌥", ctrl: "⌃", enter: "↵", return: "↵", esc: "esc", tab: "⇥", up: "↑", down: "↓", left: "←", right: "→", backspace: "⌫" }, To = (e) => e.split("+").map((t) => Ro[t.trim().toLowerCase()] ?? t.trim().toUpperCase());
function Ho({ rows: e, at: t }) {
  return /* @__PURE__ */ i(Ee, { children: e.map(
    (n) => n && /* @__PURE__ */ i("div", { className: "ss-keys", "data-show": n.show, "data-at": t, "aria-hidden": !0, children: n.caps.map((r, o) => /* @__PURE__ */ i("kbd", { className: "ss-key", "data-down": n.down, children: r }, o)) }, n.id)
  ) });
}
const Sr = { x: 0, y: 0, width: 0, height: 0 }, Cr = (e) => typeof e == "string" ? e : "at" in e ? e.at : null, Wo = (e, t) => e?.offsetWidth && e.getBoundingClientRect().width / e.offsetWidth || t || 1;
function ln(e, t) {
  const n = e.getBoundingClientRect();
  return { left: n.left, top: n.top, scale: e.offsetWidth && n.width / e.offsetWidth || t || 1, borderX: e.clientLeft, borderY: e.clientTop };
}
function ct(e, t, n, r = ln(e, n)) {
  const o = t.getBoundingClientRect(), { scale: a } = r;
  return { x: (o.left - r.left) / a - r.borderX, y: (o.top - r.top) / a - r.borderY, width: o.width / a, height: o.height / a };
}
function Oo(e, t, n, r = ln(e, n)) {
  const o = ct(e, t, n, r), a = getComputedStyle(t), s = a.transform, c = s && s !== "none" ? s.match(/^matrix\(([^)]+)\)$/) : null;
  if (!c) return o;
  const [d, l, h, _, u, f] = c[1].split(",").map(Number);
  if (l || h || u || f || !d || !_) return o;
  const k = o.width / d, A = o.height / _, [N, p] = a.transformOrigin.split(" ").map(parseFloat);
  return { x: o.x - N * (1 - d), y: o.y - p * (1 - _), width: k, height: A };
}
const Fo = (e) => {
  const t = getComputedStyle(e);
  return t.transform !== "none" || t.translate && t.translate !== "none" || t.scale && t.scale !== "none" || t.rotate && t.rotate !== "none";
};
function zo(e, t) {
  let n = !0;
  for (let s = t; s && s !== e; s = s.parentElement) if (Fo(s)) {
    n = !1;
    break;
  }
  if (n) return ct(e, t, 1);
  let r = 0, o = 0, a = t;
  for (; a && a !== e; ) {
    r += a.offsetLeft, o += a.offsetTop;
    const s = a.offsetParent;
    if (!s || !e.contains(s)) break;
    a = s, a !== e && (r += a.clientLeft - a.scrollLeft, o += a.clientTop - a.scrollTop);
  }
  return { x: r, y: o, width: t.offsetWidth, height: t.offsetHeight };
}
function qn(e, t) {
  const n = Object.keys(e);
  return n.length !== Object.keys(t).length ? !1 : n.every((r) => {
    const o = e[r], a = t[r];
    return a && Math.abs(o.x - a.x) < 0.5 && Math.abs(o.y - a.y) < 0.5 && Math.abs(o.width - a.width) < 0.5 && Math.abs(o.height - a.height) < 0.5;
  });
}
function Lr(e) {
  const t = e.parentElement;
  if (!t?.classList.contains("ss-scroller")) return;
  const n = e.clientHeight, r = e.scrollHeight, o = r > n ? Math.max(24, n / r * n) : 0, a = r > n ? e.scrollTop / (r - n) * (n - o) : 0;
  t.style.setProperty("--ss-thumb-h", `${o}px`), t.style.setProperty("--ss-thumb-y", `${a}px`);
}
const Bo = {
  /** Moves inside a shot (push-in, pan, a long cursor trip): peak at about 40%, long soft tail. 1.4 to 2.7 s. */
  house: [0.65, 0, 0.1, 1],
  /** The outgoing half of a move that ends in a cut: accelerates into it. */
  through: [0.8, 0, 0.1, 1],
  /** The incoming half after a cut: arrives at speed, settles. 0.6 to 0.8 s (1.6 s for a big pull-out). */
  settle: [0.05, 0.85, 0.3, 1],
  /** A cursor arriving from off-frame, already moving. */
  enter: [0.1, 0.8, 0.3, 0.95],
  /** One long cursor trip across the frame. */
  trip: [0.78, 0, 0.17, 1],
  /** The kit's camera push-in (Camera). */
  camera: [0.45, 0, 0.1, 1]
};
function Uo(e) {
  const [t, n, r, o] = Bo[e], a = 3 * t, s = 3 * (r - t) - a, c = 1 - a - s, d = 3 * n, l = 3 * (o - n) - d, h = 1 - d - l, _ = (f) => ((c * f + s) * f + a) * f, u = (f) => (3 * c * f + 2 * s) * f + a;
  return (f) => {
    if (f <= 0) return 0;
    if (f >= 1) return 1;
    let k = f;
    for (let A = 0; A < 8; A++) {
      const N = u(k);
      if (Math.abs(N) < 1e-6) break;
      const p = k - (_(k) - f) / N;
      if (p < 0 || p > 1) break;
      k = p;
    }
    if (Math.abs(_(k) - f) > 1e-6) {
      let A = 0, N = 1;
      for (let p = 0; p < 40; p++)
        k = (A + N) / 2, _(k) < f ? A = k : N = k;
    }
    return ((h * k + l) * k + d) * k;
  };
}
function Er() {
  try {
    return !1;
  } catch {
    return !0;
  }
}
function Ke(e) {
  Er() && console.warn(`[stageshow] ${e}`);
}
const Ie = (e, t, n) => Math.min(n, Math.max(t, e)), xt = (e) => e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2, Do = (e) => {
  const t = Math.sin(e * 12.9898) * 43758.5453;
  return t - Math.floor(t);
}, Zn = (e) => {
  e && window.setTimeout(() => e.removeAttribute("data-touching"), 240);
};
class Ge extends Error {
}
function qo(e, t) {
  const { rootRef: n, cursorRef: r, pos: o, hovered: a, kindRef: s, keysRef: c, dragging: d, autoUsed: l, autoRef: h, scaleRef: _, speed: u, layout: f, cursor: k, resolve: A, place: N, remeasure: p, ripple: x, setState: F, setKind: z, setKeys: W, setLastKeys: K } = t, S = Uo("enter"), m = () => {
    if (e.aborted) throw new Ge();
  }, R = (w, v) => new Promise((y, g) => {
    m();
    const b = () => {
      v(T), e.removeEventListener("abort", b), g(new Ge());
    }, T = w(() => {
      e.removeEventListener("abort", b), e.aborted ? g(new Ge()) : y();
    });
    e.addEventListener("abort", b, { once: !0 });
  }), M = () => R((w) => requestAnimationFrame(w), cancelAnimationFrame), C = (w) => R((v) => setTimeout(v, w / u), clearTimeout), ce = (w) => {
    let v = !0;
    const y = () => {
      v && (v = !1, e.removeEventListener("abort", y), w());
    };
    return e.addEventListener("abort", y, { once: !0 }), y;
  }, he = async (w, v) => {
    const y = performance.now(), g = w / u;
    for (; ; ) {
      m();
      const b = Math.min(1, (performance.now() - y) / g);
      if (v(b), b === 1) return;
      await M();
    }
  }, ee = (w) => {
    const v = [];
    for (let y = w; y && y !== n.current; y = y.parentElement) y.hasAttribute("data-target") && v.push(y);
    return v;
  }, le = (w) => {
    const v = n.current;
    if (!v) return;
    const y = v.querySelectorAll("[data-cursor]");
    if (!y.length && !l.current) return;
    y.length && (l.current = !0);
    const g = v.getBoundingClientRect(), b = g.width / v.offsetWidth || 1, T = v.dataset.cursorBase ?? "pointer";
    let j = T;
    v.setAttribute("data-hit", "");
    const X = document.elementsFromPoint(g.left + w.x * b, g.top + w.y * b);
    v.removeAttribute("data-hit");
    const L = X.find((E) => {
      if (!v.contains(E) || E.closest(".ss-cursor, .ss-keys, .ss-ripple") || getComputedStyle(E).pointerEvents === "none" && !E.closest('[data-cursor], [data-target], button, a[href], [role="button"], [role="menuitem"], [role="option"], [role="tab"]')) return !1;
      let Q = 1;
      for (let V = E; V && V !== v.parentElement; V = V.parentElement) {
        const te = getComputedStyle(V);
        if (te.visibility === "hidden") return !1;
        Q *= Number(te.opacity);
      }
      return Q > 0.15;
    });
    if (L) {
      const E = L.closest('[data-cursor], button, a[href], [role="button"], [role="menuitem"], [role="option"], [role="tab"]');
      j = E && v.contains(E) && E.dataset.cursor ? E.dataset.cursor : T, j !== s.current && z(j);
      return;
    }
    y.forEach((E) => {
      const Q = E.getBoundingClientRect(), V = (Q.left - g.left) / b, te = (Q.top - g.top) / b;
      w.x >= V && w.x <= V + Q.width / b && w.y >= te && w.y <= te + Q.height / b && (j = E.dataset.cursor);
    }), j !== s.current && z(j);
  };
  h.current = le, d.current || le(o.current);
  const de = (w) => {
    if (a.current === w) return;
    const v = ee(w);
    ee(a.current).forEach((y) => v.includes(y) || y.removeAttribute("data-hover")), v.forEach((y) => y.setAttribute("data-hover", "")), a.current = w;
  };
  let Y = c.current.id, fe = 0;
  const ve = (w) => {
    const v = Cr(w);
    return v === null ? null : n.current?.querySelector(`[data-target="${v}"]`) ?? null;
  }, ae = {
    get signal() {
      return e;
    },
    put(w) {
      e.aborted || F((v) => ({ ...v, ...typeof w == "function" ? w(v) : w }));
    },
    async set(w) {
      m(), ae.put(w), await M(), await M(), h.current?.(o.current), m();
    },
    wait: async (w) => {
      m(), await C(w);
    },
    rect: (w, v) => {
      const y = n.current, g = y?.querySelector(`[data-target="${w}"]`);
      return !y || !g ? (Ke(`no element with data-target="${w}"`), Sr) : v?.layout ? zo(y, g) : ct(y, g, _.current);
    },
    center: (w) => A(w),
    caret(w, v) {
      fe++;
      const y = ve(w), g = n.current;
      if (!y || !g) return 0;
      const b = g.getBoundingClientRect(), T = b.width / g.offsetWidth || 1, j = b.left + v.x * T, X = b.top + v.y * T, L = [], E = document.createTreeWalker(y, NodeFilter.SHOW_TEXT), Q = document.createRange();
      let V = 0;
      const te = (q) => {
        for (let ie = q.parentElement; ie; ie = ie === y ? null : ie.parentElement) {
          const I = getComputedStyle(ie);
          if (I.opacity === "0" || I.visibility === "hidden" || I.display === "none") return !0;
        }
        return !1;
      };
      for (let q = E.nextNode(); q; q = E.nextNode()) {
        const ie = q.textContent ?? "";
        if (!te(q)) {
          for (let I = 0; I < ie.length; I++) {
            Q.setStart(q, I), Q.setEnd(q, I + 1);
            const oe = Q.getBoundingClientRect();
            (oe.width || oe.height) && L.push({ left: oe.left, right: oe.right, mid: (oe.left + oe.right) / 2, top: oe.top, bottom: oe.bottom, at: V + I });
          }
          V += ie.length;
        }
      }
      if (!L.length || X < L[0].top) return 0;
      if (X > L[L.length - 1].bottom) return V;
      let _e = L[0];
      for (const q of L) Math.abs((q.top + q.bottom) / 2 - X) < Math.abs((_e.top + _e.bottom) / 2 - X) && (_e = q);
      const se = L.filter((q) => Math.abs(q.top - _e.top) < (_e.bottom - _e.top) / 2), Ue = se.find((q) => q.mid > j);
      return Ue ? Ue.at : se[se.length - 1].at + 1;
    },
    async move(w, v) {
      m();
      const y = { ...o.current }, g = A(w), b = Math.hypot(g.x - y.x, g.y - y.y);
      if (b < 0.5) return de(ve(w));
      const T = ee(ve(w));
      de(ee(a.current).find((V) => T.includes(V)) ?? null);
      const j = v?.duration ?? Ie(260 + b * 0.9, 300, 650), X = xt, L = Math.min(b * 0.08, 24), E = -(g.y - y.y) / b, Q = (g.x - y.x) / b;
      await he(j, (V) => {
        const te = X(V), _e = Math.sin(Math.PI * te) * L, se = v?.path ? v.path(te, y, g) : { x: y.x + (g.x - y.x) * te + E * _e, y: y.y + (g.y - y.y) * te + Q * _e };
        N(se), le(se), v?.onMove && Dn(() => v.onMove(se, y, V));
      }), m(), de(ve(w));
    },
    async click(w, v) {
      m(), w !== void 0 && (await ae.move(w), await C(120)), m();
      const y = w !== void 0 ? ve(w) : a.current, g = r.current, b = k?.style === "touch", T = ce(() => {
        g?.removeAttribute("data-pressed"), y?.removeAttribute("data-pressed"), b && Zn(g);
      });
      try {
        b && (g?.setAttribute("data-touching", ""), await C(140), m());
        for (let j = 0; j < (v?.double ? 2 : 1); j++)
          j && await C(70), m(), g?.setAttribute("data-pressed", "true"), k?.ripple && x(o.current), y?.setAttribute("data-pressed", v?.right ? "right" : ""), await C(v?.double ? 80 : 100), m(), g?.removeAttribute("data-pressed"), y?.removeAttribute("data-pressed");
      } finally {
        T();
      }
    },
    async scroll(w, v, y) {
      m();
      const g = ve(w);
      if (!g) return;
      const b = g.scrollTop;
      let T = typeof v == "number" ? v : b;
      if (typeof v == "string") {
        const L = ve(v);
        L && (T = b + (L.getBoundingClientRect().top - g.getBoundingClientRect().top) / Wo(n.current, _.current) - (y?.offset ?? 0));
      }
      if (T = Ie(T, 0, g.scrollHeight - g.clientHeight), k) {
        const L = ct(n.current, g, _.current || 1), E = o.current;
        E.x >= L.x + 8 && E.x <= L.x + L.width - 8 && E.y >= L.y + 8 && E.y <= L.y + L.height - 8 || (await this.move({ x: L.x + L.width * 0.6, y: L.y + L.height * 0.55 }), await this.wait(120));
      }
      const j = g.parentElement?.classList.contains("ss-scroller") ? g.parentElement : null;
      j?.setAttribute("data-scrolling", "");
      const X = ce(() => j?.removeAttribute("data-scrolling"));
      try {
        await he(y?.duration ?? Ie(420 + Math.abs(T - b) * 1.2, 500, 1400), (L) => {
          g.scrollTop = b + (T - b) * xt(L), g.toggleAttribute("data-scrolled", g.scrollTop > 0.5), Lr(g);
        }), m();
      } finally {
        X();
      }
      p(), h.current?.(o.current);
    },
    async snap(w, v) {
      m();
      const y = v ? n.current?.querySelector(`[data-target="${v}"]`) : n.current;
      y?.setAttribute("data-instant", "");
      const g = ce(() => y?.removeAttribute("data-instant"));
      try {
        ae.put(w), await M(), await M(), m();
      } finally {
        g();
      }
    },
    async key(w) {
      m();
      const v = To(w), y = ++Y, g = c.current;
      K(g.caps.length ? { ...g, show: !1, down: !1 } : null), W({ id: y, caps: v, show: !1, down: !1 }), await M(), await M(), m(), W({ id: y, caps: v, show: !0, down: !1 }), await C(180), m(), W({ id: y, caps: v, show: !0, down: !0 }), await C(140), m(), W({ id: y, caps: v, show: !0, down: !1 }), C(600).then(() => {
        Y === y && !e.aborted && W({ id: y, caps: v, show: !1, down: !1 });
      }, (b) => {
        b instanceof Ge || console.error("[stageshow] script error", b);
      });
    },
    async stagger(w, v, y = 60) {
      await Promise.all(
        w.map(async (g, b) => {
          b && await C(y * b), m(), await v(g, b);
        })
      );
    },
    mark(w) {
      e.aborted || n.current?.setAttribute("data-mark", w);
    },
    async cursor(w) {
      m(), z(w), await M();
    },
    async type(w, v, y) {
      const g = y?.interval ?? 35;
      for (let b = 0; b <= v.length; b++)
        m(), F((T) => ({ ...T, [w]: v.slice(0, b) })), await C(g * (0.7 + 0.6 * Do(b)));
    },
    place(w) {
      if (e.aborted) return;
      const v = A(w);
      N(v), h.current?.(v);
    },
    async enter(w, v) {
      m();
      const y = A(w), g = n.current, b = { x: 0, y: 0, w: g.offsetWidth, h: g.offsetHeight }, T = 40, j = [y.x - b.x, b.x + b.w - y.x, y.y - b.y, b.y + b.h - y.y], X = j.indexOf(Math.min(...j)), L = X === 0 ? { x: b.x - T, y: y.y + b.h * 0.12 } : X === 1 ? { x: b.x + b.w + T * 0.4, y: y.y + b.h * 0.12 } : X === 2 ? { x: y.x - b.w * 0.06, y: b.y - T } : { x: y.x + b.w * 0.06, y: b.y + b.h + T * 0.4 };
      N(L), de(null), await he(v?.duration ?? 700, (E) => {
        const Q = S(E), V = { x: L.x + (y.x - L.x) * Q, y: L.y + (y.y - L.y) * Q };
        N(V), le(V);
      }), m(), de(ve(w));
    },
    async drag(w, v, y) {
      m();
      const g = { ...o.current }, b = A(w), T = Math.hypot(b.x - g.x, b.y - g.y);
      de(null);
      const j = s.current, X = j === "ibeam" || j === "crosshair", L = !X && y?.cursor !== "preserve", E = k?.style === "touch", Q = (q) => {
        const I = 1.1428571428571428;
        return q < 0.25 ? q * q / (2 * 0.25) * I : (q - 0.25 / 2) * I;
      };
      E && (r.current?.setAttribute("data-touching", ""), await C(140), m());
      const V = E ? r.current?.querySelector(".ss-cursor__streak") ?? null : null, te = [], _e = (q) => {
        te.unshift({ ...q }), te.length > 9 && te.pop();
        const ie = te[te.length - 1], I = q.x - ie.x, oe = q.y - ie.y, De = Math.min(Math.hypot(I, oe), 100);
        V && (V.style.width = `${De}px`, V.style.left = `${-De}px`, V.style.transform = `rotate(${Math.atan2(oe, I)}rad)`);
      };
      d.current = !0;
      const se = r.current, Ue = ce(() => {
        d.current = !1, se?.removeAttribute("data-pressed"), se?.removeAttribute("data-swiping"), E && Zn(se);
      });
      try {
        se?.setAttribute("data-pressed", "true"), await C(E ? 170 : 60), E && (V && (V.style.width = "0px"), se?.setAttribute("data-swiping", "")), m(), L && !E && z("grab"), E || await C(70), m(), se?.removeAttribute("data-pressed");
        const q = X ? 0 : Math.min(T * 0.06, 18), ie = T ? -(b.y - g.y) / T : 0, I = T ? (b.x - g.x) / T : 0, oe = X && Math.abs(b.y - g.y) > 6;
        oe && b.y > g.y && b.x < g.x - 2 && Ke("a text selection that ends left of where it starts overshoots and shrinks back; select text that starts a line, or fits on one");
        const De = fe;
        await he(E ? y?.duration ?? Ie(180 + T * 0.5, 240, 300) : y?.duration ?? Ie(360 + T * 1.1, 450, 900), (Qe) => {
          const we = E ? Q(Qe) : xt(Qe), qe = Math.sin(Math.PI * we) * q, ht = oe ? 1 - (1 - we) * (1 - we) : we, pt = oe ? we * we : we, Ze = y?.path?.(we, g, b) ?? { x: g.x + (b.x - g.x) * pt + ie * qe, y: g.y + (b.y - g.y) * ht + I * qe };
          Dn(() => v?.(Ze, g, Qe)), N(Ze), E && _e(Ze);
        }), X && v && fe === De && Ke("selection drift: a text selection drag never read a.caret(), so the highlight is not under the I-beam; set it from a.caret(name, at) in onMove"), m(), L && !E && z(j === "grab" ? "pointer" : j);
      } finally {
        Ue();
      }
      h.current?.(b);
    },
    layout: f
  };
  for (const w of Object.keys(ae)) {
    const v = ae[w];
    typeof v == "function" && (ae[w] = (...y) => {
      const g = v.apply(ae, y);
      return g instanceof Promise && g.catch((b) => {
        b instanceof Ge || console.error("[stageshow] script error", b);
      }), g;
    });
  }
  return ae;
}
function Zo(e, t, n, r) {
  const o = Object.keys(t).filter(
    (a) => JSON.stringify(e[a]) !== JSON.stringify(t[a])
  );
  o.length && Ke(`loop seam: state still differs from initial at the end of the script (${o.join(", ")})`), r && Math.hypot(n.x - r.x, n.y - r.y) > 1 && Ke("loop seam: cursor does not end where it starts");
}
function Vo() {
  return /* @__PURE__ */ i("svg", { height: "24", width: "24", viewBox: "0 0 32 32", fill: "none", children: /* @__PURE__ */ i("g", { transform: "translate(10 7)", children: [
    /* @__PURE__ */ i("path", { d: "m6.148 18.473 1.863-1.003 1.615-.839-2.568-4.816h4.332l-11.379-11.408v16.015l3.316-3.221z", fill: "#fff" }),
    /* @__PURE__ */ i("path", { d: "m6.431 17 1.765-.941-2.775-5.202h3.604l-8.025-8.043v11.188l2.53-2.442z", fill: "#000" })
  ] }) });
}
function jo() {
  return /* @__PURE__ */ i("svg", { width: "10", height: "16", viewBox: "0 0 10 16", fill: "none", overflow: "visible", children: [
    /* @__PURE__ */ i("path", { d: "M3 1H7M3 15H7M5 1V15", style: { stroke: "var(--ss-cursor-edge, #fff)" }, strokeWidth: "2.6", strokeLinecap: "round" }),
    /* @__PURE__ */ i("path", { d: "M3 1H7M3 15H7M5 1V15", style: { stroke: "var(--ss-cursor-line, #000)" }, strokeWidth: "1", strokeLinecap: "round" })
  ] });
}
function Io() {
  return /* @__PURE__ */ i("svg", { width: "17", height: "17", viewBox: "0 0 17 17", fill: "none", overflow: "visible", children: [
    /* @__PURE__ */ i("path", { d: "M8.5 0V17M0 8.5H17", style: { stroke: "var(--ss-cursor-edge, #fff)" }, strokeWidth: "2.6" }),
    /* @__PURE__ */ i("path", { d: "M8.5 0V17M0 8.5H17", style: { stroke: "var(--ss-cursor-line, #000)" }, strokeWidth: "1" })
  ] });
}
function Go() {
  return /* @__PURE__ */ i("svg", { width: "26", height: "26", viewBox: "0 0 32 32", fill: "none", children: [
    /* @__PURE__ */ i(
      "path",
      {
        d: "M10.6 6a1.7 1.7 0 0 1 3.4 0v6.6a1.3 1.3 0 0 1 2.6 0v.7a1.3 1.3 0 0 1 2.6 0v.7a1.3 1.3 0 0 1 2.6 0V19c0 3.1-2 5.6-5 5.6h-2.6c-2 0-3.3-.9-4.4-2.4l-3.1-4.1c-.6-.9-.4-2 .5-2.5.8-.4 1.7-.2 2.3.5l1.1 1.4V6Z",
        fill: "#fff",
        stroke: "#000",
        strokeWidth: "1.1",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ i("path", { d: "M14 12.6v3.6M16.6 13.3v3M19.2 14v2.6", stroke: "#000", strokeWidth: "1", strokeLinecap: "round" })
  ] });
}
function Ko() {
  return /* @__PURE__ */ i("svg", { width: "26", height: "26", viewBox: "0 0 32 32", fill: "none", children: /* @__PURE__ */ i("g", { transform: "translate(7 6)", children: [
    /* @__PURE__ */ i("path", { d: "m4.5557 8.5742c-.098-.375-.196-.847-.406-1.552-.167-.557-.342-.859-.47-1.233-.155-.455-.303-.721-.496-1.181-.139-.329-.364-1.048-.457-1.44-.119-.509.033-.924.244-1.206.253-.339.962-.49 1.357-.351.371.13.744.512.916.788.288.46.357.632.717 1.542.393.992.564 1.918.611 2.231l.085.452c-.001-.04-.043-1.122-.044-1.162-.035-1.029-.06-1.823-.038-2.939.002-.126.064-.587.084-.715.078-.5.305-.8.673-.979.412-.201.926-.215 1.401-.017.423.173.626.55.687 1.022.014.109.094.987.093 1.107-.013 1.025.006 1.641.015 2.174.004.231.003 1.625.017 1.469.061-.656.094-3.189.344-3.942.144-.433.405-.746.794-.929.431-.203 1.113-.07 1.404.243.285.305.446.692.482 1.153.032.405-.019.897-.02 1.245 0 .867-.021 1.324-.037 2.121-.001.038-.015.298.023.182.094-.28.188-.542.266-.745.049-.125.241-.614.359-.859.114-.234.211-.369.415-.688.2-.313.415-.448.668-.561.54-.235 1.109.112 1.301.591.086.215.009.713-.028 1.105-.061.647-.254 1.306-.352 1.648-.128.447-.274 1.235-.34 1.601-.072.394-.234 1.382-.359 1.82-.086.301-.371.978-.652 1.384 0 0-1.074 1.25-1.192 1.812-.117.563-.078.567-.101.965-.024.399.121.923.121.923s-.802.104-1.234.034c-.391-.062-.875-.841-1-1.078-.172-.328-.539-.265-.682-.023-.225.383-.709 1.07-1.051 1.113-.668.084-2.054.03-3.139.02 0 0 .185-1.011-.227-1.358-.305-.26-.83-.784-1.144-1.06l-.832-.921c-.284-.36-.629-1.093-1.243-1.985-.348-.504-1.027-1.085-1.284-1.579-.223-.425-.331-.954-.19-1.325.225-.594.675-.897 1.362-.832.519.05.848.206 1.238.537.225.19.573.534.75.748.163.195.203.276.377.509.23.307.302.459.214.121", fill: "#fff" }),
    /* @__PURE__ */ i("g", { stroke: "#000", strokeLinecap: "round", strokeWidth: ".75", children: [
      /* @__PURE__ */ i("path", { d: "m4.5557 8.5742c-.098-.375-.196-.847-.406-1.552-.167-.557-.342-.859-.47-1.233-.155-.455-.303-.721-.496-1.181-.139-.329-.364-1.048-.457-1.44-.119-.509.033-.924.244-1.206.253-.339.962-.49 1.357-.351.371.13.744.512.916.788.288.46.357.632.717 1.542.393.992.564 1.918.611 2.231l.085.452c-.001-.04-.043-1.122-.044-1.162-.035-1.029-.06-1.823-.038-2.939.002-.126.064-.587.084-.715.078-.5.305-.8.673-.979.412-.201.926-.215 1.401-.017.423.173.626.55.687 1.022.014.109.094.987.093 1.107-.013 1.025.006 1.641.015 2.174.004.231.003 1.625.017 1.469.061-.656.094-3.189.344-3.942.144-.433.405-.746.794-.929.431-.203 1.113-.07 1.404.243.285.305.446.692.482 1.153.032.405-.019.897-.02 1.245 0 .867-.021 1.324-.037 2.121-.001.038-.015.298.023.182.094-.28.188-.542.266-.745.049-.125.241-.614.359-.859.114-.234.211-.369.415-.688.2-.313.415-.448.668-.561.54-.235 1.109.112 1.301.591.086.215.009.713-.028 1.105-.061.647-.254 1.306-.352 1.648-.128.447-.274 1.235-.34 1.601-.072.394-.234 1.382-.359 1.82-.086.301-.371.978-.652 1.384 0 0-1.074 1.25-1.192 1.812-.117.563-.078.567-.101.965-.024.399.121.923.121.923s-.802.104-1.234.034c-.391-.062-.875-.841-1-1.078-.172-.328-.539-.265-.682-.023-.225.383-.709 1.07-1.051 1.113-.668.084-2.054.03-3.139.02 0 0 .185-1.011-.227-1.358-.305-.26-.83-.784-1.144-1.06l-.832-.921c-.284-.36-.629-1.093-1.243-1.985-.348-.504-1.027-1.085-1.284-1.579-.223-.425-.331-.954-.19-1.325.225-.594.675-.897 1.362-.832.519.05.848.206 1.238.537.225.19.573.534.75.748.163.195.203.276.377.509.23.307.302.459.214.121", strokeLinejoin: "round" }),
      /* @__PURE__ */ i("path", { d: "m11.566 12.734v-3.459" }),
      /* @__PURE__ */ i("path", { d: "m9.551 12.746-.016-3.473" }),
      /* @__PURE__ */ i("path", { d: "m7.555 9.305.021 3.426" })
    ] })
  ] }) });
}
function Jo() {
  return /* @__PURE__ */ i("svg", { width: "30", height: "30", viewBox: "0 0 32 32", fill: "none", children: /* @__PURE__ */ i("g", { transform: "translate(8 9)", children: [
    /* @__PURE__ */ i("path", { d: "m3.44281398 1.68449726c-.74326136.27630142-1.05584685.8131257-1.07636853 1.38003696-.01344897.37336893.06665513.72649286.23114214 1.18694303-.02596219-.07267623.09676488.29282004.12116236.37362273.05052942.16918921-.4865367-.05865774-.81377307.00741883-.36363321.07113868-.84783757.38332307-1.10006887.79754775-.29643467.48542737-.3109609 1.04368567-.08235979 2.04824266.12491868.54736183.36572145 1.00836814.71076689 1.44594879.15329951.1944118.5713628.64726015.60307236.6875974l.84854343.94062339c.15080214.1358526.25794954.2361946.57590427.5380259.3147558.2987762.4647038.4380078.60308951.555976.05846214.0492474.10784267.1797116.12740685.3736249.01609788.1595565.01049553.3375341-.0090192.5090254-.00674888.0593077-.01325791.1020883-.01698742.1224696-.04189161.228932.13269563.4403386.36541902.4424835.21585671.0019894.38528595.0046546.82216479.0123538.09483476.0016698.09483476.0016698.18993053.0033129 1.16876447.0200186 1.75308289.0147904 2.17807912-.0385723.45429894-.0572869.92650915-.6110188 1.32698393-1.2957591.34289141.6108338.81859723 1.2057867 1.2995685 1.2820532.1510118.0244148.3353555.0322555.548787.0275887.1606725-.0035131.3307029-.0140241.5021961-.0293376.1276907-.0114022.2293359-.0228648.29003-.0307451.2258836-.0293282.373669-.251611.3133108-.4712481-.0130351-.0474332-.0339838-.1345011-.0551094-.2441635-.0245945-.1276687-.0423383-.2523857-.0503381-.365988-.0050217-.0713101-.0059948-.1359317-.0027687-.1918983.0059157-.0980798.0077938-.1530073.0108033-.281125.0010795-.0448938.0010795-.0448938.0024606-.0845172.0054208-.1364475.0233824-.2649146.0815132-.544638.0250088-.1201275.1473169-.352189.3398902-.639435.0571394-.0852302.1195783-.1742239.1864664-.26609712.1272143-.17473362.2641361-.35131772.4011075-.52030772.082051-.10123129.145482-.17695689.1808122-.21807676.2967593-.42378347.612817-1.11823437.7291396-1.52536348.1117407-.39153936.202351-1.12501196.254373-1.81690429.029923-.39968605.0410555-.72381216.0410555-1.23011613.0000742-.09758414.0000742-.09758414.0002975-.17670236.0003569-.11115478.0003569-.11115478.000115-.20711835-.0008934-.15683883-.0055282-.31323355-.0207085-.69507578-.0313109-.81293139-.4771727-1.33911388-1.1344906-1.44058831-.559108-.08631314-1.0586051.08188477-1.2779293.31625977-.0755526.08073733.0036753-.2781823-.2159489-.62316278-.1644465-.25841586-.593184-.58905957-.9209287-.65355552-.335487-.06535532-.73539548-.05811715-1.1017193.00667481-.32093157.05742909-.68608434.33741751-.87176225.64688068-.12411885.20686477.03884667-.00592296-.09368743-.23401341-.18231052-.31422641-.60754287-.59486422-1.01411454-.67799709-.34643562-.07139428-.74182572-.04452925-1.09945614.0633873-.43336319.1291117-1.01795827.61460976-.94899189 1.15552627-.34375-.54091651-1.25026717-.691379-1.97906097-.42111797z", fill: "#000" }),
    /* @__PURE__ */ i("path", { d: "m7.31951013 1.62138197c.20710357.04234751.44724204.20083012.51632974.31990811.08404358.1446387.15562749.36413806.21048667.6366124.02933373.14569467.12179446 1.2125285.29383112 1.32370243.41279229.04533731.41279229.04533731.52658055-.12364345.03545705-.07383858.03545705-.07383858.04226523-.1029106.01416796-.06009544.02463332-.12677987.0351322-.21754028l.00854738-.07915386.00047673-.00942804.00327525-.03167185c.01085148-.11424313.04184125-.4312127.05388392-.53034902.03788792-.31189663.08766449-.52757784.13944093-.6138719.0713024-.11883734.31942298-.28274442.43149612-.30279961.2804398-.04960082.58940103-.05519288.82623993-.00905543.1084394.02134018.3709471.22378689.432331.32024744.1291079.20279957.2524316.84889766.3225486 1.4970065-.0102194.04624251-.0102194.04624251.1640069.28984194.5843296-.06677889.5843296-.06677889.5703629-.17490247.0159511-.03856429.0284824-.08294031.045969-.15118961.0423876-.16089067.0697594-.25204451.111066-.35549917.0288558-.07227096.0592914-.13391873.0904889-.18278042.1209187-.19031132.4335712-.319392.7077174-.27707028.2943447.04543991.4816904.26653537.4994912.72869815.0148821.37434892.0193146.5239164.0201469.6700184l-.0004247.37954865c0 .48831141-.0104951.79388164-.0389535 1.17400348-.0480918.63962116-.1348512 1.34192123-.227649 1.66708484-.0946325.33121345-.3766371.95084197-.6003915 1.27298482-.0161892.01580846-.0841508.09694273-.1710333.20413492-.1445842.17838247-.2892181.36491271-.4247891.5511244-.0723398.09936149-.1402862.19620479-.2030964.2898938-.2440054.36396314-.400553.66098894-.4512157.90434304-.0659304.3172546-.0893838.4850003-.0966379.6675968-.0017072.0490782-.0017072.0490782-.002845.096677-.0028064.119476-.004437.1671639-.0097087.2545848-.0052654.091322-.0038193.187354.00332.2887353.0103318.1467182.1058713.3478531.1058713.3478531s-.2321503-.0119819-.3742084-.0088758c-.1718098.0037567-.3147843-.0023244-.4138162-.0183342-.1440353-.0228411-.53014068-.5057331-.7278511-.8821737-.30227042-.5764228-1.03604858-.5484427-1.33684295-.0394061-.26854779.4591613-.65918083.9172326-.7740684.9317199-.37404082.0469647-.94643778.0520862-2.07160079.0328144-.09480875-.0016381-.46003446-.0128683-.64600494-.0157445-.18597048-.0028763.05008807-.1790283.02786486-.399297-.03726222-.36933-.15125405-.6704984-.38877094-.8705429-.12241569-.1043631-.26774964-.2393104-.56509654-.5215613-.33323493-.3163366-.44236499-.4185353-.57290215-.533275l-.80130455-.89071892c-.03955779-.05174211-.45812831-.5051399-.5872217-.6688539-.28069963-.35597842-.47062947-.71959073-.56844755-1.14820437-.18921973-.83150113-.1793328-1.21146622-.00855589-1.49112273.13743587-.2257023.43815377-.4195862.60596039-.45241793.17165981-.03465512.55153059-.01648617.62179422.02229321.09902279.05401056.13357243.07300285.16379074.09097645.03572494.02124891.05965747.03799198.08182912.05708809.03426437.02951139.07235014.07170412.12420211.14044502.03611591.04821025.07806642.1053997.1423779.19304882.06054643.0816627.09183576.12069421.13369221.1590035.28038907.25662728.68391532.03238058.65052057-.32606956-.00567036-.06086415-.02203766-.12694598-.05458621-.23708502-.04356824-.15021272.00433013-.05284275-.26002629-.56642281-.08720664-.16942124-.13955864-.28835362-.17428227-.4046158l-.03412852-.10219113c-.03838756-.11059767-.09558223-.26854489-.12612861-.35199347l-.02009957-.05467087.002.008-.05974804-.17751191c-.09232236-.28807194-.13413567-.51358087-.12645475-.72681781.01040781-.28751553.16037753-.54506871.58790983-.70400047.40142488-.1488616 1.07786076.00117106 1.20581167.27856864.04319814.09369738.08927466.21199471.13900415.35457792l.03930997.11680217c.05539717.16759437.13470873.41493582.13860471.42816881.02724222.08344874.0471839.13860719.06943813.18441246.00217869.06301886.00217869.06301886.35429398.23177937.41699479-.29154152.41699479-.29154152.38019201-.37525838.00571063-.08773482.00758408-.17356287.00965287-.37317647.00242546-.23402898.00423842-.33154773.00994479-.45966208.01316411-.29554918.0437926-.51142116.09291227-.63864415.09160418-.23801371.25279279-.40993649.4432431-.46667832.24458613-.07380253.51465245-.09215236.73323569-.04710649zm1.21356228 4.27672201c-.20710459.00095412-.37422255.16961903-.37326843.37672361l.016 3.473c.00095412.20710459.16961903.37422251.37672361.37326841.20710459-.0009541.37422255-.16961901.37326843-.37672359l-.016-3.473c-.00095412-.20710459-.16961903-.37422255-.37672361-.37326843zm2.03332759.00229602c-.2071068 0-.375.16789322-.375.375v3.459c0 .20710678.1678932.375.375.375s.375-.16789322.375-.375v-3.459c0-.20710678-.1678932-.375-.375-.375zm-4.01399856.02930704c-.20710289.00126946-.37396385.17018863-.3726944.37729152l.021 3.426c.00126946.20710289.17018863.37396384.37729152.37269444.20710289-.0012695.37396385-.17018867.3726944-.37729156l-.021-3.426c-.00126946-.20710289-.17018863-.37396385-.37729152-.3726944z", fill: "#fff" })
  ] }) });
}
function Yo() {
  return /* @__PURE__ */ i("svg", { width: "16", height: "16", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ i("circle", { cx: "10", cy: "10", r: "8", stroke: "rgba(0,0,0,0.15)", strokeWidth: "2" }),
    /* @__PURE__ */ i("path", { d: "M10 2A8 8 0 0 1 18 10", stroke: "black", strokeWidth: "2", strokeLinecap: "round" })
  ] });
}
const Vn = "M0-8.4 2.55-3.65H-2.55ZM0 8.4 2.55 3.65H-2.55Z";
function Pt({ turn: e }) {
  return /* @__PURE__ */ i("svg", { width: "21", height: "21", viewBox: "-14 -14 28 28", overflow: "visible", children: /* @__PURE__ */ i("g", { transform: `rotate(${e})`, strokeLinejoin: "round", children: [
    /* @__PURE__ */ i("path", { d: Vn, style: { fill: "var(--ss-cursor-edge, #fff)", stroke: "var(--ss-cursor-edge, #fff)" }, strokeWidth: "3.2" }),
    /* @__PURE__ */ i("path", { d: Vn, style: { fill: "var(--ss-cursor-line, #000)", stroke: "var(--ss-cursor-line, #000)" }, strokeWidth: "1.2" })
  ] }) });
}
const Xo = () => /* @__PURE__ */ i(Pt, { turn: 0 }), Qo = () => /* @__PURE__ */ i(Pt, { turn: 90 }), ea = () => /* @__PURE__ */ i(Pt, { turn: -45 }), ta = () => /* @__PURE__ */ i(Pt, { turn: 45 }), jn = {
  pointer: Vo,
  ibeam: jo,
  crosshair: Io,
  hand: Go,
  open: Ko,
  grab: Jo,
  wait: Yo,
  "resize-ns": Xo,
  "resize-ew": Qo,
  "resize-nwse": ea,
  "resize-nesw": ta
}, na = {
  pointer: { x: 7.5, y: 5.25 },
  ibeam: { x: 5, y: 8 },
  crosshair: { x: 8.5, y: 8.5 },
  hand: { x: 9.75, y: 3.25 },
  open: { x: 11.7, y: 10.4 },
  grab: { x: 12, y: 12 },
  wait: { x: 8, y: 8 },
  "resize-ns": { x: 10.5, y: 10.5 },
  "resize-ew": { x: 10.5, y: 10.5 },
  "resize-nwse": { x: 10.5, y: 10.5 },
  "resize-nesw": { x: 10.5, y: 10.5 }
}, ra = { x: 4, y: 3 };
function oa() {
  return /* @__PURE__ */ i("svg", { width: "22", height: "22", viewBox: "0 0 22 22", className: "ss-cursor__arrow", "aria-hidden": !0, children: /* @__PURE__ */ i("path", { d: "M4 3 18.5 9.6 11.8 11.8 9.6 18.5Z" }) });
}
function aa({ cursorRef: e, style: t = "real", kind: n }) {
  return /* @__PURE__ */ i("div", { ref: e, className: "ss-cursor", "data-style": t, "data-kind": n, "aria-hidden": !0, children: [
    t === "touch" && /* @__PURE__ */ i("span", { className: "ss-cursor__streak" }),
    /* @__PURE__ */ i("div", { className: "ss-cursor__press", children: [
      (t === "circle" || t === "touch") && /* @__PURE__ */ i("span", { className: "ss-cursor__dot" }),
      t !== "circle" && t !== "touch" && Object.keys(jn).map((r) => {
        const o = t === "arrow";
        if (o && r !== "pointer" && r !== "ibeam") return null;
        const a = o && r === "pointer" ? oa : jn[r], s = o && r === "pointer" ? ra : na[r];
        return /* @__PURE__ */ i(
          "div",
          {
            className: "ss-cursor__glyph",
            "data-glyph": r,
            "data-active": r === (o && n !== "ibeam" ? "pointer" : n),
            style: { marginLeft: -s.x, marginTop: -s.y, transformOrigin: `${s.x}px ${s.y}px` },
            children: /* @__PURE__ */ i(a, {})
          },
          r
        );
      })
    ] })
  ] });
}
function sa(e, t) {
  const n = document.createElement("span");
  n.className = "ss-ripple", n.style.left = `${t.x}px`, n.style.top = `${t.y}px`, e.appendChild(n), n.addEventListener("animationend", () => n.remove());
}
const Pr = an({
  theme: "light",
  palette: "accent",
  fidelity: "standard",
  layout: "wide"
}), un = () => sn(Pr), Rr = an(!1);
function Rt() {
  const e = sn(Rr), [t, n] = ue(!1);
  return Xe(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)"), o = () => n(r.matches);
    return o(), r.addEventListener("change", o), () => r.removeEventListener("change", o);
  }, []), e || t;
}
const Fe = {
  now: () => performance.now(),
  raf: (e) => requestAnimationFrame(e),
  cancelRaf: (e) => cancelAnimationFrame(e),
  // Layout must finish even when a preview is paused. Keep these callbacks
  // separate: running arbitrary motion RAFs at a frozen timestamp can still
  // advance a spring that integrates once per callback.
  layoutRaf: (e) => Fe.recording?.requestLayoutFrame(e) ?? requestAnimationFrame(e),
  cancelLayoutRaf: (e) => {
    const t = Fe.recording;
    t ? t.cancelLayoutFrame(e) : cancelAnimationFrame(e);
  },
  timeout: (e, t) => window.setTimeout(e, t),
  clearTimeout: (e) => window.clearTimeout(e),
  /** The recorder's control while one drives the page, else null. */
  get recording() {
    return typeof window > "u" ? null : window.__stageshow?.clock ?? null;
  }
}, ia = {};
function Tr({
  width: e,
  height: t,
  initial: n = ia,
  script: r,
  poster: o,
  cursor: a,
  hover: s,
  play: c = "loop",
  compact: d,
  keys: l = "bottom",
  palette: h = "accent",
  greys: _,
  fidelity: u = "standard",
  specimen: f,
  unframed: k,
  speed: A = 1,
  accent: N,
  tokens: p,
  ground: x,
  fill: F = !1,
  theme: z = "light",
  className: W,
  children: K
}) {
  const S = c === "hover" && typeof window < "u" && window.matchMedia("(hover: none)").matches ? "once" : c, [m, R] = ue("wide"), M = Z(m);
  M.current = m;
  const C = () => {
    const $ = a.at;
    return typeof $ == "object" && "wide" in $ ? $[M.current] : $;
  }, [ce, he] = ue(!1), ee = m === "compact" && d ? d.width : e, le = m === "compact" && d ? d.height : t, de = Z(null), Y = Z(null), fe = Z(null), ve = Rt(), ae = !r || ve, [w, v] = ue(() => ae && o ? o : n), y = Z(w);
  y.current = w;
  const [g, b] = ue(1), T = Z(1);
  T.current = g;
  const j = typeof window > "u" ? {} : window.__stageshow ?? {}, X = A / (j.slow ?? 1), L = j.theme ?? z, [E, Q] = ue(a?.kind ?? "pointer"), V = ($) => {
    const O = Y.current;
    !O || ve || sa(O, $);
  }, te = Z(E);
  te.current = E;
  const [_e, se] = ue({ id: 0, caps: [], show: !1, down: !1 }), [Ue, q] = ue(null), ie = Z(_e);
  ie.current = _e;
  const I = Z({ x: 0, y: 0 }), oe = Z(null), [De, Qe] = ue(0), we = Z(!1), qe = Z(!1), ht = Z(null);
  me(() => {
    const $ = de.current;
    if (!$) return;
    const O = () => {
      const G = $.clientWidth, be = !!$.parentElement?.closest("[data-ss-wide]"), ke = d && !be && G < d.below ? "compact" : "wide";
      R(ke);
      const Me = F || !!$.parentElement?.closest("[data-ss-fill]");
      he(Me);
      const xe = ke === "compact" ? d.width : e, ge = Math.min(Me ? 2 : 1, G / xe);
      b(ge), Qe(Math.max(0, (G - xe * ge) / 2));
    };
    O();
    const U = new ResizeObserver(O);
    U.observe($);
    const B = new MutationObserver(O);
    for (let G = $.parentElement; G; G = G.parentElement)
      B.observe(G, { attributes: !0, attributeFilter: ["data-ss-wide", "data-ss-fill"] });
    return () => {
      U.disconnect(), B.disconnect();
    };
  }, [e, d?.below, d?.width, F]);
  const [pt, Ze] = ue({}), Tt = We(() => {
    const $ = Y.current;
    if (!$) return {};
    const O = {}, U = $.querySelectorAll("[data-target]");
    if (!U.length) return O;
    const B = ln($, T.current);
    return U.forEach((G) => {
      O[G.dataset.target] = Oo($, G, T.current, B);
    }), O;
  }, []), Ht = Z({ n: 0, frame: 0, owed: !1 }), Re = We(() => {
    const $ = Ht.current;
    if ($.frame || ($.frame = Fe.layoutRaf(() => {
      if ($.n = 0, $.frame = 0, !$.owed) return;
      $.owed = !1;
      const U = Tt();
      Ze((B) => qn(B, U) ? B : U);
    })), $.n >= 4) {
      $.owed = !0;
      return;
    }
    $.n++;
    const O = Tt();
    Ze((U) => qn(U, O) ? U : O);
  }, [Tt]);
  me(Re), me(() => () => {
    Fe.cancelLayoutRaf(Ht.current.frame), Ht.current = { n: 0, frame: 0, owed: !1 };
  }, []), Xe(() => {
    const $ = Y.current;
    if ($)
      return $.addEventListener("transitionend", Re), $.addEventListener("animationend", Re), () => {
        $.removeEventListener("transitionend", Re), $.removeEventListener("animationend", Re);
      };
  }, [Re]);
  const eo = We(($) => pt[$] ?? Sr, [pt]), [to, pn] = ue(!0);
  me(() => {
    pn(!0);
    let $ = !0, O = 0;
    const U = () => {
      O = Fe.layoutRaf(() => {
        O = Fe.layoutRaf(() => $ && pn(!1));
      });
    };
    return !document.fonts || document.fonts.status === "loaded" ? U() : document.fonts.ready.then(() => $ && U()), () => {
      $ = !1, Fe.cancelLayoutRaf(O);
    };
  }, [m]);
  const Ve = Z(0), et = Z(0), tt = Z(!1), Wt = Z(null), je = We(($) => {
    et.current && !tt.current && Math.hypot($.x - I.current.x, $.y - I.current.y) > 0.5 && (tt.current = !0, Wt.current ??= performance.now() - et.current), I.current = $, Ve.current = performance.now();
    const O = fe.current;
    O && (O.style.transform = `translate(${$.x}px, ${$.y}px)`, O.removeAttribute("data-idle"));
  }, []), Te = We(($) => {
    typeof $ == "object" && $ !== null && "wide" in $ && ($ = M.current === "compact" ? $.compact : $.wide);
    const O = Cr($);
    if (O === null) return $;
    const U = Y.current, B = U?.querySelector(`[data-target="${O}"]`);
    if (!U || !B)
      return Ke(`no element with data-target="${O}"`), I.current;
    const G = ct(U, B, T.current), be = typeof $ == "string" ? { x: 0.5, y: 0.5 } : { x: $.x ?? 0.5, y: $.y ?? 0.5 };
    return { x: G.x + G.width * be.x, y: G.y + G.height * be.y };
  }, []);
  me(() => {
    if (!ae || !s) return;
    const $ = Y.current;
    s.forEach((O) => $?.querySelector(`[data-target="${O}"]`)?.setAttribute("data-hover", ""));
  }), me(() => {
    a && !et.current && je(Te(C()));
  }, [g, m]);
  const Ot = Z(0), He = Z(0), mt = We(() => {
    ++Ot.current, cancelAnimationFrame(He.current), He.current = 0, Y.current?.removeAttribute("data-settling");
  }, []), Ft = We(($ = !1) => {
    mt();
    const O = Ot.current;
    if (qe.current = !1, v(n), Q(a?.kind ?? "pointer"), se((B) => ({ ...B, show: !1, down: !1 })), q(null), Y.current?.querySelectorAll("[data-hover],[data-pressed]").forEach((B) => {
      B.removeAttribute("data-hover"), B.removeAttribute("data-pressed");
    }), Y.current?.removeAttribute("data-mark"), Y.current?.querySelectorAll("[data-scrolled]").forEach((B) => {
      B.scrollTop = 0, B.removeAttribute("data-scrolled"), Lr(B);
    }), Y.current?.querySelectorAll("[data-scrolling]").forEach((B) => B.removeAttribute("data-scrolling")), fe.current?.removeAttribute("data-pressed"), ht.current = null, !a) return;
    if (!$) {
      He.current = requestAnimationFrame(() => {
        He.current = 0, je(Te(C())), oe.current?.(I.current);
      });
      return;
    }
    const U = Y.current;
    U?.setAttribute("data-settling", ""), He.current = requestAnimationFrame(() => {
      const B = { ...I.current }, G = Te(C()), be = Ie(320 + Math.hypot(G.x - B.x, G.y - B.y) * 0.7, 380, 700), ke = performance.now(), Me = () => {
        if (Ot.current !== O) return;
        const xe = Math.min(1, (performance.now() - ke) / be), ge = xt(xe);
        je({ x: B.x + (G.x - B.x) * ge, y: B.y + (G.y - B.y) * ge }), xe < 1 ? He.current = requestAnimationFrame(Me) : (He.current = 0, U?.removeAttribute("data-settling"));
      };
      Me();
    });
  }, [m]), mn = At(
    () => ($) => qo($, {
      rootRef: Y,
      cursorRef: fe,
      pos: I,
      hovered: ht,
      kindRef: te,
      keysRef: ie,
      dragging: qe,
      autoUsed: we,
      autoRef: oe,
      scaleRef: T,
      speed: X,
      layout: m,
      cursor: a,
      resolve: Te,
      place: je,
      remeasure: Re,
      ripple: V,
      setState: v,
      setKind: Q,
      setKeys: se,
      setLastKeys: q
    }),
    [Te, je, X, m]
    // eslint-disable-line react-hooks/exhaustive-deps
  );
  Xe(() => {
    const $ = Y.current;
    if (ae || !r)
      return Ft(), $.removeAttribute("data-offscreen"), v(o ?? n), mt;
    Ft();
    const O = de.current;
    let U = null, B = !1, G = !1, be = !1;
    const ke = a?.idle ?? 4e3, Me = 1200;
    let xe = 0, ge = 0;
    const oo = () => {
      window.clearInterval(xe), !(!a || ke === !1) && (Ve.current = performance.now(), xe = window.setInterval(() => {
        const ne = fe.current;
        if (!ne) return;
        const ye = performance.now();
        if (!tt.current) {
          Wt.current === null && ye - Ve.current > Me && ne.setAttribute("data-idle", "");
          return;
        }
        ne.hasAttribute("data-pressed") || Y.current?.querySelector("[data-hover]") ? Ve.current = ye : ye - Ve.current > ke && ne.setAttribute("data-idle", "");
      }, 150));
    }, ao = () => {
      et.current = performance.now(), tt.current = !1, window.clearTimeout(ge);
      const ne = fe.current, ye = Wt.current;
      ke === !1 || !ne || ye === null || ye <= Me || (ne.setAttribute("data-idle", ""), ge = window.setTimeout(() => ne.removeAttribute("data-idle"), ye - 400));
    }, zt = () => {
      window.clearInterval(xe), window.clearTimeout(ge), et.current = 0, fe.current?.removeAttribute("data-idle");
    }, so = () => {
      window.clearInterval(xe), window.clearTimeout(ge);
      const ne = fe.current, ye = () => ne?.hasAttribute("data-pressed") || $.querySelector("[data-hover]");
      if (!a || ke === !1 || !ne || ne.hasAttribute("data-idle") || ye()) return;
      const yt = (tt.current ? ke : Me) - (performance.now() - Ve.current);
      ge = window.setTimeout(() => {
        ye() || ne.setAttribute("data-idle", "");
      }, Math.max(0, yt));
    }, Bt = () => {
      if (U || be || !B || document.hidden || S === "hover" && !G) return;
      mt(), a && je(Te(C())), U = new AbortController();
      const ne = U.signal;
      oo();
      const ye = mn(ne);
      (async () => {
        do {
          ao();
          try {
            await r(ye);
          } catch (yt) {
            if (yt instanceof Ge) return;
            console.error("[stageshow] script error", yt), U = null, zt();
            return;
          }
          S === "loop" && Er() && Zo(y.current, n, I.current, a ? Te(C()) : null);
        } while (S === "loop" && !ne.aborted);
        S === "once" && !ne.aborted && (be = !0, so());
      })();
    }, Ut = (ne = !1) => {
      zt(), U && (U.abort(), U = null, be || Ft(ne));
    }, Dt = () => $.toggleAttribute("data-offscreen", !B || document.hidden);
    Dt();
    const yn = new IntersectionObserver(([ne]) => {
      B = ne.isIntersecting, Dt(), B ? Bt() : Ut();
    });
    yn.observe(O);
    const vn = () => {
      Dt(), document.hidden ? Ut() : Bt();
    };
    document.addEventListener("visibilitychange", vn);
    const gn = () => {
      G = !0, Bt();
    }, wn = () => {
      G = !1, Ut(!0);
    };
    return S === "hover" && (O.addEventListener("pointerenter", gn), O.addEventListener("pointerleave", wn)), () => {
      yn.disconnect(), document.removeEventListener("visibilitychange", vn), O.removeEventListener("pointerenter", gn), O.removeEventListener("pointerleave", wn), zt(), U?.abort(), U = null, oe.current = null, mt();
    };
  }, [ae, r, mn, S, m]), me(() => {
    a && !ae && !qe.current && oe.current?.(I.current);
  }, [w]);
  const no = At(() => ({ theme: L, palette: h, fidelity: u, layout: m }), [L, h, u, m]), ro = a && (!r || !ae || a.still);
  return /* @__PURE__ */ i("div", { ref: de, className: `ss-fit${W ? ` ${W}` : ""}`, style: { maxWidth: ce ? void 0 : e, height: le * g }, children: /* @__PURE__ */ i(
    "div",
    {
      ref: Y,
      className: "ss-stage",
      "data-specimen": f || void 0,
      "data-unframed": k || void 0,
      "data-still": ae || void 0,
      "data-placing": to || void 0,
      "data-theme": L,
      "data-palette": h,
      "data-greys": _ === "cool" ? "cool" : void 0,
      "data-fidelity": u,
      "data-layout": m,
      style: {
        width: ee,
        height: le,
        marginLeft: De || void 0,
        transform: `scale(${g})`,
        ...p,
        ...N ? { "--ss-accent": N, "--ss-accent-2": N, "--ss-accent-soft": `color-mix(in srgb, ${N} 14%, transparent)` } : null
      },
      children: [
        x && /* @__PURE__ */ i(
          "div",
          {
            className: "ss-ground",
            "aria-hidden": !0,
            style: Array.isArray(x) ? { "--ss-orb-1": x[0], "--ss-orb-2": x[1], ...x[2] ? { "--ss-orb-3": x[2] } : null } : void 0
          }
        ),
        /* @__PURE__ */ i(Rr.Provider, { value: ae, children: /* @__PURE__ */ i(Pr.Provider, { value: no, children: K(w, eo, m) }) }),
        r && /* @__PURE__ */ i(Ho, { rows: [Ue, _e], at: typeof l == "string" ? l : l[m] }),
        ro && /* @__PURE__ */ i(aa, { cursorRef: fe, style: a.style, kind: E })
      ]
    }
  ) });
}
const ca = ["var(--ss-ink-1)", "var(--ss-ink-2)", "var(--ss-ink-3)", "var(--ss-ink-4)", "var(--ss-ink-5)"];
function $e({ w: e, h: t = 6, tone: n = 3, r = 2, shrink: o, className: a, style: s, ...c }) {
  const d = o ?? (typeof e == "number" && e > t * 3);
  return /* @__PURE__ */ i("span", { ...c, className: `ss-bar${a ? ` ${a}` : ""}`, "data-shrink": d || void 0, style: { width: e, height: t, borderRadius: r, background: ca[n - 1], ...s } });
}
function pe({ children: e, w: t, h: n = 6, tone: r = 3, wrap: o, filler: a, className: s, style: c, ...d }) {
  const { fidelity: l } = un();
  if (l === "minimal" || a && l !== "realistic") {
    const h = typeof c?.fontSize == "number" ? c.fontSize : 11;
    return /* @__PURE__ */ i($e, { ...d, w: t ?? Math.round(e.length * h * 0.52), h: n, tone: r, className: s });
  }
  return /* @__PURE__ */ i("span", { ...d, className: `ss-text${s ? ` ${s}` : ""}`, "data-wrap": o || void 0, style: c, children: e });
}
function Qt({ delay: e = 0, children: t, ...n }) {
  const r = Rt(), [o, a] = ue(t);
  return Xe(() => {
    if (!e || r) return a(t);
    const s = setTimeout(() => a(t), e);
    return () => clearTimeout(s);
  }, [t, e, r]), /* @__PURE__ */ i(la, { ...n, children: e && !r ? o : t });
}
function la({
  children: e,
  stagger: t = 45,
  variant: n = "roll",
  align: r,
  className: o,
  style: a
}) {
  const s = Rt(), [c, d] = ue({ text: e, head: 0, tail: 0, old: "", key: 0, numeric: !0 }), l = Z(null), h = Z(null), _ = Z(null), u = () => {
    if (!h.current || !l.current) return 0;
    const S = parseFloat(getComputedStyle(l.current).height), m = S > 0 ? l.current.getBoundingClientRect().height / S : 1;
    return h.current.getBoundingClientRect().width / (m || 1);
  }, [f, k] = ue(r ?? "start");
  me(() => {
    if (r) return k(r);
    const S = h.current;
    if (!S?.parentElement) return;
    let m = S;
    for (; m.parentElement && m.parentElement.childElementCount === 1 && Math.abs(m.parentElement.getBoundingClientRect().width - m.getBoundingClientRect().width) < 1; ) m = m.parentElement;
    const R = m.parentElement;
    if (!R) return;
    const M = getComputedStyle(R), C = /flex/.test(M.display) && M.flexDirection.startsWith("row"), ce = () => {
      const ee = m.previousElementSibling, le = m.getBoundingClientRect(), de = R.getBoundingClientRect(), Y = Math.abs(de.right - parseFloat(M.paddingRight) - parseFloat(M.borderRightWidth) - le.right) < 1, fe = ee ? le.left - ee.getBoundingClientRect().right - (parseFloat(M.columnGap) || 0) : 0;
      return Y && fe > 1;
    }, he = /right|end/.test(getComputedStyle(S).textAlign) || C && m === R.lastElementChild && (/space-between|flex-end|^end/.test(M.justifyContent) || ce());
    k(he ? "end" : "start");
  }, [r]), Xe(() => {
    if (s) {
      d({ text: e, head: 0, tail: 0, old: "", key: 0, numeric: !0 });
      return;
    }
    if (c.text === e) return;
    const S = c.text, m = e;
    let R = 0;
    for (; R < S.length && R < m.length && S[R] === m[R]; ) R++;
    let M = 0;
    for (; M < S.length - R && M < m.length - R && S[S.length - 1 - M] === m[m.length - 1 - M]; ) M++;
    const C = /^[\d.,$€£%+\-−\s]*$/.test(S.slice(R, S.length - M) + m.slice(R, m.length - M));
    if (!C) {
      const ee = (le) => le === void 0 || /\s/.test(le);
      for (; R > 0 && !ee(m[R - 1]) && !ee(m[R]); ) R--;
      for (; M > 0 && !ee(m[m.length - M - 1]) && !ee(m[m.length - M]); ) M--;
    }
    const ce = c.key + 1;
    _.current = u(), d({ text: m, head: R, tail: M, old: S.slice(R, S.length - M), key: ce, numeric: C });
    const he = setTimeout(() => d((ee) => ee.key === ce ? { ...ee, old: "" } : ee), 700);
    return () => clearTimeout(he);
  }, [e, s]), me(() => {
    const S = l.current, m = S?.querySelector("[data-live]"), R = S?.querySelector("[data-out]");
    if (!S || !m) return;
    const M = (Y) => parseFloat(getComputedStyle(Y).width) || 0, C = M(m);
    if (s || c.key === 0) {
      S.style.transition = "none", S.style.width = `${C}px`, _.current = null;
      return;
    }
    const ce = u() - M(S), he = _.current;
    _.current = null;
    const ee = he === null ? R ? M(R) : 0 : Math.max(0, he - ce);
    if (S.style.transition = "none", S.style.width = `${ee}px`, S.offsetWidth, S.style.transition = "", n === "fade") {
      S.style.width = `${C}px`;
      return;
    }
    const le = Math.max(C, ee, R ? M(R) : 0);
    if (S.style.width = `${le}px`, le === C) return;
    const de = setTimeout(() => S.style.width = `${C}px`, 360);
    return () => clearTimeout(de);
  }, [c.key, s, s ? e : void 0]);
  const { text: A, head: N, tail: p, old: x, key: F, numeric: z } = s ? { text: e, head: 0, tail: 0, old: "", key: 0, numeric: !0 } : c, W = A.slice(N, A.length - p), K = z ? W.split("") : W.split(/(?<=\s)/);
  return /* @__PURE__ */ i("span", { ref: h, className: `ss-roll${o ? ` ${o}` : ""}`, "data-variant": n, "data-align": f, style: a, children: [
    A.slice(0, N),
    /* @__PURE__ */ i("span", { ref: l, className: "ss-roll__mid", children: [
      x && /* @__PURE__ */ i("span", { className: "ss-roll__item", "data-out": !0, children: x }, `o${F}`),
      /* @__PURE__ */ i("span", { className: "ss-roll__item", "data-live": !0, children: F > 0 && n === "fade" ? /* @__PURE__ */ i("span", { className: "ss-roll__char", children: W }) : F > 0 ? K.map((S, m) => /* @__PURE__ */ i("span", { className: "ss-roll__char", style: { animationDelay: `${m * t}ms` }, children: S }, m)) : W }, `n${F}`)
    ] }),
    A.slice(A.length - p)
  ] });
}
const Hr = an({ current: !0 });
function In(e) {
  const t = getComputedStyle(e), n = t.boxSizing === "border-box" ? 0 : [t.paddingLeft, t.paddingRight, t.borderLeftWidth, t.borderRightWidth].reduce((s, c) => s + (parseFloat(c) || 0), 0), r = parseFloat(t.width) + n, o = r && e.getBoundingClientRect().width / r || 1, a = /* @__PURE__ */ new Map();
  return new Map(Array.from(e.children, (s) => {
    const c = s.offsetParent;
    return c && !a.has(c) && a.set(c, c.getBoundingClientRect().top), [s, (s.getBoundingClientRect().top - (c ? a.get(c) : 0)) / o];
  }));
}
function ua({ app: e = "imessage", className: t, style: n, children: r }) {
  const o = Z(null), a = Z(!1), s = o.current ? In(o.current) : /* @__PURE__ */ new Map();
  Xe(() => {
    a.current = !0;
  }, []), me(() => {
    const h = o.current;
    if (!h) return;
    const _ = In(h);
    for (const [u, f] of Array.from(_)) {
      const k = u, A = s.get(k);
      if (A === void 0 || Math.abs(A - f) < 1e-3) continue;
      const N = parseFloat(getComputedStyle(k).top) || 0;
      k.style.transition = "none", k.style.top = `${A + N - f}px`, k.offsetWidth, k.style.transition = "", k.style.top = "";
    }
  });
  const c = yo.toArray(r).filter(Ar), d = (h) => h.type === Je ? h.props.from : null, l = c.map((h, _) => {
    if (h.type !== Je || h.props.tail !== void 0) return h;
    const u = c.slice(_ + 1).find((f) => f.type === Je);
    return Co(h, { tail: !u || d(u) !== h.props.from });
  });
  return /* @__PURE__ */ i(Hr.Provider, { value: a, children: /* @__PURE__ */ i("div", { ref: o, className: `ss-thread${t ? ` ${t}` : ""}`, "data-app": e, style: n, children: l }) });
}
function Je({ avatar: e, from: t, typing: n = !1, tail: r, source: o, tapback: a, className: s, style: c, children: d, ...l }) {
  const { fidelity: h } = un(), _ = Z(sn(Hr).current).current, u = Z(null), f = Z(null), k = Z(n), A = Z(!1);
  k.current && !n && (A.current = !0), k.current = n, me(() => {
    const p = u.current;
    if (!p) return;
    const x = f.current;
    p.style.width = "", p.style.height = "";
    const F = getComputedStyle(p), z = { w: parseFloat(F.width), h: parseFloat(F.height) };
    if (f.current = z, !x || x.w === z.w && x.h === z.h) return;
    const W = p.querySelector(".ss-bubble__text");
    W && (W.style.width = getComputedStyle(W).width), p.style.transition = "none", p.style.width = `${x.w}px`, p.style.height = `${x.h}px`, p.offsetWidth, p.style.transition = "", p.style.width = `${z.w}px`, p.style.height = `${z.h}px`;
    const K = () => {
      p.style.width = "", p.style.height = "", W && (W.style.width = "");
    };
    return p.addEventListener("transitionend", K, { once: !0 }), () => p.removeEventListener("transitionend", K);
  }, [n, d]), me(() => {
    const p = u.current;
    if (!p || !_ || !o) return;
    const x = p.closest(".ss-stage") ?? document, F = x.querySelector(`[data-target="${o}"]`) ?? x.querySelector(o), z = p.querySelector(".ss-bubble__text");
    if (!F || !z || window.matchMedia("(prefers-reduced-motion: reduce)").matches || p.closest("[data-still]")) return;
    p.style.transition = "none", p.style.left = p.style.top = "0px";
    const W = p.getBoundingClientRect().width / p.offsetWidth || 1, K = F.getBoundingClientRect(), S = z.getBoundingClientRect(), m = (K.left - S.left) / W, R = (K.top + K.height / 2 - (S.top + S.height / 2)) / W, M = "cubic-bezier(0.22, 1, 0.36, 1)";
    p.style.transition = "none", p.style.left = `${m}px`, p.style.top = `${R}px`, p.setAttribute("data-flying", ""), p.style.color = getComputedStyle(F).color, p.offsetWidth, p.style.transition = `left 0.5s ${M}, top 0.5s ${M}, color 0.3s ease 0.06s`, p.style.left = p.style.top = "", p.removeAttribute("data-flying"), p.style.color = "";
    const C = (ce) => {
      ce.target !== p || ce.propertyName !== "top" || (p.style.transition = "", p.removeEventListener("transitionend", C));
    };
    return p.addEventListener("transitionend", C), () => p.removeEventListener("transitionend", C);
  }, []);
  let N = d;
  return h === "minimal" && typeof d == "string" && (N = /* @__PURE__ */ i("span", { className: "ss-bar ss-bubble__bar", style: { width: Math.min(180, d.length * 5.5) } })), /* @__PURE__ */ i("div", { className: `ss-bubble-row${s ? ` ${s}` : ""}`, "data-from": t, "data-avatar": e ? "" : void 0, style: c, children: [
    e && t !== "me" && /* @__PURE__ */ i("span", { className: "ss-bubble__avatar", "aria-hidden": !0, children: e }),
    /* @__PURE__ */ i("div", { ...l, ref: u, className: "ss-bubble", "data-arrived": _ || void 0, "data-source": o ? "" : void 0, "data-tail": r || void 0, "data-typing": n || void 0, "data-grew": A.current || void 0, "data-tapback": a && a.show !== !1 ? "" : void 0, children: [
      a && /* @__PURE__ */ i("span", { className: "ss-tapback", "data-show": a.show !== !1 || void 0, "aria-hidden": !0, children: /* @__PURE__ */ i("span", { className: "ss-tapback__emoji", children: a.emoji }) }),
      n ? /* @__PURE__ */ i("span", { className: "ss-bubble__dots", "aria-label": "typing", children: [
        /* @__PURE__ */ i("i", {}),
        /* @__PURE__ */ i("i", {}),
        /* @__PURE__ */ i("i", {})
      ] }) : /* @__PURE__ */ i("span", { className: "ss-bubble__text", children: N }),
      /* @__PURE__ */ i("svg", { className: "ss-bubble__tail", viewBox: "0 0 18 16", "aria-hidden": !0, children: /* @__PURE__ */ i("path", { d: t === "me" ? "M0 0H12V8.5C12 12.6 14 15 17.5 16C15 16.7 12.2 16.5 9.8 15.3L0 15Z" : "M18 0H6V8.5C6 12.6 4 15 0.5 16C3 16.7 5.8 16.5 8.2 15.3L18 15Z" }) })
    ] })
  ] });
}
function _a({ value: e, states: t, align: n = "center", className: r, style: o, ...a }) {
  const s = Rt();
  return /* @__PURE__ */ i("span", { ...a, className: `ss-states${r ? ` ${r}` : ""}`, "data-align": n, "data-reduced": s || void 0, style: o, children: Object.keys(t).map((c) => /* @__PURE__ */ i("span", { className: "ss-states__item", "data-on": c === e || void 0, "aria-hidden": c !== e || void 0, children: t[c] }, c)) });
}
const Gn = ["#c98f6e", "#6f9b7d", "#7b86c7", "#c47a9e", "#8c9ab0", "#c2a35a"], da = (e) => {
  let t = 0;
  for (const n of e) t = (t * 31 + n.charCodeAt(0)) % 9973;
  return Gn[t % Gn.length];
};
function nt({ name: e = "", plain: t = !1, size: n = 24, tone: r = e ? "person" : "ink", src: o, ring: a, className: s, style: c, ...d }) {
  const { fidelity: l } = un(), h = t || l === "minimal", _ = r === "person" && !h ? { background: da(e), color: "#fff" } : void 0, u = e.trim().split(/\s+/).filter(Boolean), f = r === "ios" ? (u[0]?.[0] ?? "") + (u.length > 1 ? u[u.length - 1][0] : "") : e.trim()[0] ?? "";
  return /* @__PURE__ */ i(
    "span",
    {
      ...d,
      className: `ss-avatar${s ? ` ${s}` : ""}`,
      "data-tone": r,
      "data-ring": a,
      style: { width: n, height: n, fontSize: Math.round(n * (r === "ios" ? 0.4 : n < 24 ? 0.5 : 0.42)), ..._, ...c },
      children: o && !h ? /* @__PURE__ */ i("img", { src: o, alt: "" }) : h ? null : /* @__PURE__ */ i("span", { className: "ss-avatar__initial", children: f.toUpperCase() })
    }
  );
}
function fa({ on: e, pending: t, size: n = 16, className: r, ...o }) {
  return /* @__PURE__ */ i("span", { ...o, className: `ss-check${r ? ` ${r}` : ""}`, "data-on": e || void 0, "data-pending": t && !e || void 0, style: { width: n, height: n, ...o.style }, children: /* @__PURE__ */ i("svg", { viewBox: "0 0 16 16", width: n, height: n, "aria-hidden": !0, children: [
    /* @__PURE__ */ i("circle", { className: "ss-check__ring", cx: "8", cy: "8", r: "7.25" }),
    /* @__PURE__ */ i("circle", { className: "ss-check__arc", cx: "8", cy: "8", r: "7.25", pathLength: 1 }),
    /* @__PURE__ */ i("circle", { className: "ss-check__fill", cx: "8", cy: "8", r: "8" }),
    /* @__PURE__ */ i("path", { className: "ss-check__tick", d: "M4.5 8.2 7 10.6l4.6-5", pathLength: 1 })
  ] }) });
}
var _n, H, Wr, Pe, Kn, Or, Fr, Vt, $t, at, zr, dn, en, tn, Br = {}, St = [], ha = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, ft = Array.isArray;
function Ae(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function fn(e) {
  e && e.parentNode && e.parentNode.removeChild(e);
}
function lt(e, t, n) {
  var r, o, a, s = {};
  for (a in t) a == "key" ? r = t[a] : a == "ref" ? o = t[a] : s[a] = t[a];
  if (arguments.length > 2 && (s.children = arguments.length > 3 ? _n.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null) for (a in e.defaultProps) s[a] === void 0 && (s[a] = e.defaultProps[a]);
  return Mt(e, s, r, o, null);
}
function Mt(e, t, n, r, o) {
  var a = { type: e, props: t, key: n, ref: r, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: o ?? ++Wr, __i: -1, __u: 0 };
  return o == null && H.vnode != null && H.vnode(a), a;
}
function ut(e) {
  return e.children;
}
function Le(e, t) {
  this.props = e, this.context = t;
}
function Be(e, t) {
  if (t == null) return e.__ ? Be(e.__, e.__i + 1) : null;
  for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
  return typeof e.type == "function" ? Be(e) : null;
}
function pa(e) {
  if (e.__P && e.__d) {
    var t = e.__v, n = t.__e, r = [], o = [], a = Ae({}, t);
    a.__v = t.__v + 1, H.vnode && H.vnode(a), Zr(e.__P, a, t, e.__n, e.__P.namespaceURI, 32 & t.__u ? [n] : null, r, n ?? Be(t), !!(32 & t.__u), o), a.__v = t.__v, a.__.__k[a.__i] = a, va(r, a, o), t.__e = t.__ = null, a.__e != n && Ur(a);
  }
}
function Ur(e) {
  if ((e = e.__) != null && e.__c != null) return e.__e = e.__c.base = null, e.__k.some(function(t) {
    if (t != null && t.__e != null) return e.__e = e.__c.base = t.__e;
  }), Ur(e);
}
function Jn(e) {
  (!e.__d && (e.__d = !0) && Pe.push(e) && !Ct.__r++ || Kn != H.debounceRendering) && ((Kn = H.debounceRendering) || Or)(Ct);
}
function Ct() {
  try {
    for (var e, t = 1; Pe.length; ) Pe.length > t && Pe.sort(Fr), e = Pe.shift(), t = Pe.length, pa(e);
  } finally {
    Pe.length = Ct.__r = 0;
  }
}
function Dr(e, t, n, r, o, a, s, c, d, l, h) {
  var _, u, f, k, A, N, p = r && r.__k || St, x = t.length;
  for (d = ma(n, t, p, d, x), _ = 0; _ < x; _++) (f = n.__k[_]) != null && (u = f.__i != -1 && p[f.__i] || Br, f.__i = _, N = Zr(e, f, u, o, a, s, c, d, l, h), k = f.__e, f.ref && u.ref != f.ref && (u.ref && hn(u.ref, null, f), h.push(f.ref, f.__c || k, f)), A == null && k != null && (A = k), 4 & f.__u ? (d = qr(f, d, e), u.__e && (u.__e = null)) : typeof f.type == "function" && N !== void 0 ? d = N : k && (d = k.nextSibling), f.__u &= -7);
  return n.__e = A, d;
}
function ma(e, t, n, r, o) {
  var a, s, c, d, l, h = n.length, _ = h, u = 0;
  for (e.__k = new Array(o), a = 0; a < o; a++) (s = t[a]) != null && typeof s != "boolean" && typeof s != "function" ? (typeof s == "string" || typeof s == "number" || typeof s == "bigint" || s.constructor == String ? s = e.__k[a] = Mt(null, s, null, null, null) : ft(s) ? s = e.__k[a] = Mt(ut, { children: s }, null, null, null) : s.constructor === void 0 && s.__b > 0 ? s = e.__k[a] = Mt(s.type, s.props, s.key, s.ref ? s.ref : null, s.__v) : e.__k[a] = s, d = a + u, s.__ = e, s.__b = e.__b + 1, c = null, (l = s.__i = ya(s, n, d, _)) != -1 && (_--, (c = n[l]) && (c.__u |= 2)), c == null || c.__v == null ? (l == -1 && (o > h ? u-- : o < h && u++), typeof s.type != "function" && (s.__u |= 4)) : l != d && (l == d - 1 ? u-- : l == d + 1 ? u++ : (l > d ? u-- : u++, s.__u |= 4))) : e.__k[a] = null;
  if (_) for (a = 0; a < h; a++) (c = n[a]) != null && (2 & c.__u) == 0 && (c.__e == r && (r = Be(c)), Ir(c, c));
  return r;
}
function qr(e, t, n) {
  var r, o;
  if (typeof e.type == "function") {
    for (r = e.__k, o = 0; r && o < r.length; o++) r[o] && (r[o].__ = e, t = qr(r[o], t, n));
    return t;
  }
  e.__e != t && (t && e.type && !t.parentNode && (t = Be(e)), t = n.insertBefore(e.__e, t || null));
  do
    t = t && t.nextSibling;
  while (t != null && t.nodeType == 8);
  return t;
}
function Lt(e, t) {
  return t = t || [], e == null || typeof e == "boolean" || (ft(e) ? e.some(function(n) {
    Lt(n, t);
  }) : t.push(e)), t;
}
function ya(e, t, n, r) {
  var o, a, s, c = e.key, d = e.type, l = t[n], h = l != null && (2 & l.__u) == 0;
  if (l === null && c == null || h && c == l.key && d == l.type) return n;
  if (r > (h ? 1 : 0)) {
    for (o = n - 1, a = n + 1; o >= 0 || a < t.length; ) if ((l = t[s = o >= 0 ? o-- : a++]) != null && (2 & l.__u) == 0 && c == l.key && d == l.type) return s;
  }
  return -1;
}
function Yn(e, t, n) {
  t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || ha.test(t) ? n : n + "px";
}
function wt(e, t, n, r, o) {
  var a, s;
  e: if (t == "style") if (typeof n == "string") e.style.cssText = n;
  else {
    if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || Yn(e.style, t, "");
    if (n) for (t in n) r && n[t] == r[t] || Yn(e.style, t, n[t]);
  }
  else if (t[0] == "o" && t[1] == "n") a = t != (t = t.replace(zr, "$1")), s = t.toLowerCase(), t = s in e || t == "onFocusOut" || t == "onFocusIn" ? s.slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + a] = n, n ? r ? n[at] = r[at] : (n[at] = dn, e.addEventListener(t, a ? tn : en, a)) : e.removeEventListener(t, a ? tn : en, a);
  else {
    if (o == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
      e[t] = n ?? "";
      break e;
    } catch {
    }
    typeof n == "function" || (n == null || n === !1 && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
  }
}
function Xn(e) {
  return function(t) {
    if (this.l) {
      var n = this.l[t.type + e];
      if (t[$t] == null) t[$t] = dn++;
      else if (t[$t] < n[at]) return;
      return n(H.event ? H.event(t) : t);
    }
  };
}
function Zr(e, t, n, r, o, a, s, c, d, l) {
  var h, _, u, f, k, A, N, p, x, F, z, W, K, S, m, R, M = t.type;
  if (t.constructor !== void 0) return null;
  128 & n.__u && (d = !!(32 & n.__u), a = [c = t.__e = n.__e]), (h = H.__b) && h(t);
  e: if (typeof M == "function") {
    _ = s.length;
    try {
      if (x = t.props, F = M.prototype && M.prototype.render, z = (h = M.contextType) && r[h.__c], W = h ? z ? z.props.value : h.__ : r, n.__c ? p = (u = t.__c = n.__c).__ = u.__E : (F ? t.__c = u = new M(x, W) : (t.__c = u = new Le(x, W), u.constructor = M, u.render = wa), z && z.sub(u), u.state || (u.state = {}), u.__n = r, f = u.__d = !0, u.__h = [], u._sb = []), F && u.__s == null && (u.__s = u.state), F && M.getDerivedStateFromProps != null && (u.__s == u.state && (u.__s = Ae({}, u.__s)), Ae(u.__s, M.getDerivedStateFromProps(x, u.__s))), k = u.props, A = u.state, u.__v = t, f) F && M.getDerivedStateFromProps == null && u.componentWillMount != null && u.componentWillMount(), F && u.componentDidMount != null && u.__h.push(u.componentDidMount);
      else {
        if (F && M.getDerivedStateFromProps == null && x !== k && u.componentWillReceiveProps != null && u.componentWillReceiveProps(x, W), t.__v == n.__v || !u.__e && u.shouldComponentUpdate != null && u.shouldComponentUpdate(x, u.__s, W) === !1) {
          t.__v != n.__v && (u.props = x, u.state = u.__s, u.__d = !1), t.__e = n.__e, t.__k = n.__k, t.__k.some(function(C) {
            C && (C.__ = t);
          }), St.push.apply(u.__h, u._sb), u._sb = [], u.__h.length && s.push(u), c = Be(n);
          break e;
        }
        u.componentWillUpdate != null && u.componentWillUpdate(x, u.__s, W), F && u.componentDidUpdate != null && u.__h.push(function() {
          u.componentDidUpdate(k, A, N);
        });
      }
      if (u.context = W, u.props = x, u.__P = e, u.__e = !1, K = H.__r, S = 0, F) u.state = u.__s, u.__d = !1, K && K(t), h = u.render(u.props, u.state, u.context), St.push.apply(u.__h, u._sb), u._sb = [];
      else do
        u.__d = !1, K && K(t), h = u.render(u.props, u.state, u.context), u.state = u.__s;
      while (u.__d && ++S < 25);
      u.state = u.__s, u.getChildContext != null && (r = Ae(Ae({}, r), u.getChildContext())), F && !f && u.getSnapshotBeforeUpdate != null && (N = u.getSnapshotBeforeUpdate(k, A)), m = h != null && h.type === ut && h.key == null ? jr(h.props.children) : h, c = Dr(e, ft(m) ? m : [m], t, n, r, o, a, s, c, d, l), u.base = t.__e, t.__u &= -161, u.__h.length && s.push(u), p && (u.__E = u.__ = null);
    } catch (C) {
      if (s.length = _, t.__v = null, d || a != null) {
        if (C.then) {
          for (t.__u |= d ? 160 : 128; c && c.nodeType == 8 && c.nextSibling; ) c = c.nextSibling;
          a != null && (a[a.indexOf(c)] = null), t.__e = c;
        } else if (a != null) for (R = a.length; R--; ) fn(a[R]);
      } else t.__e = n.__e;
      t.__k == null && (t.__k = n.__k || []), C.then || Vr(t), H.__e(C, t, n);
    }
  } else a == null && t.__v == n.__v ? (t.__k = n.__k, t.__e = n.__e) : c = t.__e = ga(n.__e, t, n, r, o, a, s, d, l);
  return (h = H.diffed) && h(t), 128 & t.__u ? void 0 : c;
}
function Vr(e) {
  e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(Vr));
}
function va(e, t, n) {
  for (var r = 0; r < n.length; r++) hn(n[r], n[++r], n[++r]);
  H.__c && H.__c(t, e), e.some(function(o) {
    try {
      e = o.__h, o.__h = [], e.some(function(a) {
        a.call(o);
      });
    } catch (a) {
      H.__e(a, o.__v);
    }
  });
}
function jr(e) {
  return typeof e != "object" || e == null || e.__b > 0 ? e : ft(e) ? e.map(jr) : e.constructor !== void 0 ? null : Ae({}, e);
}
function ga(e, t, n, r, o, a, s, c, d) {
  var l, h, _, u, f, k, A, N = n.props || Br, p = t.props, x = t.type;
  if (x == "svg" ? o = "http://www.w3.org/2000/svg" : x == "math" ? o = "http://www.w3.org/1998/Math/MathML" : o || (o = "http://www.w3.org/1999/xhtml"), a != null) {
    for (l = 0; l < a.length; l++) if ((f = a[l]) && "setAttribute" in f == !!x && (x ? f.localName == x : f.nodeType == 3)) {
      e = f, a[l] = null;
      break;
    }
  }
  if (e == null) {
    if (x == null) return document.createTextNode(p);
    e = document.createElementNS(o, x, p.is && p), c && (H.__m && H.__m(t, a), c = !1), a = null;
  }
  if (x == null) N === p || c && e.data == p || (e.data = p);
  else {
    if (a = x == "textarea" && p.defaultValue != null ? null : a && _n.call(e.childNodes), !c && a != null) for (N = {}, l = 0; l < e.attributes.length; l++) N[(f = e.attributes[l]).name] = f.value;
    for (l in N) f = N[l], l == "dangerouslySetInnerHTML" ? _ = f : l == "children" || l in p || l == "value" && "defaultValue" in p || l == "checked" && "defaultChecked" in p || wt(e, l, null, f, o);
    for (l in p) f = p[l], l == "children" ? u = f : l == "dangerouslySetInnerHTML" ? h = f : l == "value" ? k = f : l == "checked" ? A = f : c && typeof f != "function" || N[l] === f || wt(e, l, f, N[l], o);
    if (h) c || _ && (h.__html == _.__html || h.__html == e.innerHTML) || (e.innerHTML = h.__html), t.__k = [];
    else if (_ && (e.innerHTML = ""), Dr(t.type == "template" ? e.content : e, ft(u) ? u : [u], t, n, r, x == "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, a, s, a ? a[0] : n.__k && Be(n, 0), c, d), a != null) for (l = a.length; l--; ) fn(a[l]);
    c && x != "textarea" || (l = "value", x == "progress" && k == null ? e.removeAttribute("value") : k != null && (k !== e[l] || x == "progress" && !k || x == "option" && k != N[l]) && wt(e, l, k, N[l], o), l = "checked", A != null && A != e[l] && wt(e, l, A, N[l], o));
  }
  return e;
}
function hn(e, t, n) {
  try {
    if (typeof e == "function") {
      var r = typeof e.__u == "function";
      r && e.__u(), r && t == null || (e.__u = e(t));
    } else e.current = t;
  } catch (o) {
    H.__e(o, n);
  }
}
function Ir(e, t, n) {
  var r, o;
  if (H.unmount && H.unmount(e), (r = e.ref) && (r.current && r.current != e.__e || hn(r, null, t)), (r = e.__c) != null) {
    if (r.componentWillUnmount) try {
      r.componentWillUnmount();
    } catch (a) {
      H.__e(a, t);
    }
    r.base = r.__P = r.__n = null;
  }
  if (r = e.__k) for (o = 0; o < r.length; o++) r[o] && Ir(r[o], t, n || typeof e.type != "function");
  n || fn(e.__e), e.__c = e.__ = e.__e = void 0;
}
function wa(e, t, n) {
  return this.constructor(e, n);
}
_n = St.slice, H = { __e: function(e, t, n, r) {
  for (var o, a, s; t = t.__; ) if ((o = t.__c) && !o.__) try {
    if ((a = o.constructor) && a.getDerivedStateFromError != null && (o.setState(a.getDerivedStateFromError(e)), s = o.__d), o.componentDidCatch != null && (o.componentDidCatch(e, r || {}), s = o.__d), s) return o.__E = o;
  } catch (c) {
    e = c;
  }
  throw e;
} }, Wr = 0, Le.prototype.setState = function(e, t) {
  var n;
  n = this.__s != null && this.__s != this.state ? this.__s : this.__s = Ae({}, this.state), typeof e == "function" && (e = e(Ae({}, n), this.props)), e && Ae(n, e), e != null && this.__v && (t && this._sb.push(t), Jn(this));
}, Le.prototype.forceUpdate = function(e) {
  this.__v && (this.__e = !0, e && this.__h.push(e), Jn(this));
}, Le.prototype.render = ut, Pe = [], Or = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Fr = function(e, t) {
  return e.__v.__b - t.__v.__b;
}, Ct.__r = 0, Vt = Math.random().toString(8), $t = "__d" + Vt, at = "__a" + Vt, zr = /(PointerCapture)$|Capture$/i, dn = 0, en = Xn(!1), tn = Xn(!0);
function Gr(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function Qn(e, t) {
  for (var n in e) if (n !== "__source" && !(n in t)) return !0;
  for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
  return !1;
}
function er(e, t) {
  this.props = e, this.context = t;
}
(er.prototype = new Le()).isPureReactComponent = !0, er.prototype.shouldComponentUpdate = function(e, t) {
  return Qn(this.props, e) || Qn(this.state, t);
};
var tr = H.__b;
H.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), tr && tr(e);
};
var ba = typeof Symbol < "u" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function Kr(e) {
  function t(n) {
    var r = Gr({}, n);
    return delete r.ref, e(r, n.ref || null);
  }
  return t.$$typeof = ba, t.render = e, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")", t;
}
var ka = H.__e;
H.__e = function(e, t, n, r) {
  if (e.then) {
    for (var o, a = t; a = a.__; ) if ((o = a.__c) && o.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k || []), o.__c(e, t);
  }
  ka(e, t, n, r);
};
var nr = H.unmount;
function Jr(e, t, n) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = Gr({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return Jr(r, t, n);
  })), e;
}
function Yr(e, t, n) {
  return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return Yr(r, t, n);
  }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function jt() {
  this.__u = 0, this.o = null, this.__b = null;
}
function Xr(e) {
  var t = e.__ && e.__.__c;
  return t && t.__a && t.__a(e);
}
function bt() {
  this.i = null, this.l = null;
}
H.unmount = function(e) {
  var t = e.__c;
  t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), nr && nr(e);
}, (jt.prototype = new Le()).__c = function(e, t) {
  var n = t.__c, r = this;
  r.o == null && (r.o = []), r.o.push(n);
  var o = Xr(r.__v), a = !1, s = function() {
    a || r.__z || (a = !0, n.__R = null, o ? o(d) : d());
  };
  n.__R = s;
  var c = n.__P;
  n.__P = null;
  var d = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var l = r.state.__a;
        r.__v.__k[0] = Yr(l, l.__c.__P, l.__c.__O);
      }
      var h;
      for (r.setState({ __a: r.__b = null }); h = r.o.pop(); ) h.__P = c, h.forceUpdate();
    }
  };
  r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(s, s);
}, jt.prototype.componentWillUnmount = function() {
  this.o = [];
}, jt.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = Jr(this.__b, n, r.__O = r.__P);
    }
    this.__b = null;
  }
  var o = t.__a && lt(ut, null, e.fallback);
  return o && (o.__u &= -33), [lt(ut, null, t.__a ? null : e.children), o];
};
var rr = function(e, t, n) {
  if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    e.i = n = n[2];
  }
};
(bt.prototype = new Le()).__a = function(e) {
  var t = this, n = Xr(t.__v), r = t.l.get(e);
  return r[0]++, function(o) {
    var a = function() {
      t.props.revealOrder ? (r.push(o), rr(t, e, r)) : o();
    };
    n ? n(a) : a();
  };
}, bt.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t = Lt(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var n = t.length; n--; ) this.l.set(t[n], this.i = [1, 0, this.i]);
  return e.children;
}, bt.prototype.componentDidUpdate = bt.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(t, n) {
    rr(e, n, t);
  });
};
var xa = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, $a = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Ma = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Na = /[A-Z0-9]/g, Aa = typeof document < "u", Sa = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
Le.prototype.isReactComponent = !0, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(Le.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var or = H.event;
H.event = function(e) {
  return or && (e = or(e)), e.persist = function() {
  }, e.isPropagationStopped = function() {
    return this.cancelBubble;
  }, e.isDefaultPrevented = function() {
    return this.defaultPrevented;
  }, e.nativeEvent = e;
};
var Ca = { configurable: !0, get: function() {
  return this.class;
} }, ar = H.vnode;
H.vnode = function(e) {
  typeof e.type == "string" && (function(t) {
    var n = t.props, r = t.type, o = {}, a = r.indexOf("-") == -1;
    for (var s in n) {
      var c = n[s];
      if (!(s === "value" && "defaultValue" in n && c == null || Aa && s === "children" && r === "noscript" || s === "class" || s === "className")) {
        var d = s.toLowerCase();
        s === "defaultValue" && "value" in n && n.value == null ? s = "value" : s === "download" && c === !0 ? c = "" : d === "translate" && c === "no" ? c = !1 : d[0] === "o" && d[1] === "n" ? d === "ondoubleclick" ? s = "ondblclick" : d !== "onchange" || r !== "input" && r !== "textarea" || Sa(n.type) ? d === "onfocus" ? s = "onfocusin" : d === "onblur" ? s = "onfocusout" : Ma.test(s) && (s = d) : d = s = "oninput" : a && $a.test(s) ? s = s.replace(Na, "-$&").toLowerCase() : c === null && (c = void 0), d === "oninput" && o[s = d] && (s = "oninputCapture"), o[s] = c;
      }
    }
    r == "select" && (o.multiple && Array.isArray(o.value) && (o.value = Lt(n.children).forEach(function(l) {
      l.props.selected = o.value.indexOf(l.props.value) != -1;
    })), o.defaultValue != null && (o.value = Lt(n.children).forEach(function(l) {
      l.props.selected = o.multiple ? o.defaultValue.indexOf(l.props.value) != -1 : o.defaultValue == l.props.value;
    }))), n.class && !n.className ? (o.class = n.class, Object.defineProperty(o, "className", Ca)) : n.className && (o.class = o.className = n.className), t.props = o;
  })(e), e.$$typeof = xa, ar && ar(e);
};
var sr = H.__r;
H.__r = function(e) {
  sr && sr(e), e.__c;
};
var ir = H.diffed;
H.diffed = function(e) {
  ir && ir(e);
  var t = e.props, n = e.__e;
  n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const La = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Qr = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim();
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Ea = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pa = Kr(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: a,
    iconNode: s,
    ...c
  }, d) => lt(
    "svg",
    {
      ref: d,
      ...Ea,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: Qr("lucide", o),
      ...c
    },
    [
      ...s.map(([l, h]) => lt(l, h)),
      ...Array.isArray(a) ? a : [a]
    ]
  )
);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D = (e, t) => {
  const n = Kr(
    ({ className: r, ...o }, a) => lt(Pa, {
      ref: a,
      iconNode: t,
      className: Qr(`lucide-${La(e)}`, r),
      ...o
    })
  );
  return n.displayName = `${e}`, n;
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ra = D("Archive", [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" }],
  ["path", { d: "M10 12h4", key: "a56b0p" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ta = D("ArrowRight", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ha = D("ArrowUpRight", [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wa = D("Bell", [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oa = D("Calendar", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fa = D("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const za = D("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ba = D("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ua = D("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Da = D("CreditCard", [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qa = D("Ellipsis", [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Za = D("File", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Va = D("Globe", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ja = D("GripVertical", [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ia = D("Heart", [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ga = D("House", [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ka = D("Lock", [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ja = D("Mail", [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ya = D("Pause", [
  ["rect", { x: "14", y: "4", width: "4", height: "16", rx: "1", key: "zuxfzm" }],
  ["rect", { x: "6", y: "4", width: "4", height: "16", rx: "1", key: "1okwgv" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xa = D("Play", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qa = D("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const es = D("ScanFace", [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2", key: "1y1vjs" }],
  ["path", { d: "M9 9h.01", key: "1q5me6" }],
  ["path", { d: "M15 9h.01", key: "x1ddxp" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ts = D("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ns = D("Send", [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rs = D("Settings", [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const os = D("Star", [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const as = D("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ss = D("User", [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const is = D("Wifi", [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cs = D("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ls = D("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]), cr = {
  check: Fa,
  plus: Qa,
  close: cs,
  "chevron-right": Ba,
  "chevron-down": za,
  search: ts,
  globe: Va,
  external: Ha,
  clock: Ua,
  archive: Ra,
  trash: as,
  more: qa,
  arrow: Ta,
  file: Za,
  user: ss,
  bell: Wa,
  card: Da,
  bolt: ls,
  lock: Ka,
  play: Xa,
  pause: Ya,
  faceid: es,
  wifi: is,
  heart: Ia,
  star: os,
  calendar: Oa,
  mail: Ja,
  send: ns,
  home: Ga,
  gear: rs,
  grip: ja
}, us = {
  chip: "M3.5 2.5h9a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12V4a1.5 1.5 0 0 1 1.5-1.5zM2 6h4M2 10h4M10 6h4M10 10h4M6 2.5v11M10 2.5v11M6 8h4",
  contactless: "M6.8 6.2a2.5 2.5 0 0 1 0 3.6M8.5 4.5a5 5 0 0 1 0 7M10.3 2.7a7.5 7.5 0 0 1 0 10.6"
}, _s = {
  bolt: "M9.6 1.2 3.2 8.9a.6.6 0 0 0 .5 1H7.4l-1 4.9a.4.4 0 0 0 .7.3l6.4-7.7a.6.6 0 0 0-.5-1H9.3l1-4.9a.4.4 0 0 0-.7-.3Z",
  card: "M3 3h10a1.75 1.75 0 0 1 1.75 1.75V5.6H1.25v-.85A1.75 1.75 0 0 1 3 3Zm-1.75 4.4h13.5v3.85A1.75 1.75 0 0 1 13 13H3a1.75 1.75 0 0 1-1.75-1.75Zm2.25 2.6v1h3v-1Z",
  bell: "M8 1.25a4.25 4.25 0 0 0-4.25 4.25v3.1l-1.3 2.1a.6.6 0 0 0 .5.9h10.1a.6.6 0 0 0 .5-.9l-1.3-2.1V5.5A4.25 4.25 0 0 0 8 1.25ZM6.2 13.1a1.9 1.9 0 0 0 3.6 0Z",
  user: "M8 1.5a3.1 3.1 0 1 1 0 6.2 3.1 3.1 0 0 1 0-6.2Zm0 7.4c3.1 0 5.4 1.8 5.9 4.6a.7.7 0 0 1-.7.8H2.8a.7.7 0 0 1-.7-.8C2.6 10.7 4.9 8.9 8 8.9Z",
  clock: "M8 1.25a6.75 6.75 0 1 1 0 13.5 6.75 6.75 0 0 1 0-13.5Zm-.75 3v4.2l2.9 1.75.75-1.25-2.15-1.3V4.25Z",
  check: "M8 1.25a6.75 6.75 0 1 1 0 13.5 6.75 6.75 0 0 1 0-13.5Zm3 4.3-.95-.8-3.3 3.95-1.85-1.8-.85.9 2.8 2.75Z",
  // SF Symbols-style solids for Apple-native demos
  lock: "M8 1.25A3.25 3.25 0 0 0 4.75 4.5v2H4.5A1.5 1.5 0 0 0 3 8v5.25a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5V8a1.5 1.5 0 0 0-1.5-1.5h-.25v-2A3.25 3.25 0 0 0 8 1.25Zm-1.75 5.25v-2a1.75 1.75 0 0 1 3.5 0v2Z",
  play: "M4.5 2.6v10.8a.8.8 0 0 0 1.2.7l8.6-5.4a.8.8 0 0 0 0-1.4L5.7 1.9a.8.8 0 0 0-1.2.7Z",
  pause: "M4 2.5h2.6a.6.6 0 0 1 .6.6v9.8a.6.6 0 0 1-.6.6H4a.6.6 0 0 1-.6-.6V3.1a.6.6 0 0 1 .6-.6Zm5.4 0H12a.6.6 0 0 1 .6.6v9.8a.6.6 0 0 1-.6.6H9.4a.6.6 0 0 1-.6-.6V3.1a.6.6 0 0 1 .6-.6Z",
  heart: "M8 14.2c-.2 0-6.6-3.7-6.6-8.4a3.6 3.6 0 0 1 6.6-2 3.6 3.6 0 0 1 6.6 2c0 4.7-6.4 8.4-6.6 8.4Z",
  star: "M8 1.2a.6.6 0 0 1 .55.35l1.75 3.6 3.95.55a.6.6 0 0 1 .33 1.03l-2.86 2.8.68 3.94a.6.6 0 0 1-.87.63L8 12.25 4.47 14.1a.6.6 0 0 1-.87-.63l.68-3.94-2.86-2.8a.6.6 0 0 1 .33-1.03l3.95-.55 1.75-3.6A.6.6 0 0 1 8 1.2Z",
  home: "M7.5 1.6a.8.8 0 0 1 1 0l5.7 4.6a.8.8 0 0 1 .3.6v6.7a1 1 0 0 1-1 1H10V10.3H6v4.2H2.5a1 1 0 0 1-1-1V6.8a.8.8 0 0 1 .3-.6Z",
  gear: "M6.67 2.46L7.03 0.81L8.97 0.81L9.33 2.46L10.98 3.14L12.40 2.24L13.76 3.60L12.86 5.02L13.54 6.67L15.19 7.03L15.19 8.97L13.54 9.33L12.86 10.98L13.76 12.40L12.40 13.76L10.98 12.86L9.33 13.54L8.97 15.19L7.03 15.19L6.67 13.54L5.02 12.86L3.60 13.76L2.24 12.40L3.14 10.98L2.46 9.33L0.81 8.97L0.81 7.03L2.46 6.67L3.14 5.02L2.24 3.60L3.60 2.24L5.02 3.14ZM5.60 8.00a2.40 2.40 0 1 0 4.80 0a2.40 2.40 0 1 0 -4.80 0Z",
  calendar: "M3.5 2h9A2 2 0 0 1 14.5 4v8.5a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm-.5 4.5v6a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-6ZM4.2 7.6h1.6v1.6h-1.6ZM7.2 7.6h1.6v1.6h-1.6ZM10.2 7.6h1.6v1.6h-1.6ZM4.2 10.2h1.6v1.6h-1.6ZM7.2 10.2h1.6v1.6h-1.6ZM10.2 10.2h1.6v1.6h-1.6Z",
  send: "M14.3 1.7a.55.55 0 0 0-.6-.12L1.75 6.4a.55.55 0 0 0 0 1.02l4.6 1.85 4.9-4.13a.2.2 0 0 1 .28.28L7.4 10.3l1.84 4.6a.55.55 0 0 0 1.02 0l4.83-11.95a.55.55 0 0 0-.12-.6Z",
  mail: "M2.5 3h11A1.5 1.5 0 0 1 15 4.4L8 8.9 1 4.4A1.5 1.5 0 0 1 2.5 3ZM1 6.1v5.4A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.1l-6.6 4.2a.8.8 0 0 1-.8 0Z"
};
function ds({ name: e, size: t = 16, stroke: n = 1.5, filled: r, className: o, style: a }) {
  const s = r ? _s[e] : void 0, c = `ss-icon${o ? ` ${o}` : ""}`;
  if (!s && e in cr) {
    const d = cr[e];
    return /* @__PURE__ */ i(d, { size: t, strokeWidth: n, absoluteStrokeWidth: !0, className: c, style: a, "aria-hidden": !0 });
  }
  return /* @__PURE__ */ i("svg", { viewBox: "0 0 16 16", width: t, height: t, className: c, style: a, "aria-hidden": !0, children: s ? /* @__PURE__ */ i("path", { d: s, fill: "currentColor", fillRule: "evenodd" }) : /* @__PURE__ */ i("path", { d: us[e], fill: "none", stroke: "currentColor", strokeWidth: n, strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function rt({ tone: e = "neutral", dot: t, icon: n, children: r, className: o, ...a }) {
  return /* @__PURE__ */ i("span", { ...a, className: `ss-badge${o ? ` ${o}` : ""}`, "data-tone": e, "data-lead": t || n ? "" : void 0, children: [
    t && /* @__PURE__ */ i("span", { className: "ss-badge__dot" }),
    n,
    /* @__PURE__ */ i("span", { className: "ss-badge__label", children: r })
  ] });
}
function lr({ variant: e = "secondary", size: t = "medium", icon: n, trailingIcon: r, children: o, className: a, ...s }) {
  const [c, d] = ue(n), [l, h] = ue(!!n), _ = !!n;
  return me(() => {
    if (!_) return h(!1);
    if (d(n), l) return;
    const u = requestAnimationFrame(() => h(!0));
    return () => cancelAnimationFrame(u);
  }, [_]), /* @__PURE__ */ i(
    "span",
    {
      role: "button",
      "data-cursor": "pointer",
      ...s,
      className: `ss-button${a ? ` ${a}` : ""}`,
      "data-variant": e,
      "data-size": t,
      "data-leading": l ? "" : void 0,
      "data-trailing": r ? "" : void 0,
      children: [
        c != null && /* @__PURE__ */ i("span", { className: "ss-button__icon ss-button__lead", "data-open": l || void 0, onTransitionEnd: (u) => {
          !_ && u.propertyName === "width" && d(null);
        }, children: n ?? c }),
        o != null && o !== !1 && /* @__PURE__ */ i("span", { className: "ss-button__label", children: typeof o == "string" || typeof o == "number" ? /* @__PURE__ */ i(Qt, { variant: "fade", children: String(o) }) : o }),
        r && /* @__PURE__ */ i("span", { className: "ss-button__icon", children: r })
      ]
    }
  );
}
const fs = { payroll: !1, ran: !1, timeoff: !1, approved: !1, support: !1 }, hs = { payroll: !0, ran: !0, timeoff: !0, approved: !0, support: !0 }, ps = ["Dashboard", "Workers", "Payroll", "HR", "Time", "Benefits", "Resources", "Company"], ms = ["Marisa", "Douglas", "Eliana", "Jessica"], ys = 3, vs = 31, gs = async (e) => {
  await e.wait(500), e.mark("payroll"), e.put({ payroll: !0 }), await e.wait(1100), e.mark("start"), await e.click("start"), await e.set({ ran: !0 }), await e.wait(1500), e.mark("timeoff"), await e.move("rest"), e.put({ timeoff: !0 }), await e.wait(1300), await e.set({ approved: !0 }), await e.wait(900), e.mark("support"), e.put({ support: !0 }), await e.wait(3200);
};
function ws({ d: e }) {
  const t = e === 6 || e === 10 ? "cap" : e > 6 && e < 10 ? "band" : e === 22 ? "ok" : e === 23 ? "warn" : e === 20 ? "soft" : void 0;
  return /* @__PURE__ */ i("span", { className: "opd-day", "data-kind": t, children: /* @__PURE__ */ i("span", { children: e }) });
}
function bs() {
  return /* @__PURE__ */ i(
    Tr,
    {
      width: 960,
      height: 660,
      compact: { below: 640, width: 358, height: 590 },
      initial: fs,
      poster: hs,
      script: gs,
      play: "once",
      fidelity: "realistic",
      cursor: { at: "rest" },
      className: "look-onpay opd",
      children: (e) => /* @__PURE__ */ i(Ee, { children: [
        /* @__PURE__ */ i("section", { className: "opd-app", children: [
          /* @__PURE__ */ i("div", { className: "opd-top", children: [
            /* @__PURE__ */ i("span", { className: "opd-logo", children: "onpay" }),
            /* @__PURE__ */ i("span", { className: "opd-search", children: /* @__PURE__ */ i($e, { w: 14, h: 14, r: 7, tone: 2 }) }),
            /* @__PURE__ */ i("span", { className: "opd-icons", children: [
              /* @__PURE__ */ i($e, { w: 14, h: 14, r: 4, tone: 2 }),
              /* @__PURE__ */ i($e, { w: 14, h: 14, r: 4, tone: 2 }),
              /* @__PURE__ */ i($e, { w: 14, h: 14, r: 7, tone: 2 })
            ] }),
            /* @__PURE__ */ i("span", { className: "opd-me", children: [
              /* @__PURE__ */ i(nt, { plain: !0, size: 30 }),
              /* @__PURE__ */ i("span", { className: "opd-me-lines", children: [
                /* @__PURE__ */ i($e, { w: 110, h: 7, r: 4, tone: 2 }),
                /* @__PURE__ */ i($e, { w: 140, h: 6, r: 3, tone: 1 })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ i("div", { className: "opd-side", children: ps.map((t, n) => /* @__PURE__ */ i("span", { className: "opd-nav", "data-on": n === 0 || void 0, children: t }, t)) }),
          /* @__PURE__ */ i("div", { className: "opd-main", children: [
            /* @__PURE__ */ i(pe, { className: "opd-hello", children: "Good evening, Michelle" }),
            /* @__PURE__ */ i("div", { className: "opd-team", children: ms.map((t) => /* @__PURE__ */ i("span", { className: "opd-person", children: [
              /* @__PURE__ */ i(nt, { name: t, size: 52 }),
              /* @__PURE__ */ i($e, { w: 64, h: 6, r: 3, tone: 2 })
            ] }, t)) }),
            /* @__PURE__ */ i("div", { className: "opd-cards", children: [
              /* @__PURE__ */ i("section", { className: "opd-card", children: [
                /* @__PURE__ */ i(pe, { className: "opd-card-title", children: "Recent pay run" }),
                /* @__PURE__ */ i("span", { className: "opd-date", children: [
                  /* @__PURE__ */ i("span", { className: "opd-month", children: e.ran ? "Feb" : "Jan" }),
                  /* @__PURE__ */ i(Qt, { className: "opd-dom", children: e.ran ? "5th" : "22nd" })
                ] }),
                /* @__PURE__ */ i("span", { className: "opd-lines", children: [
                  /* @__PURE__ */ i($e, { w: 90, h: 6, r: 3, tone: 1 }),
                  /* @__PURE__ */ i($e, { w: 90, h: 6, r: 3, tone: 1 })
                ] }),
                /* @__PURE__ */ i("span", { className: "opd-actions", children: [
                  /* @__PURE__ */ i("span", { className: "opd-outline", "data-strong": !0, children: "Summary" }),
                  /* @__PURE__ */ i("span", { className: "opd-outline", children: "Checks" })
                ] })
              ] }),
              /* @__PURE__ */ i("section", { className: "opd-card", children: [
                /* @__PURE__ */ i(pe, { className: "opd-card-title", children: "Pay schedule" }),
                /* @__PURE__ */ i("div", { className: "opd-cal", children: [
                  ["S", "M", "T", "W", "T", "F", "S"].map((t, n) => /* @__PURE__ */ i("span", { className: "opd-dow", children: t }, n)),
                  Array.from({ length: ys }, (t, n) => /* @__PURE__ */ i("span", {}, `e${n}`)),
                  Array.from({ length: vs }, (t, n) => /* @__PURE__ */ i(ws, { d: n + 1 }, n))
                ] })
              ] }),
              /* @__PURE__ */ i("section", { className: "opd-card", children: [
                /* @__PURE__ */ i(pe, { className: "opd-card-title", children: "Next pay run" }),
                /* @__PURE__ */ i("span", { className: "opd-date", children: [
                  /* @__PURE__ */ i("span", { className: "opd-month", children: "Feb" }),
                  /* @__PURE__ */ i(Qt, { className: "opd-dom", children: e.ran ? "19th" : "5th" })
                ] }),
                /* @__PURE__ */ i("span", { className: "opd-sched", children: "Bi-weekly" }),
                /* @__PURE__ */ i("span", { className: "opd-actions", children: /* @__PURE__ */ i("span", { className: "opd-outline", "data-strong": !0, children: "Start run" }) })
              ] })
            ] }),
            /* @__PURE__ */ i("span", { className: "opd-rest", "data-target": "rest" })
          ] })
        ] }),
        /* @__PURE__ */ i("section", { className: "opd-sat opd-payroll", "data-in": e.payroll || void 0, children: [
          /* @__PURE__ */ i("div", { className: "opd-sat-copy", children: [
            /* @__PURE__ */ i(rt, { tone: "accent", children: "Bi-weekly" }),
            /* @__PURE__ */ i(pe, { className: "opd-sat-title", children: "Let’s run payroll" }),
            /* @__PURE__ */ i(pe, { className: "opd-sat-sub", children: "Jan 21st – Feb 3rd" })
          ] }),
          /* @__PURE__ */ i(lr, { variant: "primary", size: "large", className: "opd-btn", "data-target": "start", icon: e.ran ? /* @__PURE__ */ i(ds, { name: "check", size: 14, stroke: 2.2 }) : void 0, children: e.ran ? "Submitted" : "Start" })
        ] }),
        /* @__PURE__ */ i("section", { className: "opd-sat opd-support", "data-in": e.support || void 0, children: [
          /* @__PURE__ */ i(nt, { name: "Dana", size: 72, tone: "accent" }),
          /* @__PURE__ */ i("div", { className: "opd-sat-copy", children: [
            /* @__PURE__ */ i(rt, { tone: "warning", children: "Live support" }),
            /* @__PURE__ */ i(pe, { className: "opd-sat-title", children: "Need help? Let’s chat." }),
            /* @__PURE__ */ i(lr, { variant: "primary", size: "large", className: "opd-btn", children: "Get support" })
          ] })
        ] }),
        /* @__PURE__ */ i("section", { className: "opd-sat opd-timeoff", "data-in": e.timeoff || void 0, children: [
          /* @__PURE__ */ i(nt, { name: "Marcus", size: 64 }),
          /* @__PURE__ */ i("div", { className: "opd-sat-copy", children: [
            /* @__PURE__ */ i(
              _a,
              {
                value: e.approved ? "approved" : "pending",
                align: "start",
                states: { pending: /* @__PURE__ */ i(rt, { tone: "warning", children: "Pending" }), approved: /* @__PURE__ */ i(rt, { tone: "success", children: "Approved" }) }
              }
            ),
            /* @__PURE__ */ i(pe, { className: "opd-sat-title", children: "Time off request" }),
            /* @__PURE__ */ i(pe, { className: "opd-sat-sub", children: "May 24 – May 31" })
          ] })
        ] })
      ] })
    }
  );
}
const ks = { n: 0, typing: !1, card: !1, done: [!1, !1] }, xs = { n: 3, typing: !1, card: !0, done: [!0, !0] }, $s = "We just hired our first employee in Ohio. What do we set up?", Ms = "Congrats! You need Ohio withholding and unemployment accounts. I’ll add both to your setup now.", Ns = "Thank you, Dana!", As = ["State withholding", "Unemployment (SUTA)"], Ss = async (e) => {
  await e.wait(500), e.mark("ask"), e.put({ n: 1 }), await e.wait(1100), e.mark("typing"), e.put({ typing: !0, n: 2 }), await e.wait(1700), e.mark("answer"), e.put({ typing: !1 }), await e.wait(1300), e.mark("setup"), e.put({ card: !0 }), await e.wait(700), await e.stagger([0, 1], (t) => e.set((n) => ({ done: n.done.map((r, o) => r || o === t) })), 520), await e.wait(900), e.mark("thanks"), e.put({ n: 3 }), await e.wait(3e3);
};
function Cs() {
  return /* @__PURE__ */ i(
    Tr,
    {
      width: 560,
      height: 560,
      compact: { below: 520, width: 358, height: 560 },
      initial: ks,
      poster: xs,
      script: Ss,
      play: "once",
      fidelity: "realistic",
      className: "look-onpay ope",
      children: (e) => /* @__PURE__ */ i(Ee, { children: [
        /* @__PURE__ */ i("section", { className: "ope-chat", children: [
          /* @__PURE__ */ i("div", { className: "ope-head", children: [
            /* @__PURE__ */ i(nt, { name: "Dana", size: 44, tone: "accent" }),
            /* @__PURE__ */ i("span", { className: "ope-who", children: [
              /* @__PURE__ */ i(pe, { className: "ope-name", children: "Dana Ruiz" }),
              /* @__PURE__ */ i(pe, { className: "ope-role", children: "Payroll specialist, US-based" })
            ] }),
            /* @__PURE__ */ i(rt, { tone: "success", children: "Live" })
          ] }),
          /* @__PURE__ */ i("div", { className: "ope-body", children: /* @__PURE__ */ i(ua, { children: [
            e.n >= 1 && /* @__PURE__ */ i(Je, { from: "me", children: $s }),
            e.n >= 2 && /* @__PURE__ */ i(Je, { from: "them", typing: e.typing, children: Ms }),
            e.n >= 3 && /* @__PURE__ */ i(Je, { from: "me", children: Ns })
          ] }) })
        ] }),
        /* @__PURE__ */ i("section", { className: "ope-setup", "data-in": e.card || void 0, children: [
          /* @__PURE__ */ i(pe, { className: "ope-setup-title", children: "Ohio setup" }),
          As.map((t, n) => /* @__PURE__ */ i("span", { className: "ope-row", children: [
            /* @__PURE__ */ i(fa, { on: e.done[n], size: 18 }),
            /* @__PURE__ */ i(pe, { children: t })
          ] }, t))
        ] })
      ] })
    }
  );
}
const Ls = { "onpay-dashboard": bs, "onpay-expert": Cs }, Es = Promise.all(["400 14px Poppins", "500 14px Poppins", "600 14px Poppins"].map((e) => document.fonts.load(e)));
async function Ps(e) {
  const t = Ls[e.dataset.stageshow ?? ""], n = e.querySelector(".wp-block-cb-stage__live");
  !t || !n || e.dataset.mounted || (e.dataset.mounted = "pending", await Es, Po(n).render(/* @__PURE__ */ i(t, {})), requestAnimationFrame(() => requestAnimationFrame(() => e.dataset.mounted = "live")));
}
export {
  Ps as mount
};
