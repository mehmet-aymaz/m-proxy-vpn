/*! For license information please see main.3109de2a.js.LICENSE.txt */
(() => {
  "use strict";
  var e = {
      4(e, t, n) {
        var r = n(853),
          a = n(43),
          l = n(950);
        function o(e) {
          var t = "https://react.dev/errors/" + e;
          if (1 < arguments.length) {
            t += "?args[]=" + encodeURIComponent(arguments[1]);
            for (var n = 2; n < arguments.length; n++)
              t += "&args[]=" + encodeURIComponent(arguments[n]);
          }
          return (
            "Minified React error #" +
            e +
            "; visit " +
            t +
            " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
          );
        }
        function i(e) {
          return !(
            !e ||
            (1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType)
          );
        }
        function s(e) {
          var t = e,
            n = e;
          if (e.alternate) for (; t.return; ) t = t.return;
          else {
            e = t;
            do {
              (0 !== (4098 & (t = e).flags) && (n = t.return), (e = t.return));
            } while (e);
          }
          return 3 === t.tag ? n : null;
        }
        function u(e) {
          if (13 === e.tag) {
            var t = e.memoizedState;
            if (
              (null === t &&
                null !== (e = e.alternate) &&
                (t = e.memoizedState),
              null !== t)
            )
              return t.dehydrated;
          }
          return null;
        }
        function c(e) {
          if (31 === e.tag) {
            var t = e.memoizedState;
            if (
              (null === t &&
                null !== (e = e.alternate) &&
                (t = e.memoizedState),
              null !== t)
            )
              return t.dehydrated;
          }
          return null;
        }
        function d(e) {
          if (s(e) !== e) throw Error(o(188));
        }
        function f(e) {
          var t = e.tag;
          if (5 === t || 26 === t || 27 === t || 6 === t) return e;
          for (e = e.child; null !== e; ) {
            if (null !== (t = f(e))) return t;
            e = e.sibling;
          }
          return null;
        }
        var p = Object.assign,
          h = Symbol.for("react.element"),
          m = Symbol.for("react.transitional.element"),
          g = Symbol.for("react.portal"),
          y = Symbol.for("react.fragment"),
          b = Symbol.for("react.strict_mode"),
          v = Symbol.for("react.profiler"),
          x = Symbol.for("react.consumer"),
          k = Symbol.for("react.context"),
          w = Symbol.for("react.forward_ref"),
          S = Symbol.for("react.suspense"),
          N = Symbol.for("react.suspense_list"),
          E = Symbol.for("react.memo"),
          C = Symbol.for("react.lazy");
        Symbol.for("react.scope");
        var j = Symbol.for("react.activity");
        (Symbol.for("react.legacy_hidden"), Symbol.for("react.tracing_marker"));
        var z = Symbol.for("react.memo_cache_sentinel");
        Symbol.for("react.view_transition");
        var P = Symbol.iterator;
        function T(e) {
          return null === e || "object" !== typeof e
            ? null
            : "function" === typeof (e = (P && e[P]) || e["@@iterator"])
              ? e
              : null;
        }
        var _ = Symbol.for("react.client.reference");
        function L(e) {
          if (null == e) return null;
          if ("function" === typeof e)
            return e.$$typeof === _ ? null : e.displayName || e.name || null;
          if ("string" === typeof e) return e;
          switch (e) {
            case y:
              return "Fragment";
            case v:
              return "Profiler";
            case b:
              return "StrictMode";
            case S:
              return "Suspense";
            case N:
              return "SuspenseList";
            case j:
              return "Activity";
          }
          if ("object" === typeof e)
            switch (e.$$typeof) {
              case g:
                return "Portal";
              case k:
                return e.displayName || "Context";
              case x:
                return (e._context.displayName || "Context") + ".Consumer";
              case w:
                var t = e.render;
                return (
                  (e = e.displayName) ||
                    (e =
                      "" !== (e = t.displayName || t.name || "")
                        ? "ForwardRef(" + e + ")"
                        : "ForwardRef"),
                  e
                );
              case E:
                return null !== (t = e.displayName || null)
                  ? t
                  : L(e.type) || "Memo";
              case C:
                ((t = e._payload), (e = e._init));
                try {
                  return L(e(t));
                } catch (n) {}
            }
          return null;
        }
        var A = Array.isArray,
          I = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
          O = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
          R = { pending: !1, data: null, method: null, action: null },
          D = [],
          M = -1;
        function F(e) {
          return { current: e };
        }
        function U(e) {
          0 > M || ((e.current = D[M]), (D[M] = null), M--);
        }
        function H(e, t) {
          (M++, (D[M] = e.current), (e.current = t));
        }
        var B,
          V,
          W = F(null),
          $ = F(null),
          q = F(null),
          Q = F(null);
        function K(e, t) {
          switch ((H(q, t), H($, e), H(W, null), t.nodeType)) {
            case 9:
            case 11:
              e = (e = t.documentElement) && (e = e.namespaceURI) ? yd(e) : 0;
              break;
            default:
              if (((e = t.tagName), (t = t.namespaceURI)))
                e = bd((t = yd(t)), e);
              else
                switch (e) {
                  case "svg":
                    e = 1;
                    break;
                  case "math":
                    e = 2;
                    break;
                  default:
                    e = 0;
                }
          }
          (U(W), H(W, e));
        }
        function Y() {
          (U(W), U($), U(q));
        }
        function G(e) {
          null !== e.memoizedState && H(Q, e);
          var t = W.current,
            n = bd(t, e.type);
          t !== n && (H($, e), H(W, n));
        }
        function X(e) {
          ($.current === e && (U(W), U($)),
            Q.current === e && (U(Q), (df._currentValue = R)));
        }
        function Z(e) {
          if (void 0 === B)
            try {
              throw Error();
            } catch (n) {
              var t = n.stack.trim().match(/\n( *(at )?)/);
              ((B = (t && t[1]) || ""),
                (V =
                  -1 < n.stack.indexOf("\n    at")
                    ? " (<anonymous>)"
                    : -1 < n.stack.indexOf("@")
                      ? "@unknown:0:0"
                      : ""));
            }
          return "\n" + B + e + V;
        }
        var J = !1;
        function ee(e, t) {
          if (!e || J) return "";
          J = !0;
          var n = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          try {
            var r = {
              DetermineComponentFrameRoot: function () {
                try {
                  if (t) {
                    var n = function () {
                      throw Error();
                    };
                    if (
                      (Object.defineProperty(n.prototype, "props", {
                        set: function () {
                          throw Error();
                        },
                      }),
                      "object" === typeof Reflect && Reflect.construct)
                    ) {
                      try {
                        Reflect.construct(n, []);
                      } catch (a) {
                        var r = a;
                      }
                      Reflect.construct(e, [], n);
                    } else {
                      try {
                        n.call();
                      } catch (l) {
                        r = l;
                      }
                      e.call(n.prototype);
                    }
                  } else {
                    try {
                      throw Error();
                    } catch (o) {
                      r = o;
                    }
                    (n = e()) &&
                      "function" === typeof n.catch &&
                      n.catch(function () {});
                  }
                } catch (i) {
                  if (i && r && "string" === typeof i.stack)
                    return [i.stack, r.stack];
                }
                return [null, null];
              },
            };
            r.DetermineComponentFrameRoot.displayName =
              "DetermineComponentFrameRoot";
            var a = Object.getOwnPropertyDescriptor(
              r.DetermineComponentFrameRoot,
              "name",
            );
            a &&
              a.configurable &&
              Object.defineProperty(r.DetermineComponentFrameRoot, "name", {
                value: "DetermineComponentFrameRoot",
              });
            var l = r.DetermineComponentFrameRoot(),
              o = l[0],
              i = l[1];
            if (o && i) {
              var s = o.split("\n"),
                u = i.split("\n");
              for (
                a = r = 0;
                r < s.length && !s[r].includes("DetermineComponentFrameRoot");
              )
                r++;
              for (
                ;
                a < u.length && !u[a].includes("DetermineComponentFrameRoot");
              )
                a++;
              if (r === s.length || a === u.length)
                for (
                  r = s.length - 1, a = u.length - 1;
                  1 <= r && 0 <= a && s[r] !== u[a];
                )
                  a--;
              for (; 1 <= r && 0 <= a; r--, a--)
                if (s[r] !== u[a]) {
                  if (1 !== r || 1 !== a)
                    do {
                      if ((r--, 0 > --a || s[r] !== u[a])) {
                        var c = "\n" + s[r].replace(" at new ", " at ");
                        return (
                          e.displayName &&
                            c.includes("<anonymous>") &&
                            (c = c.replace("<anonymous>", e.displayName)),
                          c
                        );
                      }
                    } while (1 <= r && 0 <= a);
                  break;
                }
            }
          } finally {
            ((J = !1), (Error.prepareStackTrace = n));
          }
          return (n = e ? e.displayName || e.name : "") ? Z(n) : "";
        }
        function te(e, t) {
          switch (e.tag) {
            case 26:
            case 27:
            case 5:
              return Z(e.type);
            case 16:
              return Z("Lazy");
            case 13:
              return e.child !== t && null !== t
                ? Z("Suspense Fallback")
                : Z("Suspense");
            case 19:
              return Z("SuspenseList");
            case 0:
            case 15:
              return ee(e.type, !1);
            case 11:
              return ee(e.type.render, !1);
            case 1:
              return ee(e.type, !0);
            case 31:
              return Z("Activity");
            default:
              return "";
          }
        }
        function ne(e) {
          try {
            var t = "",
              n = null;
            do {
              ((t += te(e, n)), (n = e), (e = e.return));
            } while (e);
            return t;
          } catch (r) {
            return "\nError generating stack: " + r.message + "\n" + r.stack;
          }
        }
        var re = Object.prototype.hasOwnProperty,
          ae = r.unstable_scheduleCallback,
          le = r.unstable_cancelCallback,
          oe = r.unstable_shouldYield,
          ie = r.unstable_requestPaint,
          se = r.unstable_now,
          ue = r.unstable_getCurrentPriorityLevel,
          ce = r.unstable_ImmediatePriority,
          de = r.unstable_UserBlockingPriority,
          fe = r.unstable_NormalPriority,
          pe = r.unstable_LowPriority,
          he = r.unstable_IdlePriority,
          me = r.log,
          ge = r.unstable_setDisableYieldValue,
          ye = null,
          be = null;
        function ve(e) {
          if (
            ("function" === typeof me && ge(e),
            be && "function" === typeof be.setStrictMode)
          )
            try {
              be.setStrictMode(ye, e);
            } catch (t) {}
        }
        var xe = Math.clz32
            ? Math.clz32
            : function (e) {
                return 0 === (e >>>= 0) ? 32 : (31 - ((ke(e) / we) | 0)) | 0;
              },
          ke = Math.log,
          we = Math.LN2;
        var Se = 256,
          Ne = 262144,
          Ee = 4194304;
        function Ce(e) {
          var t = 42 & e;
          if (0 !== t) return t;
          switch (e & -e) {
            case 1:
              return 1;
            case 2:
              return 2;
            case 4:
              return 4;
            case 8:
              return 8;
            case 16:
              return 16;
            case 32:
              return 32;
            case 64:
              return 64;
            case 128:
              return 128;
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
              return 261888 & e;
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return 3932160 & e;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
              return 62914560 & e;
            case 67108864:
              return 67108864;
            case 134217728:
              return 134217728;
            case 268435456:
              return 268435456;
            case 536870912:
              return 536870912;
            case 1073741824:
              return 0;
            default:
              return e;
          }
        }
        function je(e, t, n) {
          var r = e.pendingLanes;
          if (0 === r) return 0;
          var a = 0,
            l = e.suspendedLanes,
            o = e.pingedLanes;
          e = e.warmLanes;
          var i = 134217727 & r;
          return (
            0 !== i
              ? 0 !== (r = i & ~l)
                ? (a = Ce(r))
                : 0 !== (o &= i)
                  ? (a = Ce(o))
                  : n || (0 !== (n = i & ~e) && (a = Ce(n)))
              : 0 !== (i = r & ~l)
                ? (a = Ce(i))
                : 0 !== o
                  ? (a = Ce(o))
                  : n || (0 !== (n = r & ~e) && (a = Ce(n))),
            0 === a
              ? 0
              : 0 !== t &&
                  t !== a &&
                  0 === (t & l) &&
                  ((l = a & -a) >= (n = t & -t) ||
                    (32 === l && 0 !== (4194048 & n)))
                ? t
                : a
          );
        }
        function ze(e, t) {
          return (
            0 === (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t)
          );
        }
        function Pe(e, t) {
          switch (e) {
            case 1:
            case 2:
            case 4:
            case 8:
            case 64:
              return t + 250;
            case 16:
            case 32:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return t + 5e3;
            default:
              return -1;
          }
        }
        function Te() {
          var e = Ee;
          return (0 === (62914560 & (Ee <<= 1)) && (Ee = 4194304), e);
        }
        function _e(e) {
          for (var t = [], n = 0; 31 > n; n++) t.push(e);
          return t;
        }
        function Le(e, t) {
          ((e.pendingLanes |= t),
            268435456 !== t &&
              ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
        }
        function Ae(e, t, n) {
          ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
          var r = 31 - xe(t);
          ((e.entangledLanes |= t),
            (e.entanglements[r] =
              1073741824 | e.entanglements[r] | (261930 & n)));
        }
        function Ie(e, t) {
          var n = (e.entangledLanes |= t);
          for (e = e.entanglements; n; ) {
            var r = 31 - xe(n),
              a = 1 << r;
            ((a & t) | (e[r] & t) && (e[r] |= t), (n &= ~a));
          }
        }
        function Oe(e, t) {
          var n = t & -t;
          return 0 !==
            ((n = 0 !== (42 & n) ? 1 : Re(n)) & (e.suspendedLanes | t))
            ? 0
            : n;
        }
        function Re(e) {
          switch (e) {
            case 2:
              e = 1;
              break;
            case 8:
              e = 4;
              break;
            case 32:
              e = 16;
              break;
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
              e = 128;
              break;
            case 268435456:
              e = 134217728;
              break;
            default:
              e = 0;
          }
          return e;
        }
        function De(e) {
          return 2 < (e &= -e)
            ? 8 < e
              ? 0 !== (134217727 & e)
                ? 32
                : 268435456
              : 8
            : 2;
        }
        function Me() {
          var e = O.p;
          return 0 !== e ? e : void 0 === (e = window.event) ? 32 : jf(e.type);
        }
        function Fe(e, t) {
          var n = O.p;
          try {
            return ((O.p = e), t());
          } finally {
            O.p = n;
          }
        }
        var Ue = Math.random().toString(36).slice(2),
          He = "__reactFiber$" + Ue,
          Be = "__reactProps$" + Ue,
          Ve = "__reactContainer$" + Ue,
          We = "__reactEvents$" + Ue,
          $e = "__reactListeners$" + Ue,
          qe = "__reactHandles$" + Ue,
          Qe = "__reactResources$" + Ue,
          Ke = "__reactMarker$" + Ue;
        function Ye(e) {
          (delete e[He],
            delete e[Be],
            delete e[We],
            delete e[$e],
            delete e[qe]);
        }
        function Ge(e) {
          var t = e[He];
          if (t) return t;
          for (var n = e.parentNode; n; ) {
            if ((t = n[Ve] || n[He])) {
              if (
                ((n = t.alternate),
                null !== t.child || (null !== n && null !== n.child))
              )
                for (e = Rd(e); null !== e; ) {
                  if ((n = e[He])) return n;
                  e = Rd(e);
                }
              return t;
            }
            n = (e = n).parentNode;
          }
          return null;
        }
        function Xe(e) {
          if ((e = e[He] || e[Ve])) {
            var t = e.tag;
            if (
              5 === t ||
              6 === t ||
              13 === t ||
              31 === t ||
              26 === t ||
              27 === t ||
              3 === t
            )
              return e;
          }
          return null;
        }
        function Ze(e) {
          var t = e.tag;
          if (5 === t || 26 === t || 27 === t || 6 === t) return e.stateNode;
          throw Error(o(33));
        }
        function Je(e) {
          var t = e[Qe];
          return (
            t ||
              (t = e[Qe] =
                { hoistableStyles: new Map(), hoistableScripts: new Map() }),
            t
          );
        }
        function et(e) {
          e[Ke] = !0;
        }
        var tt = new Set(),
          nt = {};
        function rt(e, t) {
          (at(e, t), at(e + "Capture", t));
        }
        function at(e, t) {
          for (nt[e] = t, e = 0; e < t.length; e++) tt.add(t[e]);
        }
        var lt = RegExp(
            "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
          ),
          ot = {},
          it = {};
        function st(e, t, n) {
          if (
            ((a = t),
            re.call(it, a) ||
              (!re.call(ot, a) &&
                (lt.test(a) ? (it[a] = !0) : ((ot[a] = !0), 0))))
          )
            if (null === n) e.removeAttribute(t);
            else {
              switch (typeof n) {
                case "undefined":
                case "function":
                case "symbol":
                  return void e.removeAttribute(t);
                case "boolean":
                  var r = t.toLowerCase().slice(0, 5);
                  if ("data-" !== r && "aria-" !== r)
                    return void e.removeAttribute(t);
              }
              e.setAttribute(t, "" + n);
            }
          var a;
        }
        function ut(e, t, n) {
          if (null === n) e.removeAttribute(t);
          else {
            switch (typeof n) {
              case "undefined":
              case "function":
              case "symbol":
              case "boolean":
                return void e.removeAttribute(t);
            }
            e.setAttribute(t, "" + n);
          }
        }
        function ct(e, t, n, r) {
          if (null === r) e.removeAttribute(n);
          else {
            switch (typeof r) {
              case "undefined":
              case "function":
              case "symbol":
              case "boolean":
                return void e.removeAttribute(n);
            }
            e.setAttributeNS(t, n, "" + r);
          }
        }
        function dt(e) {
          switch (typeof e) {
            case "bigint":
            case "boolean":
            case "number":
            case "string":
            case "undefined":
            case "object":
              return e;
            default:
              return "";
          }
        }
        function ft(e) {
          var t = e.type;
          return (
            (e = e.nodeName) &&
            "input" === e.toLowerCase() &&
            ("checkbox" === t || "radio" === t)
          );
        }
        function pt(e) {
          if (!e._valueTracker) {
            var t = ft(e) ? "checked" : "value";
            e._valueTracker = (function (e, t, n) {
              var r = Object.getOwnPropertyDescriptor(
                e.constructor.prototype,
                t,
              );
              if (
                !e.hasOwnProperty(t) &&
                "undefined" !== typeof r &&
                "function" === typeof r.get &&
                "function" === typeof r.set
              ) {
                var a = r.get,
                  l = r.set;
                return (
                  Object.defineProperty(e, t, {
                    configurable: !0,
                    get: function () {
                      return a.call(this);
                    },
                    set: function (e) {
                      ((n = "" + e), l.call(this, e));
                    },
                  }),
                  Object.defineProperty(e, t, { enumerable: r.enumerable }),
                  {
                    getValue: function () {
                      return n;
                    },
                    setValue: function (e) {
                      n = "" + e;
                    },
                    stopTracking: function () {
                      ((e._valueTracker = null), delete e[t]);
                    },
                  }
                );
              }
            })(e, t, "" + e[t]);
          }
        }
        function ht(e) {
          if (!e) return !1;
          var t = e._valueTracker;
          if (!t) return !0;
          var n = t.getValue(),
            r = "";
          return (
            e && (r = ft(e) ? (e.checked ? "true" : "false") : e.value),
            (e = r) !== n && (t.setValue(e), !0)
          );
        }
        function mt(e) {
          if (
            "undefined" ===
            typeof (e =
              e || ("undefined" !== typeof document ? document : void 0))
          )
            return null;
          try {
            return e.activeElement || e.body;
          } catch (t) {
            return e.body;
          }
        }
        var gt = /[\n"\\]/g;
        function yt(e) {
          return e.replace(gt, function (e) {
            return "\\" + e.charCodeAt(0).toString(16) + " ";
          });
        }
        function bt(e, t, n, r, a, l, o, i) {
          ((e.name = ""),
            null != o &&
            "function" !== typeof o &&
            "symbol" !== typeof o &&
            "boolean" !== typeof o
              ? (e.type = o)
              : e.removeAttribute("type"),
            null != t
              ? "number" === o
                ? ((0 === t && "" === e.value) || e.value != t) &&
                  (e.value = "" + dt(t))
                : e.value !== "" + dt(t) && (e.value = "" + dt(t))
              : ("submit" !== o && "reset" !== o) || e.removeAttribute("value"),
            null != t
              ? xt(e, o, dt(t))
              : null != n
                ? xt(e, o, dt(n))
                : null != r && e.removeAttribute("value"),
            null == a && null != l && (e.defaultChecked = !!l),
            null != a &&
              (e.checked =
                a && "function" !== typeof a && "symbol" !== typeof a),
            null != i &&
            "function" !== typeof i &&
            "symbol" !== typeof i &&
            "boolean" !== typeof i
              ? (e.name = "" + dt(i))
              : e.removeAttribute("name"));
        }
        function vt(e, t, n, r, a, l, o, i) {
          if (
            (null != l &&
              "function" !== typeof l &&
              "symbol" !== typeof l &&
              "boolean" !== typeof l &&
              (e.type = l),
            null != t || null != n)
          ) {
            if (
              !(
                ("submit" !== l && "reset" !== l) ||
                (void 0 !== t && null !== t)
              )
            )
              return void pt(e);
            ((n = null != n ? "" + dt(n) : ""),
              (t = null != t ? "" + dt(t) : n),
              i || t === e.value || (e.value = t),
              (e.defaultValue = t));
          }
          ((r =
            "function" !== typeof (r = null != r ? r : a) &&
            "symbol" !== typeof r &&
            !!r),
            (e.checked = i ? e.checked : !!r),
            (e.defaultChecked = !!r),
            null != o &&
              "function" !== typeof o &&
              "symbol" !== typeof o &&
              "boolean" !== typeof o &&
              (e.name = o),
            pt(e));
        }
        function xt(e, t, n) {
          ("number" === t && mt(e.ownerDocument) === e) ||
            e.defaultValue === "" + n ||
            (e.defaultValue = "" + n);
        }
        function kt(e, t, n, r) {
          if (((e = e.options), t)) {
            t = {};
            for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
            for (n = 0; n < e.length; n++)
              ((a = t.hasOwnProperty("$" + e[n].value)),
                e[n].selected !== a && (e[n].selected = a),
                a && r && (e[n].defaultSelected = !0));
          } else {
            for (n = "" + dt(n), t = null, a = 0; a < e.length; a++) {
              if (e[a].value === n)
                return (
                  (e[a].selected = !0),
                  void (r && (e[a].defaultSelected = !0))
                );
              null !== t || e[a].disabled || (t = e[a]);
            }
            null !== t && (t.selected = !0);
          }
        }
        function wt(e, t, n) {
          null == t ||
          ((t = "" + dt(t)) !== e.value && (e.value = t), null != n)
            ? (e.defaultValue = null != n ? "" + dt(n) : "")
            : e.defaultValue !== t && (e.defaultValue = t);
        }
        function St(e, t, n, r) {
          if (null == t) {
            if (null != r) {
              if (null != n) throw Error(o(92));
              if (A(r)) {
                if (1 < r.length) throw Error(o(93));
                r = r[0];
              }
              n = r;
            }
            (null == n && (n = ""), (t = n));
          }
          ((n = dt(t)),
            (e.defaultValue = n),
            (r = e.textContent) === n &&
              "" !== r &&
              null !== r &&
              (e.value = r),
            pt(e));
        }
        function Nt(e, t) {
          if (t) {
            var n = e.firstChild;
            if (n && n === e.lastChild && 3 === n.nodeType)
              return void (n.nodeValue = t);
          }
          e.textContent = t;
        }
        var Et = new Set(
          "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
            " ",
          ),
        );
        function Ct(e, t, n) {
          var r = 0 === t.indexOf("--");
          null == n || "boolean" === typeof n || "" === n
            ? r
              ? e.setProperty(t, "")
              : "float" === t
                ? (e.cssFloat = "")
                : (e[t] = "")
            : r
              ? e.setProperty(t, n)
              : "number" !== typeof n || 0 === n || Et.has(t)
                ? "float" === t
                  ? (e.cssFloat = n)
                  : (e[t] = ("" + n).trim())
                : (e[t] = n + "px");
        }
        function jt(e, t, n) {
          if (null != t && "object" !== typeof t) throw Error(o(62));
          if (((e = e.style), null != n)) {
            for (var r in n)
              !n.hasOwnProperty(r) ||
                (null != t && t.hasOwnProperty(r)) ||
                (0 === r.indexOf("--")
                  ? e.setProperty(r, "")
                  : "float" === r
                    ? (e.cssFloat = "")
                    : (e[r] = ""));
            for (var a in t)
              ((r = t[a]), t.hasOwnProperty(a) && n[a] !== r && Ct(e, a, r));
          } else for (var l in t) t.hasOwnProperty(l) && Ct(e, l, t[l]);
        }
        function zt(e) {
          if (-1 === e.indexOf("-")) return !1;
          switch (e) {
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
              return !1;
            default:
              return !0;
          }
        }
        var Pt = new Map([
            ["acceptCharset", "accept-charset"],
            ["htmlFor", "for"],
            ["httpEquiv", "http-equiv"],
            ["crossOrigin", "crossorigin"],
            ["accentHeight", "accent-height"],
            ["alignmentBaseline", "alignment-baseline"],
            ["arabicForm", "arabic-form"],
            ["baselineShift", "baseline-shift"],
            ["capHeight", "cap-height"],
            ["clipPath", "clip-path"],
            ["clipRule", "clip-rule"],
            ["colorInterpolation", "color-interpolation"],
            ["colorInterpolationFilters", "color-interpolation-filters"],
            ["colorProfile", "color-profile"],
            ["colorRendering", "color-rendering"],
            ["dominantBaseline", "dominant-baseline"],
            ["enableBackground", "enable-background"],
            ["fillOpacity", "fill-opacity"],
            ["fillRule", "fill-rule"],
            ["floodColor", "flood-color"],
            ["floodOpacity", "flood-opacity"],
            ["fontFamily", "font-family"],
            ["fontSize", "font-size"],
            ["fontSizeAdjust", "font-size-adjust"],
            ["fontStretch", "font-stretch"],
            ["fontStyle", "font-style"],
            ["fontVariant", "font-variant"],
            ["fontWeight", "font-weight"],
            ["glyphName", "glyph-name"],
            ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
            ["glyphOrientationVertical", "glyph-orientation-vertical"],
            ["horizAdvX", "horiz-adv-x"],
            ["horizOriginX", "horiz-origin-x"],
            ["imageRendering", "image-rendering"],
            ["letterSpacing", "letter-spacing"],
            ["lightingColor", "lighting-color"],
            ["markerEnd", "marker-end"],
            ["markerMid", "marker-mid"],
            ["markerStart", "marker-start"],
            ["overlinePosition", "overline-position"],
            ["overlineThickness", "overline-thickness"],
            ["paintOrder", "paint-order"],
            ["panose-1", "panose-1"],
            ["pointerEvents", "pointer-events"],
            ["renderingIntent", "rendering-intent"],
            ["shapeRendering", "shape-rendering"],
            ["stopColor", "stop-color"],
            ["stopOpacity", "stop-opacity"],
            ["strikethroughPosition", "strikethrough-position"],
            ["strikethroughThickness", "strikethrough-thickness"],
            ["strokeDasharray", "stroke-dasharray"],
            ["strokeDashoffset", "stroke-dashoffset"],
            ["strokeLinecap", "stroke-linecap"],
            ["strokeLinejoin", "stroke-linejoin"],
            ["strokeMiterlimit", "stroke-miterlimit"],
            ["strokeOpacity", "stroke-opacity"],
            ["strokeWidth", "stroke-width"],
            ["textAnchor", "text-anchor"],
            ["textDecoration", "text-decoration"],
            ["textRendering", "text-rendering"],
            ["transformOrigin", "transform-origin"],
            ["underlinePosition", "underline-position"],
            ["underlineThickness", "underline-thickness"],
            ["unicodeBidi", "unicode-bidi"],
            ["unicodeRange", "unicode-range"],
            ["unitsPerEm", "units-per-em"],
            ["vAlphabetic", "v-alphabetic"],
            ["vHanging", "v-hanging"],
            ["vIdeographic", "v-ideographic"],
            ["vMathematical", "v-mathematical"],
            ["vectorEffect", "vector-effect"],
            ["vertAdvY", "vert-adv-y"],
            ["vertOriginX", "vert-origin-x"],
            ["vertOriginY", "vert-origin-y"],
            ["wordSpacing", "word-spacing"],
            ["writingMode", "writing-mode"],
            ["xmlnsXlink", "xmlns:xlink"],
            ["xHeight", "x-height"],
          ]),
          Tt =
            /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
        function _t(e) {
          return Tt.test("" + e)
            ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
            : e;
        }
        function Lt() {}
        var At = null;
        function It(e) {
          return (
            (e = e.target || e.srcElement || window).correspondingUseElement &&
              (e = e.correspondingUseElement),
            3 === e.nodeType ? e.parentNode : e
          );
        }
        var Ot = null,
          Rt = null;
        function Dt(e) {
          var t = Xe(e);
          if (t && (e = t.stateNode)) {
            var n = e[Be] || null;
            e: switch (((e = t.stateNode), t.type)) {
              case "input":
                if (
                  (bt(
                    e,
                    n.value,
                    n.defaultValue,
                    n.defaultValue,
                    n.checked,
                    n.defaultChecked,
                    n.type,
                    n.name,
                  ),
                  (t = n.name),
                  "radio" === n.type && null != t)
                ) {
                  for (n = e; n.parentNode; ) n = n.parentNode;
                  for (
                    n = n.querySelectorAll(
                      'input[name="' + yt("" + t) + '"][type="radio"]',
                    ),
                      t = 0;
                    t < n.length;
                    t++
                  ) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                      var a = r[Be] || null;
                      if (!a) throw Error(o(90));
                      bt(
                        r,
                        a.value,
                        a.defaultValue,
                        a.defaultValue,
                        a.checked,
                        a.defaultChecked,
                        a.type,
                        a.name,
                      );
                    }
                  }
                  for (t = 0; t < n.length; t++)
                    (r = n[t]).form === e.form && ht(r);
                }
                break e;
              case "textarea":
                wt(e, n.value, n.defaultValue);
                break e;
              case "select":
                null != (t = n.value) && kt(e, !!n.multiple, t, !1);
            }
          }
        }
        var Mt = !1;
        function Ft(e, t, n) {
          if (Mt) return e(t, n);
          Mt = !0;
          try {
            return e(t);
          } finally {
            if (
              ((Mt = !1),
              (null !== Ot || null !== Rt) &&
                (Ju(), Ot && ((t = Ot), (e = Rt), (Rt = Ot = null), Dt(t), e)))
            )
              for (t = 0; t < e.length; t++) Dt(e[t]);
          }
        }
        function Ut(e, t) {
          var n = e.stateNode;
          if (null === n) return null;
          var r = n[Be] || null;
          if (null === r) return null;
          n = r[t];
          e: switch (t) {
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
            case "onMouseEnter":
              ((r = !r.disabled) ||
                (r = !(
                  "button" === (e = e.type) ||
                  "input" === e ||
                  "select" === e ||
                  "textarea" === e
                )),
                (e = !r));
              break e;
            default:
              e = !1;
          }
          if (e) return null;
          if (n && "function" !== typeof n) throw Error(o(231, t, typeof n));
          return n;
        }
        var Ht = !(
            "undefined" === typeof window ||
            "undefined" === typeof window.document ||
            "undefined" === typeof window.document.createElement
          ),
          Bt = !1;
        if (Ht)
          try {
            var Vt = {};
            (Object.defineProperty(Vt, "passive", {
              get: function () {
                Bt = !0;
              },
            }),
              window.addEventListener("test", Vt, Vt),
              window.removeEventListener("test", Vt, Vt));
          } catch (Zf) {
            Bt = !1;
          }
        var Wt = null,
          $t = null,
          qt = null;
        function Qt() {
          if (qt) return qt;
          var e,
            t,
            n = $t,
            r = n.length,
            a = "value" in Wt ? Wt.value : Wt.textContent,
            l = a.length;
          for (e = 0; e < r && n[e] === a[e]; e++);
          var o = r - e;
          for (t = 1; t <= o && n[r - t] === a[l - t]; t++);
          return (qt = a.slice(e, 1 < t ? 1 - t : void 0));
        }
        function Kt(e) {
          var t = e.keyCode;
          return (
            "charCode" in e
              ? 0 === (e = e.charCode) && 13 === t && (e = 13)
              : (e = t),
            10 === e && (e = 13),
            32 <= e || 13 === e ? e : 0
          );
        }
        function Yt() {
          return !0;
        }
        function Gt() {
          return !1;
        }
        function Xt(e) {
          function t(t, n, r, a, l) {
            for (var o in ((this._reactName = t),
            (this._targetInst = r),
            (this.type = n),
            (this.nativeEvent = a),
            (this.target = l),
            (this.currentTarget = null),
            e))
              e.hasOwnProperty(o) && ((t = e[o]), (this[o] = t ? t(a) : a[o]));
            return (
              (this.isDefaultPrevented = (
                null != a.defaultPrevented
                  ? a.defaultPrevented
                  : !1 === a.returnValue
              )
                ? Yt
                : Gt),
              (this.isPropagationStopped = Gt),
              this
            );
          }
          return (
            p(t.prototype, {
              preventDefault: function () {
                this.defaultPrevented = !0;
                var e = this.nativeEvent;
                e &&
                  (e.preventDefault
                    ? e.preventDefault()
                    : "unknown" !== typeof e.returnValue &&
                      (e.returnValue = !1),
                  (this.isDefaultPrevented = Yt));
              },
              stopPropagation: function () {
                var e = this.nativeEvent;
                e &&
                  (e.stopPropagation
                    ? e.stopPropagation()
                    : "unknown" !== typeof e.cancelBubble &&
                      (e.cancelBubble = !0),
                  (this.isPropagationStopped = Yt));
              },
              persist: function () {},
              isPersistent: Yt,
            }),
            t
          );
        }
        var Zt,
          Jt,
          en,
          tn = {
            eventPhase: 0,
            bubbles: 0,
            cancelable: 0,
            timeStamp: function (e) {
              return e.timeStamp || Date.now();
            },
            defaultPrevented: 0,
            isTrusted: 0,
          },
          nn = Xt(tn),
          rn = p({}, tn, { view: 0, detail: 0 }),
          an = Xt(rn),
          ln = p({}, rn, {
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            pageX: 0,
            pageY: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            getModifierState: yn,
            button: 0,
            buttons: 0,
            relatedTarget: function (e) {
              return void 0 === e.relatedTarget
                ? e.fromElement === e.srcElement
                  ? e.toElement
                  : e.fromElement
                : e.relatedTarget;
            },
            movementX: function (e) {
              return "movementX" in e
                ? e.movementX
                : (e !== en &&
                    (en && "mousemove" === e.type
                      ? ((Zt = e.screenX - en.screenX),
                        (Jt = e.screenY - en.screenY))
                      : (Jt = Zt = 0),
                    (en = e)),
                  Zt);
            },
            movementY: function (e) {
              return "movementY" in e ? e.movementY : Jt;
            },
          }),
          on = Xt(ln),
          sn = Xt(p({}, ln, { dataTransfer: 0 })),
          un = Xt(p({}, rn, { relatedTarget: 0 })),
          cn = Xt(
            p({}, tn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
          ),
          dn = Xt(
            p({}, tn, {
              clipboardData: function (e) {
                return "clipboardData" in e
                  ? e.clipboardData
                  : window.clipboardData;
              },
            }),
          ),
          fn = Xt(p({}, tn, { data: 0 })),
          pn = {
            Esc: "Escape",
            Spacebar: " ",
            Left: "ArrowLeft",
            Up: "ArrowUp",
            Right: "ArrowRight",
            Down: "ArrowDown",
            Del: "Delete",
            Win: "OS",
            Menu: "ContextMenu",
            Apps: "ContextMenu",
            Scroll: "ScrollLock",
            MozPrintableKey: "Unidentified",
          },
          hn = {
            8: "Backspace",
            9: "Tab",
            12: "Clear",
            13: "Enter",
            16: "Shift",
            17: "Control",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Escape",
            32: " ",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "ArrowLeft",
            38: "ArrowUp",
            39: "ArrowRight",
            40: "ArrowDown",
            45: "Insert",
            46: "Delete",
            112: "F1",
            113: "F2",
            114: "F3",
            115: "F4",
            116: "F5",
            117: "F6",
            118: "F7",
            119: "F8",
            120: "F9",
            121: "F10",
            122: "F11",
            123: "F12",
            144: "NumLock",
            145: "ScrollLock",
            224: "Meta",
          },
          mn = {
            Alt: "altKey",
            Control: "ctrlKey",
            Meta: "metaKey",
            Shift: "shiftKey",
          };
        function gn(e) {
          var t = this.nativeEvent;
          return t.getModifierState
            ? t.getModifierState(e)
            : !!(e = mn[e]) && !!t[e];
        }
        function yn() {
          return gn;
        }
        var bn = Xt(
            p({}, rn, {
              key: function (e) {
                if (e.key) {
                  var t = pn[e.key] || e.key;
                  if ("Unidentified" !== t) return t;
                }
                return "keypress" === e.type
                  ? 13 === (e = Kt(e))
                    ? "Enter"
                    : String.fromCharCode(e)
                  : "keydown" === e.type || "keyup" === e.type
                    ? hn[e.keyCode] || "Unidentified"
                    : "";
              },
              code: 0,
              location: 0,
              ctrlKey: 0,
              shiftKey: 0,
              altKey: 0,
              metaKey: 0,
              repeat: 0,
              locale: 0,
              getModifierState: yn,
              charCode: function (e) {
                return "keypress" === e.type ? Kt(e) : 0;
              },
              keyCode: function (e) {
                return "keydown" === e.type || "keyup" === e.type
                  ? e.keyCode
                  : 0;
              },
              which: function (e) {
                return "keypress" === e.type
                  ? Kt(e)
                  : "keydown" === e.type || "keyup" === e.type
                    ? e.keyCode
                    : 0;
              },
            }),
          ),
          vn = Xt(
            p({}, ln, {
              pointerId: 0,
              width: 0,
              height: 0,
              pressure: 0,
              tangentialPressure: 0,
              tiltX: 0,
              tiltY: 0,
              twist: 0,
              pointerType: 0,
              isPrimary: 0,
            }),
          ),
          xn = Xt(
            p({}, rn, {
              touches: 0,
              targetTouches: 0,
              changedTouches: 0,
              altKey: 0,
              metaKey: 0,
              ctrlKey: 0,
              shiftKey: 0,
              getModifierState: yn,
            }),
          ),
          kn = Xt(
            p({}, tn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
          ),
          wn = Xt(
            p({}, ln, {
              deltaX: function (e) {
                return "deltaX" in e
                  ? e.deltaX
                  : "wheelDeltaX" in e
                    ? -e.wheelDeltaX
                    : 0;
              },
              deltaY: function (e) {
                return "deltaY" in e
                  ? e.deltaY
                  : "wheelDeltaY" in e
                    ? -e.wheelDeltaY
                    : "wheelDelta" in e
                      ? -e.wheelDelta
                      : 0;
              },
              deltaZ: 0,
              deltaMode: 0,
            }),
          ),
          Sn = Xt(p({}, tn, { newState: 0, oldState: 0 })),
          Nn = [9, 13, 27, 32],
          En = Ht && "CompositionEvent" in window,
          Cn = null;
        Ht && "documentMode" in document && (Cn = document.documentMode);
        var jn = Ht && "TextEvent" in window && !Cn,
          zn = Ht && (!En || (Cn && 8 < Cn && 11 >= Cn)),
          Pn = String.fromCharCode(32),
          Tn = !1;
        function _n(e, t) {
          switch (e) {
            case "keyup":
              return -1 !== Nn.indexOf(t.keyCode);
            case "keydown":
              return 229 !== t.keyCode;
            case "keypress":
            case "mousedown":
            case "focusout":
              return !0;
            default:
              return !1;
          }
        }
        function Ln(e) {
          return "object" === typeof (e = e.detail) && "data" in e
            ? e.data
            : null;
        }
        var An = !1;
        var In = {
          color: !0,
          date: !0,
          datetime: !0,
          "datetime-local": !0,
          email: !0,
          month: !0,
          number: !0,
          password: !0,
          range: !0,
          search: !0,
          tel: !0,
          text: !0,
          time: !0,
          url: !0,
          week: !0,
        };
        function On(e) {
          var t = e && e.nodeName && e.nodeName.toLowerCase();
          return "input" === t ? !!In[e.type] : "textarea" === t;
        }
        function Rn(e, t, n, r) {
          (Ot ? (Rt ? Rt.push(r) : (Rt = [r])) : (Ot = r),
            0 < (t = rd(t, "onChange")).length &&
              ((n = new nn("onChange", "change", null, n, r)),
              e.push({ event: n, listeners: t })));
        }
        var Dn = null,
          Mn = null;
        function Fn(e) {
          Yc(e, 0);
        }
        function Un(e) {
          if (ht(Ze(e))) return e;
        }
        function Hn(e, t) {
          if ("change" === e) return t;
        }
        var Bn = !1;
        if (Ht) {
          var Vn;
          if (Ht) {
            var Wn = "oninput" in document;
            if (!Wn) {
              var $n = document.createElement("div");
              ($n.setAttribute("oninput", "return;"),
                (Wn = "function" === typeof $n.oninput));
            }
            Vn = Wn;
          } else Vn = !1;
          Bn = Vn && (!document.documentMode || 9 < document.documentMode);
        }
        function qn() {
          Dn && (Dn.detachEvent("onpropertychange", Qn), (Mn = Dn = null));
        }
        function Qn(e) {
          if ("value" === e.propertyName && Un(Mn)) {
            var t = [];
            (Rn(t, Mn, e, It(e)), Ft(Fn, t));
          }
        }
        function Kn(e, t, n) {
          "focusin" === e
            ? (qn(), (Mn = n), (Dn = t).attachEvent("onpropertychange", Qn))
            : "focusout" === e && qn();
        }
        function Yn(e) {
          if ("selectionchange" === e || "keyup" === e || "keydown" === e)
            return Un(Mn);
        }
        function Gn(e, t) {
          if ("click" === e) return Un(t);
        }
        function Xn(e, t) {
          if ("input" === e || "change" === e) return Un(t);
        }
        var Zn =
          "function" === typeof Object.is
            ? Object.is
            : function (e, t) {
                return (
                  (e === t && (0 !== e || 1 / e === 1 / t)) ||
                  (e !== e && t !== t)
                );
              };
        function Jn(e, t) {
          if (Zn(e, t)) return !0;
          if (
            "object" !== typeof e ||
            null === e ||
            "object" !== typeof t ||
            null === t
          )
            return !1;
          var n = Object.keys(e),
            r = Object.keys(t);
          if (n.length !== r.length) return !1;
          for (r = 0; r < n.length; r++) {
            var a = n[r];
            if (!re.call(t, a) || !Zn(e[a], t[a])) return !1;
          }
          return !0;
        }
        function er(e) {
          for (; e && e.firstChild; ) e = e.firstChild;
          return e;
        }
        function tr(e, t) {
          var n,
            r = er(e);
          for (e = 0; r; ) {
            if (3 === r.nodeType) {
              if (((n = e + r.textContent.length), e <= t && n >= t))
                return { node: r, offset: t - e };
              e = n;
            }
            e: {
              for (; r; ) {
                if (r.nextSibling) {
                  r = r.nextSibling;
                  break e;
                }
                r = r.parentNode;
              }
              r = void 0;
            }
            r = er(r);
          }
        }
        function nr(e, t) {
          return (
            !(!e || !t) &&
            (e === t ||
              ((!e || 3 !== e.nodeType) &&
                (t && 3 === t.nodeType
                  ? nr(e, t.parentNode)
                  : "contains" in e
                    ? e.contains(t)
                    : !!e.compareDocumentPosition &&
                      !!(16 & e.compareDocumentPosition(t)))))
          );
        }
        function rr(e) {
          for (
            var t = mt(
              (e =
                null != e &&
                null != e.ownerDocument &&
                null != e.ownerDocument.defaultView
                  ? e.ownerDocument.defaultView
                  : window).document,
            );
            t instanceof e.HTMLIFrameElement;
          ) {
            try {
              var n = "string" === typeof t.contentWindow.location.href;
            } catch (r) {
              n = !1;
            }
            if (!n) break;
            t = mt((e = t.contentWindow).document);
          }
          return t;
        }
        function ar(e) {
          var t = e && e.nodeName && e.nodeName.toLowerCase();
          return (
            t &&
            (("input" === t &&
              ("text" === e.type ||
                "search" === e.type ||
                "tel" === e.type ||
                "url" === e.type ||
                "password" === e.type)) ||
              "textarea" === t ||
              "true" === e.contentEditable)
          );
        }
        var lr =
            Ht && "documentMode" in document && 11 >= document.documentMode,
          or = null,
          ir = null,
          sr = null,
          ur = !1;
        function cr(e, t, n) {
          var r =
            n.window === n
              ? n.document
              : 9 === n.nodeType
                ? n
                : n.ownerDocument;
          ur ||
            null == or ||
            or !== mt(r) ||
            ("selectionStart" in (r = or) && ar(r)
              ? (r = { start: r.selectionStart, end: r.selectionEnd })
              : (r = {
                  anchorNode: (r = (
                    (r.ownerDocument && r.ownerDocument.defaultView) ||
                    window
                  ).getSelection()).anchorNode,
                  anchorOffset: r.anchorOffset,
                  focusNode: r.focusNode,
                  focusOffset: r.focusOffset,
                }),
            (sr && Jn(sr, r)) ||
              ((sr = r),
              0 < (r = rd(ir, "onSelect")).length &&
                ((t = new nn("onSelect", "select", null, t, n)),
                e.push({ event: t, listeners: r }),
                (t.target = or))));
        }
        function dr(e, t) {
          var n = {};
          return (
            (n[e.toLowerCase()] = t.toLowerCase()),
            (n["Webkit" + e] = "webkit" + t),
            (n["Moz" + e] = "moz" + t),
            n
          );
        }
        var fr = {
            animationend: dr("Animation", "AnimationEnd"),
            animationiteration: dr("Animation", "AnimationIteration"),
            animationstart: dr("Animation", "AnimationStart"),
            transitionrun: dr("Transition", "TransitionRun"),
            transitionstart: dr("Transition", "TransitionStart"),
            transitioncancel: dr("Transition", "TransitionCancel"),
            transitionend: dr("Transition", "TransitionEnd"),
          },
          pr = {},
          hr = {};
        function mr(e) {
          if (pr[e]) return pr[e];
          if (!fr[e]) return e;
          var t,
            n = fr[e];
          for (t in n)
            if (n.hasOwnProperty(t) && t in hr) return (pr[e] = n[t]);
          return e;
        }
        Ht &&
          ((hr = document.createElement("div").style),
          "AnimationEvent" in window ||
            (delete fr.animationend.animation,
            delete fr.animationiteration.animation,
            delete fr.animationstart.animation),
          "TransitionEvent" in window || delete fr.transitionend.transition);
        var gr = mr("animationend"),
          yr = mr("animationiteration"),
          br = mr("animationstart"),
          vr = mr("transitionrun"),
          xr = mr("transitionstart"),
          kr = mr("transitioncancel"),
          wr = mr("transitionend"),
          Sr = new Map(),
          Nr =
            "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
              " ",
            );
        function Er(e, t) {
          (Sr.set(e, t), rt(t, [e]));
        }
        Nr.push("scrollEnd");
        var Cr =
            "function" === typeof reportError
              ? reportError
              : function (e) {
                  if (
                    "object" === typeof window &&
                    "function" === typeof window.ErrorEvent
                  ) {
                    var t = new window.ErrorEvent("error", {
                      bubbles: !0,
                      cancelable: !0,
                      message:
                        "object" === typeof e &&
                        null !== e &&
                        "string" === typeof e.message
                          ? String(e.message)
                          : String(e),
                      error: e,
                    });
                    if (!window.dispatchEvent(t)) return;
                  } else if (
                    "object" === typeof process &&
                    "function" === typeof process.emit
                  )
                    return void process.emit("uncaughtException", e);
                  console.error(e);
                },
          jr = [],
          zr = 0,
          Pr = 0;
        function Tr() {
          for (var e = zr, t = (Pr = zr = 0); t < e; ) {
            var n = jr[t];
            jr[t++] = null;
            var r = jr[t];
            jr[t++] = null;
            var a = jr[t];
            jr[t++] = null;
            var l = jr[t];
            if (((jr[t++] = null), null !== r && null !== a)) {
              var o = r.pending;
              (null === o ? (a.next = a) : ((a.next = o.next), (o.next = a)),
                (r.pending = a));
            }
            0 !== l && Ir(n, a, l);
          }
        }
        function _r(e, t, n, r) {
          ((jr[zr++] = e),
            (jr[zr++] = t),
            (jr[zr++] = n),
            (jr[zr++] = r),
            (Pr |= r),
            (e.lanes |= r),
            null !== (e = e.alternate) && (e.lanes |= r));
        }
        function Lr(e, t, n, r) {
          return (_r(e, t, n, r), Or(e));
        }
        function Ar(e, t) {
          return (_r(e, null, null, t), Or(e));
        }
        function Ir(e, t, n) {
          e.lanes |= n;
          var r = e.alternate;
          null !== r && (r.lanes |= n);
          for (var a = !1, l = e.return; null !== l; )
            ((l.childLanes |= n),
              null !== (r = l.alternate) && (r.childLanes |= n),
              22 === l.tag &&
                (null === (e = l.stateNode) || 1 & e._visibility || (a = !0)),
              (e = l),
              (l = l.return));
          return 3 === e.tag
            ? ((l = e.stateNode),
              a &&
                null !== t &&
                ((a = 31 - xe(n)),
                null === (r = (e = l.hiddenUpdates)[a])
                  ? (e[a] = [t])
                  : r.push(t),
                (t.lane = 536870912 | n)),
              l)
            : null;
        }
        function Or(e) {
          if (50 < Wu) throw ((Wu = 0), ($u = null), Error(o(185)));
          for (var t = e.return; null !== t; ) t = (e = t).return;
          return 3 === e.tag ? e.stateNode : null;
        }
        var Rr = {};
        function Dr(e, t, n, r) {
          ((this.tag = e),
            (this.key = n),
            (this.sibling =
              this.child =
              this.return =
              this.stateNode =
              this.type =
              this.elementType =
                null),
            (this.index = 0),
            (this.refCleanup = this.ref = null),
            (this.pendingProps = t),
            (this.dependencies =
              this.memoizedState =
              this.updateQueue =
              this.memoizedProps =
                null),
            (this.mode = r),
            (this.subtreeFlags = this.flags = 0),
            (this.deletions = null),
            (this.childLanes = this.lanes = 0),
            (this.alternate = null));
        }
        function Mr(e, t, n, r) {
          return new Dr(e, t, n, r);
        }
        function Fr(e) {
          return !(!(e = e.prototype) || !e.isReactComponent);
        }
        function Ur(e, t) {
          var n = e.alternate;
          return (
            null === n
              ? (((n = Mr(e.tag, t, e.key, e.mode)).elementType =
                  e.elementType),
                (n.type = e.type),
                (n.stateNode = e.stateNode),
                (n.alternate = e),
                (e.alternate = n))
              : ((n.pendingProps = t),
                (n.type = e.type),
                (n.flags = 0),
                (n.subtreeFlags = 0),
                (n.deletions = null)),
            (n.flags = 65011712 & e.flags),
            (n.childLanes = e.childLanes),
            (n.lanes = e.lanes),
            (n.child = e.child),
            (n.memoizedProps = e.memoizedProps),
            (n.memoizedState = e.memoizedState),
            (n.updateQueue = e.updateQueue),
            (t = e.dependencies),
            (n.dependencies =
              null === t
                ? null
                : { lanes: t.lanes, firstContext: t.firstContext }),
            (n.sibling = e.sibling),
            (n.index = e.index),
            (n.ref = e.ref),
            (n.refCleanup = e.refCleanup),
            n
          );
        }
        function Hr(e, t) {
          e.flags &= 65011714;
          var n = e.alternate;
          return (
            null === n
              ? ((e.childLanes = 0),
                (e.lanes = t),
                (e.child = null),
                (e.subtreeFlags = 0),
                (e.memoizedProps = null),
                (e.memoizedState = null),
                (e.updateQueue = null),
                (e.dependencies = null),
                (e.stateNode = null))
              : ((e.childLanes = n.childLanes),
                (e.lanes = n.lanes),
                (e.child = n.child),
                (e.subtreeFlags = 0),
                (e.deletions = null),
                (e.memoizedProps = n.memoizedProps),
                (e.memoizedState = n.memoizedState),
                (e.updateQueue = n.updateQueue),
                (e.type = n.type),
                (t = n.dependencies),
                (e.dependencies =
                  null === t
                    ? null
                    : { lanes: t.lanes, firstContext: t.firstContext })),
            e
          );
        }
        function Br(e, t, n, r, a, l) {
          var i = 0;
          if (((r = e), "function" === typeof e)) Fr(e) && (i = 1);
          else if ("string" === typeof e)
            i = (function (e, t, n) {
              if (1 === n || null != t.itemProp) return !1;
              switch (e) {
                case "meta":
                case "title":
                  return !0;
                case "style":
                  if (
                    "string" !== typeof t.precedence ||
                    "string" !== typeof t.href ||
                    "" === t.href
                  )
                    break;
                  return !0;
                case "link":
                  if (
                    "string" !== typeof t.rel ||
                    "string" !== typeof t.href ||
                    "" === t.href ||
                    t.onLoad ||
                    t.onError
                  )
                    break;
                  return (
                    "stylesheet" !== t.rel ||
                    ((e = t.disabled),
                    "string" === typeof t.precedence && null == e)
                  );
                case "script":
                  if (
                    t.async &&
                    "function" !== typeof t.async &&
                    "symbol" !== typeof t.async &&
                    !t.onLoad &&
                    !t.onError &&
                    t.src &&
                    "string" === typeof t.src
                  )
                    return !0;
              }
              return !1;
            })(e, n, W.current)
              ? 26
              : "html" === e || "head" === e || "body" === e
                ? 27
                : 5;
          else
            e: switch (e) {
              case j:
                return (
                  ((e = Mr(31, n, t, a)).elementType = j),
                  (e.lanes = l),
                  e
                );
              case y:
                return Vr(n.children, a, l, t);
              case b:
                ((i = 8), (a |= 24));
                break;
              case v:
                return (
                  ((e = Mr(12, n, t, 2 | a)).elementType = v),
                  (e.lanes = l),
                  e
                );
              case S:
                return (
                  ((e = Mr(13, n, t, a)).elementType = S),
                  (e.lanes = l),
                  e
                );
              case N:
                return (
                  ((e = Mr(19, n, t, a)).elementType = N),
                  (e.lanes = l),
                  e
                );
              default:
                if ("object" === typeof e && null !== e)
                  switch (e.$$typeof) {
                    case k:
                      i = 10;
                      break e;
                    case x:
                      i = 9;
                      break e;
                    case w:
                      i = 11;
                      break e;
                    case E:
                      i = 14;
                      break e;
                    case C:
                      ((i = 16), (r = null));
                      break e;
                  }
                ((i = 29),
                  (n = Error(o(130, null === e ? "null" : typeof e, ""))),
                  (r = null));
            }
          return (
            ((t = Mr(i, n, t, a)).elementType = e),
            (t.type = r),
            (t.lanes = l),
            t
          );
        }
        function Vr(e, t, n, r) {
          return (((e = Mr(7, e, r, t)).lanes = n), e);
        }
        function Wr(e, t, n) {
          return (((e = Mr(6, e, null, t)).lanes = n), e);
        }
        function $r(e) {
          var t = Mr(18, null, null, 0);
          return ((t.stateNode = e), t);
        }
        function qr(e, t, n) {
          return (
            ((t = Mr(
              4,
              null !== e.children ? e.children : [],
              e.key,
              t,
            )).lanes = n),
            (t.stateNode = {
              containerInfo: e.containerInfo,
              pendingChildren: null,
              implementation: e.implementation,
            }),
            t
          );
        }
        var Qr = new WeakMap();
        function Kr(e, t) {
          if ("object" === typeof e && null !== e) {
            var n = Qr.get(e);
            return void 0 !== n
              ? n
              : ((t = { value: e, source: t, stack: ne(t) }), Qr.set(e, t), t);
          }
          return { value: e, source: t, stack: ne(t) };
        }
        var Yr = [],
          Gr = 0,
          Xr = null,
          Zr = 0,
          Jr = [],
          ea = 0,
          ta = null,
          na = 1,
          ra = "";
        function aa(e, t) {
          ((Yr[Gr++] = Zr), (Yr[Gr++] = Xr), (Xr = e), (Zr = t));
        }
        function la(e, t, n) {
          ((Jr[ea++] = na), (Jr[ea++] = ra), (Jr[ea++] = ta), (ta = e));
          var r = na;
          e = ra;
          var a = 32 - xe(r) - 1;
          ((r &= ~(1 << a)), (n += 1));
          var l = 32 - xe(t) + a;
          if (30 < l) {
            var o = a - (a % 5);
            ((l = (r & ((1 << o) - 1)).toString(32)),
              (r >>= o),
              (a -= o),
              (na = (1 << (32 - xe(t) + a)) | (n << a) | r),
              (ra = l + e));
          } else ((na = (1 << l) | (n << a) | r), (ra = e));
        }
        function oa(e) {
          null !== e.return && (aa(e, 1), la(e, 1, 0));
        }
        function ia(e) {
          for (; e === Xr; )
            ((Xr = Yr[--Gr]),
              (Yr[Gr] = null),
              (Zr = Yr[--Gr]),
              (Yr[Gr] = null));
          for (; e === ta; )
            ((ta = Jr[--ea]),
              (Jr[ea] = null),
              (ra = Jr[--ea]),
              (Jr[ea] = null),
              (na = Jr[--ea]),
              (Jr[ea] = null));
        }
        function sa(e, t) {
          ((Jr[ea++] = na),
            (Jr[ea++] = ra),
            (Jr[ea++] = ta),
            (na = t.id),
            (ra = t.overflow),
            (ta = e));
        }
        var ua = null,
          ca = null,
          da = !1,
          fa = null,
          pa = !1,
          ha = Error(o(519));
        function ma(e) {
          throw (
            ka(
              Kr(
                Error(
                  o(
                    418,
                    1 < arguments.length &&
                      void 0 !== arguments[1] &&
                      arguments[1]
                      ? "text"
                      : "HTML",
                    "",
                  ),
                ),
                e,
              ),
            ),
            ha
          );
        }
        function ga(e) {
          var t = e.stateNode,
            n = e.type,
            r = e.memoizedProps;
          switch (((t[He] = e), (t[Be] = r), n)) {
            case "dialog":
              (Gc("cancel", t), Gc("close", t));
              break;
            case "iframe":
            case "object":
            case "embed":
              Gc("load", t);
              break;
            case "video":
            case "audio":
              for (n = 0; n < Qc.length; n++) Gc(Qc[n], t);
              break;
            case "source":
              Gc("error", t);
              break;
            case "img":
            case "image":
            case "link":
              (Gc("error", t), Gc("load", t));
              break;
            case "details":
              Gc("toggle", t);
              break;
            case "input":
              (Gc("invalid", t),
                vt(
                  t,
                  r.value,
                  r.defaultValue,
                  r.checked,
                  r.defaultChecked,
                  r.type,
                  r.name,
                  !0,
                ));
              break;
            case "select":
              Gc("invalid", t);
              break;
            case "textarea":
              (Gc("invalid", t), St(t, r.value, r.defaultValue, r.children));
          }
          (("string" !== typeof (n = r.children) &&
            "number" !== typeof n &&
            "bigint" !== typeof n) ||
          t.textContent === "" + n ||
          !0 === r.suppressHydrationWarning ||
          ud(t.textContent, n)
            ? (null != r.popover && (Gc("beforetoggle", t), Gc("toggle", t)),
              null != r.onScroll && Gc("scroll", t),
              null != r.onScrollEnd && Gc("scrollend", t),
              null != r.onClick && (t.onclick = Lt),
              (t = !0))
            : (t = !1),
            t || ma(e, !0));
        }
        function ya(e) {
          for (ua = e.return; ua; )
            switch (ua.tag) {
              case 5:
              case 31:
              case 13:
                return void (pa = !1);
              case 27:
              case 3:
                return void (pa = !0);
              default:
                ua = ua.return;
            }
        }
        function ba(e) {
          if (e !== ua) return !1;
          if (!da) return (ya(e), (da = !0), !1);
          var t,
            n = e.tag;
          if (
            ((t = 3 !== n && 27 !== n) &&
              ((t = 5 === n) &&
                (t =
                  !("form" !== (t = e.type) && "button" !== t) ||
                  vd(e.type, e.memoizedProps)),
              (t = !t)),
            t && ca && ma(e),
            ya(e),
            13 === n)
          ) {
            if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
              throw Error(o(317));
            ca = Od(e);
          } else if (31 === n) {
            if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
              throw Error(o(317));
            ca = Od(e);
          } else
            27 === n
              ? ((n = ca),
                Cd(e.type) ? ((e = Id), (Id = null), (ca = e)) : (ca = n))
              : (ca = ua ? Ad(e.stateNode.nextSibling) : null);
          return !0;
        }
        function va() {
          ((ca = ua = null), (da = !1));
        }
        function xa() {
          var e = fa;
          return (
            null !== e &&
              (null === Tu ? (Tu = e) : Tu.push.apply(Tu, e), (fa = null)),
            e
          );
        }
        function ka(e) {
          null === fa ? (fa = [e]) : fa.push(e);
        }
        var wa = F(null),
          Sa = null,
          Na = null;
        function Ea(e, t, n) {
          (H(wa, t._currentValue), (t._currentValue = n));
        }
        function Ca(e) {
          ((e._currentValue = wa.current), U(wa));
        }
        function ja(e, t, n) {
          for (; null !== e; ) {
            var r = e.alternate;
            if (
              ((e.childLanes & t) !== t
                ? ((e.childLanes |= t), null !== r && (r.childLanes |= t))
                : null !== r && (r.childLanes & t) !== t && (r.childLanes |= t),
              e === n)
            )
              break;
            e = e.return;
          }
        }
        function za(e, t, n, r) {
          var a = e.child;
          for (null !== a && (a.return = e); null !== a; ) {
            var l = a.dependencies;
            if (null !== l) {
              var i = a.child;
              l = l.firstContext;
              e: for (; null !== l; ) {
                var s = l;
                l = a;
                for (var u = 0; u < t.length; u++)
                  if (s.context === t[u]) {
                    ((l.lanes |= n),
                      null !== (s = l.alternate) && (s.lanes |= n),
                      ja(l.return, n, e),
                      r || (i = null));
                    break e;
                  }
                l = s.next;
              }
            } else if (18 === a.tag) {
              if (null === (i = a.return)) throw Error(o(341));
              ((i.lanes |= n),
                null !== (l = i.alternate) && (l.lanes |= n),
                ja(i, n, e),
                (i = null));
            } else i = a.child;
            if (null !== i) i.return = a;
            else
              for (i = a; null !== i; ) {
                if (i === e) {
                  i = null;
                  break;
                }
                if (null !== (a = i.sibling)) {
                  ((a.return = i.return), (i = a));
                  break;
                }
                i = i.return;
              }
            a = i;
          }
        }
        function Pa(e, t, n, r) {
          e = null;
          for (var a = t, l = !1; null !== a; ) {
            if (!l)
              if (0 !== (524288 & a.flags)) l = !0;
              else if (0 !== (262144 & a.flags)) break;
            if (10 === a.tag) {
              var i = a.alternate;
              if (null === i) throw Error(o(387));
              if (null !== (i = i.memoizedProps)) {
                var s = a.type;
                Zn(a.pendingProps.value, i.value) ||
                  (null !== e ? e.push(s) : (e = [s]));
              }
            } else if (a === Q.current) {
              if (null === (i = a.alternate)) throw Error(o(387));
              i.memoizedState.memoizedState !== a.memoizedState.memoizedState &&
                (null !== e ? e.push(df) : (e = [df]));
            }
            a = a.return;
          }
          (null !== e && za(t, e, n, r), (t.flags |= 262144));
        }
        function Ta(e) {
          for (e = e.firstContext; null !== e; ) {
            if (!Zn(e.context._currentValue, e.memoizedValue)) return !0;
            e = e.next;
          }
          return !1;
        }
        function _a(e) {
          ((Sa = e),
            (Na = null),
            null !== (e = e.dependencies) && (e.firstContext = null));
        }
        function La(e) {
          return Ia(Sa, e);
        }
        function Aa(e, t) {
          return (null === Sa && _a(e), Ia(e, t));
        }
        function Ia(e, t) {
          var n = t._currentValue;
          if (
            ((t = { context: t, memoizedValue: n, next: null }), null === Na)
          ) {
            if (null === e) throw Error(o(308));
            ((Na = t),
              (e.dependencies = { lanes: 0, firstContext: t }),
              (e.flags |= 524288));
          } else Na = Na.next = t;
          return n;
        }
        var Oa =
            "undefined" !== typeof AbortController
              ? AbortController
              : function () {
                  var e = [],
                    t = (this.signal = {
                      aborted: !1,
                      addEventListener: function (t, n) {
                        e.push(n);
                      },
                    });
                  this.abort = function () {
                    ((t.aborted = !0),
                      e.forEach(function (e) {
                        return e();
                      }));
                  };
                },
          Ra = r.unstable_scheduleCallback,
          Da = r.unstable_NormalPriority,
          Ma = {
            $$typeof: k,
            Consumer: null,
            Provider: null,
            _currentValue: null,
            _currentValue2: null,
            _threadCount: 0,
          };
        function Fa() {
          return { controller: new Oa(), data: new Map(), refCount: 0 };
        }
        function Ua(e) {
          (e.refCount--,
            0 === e.refCount &&
              Ra(Da, function () {
                e.controller.abort();
              }));
        }
        var Ha = null,
          Ba = 0,
          Va = 0,
          Wa = null;
        function $a() {
          if (0 === --Ba && null !== Ha) {
            null !== Wa && (Wa.status = "fulfilled");
            var e = Ha;
            ((Ha = null), (Va = 0), (Wa = null));
            for (var t = 0; t < e.length; t++) (0, e[t])();
          }
        }
        var qa = I.S;
        I.S = function (e, t) {
          ((Au = se()),
            "object" === typeof t &&
              null !== t &&
              "function" === typeof t.then &&
              (function (e, t) {
                if (null === Ha) {
                  var n = (Ha = []);
                  ((Ba = 0),
                    (Va = Bc()),
                    (Wa = {
                      status: "pending",
                      value: void 0,
                      then: function (e) {
                        n.push(e);
                      },
                    }));
                }
                (Ba++, t.then($a, $a));
              })(0, t),
            null !== qa && qa(e, t));
        };
        var Qa = F(null);
        function Ka() {
          var e = Qa.current;
          return null !== e ? e : hu.pooledCache;
        }
        function Ya(e, t) {
          H(Qa, null === t ? Qa.current : t.pool);
        }
        function Ga() {
          var e = Ka();
          return null === e ? null : { parent: Ma._currentValue, pool: e };
        }
        var Xa = Error(o(460)),
          Za = Error(o(474)),
          Ja = Error(o(542)),
          el = { then: function () {} };
        function tl(e) {
          return "fulfilled" === (e = e.status) || "rejected" === e;
        }
        function nl(e, t, n) {
          switch (
            (void 0 === (n = e[n])
              ? e.push(t)
              : n !== t && (t.then(Lt, Lt), (t = n)),
            t.status)
          ) {
            case "fulfilled":
              return t.value;
            case "rejected":
              throw (ol((e = t.reason)), e);
            default:
              if ("string" === typeof t.status) t.then(Lt, Lt);
              else {
                if (null !== (e = hu) && 100 < e.shellSuspendCounter)
                  throw Error(o(482));
                (((e = t).status = "pending"),
                  e.then(
                    function (e) {
                      if ("pending" === t.status) {
                        var n = t;
                        ((n.status = "fulfilled"), (n.value = e));
                      }
                    },
                    function (e) {
                      if ("pending" === t.status) {
                        var n = t;
                        ((n.status = "rejected"), (n.reason = e));
                      }
                    },
                  ));
              }
              switch (t.status) {
                case "fulfilled":
                  return t.value;
                case "rejected":
                  throw (ol((e = t.reason)), e);
              }
              throw ((al = t), Xa);
          }
        }
        function rl(e) {
          try {
            return (0, e._init)(e._payload);
          } catch (t) {
            if (
              null !== t &&
              "object" === typeof t &&
              "function" === typeof t.then
            )
              throw ((al = t), Xa);
            throw t;
          }
        }
        var al = null;
        function ll() {
          if (null === al) throw Error(o(459));
          var e = al;
          return ((al = null), e);
        }
        function ol(e) {
          if (e === Xa || e === Ja) throw Error(o(483));
        }
        var il = null,
          sl = 0;
        function ul(e) {
          var t = sl;
          return ((sl += 1), null === il && (il = []), nl(il, e, t));
        }
        function cl(e, t) {
          ((t = t.props.ref), (e.ref = void 0 !== t ? t : null));
        }
        function dl(e, t) {
          if (t.$$typeof === h) throw Error(o(525));
          throw (
            (e = Object.prototype.toString.call(t)),
            Error(
              o(
                31,
                "[object Object]" === e
                  ? "object with keys {" + Object.keys(t).join(", ") + "}"
                  : e,
              ),
            )
          );
        }
        function fl(e) {
          function t(t, n) {
            if (e) {
              var r = t.deletions;
              null === r ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n);
            }
          }
          function n(n, r) {
            if (!e) return null;
            for (; null !== r; ) (t(n, r), (r = r.sibling));
            return null;
          }
          function r(e) {
            for (var t = new Map(); null !== e; )
              (null !== e.key ? t.set(e.key, e) : t.set(e.index, e),
                (e = e.sibling));
            return t;
          }
          function a(e, t) {
            return (((e = Ur(e, t)).index = 0), (e.sibling = null), e);
          }
          function l(t, n, r) {
            return (
              (t.index = r),
              e
                ? null !== (r = t.alternate)
                  ? (r = r.index) < n
                    ? ((t.flags |= 67108866), n)
                    : r
                  : ((t.flags |= 67108866), n)
                : ((t.flags |= 1048576), n)
            );
          }
          function i(t) {
            return (e && null === t.alternate && (t.flags |= 67108866), t);
          }
          function s(e, t, n, r) {
            return null === t || 6 !== t.tag
              ? (((t = Wr(n, e.mode, r)).return = e), t)
              : (((t = a(t, n)).return = e), t);
          }
          function u(e, t, n, r) {
            var l = n.type;
            return l === y
              ? d(e, t, n.props.children, r, n.key)
              : null !== t &&
                  (t.elementType === l ||
                    ("object" === typeof l &&
                      null !== l &&
                      l.$$typeof === C &&
                      rl(l) === t.type))
                ? (cl((t = a(t, n.props)), n), (t.return = e), t)
                : (cl((t = Br(n.type, n.key, n.props, null, e.mode, r)), n),
                  (t.return = e),
                  t);
          }
          function c(e, t, n, r) {
            return null === t ||
              4 !== t.tag ||
              t.stateNode.containerInfo !== n.containerInfo ||
              t.stateNode.implementation !== n.implementation
              ? (((t = qr(n, e.mode, r)).return = e), t)
              : (((t = a(t, n.children || [])).return = e), t);
          }
          function d(e, t, n, r, l) {
            return null === t || 7 !== t.tag
              ? (((t = Vr(n, e.mode, r, l)).return = e), t)
              : (((t = a(t, n)).return = e), t);
          }
          function f(e, t, n) {
            if (
              ("string" === typeof t && "" !== t) ||
              "number" === typeof t ||
              "bigint" === typeof t
            )
              return (((t = Wr("" + t, e.mode, n)).return = e), t);
            if ("object" === typeof t && null !== t) {
              switch (t.$$typeof) {
                case m:
                  return (
                    cl((n = Br(t.type, t.key, t.props, null, e.mode, n)), t),
                    (n.return = e),
                    n
                  );
                case g:
                  return (((t = qr(t, e.mode, n)).return = e), t);
                case C:
                  return f(e, (t = rl(t)), n);
              }
              if (A(t) || T(t))
                return (((t = Vr(t, e.mode, n, null)).return = e), t);
              if ("function" === typeof t.then) return f(e, ul(t), n);
              if (t.$$typeof === k) return f(e, Aa(e, t), n);
              dl(e, t);
            }
            return null;
          }
          function p(e, t, n, r) {
            var a = null !== t ? t.key : null;
            if (
              ("string" === typeof n && "" !== n) ||
              "number" === typeof n ||
              "bigint" === typeof n
            )
              return null !== a ? null : s(e, t, "" + n, r);
            if ("object" === typeof n && null !== n) {
              switch (n.$$typeof) {
                case m:
                  return n.key === a ? u(e, t, n, r) : null;
                case g:
                  return n.key === a ? c(e, t, n, r) : null;
                case C:
                  return p(e, t, (n = rl(n)), r);
              }
              if (A(n) || T(n)) return null !== a ? null : d(e, t, n, r, null);
              if ("function" === typeof n.then) return p(e, t, ul(n), r);
              if (n.$$typeof === k) return p(e, t, Aa(e, n), r);
              dl(e, n);
            }
            return null;
          }
          function h(e, t, n, r, a) {
            if (
              ("string" === typeof r && "" !== r) ||
              "number" === typeof r ||
              "bigint" === typeof r
            )
              return s(t, (e = e.get(n) || null), "" + r, a);
            if ("object" === typeof r && null !== r) {
              switch (r.$$typeof) {
                case m:
                  return u(
                    t,
                    (e = e.get(null === r.key ? n : r.key) || null),
                    r,
                    a,
                  );
                case g:
                  return c(
                    t,
                    (e = e.get(null === r.key ? n : r.key) || null),
                    r,
                    a,
                  );
                case C:
                  return h(e, t, n, (r = rl(r)), a);
              }
              if (A(r) || T(r)) return d(t, (e = e.get(n) || null), r, a, null);
              if ("function" === typeof r.then) return h(e, t, n, ul(r), a);
              if (r.$$typeof === k) return h(e, t, n, Aa(t, r), a);
              dl(t, r);
            }
            return null;
          }
          function b(s, u, c, d) {
            if (
              ("object" === typeof c &&
                null !== c &&
                c.type === y &&
                null === c.key &&
                (c = c.props.children),
              "object" === typeof c && null !== c)
            ) {
              switch (c.$$typeof) {
                case m:
                  e: {
                    for (var v = c.key; null !== u; ) {
                      if (u.key === v) {
                        if ((v = c.type) === y) {
                          if (7 === u.tag) {
                            (n(s, u.sibling),
                              ((d = a(u, c.props.children)).return = s),
                              (s = d));
                            break e;
                          }
                        } else if (
                          u.elementType === v ||
                          ("object" === typeof v &&
                            null !== v &&
                            v.$$typeof === C &&
                            rl(v) === u.type)
                        ) {
                          (n(s, u.sibling),
                            cl((d = a(u, c.props)), c),
                            (d.return = s),
                            (s = d));
                          break e;
                        }
                        n(s, u);
                        break;
                      }
                      (t(s, u), (u = u.sibling));
                    }
                    c.type === y
                      ? (((d = Vr(c.props.children, s.mode, d, c.key)).return =
                          s),
                        (s = d))
                      : (cl(
                          (d = Br(c.type, c.key, c.props, null, s.mode, d)),
                          c,
                        ),
                        (d.return = s),
                        (s = d));
                  }
                  return i(s);
                case g:
                  e: {
                    for (v = c.key; null !== u; ) {
                      if (u.key === v) {
                        if (
                          4 === u.tag &&
                          u.stateNode.containerInfo === c.containerInfo &&
                          u.stateNode.implementation === c.implementation
                        ) {
                          (n(s, u.sibling),
                            ((d = a(u, c.children || [])).return = s),
                            (s = d));
                          break e;
                        }
                        n(s, u);
                        break;
                      }
                      (t(s, u), (u = u.sibling));
                    }
                    (((d = qr(c, s.mode, d)).return = s), (s = d));
                  }
                  return i(s);
                case C:
                  return b(s, u, (c = rl(c)), d);
              }
              if (A(c))
                return (function (a, o, i, s) {
                  for (
                    var u = null, c = null, d = o, m = (o = 0), g = null;
                    null !== d && m < i.length;
                    m++
                  ) {
                    d.index > m ? ((g = d), (d = null)) : (g = d.sibling);
                    var y = p(a, d, i[m], s);
                    if (null === y) {
                      null === d && (d = g);
                      break;
                    }
                    (e && d && null === y.alternate && t(a, d),
                      (o = l(y, o, m)),
                      null === c ? (u = y) : (c.sibling = y),
                      (c = y),
                      (d = g));
                  }
                  if (m === i.length) return (n(a, d), da && aa(a, m), u);
                  if (null === d) {
                    for (; m < i.length; m++)
                      null !== (d = f(a, i[m], s)) &&
                        ((o = l(d, o, m)),
                        null === c ? (u = d) : (c.sibling = d),
                        (c = d));
                    return (da && aa(a, m), u);
                  }
                  for (d = r(d); m < i.length; m++)
                    null !== (g = h(d, a, m, i[m], s)) &&
                      (e &&
                        null !== g.alternate &&
                        d.delete(null === g.key ? m : g.key),
                      (o = l(g, o, m)),
                      null === c ? (u = g) : (c.sibling = g),
                      (c = g));
                  return (
                    e &&
                      d.forEach(function (e) {
                        return t(a, e);
                      }),
                    da && aa(a, m),
                    u
                  );
                })(s, u, c, d);
              if (T(c)) {
                if ("function" !== typeof (v = T(c))) throw Error(o(150));
                return (function (a, i, s, u) {
                  if (null == s) throw Error(o(151));
                  for (
                    var c = null,
                      d = null,
                      m = i,
                      g = (i = 0),
                      y = null,
                      b = s.next();
                    null !== m && !b.done;
                    g++, b = s.next()
                  ) {
                    m.index > g ? ((y = m), (m = null)) : (y = m.sibling);
                    var v = p(a, m, b.value, u);
                    if (null === v) {
                      null === m && (m = y);
                      break;
                    }
                    (e && m && null === v.alternate && t(a, m),
                      (i = l(v, i, g)),
                      null === d ? (c = v) : (d.sibling = v),
                      (d = v),
                      (m = y));
                  }
                  if (b.done) return (n(a, m), da && aa(a, g), c);
                  if (null === m) {
                    for (; !b.done; g++, b = s.next())
                      null !== (b = f(a, b.value, u)) &&
                        ((i = l(b, i, g)),
                        null === d ? (c = b) : (d.sibling = b),
                        (d = b));
                    return (da && aa(a, g), c);
                  }
                  for (m = r(m); !b.done; g++, b = s.next())
                    null !== (b = h(m, a, g, b.value, u)) &&
                      (e &&
                        null !== b.alternate &&
                        m.delete(null === b.key ? g : b.key),
                      (i = l(b, i, g)),
                      null === d ? (c = b) : (d.sibling = b),
                      (d = b));
                  return (
                    e &&
                      m.forEach(function (e) {
                        return t(a, e);
                      }),
                    da && aa(a, g),
                    c
                  );
                })(s, u, (c = v.call(c)), d);
              }
              if ("function" === typeof c.then) return b(s, u, ul(c), d);
              if (c.$$typeof === k) return b(s, u, Aa(s, c), d);
              dl(s, c);
            }
            return ("string" === typeof c && "" !== c) ||
              "number" === typeof c ||
              "bigint" === typeof c
              ? ((c = "" + c),
                null !== u && 6 === u.tag
                  ? (n(s, u.sibling), ((d = a(u, c)).return = s), (s = d))
                  : (n(s, u), ((d = Wr(c, s.mode, d)).return = s), (s = d)),
                i(s))
              : n(s, u);
          }
          return function (e, t, n, r) {
            try {
              sl = 0;
              var a = b(e, t, n, r);
              return ((il = null), a);
            } catch (o) {
              if (o === Xa || o === Ja) throw o;
              var l = Mr(29, o, null, e.mode);
              return ((l.lanes = r), (l.return = e), l);
            }
          };
        }
        var pl = fl(!0),
          hl = fl(!1),
          ml = !1;
        function gl(e) {
          e.updateQueue = {
            baseState: e.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: { pending: null, lanes: 0, hiddenCallbacks: null },
            callbacks: null,
          };
        }
        function yl(e, t) {
          ((e = e.updateQueue),
            t.updateQueue === e &&
              (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                callbacks: null,
              }));
        }
        function bl(e) {
          return { lane: e, tag: 0, payload: null, callback: null, next: null };
        }
        function vl(e, t, n) {
          var r = e.updateQueue;
          if (null === r) return null;
          if (((r = r.shared), 0 !== (2 & pu))) {
            var a = r.pending;
            return (
              null === a ? (t.next = t) : ((t.next = a.next), (a.next = t)),
              (r.pending = t),
              (t = Or(e)),
              Ir(e, null, n),
              t
            );
          }
          return (_r(e, r, t, n), Or(e));
        }
        function xl(e, t, n) {
          if (
            null !== (t = t.updateQueue) &&
            ((t = t.shared), 0 !== (4194048 & n))
          ) {
            var r = t.lanes;
            ((n |= r &= e.pendingLanes), (t.lanes = n), Ie(e, n));
          }
        }
        function kl(e, t) {
          var n = e.updateQueue,
            r = e.alternate;
          if (null !== r && n === (r = r.updateQueue)) {
            var a = null,
              l = null;
            if (null !== (n = n.firstBaseUpdate)) {
              do {
                var o = {
                  lane: n.lane,
                  tag: n.tag,
                  payload: n.payload,
                  callback: null,
                  next: null,
                };
                (null === l ? (a = l = o) : (l = l.next = o), (n = n.next));
              } while (null !== n);
              null === l ? (a = l = t) : (l = l.next = t);
            } else a = l = t;
            return (
              (n = {
                baseState: r.baseState,
                firstBaseUpdate: a,
                lastBaseUpdate: l,
                shared: r.shared,
                callbacks: r.callbacks,
              }),
              void (e.updateQueue = n)
            );
          }
          (null === (e = n.lastBaseUpdate)
            ? (n.firstBaseUpdate = t)
            : (e.next = t),
            (n.lastBaseUpdate = t));
        }
        var wl = !1;
        function Sl() {
          if (wl) {
            if (null !== Wa) throw Wa;
          }
        }
        function Nl(e, t, n, r) {
          wl = !1;
          var a = e.updateQueue;
          ml = !1;
          var l = a.firstBaseUpdate,
            o = a.lastBaseUpdate,
            i = a.shared.pending;
          if (null !== i) {
            a.shared.pending = null;
            var s = i,
              u = s.next;
            ((s.next = null), null === o ? (l = u) : (o.next = u), (o = s));
            var c = e.alternate;
            null !== c &&
              (i = (c = c.updateQueue).lastBaseUpdate) !== o &&
              (null === i ? (c.firstBaseUpdate = u) : (i.next = u),
              (c.lastBaseUpdate = s));
          }
          if (null !== l) {
            var d = a.baseState;
            for (o = 0, c = u = s = null, i = l; ; ) {
              var f = -536870913 & i.lane,
                h = f !== i.lane;
              if (h ? (gu & f) === f : (r & f) === f) {
                (0 !== f && f === Va && (wl = !0),
                  null !== c &&
                    (c = c.next =
                      {
                        lane: 0,
                        tag: i.tag,
                        payload: i.payload,
                        callback: null,
                        next: null,
                      }));
                e: {
                  var m = e,
                    g = i;
                  f = t;
                  var y = n;
                  switch (g.tag) {
                    case 1:
                      if ("function" === typeof (m = g.payload)) {
                        d = m.call(y, d, f);
                        break e;
                      }
                      d = m;
                      break e;
                    case 3:
                      m.flags = (-65537 & m.flags) | 128;
                    case 0:
                      if (
                        null ===
                          (f =
                            "function" === typeof (m = g.payload)
                              ? m.call(y, d, f)
                              : m) ||
                        void 0 === f
                      )
                        break e;
                      d = p({}, d, f);
                      break e;
                    case 2:
                      ml = !0;
                  }
                }
                null !== (f = i.callback) &&
                  ((e.flags |= 64),
                  h && (e.flags |= 8192),
                  null === (h = a.callbacks) ? (a.callbacks = [f]) : h.push(f));
              } else
                ((h = {
                  lane: f,
                  tag: i.tag,
                  payload: i.payload,
                  callback: i.callback,
                  next: null,
                }),
                  null === c ? ((u = c = h), (s = d)) : (c = c.next = h),
                  (o |= f));
              if (null === (i = i.next)) {
                if (null === (i = a.shared.pending)) break;
                ((i = (h = i).next),
                  (h.next = null),
                  (a.lastBaseUpdate = h),
                  (a.shared.pending = null));
              }
            }
            (null === c && (s = d),
              (a.baseState = s),
              (a.firstBaseUpdate = u),
              (a.lastBaseUpdate = c),
              null === l && (a.shared.lanes = 0),
              (Nu |= o),
              (e.lanes = o),
              (e.memoizedState = d));
          }
        }
        function El(e, t) {
          if ("function" !== typeof e) throw Error(o(191, e));
          e.call(t);
        }
        function Cl(e, t) {
          var n = e.callbacks;
          if (null !== n)
            for (e.callbacks = null, e = 0; e < n.length; e++) El(n[e], t);
        }
        var jl = F(null),
          zl = F(0);
        function Pl(e, t) {
          (H(zl, (e = wu)), H(jl, t), (wu = e | t.baseLanes));
        }
        function Tl() {
          (H(zl, wu), H(jl, jl.current));
        }
        function _l() {
          ((wu = zl.current), U(jl), U(zl));
        }
        var Ll = F(null),
          Al = null;
        function Il(e) {
          var t = e.alternate;
          (H(Fl, 1 & Fl.current),
            H(Ll, e),
            null === Al &&
              (null === t || null !== jl.current || null !== t.memoizedState) &&
              (Al = e));
        }
        function Ol(e) {
          (H(Fl, Fl.current), H(Ll, e), null === Al && (Al = e));
        }
        function Rl(e) {
          22 === e.tag
            ? (H(Fl, Fl.current), H(Ll, e), null === Al && (Al = e))
            : Dl();
        }
        function Dl() {
          (H(Fl, Fl.current), H(Ll, Ll.current));
        }
        function Ml(e) {
          (U(Ll), Al === e && (Al = null), U(Fl));
        }
        var Fl = F(0);
        function Ul(e) {
          for (var t = e; null !== t; ) {
            if (13 === t.tag) {
              var n = t.memoizedState;
              if (null !== n && (null === (n = n.dehydrated) || _d(n) || Ld(n)))
                return t;
            } else if (
              19 !== t.tag ||
              ("forwards" !== t.memoizedProps.revealOrder &&
                "backwards" !== t.memoizedProps.revealOrder &&
                "unstable_legacy-backwards" !== t.memoizedProps.revealOrder &&
                "together" !== t.memoizedProps.revealOrder)
            ) {
              if (null !== t.child) {
                ((t.child.return = t), (t = t.child));
                continue;
              }
            } else if (0 !== (128 & t.flags)) return t;
            if (t === e) break;
            for (; null === t.sibling; ) {
              if (null === t.return || t.return === e) return null;
              t = t.return;
            }
            ((t.sibling.return = t.return), (t = t.sibling));
          }
          return null;
        }
        var Hl = 0,
          Bl = null,
          Vl = null,
          Wl = null,
          $l = !1,
          ql = !1,
          Ql = !1,
          Kl = 0,
          Yl = 0,
          Gl = null,
          Xl = 0;
        function Zl() {
          throw Error(o(321));
        }
        function Jl(e, t) {
          if (null === t) return !1;
          for (var n = 0; n < t.length && n < e.length; n++)
            if (!Zn(e[n], t[n])) return !1;
          return !0;
        }
        function eo(e, t, n, r, a, l) {
          return (
            (Hl = l),
            (Bl = t),
            (t.memoizedState = null),
            (t.updateQueue = null),
            (t.lanes = 0),
            (I.H = null === e || null === e.memoizedState ? gi : yi),
            (Ql = !1),
            (l = n(r, a)),
            (Ql = !1),
            ql && (l = no(t, n, r, a)),
            to(e),
            l
          );
        }
        function to(e) {
          I.H = mi;
          var t = null !== Vl && null !== Vl.next;
          if (
            ((Hl = 0),
            (Wl = Vl = Bl = null),
            ($l = !1),
            (Yl = 0),
            (Gl = null),
            t)
          )
            throw Error(o(300));
          null === e ||
            Ai ||
            (null !== (e = e.dependencies) && Ta(e) && (Ai = !0));
        }
        function no(e, t, n, r) {
          Bl = e;
          var a = 0;
          do {
            if ((ql && (Gl = null), (Yl = 0), (ql = !1), 25 <= a))
              throw Error(o(301));
            if (((a += 1), (Wl = Vl = null), null != e.updateQueue)) {
              var l = e.updateQueue;
              ((l.lastEffect = null),
                (l.events = null),
                (l.stores = null),
                null != l.memoCache && (l.memoCache.index = 0));
            }
            ((I.H = bi), (l = t(n, r)));
          } while (ql);
          return l;
        }
        function ro() {
          var e = I.H,
            t = e.useState()[0];
          return (
            (t = "function" === typeof t.then ? uo(t) : t),
            (e = e.useState()[0]),
            (null !== Vl ? Vl.memoizedState : null) !== e && (Bl.flags |= 1024),
            t
          );
        }
        function ao() {
          var e = 0 !== Kl;
          return ((Kl = 0), e);
        }
        function lo(e, t, n) {
          ((t.updateQueue = e.updateQueue),
            (t.flags &= -2053),
            (e.lanes &= ~n));
        }
        function oo(e) {
          if ($l) {
            for (e = e.memoizedState; null !== e; ) {
              var t = e.queue;
              (null !== t && (t.pending = null), (e = e.next));
            }
            $l = !1;
          }
          ((Hl = 0),
            (Wl = Vl = Bl = null),
            (ql = !1),
            (Yl = Kl = 0),
            (Gl = null));
        }
        function io() {
          var e = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null,
          };
          return (
            null === Wl ? (Bl.memoizedState = Wl = e) : (Wl = Wl.next = e),
            Wl
          );
        }
        function so() {
          if (null === Vl) {
            var e = Bl.alternate;
            e = null !== e ? e.memoizedState : null;
          } else e = Vl.next;
          var t = null === Wl ? Bl.memoizedState : Wl.next;
          if (null !== t) ((Wl = t), (Vl = e));
          else {
            if (null === e) {
              if (null === Bl.alternate) throw Error(o(467));
              throw Error(o(310));
            }
            ((e = {
              memoizedState: (Vl = e).memoizedState,
              baseState: Vl.baseState,
              baseQueue: Vl.baseQueue,
              queue: Vl.queue,
              next: null,
            }),
              null === Wl ? (Bl.memoizedState = Wl = e) : (Wl = Wl.next = e));
          }
          return Wl;
        }
        function uo(e) {
          var t = Yl;
          return (
            (Yl += 1),
            null === Gl && (Gl = []),
            (e = nl(Gl, e, t)),
            (t = Bl),
            null === (null === Wl ? t.memoizedState : Wl.next) &&
              ((t = t.alternate),
              (I.H = null === t || null === t.memoizedState ? gi : yi)),
            e
          );
        }
        function co(e) {
          if (null !== e && "object" === typeof e) {
            if ("function" === typeof e.then) return uo(e);
            if (e.$$typeof === k) return La(e);
          }
          throw Error(o(438, String(e)));
        }
        function fo(e) {
          var t = null,
            n = Bl.updateQueue;
          if ((null !== n && (t = n.memoCache), null == t)) {
            var r = Bl.alternate;
            null !== r &&
              null !== (r = r.updateQueue) &&
              null != (r = r.memoCache) &&
              (t = {
                data: r.data.map(function (e) {
                  return e.slice();
                }),
                index: 0,
              });
          }
          if (
            (null == t && (t = { data: [], index: 0 }),
            null === n &&
              ((n = {
                lastEffect: null,
                events: null,
                stores: null,
                memoCache: null,
              }),
              (Bl.updateQueue = n)),
            (n.memoCache = t),
            void 0 === (n = t.data[t.index]))
          )
            for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = z;
          return (t.index++, n);
        }
        function po(e, t) {
          return "function" === typeof t ? t(e) : t;
        }
        function ho(e) {
          return mo(so(), Vl, e);
        }
        function mo(e, t, n) {
          var r = e.queue;
          if (null === r) throw Error(o(311));
          r.lastRenderedReducer = n;
          var a = e.baseQueue,
            l = r.pending;
          if (null !== l) {
            if (null !== a) {
              var i = a.next;
              ((a.next = l.next), (l.next = i));
            }
            ((t.baseQueue = a = l), (r.pending = null));
          }
          if (((l = e.baseState), null === a)) e.memoizedState = l;
          else {
            var s = (i = null),
              u = null,
              c = (t = a.next),
              d = !1;
            do {
              var f = -536870913 & c.lane;
              if (f !== c.lane ? (gu & f) === f : (Hl & f) === f) {
                var p = c.revertLane;
                if (0 === p)
                  (null !== u &&
                    (u = u.next =
                      {
                        lane: 0,
                        revertLane: 0,
                        gesture: null,
                        action: c.action,
                        hasEagerState: c.hasEagerState,
                        eagerState: c.eagerState,
                        next: null,
                      }),
                    f === Va && (d = !0));
                else {
                  if ((Hl & p) === p) {
                    ((c = c.next), p === Va && (d = !0));
                    continue;
                  }
                  ((f = {
                    lane: 0,
                    revertLane: c.revertLane,
                    gesture: null,
                    action: c.action,
                    hasEagerState: c.hasEagerState,
                    eagerState: c.eagerState,
                    next: null,
                  }),
                    null === u ? ((s = u = f), (i = l)) : (u = u.next = f),
                    (Bl.lanes |= p),
                    (Nu |= p));
                }
                ((f = c.action),
                  Ql && n(l, f),
                  (l = c.hasEagerState ? c.eagerState : n(l, f)));
              } else
                ((p = {
                  lane: f,
                  revertLane: c.revertLane,
                  gesture: c.gesture,
                  action: c.action,
                  hasEagerState: c.hasEagerState,
                  eagerState: c.eagerState,
                  next: null,
                }),
                  null === u ? ((s = u = p), (i = l)) : (u = u.next = p),
                  (Bl.lanes |= f),
                  (Nu |= f));
              c = c.next;
            } while (null !== c && c !== t);
            if (
              (null === u ? (i = l) : (u.next = s),
              !Zn(l, e.memoizedState) && ((Ai = !0), d && null !== (n = Wa)))
            )
              throw n;
            ((e.memoizedState = l),
              (e.baseState = i),
              (e.baseQueue = u),
              (r.lastRenderedState = l));
          }
          return (null === a && (r.lanes = 0), [e.memoizedState, r.dispatch]);
        }
        function go(e) {
          var t = so(),
            n = t.queue;
          if (null === n) throw Error(o(311));
          n.lastRenderedReducer = e;
          var r = n.dispatch,
            a = n.pending,
            l = t.memoizedState;
          if (null !== a) {
            n.pending = null;
            var i = (a = a.next);
            do {
              ((l = e(l, i.action)), (i = i.next));
            } while (i !== a);
            (Zn(l, t.memoizedState) || (Ai = !0),
              (t.memoizedState = l),
              null === t.baseQueue && (t.baseState = l),
              (n.lastRenderedState = l));
          }
          return [l, r];
        }
        function yo(e, t, n) {
          var r = Bl,
            a = so(),
            l = da;
          if (l) {
            if (void 0 === n) throw Error(o(407));
            n = n();
          } else n = t();
          var i = !Zn((Vl || a).memoizedState, n);
          if (
            (i && ((a.memoizedState = n), (Ai = !0)),
            (a = a.queue),
            Bo(xo.bind(null, r, a, e), [e]),
            a.getSnapshot !== t ||
              i ||
              (null !== Wl && 1 & Wl.memoizedState.tag))
          ) {
            if (
              ((r.flags |= 2048),
              Do(9, { destroy: void 0 }, vo.bind(null, r, a, n, t), null),
              null === hu)
            )
              throw Error(o(349));
            l || 0 !== (127 & Hl) || bo(r, t, n);
          }
          return n;
        }
        function bo(e, t, n) {
          ((e.flags |= 16384),
            (e = { getSnapshot: t, value: n }),
            null === (t = Bl.updateQueue)
              ? ((t = {
                  lastEffect: null,
                  events: null,
                  stores: null,
                  memoCache: null,
                }),
                (Bl.updateQueue = t),
                (t.stores = [e]))
              : null === (n = t.stores)
                ? (t.stores = [e])
                : n.push(e));
        }
        function vo(e, t, n, r) {
          ((t.value = n), (t.getSnapshot = r), ko(t) && wo(e));
        }
        function xo(e, t, n) {
          return n(function () {
            ko(t) && wo(e);
          });
        }
        function ko(e) {
          var t = e.getSnapshot;
          e = e.value;
          try {
            var n = t();
            return !Zn(e, n);
          } catch (r) {
            return !0;
          }
        }
        function wo(e) {
          var t = Ar(e, 2);
          null !== t && Ku(t, e, 2);
        }
        function So(e) {
          var t = io();
          if ("function" === typeof e) {
            var n = e;
            if (((e = n()), Ql)) {
              ve(!0);
              try {
                n();
              } finally {
                ve(!1);
              }
            }
          }
          return (
            (t.memoizedState = t.baseState = e),
            (t.queue = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: po,
              lastRenderedState: e,
            }),
            t
          );
        }
        function No(e, t, n, r) {
          return (
            (e.baseState = n),
            mo(e, Vl, "function" === typeof r ? r : po)
          );
        }
        function Eo(e, t, n, r, a) {
          if (fi(e)) throw Error(o(485));
          if (null !== (e = t.action)) {
            var l = {
              payload: a,
              action: e,
              next: null,
              isTransition: !0,
              status: "pending",
              value: null,
              reason: null,
              listeners: [],
              then: function (e) {
                l.listeners.push(e);
              },
            };
            (null !== I.T ? n(!0) : (l.isTransition = !1),
              r(l),
              null === (n = t.pending)
                ? ((l.next = t.pending = l), Co(t, l))
                : ((l.next = n.next), (t.pending = n.next = l)));
          }
        }
        function Co(e, t) {
          var n = t.action,
            r = t.payload,
            a = e.state;
          if (t.isTransition) {
            var l = I.T,
              o = {};
            I.T = o;
            try {
              var i = n(a, r),
                s = I.S;
              (null !== s && s(o, i), jo(e, t, i));
            } catch (u) {
              Po(e, t, u);
            } finally {
              (null !== l && null !== o.types && (l.types = o.types),
                (I.T = l));
            }
          } else
            try {
              jo(e, t, (l = n(a, r)));
            } catch (c) {
              Po(e, t, c);
            }
        }
        function jo(e, t, n) {
          null !== n && "object" === typeof n && "function" === typeof n.then
            ? n.then(
                function (n) {
                  zo(e, t, n);
                },
                function (n) {
                  return Po(e, t, n);
                },
              )
            : zo(e, t, n);
        }
        function zo(e, t, n) {
          ((t.status = "fulfilled"),
            (t.value = n),
            To(t),
            (e.state = n),
            null !== (t = e.pending) &&
              ((n = t.next) === t
                ? (e.pending = null)
                : ((n = n.next), (t.next = n), Co(e, n))));
        }
        function Po(e, t, n) {
          var r = e.pending;
          if (((e.pending = null), null !== r)) {
            r = r.next;
            do {
              ((t.status = "rejected"), (t.reason = n), To(t), (t = t.next));
            } while (t !== r);
          }
          e.action = null;
        }
        function To(e) {
          e = e.listeners;
          for (var t = 0; t < e.length; t++) (0, e[t])();
        }
        function _o(e, t) {
          return t;
        }
        function Lo(e, t) {
          if (da) {
            var n = hu.formState;
            if (null !== n) {
              e: {
                var r = Bl;
                if (da) {
                  if (ca) {
                    t: {
                      for (var a = ca, l = pa; 8 !== a.nodeType; ) {
                        if (!l) {
                          a = null;
                          break t;
                        }
                        if (null === (a = Ad(a.nextSibling))) {
                          a = null;
                          break t;
                        }
                      }
                      a = "F!" === (l = a.data) || "F" === l ? a : null;
                    }
                    if (a) {
                      ((ca = Ad(a.nextSibling)), (r = "F!" === a.data));
                      break e;
                    }
                  }
                  ma(r);
                }
                r = !1;
              }
              r && (t = n[0]);
            }
          }
          return (
            ((n = io()).memoizedState = n.baseState = t),
            (r = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: _o,
              lastRenderedState: t,
            }),
            (n.queue = r),
            (n = ui.bind(null, Bl, r)),
            (r.dispatch = n),
            (r = So(!1)),
            (l = di.bind(null, Bl, !1, r.queue)),
            (a = { state: t, dispatch: null, action: e, pending: null }),
            ((r = io()).queue = a),
            (n = Eo.bind(null, Bl, a, l, n)),
            (a.dispatch = n),
            (r.memoizedState = e),
            [t, n, !1]
          );
        }
        function Ao(e) {
          return Io(so(), Vl, e);
        }
        function Io(e, t, n) {
          if (
            ((t = mo(e, t, _o)[0]),
            (e = ho(po)[0]),
            "object" === typeof t && null !== t && "function" === typeof t.then)
          )
            try {
              var r = uo(t);
            } catch (o) {
              if (o === Xa) throw Ja;
              throw o;
            }
          else r = t;
          var a = (t = so()).queue,
            l = a.dispatch;
          return (
            n !== t.memoizedState &&
              ((Bl.flags |= 2048),
              Do(9, { destroy: void 0 }, Oo.bind(null, a, n), null)),
            [r, l, e]
          );
        }
        function Oo(e, t) {
          e.action = t;
        }
        function Ro(e) {
          var t = so(),
            n = Vl;
          if (null !== n) return Io(t, n, e);
          (so(), (t = t.memoizedState));
          var r = (n = so()).queue.dispatch;
          return ((n.memoizedState = e), [t, r, !1]);
        }
        function Do(e, t, n, r) {
          return (
            (e = { tag: e, create: n, deps: r, inst: t, next: null }),
            null === (t = Bl.updateQueue) &&
              ((t = {
                lastEffect: null,
                events: null,
                stores: null,
                memoCache: null,
              }),
              (Bl.updateQueue = t)),
            null === (n = t.lastEffect)
              ? (t.lastEffect = e.next = e)
              : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
            e
          );
        }
        function Mo() {
          return so().memoizedState;
        }
        function Fo(e, t, n, r) {
          var a = io();
          ((Bl.flags |= e),
            (a.memoizedState = Do(
              1 | t,
              { destroy: void 0 },
              n,
              void 0 === r ? null : r,
            )));
        }
        function Uo(e, t, n, r) {
          var a = so();
          r = void 0 === r ? null : r;
          var l = a.memoizedState.inst;
          null !== Vl && null !== r && Jl(r, Vl.memoizedState.deps)
            ? (a.memoizedState = Do(t, l, n, r))
            : ((Bl.flags |= e), (a.memoizedState = Do(1 | t, l, n, r)));
        }
        function Ho(e, t) {
          Fo(8390656, 8, e, t);
        }
        function Bo(e, t) {
          Uo(2048, 8, e, t);
        }
        function Vo(e) {
          var t = so().memoizedState;
          return (
            (function (e) {
              Bl.flags |= 4;
              var t = Bl.updateQueue;
              if (null === t)
                ((t = {
                  lastEffect: null,
                  events: null,
                  stores: null,
                  memoCache: null,
                }),
                  (Bl.updateQueue = t),
                  (t.events = [e]));
              else {
                var n = t.events;
                null === n ? (t.events = [e]) : n.push(e);
              }
            })({ ref: t, nextImpl: e }),
            function () {
              if (0 !== (2 & pu)) throw Error(o(440));
              return t.impl.apply(void 0, arguments);
            }
          );
        }
        function Wo(e, t) {
          return Uo(4, 2, e, t);
        }
        function $o(e, t) {
          return Uo(4, 4, e, t);
        }
        function qo(e, t) {
          if ("function" === typeof t) {
            e = e();
            var n = t(e);
            return function () {
              "function" === typeof n ? n() : t(null);
            };
          }
          if (null !== t && void 0 !== t)
            return (
              (e = e()),
              (t.current = e),
              function () {
                t.current = null;
              }
            );
        }
        function Qo(e, t, n) {
          ((n = null !== n && void 0 !== n ? n.concat([e]) : null),
            Uo(4, 4, qo.bind(null, t, e), n));
        }
        function Ko() {}
        function Yo(e, t) {
          var n = so();
          t = void 0 === t ? null : t;
          var r = n.memoizedState;
          return null !== t && Jl(t, r[1])
            ? r[0]
            : ((n.memoizedState = [e, t]), e);
        }
        function Go(e, t) {
          var n = so();
          t = void 0 === t ? null : t;
          var r = n.memoizedState;
          if (null !== t && Jl(t, r[1])) return r[0];
          if (((r = e()), Ql)) {
            ve(!0);
            try {
              e();
            } finally {
              ve(!1);
            }
          }
          return ((n.memoizedState = [r, t]), r);
        }
        function Xo(e, t, n) {
          return void 0 === n ||
            (0 !== (1073741824 & Hl) && 0 === (261930 & gu))
            ? (e.memoizedState = t)
            : ((e.memoizedState = n),
              (e = Qu()),
              (Bl.lanes |= e),
              (Nu |= e),
              n);
        }
        function Zo(e, t, n, r) {
          return Zn(n, t)
            ? n
            : null !== jl.current
              ? ((e = Xo(e, n, r)), Zn(e, t) || (Ai = !0), e)
              : 0 === (42 & Hl) ||
                  (0 !== (1073741824 & Hl) && 0 === (261930 & gu))
                ? ((Ai = !0), (e.memoizedState = n))
                : ((e = Qu()), (Bl.lanes |= e), (Nu |= e), t);
        }
        function Jo(e, t, n, r, a) {
          var l = O.p;
          O.p = 0 !== l && 8 > l ? l : 8;
          var o = I.T,
            i = {};
          ((I.T = i), di(e, !1, t, n));
          try {
            var s = a(),
              u = I.S;
            if (
              (null !== u && u(i, s),
              null !== s &&
                "object" === typeof s &&
                "function" === typeof s.then)
            )
              ci(
                e,
                t,
                (function (e, t) {
                  var n = [],
                    r = {
                      status: "pending",
                      value: null,
                      reason: null,
                      then: function (e) {
                        n.push(e);
                      },
                    };
                  return (
                    e.then(
                      function () {
                        ((r.status = "fulfilled"), (r.value = t));
                        for (var e = 0; e < n.length; e++) (0, n[e])(t);
                      },
                      function (e) {
                        for (
                          r.status = "rejected", r.reason = e, e = 0;
                          e < n.length;
                          e++
                        )
                          (0, n[e])(void 0);
                      },
                    ),
                    r
                  );
                })(s, r),
                qu(),
              );
            else ci(e, t, r, qu());
          } catch (c) {
            ci(
              e,
              t,
              { then: function () {}, status: "rejected", reason: c },
              qu(),
            );
          } finally {
            ((O.p = l),
              null !== o && null !== i.types && (o.types = i.types),
              (I.T = o));
          }
        }
        function ei() {}
        function ti(e, t, n, r) {
          if (5 !== e.tag) throw Error(o(476));
          var a = ni(e).queue;
          Jo(
            e,
            a,
            t,
            R,
            null === n
              ? ei
              : function () {
                  return (ri(e), n(r));
                },
          );
        }
        function ni(e) {
          var t = e.memoizedState;
          if (null !== t) return t;
          var n = {};
          return (
            ((t = {
              memoizedState: R,
              baseState: R,
              baseQueue: null,
              queue: {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: po,
                lastRenderedState: R,
              },
              next: null,
            }).next = {
              memoizedState: n,
              baseState: n,
              baseQueue: null,
              queue: {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: po,
                lastRenderedState: n,
              },
              next: null,
            }),
            (e.memoizedState = t),
            null !== (e = e.alternate) && (e.memoizedState = t),
            t
          );
        }
        function ri(e) {
          var t = ni(e);
          (null === t.next && (t = e.alternate.memoizedState),
            ci(e, t.next.queue, {}, qu()));
        }
        function ai() {
          return La(df);
        }
        function li() {
          return so().memoizedState;
        }
        function oi() {
          return so().memoizedState;
        }
        function ii(e) {
          for (var t = e.return; null !== t; ) {
            switch (t.tag) {
              case 24:
              case 3:
                var n = qu(),
                  r = vl(t, (e = bl(n)), n);
                return (
                  null !== r && (Ku(r, t, n), xl(r, t, n)),
                  (t = { cache: Fa() }),
                  void (e.payload = t)
                );
            }
            t = t.return;
          }
        }
        function si(e, t, n) {
          var r = qu();
          ((n = {
            lane: r,
            revertLane: 0,
            gesture: null,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null,
          }),
            fi(e)
              ? pi(t, n)
              : null !== (n = Lr(e, t, n, r)) && (Ku(n, e, r), hi(n, t, r)));
        }
        function ui(e, t, n) {
          ci(e, t, n, qu());
        }
        function ci(e, t, n, r) {
          var a = {
            lane: r,
            revertLane: 0,
            gesture: null,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null,
          };
          if (fi(e)) pi(t, a);
          else {
            var l = e.alternate;
            if (
              0 === e.lanes &&
              (null === l || 0 === l.lanes) &&
              null !== (l = t.lastRenderedReducer)
            )
              try {
                var o = t.lastRenderedState,
                  i = l(o, n);
                if (((a.hasEagerState = !0), (a.eagerState = i), Zn(i, o)))
                  return (_r(e, t, a, 0), null === hu && Tr(), !1);
              } catch (s) {}
            if (null !== (n = Lr(e, t, a, r)))
              return (Ku(n, e, r), hi(n, t, r), !0);
          }
          return !1;
        }
        function di(e, t, n, r) {
          if (
            ((r = {
              lane: 2,
              revertLane: Bc(),
              gesture: null,
              action: r,
              hasEagerState: !1,
              eagerState: null,
              next: null,
            }),
            fi(e))
          ) {
            if (t) throw Error(o(479));
          } else null !== (t = Lr(e, n, r, 2)) && Ku(t, e, 2);
        }
        function fi(e) {
          var t = e.alternate;
          return e === Bl || (null !== t && t === Bl);
        }
        function pi(e, t) {
          ql = $l = !0;
          var n = e.pending;
          (null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)),
            (e.pending = t));
        }
        function hi(e, t, n) {
          if (0 !== (4194048 & n)) {
            var r = t.lanes;
            ((n |= r &= e.pendingLanes), (t.lanes = n), Ie(e, n));
          }
        }
        var mi = {
          readContext: La,
          use: co,
          useCallback: Zl,
          useContext: Zl,
          useEffect: Zl,
          useImperativeHandle: Zl,
          useLayoutEffect: Zl,
          useInsertionEffect: Zl,
          useMemo: Zl,
          useReducer: Zl,
          useRef: Zl,
          useState: Zl,
          useDebugValue: Zl,
          useDeferredValue: Zl,
          useTransition: Zl,
          useSyncExternalStore: Zl,
          useId: Zl,
          useHostTransitionStatus: Zl,
          useFormState: Zl,
          useActionState: Zl,
          useOptimistic: Zl,
          useMemoCache: Zl,
          useCacheRefresh: Zl,
        };
        mi.useEffectEvent = Zl;
        var gi = {
            readContext: La,
            use: co,
            useCallback: function (e, t) {
              return ((io().memoizedState = [e, void 0 === t ? null : t]), e);
            },
            useContext: La,
            useEffect: Ho,
            useImperativeHandle: function (e, t, n) {
              ((n = null !== n && void 0 !== n ? n.concat([e]) : null),
                Fo(4194308, 4, qo.bind(null, t, e), n));
            },
            useLayoutEffect: function (e, t) {
              return Fo(4194308, 4, e, t);
            },
            useInsertionEffect: function (e, t) {
              Fo(4, 2, e, t);
            },
            useMemo: function (e, t) {
              var n = io();
              t = void 0 === t ? null : t;
              var r = e();
              if (Ql) {
                ve(!0);
                try {
                  e();
                } finally {
                  ve(!1);
                }
              }
              return ((n.memoizedState = [r, t]), r);
            },
            useReducer: function (e, t, n) {
              var r = io();
              if (void 0 !== n) {
                var a = n(t);
                if (Ql) {
                  ve(!0);
                  try {
                    n(t);
                  } finally {
                    ve(!1);
                  }
                }
              } else a = t;
              return (
                (r.memoizedState = r.baseState = a),
                (e = {
                  pending: null,
                  lanes: 0,
                  dispatch: null,
                  lastRenderedReducer: e,
                  lastRenderedState: a,
                }),
                (r.queue = e),
                (e = e.dispatch = si.bind(null, Bl, e)),
                [r.memoizedState, e]
              );
            },
            useRef: function (e) {
              return ((e = { current: e }), (io().memoizedState = e));
            },
            useState: function (e) {
              var t = (e = So(e)).queue,
                n = ui.bind(null, Bl, t);
              return ((t.dispatch = n), [e.memoizedState, n]);
            },
            useDebugValue: Ko,
            useDeferredValue: function (e, t) {
              return Xo(io(), e, t);
            },
            useTransition: function () {
              var e = So(!1);
              return (
                (e = Jo.bind(null, Bl, e.queue, !0, !1)),
                (io().memoizedState = e),
                [!1, e]
              );
            },
            useSyncExternalStore: function (e, t, n) {
              var r = Bl,
                a = io();
              if (da) {
                if (void 0 === n) throw Error(o(407));
                n = n();
              } else {
                if (((n = t()), null === hu)) throw Error(o(349));
                0 !== (127 & gu) || bo(r, t, n);
              }
              a.memoizedState = n;
              var l = { value: n, getSnapshot: t };
              return (
                (a.queue = l),
                Ho(xo.bind(null, r, l, e), [e]),
                (r.flags |= 2048),
                Do(9, { destroy: void 0 }, vo.bind(null, r, l, n, t), null),
                n
              );
            },
            useId: function () {
              var e = io(),
                t = hu.identifierPrefix;
              if (da) {
                var n = ra;
                ((t =
                  "_" +
                  t +
                  "R_" +
                  (n = (na & ~(1 << (32 - xe(na) - 1))).toString(32) + n)),
                  0 < (n = Kl++) && (t += "H" + n.toString(32)),
                  (t += "_"));
              } else t = "_" + t + "r_" + (n = Xl++).toString(32) + "_";
              return (e.memoizedState = t);
            },
            useHostTransitionStatus: ai,
            useFormState: Lo,
            useActionState: Lo,
            useOptimistic: function (e) {
              var t = io();
              t.memoizedState = t.baseState = e;
              var n = {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: null,
                lastRenderedState: null,
              };
              return (
                (t.queue = n),
                (t = di.bind(null, Bl, !0, n)),
                (n.dispatch = t),
                [e, t]
              );
            },
            useMemoCache: fo,
            useCacheRefresh: function () {
              return (io().memoizedState = ii.bind(null, Bl));
            },
            useEffectEvent: function (e) {
              var t = io(),
                n = { impl: e };
              return (
                (t.memoizedState = n),
                function () {
                  if (0 !== (2 & pu)) throw Error(o(440));
                  return n.impl.apply(void 0, arguments);
                }
              );
            },
          },
          yi = {
            readContext: La,
            use: co,
            useCallback: Yo,
            useContext: La,
            useEffect: Bo,
            useImperativeHandle: Qo,
            useInsertionEffect: Wo,
            useLayoutEffect: $o,
            useMemo: Go,
            useReducer: ho,
            useRef: Mo,
            useState: function () {
              return ho(po);
            },
            useDebugValue: Ko,
            useDeferredValue: function (e, t) {
              return Zo(so(), Vl.memoizedState, e, t);
            },
            useTransition: function () {
              var e = ho(po)[0],
                t = so().memoizedState;
              return ["boolean" === typeof e ? e : uo(e), t];
            },
            useSyncExternalStore: yo,
            useId: li,
            useHostTransitionStatus: ai,
            useFormState: Ao,
            useActionState: Ao,
            useOptimistic: function (e, t) {
              return No(so(), 0, e, t);
            },
            useMemoCache: fo,
            useCacheRefresh: oi,
          };
        yi.useEffectEvent = Vo;
        var bi = {
          readContext: La,
          use: co,
          useCallback: Yo,
          useContext: La,
          useEffect: Bo,
          useImperativeHandle: Qo,
          useInsertionEffect: Wo,
          useLayoutEffect: $o,
          useMemo: Go,
          useReducer: go,
          useRef: Mo,
          useState: function () {
            return go(po);
          },
          useDebugValue: Ko,
          useDeferredValue: function (e, t) {
            var n = so();
            return null === Vl ? Xo(n, e, t) : Zo(n, Vl.memoizedState, e, t);
          },
          useTransition: function () {
            var e = go(po)[0],
              t = so().memoizedState;
            return ["boolean" === typeof e ? e : uo(e), t];
          },
          useSyncExternalStore: yo,
          useId: li,
          useHostTransitionStatus: ai,
          useFormState: Ro,
          useActionState: Ro,
          useOptimistic: function (e, t) {
            var n = so();
            return null !== Vl
              ? No(n, 0, e, t)
              : ((n.baseState = e), [e, n.queue.dispatch]);
          },
          useMemoCache: fo,
          useCacheRefresh: oi,
        };
        function vi(e, t, n, r) {
          ((n =
            null === (n = n(r, (t = e.memoizedState))) || void 0 === n
              ? t
              : p({}, t, n)),
            (e.memoizedState = n),
            0 === e.lanes && (e.updateQueue.baseState = n));
        }
        bi.useEffectEvent = Vo;
        var xi = {
          enqueueSetState: function (e, t, n) {
            e = e._reactInternals;
            var r = qu(),
              a = bl(r);
            ((a.payload = t),
              void 0 !== n && null !== n && (a.callback = n),
              null !== (t = vl(e, a, r)) && (Ku(t, e, r), xl(t, e, r)));
          },
          enqueueReplaceState: function (e, t, n) {
            e = e._reactInternals;
            var r = qu(),
              a = bl(r);
            ((a.tag = 1),
              (a.payload = t),
              void 0 !== n && null !== n && (a.callback = n),
              null !== (t = vl(e, a, r)) && (Ku(t, e, r), xl(t, e, r)));
          },
          enqueueForceUpdate: function (e, t) {
            e = e._reactInternals;
            var n = qu(),
              r = bl(n);
            ((r.tag = 2),
              void 0 !== t && null !== t && (r.callback = t),
              null !== (t = vl(e, r, n)) && (Ku(t, e, n), xl(t, e, n)));
          },
        };
        function ki(e, t, n, r, a, l, o) {
          return "function" === typeof (e = e.stateNode).shouldComponentUpdate
            ? e.shouldComponentUpdate(r, l, o)
            : !t.prototype ||
                !t.prototype.isPureReactComponent ||
                !Jn(n, r) ||
                !Jn(a, l);
        }
        function wi(e, t, n, r) {
          ((e = t.state),
            "function" === typeof t.componentWillReceiveProps &&
              t.componentWillReceiveProps(n, r),
            "function" === typeof t.UNSAFE_componentWillReceiveProps &&
              t.UNSAFE_componentWillReceiveProps(n, r),
            t.state !== e && xi.enqueueReplaceState(t, t.state, null));
        }
        function Si(e, t) {
          var n = t;
          if ("ref" in t)
            for (var r in ((n = {}), t)) "ref" !== r && (n[r] = t[r]);
          if ((e = e.defaultProps))
            for (var a in (n === t && (n = p({}, n)), e))
              void 0 === n[a] && (n[a] = e[a]);
          return n;
        }
        function Ni(e) {
          Cr(e);
        }
        function Ei(e) {
          console.error(e);
        }
        function Ci(e) {
          Cr(e);
        }
        function ji(e, t) {
          try {
            (0, e.onUncaughtError)(t.value, { componentStack: t.stack });
          } catch (n) {
            setTimeout(function () {
              throw n;
            });
          }
        }
        function zi(e, t, n) {
          try {
            (0, e.onCaughtError)(n.value, {
              componentStack: n.stack,
              errorBoundary: 1 === t.tag ? t.stateNode : null,
            });
          } catch (r) {
            setTimeout(function () {
              throw r;
            });
          }
        }
        function Pi(e, t, n) {
          return (
            ((n = bl(n)).tag = 3),
            (n.payload = { element: null }),
            (n.callback = function () {
              ji(e, t);
            }),
            n
          );
        }
        function Ti(e) {
          return (((e = bl(e)).tag = 3), e);
        }
        function _i(e, t, n, r) {
          var a = n.type.getDerivedStateFromError;
          if ("function" === typeof a) {
            var l = r.value;
            ((e.payload = function () {
              return a(l);
            }),
              (e.callback = function () {
                zi(t, n, r);
              }));
          }
          var o = n.stateNode;
          null !== o &&
            "function" === typeof o.componentDidCatch &&
            (e.callback = function () {
              (zi(t, n, r),
                "function" !== typeof a &&
                  (null === Ru ? (Ru = new Set([this])) : Ru.add(this)));
              var e = r.stack;
              this.componentDidCatch(r.value, {
                componentStack: null !== e ? e : "",
              });
            });
        }
        var Li = Error(o(461)),
          Ai = !1;
        function Ii(e, t, n, r) {
          t.child = null === e ? hl(t, null, n, r) : pl(t, e.child, n, r);
        }
        function Oi(e, t, n, r, a) {
          n = n.render;
          var l = t.ref;
          if ("ref" in r) {
            var o = {};
            for (var i in r) "ref" !== i && (o[i] = r[i]);
          } else o = r;
          return (
            _a(t),
            (r = eo(e, t, n, o, l, a)),
            (i = ao()),
            null === e || Ai
              ? (da && i && oa(t), (t.flags |= 1), Ii(e, t, r, a), t.child)
              : (lo(e, t, a), as(e, t, a))
          );
        }
        function Ri(e, t, n, r, a) {
          if (null === e) {
            var l = n.type;
            return "function" !== typeof l ||
              Fr(l) ||
              void 0 !== l.defaultProps ||
              null !== n.compare
              ? (((e = Br(n.type, null, r, t, t.mode, a)).ref = t.ref),
                (e.return = t),
                (t.child = e))
              : ((t.tag = 15), (t.type = l), Di(e, t, l, r, a));
          }
          if (((l = e.child), !ls(e, a))) {
            var o = l.memoizedProps;
            if (
              (n = null !== (n = n.compare) ? n : Jn)(o, r) &&
              e.ref === t.ref
            )
              return as(e, t, a);
          }
          return (
            (t.flags |= 1),
            ((e = Ur(l, r)).ref = t.ref),
            (e.return = t),
            (t.child = e)
          );
        }
        function Di(e, t, n, r, a) {
          if (null !== e) {
            var l = e.memoizedProps;
            if (Jn(l, r) && e.ref === t.ref) {
              if (((Ai = !1), (t.pendingProps = r = l), !ls(e, a)))
                return ((t.lanes = e.lanes), as(e, t, a));
              0 !== (131072 & e.flags) && (Ai = !0);
            }
          }
          return Wi(e, t, n, r, a);
        }
        function Mi(e, t, n, r) {
          var a = r.children,
            l = null !== e ? e.memoizedState : null;
          if (
            (null === e &&
              null === t.stateNode &&
              (t.stateNode = {
                _visibility: 1,
                _pendingMarkers: null,
                _retryCache: null,
                _transitions: null,
              }),
            "hidden" === r.mode)
          ) {
            if (0 !== (128 & t.flags)) {
              if (((l = null !== l ? l.baseLanes | n : n), null !== e)) {
                for (r = t.child = e.child, a = 0; null !== r; )
                  ((a = a | r.lanes | r.childLanes), (r = r.sibling));
                r = a & ~l;
              } else ((r = 0), (t.child = null));
              return Ui(e, t, l, n, r);
            }
            if (0 === (536870912 & n))
              return (
                (r = t.lanes = 536870912),
                Ui(e, t, null !== l ? l.baseLanes | n : n, n, r)
              );
            ((t.memoizedState = { baseLanes: 0, cachePool: null }),
              null !== e && Ya(0, null !== l ? l.cachePool : null),
              null !== l ? Pl(t, l) : Tl(),
              Rl(t));
          } else
            null !== l
              ? (Ya(0, l.cachePool), Pl(t, l), Dl(), (t.memoizedState = null))
              : (null !== e && Ya(0, null), Tl(), Dl());
          return (Ii(e, t, a, n), t.child);
        }
        function Fi(e, t) {
          return (
            (null !== e && 22 === e.tag) ||
              null !== t.stateNode ||
              (t.stateNode = {
                _visibility: 1,
                _pendingMarkers: null,
                _retryCache: null,
                _transitions: null,
              }),
            t.sibling
          );
        }
        function Ui(e, t, n, r, a) {
          var l = Ka();
          return (
            (l = null === l ? null : { parent: Ma._currentValue, pool: l }),
            (t.memoizedState = { baseLanes: n, cachePool: l }),
            null !== e && Ya(0, null),
            Tl(),
            Rl(t),
            null !== e && Pa(e, t, r, !0),
            (t.childLanes = a),
            null
          );
        }
        function Hi(e, t) {
          return (
            ((t = Ji({ mode: t.mode, children: t.children }, e.mode)).ref =
              e.ref),
            (e.child = t),
            (t.return = e),
            t
          );
        }
        function Bi(e, t, n) {
          return (
            pl(t, e.child, null, n),
            ((e = Hi(t, t.pendingProps)).flags |= 2),
            Ml(t),
            (t.memoizedState = null),
            e
          );
        }
        function Vi(e, t) {
          var n = t.ref;
          if (null === n) null !== e && null !== e.ref && (t.flags |= 4194816);
          else {
            if ("function" !== typeof n && "object" !== typeof n)
              throw Error(o(284));
            (null !== e && e.ref === n) || (t.flags |= 4194816);
          }
        }
        function Wi(e, t, n, r, a) {
          return (
            _a(t),
            (n = eo(e, t, n, r, void 0, a)),
            (r = ao()),
            null === e || Ai
              ? (da && r && oa(t), (t.flags |= 1), Ii(e, t, n, a), t.child)
              : (lo(e, t, a), as(e, t, a))
          );
        }
        function $i(e, t, n, r, a, l) {
          return (
            _a(t),
            (t.updateQueue = null),
            (n = no(t, r, n, a)),
            to(e),
            (r = ao()),
            null === e || Ai
              ? (da && r && oa(t), (t.flags |= 1), Ii(e, t, n, l), t.child)
              : (lo(e, t, l), as(e, t, l))
          );
        }
        function qi(e, t, n, r, a) {
          if ((_a(t), null === t.stateNode)) {
            var l = Rr,
              o = n.contextType;
            ("object" === typeof o && null !== o && (l = La(o)),
              (l = new n(r, l)),
              (t.memoizedState =
                null !== l.state && void 0 !== l.state ? l.state : null),
              (l.updater = xi),
              (t.stateNode = l),
              (l._reactInternals = t),
              ((l = t.stateNode).props = r),
              (l.state = t.memoizedState),
              (l.refs = {}),
              gl(t),
              (o = n.contextType),
              (l.context = "object" === typeof o && null !== o ? La(o) : Rr),
              (l.state = t.memoizedState),
              "function" === typeof (o = n.getDerivedStateFromProps) &&
                (vi(t, n, o, r), (l.state = t.memoizedState)),
              "function" === typeof n.getDerivedStateFromProps ||
                "function" === typeof l.getSnapshotBeforeUpdate ||
                ("function" !== typeof l.UNSAFE_componentWillMount &&
                  "function" !== typeof l.componentWillMount) ||
                ((o = l.state),
                "function" === typeof l.componentWillMount &&
                  l.componentWillMount(),
                "function" === typeof l.UNSAFE_componentWillMount &&
                  l.UNSAFE_componentWillMount(),
                o !== l.state && xi.enqueueReplaceState(l, l.state, null),
                Nl(t, r, l, a),
                Sl(),
                (l.state = t.memoizedState)),
              "function" === typeof l.componentDidMount && (t.flags |= 4194308),
              (r = !0));
          } else if (null === e) {
            l = t.stateNode;
            var i = t.memoizedProps,
              s = Si(n, i);
            l.props = s;
            var u = l.context,
              c = n.contextType;
            ((o = Rr), "object" === typeof c && null !== c && (o = La(c)));
            var d = n.getDerivedStateFromProps;
            ((c =
              "function" === typeof d ||
              "function" === typeof l.getSnapshotBeforeUpdate),
              (i = t.pendingProps !== i),
              c ||
                ("function" !== typeof l.UNSAFE_componentWillReceiveProps &&
                  "function" !== typeof l.componentWillReceiveProps) ||
                ((i || u !== o) && wi(t, l, r, o)),
              (ml = !1));
            var f = t.memoizedState;
            ((l.state = f),
              Nl(t, r, l, a),
              Sl(),
              (u = t.memoizedState),
              i || f !== u || ml
                ? ("function" === typeof d &&
                    (vi(t, n, d, r), (u = t.memoizedState)),
                  (s = ml || ki(t, n, s, r, f, u, o))
                    ? (c ||
                        ("function" !== typeof l.UNSAFE_componentWillMount &&
                          "function" !== typeof l.componentWillMount) ||
                        ("function" === typeof l.componentWillMount &&
                          l.componentWillMount(),
                        "function" === typeof l.UNSAFE_componentWillMount &&
                          l.UNSAFE_componentWillMount()),
                      "function" === typeof l.componentDidMount &&
                        (t.flags |= 4194308))
                    : ("function" === typeof l.componentDidMount &&
                        (t.flags |= 4194308),
                      (t.memoizedProps = r),
                      (t.memoizedState = u)),
                  (l.props = r),
                  (l.state = u),
                  (l.context = o),
                  (r = s))
                : ("function" === typeof l.componentDidMount &&
                    (t.flags |= 4194308),
                  (r = !1)));
          } else {
            ((l = t.stateNode),
              yl(e, t),
              (c = Si(n, (o = t.memoizedProps))),
              (l.props = c),
              (d = t.pendingProps),
              (f = l.context),
              (u = n.contextType),
              (s = Rr),
              "object" === typeof u && null !== u && (s = La(u)),
              (u =
                "function" === typeof (i = n.getDerivedStateFromProps) ||
                "function" === typeof l.getSnapshotBeforeUpdate) ||
                ("function" !== typeof l.UNSAFE_componentWillReceiveProps &&
                  "function" !== typeof l.componentWillReceiveProps) ||
                ((o !== d || f !== s) && wi(t, l, r, s)),
              (ml = !1),
              (f = t.memoizedState),
              (l.state = f),
              Nl(t, r, l, a),
              Sl());
            var p = t.memoizedState;
            o !== d ||
            f !== p ||
            ml ||
            (null !== e && null !== e.dependencies && Ta(e.dependencies))
              ? ("function" === typeof i &&
                  (vi(t, n, i, r), (p = t.memoizedState)),
                (c =
                  ml ||
                  ki(t, n, c, r, f, p, s) ||
                  (null !== e && null !== e.dependencies && Ta(e.dependencies)))
                  ? (u ||
                      ("function" !== typeof l.UNSAFE_componentWillUpdate &&
                        "function" !== typeof l.componentWillUpdate) ||
                      ("function" === typeof l.componentWillUpdate &&
                        l.componentWillUpdate(r, p, s),
                      "function" === typeof l.UNSAFE_componentWillUpdate &&
                        l.UNSAFE_componentWillUpdate(r, p, s)),
                    "function" === typeof l.componentDidUpdate &&
                      (t.flags |= 4),
                    "function" === typeof l.getSnapshotBeforeUpdate &&
                      (t.flags |= 1024))
                  : ("function" !== typeof l.componentDidUpdate ||
                      (o === e.memoizedProps && f === e.memoizedState) ||
                      (t.flags |= 4),
                    "function" !== typeof l.getSnapshotBeforeUpdate ||
                      (o === e.memoizedProps && f === e.memoizedState) ||
                      (t.flags |= 1024),
                    (t.memoizedProps = r),
                    (t.memoizedState = p)),
                (l.props = r),
                (l.state = p),
                (l.context = s),
                (r = c))
              : ("function" !== typeof l.componentDidUpdate ||
                  (o === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 4),
                "function" !== typeof l.getSnapshotBeforeUpdate ||
                  (o === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 1024),
                (r = !1));
          }
          return (
            (l = r),
            Vi(e, t),
            (r = 0 !== (128 & t.flags)),
            l || r
              ? ((l = t.stateNode),
                (n =
                  r && "function" !== typeof n.getDerivedStateFromError
                    ? null
                    : l.render()),
                (t.flags |= 1),
                null !== e && r
                  ? ((t.child = pl(t, e.child, null, a)),
                    (t.child = pl(t, null, n, a)))
                  : Ii(e, t, n, a),
                (t.memoizedState = l.state),
                (e = t.child))
              : (e = as(e, t, a)),
            e
          );
        }
        function Qi(e, t, n, r) {
          return (va(), (t.flags |= 256), Ii(e, t, n, r), t.child);
        }
        var Ki = {
          dehydrated: null,
          treeContext: null,
          retryLane: 0,
          hydrationErrors: null,
        };
        function Yi(e) {
          return { baseLanes: e, cachePool: Ga() };
        }
        function Gi(e, t, n) {
          return ((e = null !== e ? e.childLanes & ~n : 0), t && (e |= ju), e);
        }
        function Xi(e, t, n) {
          var r,
            a = t.pendingProps,
            l = !1,
            i = 0 !== (128 & t.flags);
          if (
            ((r = i) ||
              (r =
                (null === e || null !== e.memoizedState) &&
                0 !== (2 & Fl.current)),
            r && ((l = !0), (t.flags &= -129)),
            (r = 0 !== (32 & t.flags)),
            (t.flags &= -33),
            null === e)
          ) {
            if (da) {
              if (
                (l ? Il(t) : Dl(),
                (e = ca)
                  ? null !==
                      (e =
                        null !== (e = Td(e, pa)) && "&" !== e.data
                          ? e
                          : null) &&
                    ((t.memoizedState = {
                      dehydrated: e,
                      treeContext:
                        null !== ta ? { id: na, overflow: ra } : null,
                      retryLane: 536870912,
                      hydrationErrors: null,
                    }),
                    ((n = $r(e)).return = t),
                    (t.child = n),
                    (ua = t),
                    (ca = null))
                  : (e = null),
                null === e)
              )
                throw ma(t);
              return (Ld(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
            }
            var s = a.children;
            return (
              (a = a.fallback),
              l
                ? (Dl(),
                  (s = Ji({ mode: "hidden", children: s }, (l = t.mode))),
                  (a = Vr(a, l, n, null)),
                  (s.return = t),
                  (a.return = t),
                  (s.sibling = a),
                  (t.child = s),
                  ((a = t.child).memoizedState = Yi(n)),
                  (a.childLanes = Gi(e, r, n)),
                  (t.memoizedState = Ki),
                  Fi(null, a))
                : (Il(t), Zi(t, s))
            );
          }
          var u = e.memoizedState;
          if (null !== u && null !== (s = u.dehydrated)) {
            if (i)
              256 & t.flags
                ? (Il(t), (t.flags &= -257), (t = es(e, t, n)))
                : null !== t.memoizedState
                  ? (Dl(), (t.child = e.child), (t.flags |= 128), (t = null))
                  : (Dl(),
                    (s = a.fallback),
                    (l = t.mode),
                    (a = Ji({ mode: "visible", children: a.children }, l)),
                    ((s = Vr(s, l, n, null)).flags |= 2),
                    (a.return = t),
                    (s.return = t),
                    (a.sibling = s),
                    (t.child = a),
                    pl(t, e.child, null, n),
                    ((a = t.child).memoizedState = Yi(n)),
                    (a.childLanes = Gi(e, r, n)),
                    (t.memoizedState = Ki),
                    (t = Fi(null, a)));
            else if ((Il(t), Ld(s))) {
              if ((r = s.nextSibling && s.nextSibling.dataset)) var c = r.dgst;
              ((r = c),
                ((a = Error(o(419))).stack = ""),
                (a.digest = r),
                ka({ value: a, source: null, stack: null }),
                (t = es(e, t, n)));
            } else if (
              (Ai || Pa(e, t, n, !1), (r = 0 !== (n & e.childLanes)), Ai || r)
            ) {
              if (
                null !== (r = hu) &&
                0 !== (a = Oe(r, n)) &&
                a !== u.retryLane
              )
                throw ((u.retryLane = a), Ar(e, a), Ku(r, e, a), Li);
              (_d(s) || oc(), (t = es(e, t, n)));
            } else
              _d(s)
                ? ((t.flags |= 192), (t.child = e.child), (t = null))
                : ((e = u.treeContext),
                  (ca = Ad(s.nextSibling)),
                  (ua = t),
                  (da = !0),
                  (fa = null),
                  (pa = !1),
                  null !== e && sa(t, e),
                  ((t = Zi(t, a.children)).flags |= 4096));
            return t;
          }
          return l
            ? (Dl(),
              (s = a.fallback),
              (l = t.mode),
              (c = (u = e.child).sibling),
              ((a = Ur(u, {
                mode: "hidden",
                children: a.children,
              })).subtreeFlags = 65011712 & u.subtreeFlags),
              null !== c
                ? (s = Ur(c, s))
                : ((s = Vr(s, l, n, null)).flags |= 2),
              (s.return = t),
              (a.return = t),
              (a.sibling = s),
              (t.child = a),
              Fi(null, a),
              (a = t.child),
              null === (s = e.child.memoizedState)
                ? (s = Yi(n))
                : (null !== (l = s.cachePool)
                    ? ((u = Ma._currentValue),
                      (l = l.parent !== u ? { parent: u, pool: u } : l))
                    : (l = Ga()),
                  (s = { baseLanes: s.baseLanes | n, cachePool: l })),
              (a.memoizedState = s),
              (a.childLanes = Gi(e, r, n)),
              (t.memoizedState = Ki),
              Fi(e.child, a))
            : (Il(t),
              (e = (n = e.child).sibling),
              ((n = Ur(n, { mode: "visible", children: a.children })).return =
                t),
              (n.sibling = null),
              null !== e &&
                (null === (r = t.deletions)
                  ? ((t.deletions = [e]), (t.flags |= 16))
                  : r.push(e)),
              (t.child = n),
              (t.memoizedState = null),
              n);
        }
        function Zi(e, t) {
          return (
            ((t = Ji({ mode: "visible", children: t }, e.mode)).return = e),
            (e.child = t)
          );
        }
        function Ji(e, t) {
          return (((e = Mr(22, e, null, t)).lanes = 0), e);
        }
        function es(e, t, n) {
          return (
            pl(t, e.child, null, n),
            ((e = Zi(t, t.pendingProps.children)).flags |= 2),
            (t.memoizedState = null),
            e
          );
        }
        function ts(e, t, n) {
          e.lanes |= t;
          var r = e.alternate;
          (null !== r && (r.lanes |= t), ja(e.return, t, n));
        }
        function ns(e, t, n, r, a, l) {
          var o = e.memoizedState;
          null === o
            ? (e.memoizedState = {
                isBackwards: t,
                rendering: null,
                renderingStartTime: 0,
                last: r,
                tail: n,
                tailMode: a,
                treeForkCount: l,
              })
            : ((o.isBackwards = t),
              (o.rendering = null),
              (o.renderingStartTime = 0),
              (o.last = r),
              (o.tail = n),
              (o.tailMode = a),
              (o.treeForkCount = l));
        }
        function rs(e, t, n) {
          var r = t.pendingProps,
            a = r.revealOrder,
            l = r.tail;
          r = r.children;
          var o = Fl.current,
            i = 0 !== (2 & o);
          if (
            (i ? ((o = (1 & o) | 2), (t.flags |= 128)) : (o &= 1),
            H(Fl, o),
            Ii(e, t, r, n),
            (r = da ? Zr : 0),
            !i && null !== e && 0 !== (128 & e.flags))
          )
            e: for (e = t.child; null !== e; ) {
              if (13 === e.tag) null !== e.memoizedState && ts(e, n, t);
              else if (19 === e.tag) ts(e, n, t);
              else if (null !== e.child) {
                ((e.child.return = e), (e = e.child));
                continue;
              }
              if (e === t) break e;
              for (; null === e.sibling; ) {
                if (null === e.return || e.return === t) break e;
                e = e.return;
              }
              ((e.sibling.return = e.return), (e = e.sibling));
            }
          switch (a) {
            case "forwards":
              for (n = t.child, a = null; null !== n; )
                (null !== (e = n.alternate) && null === Ul(e) && (a = n),
                  (n = n.sibling));
              (null === (n = a)
                ? ((a = t.child), (t.child = null))
                : ((a = n.sibling), (n.sibling = null)),
                ns(t, !1, a, n, l, r));
              break;
            case "backwards":
            case "unstable_legacy-backwards":
              for (n = null, a = t.child, t.child = null; null !== a; ) {
                if (null !== (e = a.alternate) && null === Ul(e)) {
                  t.child = a;
                  break;
                }
                ((e = a.sibling), (a.sibling = n), (n = a), (a = e));
              }
              ns(t, !0, n, null, l, r);
              break;
            case "together":
              ns(t, !1, null, null, void 0, r);
              break;
            default:
              t.memoizedState = null;
          }
          return t.child;
        }
        function as(e, t, n) {
          if (
            (null !== e && (t.dependencies = e.dependencies),
            (Nu |= t.lanes),
            0 === (n & t.childLanes))
          ) {
            if (null === e) return null;
            if ((Pa(e, t, n, !1), 0 === (n & t.childLanes))) return null;
          }
          if (null !== e && t.child !== e.child) throw Error(o(153));
          if (null !== t.child) {
            for (
              n = Ur((e = t.child), e.pendingProps), t.child = n, n.return = t;
              null !== e.sibling;
            )
              ((e = e.sibling),
                ((n = n.sibling = Ur(e, e.pendingProps)).return = t));
            n.sibling = null;
          }
          return t.child;
        }
        function ls(e, t) {
          return (
            0 !== (e.lanes & t) || !(null === (e = e.dependencies) || !Ta(e))
          );
        }
        function os(e, t, n) {
          if (null !== e)
            if (e.memoizedProps !== t.pendingProps) Ai = !0;
            else {
              if (!ls(e, n) && 0 === (128 & t.flags))
                return (
                  (Ai = !1),
                  (function (e, t, n) {
                    switch (t.tag) {
                      case 3:
                        (K(t, t.stateNode.containerInfo),
                          Ea(0, Ma, e.memoizedState.cache),
                          va());
                        break;
                      case 27:
                      case 5:
                        G(t);
                        break;
                      case 4:
                        K(t, t.stateNode.containerInfo);
                        break;
                      case 10:
                        Ea(0, t.type, t.memoizedProps.value);
                        break;
                      case 31:
                        if (null !== t.memoizedState)
                          return ((t.flags |= 128), Ol(t), null);
                        break;
                      case 13:
                        var r = t.memoizedState;
                        if (null !== r)
                          return null !== r.dehydrated
                            ? (Il(t), (t.flags |= 128), null)
                            : 0 !== (n & t.child.childLanes)
                              ? Xi(e, t, n)
                              : (Il(t),
                                null !== (e = as(e, t, n)) ? e.sibling : null);
                        Il(t);
                        break;
                      case 19:
                        var a = 0 !== (128 & e.flags);
                        if (
                          ((r = 0 !== (n & t.childLanes)) ||
                            (Pa(e, t, n, !1), (r = 0 !== (n & t.childLanes))),
                          a)
                        ) {
                          if (r) return rs(e, t, n);
                          t.flags |= 128;
                        }
                        if (
                          (null !== (a = t.memoizedState) &&
                            ((a.rendering = null),
                            (a.tail = null),
                            (a.lastEffect = null)),
                          H(Fl, Fl.current),
                          r)
                        )
                          break;
                        return null;
                      case 22:
                        return ((t.lanes = 0), Mi(e, t, n, t.pendingProps));
                      case 24:
                        Ea(0, Ma, e.memoizedState.cache);
                    }
                    return as(e, t, n);
                  })(e, t, n)
                );
              Ai = 0 !== (131072 & e.flags);
            }
          else
            ((Ai = !1), da && 0 !== (1048576 & t.flags) && la(t, Zr, t.index));
          switch (((t.lanes = 0), t.tag)) {
            case 16:
              e: {
                var r = t.pendingProps;
                if (
                  ((e = rl(t.elementType)),
                  (t.type = e),
                  "function" !== typeof e)
                ) {
                  if (void 0 !== e && null !== e) {
                    var a = e.$$typeof;
                    if (a === w) {
                      ((t.tag = 11), (t = Oi(null, t, e, r, n)));
                      break e;
                    }
                    if (a === E) {
                      ((t.tag = 14), (t = Ri(null, t, e, r, n)));
                      break e;
                    }
                  }
                  throw ((t = L(e) || e), Error(o(306, t, "")));
                }
                Fr(e)
                  ? ((r = Si(e, r)), (t.tag = 1), (t = qi(null, t, e, r, n)))
                  : ((t.tag = 0), (t = Wi(null, t, e, r, n)));
              }
              return t;
            case 0:
              return Wi(e, t, t.type, t.pendingProps, n);
            case 1:
              return qi(e, t, (r = t.type), (a = Si(r, t.pendingProps)), n);
            case 3:
              e: {
                if ((K(t, t.stateNode.containerInfo), null === e))
                  throw Error(o(387));
                r = t.pendingProps;
                var l = t.memoizedState;
                ((a = l.element), yl(e, t), Nl(t, r, null, n));
                var i = t.memoizedState;
                if (
                  ((r = i.cache),
                  Ea(0, Ma, r),
                  r !== l.cache && za(t, [Ma], n, !0),
                  Sl(),
                  (r = i.element),
                  l.isDehydrated)
                ) {
                  if (
                    ((l = { element: r, isDehydrated: !1, cache: i.cache }),
                    (t.updateQueue.baseState = l),
                    (t.memoizedState = l),
                    256 & t.flags)
                  ) {
                    t = Qi(e, t, r, n);
                    break e;
                  }
                  if (r !== a) {
                    (ka((a = Kr(Error(o(424)), t))), (t = Qi(e, t, r, n)));
                    break e;
                  }
                  if (9 === (e = t.stateNode.containerInfo).nodeType)
                    e = e.body;
                  else e = "HTML" === e.nodeName ? e.ownerDocument.body : e;
                  for (
                    ca = Ad(e.firstChild),
                      ua = t,
                      da = !0,
                      fa = null,
                      pa = !0,
                      n = hl(t, null, r, n),
                      t.child = n;
                    n;
                  )
                    ((n.flags = (-3 & n.flags) | 4096), (n = n.sibling));
                } else {
                  if ((va(), r === a)) {
                    t = as(e, t, n);
                    break e;
                  }
                  Ii(e, t, r, n);
                }
                t = t.child;
              }
              return t;
            case 26:
              return (
                Vi(e, t),
                null === e
                  ? (n = $d(t.type, null, t.pendingProps, null))
                    ? (t.memoizedState = n)
                    : da ||
                      ((n = t.type),
                      (e = t.pendingProps),
                      ((r = gd(q.current).createElement(n))[He] = t),
                      (r[Be] = e),
                      fd(r, n, e),
                      et(r),
                      (t.stateNode = r))
                  : (t.memoizedState = $d(
                      t.type,
                      e.memoizedProps,
                      t.pendingProps,
                      e.memoizedState,
                    )),
                null
              );
            case 27:
              return (
                G(t),
                null === e &&
                  da &&
                  ((r = t.stateNode = Dd(t.type, t.pendingProps, q.current)),
                  (ua = t),
                  (pa = !0),
                  (a = ca),
                  Cd(t.type) ? ((Id = a), (ca = Ad(r.firstChild))) : (ca = a)),
                Ii(e, t, t.pendingProps.children, n),
                Vi(e, t),
                null === e && (t.flags |= 4194304),
                t.child
              );
            case 5:
              return (
                null === e &&
                  da &&
                  ((a = r = ca) &&
                    (null !==
                    (r = (function (e, t, n, r) {
                      for (; 1 === e.nodeType; ) {
                        var a = n;
                        if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
                          if (
                            !r &&
                            ("INPUT" !== e.nodeName || "hidden" !== e.type)
                          )
                            break;
                        } else if (r) {
                          if (!e[Ke])
                            switch (t) {
                              case "meta":
                                if (!e.hasAttribute("itemprop")) break;
                                return e;
                              case "link":
                                if (
                                  "stylesheet" ===
                                    (l = e.getAttribute("rel")) &&
                                  e.hasAttribute("data-precedence")
                                )
                                  break;
                                if (
                                  l !== a.rel ||
                                  e.getAttribute("href") !==
                                    (null == a.href || "" === a.href
                                      ? null
                                      : a.href) ||
                                  e.getAttribute("crossorigin") !==
                                    (null == a.crossOrigin
                                      ? null
                                      : a.crossOrigin) ||
                                  e.getAttribute("title") !==
                                    (null == a.title ? null : a.title)
                                )
                                  break;
                                return e;
                              case "style":
                                if (e.hasAttribute("data-precedence")) break;
                                return e;
                              case "script":
                                if (
                                  ((l = e.getAttribute("src")) !==
                                    (null == a.src ? null : a.src) ||
                                    e.getAttribute("type") !==
                                      (null == a.type ? null : a.type) ||
                                    e.getAttribute("crossorigin") !==
                                      (null == a.crossOrigin
                                        ? null
                                        : a.crossOrigin)) &&
                                  l &&
                                  e.hasAttribute("async") &&
                                  !e.hasAttribute("itemprop")
                                )
                                  break;
                                return e;
                              default:
                                return e;
                            }
                        } else {
                          if ("input" !== t || "hidden" !== e.type) return e;
                          var l = null == a.name ? null : "" + a.name;
                          if (
                            "hidden" === a.type &&
                            e.getAttribute("name") === l
                          )
                            return e;
                        }
                        if (null === (e = Ad(e.nextSibling))) break;
                      }
                      return null;
                    })(r, t.type, t.pendingProps, pa))
                      ? ((t.stateNode = r),
                        (ua = t),
                        (ca = Ad(r.firstChild)),
                        (pa = !1),
                        (a = !0))
                      : (a = !1)),
                  a || ma(t)),
                G(t),
                (a = t.type),
                (l = t.pendingProps),
                (i = null !== e ? e.memoizedProps : null),
                (r = l.children),
                vd(a, l)
                  ? (r = null)
                  : null !== i && vd(a, i) && (t.flags |= 32),
                null !== t.memoizedState &&
                  ((a = eo(e, t, ro, null, null, n)), (df._currentValue = a)),
                Vi(e, t),
                Ii(e, t, r, n),
                t.child
              );
            case 6:
              return (
                null === e &&
                  da &&
                  ((e = n = ca) &&
                    (null !==
                    (n = (function (e, t, n) {
                      if ("" === t) return null;
                      for (; 3 !== e.nodeType; ) {
                        if (
                          (1 !== e.nodeType ||
                            "INPUT" !== e.nodeName ||
                            "hidden" !== e.type) &&
                          !n
                        )
                          return null;
                        if (null === (e = Ad(e.nextSibling))) return null;
                      }
                      return e;
                    })(n, t.pendingProps, pa))
                      ? ((t.stateNode = n), (ua = t), (ca = null), (e = !0))
                      : (e = !1)),
                  e || ma(t)),
                null
              );
            case 13:
              return Xi(e, t, n);
            case 4:
              return (
                K(t, t.stateNode.containerInfo),
                (r = t.pendingProps),
                null === e ? (t.child = pl(t, null, r, n)) : Ii(e, t, r, n),
                t.child
              );
            case 11:
              return Oi(e, t, t.type, t.pendingProps, n);
            case 7:
              return (Ii(e, t, t.pendingProps, n), t.child);
            case 8:
            case 12:
              return (Ii(e, t, t.pendingProps.children, n), t.child);
            case 10:
              return (
                (r = t.pendingProps),
                Ea(0, t.type, r.value),
                Ii(e, t, r.children, n),
                t.child
              );
            case 9:
              return (
                (a = t.type._context),
                (r = t.pendingProps.children),
                _a(t),
                (r = r((a = La(a)))),
                (t.flags |= 1),
                Ii(e, t, r, n),
                t.child
              );
            case 14:
              return Ri(e, t, t.type, t.pendingProps, n);
            case 15:
              return Di(e, t, t.type, t.pendingProps, n);
            case 19:
              return rs(e, t, n);
            case 31:
              return (function (e, t, n) {
                var r = t.pendingProps,
                  a = 0 !== (128 & t.flags);
                if (((t.flags &= -129), null === e)) {
                  if (da) {
                    if ("hidden" === r.mode)
                      return (
                        (e = Hi(t, r)),
                        (t.lanes = 536870912),
                        Fi(null, e)
                      );
                    if (
                      (Ol(t),
                      (e = ca)
                        ? null !==
                            (e =
                              null !== (e = Td(e, pa)) && "&" === e.data
                                ? e
                                : null) &&
                          ((t.memoizedState = {
                            dehydrated: e,
                            treeContext:
                              null !== ta ? { id: na, overflow: ra } : null,
                            retryLane: 536870912,
                            hydrationErrors: null,
                          }),
                          ((n = $r(e)).return = t),
                          (t.child = n),
                          (ua = t),
                          (ca = null))
                        : (e = null),
                      null === e)
                    )
                      throw ma(t);
                    return ((t.lanes = 536870912), null);
                  }
                  return Hi(t, r);
                }
                var l = e.memoizedState;
                if (null !== l) {
                  var i = l.dehydrated;
                  if ((Ol(t), a))
                    if (256 & t.flags) ((t.flags &= -257), (t = Bi(e, t, n)));
                    else {
                      if (null === t.memoizedState) throw Error(o(558));
                      ((t.child = e.child), (t.flags |= 128), (t = null));
                    }
                  else if (
                    (Ai || Pa(e, t, n, !1),
                    (a = 0 !== (n & e.childLanes)),
                    Ai || a)
                  ) {
                    if (
                      null !== (r = hu) &&
                      0 !== (i = Oe(r, n)) &&
                      i !== l.retryLane
                    )
                      throw ((l.retryLane = i), Ar(e, i), Ku(r, e, i), Li);
                    (oc(), (t = Bi(e, t, n)));
                  } else
                    ((e = l.treeContext),
                      (ca = Ad(i.nextSibling)),
                      (ua = t),
                      (da = !0),
                      (fa = null),
                      (pa = !1),
                      null !== e && sa(t, e),
                      ((t = Hi(t, r)).flags |= 4096));
                  return t;
                }
                return (
                  ((e = Ur(e.child, {
                    mode: r.mode,
                    children: r.children,
                  })).ref = t.ref),
                  (t.child = e),
                  (e.return = t),
                  e
                );
              })(e, t, n);
            case 22:
              return Mi(e, t, n, t.pendingProps);
            case 24:
              return (
                _a(t),
                (r = La(Ma)),
                null === e
                  ? (null === (a = Ka()) &&
                      ((a = hu),
                      (l = Fa()),
                      (a.pooledCache = l),
                      l.refCount++,
                      null !== l && (a.pooledCacheLanes |= n),
                      (a = l)),
                    (t.memoizedState = { parent: r, cache: a }),
                    gl(t),
                    Ea(0, Ma, a))
                  : (0 !== (e.lanes & n) &&
                      (yl(e, t), Nl(t, null, null, n), Sl()),
                    (a = e.memoizedState),
                    (l = t.memoizedState),
                    a.parent !== r
                      ? ((a = { parent: r, cache: r }),
                        (t.memoizedState = a),
                        0 === t.lanes &&
                          (t.memoizedState = t.updateQueue.baseState = a),
                        Ea(0, Ma, r))
                      : ((r = l.cache),
                        Ea(0, Ma, r),
                        r !== a.cache && za(t, [Ma], n, !0))),
                Ii(e, t, t.pendingProps.children, n),
                t.child
              );
            case 29:
              throw t.pendingProps;
          }
          throw Error(o(156, t.tag));
        }
        function is(e) {
          e.flags |= 4;
        }
        function ss(e, t, n, r, a) {
          if (((t = 0 !== (32 & e.mode)) && (t = !1), t)) {
            if (((e.flags |= 16777216), (335544128 & a) === a))
              if (e.stateNode.complete) e.flags |= 8192;
              else {
                if (!rc()) throw ((al = el), Za);
                e.flags |= 8192;
              }
          } else e.flags &= -16777217;
        }
        function us(e, t) {
          if ("stylesheet" !== t.type || 0 !== (4 & t.state.loading))
            e.flags &= -16777217;
          else if (((e.flags |= 16777216), !af(t))) {
            if (!rc()) throw ((al = el), Za);
            e.flags |= 8192;
          }
        }
        function cs(e, t) {
          (null !== t && (e.flags |= 4),
            16384 & e.flags &&
              ((t = 22 !== e.tag ? Te() : 536870912),
              (e.lanes |= t),
              (zu |= t)));
        }
        function ds(e, t) {
          if (!da)
            switch (e.tailMode) {
              case "hidden":
                t = e.tail;
                for (var n = null; null !== t; )
                  (null !== t.alternate && (n = t), (t = t.sibling));
                null === n ? (e.tail = null) : (n.sibling = null);
                break;
              case "collapsed":
                n = e.tail;
                for (var r = null; null !== n; )
                  (null !== n.alternate && (r = n), (n = n.sibling));
                null === r
                  ? t || null === e.tail
                    ? (e.tail = null)
                    : (e.tail.sibling = null)
                  : (r.sibling = null);
            }
        }
        function fs(e) {
          var t = null !== e.alternate && e.alternate.child === e.child,
            n = 0,
            r = 0;
          if (t)
            for (var a = e.child; null !== a; )
              ((n |= a.lanes | a.childLanes),
                (r |= 65011712 & a.subtreeFlags),
                (r |= 65011712 & a.flags),
                (a.return = e),
                (a = a.sibling));
          else
            for (a = e.child; null !== a; )
              ((n |= a.lanes | a.childLanes),
                (r |= a.subtreeFlags),
                (r |= a.flags),
                (a.return = e),
                (a = a.sibling));
          return ((e.subtreeFlags |= r), (e.childLanes = n), t);
        }
        function ps(e, t, n) {
          var r = t.pendingProps;
          switch ((ia(t), t.tag)) {
            case 16:
            case 15:
            case 0:
            case 11:
            case 7:
            case 8:
            case 12:
            case 9:
            case 14:
            case 1:
              return (fs(t), null);
            case 3:
              return (
                (n = t.stateNode),
                (r = null),
                null !== e && (r = e.memoizedState.cache),
                t.memoizedState.cache !== r && (t.flags |= 2048),
                Ca(Ma),
                Y(),
                n.pendingContext &&
                  ((n.context = n.pendingContext), (n.pendingContext = null)),
                (null !== e && null !== e.child) ||
                  (ba(t)
                    ? is(t)
                    : null === e ||
                      (e.memoizedState.isDehydrated && 0 === (256 & t.flags)) ||
                      ((t.flags |= 1024), xa())),
                fs(t),
                null
              );
            case 26:
              var a = t.type,
                l = t.memoizedState;
              return (
                null === e
                  ? (is(t),
                    null !== l ? (fs(t), us(t, l)) : (fs(t), ss(t, a, 0, 0, n)))
                  : l
                    ? l !== e.memoizedState
                      ? (is(t), fs(t), us(t, l))
                      : (fs(t), (t.flags &= -16777217))
                    : ((e = e.memoizedProps) !== r && is(t),
                      fs(t),
                      ss(t, a, 0, 0, n)),
                null
              );
            case 27:
              if (
                (X(t),
                (n = q.current),
                (a = t.type),
                null !== e && null != t.stateNode)
              )
                e.memoizedProps !== r && is(t);
              else {
                if (!r) {
                  if (null === t.stateNode) throw Error(o(166));
                  return (fs(t), null);
                }
                ((e = W.current),
                  ba(t)
                    ? ga(t)
                    : ((e = Dd(a, r, n)), (t.stateNode = e), is(t)));
              }
              return (fs(t), null);
            case 5:
              if ((X(t), (a = t.type), null !== e && null != t.stateNode))
                e.memoizedProps !== r && is(t);
              else {
                if (!r) {
                  if (null === t.stateNode) throw Error(o(166));
                  return (fs(t), null);
                }
                if (((l = W.current), ba(t))) ga(t);
                else {
                  var i = gd(q.current);
                  switch (l) {
                    case 1:
                      l = i.createElementNS("http://www.w3.org/2000/svg", a);
                      break;
                    case 2:
                      l = i.createElementNS(
                        "http://www.w3.org/1998/Math/MathML",
                        a,
                      );
                      break;
                    default:
                      switch (a) {
                        case "svg":
                          l = i.createElementNS(
                            "http://www.w3.org/2000/svg",
                            a,
                          );
                          break;
                        case "math":
                          l = i.createElementNS(
                            "http://www.w3.org/1998/Math/MathML",
                            a,
                          );
                          break;
                        case "script":
                          (((l = i.createElement("div")).innerHTML =
                            "<script><\/script>"),
                            (l = l.removeChild(l.firstChild)));
                          break;
                        case "select":
                          ((l =
                            "string" === typeof r.is
                              ? i.createElement("select", { is: r.is })
                              : i.createElement("select")),
                            r.multiple
                              ? (l.multiple = !0)
                              : r.size && (l.size = r.size));
                          break;
                        default:
                          l =
                            "string" === typeof r.is
                              ? i.createElement(a, { is: r.is })
                              : i.createElement(a);
                      }
                  }
                  ((l[He] = t), (l[Be] = r));
                  e: for (i = t.child; null !== i; ) {
                    if (5 === i.tag || 6 === i.tag) l.appendChild(i.stateNode);
                    else if (4 !== i.tag && 27 !== i.tag && null !== i.child) {
                      ((i.child.return = i), (i = i.child));
                      continue;
                    }
                    if (i === t) break e;
                    for (; null === i.sibling; ) {
                      if (null === i.return || i.return === t) break e;
                      i = i.return;
                    }
                    ((i.sibling.return = i.return), (i = i.sibling));
                  }
                  t.stateNode = l;
                  e: switch ((fd(l, a, r), a)) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      r = !!r.autoFocus;
                      break e;
                    case "img":
                      r = !0;
                      break e;
                    default:
                      r = !1;
                  }
                  r && is(t);
                }
              }
              return (
                fs(t),
                ss(t, t.type, null === e || e.memoizedProps, t.pendingProps, n),
                null
              );
            case 6:
              if (e && null != t.stateNode) e.memoizedProps !== r && is(t);
              else {
                if ("string" !== typeof r && null === t.stateNode)
                  throw Error(o(166));
                if (((e = q.current), ba(t))) {
                  if (
                    ((e = t.stateNode),
                    (n = t.memoizedProps),
                    (r = null),
                    null !== (a = ua))
                  )
                    switch (a.tag) {
                      case 27:
                      case 5:
                        r = a.memoizedProps;
                    }
                  ((e[He] = t),
                    (e = !!(
                      e.nodeValue === n ||
                      (null !== r && !0 === r.suppressHydrationWarning) ||
                      ud(e.nodeValue, n)
                    )) || ma(t, !0));
                } else
                  (((e = gd(e).createTextNode(r))[He] = t), (t.stateNode = e));
              }
              return (fs(t), null);
            case 31:
              if (
                ((n = t.memoizedState), null === e || null !== e.memoizedState)
              ) {
                if (((r = ba(t)), null !== n)) {
                  if (null === e) {
                    if (!r) throw Error(o(318));
                    if (
                      !(e =
                        null !== (e = t.memoizedState) ? e.dehydrated : null)
                    )
                      throw Error(o(557));
                    e[He] = t;
                  } else
                    (va(),
                      0 === (128 & t.flags) && (t.memoizedState = null),
                      (t.flags |= 4));
                  (fs(t), (e = !1));
                } else
                  ((n = xa()),
                    null !== e &&
                      null !== e.memoizedState &&
                      (e.memoizedState.hydrationErrors = n),
                    (e = !0));
                if (!e) return 256 & t.flags ? (Ml(t), t) : (Ml(t), null);
                if (0 !== (128 & t.flags)) throw Error(o(558));
              }
              return (fs(t), null);
            case 13:
              if (
                ((r = t.memoizedState),
                null === e ||
                  (null !== e.memoizedState &&
                    null !== e.memoizedState.dehydrated))
              ) {
                if (((a = ba(t)), null !== r && null !== r.dehydrated)) {
                  if (null === e) {
                    if (!a) throw Error(o(318));
                    if (
                      !(a =
                        null !== (a = t.memoizedState) ? a.dehydrated : null)
                    )
                      throw Error(o(317));
                    a[He] = t;
                  } else
                    (va(),
                      0 === (128 & t.flags) && (t.memoizedState = null),
                      (t.flags |= 4));
                  (fs(t), (a = !1));
                } else
                  ((a = xa()),
                    null !== e &&
                      null !== e.memoizedState &&
                      (e.memoizedState.hydrationErrors = a),
                    (a = !0));
                if (!a) return 256 & t.flags ? (Ml(t), t) : (Ml(t), null);
              }
              return (
                Ml(t),
                0 !== (128 & t.flags)
                  ? ((t.lanes = n), t)
                  : ((n = null !== r),
                    (e = null !== e && null !== e.memoizedState),
                    n &&
                      ((a = null),
                      null !== (r = t.child).alternate &&
                        null !== r.alternate.memoizedState &&
                        null !== r.alternate.memoizedState.cachePool &&
                        (a = r.alternate.memoizedState.cachePool.pool),
                      (l = null),
                      null !== r.memoizedState &&
                        null !== r.memoizedState.cachePool &&
                        (l = r.memoizedState.cachePool.pool),
                      l !== a && (r.flags |= 2048)),
                    n !== e && n && (t.child.flags |= 8192),
                    cs(t, t.updateQueue),
                    fs(t),
                    null)
              );
            case 4:
              return (
                Y(),
                null === e && Jc(t.stateNode.containerInfo),
                fs(t),
                null
              );
            case 10:
              return (Ca(t.type), fs(t), null);
            case 19:
              if ((U(Fl), null === (r = t.memoizedState))) return (fs(t), null);
              if (((a = 0 !== (128 & t.flags)), null === (l = r.rendering)))
                if (a) ds(r, !1);
                else {
                  if (0 !== Su || (null !== e && 0 !== (128 & e.flags)))
                    for (e = t.child; null !== e; ) {
                      if (null !== (l = Ul(e))) {
                        for (
                          t.flags |= 128,
                            ds(r, !1),
                            e = l.updateQueue,
                            t.updateQueue = e,
                            cs(t, e),
                            t.subtreeFlags = 0,
                            e = n,
                            n = t.child;
                          null !== n;
                        )
                          (Hr(n, e), (n = n.sibling));
                        return (
                          H(Fl, (1 & Fl.current) | 2),
                          da && aa(t, r.treeForkCount),
                          t.child
                        );
                      }
                      e = e.sibling;
                    }
                  null !== r.tail &&
                    se() > Iu &&
                    ((t.flags |= 128),
                    (a = !0),
                    ds(r, !1),
                    (t.lanes = 4194304));
                }
              else {
                if (!a)
                  if (null !== (e = Ul(l))) {
                    if (
                      ((t.flags |= 128),
                      (a = !0),
                      (e = e.updateQueue),
                      (t.updateQueue = e),
                      cs(t, e),
                      ds(r, !0),
                      null === r.tail &&
                        "hidden" === r.tailMode &&
                        !l.alternate &&
                        !da)
                    )
                      return (fs(t), null);
                  } else
                    2 * se() - r.renderingStartTime > Iu &&
                      536870912 !== n &&
                      ((t.flags |= 128),
                      (a = !0),
                      ds(r, !1),
                      (t.lanes = 4194304));
                r.isBackwards
                  ? ((l.sibling = t.child), (t.child = l))
                  : (null !== (e = r.last) ? (e.sibling = l) : (t.child = l),
                    (r.last = l));
              }
              return null !== r.tail
                ? ((e = r.tail),
                  (r.rendering = e),
                  (r.tail = e.sibling),
                  (r.renderingStartTime = se()),
                  (e.sibling = null),
                  (n = Fl.current),
                  H(Fl, a ? (1 & n) | 2 : 1 & n),
                  da && aa(t, r.treeForkCount),
                  e)
                : (fs(t), null);
            case 22:
            case 23:
              return (
                Ml(t),
                _l(),
                (r = null !== t.memoizedState),
                null !== e
                  ? (null !== e.memoizedState) !== r && (t.flags |= 8192)
                  : r && (t.flags |= 8192),
                r
                  ? 0 !== (536870912 & n) &&
                    0 === (128 & t.flags) &&
                    (fs(t), 6 & t.subtreeFlags && (t.flags |= 8192))
                  : fs(t),
                null !== (n = t.updateQueue) && cs(t, n.retryQueue),
                (n = null),
                null !== e &&
                  null !== e.memoizedState &&
                  null !== e.memoizedState.cachePool &&
                  (n = e.memoizedState.cachePool.pool),
                (r = null),
                null !== t.memoizedState &&
                  null !== t.memoizedState.cachePool &&
                  (r = t.memoizedState.cachePool.pool),
                r !== n && (t.flags |= 2048),
                null !== e && U(Qa),
                null
              );
            case 24:
              return (
                (n = null),
                null !== e && (n = e.memoizedState.cache),
                t.memoizedState.cache !== n && (t.flags |= 2048),
                Ca(Ma),
                fs(t),
                null
              );
            case 25:
            case 30:
              return null;
          }
          throw Error(o(156, t.tag));
        }
        function hs(e, t) {
          switch ((ia(t), t.tag)) {
            case 1:
              return 65536 & (e = t.flags)
                ? ((t.flags = (-65537 & e) | 128), t)
                : null;
            case 3:
              return (
                Ca(Ma),
                Y(),
                0 !== (65536 & (e = t.flags)) && 0 === (128 & e)
                  ? ((t.flags = (-65537 & e) | 128), t)
                  : null
              );
            case 26:
            case 27:
            case 5:
              return (X(t), null);
            case 31:
              if (null !== t.memoizedState) {
                if ((Ml(t), null === t.alternate)) throw Error(o(340));
                va();
              }
              return 65536 & (e = t.flags)
                ? ((t.flags = (-65537 & e) | 128), t)
                : null;
            case 13:
              if (
                (Ml(t), null !== (e = t.memoizedState) && null !== e.dehydrated)
              ) {
                if (null === t.alternate) throw Error(o(340));
                va();
              }
              return 65536 & (e = t.flags)
                ? ((t.flags = (-65537 & e) | 128), t)
                : null;
            case 19:
              return (U(Fl), null);
            case 4:
              return (Y(), null);
            case 10:
              return (Ca(t.type), null);
            case 22:
            case 23:
              return (
                Ml(t),
                _l(),
                null !== e && U(Qa),
                65536 & (e = t.flags)
                  ? ((t.flags = (-65537 & e) | 128), t)
                  : null
              );
            case 24:
              return (Ca(Ma), null);
            default:
              return null;
          }
        }
        function ms(e, t) {
          switch ((ia(t), t.tag)) {
            case 3:
              (Ca(Ma), Y());
              break;
            case 26:
            case 27:
            case 5:
              X(t);
              break;
            case 4:
              Y();
              break;
            case 31:
              null !== t.memoizedState && Ml(t);
              break;
            case 13:
              Ml(t);
              break;
            case 19:
              U(Fl);
              break;
            case 10:
              Ca(t.type);
              break;
            case 22:
            case 23:
              (Ml(t), _l(), null !== e && U(Qa));
              break;
            case 24:
              Ca(Ma);
          }
        }
        function gs(e, t) {
          try {
            var n = t.updateQueue,
              r = null !== n ? n.lastEffect : null;
            if (null !== r) {
              var a = r.next;
              n = a;
              do {
                if ((n.tag & e) === e) {
                  r = void 0;
                  var l = n.create,
                    o = n.inst;
                  ((r = l()), (o.destroy = r));
                }
                n = n.next;
              } while (n !== a);
            }
          } catch (i) {
            Sc(t, t.return, i);
          }
        }
        function ys(e, t, n) {
          try {
            var r = t.updateQueue,
              a = null !== r ? r.lastEffect : null;
            if (null !== a) {
              var l = a.next;
              r = l;
              do {
                if ((r.tag & e) === e) {
                  var o = r.inst,
                    i = o.destroy;
                  if (void 0 !== i) {
                    ((o.destroy = void 0), (a = t));
                    var s = n,
                      u = i;
                    try {
                      u();
                    } catch (c) {
                      Sc(a, s, c);
                    }
                  }
                }
                r = r.next;
              } while (r !== l);
            }
          } catch (c) {
            Sc(t, t.return, c);
          }
        }
        function bs(e) {
          var t = e.updateQueue;
          if (null !== t) {
            var n = e.stateNode;
            try {
              Cl(t, n);
            } catch (r) {
              Sc(e, e.return, r);
            }
          }
        }
        function vs(e, t, n) {
          ((n.props = Si(e.type, e.memoizedProps)),
            (n.state = e.memoizedState));
          try {
            n.componentWillUnmount();
          } catch (r) {
            Sc(e, t, r);
          }
        }
        function xs(e, t) {
          try {
            var n = e.ref;
            if (null !== n) {
              switch (e.tag) {
                case 26:
                case 27:
                case 5:
                  var r = e.stateNode;
                  break;
                default:
                  r = e.stateNode;
              }
              "function" === typeof n ? (e.refCleanup = n(r)) : (n.current = r);
            }
          } catch (a) {
            Sc(e, t, a);
          }
        }
        function ks(e, t) {
          var n = e.ref,
            r = e.refCleanup;
          if (null !== n)
            if ("function" === typeof r)
              try {
                r();
              } catch (a) {
                Sc(e, t, a);
              } finally {
                ((e.refCleanup = null),
                  null != (e = e.alternate) && (e.refCleanup = null));
              }
            else if ("function" === typeof n)
              try {
                n(null);
              } catch (l) {
                Sc(e, t, l);
              }
            else n.current = null;
        }
        function ws(e) {
          var t = e.type,
            n = e.memoizedProps,
            r = e.stateNode;
          try {
            e: switch (t) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                n.autoFocus && r.focus();
                break e;
              case "img":
                n.src ? (r.src = n.src) : n.srcSet && (r.srcset = n.srcSet);
            }
          } catch (a) {
            Sc(e, e.return, a);
          }
        }
        function Ss(e, t, n) {
          try {
            var r = e.stateNode;
            (!(function (e, t, n, r) {
              switch (t) {
                case "div":
                case "span":
                case "svg":
                case "path":
                case "a":
                case "g":
                case "p":
                case "li":
                  break;
                case "input":
                  var a = null,
                    l = null,
                    i = null,
                    s = null,
                    u = null,
                    c = null,
                    d = null;
                  for (h in n) {
                    var f = n[h];
                    if (n.hasOwnProperty(h) && null != f)
                      switch (h) {
                        case "checked":
                        case "value":
                          break;
                        case "defaultValue":
                          u = f;
                        default:
                          r.hasOwnProperty(h) || cd(e, t, h, null, r, f);
                      }
                  }
                  for (var p in r) {
                    var h = r[p];
                    if (
                      ((f = n[p]),
                      r.hasOwnProperty(p) && (null != h || null != f))
                    )
                      switch (p) {
                        case "type":
                          l = h;
                          break;
                        case "name":
                          a = h;
                          break;
                        case "checked":
                          c = h;
                          break;
                        case "defaultChecked":
                          d = h;
                          break;
                        case "value":
                          i = h;
                          break;
                        case "defaultValue":
                          s = h;
                          break;
                        case "children":
                        case "dangerouslySetInnerHTML":
                          if (null != h) throw Error(o(137, t));
                          break;
                        default:
                          h !== f && cd(e, t, p, h, r, f);
                      }
                  }
                  return void bt(e, i, s, u, c, d, l, a);
                case "select":
                  for (l in ((h = i = s = p = null), n))
                    if (((u = n[l]), n.hasOwnProperty(l) && null != u))
                      switch (l) {
                        case "value":
                          break;
                        case "multiple":
                          h = u;
                        default:
                          r.hasOwnProperty(l) || cd(e, t, l, null, r, u);
                      }
                  for (a in r)
                    if (
                      ((l = r[a]),
                      (u = n[a]),
                      r.hasOwnProperty(a) && (null != l || null != u))
                    )
                      switch (a) {
                        case "value":
                          p = l;
                          break;
                        case "defaultValue":
                          s = l;
                          break;
                        case "multiple":
                          i = l;
                        default:
                          l !== u && cd(e, t, a, l, r, u);
                      }
                  return (
                    (t = s),
                    (n = i),
                    (r = h),
                    void (null != p
                      ? kt(e, !!n, p, !1)
                      : !!r !== !!n &&
                        (null != t
                          ? kt(e, !!n, t, !0)
                          : kt(e, !!n, n ? [] : "", !1)))
                  );
                case "textarea":
                  for (s in ((h = p = null), n))
                    if (
                      ((a = n[s]),
                      n.hasOwnProperty(s) && null != a && !r.hasOwnProperty(s))
                    )
                      switch (s) {
                        case "value":
                        case "children":
                          break;
                        default:
                          cd(e, t, s, null, r, a);
                      }
                  for (i in r)
                    if (
                      ((a = r[i]),
                      (l = n[i]),
                      r.hasOwnProperty(i) && (null != a || null != l))
                    )
                      switch (i) {
                        case "value":
                          p = a;
                          break;
                        case "defaultValue":
                          h = a;
                          break;
                        case "children":
                          break;
                        case "dangerouslySetInnerHTML":
                          if (null != a) throw Error(o(91));
                          break;
                        default:
                          a !== l && cd(e, t, i, a, r, l);
                      }
                  return void wt(e, p, h);
                case "option":
                  for (var m in n)
                    if (
                      ((p = n[m]),
                      n.hasOwnProperty(m) && null != p && !r.hasOwnProperty(m))
                    )
                      if ("selected" === m) e.selected = !1;
                      else cd(e, t, m, null, r, p);
                  for (u in r)
                    if (
                      ((p = r[u]),
                      (h = n[u]),
                      r.hasOwnProperty(u) &&
                        p !== h &&
                        (null != p || null != h))
                    )
                      if ("selected" === u)
                        e.selected =
                          p && "function" !== typeof p && "symbol" !== typeof p;
                      else cd(e, t, u, p, r, h);
                  return;
                case "img":
                case "link":
                case "area":
                case "base":
                case "br":
                case "col":
                case "embed":
                case "hr":
                case "keygen":
                case "meta":
                case "param":
                case "source":
                case "track":
                case "wbr":
                case "menuitem":
                  for (var g in n)
                    ((p = n[g]),
                      n.hasOwnProperty(g) &&
                        null != p &&
                        !r.hasOwnProperty(g) &&
                        cd(e, t, g, null, r, p));
                  for (c in r)
                    if (
                      ((p = r[c]),
                      (h = n[c]),
                      r.hasOwnProperty(c) &&
                        p !== h &&
                        (null != p || null != h))
                    )
                      switch (c) {
                        case "children":
                        case "dangerouslySetInnerHTML":
                          if (null != p) throw Error(o(137, t));
                          break;
                        default:
                          cd(e, t, c, p, r, h);
                      }
                  return;
                default:
                  if (zt(t)) {
                    for (var y in n)
                      ((p = n[y]),
                        n.hasOwnProperty(y) &&
                          void 0 !== p &&
                          !r.hasOwnProperty(y) &&
                          dd(e, t, y, void 0, r, p));
                    for (d in r)
                      ((p = r[d]),
                        (h = n[d]),
                        !r.hasOwnProperty(d) ||
                          p === h ||
                          (void 0 === p && void 0 === h) ||
                          dd(e, t, d, p, r, h));
                    return;
                  }
              }
              for (var b in n)
                ((p = n[b]),
                  n.hasOwnProperty(b) &&
                    null != p &&
                    !r.hasOwnProperty(b) &&
                    cd(e, t, b, null, r, p));
              for (f in r)
                ((p = r[f]),
                  (h = n[f]),
                  !r.hasOwnProperty(f) ||
                    p === h ||
                    (null == p && null == h) ||
                    cd(e, t, f, p, r, h));
            })(r, e.type, n, t),
              (r[Be] = t));
          } catch (a) {
            Sc(e, e.return, a);
          }
        }
        function Ns(e) {
          return (
            5 === e.tag ||
            3 === e.tag ||
            26 === e.tag ||
            (27 === e.tag && Cd(e.type)) ||
            4 === e.tag
          );
        }
        function Es(e) {
          e: for (;;) {
            for (; null === e.sibling; ) {
              if (null === e.return || Ns(e.return)) return null;
              e = e.return;
            }
            for (
              e.sibling.return = e.return, e = e.sibling;
              5 !== e.tag && 6 !== e.tag && 18 !== e.tag;
            ) {
              if (27 === e.tag && Cd(e.type)) continue e;
              if (2 & e.flags) continue e;
              if (null === e.child || 4 === e.tag) continue e;
              ((e.child.return = e), (e = e.child));
            }
            if (!(2 & e.flags)) return e.stateNode;
          }
        }
        function Cs(e, t, n) {
          var r = e.tag;
          if (5 === r || 6 === r)
            ((e = e.stateNode),
              t
                ? (9 === n.nodeType
                    ? n.body
                    : "HTML" === n.nodeName
                      ? n.ownerDocument.body
                      : n
                  ).insertBefore(e, t)
                : ((t =
                    9 === n.nodeType
                      ? n.body
                      : "HTML" === n.nodeName
                        ? n.ownerDocument.body
                        : n).appendChild(e),
                  (null !== (n = n._reactRootContainer) && void 0 !== n) ||
                    null !== t.onclick ||
                    (t.onclick = Lt)));
          else if (
            4 !== r &&
            (27 === r && Cd(e.type) && ((n = e.stateNode), (t = null)),
            null !== (e = e.child))
          )
            for (Cs(e, t, n), e = e.sibling; null !== e; )
              (Cs(e, t, n), (e = e.sibling));
        }
        function js(e, t, n) {
          var r = e.tag;
          if (5 === r || 6 === r)
            ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
          else if (
            4 !== r &&
            (27 === r && Cd(e.type) && (n = e.stateNode),
            null !== (e = e.child))
          )
            for (js(e, t, n), e = e.sibling; null !== e; )
              (js(e, t, n), (e = e.sibling));
        }
        function zs(e) {
          var t = e.stateNode,
            n = e.memoizedProps;
          try {
            for (var r = e.type, a = t.attributes; a.length; )
              t.removeAttributeNode(a[0]);
            (fd(t, r, n), (t[He] = e), (t[Be] = n));
          } catch (l) {
            Sc(e, e.return, l);
          }
        }
        var Ps = !1,
          Ts = !1,
          _s = !1,
          Ls = "function" === typeof WeakSet ? WeakSet : Set,
          As = null;
        function Is(e, t, n) {
          var r = n.flags;
          switch (n.tag) {
            case 0:
            case 11:
            case 15:
              (Ks(e, n), 4 & r && gs(5, n));
              break;
            case 1:
              if ((Ks(e, n), 4 & r))
                if (((e = n.stateNode), null === t))
                  try {
                    e.componentDidMount();
                  } catch (o) {
                    Sc(n, n.return, o);
                  }
                else {
                  var a = Si(n.type, t.memoizedProps);
                  t = t.memoizedState;
                  try {
                    e.componentDidUpdate(
                      a,
                      t,
                      e.__reactInternalSnapshotBeforeUpdate,
                    );
                  } catch (i) {
                    Sc(n, n.return, i);
                  }
                }
              (64 & r && bs(n), 512 & r && xs(n, n.return));
              break;
            case 3:
              if ((Ks(e, n), 64 & r && null !== (e = n.updateQueue))) {
                if (((t = null), null !== n.child))
                  switch (n.child.tag) {
                    case 27:
                    case 5:
                    case 1:
                      t = n.child.stateNode;
                  }
                try {
                  Cl(e, t);
                } catch (o) {
                  Sc(n, n.return, o);
                }
              }
              break;
            case 27:
              null === t && 4 & r && zs(n);
            case 26:
            case 5:
              (Ks(e, n),
                null === t && 4 & r && ws(n),
                512 & r && xs(n, n.return));
              break;
            case 12:
              Ks(e, n);
              break;
            case 31:
              (Ks(e, n), 4 & r && Us(e, n));
              break;
            case 13:
              (Ks(e, n),
                4 & r && Hs(e, n),
                64 & r &&
                  null !== (e = n.memoizedState) &&
                  null !== (e = e.dehydrated) &&
                  (function (e, t) {
                    var n = e.ownerDocument;
                    if ("$~" === e.data) e._reactRetry = t;
                    else if ("$?" !== e.data || "loading" !== n.readyState) t();
                    else {
                      var r = function () {
                        (t(), n.removeEventListener("DOMContentLoaded", r));
                      };
                      (n.addEventListener("DOMContentLoaded", r),
                        (e._reactRetry = r));
                    }
                  })(e, (n = jc.bind(null, n))));
              break;
            case 22:
              if (!(r = null !== n.memoizedState || Ps)) {
                ((t = (null !== t && null !== t.memoizedState) || Ts),
                  (a = Ps));
                var l = Ts;
                ((Ps = r),
                  (Ts = t) && !l
                    ? Gs(e, n, 0 !== (8772 & n.subtreeFlags))
                    : Ks(e, n),
                  (Ps = a),
                  (Ts = l));
              }
              break;
            case 30:
              break;
            default:
              Ks(e, n);
          }
        }
        function Os(e) {
          var t = e.alternate;
          (null !== t && ((e.alternate = null), Os(t)),
            (e.child = null),
            (e.deletions = null),
            (e.sibling = null),
            5 === e.tag && null !== (t = e.stateNode) && Ye(t),
            (e.stateNode = null),
            (e.return = null),
            (e.dependencies = null),
            (e.memoizedProps = null),
            (e.memoizedState = null),
            (e.pendingProps = null),
            (e.stateNode = null),
            (e.updateQueue = null));
        }
        var Rs = null,
          Ds = !1;
        function Ms(e, t, n) {
          for (n = n.child; null !== n; ) (Fs(e, t, n), (n = n.sibling));
        }
        function Fs(e, t, n) {
          if (be && "function" === typeof be.onCommitFiberUnmount)
            try {
              be.onCommitFiberUnmount(ye, n);
            } catch (l) {}
          switch (n.tag) {
            case 26:
              (Ts || ks(n, t),
                Ms(e, t, n),
                n.memoizedState
                  ? n.memoizedState.count--
                  : n.stateNode && (n = n.stateNode).parentNode.removeChild(n));
              break;
            case 27:
              Ts || ks(n, t);
              var r = Rs,
                a = Ds;
              (Cd(n.type) && ((Rs = n.stateNode), (Ds = !1)),
                Ms(e, t, n),
                Md(n.stateNode),
                (Rs = r),
                (Ds = a));
              break;
            case 5:
              Ts || ks(n, t);
            case 6:
              if (
                ((r = Rs),
                (a = Ds),
                (Rs = null),
                Ms(e, t, n),
                (Ds = a),
                null !== (Rs = r))
              )
                if (Ds)
                  try {
                    (9 === Rs.nodeType
                      ? Rs.body
                      : "HTML" === Rs.nodeName
                        ? Rs.ownerDocument.body
                        : Rs
                    ).removeChild(n.stateNode);
                  } catch (o) {
                    Sc(n, t, o);
                  }
                else
                  try {
                    Rs.removeChild(n.stateNode);
                  } catch (o) {
                    Sc(n, t, o);
                  }
              break;
            case 18:
              null !== Rs &&
                (Ds
                  ? (jd(
                      9 === (e = Rs).nodeType
                        ? e.body
                        : "HTML" === e.nodeName
                          ? e.ownerDocument.body
                          : e,
                      n.stateNode,
                    ),
                    $f(e))
                  : jd(Rs, n.stateNode));
              break;
            case 4:
              ((r = Rs),
                (a = Ds),
                (Rs = n.stateNode.containerInfo),
                (Ds = !0),
                Ms(e, t, n),
                (Rs = r),
                (Ds = a));
              break;
            case 0:
            case 11:
            case 14:
            case 15:
              (ys(2, n, t), Ts || ys(4, n, t), Ms(e, t, n));
              break;
            case 1:
              (Ts ||
                (ks(n, t),
                "function" === typeof (r = n.stateNode).componentWillUnmount &&
                  vs(n, t, r)),
                Ms(e, t, n));
              break;
            case 21:
              Ms(e, t, n);
              break;
            case 22:
              ((Ts = (r = Ts) || null !== n.memoizedState),
                Ms(e, t, n),
                (Ts = r));
              break;
            default:
              Ms(e, t, n);
          }
        }
        function Us(e, t) {
          if (
            null === t.memoizedState &&
            null !== (e = t.alternate) &&
            null !== (e = e.memoizedState)
          ) {
            e = e.dehydrated;
            try {
              $f(e);
            } catch (n) {
              Sc(t, t.return, n);
            }
          }
        }
        function Hs(e, t) {
          if (
            null === t.memoizedState &&
            null !== (e = t.alternate) &&
            null !== (e = e.memoizedState) &&
            null !== (e = e.dehydrated)
          )
            try {
              $f(e);
            } catch (n) {
              Sc(t, t.return, n);
            }
        }
        function Bs(e, t) {
          var n = (function (e) {
            switch (e.tag) {
              case 31:
              case 13:
              case 19:
                var t = e.stateNode;
                return (null === t && (t = e.stateNode = new Ls()), t);
              case 22:
                return (
                  null === (t = (e = e.stateNode)._retryCache) &&
                    (t = e._retryCache = new Ls()),
                  t
                );
              default:
                throw Error(o(435, e.tag));
            }
          })(e);
          t.forEach(function (t) {
            if (!n.has(t)) {
              n.add(t);
              var r = zc.bind(null, e, t);
              t.then(r, r);
            }
          });
        }
        function Vs(e, t) {
          var n = t.deletions;
          if (null !== n)
            for (var r = 0; r < n.length; r++) {
              var a = n[r],
                l = e,
                i = t,
                s = i;
              e: for (; null !== s; ) {
                switch (s.tag) {
                  case 27:
                    if (Cd(s.type)) {
                      ((Rs = s.stateNode), (Ds = !1));
                      break e;
                    }
                    break;
                  case 5:
                    ((Rs = s.stateNode), (Ds = !1));
                    break e;
                  case 3:
                  case 4:
                    ((Rs = s.stateNode.containerInfo), (Ds = !0));
                    break e;
                }
                s = s.return;
              }
              if (null === Rs) throw Error(o(160));
              (Fs(l, i, a),
                (Rs = null),
                (Ds = !1),
                null !== (l = a.alternate) && (l.return = null),
                (a.return = null));
            }
          if (13886 & t.subtreeFlags)
            for (t = t.child; null !== t; ) ($s(t, e), (t = t.sibling));
        }
        var Ws = null;
        function $s(e, t) {
          var n = e.alternate,
            r = e.flags;
          switch (e.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
              (Vs(t, e),
                qs(e),
                4 & r && (ys(3, e, e.return), gs(3, e), ys(5, e, e.return)));
              break;
            case 1:
              (Vs(t, e),
                qs(e),
                512 & r && (Ts || null === n || ks(n, n.return)),
                64 & r &&
                  Ps &&
                  null !== (e = e.updateQueue) &&
                  null !== (r = e.callbacks) &&
                  ((n = e.shared.hiddenCallbacks),
                  (e.shared.hiddenCallbacks = null === n ? r : n.concat(r))));
              break;
            case 26:
              var a = Ws;
              if (
                (Vs(t, e),
                qs(e),
                512 & r && (Ts || null === n || ks(n, n.return)),
                4 & r)
              ) {
                var l = null !== n ? n.memoizedState : null;
                if (((r = e.memoizedState), null === n))
                  if (null === r)
                    if (null === e.stateNode) {
                      e: {
                        ((r = e.type),
                          (n = e.memoizedProps),
                          (a = a.ownerDocument || a));
                        t: switch (r) {
                          case "title":
                            ((!(l = a.getElementsByTagName("title")[0]) ||
                              l[Ke] ||
                              l[He] ||
                              "http://www.w3.org/2000/svg" === l.namespaceURI ||
                              l.hasAttribute("itemprop")) &&
                              ((l = a.createElement(r)),
                              a.head.insertBefore(
                                l,
                                a.querySelector("head > title"),
                              )),
                              fd(l, r, n),
                              (l[He] = e),
                              et(l),
                              (r = l));
                            break e;
                          case "link":
                            var i = nf("link", "href", a).get(
                              r + (n.href || ""),
                            );
                            if (i)
                              for (var s = 0; s < i.length; s++)
                                if (
                                  (l = i[s]).getAttribute("href") ===
                                    (null == n.href || "" === n.href
                                      ? null
                                      : n.href) &&
                                  l.getAttribute("rel") ===
                                    (null == n.rel ? null : n.rel) &&
                                  l.getAttribute("title") ===
                                    (null == n.title ? null : n.title) &&
                                  l.getAttribute("crossorigin") ===
                                    (null == n.crossOrigin
                                      ? null
                                      : n.crossOrigin)
                                ) {
                                  i.splice(s, 1);
                                  break t;
                                }
                            (fd((l = a.createElement(r)), r, n),
                              a.head.appendChild(l));
                            break;
                          case "meta":
                            if (
                              (i = nf("meta", "content", a).get(
                                r + (n.content || ""),
                              ))
                            )
                              for (s = 0; s < i.length; s++)
                                if (
                                  (l = i[s]).getAttribute("content") ===
                                    (null == n.content
                                      ? null
                                      : "" + n.content) &&
                                  l.getAttribute("name") ===
                                    (null == n.name ? null : n.name) &&
                                  l.getAttribute("property") ===
                                    (null == n.property ? null : n.property) &&
                                  l.getAttribute("http-equiv") ===
                                    (null == n.httpEquiv
                                      ? null
                                      : n.httpEquiv) &&
                                  l.getAttribute("charset") ===
                                    (null == n.charSet ? null : n.charSet)
                                ) {
                                  i.splice(s, 1);
                                  break t;
                                }
                            (fd((l = a.createElement(r)), r, n),
                              a.head.appendChild(l));
                            break;
                          default:
                            throw Error(o(468, r));
                        }
                        ((l[He] = e), et(l), (r = l));
                      }
                      e.stateNode = r;
                    } else rf(a, e.type, e.stateNode);
                  else e.stateNode = Xd(a, r, e.memoizedProps);
                else
                  l !== r
                    ? (null === l
                        ? null !== n.stateNode &&
                          (n = n.stateNode).parentNode.removeChild(n)
                        : l.count--,
                      null === r
                        ? rf(a, e.type, e.stateNode)
                        : Xd(a, r, e.memoizedProps))
                    : null === r &&
                      null !== e.stateNode &&
                      Ss(e, e.memoizedProps, n.memoizedProps);
              }
              break;
            case 27:
              (Vs(t, e),
                qs(e),
                512 & r && (Ts || null === n || ks(n, n.return)),
                null !== n && 4 & r && Ss(e, e.memoizedProps, n.memoizedProps));
              break;
            case 5:
              if (
                (Vs(t, e),
                qs(e),
                512 & r && (Ts || null === n || ks(n, n.return)),
                32 & e.flags)
              ) {
                a = e.stateNode;
                try {
                  Nt(a, "");
                } catch (m) {
                  Sc(e, e.return, m);
                }
              }
              (4 & r &&
                null != e.stateNode &&
                Ss(e, (a = e.memoizedProps), null !== n ? n.memoizedProps : a),
                1024 & r && (_s = !0));
              break;
            case 6:
              if ((Vs(t, e), qs(e), 4 & r)) {
                if (null === e.stateNode) throw Error(o(162));
                ((r = e.memoizedProps), (n = e.stateNode));
                try {
                  n.nodeValue = r;
                } catch (m) {
                  Sc(e, e.return, m);
                }
              }
              break;
            case 3:
              if (
                ((tf = null),
                (a = Ws),
                (Ws = Hd(t.containerInfo)),
                Vs(t, e),
                (Ws = a),
                qs(e),
                4 & r && null !== n && n.memoizedState.isDehydrated)
              )
                try {
                  $f(t.containerInfo);
                } catch (m) {
                  Sc(e, e.return, m);
                }
              _s && ((_s = !1), Qs(e));
              break;
            case 4:
              ((r = Ws),
                (Ws = Hd(e.stateNode.containerInfo)),
                Vs(t, e),
                qs(e),
                (Ws = r));
              break;
            case 12:
            default:
              (Vs(t, e), qs(e));
              break;
            case 31:
            case 19:
              (Vs(t, e),
                qs(e),
                4 & r &&
                  null !== (r = e.updateQueue) &&
                  ((e.updateQueue = null), Bs(e, r)));
              break;
            case 13:
              (Vs(t, e),
                qs(e),
                8192 & e.child.flags &&
                  (null !== e.memoizedState) !==
                    (null !== n && null !== n.memoizedState) &&
                  (Lu = se()),
                4 & r &&
                  null !== (r = e.updateQueue) &&
                  ((e.updateQueue = null), Bs(e, r)));
              break;
            case 22:
              a = null !== e.memoizedState;
              var u = null !== n && null !== n.memoizedState,
                c = Ps,
                d = Ts;
              if (
                ((Ps = c || a),
                (Ts = d || u),
                Vs(t, e),
                (Ts = d),
                (Ps = c),
                qs(e),
                8192 & r)
              )
                e: for (
                  t = e.stateNode,
                    t._visibility = a ? -2 & t._visibility : 1 | t._visibility,
                    a && (null === n || u || Ps || Ts || Ys(e)),
                    n = null,
                    t = e;
                  ;
                ) {
                  if (5 === t.tag || 26 === t.tag) {
                    if (null === n) {
                      u = n = t;
                      try {
                        if (((l = u.stateNode), a))
                          "function" === typeof (i = l.style).setProperty
                            ? i.setProperty("display", "none", "important")
                            : (i.display = "none");
                        else {
                          s = u.stateNode;
                          var f = u.memoizedProps.style,
                            p =
                              void 0 !== f &&
                              null !== f &&
                              f.hasOwnProperty("display")
                                ? f.display
                                : null;
                          s.style.display =
                            null == p || "boolean" === typeof p
                              ? ""
                              : ("" + p).trim();
                        }
                      } catch (m) {
                        Sc(u, u.return, m);
                      }
                    }
                  } else if (6 === t.tag) {
                    if (null === n) {
                      u = t;
                      try {
                        u.stateNode.nodeValue = a ? "" : u.memoizedProps;
                      } catch (m) {
                        Sc(u, u.return, m);
                      }
                    }
                  } else if (18 === t.tag) {
                    if (null === n) {
                      u = t;
                      try {
                        var h = u.stateNode;
                        a ? zd(h, !0) : zd(u.stateNode, !1);
                      } catch (m) {
                        Sc(u, u.return, m);
                      }
                    }
                  } else if (
                    ((22 !== t.tag && 23 !== t.tag) ||
                      null === t.memoizedState ||
                      t === e) &&
                    null !== t.child
                  ) {
                    ((t.child.return = t), (t = t.child));
                    continue;
                  }
                  if (t === e) break e;
                  for (; null === t.sibling; ) {
                    if (null === t.return || t.return === e) break e;
                    (n === t && (n = null), (t = t.return));
                  }
                  (n === t && (n = null),
                    (t.sibling.return = t.return),
                    (t = t.sibling));
                }
              4 & r &&
                null !== (r = e.updateQueue) &&
                null !== (n = r.retryQueue) &&
                ((r.retryQueue = null), Bs(e, n));
            case 30:
            case 21:
          }
        }
        function qs(e) {
          var t = e.flags;
          if (2 & t) {
            try {
              for (var n, r = e.return; null !== r; ) {
                if (Ns(r)) {
                  n = r;
                  break;
                }
                r = r.return;
              }
              if (null == n) throw Error(o(160));
              switch (n.tag) {
                case 27:
                  var a = n.stateNode;
                  js(e, Es(e), a);
                  break;
                case 5:
                  var l = n.stateNode;
                  (32 & n.flags && (Nt(l, ""), (n.flags &= -33)),
                    js(e, Es(e), l));
                  break;
                case 3:
                case 4:
                  var i = n.stateNode.containerInfo;
                  Cs(e, Es(e), i);
                  break;
                default:
                  throw Error(o(161));
              }
            } catch (s) {
              Sc(e, e.return, s);
            }
            e.flags &= -3;
          }
          4096 & t && (e.flags &= -4097);
        }
        function Qs(e) {
          if (1024 & e.subtreeFlags)
            for (e = e.child; null !== e; ) {
              var t = e;
              (Qs(t),
                5 === t.tag && 1024 & t.flags && t.stateNode.reset(),
                (e = e.sibling));
            }
        }
        function Ks(e, t) {
          if (8772 & t.subtreeFlags)
            for (t = t.child; null !== t; )
              (Is(e, t.alternate, t), (t = t.sibling));
        }
        function Ys(e) {
          for (e = e.child; null !== e; ) {
            var t = e;
            switch (t.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                (ys(4, t, t.return), Ys(t));
                break;
              case 1:
                ks(t, t.return);
                var n = t.stateNode;
                ("function" === typeof n.componentWillUnmount &&
                  vs(t, t.return, n),
                  Ys(t));
                break;
              case 27:
                Md(t.stateNode);
              case 26:
              case 5:
                (ks(t, t.return), Ys(t));
                break;
              case 22:
                null === t.memoizedState && Ys(t);
                break;
              default:
                Ys(t);
            }
            e = e.sibling;
          }
        }
        function Gs(e, t, n) {
          for (
            n = n && 0 !== (8772 & t.subtreeFlags), t = t.child;
            null !== t;
          ) {
            var r = t.alternate,
              a = e,
              l = t,
              o = l.flags;
            switch (l.tag) {
              case 0:
              case 11:
              case 15:
                (Gs(a, l, n), gs(4, l));
                break;
              case 1:
                if (
                  (Gs(a, l, n),
                  "function" ===
                    typeof (a = (r = l).stateNode).componentDidMount)
                )
                  try {
                    a.componentDidMount();
                  } catch (u) {
                    Sc(r, r.return, u);
                  }
                if (null !== (a = (r = l).updateQueue)) {
                  var i = r.stateNode;
                  try {
                    var s = a.shared.hiddenCallbacks;
                    if (null !== s)
                      for (
                        a.shared.hiddenCallbacks = null, a = 0;
                        a < s.length;
                        a++
                      )
                        El(s[a], i);
                  } catch (u) {
                    Sc(r, r.return, u);
                  }
                }
                (n && 64 & o && bs(l), xs(l, l.return));
                break;
              case 27:
                zs(l);
              case 26:
              case 5:
                (Gs(a, l, n),
                  n && null === r && 4 & o && ws(l),
                  xs(l, l.return));
                break;
              case 12:
                Gs(a, l, n);
                break;
              case 31:
                (Gs(a, l, n), n && 4 & o && Us(a, l));
                break;
              case 13:
                (Gs(a, l, n), n && 4 & o && Hs(a, l));
                break;
              case 22:
                (null === l.memoizedState && Gs(a, l, n), xs(l, l.return));
                break;
              case 30:
                break;
              default:
                Gs(a, l, n);
            }
            t = t.sibling;
          }
        }
        function Xs(e, t) {
          var n = null;
          (null !== e &&
            null !== e.memoizedState &&
            null !== e.memoizedState.cachePool &&
            (n = e.memoizedState.cachePool.pool),
            (e = null),
            null !== t.memoizedState &&
              null !== t.memoizedState.cachePool &&
              (e = t.memoizedState.cachePool.pool),
            e !== n && (null != e && e.refCount++, null != n && Ua(n)));
        }
        function Zs(e, t) {
          ((e = null),
            null !== t.alternate && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache) !== e &&
              (t.refCount++, null != e && Ua(e)));
        }
        function Js(e, t, n, r) {
          if (10256 & t.subtreeFlags)
            for (t = t.child; null !== t; ) (eu(e, t, n, r), (t = t.sibling));
        }
        function eu(e, t, n, r) {
          var a = t.flags;
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              (Js(e, t, n, r), 2048 & a && gs(9, t));
              break;
            case 1:
            case 31:
            case 13:
            default:
              Js(e, t, n, r);
              break;
            case 3:
              (Js(e, t, n, r),
                2048 & a &&
                  ((e = null),
                  null !== t.alternate && (e = t.alternate.memoizedState.cache),
                  (t = t.memoizedState.cache) !== e &&
                    (t.refCount++, null != e && Ua(e))));
              break;
            case 12:
              if (2048 & a) {
                (Js(e, t, n, r), (e = t.stateNode));
                try {
                  var l = t.memoizedProps,
                    o = l.id,
                    i = l.onPostCommit;
                  "function" === typeof i &&
                    i(
                      o,
                      null === t.alternate ? "mount" : "update",
                      e.passiveEffectDuration,
                      -0,
                    );
                } catch (s) {
                  Sc(t, t.return, s);
                }
              } else Js(e, t, n, r);
              break;
            case 23:
              break;
            case 22:
              ((l = t.stateNode),
                (o = t.alternate),
                null !== t.memoizedState
                  ? 2 & l._visibility
                    ? Js(e, t, n, r)
                    : nu(e, t)
                  : 2 & l._visibility
                    ? Js(e, t, n, r)
                    : ((l._visibility |= 2),
                      tu(e, t, n, r, 0 !== (10256 & t.subtreeFlags) || !1)),
                2048 & a && Xs(o, t));
              break;
            case 24:
              (Js(e, t, n, r), 2048 & a && Zs(t.alternate, t));
          }
        }
        function tu(e, t, n, r, a) {
          for (
            a = a && (0 !== (10256 & t.subtreeFlags) || !1), t = t.child;
            null !== t;
          ) {
            var l = e,
              o = t,
              i = n,
              s = r,
              u = o.flags;
            switch (o.tag) {
              case 0:
              case 11:
              case 15:
                (tu(l, o, i, s, a), gs(8, o));
                break;
              case 23:
                break;
              case 22:
                var c = o.stateNode;
                (null !== o.memoizedState
                  ? 2 & c._visibility
                    ? tu(l, o, i, s, a)
                    : nu(l, o)
                  : ((c._visibility |= 2), tu(l, o, i, s, a)),
                  a && 2048 & u && Xs(o.alternate, o));
                break;
              case 24:
                (tu(l, o, i, s, a), a && 2048 & u && Zs(o.alternate, o));
                break;
              default:
                tu(l, o, i, s, a);
            }
            t = t.sibling;
          }
        }
        function nu(e, t) {
          if (10256 & t.subtreeFlags)
            for (t = t.child; null !== t; ) {
              var n = e,
                r = t,
                a = r.flags;
              switch (r.tag) {
                case 22:
                  (nu(n, r), 2048 & a && Xs(r.alternate, r));
                  break;
                case 24:
                  (nu(n, r), 2048 & a && Zs(r.alternate, r));
                  break;
                default:
                  nu(n, r);
              }
              t = t.sibling;
            }
        }
        var ru = 8192;
        function au(e, t, n) {
          if (e.subtreeFlags & ru)
            for (e = e.child; null !== e; ) (lu(e, t, n), (e = e.sibling));
        }
        function lu(e, t, n) {
          switch (e.tag) {
            case 26:
              (au(e, t, n),
                e.flags & ru &&
                  null !== e.memoizedState &&
                  (function (e, t, n, r) {
                    if (
                      "stylesheet" === n.type &&
                      ("string" !== typeof r.media ||
                        !1 !== matchMedia(r.media).matches) &&
                      0 === (4 & n.state.loading)
                    ) {
                      if (null === n.instance) {
                        var a = qd(r.href),
                          l = t.querySelector(Qd(a));
                        if (l)
                          return (
                            null !== (t = l._p) &&
                              "object" === typeof t &&
                              "function" === typeof t.then &&
                              (e.count++, (e = of.bind(e)), t.then(e, e)),
                            (n.state.loading |= 4),
                            (n.instance = l),
                            void et(l)
                          );
                        ((l = t.ownerDocument || t),
                          (r = Kd(r)),
                          (a = Fd.get(a)) && Jd(r, a),
                          et((l = l.createElement("link"))));
                        var o = l;
                        ((o._p = new Promise(function (e, t) {
                          ((o.onload = e), (o.onerror = t));
                        })),
                          fd(l, "link", r),
                          (n.instance = l));
                      }
                      (null === e.stylesheets && (e.stylesheets = new Map()),
                        e.stylesheets.set(n, t),
                        (t = n.state.preload) &&
                          0 === (3 & n.state.loading) &&
                          (e.count++,
                          (n = of.bind(e)),
                          t.addEventListener("load", n),
                          t.addEventListener("error", n)));
                    }
                  })(n, Ws, e.memoizedState, e.memoizedProps));
              break;
            case 5:
            default:
              au(e, t, n);
              break;
            case 3:
            case 4:
              var r = Ws;
              ((Ws = Hd(e.stateNode.containerInfo)), au(e, t, n), (Ws = r));
              break;
            case 22:
              null === e.memoizedState &&
                (null !== (r = e.alternate) && null !== r.memoizedState
                  ? ((r = ru), (ru = 16777216), au(e, t, n), (ru = r))
                  : au(e, t, n));
          }
        }
        function ou(e) {
          var t = e.alternate;
          if (null !== t && null !== (e = t.child)) {
            t.child = null;
            do {
              ((t = e.sibling), (e.sibling = null), (e = t));
            } while (null !== e);
          }
        }
        function iu(e) {
          var t = e.deletions;
          if (0 !== (16 & e.flags)) {
            if (null !== t)
              for (var n = 0; n < t.length; n++) {
                var r = t[n];
                ((As = r), cu(r, e));
              }
            ou(e);
          }
          if (10256 & e.subtreeFlags)
            for (e = e.child; null !== e; ) (su(e), (e = e.sibling));
        }
        function su(e) {
          switch (e.tag) {
            case 0:
            case 11:
            case 15:
              (iu(e), 2048 & e.flags && ys(9, e, e.return));
              break;
            case 3:
            case 12:
            default:
              iu(e);
              break;
            case 22:
              var t = e.stateNode;
              null !== e.memoizedState &&
              2 & t._visibility &&
              (null === e.return || 13 !== e.return.tag)
                ? ((t._visibility &= -3), uu(e))
                : iu(e);
          }
        }
        function uu(e) {
          var t = e.deletions;
          if (0 !== (16 & e.flags)) {
            if (null !== t)
              for (var n = 0; n < t.length; n++) {
                var r = t[n];
                ((As = r), cu(r, e));
              }
            ou(e);
          }
          for (e = e.child; null !== e; ) {
            switch ((t = e).tag) {
              case 0:
              case 11:
              case 15:
                (ys(8, t, t.return), uu(t));
                break;
              case 22:
                2 & (n = t.stateNode)._visibility &&
                  ((n._visibility &= -3), uu(t));
                break;
              default:
                uu(t);
            }
            e = e.sibling;
          }
        }
        function cu(e, t) {
          for (; null !== As; ) {
            var n = As;
            switch (n.tag) {
              case 0:
              case 11:
              case 15:
                ys(8, n, t);
                break;
              case 23:
              case 22:
                if (
                  null !== n.memoizedState &&
                  null !== n.memoizedState.cachePool
                ) {
                  var r = n.memoizedState.cachePool.pool;
                  null != r && r.refCount++;
                }
                break;
              case 24:
                Ua(n.memoizedState.cache);
            }
            if (null !== (r = n.child)) ((r.return = n), (As = r));
            else
              e: for (n = e; null !== As; ) {
                var a = (r = As).sibling,
                  l = r.return;
                if ((Os(r), r === n)) {
                  As = null;
                  break e;
                }
                if (null !== a) {
                  ((a.return = l), (As = a));
                  break e;
                }
                As = l;
              }
          }
        }
        var du = {
            getCacheForType: function (e) {
              var t = La(Ma),
                n = t.data.get(e);
              return (void 0 === n && ((n = e()), t.data.set(e, n)), n);
            },
            cacheSignal: function () {
              return La(Ma).controller.signal;
            },
          },
          fu = "function" === typeof WeakMap ? WeakMap : Map,
          pu = 0,
          hu = null,
          mu = null,
          gu = 0,
          yu = 0,
          bu = null,
          vu = !1,
          xu = !1,
          ku = !1,
          wu = 0,
          Su = 0,
          Nu = 0,
          Eu = 0,
          Cu = 0,
          ju = 0,
          zu = 0,
          Pu = null,
          Tu = null,
          _u = !1,
          Lu = 0,
          Au = 0,
          Iu = 1 / 0,
          Ou = null,
          Ru = null,
          Du = 0,
          Mu = null,
          Fu = null,
          Uu = 0,
          Hu = 0,
          Bu = null,
          Vu = null,
          Wu = 0,
          $u = null;
        function qu() {
          return 0 !== (2 & pu) && 0 !== gu
            ? gu & -gu
            : null !== I.T
              ? Bc()
              : Me();
        }
        function Qu() {
          if (0 === ju)
            if (0 === (536870912 & gu) || da) {
              var e = Ne;
              (0 === (3932160 & (Ne <<= 1)) && (Ne = 262144), (ju = e));
            } else ju = 536870912;
          return (null !== (e = Ll.current) && (e.flags |= 32), ju);
        }
        function Ku(e, t, n) {
          (((e !== hu || (2 !== yu && 9 !== yu)) &&
            null === e.cancelPendingCommit) ||
            (tc(e, 0), Zu(e, gu, ju, !1)),
            Le(e, n),
            (0 !== (2 & pu) && e === hu) ||
              (e === hu &&
                (0 === (2 & pu) && (Eu |= n), 4 === Su && Zu(e, gu, ju, !1)),
              Oc(e)));
        }
        function Yu(e, t, n) {
          if (0 !== (6 & pu)) throw Error(o(327));
          for (
            var r =
                (!n && 0 === (127 & t) && 0 === (t & e.expiredLanes)) ||
                ze(e, t),
              a = r
                ? (function (e, t) {
                    var n = pu;
                    pu |= 2;
                    var r = ac(),
                      a = lc();
                    hu !== e || gu !== t
                      ? ((Ou = null), (Iu = se() + 500), tc(e, t))
                      : (xu = ze(e, t));
                    e: for (;;)
                      try {
                        if (0 !== yu && null !== mu) {
                          t = mu;
                          var l = bu;
                          t: switch (yu) {
                            case 1:
                              ((yu = 0), (bu = null), fc(e, t, l, 1));
                              break;
                            case 2:
                            case 9:
                              if (tl(l)) {
                                ((yu = 0), (bu = null), dc(t));
                                break;
                              }
                              ((t = function () {
                                ((2 !== yu && 9 !== yu) || hu !== e || (yu = 7),
                                  Oc(e));
                              }),
                                l.then(t, t));
                              break e;
                            case 3:
                              yu = 7;
                              break e;
                            case 4:
                              yu = 5;
                              break e;
                            case 7:
                              tl(l)
                                ? ((yu = 0), (bu = null), dc(t))
                                : ((yu = 0), (bu = null), fc(e, t, l, 7));
                              break;
                            case 5:
                              var i = null;
                              switch (mu.tag) {
                                case 26:
                                  i = mu.memoizedState;
                                case 5:
                                case 27:
                                  var s = mu;
                                  if (i ? af(i) : s.stateNode.complete) {
                                    ((yu = 0), (bu = null));
                                    var u = s.sibling;
                                    if (null !== u) mu = u;
                                    else {
                                      var c = s.return;
                                      null !== c
                                        ? ((mu = c), pc(c))
                                        : (mu = null);
                                    }
                                    break t;
                                  }
                              }
                              ((yu = 0), (bu = null), fc(e, t, l, 5));
                              break;
                            case 6:
                              ((yu = 0), (bu = null), fc(e, t, l, 6));
                              break;
                            case 8:
                              (ec(), (Su = 6));
                              break e;
                            default:
                              throw Error(o(462));
                          }
                        }
                        uc();
                        break;
                      } catch (d) {
                        nc(e, d);
                      }
                    return (
                      (Na = Sa = null),
                      (I.H = r),
                      (I.A = a),
                      (pu = n),
                      null !== mu ? 0 : ((hu = null), (gu = 0), Tr(), Su)
                    );
                  })(e, t)
                : ic(e, t, !0),
              l = r;
            ;
          ) {
            if (0 === a) {
              xu && !r && Zu(e, t, 0, !1);
              break;
            }
            if (((n = e.current.alternate), !l || Xu(n))) {
              if (2 === a) {
                if (((l = t), e.errorRecoveryDisabledLanes & l)) var i = 0;
                else
                  i =
                    0 !== (i = -536870913 & e.pendingLanes)
                      ? i
                      : 536870912 & i
                        ? 536870912
                        : 0;
                if (0 !== i) {
                  t = i;
                  e: {
                    var s = e;
                    a = Pu;
                    var u = s.current.memoizedState.isDehydrated;
                    if (
                      (u && (tc(s, i).flags |= 256), 2 !== (i = ic(s, i, !1)))
                    ) {
                      if (ku && !u) {
                        ((s.errorRecoveryDisabledLanes |= l),
                          (Eu |= l),
                          (a = 4));
                        break e;
                      }
                      ((l = Tu),
                        (Tu = a),
                        null !== l &&
                          (null === Tu ? (Tu = l) : Tu.push.apply(Tu, l)));
                    }
                    a = i;
                  }
                  if (((l = !1), 2 !== a)) continue;
                }
              }
              if (1 === a) {
                (tc(e, 0), Zu(e, t, 0, !0));
                break;
              }
              e: {
                switch (((r = e), (l = a))) {
                  case 0:
                  case 1:
                    throw Error(o(345));
                  case 4:
                    if ((4194048 & t) !== t) break;
                  case 6:
                    Zu(r, t, ju, !vu);
                    break e;
                  case 2:
                    Tu = null;
                    break;
                  case 3:
                  case 5:
                    break;
                  default:
                    throw Error(o(329));
                }
                if ((62914560 & t) === t && 10 < (a = Lu + 300 - se())) {
                  if ((Zu(r, t, ju, !vu), 0 !== je(r, 0, !0))) break e;
                  ((Uu = t),
                    (r.timeoutHandle = kd(
                      Gu.bind(
                        null,
                        r,
                        n,
                        Tu,
                        Ou,
                        _u,
                        t,
                        ju,
                        Eu,
                        zu,
                        vu,
                        l,
                        "Throttled",
                        -0,
                        0,
                      ),
                      a,
                    )));
                } else Gu(r, n, Tu, Ou, _u, t, ju, Eu, zu, vu, l, null, -0, 0);
              }
              break;
            }
            ((a = ic(e, t, !1)), (l = !1));
          }
          Oc(e);
        }
        function Gu(e, t, n, r, a, l, o, i, s, u, c, d, f, p) {
          if (
            ((e.timeoutHandle = -1),
            8192 & (d = t.subtreeFlags) || 16785408 === (16785408 & d))
          ) {
            lu(
              t,
              l,
              (d = {
                stylesheets: null,
                count: 0,
                imgCount: 0,
                imgBytes: 0,
                suspenseyImages: [],
                waitingForImages: !0,
                waitingForViewTransition: !1,
                unsuspend: Lt,
              }),
            );
            var h =
              (62914560 & l) === l
                ? Lu - se()
                : (4194048 & l) === l
                  ? Au - se()
                  : 0;
            if (
              null !==
              (h = (function (e, t) {
                return (
                  e.stylesheets && 0 === e.count && uf(e, e.stylesheets),
                  0 < e.count || 0 < e.imgCount
                    ? function (n) {
                        var r = setTimeout(function () {
                          if (
                            (e.stylesheets && uf(e, e.stylesheets), e.unsuspend)
                          ) {
                            var t = e.unsuspend;
                            ((e.unsuspend = null), t());
                          }
                        }, 6e4 + t);
                        0 < e.imgBytes &&
                          0 === lf &&
                          (lf =
                            62500 *
                            (function () {
                              if (
                                "function" ===
                                typeof performance.getEntriesByType
                              ) {
                                for (
                                  var e = 0,
                                    t = 0,
                                    n =
                                      performance.getEntriesByType("resource"),
                                    r = 0;
                                  r < n.length;
                                  r++
                                ) {
                                  var a = n[r],
                                    l = a.transferSize,
                                    o = a.initiatorType,
                                    i = a.duration;
                                  if (l && i && pd(o)) {
                                    for (
                                      o = 0, i = a.responseEnd, r += 1;
                                      r < n.length;
                                      r++
                                    ) {
                                      var s = n[r],
                                        u = s.startTime;
                                      if (u > i) break;
                                      var c = s.transferSize,
                                        d = s.initiatorType;
                                      c &&
                                        pd(d) &&
                                        (o +=
                                          c *
                                          ((s = s.responseEnd) < i
                                            ? 1
                                            : (i - u) / (s - u)));
                                    }
                                    if (
                                      (--r,
                                      (t += (8 * (l + o)) / (a.duration / 1e3)),
                                      10 < ++e)
                                    )
                                      break;
                                  }
                                }
                                if (0 < e) return t / e / 1e6;
                              }
                              return navigator.connection &&
                                "number" ===
                                  typeof (e = navigator.connection.downlink)
                                ? e
                                : 5;
                            })());
                        var a = setTimeout(
                          function () {
                            if (
                              ((e.waitingForImages = !1),
                              0 === e.count &&
                                (e.stylesheets && uf(e, e.stylesheets),
                                e.unsuspend))
                            ) {
                              var t = e.unsuspend;
                              ((e.unsuspend = null), t());
                            }
                          },
                          (e.imgBytes > lf ? 50 : 800) + t,
                        );
                        return (
                          (e.unsuspend = n),
                          function () {
                            ((e.unsuspend = null),
                              clearTimeout(r),
                              clearTimeout(a));
                          }
                        );
                      }
                    : null
                );
              })(d, h))
            )
              return (
                (Uu = l),
                (e.cancelPendingCommit = h(
                  mc.bind(null, e, t, l, n, r, a, o, i, s, c, d, null, f, p),
                )),
                void Zu(e, l, o, !u)
              );
          }
          mc(e, t, l, n, r, a, o, i, s);
        }
        function Xu(e) {
          for (var t = e; ; ) {
            var n = t.tag;
            if (
              (0 === n || 11 === n || 15 === n) &&
              16384 & t.flags &&
              null !== (n = t.updateQueue) &&
              null !== (n = n.stores)
            )
              for (var r = 0; r < n.length; r++) {
                var a = n[r],
                  l = a.getSnapshot;
                a = a.value;
                try {
                  if (!Zn(l(), a)) return !1;
                } catch (o) {
                  return !1;
                }
              }
            if (((n = t.child), 16384 & t.subtreeFlags && null !== n))
              ((n.return = t), (t = n));
            else {
              if (t === e) break;
              for (; null === t.sibling; ) {
                if (null === t.return || t.return === e) return !0;
                t = t.return;
              }
              ((t.sibling.return = t.return), (t = t.sibling));
            }
          }
          return !0;
        }
        function Zu(e, t, n, r) {
          ((t &= ~Cu),
            (t &= ~Eu),
            (e.suspendedLanes |= t),
            (e.pingedLanes &= ~t),
            r && (e.warmLanes |= t),
            (r = e.expirationTimes));
          for (var a = t; 0 < a; ) {
            var l = 31 - xe(a),
              o = 1 << l;
            ((r[l] = -1), (a &= ~o));
          }
          0 !== n && Ae(e, n, t);
        }
        function Ju() {
          return 0 !== (6 & pu) || (Rc(0, !1), !1);
        }
        function ec() {
          if (null !== mu) {
            if (0 === yu) var e = mu.return;
            else
              ((Na = Sa = null), oo((e = mu)), (il = null), (sl = 0), (e = mu));
            for (; null !== e; ) (ms(e.alternate, e), (e = e.return));
            mu = null;
          }
        }
        function tc(e, t) {
          var n = e.timeoutHandle;
          (-1 !== n && ((e.timeoutHandle = -1), wd(n)),
            null !== (n = e.cancelPendingCommit) &&
              ((e.cancelPendingCommit = null), n()),
            (Uu = 0),
            ec(),
            (hu = e),
            (mu = n = Ur(e.current, null)),
            (gu = t),
            (yu = 0),
            (bu = null),
            (vu = !1),
            (xu = ze(e, t)),
            (ku = !1),
            (zu = ju = Cu = Eu = Nu = Su = 0),
            (Tu = Pu = null),
            (_u = !1),
            0 !== (8 & t) && (t |= 32 & t));
          var r = e.entangledLanes;
          if (0 !== r)
            for (e = e.entanglements, r &= t; 0 < r; ) {
              var a = 31 - xe(r),
                l = 1 << a;
              ((t |= e[a]), (r &= ~l));
            }
          return ((wu = t), Tr(), n);
        }
        function nc(e, t) {
          ((Bl = null),
            (I.H = mi),
            t === Xa || t === Ja
              ? ((t = ll()), (yu = 3))
              : t === Za
                ? ((t = ll()), (yu = 4))
                : (yu =
                    t === Li
                      ? 8
                      : null !== t &&
                          "object" === typeof t &&
                          "function" === typeof t.then
                        ? 6
                        : 1),
            (bu = t),
            null === mu && ((Su = 1), ji(e, Kr(t, e.current))));
        }
        function rc() {
          var e = Ll.current;
          return (
            null === e ||
            ((4194048 & gu) === gu
              ? null === Al
              : ((62914560 & gu) === gu || 0 !== (536870912 & gu)) && e === Al)
          );
        }
        function ac() {
          var e = I.H;
          return ((I.H = mi), null === e ? mi : e);
        }
        function lc() {
          var e = I.A;
          return ((I.A = du), e);
        }
        function oc() {
          ((Su = 4),
            vu || ((4194048 & gu) !== gu && null !== Ll.current) || (xu = !0),
            (0 === (134217727 & Nu) && 0 === (134217727 & Eu)) ||
              null === hu ||
              Zu(hu, gu, ju, !1));
        }
        function ic(e, t, n) {
          var r = pu;
          pu |= 2;
          var a = ac(),
            l = lc();
          ((hu === e && gu === t) || ((Ou = null), tc(e, t)), (t = !1));
          var o = Su;
          e: for (;;)
            try {
              if (0 !== yu && null !== mu) {
                var i = mu,
                  s = bu;
                switch (yu) {
                  case 8:
                    (ec(), (o = 6));
                    break e;
                  case 3:
                  case 2:
                  case 9:
                  case 6:
                    null === Ll.current && (t = !0);
                    var u = yu;
                    if (((yu = 0), (bu = null), fc(e, i, s, u), n && xu)) {
                      o = 0;
                      break e;
                    }
                    break;
                  default:
                    ((u = yu), (yu = 0), (bu = null), fc(e, i, s, u));
                }
              }
              (sc(), (o = Su));
              break;
            } catch (c) {
              nc(e, c);
            }
          return (
            t && e.shellSuspendCounter++,
            (Na = Sa = null),
            (pu = r),
            (I.H = a),
            (I.A = l),
            null === mu && ((hu = null), (gu = 0), Tr()),
            o
          );
        }
        function sc() {
          for (; null !== mu; ) cc(mu);
        }
        function uc() {
          for (; null !== mu && !oe(); ) cc(mu);
        }
        function cc(e) {
          var t = os(e.alternate, e, wu);
          ((e.memoizedProps = e.pendingProps), null === t ? pc(e) : (mu = t));
        }
        function dc(e) {
          var t = e,
            n = t.alternate;
          switch (t.tag) {
            case 15:
            case 0:
              t = $i(n, t, t.pendingProps, t.type, void 0, gu);
              break;
            case 11:
              t = $i(n, t, t.pendingProps, t.type.render, t.ref, gu);
              break;
            case 5:
              oo(t);
            default:
              (ms(n, t), (t = os(n, (t = mu = Hr(t, wu)), wu)));
          }
          ((e.memoizedProps = e.pendingProps), null === t ? pc(e) : (mu = t));
        }
        function fc(e, t, n, r) {
          ((Na = Sa = null), oo(t), (il = null), (sl = 0));
          var a = t.return;
          try {
            if (
              (function (e, t, n, r, a) {
                if (
                  ((n.flags |= 32768),
                  null !== r &&
                    "object" === typeof r &&
                    "function" === typeof r.then)
                ) {
                  if (
                    (null !== (t = n.alternate) && Pa(t, n, a, !0),
                    null !== (n = Ll.current))
                  ) {
                    switch (n.tag) {
                      case 31:
                      case 13:
                        return (
                          null === Al
                            ? oc()
                            : null === n.alternate && 0 === Su && (Su = 3),
                          (n.flags &= -257),
                          (n.flags |= 65536),
                          (n.lanes = a),
                          r === el
                            ? (n.flags |= 16384)
                            : (null === (t = n.updateQueue)
                                ? (n.updateQueue = new Set([r]))
                                : t.add(r),
                              Nc(e, r, a)),
                          !1
                        );
                      case 22:
                        return (
                          (n.flags |= 65536),
                          r === el
                            ? (n.flags |= 16384)
                            : (null === (t = n.updateQueue)
                                ? ((t = {
                                    transitions: null,
                                    markerInstances: null,
                                    retryQueue: new Set([r]),
                                  }),
                                  (n.updateQueue = t))
                                : null === (n = t.retryQueue)
                                  ? (t.retryQueue = new Set([r]))
                                  : n.add(r),
                              Nc(e, r, a)),
                          !1
                        );
                    }
                    throw Error(o(435, n.tag));
                  }
                  return (Nc(e, r, a), oc(), !1);
                }
                if (da)
                  return (
                    null !== (t = Ll.current)
                      ? (0 === (65536 & t.flags) && (t.flags |= 256),
                        (t.flags |= 65536),
                        (t.lanes = a),
                        r !== ha &&
                          ka(Kr((e = Error(o(422), { cause: r })), n)))
                      : (r !== ha &&
                          ka(Kr((t = Error(o(423), { cause: r })), n)),
                        ((e = e.current.alternate).flags |= 65536),
                        (a &= -a),
                        (e.lanes |= a),
                        (r = Kr(r, n)),
                        kl(e, (a = Pi(e.stateNode, r, a))),
                        4 !== Su && (Su = 2)),
                    !1
                  );
                var l = Error(o(520), { cause: r });
                if (
                  ((l = Kr(l, n)),
                  null === Pu ? (Pu = [l]) : Pu.push(l),
                  4 !== Su && (Su = 2),
                  null === t)
                )
                  return !0;
                ((r = Kr(r, n)), (n = t));
                do {
                  switch (n.tag) {
                    case 3:
                      return (
                        (n.flags |= 65536),
                        (e = a & -a),
                        (n.lanes |= e),
                        kl(n, (e = Pi(n.stateNode, r, e))),
                        !1
                      );
                    case 1:
                      if (
                        ((t = n.type),
                        (l = n.stateNode),
                        0 === (128 & n.flags) &&
                          ("function" === typeof t.getDerivedStateFromError ||
                            (null !== l &&
                              "function" === typeof l.componentDidCatch &&
                              (null === Ru || !Ru.has(l)))))
                      )
                        return (
                          (n.flags |= 65536),
                          (a &= -a),
                          (n.lanes |= a),
                          _i((a = Ti(a)), e, n, r),
                          kl(n, a),
                          !1
                        );
                  }
                  n = n.return;
                } while (null !== n);
                return !1;
              })(e, a, t, n, gu)
            )
              return ((Su = 1), ji(e, Kr(n, e.current)), void (mu = null));
          } catch (l) {
            if (null !== a) throw ((mu = a), l);
            return ((Su = 1), ji(e, Kr(n, e.current)), void (mu = null));
          }
          32768 & t.flags
            ? (da || 1 === r
                ? (e = !0)
                : xu || 0 !== (536870912 & gu)
                  ? (e = !1)
                  : ((vu = e = !0),
                    (2 === r || 9 === r || 3 === r || 6 === r) &&
                      null !== (r = Ll.current) &&
                      13 === r.tag &&
                      (r.flags |= 16384)),
              hc(t, e))
            : pc(t);
        }
        function pc(e) {
          var t = e;
          do {
            if (0 !== (32768 & t.flags)) return void hc(t, vu);
            e = t.return;
            var n = ps(t.alternate, t, wu);
            if (null !== n) return void (mu = n);
            if (null !== (t = t.sibling)) return void (mu = t);
            mu = t = e;
          } while (null !== t);
          0 === Su && (Su = 5);
        }
        function hc(e, t) {
          do {
            var n = hs(e.alternate, e);
            if (null !== n) return ((n.flags &= 32767), void (mu = n));
            if (
              (null !== (n = e.return) &&
                ((n.flags |= 32768),
                (n.subtreeFlags = 0),
                (n.deletions = null)),
              !t && null !== (e = e.sibling))
            )
              return void (mu = e);
            mu = e = n;
          } while (null !== e);
          ((Su = 6), (mu = null));
        }
        function mc(e, t, n, r, a, l, i, s, u) {
          e.cancelPendingCommit = null;
          do {
            xc();
          } while (0 !== Du);
          if (0 !== (6 & pu)) throw Error(o(327));
          if (null !== t) {
            if (t === e.current) throw Error(o(177));
            if (
              ((l = t.lanes | t.childLanes),
              (function (e, t, n, r, a, l) {
                var o = e.pendingLanes;
                ((e.pendingLanes = n),
                  (e.suspendedLanes = 0),
                  (e.pingedLanes = 0),
                  (e.warmLanes = 0),
                  (e.expiredLanes &= n),
                  (e.entangledLanes &= n),
                  (e.errorRecoveryDisabledLanes &= n),
                  (e.shellSuspendCounter = 0));
                var i = e.entanglements,
                  s = e.expirationTimes,
                  u = e.hiddenUpdates;
                for (n = o & ~n; 0 < n; ) {
                  var c = 31 - xe(n),
                    d = 1 << c;
                  ((i[c] = 0), (s[c] = -1));
                  var f = u[c];
                  if (null !== f)
                    for (u[c] = null, c = 0; c < f.length; c++) {
                      var p = f[c];
                      null !== p && (p.lane &= -536870913);
                    }
                  n &= ~d;
                }
                (0 !== r && Ae(e, r, 0),
                  0 !== l &&
                    0 === a &&
                    0 !== e.tag &&
                    (e.suspendedLanes |= l & ~(o & ~t)));
              })(e, n, (l |= Pr), i, s, u),
              e === hu && ((mu = hu = null), (gu = 0)),
              (Fu = t),
              (Mu = e),
              (Uu = n),
              (Hu = l),
              (Bu = a),
              (Vu = r),
              0 !== (10256 & t.subtreeFlags) || 0 !== (10256 & t.flags)
                ? ((e.callbackNode = null),
                  (e.callbackPriority = 0),
                  ae(fe, function () {
                    return (kc(), null);
                  }))
                : ((e.callbackNode = null), (e.callbackPriority = 0)),
              (r = 0 !== (13878 & t.flags)),
              0 !== (13878 & t.subtreeFlags) || r)
            ) {
              ((r = I.T),
                (I.T = null),
                (a = O.p),
                (O.p = 2),
                (i = pu),
                (pu |= 4));
              try {
                !(function (e, t) {
                  if (((e = e.containerInfo), (hd = xf), ar((e = rr(e))))) {
                    if ("selectionStart" in e)
                      var n = { start: e.selectionStart, end: e.selectionEnd };
                    else
                      e: {
                        var r =
                          (n =
                            ((n = e.ownerDocument) && n.defaultView) || window)
                            .getSelection && n.getSelection();
                        if (r && 0 !== r.rangeCount) {
                          n = r.anchorNode;
                          var a = r.anchorOffset,
                            l = r.focusNode;
                          r = r.focusOffset;
                          try {
                            (n.nodeType, l.nodeType);
                          } catch (g) {
                            n = null;
                            break e;
                          }
                          var i = 0,
                            s = -1,
                            u = -1,
                            c = 0,
                            d = 0,
                            f = e,
                            p = null;
                          t: for (;;) {
                            for (
                              var h;
                              f !== n ||
                                (0 !== a && 3 !== f.nodeType) ||
                                (s = i + a),
                                f !== l ||
                                  (0 !== r && 3 !== f.nodeType) ||
                                  (u = i + r),
                                3 === f.nodeType && (i += f.nodeValue.length),
                                null !== (h = f.firstChild);
                            )
                              ((p = f), (f = h));
                            for (;;) {
                              if (f === e) break t;
                              if (
                                (p === n && ++c === a && (s = i),
                                p === l && ++d === r && (u = i),
                                null !== (h = f.nextSibling))
                              )
                                break;
                              p = (f = p).parentNode;
                            }
                            f = h;
                          }
                          n =
                            -1 === s || -1 === u ? null : { start: s, end: u };
                        } else n = null;
                      }
                    n = n || { start: 0, end: 0 };
                  } else n = null;
                  for (
                    md = { focusedElem: e, selectionRange: n }, xf = !1, As = t;
                    null !== As;
                  )
                    if (
                      ((e = (t = As).child),
                      0 !== (1028 & t.subtreeFlags) && null !== e)
                    )
                      ((e.return = t), (As = e));
                    else
                      for (; null !== As; ) {
                        switch (
                          ((l = (t = As).alternate), (e = t.flags), t.tag)
                        ) {
                          case 0:
                            if (
                              0 !== (4 & e) &&
                              null !==
                                (e =
                                  null !== (e = t.updateQueue)
                                    ? e.events
                                    : null)
                            )
                              for (n = 0; n < e.length; n++)
                                (a = e[n]).ref.impl = a.nextImpl;
                            break;
                          case 11:
                          case 15:
                          case 5:
                          case 26:
                          case 27:
                          case 6:
                          case 4:
                          case 17:
                            break;
                          case 1:
                            if (0 !== (1024 & e) && null !== l) {
                              ((e = void 0),
                                (n = t),
                                (a = l.memoizedProps),
                                (l = l.memoizedState),
                                (r = n.stateNode));
                              try {
                                var m = Si(n.type, a);
                                ((e = r.getSnapshotBeforeUpdate(m, l)),
                                  (r.__reactInternalSnapshotBeforeUpdate = e));
                              } catch (y) {
                                Sc(n, n.return, y);
                              }
                            }
                            break;
                          case 3:
                            if (0 !== (1024 & e))
                              if (
                                9 ===
                                (n = (e = t.stateNode.containerInfo).nodeType)
                              )
                                Pd(e);
                              else if (1 === n)
                                switch (e.nodeName) {
                                  case "HEAD":
                                  case "HTML":
                                  case "BODY":
                                    Pd(e);
                                    break;
                                  default:
                                    e.textContent = "";
                                }
                            break;
                          default:
                            if (0 !== (1024 & e)) throw Error(o(163));
                        }
                        if (null !== (e = t.sibling)) {
                          ((e.return = t.return), (As = e));
                          break;
                        }
                        As = t.return;
                      }
                })(e, t);
              } finally {
                ((pu = i), (O.p = a), (I.T = r));
              }
            }
            ((Du = 1), gc(), yc(), bc());
          }
        }
        function gc() {
          if (1 === Du) {
            Du = 0;
            var e = Mu,
              t = Fu,
              n = 0 !== (13878 & t.flags);
            if (0 !== (13878 & t.subtreeFlags) || n) {
              ((n = I.T), (I.T = null));
              var r = O.p;
              O.p = 2;
              var a = pu;
              pu |= 4;
              try {
                $s(t, e);
                var l = md,
                  o = rr(e.containerInfo),
                  i = l.focusedElem,
                  s = l.selectionRange;
                if (
                  o !== i &&
                  i &&
                  i.ownerDocument &&
                  nr(i.ownerDocument.documentElement, i)
                ) {
                  if (null !== s && ar(i)) {
                    var u = s.start,
                      c = s.end;
                    if ((void 0 === c && (c = u), "selectionStart" in i))
                      ((i.selectionStart = u),
                        (i.selectionEnd = Math.min(c, i.value.length)));
                    else {
                      var d = i.ownerDocument || document,
                        f = (d && d.defaultView) || window;
                      if (f.getSelection) {
                        var p = f.getSelection(),
                          h = i.textContent.length,
                          m = Math.min(s.start, h),
                          g = void 0 === s.end ? m : Math.min(s.end, h);
                        !p.extend && m > g && ((o = g), (g = m), (m = o));
                        var y = tr(i, m),
                          b = tr(i, g);
                        if (
                          y &&
                          b &&
                          (1 !== p.rangeCount ||
                            p.anchorNode !== y.node ||
                            p.anchorOffset !== y.offset ||
                            p.focusNode !== b.node ||
                            p.focusOffset !== b.offset)
                        ) {
                          var v = d.createRange();
                          (v.setStart(y.node, y.offset),
                            p.removeAllRanges(),
                            m > g
                              ? (p.addRange(v), p.extend(b.node, b.offset))
                              : (v.setEnd(b.node, b.offset), p.addRange(v)));
                        }
                      }
                    }
                  }
                  for (d = [], p = i; (p = p.parentNode); )
                    1 === p.nodeType &&
                      d.push({
                        element: p,
                        left: p.scrollLeft,
                        top: p.scrollTop,
                      });
                  for (
                    "function" === typeof i.focus && i.focus(), i = 0;
                    i < d.length;
                    i++
                  ) {
                    var x = d[i];
                    ((x.element.scrollLeft = x.left),
                      (x.element.scrollTop = x.top));
                  }
                }
                ((xf = !!hd), (md = hd = null));
              } finally {
                ((pu = a), (O.p = r), (I.T = n));
              }
            }
            ((e.current = t), (Du = 2));
          }
        }
        function yc() {
          if (2 === Du) {
            Du = 0;
            var e = Mu,
              t = Fu,
              n = 0 !== (8772 & t.flags);
            if (0 !== (8772 & t.subtreeFlags) || n) {
              ((n = I.T), (I.T = null));
              var r = O.p;
              O.p = 2;
              var a = pu;
              pu |= 4;
              try {
                Is(e, t.alternate, t);
              } finally {
                ((pu = a), (O.p = r), (I.T = n));
              }
            }
            Du = 3;
          }
        }
        function bc() {
          if (4 === Du || 3 === Du) {
            ((Du = 0), ie());
            var e = Mu,
              t = Fu,
              n = Uu,
              r = Vu;
            0 !== (10256 & t.subtreeFlags) || 0 !== (10256 & t.flags)
              ? (Du = 5)
              : ((Du = 0), (Fu = Mu = null), vc(e, e.pendingLanes));
            var a = e.pendingLanes;
            if (
              (0 === a && (Ru = null),
              De(n),
              (t = t.stateNode),
              be && "function" === typeof be.onCommitFiberRoot)
            )
              try {
                be.onCommitFiberRoot(
                  ye,
                  t,
                  void 0,
                  128 === (128 & t.current.flags),
                );
              } catch (s) {}
            if (null !== r) {
              ((t = I.T), (a = O.p), (O.p = 2), (I.T = null));
              try {
                for (var l = e.onRecoverableError, o = 0; o < r.length; o++) {
                  var i = r[o];
                  l(i.value, { componentStack: i.stack });
                }
              } finally {
                ((I.T = t), (O.p = a));
              }
            }
            (0 !== (3 & Uu) && xc(),
              Oc(e),
              (a = e.pendingLanes),
              0 !== (261930 & n) && 0 !== (42 & a)
                ? e === $u
                  ? Wu++
                  : ((Wu = 0), ($u = e))
                : (Wu = 0),
              Rc(0, !1));
          }
        }
        function vc(e, t) {
          0 === (e.pooledCacheLanes &= t) &&
            null != (t = e.pooledCache) &&
            ((e.pooledCache = null), Ua(t));
        }
        function xc() {
          return (gc(), yc(), bc(), kc());
        }
        function kc() {
          if (5 !== Du) return !1;
          var e = Mu,
            t = Hu;
          Hu = 0;
          var n = De(Uu),
            r = I.T,
            a = O.p;
          try {
            ((O.p = 32 > n ? 32 : n), (I.T = null), (n = Bu), (Bu = null));
            var l = Mu,
              i = Uu;
            if (((Du = 0), (Fu = Mu = null), (Uu = 0), 0 !== (6 & pu)))
              throw Error(o(331));
            var s = pu;
            if (
              ((pu |= 4),
              su(l.current),
              eu(l, l.current, i, n),
              (pu = s),
              Rc(0, !1),
              be && "function" === typeof be.onPostCommitFiberRoot)
            )
              try {
                be.onPostCommitFiberRoot(ye, l);
              } catch (u) {}
            return !0;
          } finally {
            ((O.p = a), (I.T = r), vc(e, t));
          }
        }
        function wc(e, t, n) {
          ((t = Kr(n, t)),
            null !== (e = vl(e, (t = Pi(e.stateNode, t, 2)), 2)) &&
              (Le(e, 2), Oc(e)));
        }
        function Sc(e, t, n) {
          if (3 === e.tag) wc(e, e, n);
          else
            for (; null !== t; ) {
              if (3 === t.tag) {
                wc(t, e, n);
                break;
              }
              if (1 === t.tag) {
                var r = t.stateNode;
                if (
                  "function" === typeof t.type.getDerivedStateFromError ||
                  ("function" === typeof r.componentDidCatch &&
                    (null === Ru || !Ru.has(r)))
                ) {
                  ((e = Kr(n, e)),
                    null !== (r = vl(t, (n = Ti(2)), 2)) &&
                      (_i(n, r, t, e), Le(r, 2), Oc(r)));
                  break;
                }
              }
              t = t.return;
            }
        }
        function Nc(e, t, n) {
          var r = e.pingCache;
          if (null === r) {
            r = e.pingCache = new fu();
            var a = new Set();
            r.set(t, a);
          } else void 0 === (a = r.get(t)) && ((a = new Set()), r.set(t, a));
          a.has(n) ||
            ((ku = !0), a.add(n), (e = Ec.bind(null, e, t, n)), t.then(e, e));
        }
        function Ec(e, t, n) {
          var r = e.pingCache;
          (null !== r && r.delete(t),
            (e.pingedLanes |= e.suspendedLanes & n),
            (e.warmLanes &= ~n),
            hu === e &&
              (gu & n) === n &&
              (4 === Su ||
              (3 === Su && (62914560 & gu) === gu && 300 > se() - Lu)
                ? 0 === (2 & pu) && tc(e, 0)
                : (Cu |= n),
              zu === gu && (zu = 0)),
            Oc(e));
        }
        function Cc(e, t) {
          (0 === t && (t = Te()), null !== (e = Ar(e, t)) && (Le(e, t), Oc(e)));
        }
        function jc(e) {
          var t = e.memoizedState,
            n = 0;
          (null !== t && (n = t.retryLane), Cc(e, n));
        }
        function zc(e, t) {
          var n = 0;
          switch (e.tag) {
            case 31:
            case 13:
              var r = e.stateNode,
                a = e.memoizedState;
              null !== a && (n = a.retryLane);
              break;
            case 19:
              r = e.stateNode;
              break;
            case 22:
              r = e.stateNode._retryCache;
              break;
            default:
              throw Error(o(314));
          }
          (null !== r && r.delete(t), Cc(e, n));
        }
        var Pc = null,
          Tc = null,
          _c = !1,
          Lc = !1,
          Ac = !1,
          Ic = 0;
        function Oc(e) {
          (e !== Tc &&
            null === e.next &&
            (null === Tc ? (Pc = Tc = e) : (Tc = Tc.next = e)),
            (Lc = !0),
            _c ||
              ((_c = !0),
              Nd(function () {
                0 !== (6 & pu) ? ae(ce, Dc) : Mc();
              })));
        }
        function Rc(e, t) {
          if (!Ac && Lc) {
            Ac = !0;
            do {
              for (var n = !1, r = Pc; null !== r; ) {
                if (!t)
                  if (0 !== e) {
                    var a = r.pendingLanes;
                    if (0 === a) var l = 0;
                    else {
                      var o = r.suspendedLanes,
                        i = r.pingedLanes;
                      ((l = (1 << (31 - xe(42 | e) + 1)) - 1),
                        (l =
                          201326741 & (l &= a & ~(o & ~i))
                            ? (201326741 & l) | 1
                            : l
                              ? 2 | l
                              : 0));
                    }
                    0 !== l && ((n = !0), Hc(r, l));
                  } else
                    ((l = gu),
                      0 ===
                        (3 &
                          (l = je(
                            r,
                            r === hu ? l : 0,
                            null !== r.cancelPendingCommit ||
                              -1 !== r.timeoutHandle,
                          ))) ||
                        ze(r, l) ||
                        ((n = !0), Hc(r, l)));
                r = r.next;
              }
            } while (n);
            Ac = !1;
          }
        }
        function Dc() {
          Mc();
        }
        function Mc() {
          Lc = _c = !1;
          var e = 0;
          0 !== Ic &&
            (function () {
              var e = window.event;
              if (e && "popstate" === e.type) return e !== xd && ((xd = e), !0);
              return ((xd = null), !1);
            })() &&
            (e = Ic);
          for (var t = se(), n = null, r = Pc; null !== r; ) {
            var a = r.next,
              l = Fc(r, t);
            (0 === l
              ? ((r.next = null),
                null === n ? (Pc = a) : (n.next = a),
                null === a && (Tc = n))
              : ((n = r), (0 !== e || 0 !== (3 & l)) && (Lc = !0)),
              (r = a));
          }
          ((0 !== Du && 5 !== Du) || Rc(e, !1), 0 !== Ic && (Ic = 0));
        }
        function Fc(e, t) {
          for (
            var n = e.suspendedLanes,
              r = e.pingedLanes,
              a = e.expirationTimes,
              l = -62914561 & e.pendingLanes;
            0 < l;
          ) {
            var o = 31 - xe(l),
              i = 1 << o,
              s = a[o];
            (-1 === s
              ? (0 !== (i & n) && 0 === (i & r)) || (a[o] = Pe(i, t))
              : s <= t && (e.expiredLanes |= i),
              (l &= ~i));
          }
          if (
            ((n = gu),
            (n = je(
              e,
              e === (t = hu) ? n : 0,
              null !== e.cancelPendingCommit || -1 !== e.timeoutHandle,
            )),
            (r = e.callbackNode),
            0 === n ||
              (e === t && (2 === yu || 9 === yu)) ||
              null !== e.cancelPendingCommit)
          )
            return (
              null !== r && null !== r && le(r),
              (e.callbackNode = null),
              (e.callbackPriority = 0)
            );
          if (0 === (3 & n) || ze(e, n)) {
            if ((t = n & -n) === e.callbackPriority) return t;
            switch ((null !== r && le(r), De(n))) {
              case 2:
              case 8:
                n = de;
                break;
              case 32:
              default:
                n = fe;
                break;
              case 268435456:
                n = he;
            }
            return (
              (r = Uc.bind(null, e)),
              (n = ae(n, r)),
              (e.callbackPriority = t),
              (e.callbackNode = n),
              t
            );
          }
          return (
            null !== r && null !== r && le(r),
            (e.callbackPriority = 2),
            (e.callbackNode = null),
            2
          );
        }
        function Uc(e, t) {
          if (0 !== Du && 5 !== Du)
            return ((e.callbackNode = null), (e.callbackPriority = 0), null);
          var n = e.callbackNode;
          if (xc() && e.callbackNode !== n) return null;
          var r = gu;
          return 0 ===
            (r = je(
              e,
              e === hu ? r : 0,
              null !== e.cancelPendingCommit || -1 !== e.timeoutHandle,
            ))
            ? null
            : (Yu(e, r, t),
              Fc(e, se()),
              null != e.callbackNode && e.callbackNode === n
                ? Uc.bind(null, e)
                : null);
        }
        function Hc(e, t) {
          if (xc()) return null;
          Yu(e, t, !0);
        }
        function Bc() {
          if (0 === Ic) {
            var e = Va;
            (0 === e && ((e = Se), 0 === (261888 & (Se <<= 1)) && (Se = 256)),
              (Ic = e));
          }
          return Ic;
        }
        function Vc(e) {
          return null == e || "symbol" === typeof e || "boolean" === typeof e
            ? null
            : "function" === typeof e
              ? e
              : _t("" + e);
        }
        function Wc(e, t) {
          var n = t.ownerDocument.createElement("input");
          return (
            (n.name = t.name),
            (n.value = t.value),
            e.id && n.setAttribute("form", e.id),
            t.parentNode.insertBefore(n, t),
            (e = new FormData(e)),
            n.parentNode.removeChild(n),
            e
          );
        }
        for (var $c = 0; $c < Nr.length; $c++) {
          var qc = Nr[$c];
          Er(qc.toLowerCase(), "on" + (qc[0].toUpperCase() + qc.slice(1)));
        }
        (Er(gr, "onAnimationEnd"),
          Er(yr, "onAnimationIteration"),
          Er(br, "onAnimationStart"),
          Er("dblclick", "onDoubleClick"),
          Er("focusin", "onFocus"),
          Er("focusout", "onBlur"),
          Er(vr, "onTransitionRun"),
          Er(xr, "onTransitionStart"),
          Er(kr, "onTransitionCancel"),
          Er(wr, "onTransitionEnd"),
          at("onMouseEnter", ["mouseout", "mouseover"]),
          at("onMouseLeave", ["mouseout", "mouseover"]),
          at("onPointerEnter", ["pointerout", "pointerover"]),
          at("onPointerLeave", ["pointerout", "pointerover"]),
          rt(
            "onChange",
            "change click focusin focusout input keydown keyup selectionchange".split(
              " ",
            ),
          ),
          rt(
            "onSelect",
            "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
              " ",
            ),
          ),
          rt("onBeforeInput", [
            "compositionend",
            "keypress",
            "textInput",
            "paste",
          ]),
          rt(
            "onCompositionEnd",
            "compositionend focusout keydown keypress keyup mousedown".split(
              " ",
            ),
          ),
          rt(
            "onCompositionStart",
            "compositionstart focusout keydown keypress keyup mousedown".split(
              " ",
            ),
          ),
          rt(
            "onCompositionUpdate",
            "compositionupdate focusout keydown keypress keyup mousedown".split(
              " ",
            ),
          ));
        var Qc =
            "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
              " ",
            ),
          Kc = new Set(
            "beforetoggle cancel close invalid load scroll scrollend toggle"
              .split(" ")
              .concat(Qc),
          );
        function Yc(e, t) {
          t = 0 !== (4 & t);
          for (var n = 0; n < e.length; n++) {
            var r = e[n],
              a = r.event;
            r = r.listeners;
            e: {
              var l = void 0;
              if (t)
                for (var o = r.length - 1; 0 <= o; o--) {
                  var i = r[o],
                    s = i.instance,
                    u = i.currentTarget;
                  if (((i = i.listener), s !== l && a.isPropagationStopped()))
                    break e;
                  ((l = i), (a.currentTarget = u));
                  try {
                    l(a);
                  } catch (c) {
                    Cr(c);
                  }
                  ((a.currentTarget = null), (l = s));
                }
              else
                for (o = 0; o < r.length; o++) {
                  if (
                    ((s = (i = r[o]).instance),
                    (u = i.currentTarget),
                    (i = i.listener),
                    s !== l && a.isPropagationStopped())
                  )
                    break e;
                  ((l = i), (a.currentTarget = u));
                  try {
                    l(a);
                  } catch (c) {
                    Cr(c);
                  }
                  ((a.currentTarget = null), (l = s));
                }
            }
          }
        }
        function Gc(e, t) {
          var n = t[We];
          void 0 === n && (n = t[We] = new Set());
          var r = e + "__bubble";
          n.has(r) || (ed(t, e, 2, !1), n.add(r));
        }
        function Xc(e, t, n) {
          var r = 0;
          (t && (r |= 4), ed(n, e, r, t));
        }
        var Zc = "_reactListening" + Math.random().toString(36).slice(2);
        function Jc(e) {
          if (!e[Zc]) {
            ((e[Zc] = !0),
              tt.forEach(function (t) {
                "selectionchange" !== t &&
                  (Kc.has(t) || Xc(t, !1, e), Xc(t, !0, e));
              }));
            var t = 9 === e.nodeType ? e : e.ownerDocument;
            null === t || t[Zc] || ((t[Zc] = !0), Xc("selectionchange", !1, t));
          }
        }
        function ed(e, t, n, r) {
          switch (jf(t)) {
            case 2:
              var a = kf;
              break;
            case 8:
              a = wf;
              break;
            default:
              a = Sf;
          }
          ((n = a.bind(null, t, n, e)),
            (a = void 0),
            !Bt ||
              ("touchstart" !== t && "touchmove" !== t && "wheel" !== t) ||
              (a = !0),
            r
              ? void 0 !== a
                ? e.addEventListener(t, n, { capture: !0, passive: a })
                : e.addEventListener(t, n, !0)
              : void 0 !== a
                ? e.addEventListener(t, n, { passive: a })
                : e.addEventListener(t, n, !1));
        }
        function td(e, t, n, r, a) {
          var l = r;
          if (0 === (1 & t) && 0 === (2 & t) && null !== r)
            e: for (;;) {
              if (null === r) return;
              var o = r.tag;
              if (3 === o || 4 === o) {
                var i = r.stateNode.containerInfo;
                if (i === a) break;
                if (4 === o)
                  for (o = r.return; null !== o; ) {
                    var u = o.tag;
                    if ((3 === u || 4 === u) && o.stateNode.containerInfo === a)
                      return;
                    o = o.return;
                  }
                for (; null !== i; ) {
                  if (null === (o = Ge(i))) return;
                  if (5 === (u = o.tag) || 6 === u || 26 === u || 27 === u) {
                    r = l = o;
                    continue e;
                  }
                  i = i.parentNode;
                }
              }
              r = r.return;
            }
          Ft(function () {
            var r = l,
              a = It(n),
              o = [];
            e: {
              var i = Sr.get(e);
              if (void 0 !== i) {
                var u = nn,
                  c = e;
                switch (e) {
                  case "keypress":
                    if (0 === Kt(n)) break e;
                  case "keydown":
                  case "keyup":
                    u = bn;
                    break;
                  case "focusin":
                    ((c = "focus"), (u = un));
                    break;
                  case "focusout":
                    ((c = "blur"), (u = un));
                    break;
                  case "beforeblur":
                  case "afterblur":
                    u = un;
                    break;
                  case "click":
                    if (2 === n.button) break e;
                  case "auxclick":
                  case "dblclick":
                  case "mousedown":
                  case "mousemove":
                  case "mouseup":
                  case "mouseout":
                  case "mouseover":
                  case "contextmenu":
                    u = on;
                    break;
                  case "drag":
                  case "dragend":
                  case "dragenter":
                  case "dragexit":
                  case "dragleave":
                  case "dragover":
                  case "dragstart":
                  case "drop":
                    u = sn;
                    break;
                  case "touchcancel":
                  case "touchend":
                  case "touchmove":
                  case "touchstart":
                    u = xn;
                    break;
                  case gr:
                  case yr:
                  case br:
                    u = cn;
                    break;
                  case wr:
                    u = kn;
                    break;
                  case "scroll":
                  case "scrollend":
                    u = an;
                    break;
                  case "wheel":
                    u = wn;
                    break;
                  case "copy":
                  case "cut":
                  case "paste":
                    u = dn;
                    break;
                  case "gotpointercapture":
                  case "lostpointercapture":
                  case "pointercancel":
                  case "pointerdown":
                  case "pointermove":
                  case "pointerout":
                  case "pointerover":
                  case "pointerup":
                    u = vn;
                    break;
                  case "toggle":
                  case "beforetoggle":
                    u = Sn;
                }
                var d = 0 !== (4 & t),
                  f = !d && ("scroll" === e || "scrollend" === e),
                  p = d ? (null !== i ? i + "Capture" : null) : i;
                d = [];
                for (var h, m = r; null !== m; ) {
                  var g = m;
                  if (
                    ((h = g.stateNode),
                    (5 !== (g = g.tag) && 26 !== g && 27 !== g) ||
                      null === h ||
                      null === p ||
                      (null != (g = Ut(m, p)) && d.push(nd(m, g, h))),
                    f)
                  )
                    break;
                  m = m.return;
                }
                0 < d.length &&
                  ((i = new u(i, c, null, n, a)),
                  o.push({ event: i, listeners: d }));
              }
            }
            if (0 === (7 & t)) {
              if (
                ((u = "mouseout" === e || "pointerout" === e),
                (!(i = "mouseover" === e || "pointerover" === e) ||
                  n === At ||
                  !(c = n.relatedTarget || n.fromElement) ||
                  (!Ge(c) && !c[Ve])) &&
                  (u || i) &&
                  ((i =
                    a.window === a
                      ? a
                      : (i = a.ownerDocument)
                        ? i.defaultView || i.parentWindow
                        : window),
                  u
                    ? ((u = r),
                      null !==
                        (c = (c = n.relatedTarget || n.toElement)
                          ? Ge(c)
                          : null) &&
                        ((f = s(c)),
                        (d = c.tag),
                        c !== f || (5 !== d && 27 !== d && 6 !== d)) &&
                        (c = null))
                    : ((u = null), (c = r)),
                  u !== c))
              ) {
                if (
                  ((d = on),
                  (g = "onMouseLeave"),
                  (p = "onMouseEnter"),
                  (m = "mouse"),
                  ("pointerout" !== e && "pointerover" !== e) ||
                    ((d = vn),
                    (g = "onPointerLeave"),
                    (p = "onPointerEnter"),
                    (m = "pointer")),
                  (f = null == u ? i : Ze(u)),
                  (h = null == c ? i : Ze(c)),
                  ((i = new d(g, m + "leave", u, n, a)).target = f),
                  (i.relatedTarget = h),
                  (g = null),
                  Ge(a) === r &&
                    (((d = new d(p, m + "enter", c, n, a)).target = h),
                    (d.relatedTarget = f),
                    (g = d)),
                  (f = g),
                  u && c)
                )
                  e: {
                    for (d = ad, m = c, h = 0, g = p = u; g; g = d(g)) h++;
                    g = 0;
                    for (var y = m; y; y = d(y)) g++;
                    for (; 0 < h - g; ) ((p = d(p)), h--);
                    for (; 0 < g - h; ) ((m = d(m)), g--);
                    for (; h--; ) {
                      if (p === m || (null !== m && p === m.alternate)) {
                        d = p;
                        break e;
                      }
                      ((p = d(p)), (m = d(m)));
                    }
                    d = null;
                  }
                else d = null;
                (null !== u && ld(o, i, u, d, !1),
                  null !== c && null !== f && ld(o, f, c, d, !0));
              }
              if (
                "select" ===
                  (u =
                    (i = r ? Ze(r) : window).nodeName &&
                    i.nodeName.toLowerCase()) ||
                ("input" === u && "file" === i.type)
              )
                var b = Hn;
              else if (On(i))
                if (Bn) b = Xn;
                else {
                  b = Yn;
                  var v = Kn;
                }
              else
                !(u = i.nodeName) ||
                "input" !== u.toLowerCase() ||
                ("checkbox" !== i.type && "radio" !== i.type)
                  ? r && zt(r.elementType) && (b = Hn)
                  : (b = Gn);
              switch (
                (b && (b = b(e, r))
                  ? Rn(o, b, n, a)
                  : (v && v(e, i, r),
                    "focusout" === e &&
                      r &&
                      "number" === i.type &&
                      null != r.memoizedProps.value &&
                      xt(i, "number", i.value)),
                (v = r ? Ze(r) : window),
                e)
              ) {
                case "focusin":
                  (On(v) || "true" === v.contentEditable) &&
                    ((or = v), (ir = r), (sr = null));
                  break;
                case "focusout":
                  sr = ir = or = null;
                  break;
                case "mousedown":
                  ur = !0;
                  break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                  ((ur = !1), cr(o, n, a));
                  break;
                case "selectionchange":
                  if (lr) break;
                case "keydown":
                case "keyup":
                  cr(o, n, a);
              }
              var x;
              if (En)
                e: {
                  switch (e) {
                    case "compositionstart":
                      var k = "onCompositionStart";
                      break e;
                    case "compositionend":
                      k = "onCompositionEnd";
                      break e;
                    case "compositionupdate":
                      k = "onCompositionUpdate";
                      break e;
                  }
                  k = void 0;
                }
              else
                An
                  ? _n(e, n) && (k = "onCompositionEnd")
                  : "keydown" === e &&
                    229 === n.keyCode &&
                    (k = "onCompositionStart");
              (k &&
                (zn &&
                  "ko" !== n.locale &&
                  (An || "onCompositionStart" !== k
                    ? "onCompositionEnd" === k && An && (x = Qt())
                    : (($t = "value" in (Wt = a) ? Wt.value : Wt.textContent),
                      (An = !0))),
                0 < (v = rd(r, k)).length &&
                  ((k = new fn(k, e, null, n, a)),
                  o.push({ event: k, listeners: v }),
                  x ? (k.data = x) : null !== (x = Ln(n)) && (k.data = x))),
                (x = jn
                  ? (function (e, t) {
                      switch (e) {
                        case "compositionend":
                          return Ln(t);
                        case "keypress":
                          return 32 !== t.which ? null : ((Tn = !0), Pn);
                        case "textInput":
                          return (e = t.data) === Pn && Tn ? null : e;
                        default:
                          return null;
                      }
                    })(e, n)
                  : (function (e, t) {
                      if (An)
                        return "compositionend" === e || (!En && _n(e, t))
                          ? ((e = Qt()), (qt = $t = Wt = null), (An = !1), e)
                          : null;
                      switch (e) {
                        case "paste":
                        default:
                          return null;
                        case "keypress":
                          if (
                            !(t.ctrlKey || t.altKey || t.metaKey) ||
                            (t.ctrlKey && t.altKey)
                          ) {
                            if (t.char && 1 < t.char.length) return t.char;
                            if (t.which) return String.fromCharCode(t.which);
                          }
                          return null;
                        case "compositionend":
                          return zn && "ko" !== t.locale ? null : t.data;
                      }
                    })(e, n)) &&
                  0 < (k = rd(r, "onBeforeInput")).length &&
                  ((v = new fn("onBeforeInput", "beforeinput", null, n, a)),
                  o.push({ event: v, listeners: k }),
                  (v.data = x)),
                (function (e, t, n, r, a) {
                  if ("submit" === t && n && n.stateNode === a) {
                    var l = Vc((a[Be] || null).action),
                      o = r.submitter;
                    o &&
                      null !==
                        (t = (t = o[Be] || null)
                          ? Vc(t.formAction)
                          : o.getAttribute("formAction")) &&
                      ((l = t), (o = null));
                    var i = new nn("action", "action", null, r, a);
                    e.push({
                      event: i,
                      listeners: [
                        {
                          instance: null,
                          listener: function () {
                            if (r.defaultPrevented) {
                              if (0 !== Ic) {
                                var e = o ? Wc(a, o) : new FormData(a);
                                ti(
                                  n,
                                  {
                                    pending: !0,
                                    data: e,
                                    method: a.method,
                                    action: l,
                                  },
                                  null,
                                  e,
                                );
                              }
                            } else
                              "function" === typeof l &&
                                (i.preventDefault(),
                                (e = o ? Wc(a, o) : new FormData(a)),
                                ti(
                                  n,
                                  {
                                    pending: !0,
                                    data: e,
                                    method: a.method,
                                    action: l,
                                  },
                                  l,
                                  e,
                                ));
                          },
                          currentTarget: a,
                        },
                      ],
                    });
                  }
                })(o, e, r, n, a));
            }
            Yc(o, t);
          });
        }
        function nd(e, t, n) {
          return { instance: e, listener: t, currentTarget: n };
        }
        function rd(e, t) {
          for (var n = t + "Capture", r = []; null !== e; ) {
            var a = e,
              l = a.stateNode;
            if (
              ((5 !== (a = a.tag) && 26 !== a && 27 !== a) ||
                null === l ||
                (null != (a = Ut(e, n)) && r.unshift(nd(e, a, l)),
                null != (a = Ut(e, t)) && r.push(nd(e, a, l))),
              3 === e.tag)
            )
              return r;
            e = e.return;
          }
          return [];
        }
        function ad(e) {
          if (null === e) return null;
          do {
            e = e.return;
          } while (e && 5 !== e.tag && 27 !== e.tag);
          return e || null;
        }
        function ld(e, t, n, r, a) {
          for (var l = t._reactName, o = []; null !== n && n !== r; ) {
            var i = n,
              s = i.alternate,
              u = i.stateNode;
            if (((i = i.tag), null !== s && s === r)) break;
            ((5 !== i && 26 !== i && 27 !== i) ||
              null === u ||
              ((s = u),
              a
                ? null != (u = Ut(n, l)) && o.unshift(nd(n, u, s))
                : a || (null != (u = Ut(n, l)) && o.push(nd(n, u, s)))),
              (n = n.return));
          }
          0 !== o.length && e.push({ event: t, listeners: o });
        }
        var od = /\r\n?/g,
          id = /\u0000|\uFFFD/g;
        function sd(e) {
          return ("string" === typeof e ? e : "" + e)
            .replace(od, "\n")
            .replace(id, "");
        }
        function ud(e, t) {
          return ((t = sd(t)), sd(e) === t);
        }
        function cd(e, t, n, r, a, l) {
          switch (n) {
            case "children":
              "string" === typeof r
                ? "body" === t || ("textarea" === t && "" === r) || Nt(e, r)
                : ("number" === typeof r || "bigint" === typeof r) &&
                  "body" !== t &&
                  Nt(e, "" + r);
              break;
            case "className":
              ut(e, "class", r);
              break;
            case "tabIndex":
              ut(e, "tabindex", r);
              break;
            case "dir":
            case "role":
            case "viewBox":
            case "width":
            case "height":
              ut(e, n, r);
              break;
            case "style":
              jt(e, r, l);
              break;
            case "data":
              if ("object" !== t) {
                ut(e, "data", r);
                break;
              }
            case "src":
            case "href":
              if ("" === r && ("a" !== t || "href" !== n)) {
                e.removeAttribute(n);
                break;
              }
              if (
                null == r ||
                "function" === typeof r ||
                "symbol" === typeof r ||
                "boolean" === typeof r
              ) {
                e.removeAttribute(n);
                break;
              }
              ((r = _t("" + r)), e.setAttribute(n, r));
              break;
            case "action":
            case "formAction":
              if ("function" === typeof r) {
                e.setAttribute(
                  n,
                  "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
                );
                break;
              }
              if (
                ("function" === typeof l &&
                  ("formAction" === n
                    ? ("input" !== t && cd(e, t, "name", a.name, a, null),
                      cd(e, t, "formEncType", a.formEncType, a, null),
                      cd(e, t, "formMethod", a.formMethod, a, null),
                      cd(e, t, "formTarget", a.formTarget, a, null))
                    : (cd(e, t, "encType", a.encType, a, null),
                      cd(e, t, "method", a.method, a, null),
                      cd(e, t, "target", a.target, a, null))),
                null == r || "symbol" === typeof r || "boolean" === typeof r)
              ) {
                e.removeAttribute(n);
                break;
              }
              ((r = _t("" + r)), e.setAttribute(n, r));
              break;
            case "onClick":
              null != r && (e.onclick = Lt);
              break;
            case "onScroll":
              null != r && Gc("scroll", e);
              break;
            case "onScrollEnd":
              null != r && Gc("scrollend", e);
              break;
            case "dangerouslySetInnerHTML":
              if (null != r) {
                if ("object" !== typeof r || !("__html" in r))
                  throw Error(o(61));
                if (null != (n = r.__html)) {
                  if (null != a.children) throw Error(o(60));
                  e.innerHTML = n;
                }
              }
              break;
            case "multiple":
              e.multiple =
                r && "function" !== typeof r && "symbol" !== typeof r;
              break;
            case "muted":
              e.muted = r && "function" !== typeof r && "symbol" !== typeof r;
              break;
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
            case "defaultValue":
            case "defaultChecked":
            case "innerHTML":
            case "ref":
            case "autoFocus":
              break;
            case "xlinkHref":
              if (
                null == r ||
                "function" === typeof r ||
                "boolean" === typeof r ||
                "symbol" === typeof r
              ) {
                e.removeAttribute("xlink:href");
                break;
              }
              ((n = _t("" + r)),
                e.setAttributeNS(
                  "http://www.w3.org/1999/xlink",
                  "xlink:href",
                  n,
                ));
              break;
            case "contentEditable":
            case "spellCheck":
            case "draggable":
            case "value":
            case "autoReverse":
            case "externalResourcesRequired":
            case "focusable":
            case "preserveAlpha":
              null != r && "function" !== typeof r && "symbol" !== typeof r
                ? e.setAttribute(n, "" + r)
                : e.removeAttribute(n);
              break;
            case "inert":
            case "allowFullScreen":
            case "async":
            case "autoPlay":
            case "controls":
            case "default":
            case "defer":
            case "disabled":
            case "disablePictureInPicture":
            case "disableRemotePlayback":
            case "formNoValidate":
            case "hidden":
            case "loop":
            case "noModule":
            case "noValidate":
            case "open":
            case "playsInline":
            case "readOnly":
            case "required":
            case "reversed":
            case "scoped":
            case "seamless":
            case "itemScope":
              r && "function" !== typeof r && "symbol" !== typeof r
                ? e.setAttribute(n, "")
                : e.removeAttribute(n);
              break;
            case "capture":
            case "download":
              !0 === r
                ? e.setAttribute(n, "")
                : !1 !== r &&
                    null != r &&
                    "function" !== typeof r &&
                    "symbol" !== typeof r
                  ? e.setAttribute(n, r)
                  : e.removeAttribute(n);
              break;
            case "cols":
            case "rows":
            case "size":
            case "span":
              null != r &&
              "function" !== typeof r &&
              "symbol" !== typeof r &&
              !isNaN(r) &&
              1 <= r
                ? e.setAttribute(n, r)
                : e.removeAttribute(n);
              break;
            case "rowSpan":
            case "start":
              null == r ||
              "function" === typeof r ||
              "symbol" === typeof r ||
              isNaN(r)
                ? e.removeAttribute(n)
                : e.setAttribute(n, r);
              break;
            case "popover":
              (Gc("beforetoggle", e), Gc("toggle", e), st(e, "popover", r));
              break;
            case "xlinkActuate":
              ct(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
              break;
            case "xlinkArcrole":
              ct(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
              break;
            case "xlinkRole":
              ct(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
              break;
            case "xlinkShow":
              ct(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
              break;
            case "xlinkTitle":
              ct(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
              break;
            case "xlinkType":
              ct(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
              break;
            case "xmlBase":
              ct(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
              break;
            case "xmlLang":
              ct(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
              break;
            case "xmlSpace":
              ct(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
              break;
            case "is":
              st(e, "is", r);
              break;
            case "innerText":
            case "textContent":
              break;
            default:
              (!(2 < n.length) ||
                ("o" !== n[0] && "O" !== n[0]) ||
                ("n" !== n[1] && "N" !== n[1])) &&
                st(e, (n = Pt.get(n) || n), r);
          }
        }
        function dd(e, t, n, r, a, l) {
          switch (n) {
            case "style":
              jt(e, r, l);
              break;
            case "dangerouslySetInnerHTML":
              if (null != r) {
                if ("object" !== typeof r || !("__html" in r))
                  throw Error(o(61));
                if (null != (n = r.__html)) {
                  if (null != a.children) throw Error(o(60));
                  e.innerHTML = n;
                }
              }
              break;
            case "children":
              "string" === typeof r
                ? Nt(e, r)
                : ("number" === typeof r || "bigint" === typeof r) &&
                  Nt(e, "" + r);
              break;
            case "onScroll":
              null != r && Gc("scroll", e);
              break;
            case "onScrollEnd":
              null != r && Gc("scrollend", e);
              break;
            case "onClick":
              null != r && (e.onclick = Lt);
              break;
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
            case "innerHTML":
            case "ref":
            case "innerText":
            case "textContent":
              break;
            default:
              nt.hasOwnProperty(n) ||
                ("o" !== n[0] ||
                "n" !== n[1] ||
                ((a = n.endsWith("Capture")),
                (t = n.slice(2, a ? n.length - 7 : void 0)),
                "function" ===
                  typeof (l = null != (l = e[Be] || null) ? l[n] : null) &&
                  e.removeEventListener(t, l, a),
                "function" !== typeof r)
                  ? n in e
                    ? (e[n] = r)
                    : !0 === r
                      ? e.setAttribute(n, "")
                      : st(e, n, r)
                  : ("function" !== typeof l &&
                      null !== l &&
                      (n in e
                        ? (e[n] = null)
                        : e.hasAttribute(n) && e.removeAttribute(n)),
                    e.addEventListener(t, r, a)));
          }
        }
        function fd(e, t, n) {
          switch (t) {
            case "div":
            case "span":
            case "svg":
            case "path":
            case "a":
            case "g":
            case "p":
            case "li":
              break;
            case "img":
              (Gc("error", e), Gc("load", e));
              var r,
                a = !1,
                l = !1;
              for (r in n)
                if (n.hasOwnProperty(r)) {
                  var i = n[r];
                  if (null != i)
                    switch (r) {
                      case "src":
                        a = !0;
                        break;
                      case "srcSet":
                        l = !0;
                        break;
                      case "children":
                      case "dangerouslySetInnerHTML":
                        throw Error(o(137, t));
                      default:
                        cd(e, t, r, i, n, null);
                    }
                }
              return (
                l && cd(e, t, "srcSet", n.srcSet, n, null),
                void (a && cd(e, t, "src", n.src, n, null))
              );
            case "input":
              Gc("invalid", e);
              var s = (r = i = l = null),
                u = null,
                c = null;
              for (a in n)
                if (n.hasOwnProperty(a)) {
                  var d = n[a];
                  if (null != d)
                    switch (a) {
                      case "name":
                        l = d;
                        break;
                      case "type":
                        i = d;
                        break;
                      case "checked":
                        u = d;
                        break;
                      case "defaultChecked":
                        c = d;
                        break;
                      case "value":
                        r = d;
                        break;
                      case "defaultValue":
                        s = d;
                        break;
                      case "children":
                      case "dangerouslySetInnerHTML":
                        if (null != d) throw Error(o(137, t));
                        break;
                      default:
                        cd(e, t, a, d, n, null);
                    }
                }
              return void vt(e, r, s, u, c, i, l, !1);
            case "select":
              for (l in (Gc("invalid", e), (a = i = r = null), n))
                if (n.hasOwnProperty(l) && null != (s = n[l]))
                  switch (l) {
                    case "value":
                      r = s;
                      break;
                    case "defaultValue":
                      i = s;
                      break;
                    case "multiple":
                      a = s;
                    default:
                      cd(e, t, l, s, n, null);
                  }
              return (
                (t = r),
                (n = i),
                (e.multiple = !!a),
                void (null != t
                  ? kt(e, !!a, t, !1)
                  : null != n && kt(e, !!a, n, !0))
              );
            case "textarea":
              for (i in (Gc("invalid", e), (r = l = a = null), n))
                if (n.hasOwnProperty(i) && null != (s = n[i]))
                  switch (i) {
                    case "value":
                      a = s;
                      break;
                    case "defaultValue":
                      l = s;
                      break;
                    case "children":
                      r = s;
                      break;
                    case "dangerouslySetInnerHTML":
                      if (null != s) throw Error(o(91));
                      break;
                    default:
                      cd(e, t, i, s, n, null);
                  }
              return void St(e, a, l, r);
            case "option":
              for (u in n)
                if (n.hasOwnProperty(u) && null != (a = n[u]))
                  if ("selected" === u)
                    e.selected =
                      a && "function" !== typeof a && "symbol" !== typeof a;
                  else cd(e, t, u, a, n, null);
              return;
            case "dialog":
              (Gc("beforetoggle", e),
                Gc("toggle", e),
                Gc("cancel", e),
                Gc("close", e));
              break;
            case "iframe":
            case "object":
              Gc("load", e);
              break;
            case "video":
            case "audio":
              for (a = 0; a < Qc.length; a++) Gc(Qc[a], e);
              break;
            case "image":
              (Gc("error", e), Gc("load", e));
              break;
            case "details":
              Gc("toggle", e);
              break;
            case "embed":
            case "source":
            case "link":
              (Gc("error", e), Gc("load", e));
            case "area":
            case "base":
            case "br":
            case "col":
            case "hr":
            case "keygen":
            case "meta":
            case "param":
            case "track":
            case "wbr":
            case "menuitem":
              for (c in n)
                if (n.hasOwnProperty(c) && null != (a = n[c]))
                  switch (c) {
                    case "children":
                    case "dangerouslySetInnerHTML":
                      throw Error(o(137, t));
                    default:
                      cd(e, t, c, a, n, null);
                  }
              return;
            default:
              if (zt(t)) {
                for (d in n)
                  n.hasOwnProperty(d) &&
                    void 0 !== (a = n[d]) &&
                    dd(e, t, d, a, n, void 0);
                return;
              }
          }
          for (s in n)
            n.hasOwnProperty(s) &&
              null != (a = n[s]) &&
              cd(e, t, s, a, n, null);
        }
        function pd(e) {
          switch (e) {
            case "css":
            case "script":
            case "font":
            case "img":
            case "image":
            case "input":
            case "link":
              return !0;
            default:
              return !1;
          }
        }
        var hd = null,
          md = null;
        function gd(e) {
          return 9 === e.nodeType ? e : e.ownerDocument;
        }
        function yd(e) {
          switch (e) {
            case "http://www.w3.org/2000/svg":
              return 1;
            case "http://www.w3.org/1998/Math/MathML":
              return 2;
            default:
              return 0;
          }
        }
        function bd(e, t) {
          if (0 === e)
            switch (t) {
              case "svg":
                return 1;
              case "math":
                return 2;
              default:
                return 0;
            }
          return 1 === e && "foreignObject" === t ? 0 : e;
        }
        function vd(e, t) {
          return (
            "textarea" === e ||
            "noscript" === e ||
            "string" === typeof t.children ||
            "number" === typeof t.children ||
            "bigint" === typeof t.children ||
            ("object" === typeof t.dangerouslySetInnerHTML &&
              null !== t.dangerouslySetInnerHTML &&
              null != t.dangerouslySetInnerHTML.__html)
          );
        }
        var xd = null;
        var kd = "function" === typeof setTimeout ? setTimeout : void 0,
          wd = "function" === typeof clearTimeout ? clearTimeout : void 0,
          Sd = "function" === typeof Promise ? Promise : void 0,
          Nd =
            "function" === typeof queueMicrotask
              ? queueMicrotask
              : "undefined" !== typeof Sd
                ? function (e) {
                    return Sd.resolve(null).then(e).catch(Ed);
                  }
                : kd;
        function Ed(e) {
          setTimeout(function () {
            throw e;
          });
        }
        function Cd(e) {
          return "head" === e;
        }
        function jd(e, t) {
          var n = t,
            r = 0;
          do {
            var a = n.nextSibling;
            if ((e.removeChild(n), a && 8 === a.nodeType))
              if ("/$" === (n = a.data) || "/&" === n) {
                if (0 === r) return (e.removeChild(a), void $f(t));
                r--;
              } else if (
                "$" === n ||
                "$?" === n ||
                "$~" === n ||
                "$!" === n ||
                "&" === n
              )
                r++;
              else if ("html" === n) Md(e.ownerDocument.documentElement);
              else if ("head" === n) {
                Md((n = e.ownerDocument.head));
                for (var l = n.firstChild; l; ) {
                  var o = l.nextSibling,
                    i = l.nodeName;
                  (l[Ke] ||
                    "SCRIPT" === i ||
                    "STYLE" === i ||
                    ("LINK" === i && "stylesheet" === l.rel.toLowerCase()) ||
                    n.removeChild(l),
                    (l = o));
                }
              } else "body" === n && Md(e.ownerDocument.body);
            n = a;
          } while (n);
          $f(t);
        }
        function zd(e, t) {
          var n = e;
          e = 0;
          do {
            var r = n.nextSibling;
            if (
              (1 === n.nodeType
                ? t
                  ? ((n._stashedDisplay = n.style.display),
                    (n.style.display = "none"))
                  : ((n.style.display = n._stashedDisplay || ""),
                    "" === n.getAttribute("style") &&
                      n.removeAttribute("style"))
                : 3 === n.nodeType &&
                  (t
                    ? ((n._stashedText = n.nodeValue), (n.nodeValue = ""))
                    : (n.nodeValue = n._stashedText || "")),
              r && 8 === r.nodeType)
            )
              if ("/$" === (n = r.data)) {
                if (0 === e) break;
                e--;
              } else
                ("$" !== n && "$?" !== n && "$~" !== n && "$!" !== n) || e++;
            n = r;
          } while (n);
        }
        function Pd(e) {
          var t = e.firstChild;
          for (t && 10 === t.nodeType && (t = t.nextSibling); t; ) {
            var n = t;
            switch (((t = t.nextSibling), n.nodeName)) {
              case "HTML":
              case "HEAD":
              case "BODY":
                (Pd(n), Ye(n));
                continue;
              case "SCRIPT":
              case "STYLE":
                continue;
              case "LINK":
                if ("stylesheet" === n.rel.toLowerCase()) continue;
            }
            e.removeChild(n);
          }
        }
        function Td(e, t) {
          for (; 8 !== e.nodeType; ) {
            if (
              (1 !== e.nodeType ||
                "INPUT" !== e.nodeName ||
                "hidden" !== e.type) &&
              !t
            )
              return null;
            if (null === (e = Ad(e.nextSibling))) return null;
          }
          return e;
        }
        function _d(e) {
          return "$?" === e.data || "$~" === e.data;
        }
        function Ld(e) {
          return (
            "$!" === e.data ||
            ("$?" === e.data && "loading" !== e.ownerDocument.readyState)
          );
        }
        function Ad(e) {
          for (; null != e; e = e.nextSibling) {
            var t = e.nodeType;
            if (1 === t || 3 === t) break;
            if (8 === t) {
              if (
                "$" === (t = e.data) ||
                "$!" === t ||
                "$?" === t ||
                "$~" === t ||
                "&" === t ||
                "F!" === t ||
                "F" === t
              )
                break;
              if ("/$" === t || "/&" === t) return null;
            }
          }
          return e;
        }
        var Id = null;
        function Od(e) {
          e = e.nextSibling;
          for (var t = 0; e; ) {
            if (8 === e.nodeType) {
              var n = e.data;
              if ("/$" === n || "/&" === n) {
                if (0 === t) return Ad(e.nextSibling);
                t--;
              } else
                ("$" !== n &&
                  "$!" !== n &&
                  "$?" !== n &&
                  "$~" !== n &&
                  "&" !== n) ||
                  t++;
            }
            e = e.nextSibling;
          }
          return null;
        }
        function Rd(e) {
          e = e.previousSibling;
          for (var t = 0; e; ) {
            if (8 === e.nodeType) {
              var n = e.data;
              if (
                "$" === n ||
                "$!" === n ||
                "$?" === n ||
                "$~" === n ||
                "&" === n
              ) {
                if (0 === t) return e;
                t--;
              } else ("/$" !== n && "/&" !== n) || t++;
            }
            e = e.previousSibling;
          }
          return null;
        }
        function Dd(e, t, n) {
          switch (((t = gd(n)), e)) {
            case "html":
              if (!(e = t.documentElement)) throw Error(o(452));
              return e;
            case "head":
              if (!(e = t.head)) throw Error(o(453));
              return e;
            case "body":
              if (!(e = t.body)) throw Error(o(454));
              return e;
            default:
              throw Error(o(451));
          }
        }
        function Md(e) {
          for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
          Ye(e);
        }
        var Fd = new Map(),
          Ud = new Set();
        function Hd(e) {
          return "function" === typeof e.getRootNode
            ? e.getRootNode()
            : 9 === e.nodeType
              ? e
              : e.ownerDocument;
        }
        var Bd = O.d;
        O.d = {
          f: function () {
            var e = Bd.f(),
              t = Ju();
            return e || t;
          },
          r: function (e) {
            var t = Xe(e);
            null !== t && 5 === t.tag && "form" === t.type ? ri(t) : Bd.r(e);
          },
          D: function (e) {
            (Bd.D(e), Wd("dns-prefetch", e, null));
          },
          C: function (e, t) {
            (Bd.C(e, t), Wd("preconnect", e, t));
          },
          L: function (e, t, n) {
            Bd.L(e, t, n);
            var r = Vd;
            if (r && e && t) {
              var a = 'link[rel="preload"][as="' + yt(t) + '"]';
              "image" === t && n && n.imageSrcSet
                ? ((a += '[imagesrcset="' + yt(n.imageSrcSet) + '"]'),
                  "string" === typeof n.imageSizes &&
                    (a += '[imagesizes="' + yt(n.imageSizes) + '"]'))
                : (a += '[href="' + yt(e) + '"]');
              var l = a;
              switch (t) {
                case "style":
                  l = qd(e);
                  break;
                case "script":
                  l = Yd(e);
              }
              Fd.has(l) ||
                ((e = p(
                  {
                    rel: "preload",
                    href: "image" === t && n && n.imageSrcSet ? void 0 : e,
                    as: t,
                  },
                  n,
                )),
                Fd.set(l, e),
                null !== r.querySelector(a) ||
                  ("style" === t && r.querySelector(Qd(l))) ||
                  ("script" === t && r.querySelector(Gd(l))) ||
                  (fd((t = r.createElement("link")), "link", e),
                  et(t),
                  r.head.appendChild(t)));
            }
          },
          m: function (e, t) {
            Bd.m(e, t);
            var n = Vd;
            if (n && e) {
              var r = t && "string" === typeof t.as ? t.as : "script",
                a =
                  'link[rel="modulepreload"][as="' +
                  yt(r) +
                  '"][href="' +
                  yt(e) +
                  '"]',
                l = a;
              switch (r) {
                case "audioworklet":
                case "paintworklet":
                case "serviceworker":
                case "sharedworker":
                case "worker":
                case "script":
                  l = Yd(e);
              }
              if (
                !Fd.has(l) &&
                ((e = p({ rel: "modulepreload", href: e }, t)),
                Fd.set(l, e),
                null === n.querySelector(a))
              ) {
                switch (r) {
                  case "audioworklet":
                  case "paintworklet":
                  case "serviceworker":
                  case "sharedworker":
                  case "worker":
                  case "script":
                    if (n.querySelector(Gd(l))) return;
                }
                (fd((r = n.createElement("link")), "link", e),
                  et(r),
                  n.head.appendChild(r));
              }
            }
          },
          X: function (e, t) {
            Bd.X(e, t);
            var n = Vd;
            if (n && e) {
              var r = Je(n).hoistableScripts,
                a = Yd(e),
                l = r.get(a);
              l ||
                ((l = n.querySelector(Gd(a))) ||
                  ((e = p({ src: e, async: !0 }, t)),
                  (t = Fd.get(a)) && ef(e, t),
                  et((l = n.createElement("script"))),
                  fd(l, "link", e),
                  n.head.appendChild(l)),
                (l = { type: "script", instance: l, count: 1, state: null }),
                r.set(a, l));
            }
          },
          S: function (e, t, n) {
            Bd.S(e, t, n);
            var r = Vd;
            if (r && e) {
              var a = Je(r).hoistableStyles,
                l = qd(e);
              t = t || "default";
              var o = a.get(l);
              if (!o) {
                var i = { loading: 0, preload: null };
                if ((o = r.querySelector(Qd(l)))) i.loading = 5;
                else {
                  ((e = p(
                    { rel: "stylesheet", href: e, "data-precedence": t },
                    n,
                  )),
                    (n = Fd.get(l)) && Jd(e, n));
                  var s = (o = r.createElement("link"));
                  (et(s),
                    fd(s, "link", e),
                    (s._p = new Promise(function (e, t) {
                      ((s.onload = e), (s.onerror = t));
                    })),
                    s.addEventListener("load", function () {
                      i.loading |= 1;
                    }),
                    s.addEventListener("error", function () {
                      i.loading |= 2;
                    }),
                    (i.loading |= 4),
                    Zd(o, t, r));
                }
                ((o = { type: "stylesheet", instance: o, count: 1, state: i }),
                  a.set(l, o));
              }
            }
          },
          M: function (e, t) {
            Bd.M(e, t);
            var n = Vd;
            if (n && e) {
              var r = Je(n).hoistableScripts,
                a = Yd(e),
                l = r.get(a);
              l ||
                ((l = n.querySelector(Gd(a))) ||
                  ((e = p({ src: e, async: !0, type: "module" }, t)),
                  (t = Fd.get(a)) && ef(e, t),
                  et((l = n.createElement("script"))),
                  fd(l, "link", e),
                  n.head.appendChild(l)),
                (l = { type: "script", instance: l, count: 1, state: null }),
                r.set(a, l));
            }
          },
        };
        var Vd = "undefined" === typeof document ? null : document;
        function Wd(e, t, n) {
          var r = Vd;
          if (r && "string" === typeof t && t) {
            var a = yt(t);
            ((a = 'link[rel="' + e + '"][href="' + a + '"]'),
              "string" === typeof n && (a += '[crossorigin="' + n + '"]'),
              Ud.has(a) ||
                (Ud.add(a),
                (e = { rel: e, crossOrigin: n, href: t }),
                null === r.querySelector(a) &&
                  (fd((t = r.createElement("link")), "link", e),
                  et(t),
                  r.head.appendChild(t))));
          }
        }
        function $d(e, t, n, r) {
          var a,
            l,
            i,
            s,
            u = (u = q.current) ? Hd(u) : null;
          if (!u) throw Error(o(446));
          switch (e) {
            case "meta":
            case "title":
              return null;
            case "style":
              return "string" === typeof n.precedence &&
                "string" === typeof n.href
                ? ((t = qd(n.href)),
                  (r = (n = Je(u).hoistableStyles).get(t)) ||
                    ((r = {
                      type: "style",
                      instance: null,
                      count: 0,
                      state: null,
                    }),
                    n.set(t, r)),
                  r)
                : { type: "void", instance: null, count: 0, state: null };
            case "link":
              if (
                "stylesheet" === n.rel &&
                "string" === typeof n.href &&
                "string" === typeof n.precedence
              ) {
                e = qd(n.href);
                var c = Je(u).hoistableStyles,
                  d = c.get(e);
                if (
                  (d ||
                    ((u = u.ownerDocument || u),
                    (d = {
                      type: "stylesheet",
                      instance: null,
                      count: 0,
                      state: { loading: 0, preload: null },
                    }),
                    c.set(e, d),
                    (c = u.querySelector(Qd(e))) &&
                      !c._p &&
                      ((d.instance = c), (d.state.loading = 5)),
                    Fd.has(e) ||
                      ((n = {
                        rel: "preload",
                        as: "style",
                        href: n.href,
                        crossOrigin: n.crossOrigin,
                        integrity: n.integrity,
                        media: n.media,
                        hrefLang: n.hrefLang,
                        referrerPolicy: n.referrerPolicy,
                      }),
                      Fd.set(e, n),
                      c ||
                        ((a = u),
                        (l = e),
                        (i = n),
                        (s = d.state),
                        a.querySelector(
                          'link[rel="preload"][as="style"][' + l + "]",
                        )
                          ? (s.loading = 1)
                          : ((l = a.createElement("link")),
                            (s.preload = l),
                            l.addEventListener("load", function () {
                              return (s.loading |= 1);
                            }),
                            l.addEventListener("error", function () {
                              return (s.loading |= 2);
                            }),
                            fd(l, "link", i),
                            et(l),
                            a.head.appendChild(l))))),
                  t && null === r)
                )
                  throw Error(o(528, ""));
                return d;
              }
              if (t && null !== r) throw Error(o(529, ""));
              return null;
            case "script":
              return (
                (t = n.async),
                "string" === typeof (n = n.src) &&
                t &&
                "function" !== typeof t &&
                "symbol" !== typeof t
                  ? ((t = Yd(n)),
                    (r = (n = Je(u).hoistableScripts).get(t)) ||
                      ((r = {
                        type: "script",
                        instance: null,
                        count: 0,
                        state: null,
                      }),
                      n.set(t, r)),
                    r)
                  : { type: "void", instance: null, count: 0, state: null }
              );
            default:
              throw Error(o(444, e));
          }
        }
        function qd(e) {
          return 'href="' + yt(e) + '"';
        }
        function Qd(e) {
          return 'link[rel="stylesheet"][' + e + "]";
        }
        function Kd(e) {
          return p({}, e, {
            "data-precedence": e.precedence,
            precedence: null,
          });
        }
        function Yd(e) {
          return '[src="' + yt(e) + '"]';
        }
        function Gd(e) {
          return "script[async]" + e;
        }
        function Xd(e, t, n) {
          if ((t.count++, null === t.instance))
            switch (t.type) {
              case "style":
                var r = e.querySelector(
                  'style[data-href~="' + yt(n.href) + '"]',
                );
                if (r) return ((t.instance = r), et(r), r);
                var a = p({}, n, {
                  "data-href": n.href,
                  "data-precedence": n.precedence,
                  href: null,
                  precedence: null,
                });
                return (
                  et((r = (e.ownerDocument || e).createElement("style"))),
                  fd(r, "style", a),
                  Zd(r, n.precedence, e),
                  (t.instance = r)
                );
              case "stylesheet":
                a = qd(n.href);
                var l = e.querySelector(Qd(a));
                if (l)
                  return ((t.state.loading |= 4), (t.instance = l), et(l), l);
                ((r = Kd(n)),
                  (a = Fd.get(a)) && Jd(r, a),
                  et((l = (e.ownerDocument || e).createElement("link"))));
                var i = l;
                return (
                  (i._p = new Promise(function (e, t) {
                    ((i.onload = e), (i.onerror = t));
                  })),
                  fd(l, "link", r),
                  (t.state.loading |= 4),
                  Zd(l, n.precedence, e),
                  (t.instance = l)
                );
              case "script":
                return (
                  (l = Yd(n.src)),
                  (a = e.querySelector(Gd(l)))
                    ? ((t.instance = a), et(a), a)
                    : ((r = n),
                      (a = Fd.get(l)) && ef((r = p({}, n)), a),
                      et(
                        (a = (e = e.ownerDocument || e).createElement(
                          "script",
                        )),
                      ),
                      fd(a, "link", r),
                      e.head.appendChild(a),
                      (t.instance = a))
                );
              case "void":
                return null;
              default:
                throw Error(o(443, t.type));
            }
          else
            "stylesheet" === t.type &&
              0 === (4 & t.state.loading) &&
              ((r = t.instance),
              (t.state.loading |= 4),
              Zd(r, n.precedence, e));
          return t.instance;
        }
        function Zd(e, t, n) {
          for (
            var r = n.querySelectorAll(
                'link[rel="stylesheet"][data-precedence],style[data-precedence]',
              ),
              a = r.length ? r[r.length - 1] : null,
              l = a,
              o = 0;
            o < r.length;
            o++
          ) {
            var i = r[o];
            if (i.dataset.precedence === t) l = i;
            else if (l !== a) break;
          }
          l
            ? l.parentNode.insertBefore(e, l.nextSibling)
            : (t = 9 === n.nodeType ? n.head : n).insertBefore(e, t.firstChild);
        }
        function Jd(e, t) {
          (null == e.crossOrigin && (e.crossOrigin = t.crossOrigin),
            null == e.referrerPolicy && (e.referrerPolicy = t.referrerPolicy),
            null == e.title && (e.title = t.title));
        }
        function ef(e, t) {
          (null == e.crossOrigin && (e.crossOrigin = t.crossOrigin),
            null == e.referrerPolicy && (e.referrerPolicy = t.referrerPolicy),
            null == e.integrity && (e.integrity = t.integrity));
        }
        var tf = null;
        function nf(e, t, n) {
          if (null === tf) {
            var r = new Map(),
              a = (tf = new Map());
            a.set(n, r);
          } else (r = (a = tf).get(n)) || ((r = new Map()), a.set(n, r));
          if (r.has(e)) return r;
          for (
            r.set(e, null), n = n.getElementsByTagName(e), a = 0;
            a < n.length;
            a++
          ) {
            var l = n[a];
            if (
              !(
                l[Ke] ||
                l[He] ||
                ("link" === e && "stylesheet" === l.getAttribute("rel"))
              ) &&
              "http://www.w3.org/2000/svg" !== l.namespaceURI
            ) {
              var o = l.getAttribute(t) || "";
              o = e + o;
              var i = r.get(o);
              i ? i.push(l) : r.set(o, [l]);
            }
          }
          return r;
        }
        function rf(e, t, n) {
          (e = e.ownerDocument || e).head.insertBefore(
            n,
            "title" === t ? e.querySelector("head > title") : null,
          );
        }
        function af(e) {
          return "stylesheet" !== e.type || 0 !== (3 & e.state.loading);
        }
        var lf = 0;
        function of() {
          if (
            (this.count--,
            0 === this.count && (0 === this.imgCount || !this.waitingForImages))
          )
            if (this.stylesheets) uf(this, this.stylesheets);
            else if (this.unsuspend) {
              var e = this.unsuspend;
              ((this.unsuspend = null), e());
            }
        }
        var sf = null;
        function uf(e, t) {
          ((e.stylesheets = null),
            null !== e.unsuspend &&
              (e.count++,
              (sf = new Map()),
              t.forEach(cf, e),
              (sf = null),
              of.call(e)));
        }
        function cf(e, t) {
          if (!(4 & t.state.loading)) {
            var n = sf.get(e);
            if (n) var r = n.get(null);
            else {
              ((n = new Map()), sf.set(e, n));
              for (
                var a = e.querySelectorAll(
                    "link[data-precedence],style[data-precedence]",
                  ),
                  l = 0;
                l < a.length;
                l++
              ) {
                var o = a[l];
                ("LINK" !== o.nodeName &&
                  "not all" === o.getAttribute("media")) ||
                  (n.set(o.dataset.precedence, o), (r = o));
              }
              r && n.set(null, r);
            }
            ((o = (a = t.instance).getAttribute("data-precedence")),
              (l = n.get(o) || r) === r && n.set(null, a),
              n.set(o, a),
              this.count++,
              (r = of.bind(this)),
              a.addEventListener("load", r),
              a.addEventListener("error", r),
              l
                ? l.parentNode.insertBefore(a, l.nextSibling)
                : (e = 9 === e.nodeType ? e.head : e).insertBefore(
                    a,
                    e.firstChild,
                  ),
              (t.state.loading |= 4));
          }
        }
        var df = {
          $$typeof: k,
          Provider: null,
          Consumer: null,
          _currentValue: R,
          _currentValue2: R,
          _threadCount: 0,
        };
        function ff(e, t, n, r, a, l, o, i, s) {
          ((this.tag = 1),
            (this.containerInfo = e),
            (this.pingCache = this.current = this.pendingChildren = null),
            (this.timeoutHandle = -1),
            (this.callbackNode =
              this.next =
              this.pendingContext =
              this.context =
              this.cancelPendingCommit =
                null),
            (this.callbackPriority = 0),
            (this.expirationTimes = _e(-1)),
            (this.entangledLanes =
              this.shellSuspendCounter =
              this.errorRecoveryDisabledLanes =
              this.expiredLanes =
              this.warmLanes =
              this.pingedLanes =
              this.suspendedLanes =
              this.pendingLanes =
                0),
            (this.entanglements = _e(0)),
            (this.hiddenUpdates = _e(null)),
            (this.identifierPrefix = r),
            (this.onUncaughtError = a),
            (this.onCaughtError = l),
            (this.onRecoverableError = o),
            (this.pooledCache = null),
            (this.pooledCacheLanes = 0),
            (this.formState = s),
            (this.incompleteTransitions = new Map()));
        }
        function pf(e, t, n, r, a, l, o, i, s, u, c, d) {
          return (
            (e = new ff(e, t, n, o, s, u, c, d, i)),
            (t = 1),
            !0 === l && (t |= 24),
            (l = Mr(3, null, null, t)),
            (e.current = l),
            (l.stateNode = e),
            (t = Fa()).refCount++,
            (e.pooledCache = t),
            t.refCount++,
            (l.memoizedState = { element: r, isDehydrated: n, cache: t }),
            gl(l),
            e
          );
        }
        function hf(e) {
          return e ? (e = Rr) : Rr;
        }
        function mf(e, t, n, r, a, l) {
          ((a = hf(a)),
            null === r.context ? (r.context = a) : (r.pendingContext = a),
            ((r = bl(t)).payload = { element: n }),
            null !== (l = void 0 === l ? null : l) && (r.callback = l),
            null !== (n = vl(e, r, t)) && (Ku(n, 0, t), xl(n, e, t)));
        }
        function gf(e, t) {
          if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
            var n = e.retryLane;
            e.retryLane = 0 !== n && n < t ? n : t;
          }
        }
        function yf(e, t) {
          (gf(e, t), (e = e.alternate) && gf(e, t));
        }
        function bf(e) {
          if (13 === e.tag || 31 === e.tag) {
            var t = Ar(e, 67108864);
            (null !== t && Ku(t, 0, 67108864), yf(e, 67108864));
          }
        }
        function vf(e) {
          if (13 === e.tag || 31 === e.tag) {
            var t = qu(),
              n = Ar(e, (t = Re(t)));
            (null !== n && Ku(n, 0, t), yf(e, t));
          }
        }
        var xf = !0;
        function kf(e, t, n, r) {
          var a = I.T;
          I.T = null;
          var l = O.p;
          try {
            ((O.p = 2), Sf(e, t, n, r));
          } finally {
            ((O.p = l), (I.T = a));
          }
        }
        function wf(e, t, n, r) {
          var a = I.T;
          I.T = null;
          var l = O.p;
          try {
            ((O.p = 8), Sf(e, t, n, r));
          } finally {
            ((O.p = l), (I.T = a));
          }
        }
        function Sf(e, t, n, r) {
          if (xf) {
            var a = Nf(r);
            if (null === a) (td(e, t, r, Ef, n), Rf(e, r));
            else if (
              (function (e, t, n, r, a) {
                switch (t) {
                  case "focusin":
                    return ((Pf = Df(Pf, e, t, n, r, a)), !0);
                  case "dragenter":
                    return ((Tf = Df(Tf, e, t, n, r, a)), !0);
                  case "mouseover":
                    return ((_f = Df(_f, e, t, n, r, a)), !0);
                  case "pointerover":
                    var l = a.pointerId;
                    return (
                      Lf.set(l, Df(Lf.get(l) || null, e, t, n, r, a)),
                      !0
                    );
                  case "gotpointercapture":
                    return (
                      (l = a.pointerId),
                      Af.set(l, Df(Af.get(l) || null, e, t, n, r, a)),
                      !0
                    );
                }
                return !1;
              })(a, e, t, n, r)
            )
              r.stopPropagation();
            else if ((Rf(e, r), 4 & t && -1 < Of.indexOf(e))) {
              for (; null !== a; ) {
                var l = Xe(a);
                if (null !== l)
                  switch (l.tag) {
                    case 3:
                      if (
                        (l = l.stateNode).current.memoizedState.isDehydrated
                      ) {
                        var o = Ce(l.pendingLanes);
                        if (0 !== o) {
                          var i = l;
                          for (
                            i.pendingLanes |= 2, i.entangledLanes |= 2;
                            o;
                          ) {
                            var s = 1 << (31 - xe(o));
                            ((i.entanglements[1] |= s), (o &= ~s));
                          }
                          (Oc(l),
                            0 === (6 & pu) && ((Iu = se() + 500), Rc(0, !1)));
                        }
                      }
                      break;
                    case 31:
                    case 13:
                      (null !== (i = Ar(l, 2)) && Ku(i, 0, 2), Ju(), yf(l, 2));
                  }
                if ((null === (l = Nf(r)) && td(e, t, r, Ef, n), l === a))
                  break;
                a = l;
              }
              null !== a && r.stopPropagation();
            } else td(e, t, r, null, n);
          }
        }
        function Nf(e) {
          return Cf((e = It(e)));
        }
        var Ef = null;
        function Cf(e) {
          if (((Ef = null), null !== (e = Ge(e)))) {
            var t = s(e);
            if (null === t) e = null;
            else {
              var n = t.tag;
              if (13 === n) {
                if (null !== (e = u(t))) return e;
                e = null;
              } else if (31 === n) {
                if (null !== (e = c(t))) return e;
                e = null;
              } else if (3 === n) {
                if (t.stateNode.current.memoizedState.isDehydrated)
                  return 3 === t.tag ? t.stateNode.containerInfo : null;
                e = null;
              } else t !== e && (e = null);
            }
          }
          return ((Ef = e), null);
        }
        function jf(e) {
          switch (e) {
            case "beforetoggle":
            case "cancel":
            case "click":
            case "close":
            case "contextmenu":
            case "copy":
            case "cut":
            case "auxclick":
            case "dblclick":
            case "dragend":
            case "dragstart":
            case "drop":
            case "focusin":
            case "focusout":
            case "input":
            case "invalid":
            case "keydown":
            case "keypress":
            case "keyup":
            case "mousedown":
            case "mouseup":
            case "paste":
            case "pause":
            case "play":
            case "pointercancel":
            case "pointerdown":
            case "pointerup":
            case "ratechange":
            case "reset":
            case "resize":
            case "seeked":
            case "submit":
            case "toggle":
            case "touchcancel":
            case "touchend":
            case "touchstart":
            case "volumechange":
            case "change":
            case "selectionchange":
            case "textInput":
            case "compositionstart":
            case "compositionend":
            case "compositionupdate":
            case "beforeblur":
            case "afterblur":
            case "beforeinput":
            case "blur":
            case "fullscreenchange":
            case "focus":
            case "hashchange":
            case "popstate":
            case "select":
            case "selectstart":
              return 2;
            case "drag":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "mousemove":
            case "mouseout":
            case "mouseover":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "scroll":
            case "touchmove":
            case "wheel":
            case "mouseenter":
            case "mouseleave":
            case "pointerenter":
            case "pointerleave":
              return 8;
            case "message":
              switch (ue()) {
                case ce:
                  return 2;
                case de:
                  return 8;
                case fe:
                case pe:
                  return 32;
                case he:
                  return 268435456;
                default:
                  return 32;
              }
            default:
              return 32;
          }
        }
        var zf = !1,
          Pf = null,
          Tf = null,
          _f = null,
          Lf = new Map(),
          Af = new Map(),
          If = [],
          Of =
            "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
              " ",
            );
        function Rf(e, t) {
          switch (e) {
            case "focusin":
            case "focusout":
              Pf = null;
              break;
            case "dragenter":
            case "dragleave":
              Tf = null;
              break;
            case "mouseover":
            case "mouseout":
              _f = null;
              break;
            case "pointerover":
            case "pointerout":
              Lf.delete(t.pointerId);
              break;
            case "gotpointercapture":
            case "lostpointercapture":
              Af.delete(t.pointerId);
          }
        }
        function Df(e, t, n, r, a, l) {
          return null === e || e.nativeEvent !== l
            ? ((e = {
                blockedOn: t,
                domEventName: n,
                eventSystemFlags: r,
                nativeEvent: l,
                targetContainers: [a],
              }),
              null !== t && null !== (t = Xe(t)) && bf(t),
              e)
            : ((e.eventSystemFlags |= r),
              (t = e.targetContainers),
              null !== a && -1 === t.indexOf(a) && t.push(a),
              e);
        }
        function Mf(e) {
          var t = Ge(e.target);
          if (null !== t) {
            var n = s(t);
            if (null !== n)
              if (13 === (t = n.tag)) {
                if (null !== (t = u(n)))
                  return (
                    (e.blockedOn = t),
                    void Fe(e.priority, function () {
                      vf(n);
                    })
                  );
              } else if (31 === t) {
                if (null !== (t = c(n)))
                  return (
                    (e.blockedOn = t),
                    void Fe(e.priority, function () {
                      vf(n);
                    })
                  );
              } else if (
                3 === t &&
                n.stateNode.current.memoizedState.isDehydrated
              )
                return void (e.blockedOn =
                  3 === n.tag ? n.stateNode.containerInfo : null);
          }
          e.blockedOn = null;
        }
        function Ff(e) {
          if (null !== e.blockedOn) return !1;
          for (var t = e.targetContainers; 0 < t.length; ) {
            var n = Nf(e.nativeEvent);
            if (null !== n)
              return (null !== (t = Xe(n)) && bf(t), (e.blockedOn = n), !1);
            var r = new (n = e.nativeEvent).constructor(n.type, n);
            ((At = r), n.target.dispatchEvent(r), (At = null), t.shift());
          }
          return !0;
        }
        function Uf(e, t, n) {
          Ff(e) && n.delete(t);
        }
        function Hf() {
          ((zf = !1),
            null !== Pf && Ff(Pf) && (Pf = null),
            null !== Tf && Ff(Tf) && (Tf = null),
            null !== _f && Ff(_f) && (_f = null),
            Lf.forEach(Uf),
            Af.forEach(Uf));
        }
        function Bf(e, t) {
          e.blockedOn === t &&
            ((e.blockedOn = null),
            zf ||
              ((zf = !0),
              r.unstable_scheduleCallback(r.unstable_NormalPriority, Hf)));
        }
        var Vf = null;
        function Wf(e) {
          Vf !== e &&
            ((Vf = e),
            r.unstable_scheduleCallback(r.unstable_NormalPriority, function () {
              Vf === e && (Vf = null);
              for (var t = 0; t < e.length; t += 3) {
                var n = e[t],
                  r = e[t + 1],
                  a = e[t + 2];
                if ("function" !== typeof r) {
                  if (null === Cf(r || n)) continue;
                  break;
                }
                var l = Xe(n);
                null !== l &&
                  (e.splice(t, 3),
                  (t -= 3),
                  ti(
                    l,
                    { pending: !0, data: a, method: n.method, action: r },
                    r,
                    a,
                  ));
              }
            }));
        }
        function $f(e) {
          function t(t) {
            return Bf(t, e);
          }
          (null !== Pf && Bf(Pf, e),
            null !== Tf && Bf(Tf, e),
            null !== _f && Bf(_f, e),
            Lf.forEach(t),
            Af.forEach(t));
          for (var n = 0; n < If.length; n++) {
            var r = If[n];
            r.blockedOn === e && (r.blockedOn = null);
          }
          for (; 0 < If.length && null === (n = If[0]).blockedOn; )
            (Mf(n), null === n.blockedOn && If.shift());
          if (null != (n = (e.ownerDocument || e).$$reactFormReplay))
            for (r = 0; r < n.length; r += 3) {
              var a = n[r],
                l = n[r + 1],
                o = a[Be] || null;
              if ("function" === typeof l) o || Wf(n);
              else if (o) {
                var i = null;
                if (l && l.hasAttribute("formAction")) {
                  if (((a = l), (o = l[Be] || null))) i = o.formAction;
                  else if (null !== Cf(a)) continue;
                } else i = o.action;
                ("function" === typeof i
                  ? (n[r + 1] = i)
                  : (n.splice(r, 3), (r -= 3)),
                  Wf(n));
              }
            }
        }
        function qf() {
          function e(e) {
            e.canIntercept &&
              "react-transition" === e.info &&
              e.intercept({
                handler: function () {
                  return new Promise(function (e) {
                    return (a = e);
                  });
                },
                focusReset: "manual",
                scroll: "manual",
              });
          }
          function t() {
            (null !== a && (a(), (a = null)), r || setTimeout(n, 20));
          }
          function n() {
            if (!r && !navigation.transition) {
              var e = navigation.currentEntry;
              e &&
                null != e.url &&
                navigation.navigate(e.url, {
                  state: e.getState(),
                  info: "react-transition",
                  history: "replace",
                });
            }
          }
          if ("object" === typeof navigation) {
            var r = !1,
              a = null;
            return (
              navigation.addEventListener("navigate", e),
              navigation.addEventListener("navigatesuccess", t),
              navigation.addEventListener("navigateerror", t),
              setTimeout(n, 100),
              function () {
                ((r = !0),
                  navigation.removeEventListener("navigate", e),
                  navigation.removeEventListener("navigatesuccess", t),
                  navigation.removeEventListener("navigateerror", t),
                  null !== a && (a(), (a = null)));
              }
            );
          }
        }
        function Qf(e) {
          this._internalRoot = e;
        }
        function Kf(e) {
          this._internalRoot = e;
        }
        ((Kf.prototype.render = Qf.prototype.render =
          function (e) {
            var t = this._internalRoot;
            if (null === t) throw Error(o(409));
            mf(t.current, qu(), e, t, null, null);
          }),
          (Kf.prototype.unmount = Qf.prototype.unmount =
            function () {
              var e = this._internalRoot;
              if (null !== e) {
                this._internalRoot = null;
                var t = e.containerInfo;
                (mf(e.current, 2, null, e, null, null), Ju(), (t[Ve] = null));
              }
            }),
          (Kf.prototype.unstable_scheduleHydration = function (e) {
            if (e) {
              var t = Me();
              e = { blockedOn: null, target: e, priority: t };
              for (
                var n = 0;
                n < If.length && 0 !== t && t < If[n].priority;
                n++
              );
              (If.splice(n, 0, e), 0 === n && Mf(e));
            }
          }));
        var Yf = a.version;
        if ("19.2.7" !== Yf) throw Error(o(527, Yf, "19.2.7"));
        O.findDOMNode = function (e) {
          var t = e._reactInternals;
          if (void 0 === t) {
            if ("function" === typeof e.render) throw Error(o(188));
            throw ((e = Object.keys(e).join(",")), Error(o(268, e)));
          }
          return (
            (e = (function (e) {
              var t = e.alternate;
              if (!t) {
                if (null === (t = s(e))) throw Error(o(188));
                return t !== e ? null : e;
              }
              for (var n = e, r = t; ; ) {
                var a = n.return;
                if (null === a) break;
                var l = a.alternate;
                if (null === l) {
                  if (null !== (r = a.return)) {
                    n = r;
                    continue;
                  }
                  break;
                }
                if (a.child === l.child) {
                  for (l = a.child; l; ) {
                    if (l === n) return (d(a), e);
                    if (l === r) return (d(a), t);
                    l = l.sibling;
                  }
                  throw Error(o(188));
                }
                if (n.return !== r.return) ((n = a), (r = l));
                else {
                  for (var i = !1, u = a.child; u; ) {
                    if (u === n) {
                      ((i = !0), (n = a), (r = l));
                      break;
                    }
                    if (u === r) {
                      ((i = !0), (r = a), (n = l));
                      break;
                    }
                    u = u.sibling;
                  }
                  if (!i) {
                    for (u = l.child; u; ) {
                      if (u === n) {
                        ((i = !0), (n = l), (r = a));
                        break;
                      }
                      if (u === r) {
                        ((i = !0), (r = l), (n = a));
                        break;
                      }
                      u = u.sibling;
                    }
                    if (!i) throw Error(o(189));
                  }
                }
                if (n.alternate !== r) throw Error(o(190));
              }
              if (3 !== n.tag) throw Error(o(188));
              return n.stateNode.current === n ? e : t;
            })(t)),
            (e = null === (e = null !== e ? f(e) : null) ? null : e.stateNode)
          );
        };
        var Gf = {
          bundleType: 0,
          version: "19.2.7",
          rendererPackageName: "react-dom",
          currentDispatcherRef: I,
          reconcilerVersion: "19.2.7",
        };
        if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
          var Xf = __REACT_DEVTOOLS_GLOBAL_HOOK__;
          if (!Xf.isDisabled && Xf.supportsFiber)
            try {
              ((ye = Xf.inject(Gf)), (be = Xf));
            } catch (Jf) {}
        }
        ((t.createRoot = function (e, t) {
          if (!i(e)) throw Error(o(299));
          var n = !1,
            r = "",
            a = Ni,
            l = Ei,
            s = Ci;
          return (
            null !== t &&
              void 0 !== t &&
              (!0 === t.unstable_strictMode && (n = !0),
              void 0 !== t.identifierPrefix && (r = t.identifierPrefix),
              void 0 !== t.onUncaughtError && (a = t.onUncaughtError),
              void 0 !== t.onCaughtError && (l = t.onCaughtError),
              void 0 !== t.onRecoverableError && (s = t.onRecoverableError)),
            (t = pf(e, 1, !1, null, 0, n, r, null, a, l, s, qf)),
            (e[Ve] = t.current),
            Jc(e),
            new Qf(t)
          );
        }),
          (t.hydrateRoot = function (e, t, n) {
            if (!i(e)) throw Error(o(299));
            var r = !1,
              a = "",
              l = Ni,
              s = Ei,
              u = Ci,
              c = null;
            return (
              null !== n &&
                void 0 !== n &&
                (!0 === n.unstable_strictMode && (r = !0),
                void 0 !== n.identifierPrefix && (a = n.identifierPrefix),
                void 0 !== n.onUncaughtError && (l = n.onUncaughtError),
                void 0 !== n.onCaughtError && (s = n.onCaughtError),
                void 0 !== n.onRecoverableError && (u = n.onRecoverableError),
                void 0 !== n.formState && (c = n.formState)),
              ((t = pf(e, 1, !0, t, 0, r, a, c, l, s, u, qf)).context =
                hf(null)),
              (n = t.current),
              ((a = bl((r = Re((r = qu()))))).callback = null),
              vl(n, a, r),
              (n = r),
              (t.current.lanes = n),
              Le(t, n),
              Oc(t),
              (e[Ve] = t.current),
              Jc(e),
              new Kf(t)
            );
          }),
          (t.version = "19.2.7"));
      },
      672(e, t, n) {
        var r = n(43);
        function a(e) {
          var t = "https://react.dev/errors/" + e;
          if (1 < arguments.length) {
            t += "?args[]=" + encodeURIComponent(arguments[1]);
            for (var n = 2; n < arguments.length; n++)
              t += "&args[]=" + encodeURIComponent(arguments[n]);
          }
          return (
            "Minified React error #" +
            e +
            "; visit " +
            t +
            " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
          );
        }
        function l() {}
        var o = {
            d: {
              f: l,
              r: function () {
                throw Error(a(522));
              },
              D: l,
              C: l,
              L: l,
              m: l,
              X: l,
              S: l,
              M: l,
            },
            p: 0,
            findDOMNode: null,
          },
          i = Symbol.for("react.portal");
        var s =
          r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
        function u(e, t) {
          return "font" === e
            ? ""
            : "string" === typeof t
              ? "use-credentials" === t
                ? t
                : ""
              : void 0;
        }
        ((t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
          (t.createPortal = function (e, t) {
            var n =
              2 < arguments.length && void 0 !== arguments[2]
                ? arguments[2]
                : null;
            if (
              !t ||
              (1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType)
            )
              throw Error(a(299));
            return (function (e, t, n) {
              var r =
                3 < arguments.length && void 0 !== arguments[3]
                  ? arguments[3]
                  : null;
              return {
                $$typeof: i,
                key: null == r ? null : "" + r,
                children: e,
                containerInfo: t,
                implementation: n,
              };
            })(e, t, null, n);
          }),
          (t.flushSync = function (e) {
            var t = s.T,
              n = o.p;
            try {
              if (((s.T = null), (o.p = 2), e)) return e();
            } finally {
              ((s.T = t), (o.p = n), o.d.f());
            }
          }),
          (t.preconnect = function (e, t) {
            "string" === typeof e &&
              (t
                ? (t =
                    "string" === typeof (t = t.crossOrigin)
                      ? "use-credentials" === t
                        ? t
                        : ""
                      : void 0)
                : (t = null),
              o.d.C(e, t));
          }),
          (t.prefetchDNS = function (e) {
            "string" === typeof e && o.d.D(e);
          }),
          (t.preinit = function (e, t) {
            if ("string" === typeof e && t && "string" === typeof t.as) {
              var n = t.as,
                r = u(n, t.crossOrigin),
                a = "string" === typeof t.integrity ? t.integrity : void 0,
                l =
                  "string" === typeof t.fetchPriority
                    ? t.fetchPriority
                    : void 0;
              "style" === n
                ? o.d.S(
                    e,
                    "string" === typeof t.precedence ? t.precedence : void 0,
                    { crossOrigin: r, integrity: a, fetchPriority: l },
                  )
                : "script" === n &&
                  o.d.X(e, {
                    crossOrigin: r,
                    integrity: a,
                    fetchPriority: l,
                    nonce: "string" === typeof t.nonce ? t.nonce : void 0,
                  });
            }
          }),
          (t.preinitModule = function (e, t) {
            if ("string" === typeof e)
              if ("object" === typeof t && null !== t) {
                if (null == t.as || "script" === t.as) {
                  var n = u(t.as, t.crossOrigin);
                  o.d.M(e, {
                    crossOrigin: n,
                    integrity:
                      "string" === typeof t.integrity ? t.integrity : void 0,
                    nonce: "string" === typeof t.nonce ? t.nonce : void 0,
                  });
                }
              } else null == t && o.d.M(e);
          }),
          (t.preload = function (e, t) {
            if (
              "string" === typeof e &&
              "object" === typeof t &&
              null !== t &&
              "string" === typeof t.as
            ) {
              var n = t.as,
                r = u(n, t.crossOrigin);
              o.d.L(e, n, {
                crossOrigin: r,
                integrity:
                  "string" === typeof t.integrity ? t.integrity : void 0,
                nonce: "string" === typeof t.nonce ? t.nonce : void 0,
                type: "string" === typeof t.type ? t.type : void 0,
                fetchPriority:
                  "string" === typeof t.fetchPriority
                    ? t.fetchPriority
                    : void 0,
                referrerPolicy:
                  "string" === typeof t.referrerPolicy
                    ? t.referrerPolicy
                    : void 0,
                imageSrcSet:
                  "string" === typeof t.imageSrcSet ? t.imageSrcSet : void 0,
                imageSizes:
                  "string" === typeof t.imageSizes ? t.imageSizes : void 0,
                media: "string" === typeof t.media ? t.media : void 0,
              });
            }
          }),
          (t.preloadModule = function (e, t) {
            if ("string" === typeof e)
              if (t) {
                var n = u(t.as, t.crossOrigin);
                o.d.m(e, {
                  as:
                    "string" === typeof t.as && "script" !== t.as
                      ? t.as
                      : void 0,
                  crossOrigin: n,
                  integrity:
                    "string" === typeof t.integrity ? t.integrity : void 0,
                });
              } else o.d.m(e);
          }),
          (t.requestFormReset = function (e) {
            o.d.r(e);
          }),
          (t.unstable_batchedUpdates = function (e, t) {
            return e(t);
          }),
          (t.useFormState = function (e, t, n) {
            return s.H.useFormState(e, t, n);
          }),
          (t.useFormStatus = function () {
            return s.H.useHostTransitionStatus();
          }),
          (t.version = "19.2.7"));
      },
      391(e, t, n) {
        (!(function e() {
          if (
            "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
            "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
          )
            try {
              __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
            } catch (t) {
              console.error(t);
            }
        })(),
          (e.exports = n(4)));
      },
      950(e, t, n) {
        (!(function e() {
          if (
            "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
            "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
          )
            try {
              __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
            } catch (t) {
              console.error(t);
            }
        })(),
          (e.exports = n(672)));
      },
      799(e, t) {
        var n = Symbol.for("react.transitional.element"),
          r = Symbol.for("react.fragment");
        function a(e, t, r) {
          var a = null;
          if (
            (void 0 !== r && (a = "" + r),
            void 0 !== t.key && (a = "" + t.key),
            "key" in t)
          )
            for (var l in ((r = {}), t)) "key" !== l && (r[l] = t[l]);
          else r = t;
          return (
            (t = r.ref),
            {
              $$typeof: n,
              type: e,
              key: a,
              ref: void 0 !== t ? t : null,
              props: r,
            }
          );
        }
        ((t.Fragment = r), (t.jsx = a), (t.jsxs = a));
      },
      288(e, t) {
        var n = Symbol.for("react.transitional.element"),
          r = Symbol.for("react.portal"),
          a = Symbol.for("react.fragment"),
          l = Symbol.for("react.strict_mode"),
          o = Symbol.for("react.profiler"),
          i = Symbol.for("react.consumer"),
          s = Symbol.for("react.context"),
          u = Symbol.for("react.forward_ref"),
          c = Symbol.for("react.suspense"),
          d = Symbol.for("react.memo"),
          f = Symbol.for("react.lazy"),
          p = Symbol.for("react.activity"),
          h = Symbol.iterator;
        var m = {
            isMounted: function () {
              return !1;
            },
            enqueueForceUpdate: function () {},
            enqueueReplaceState: function () {},
            enqueueSetState: function () {},
          },
          g = Object.assign,
          y = {};
        function b(e, t, n) {
          ((this.props = e),
            (this.context = t),
            (this.refs = y),
            (this.updater = n || m));
        }
        function v() {}
        function x(e, t, n) {
          ((this.props = e),
            (this.context = t),
            (this.refs = y),
            (this.updater = n || m));
        }
        ((b.prototype.isReactComponent = {}),
          (b.prototype.setState = function (e, t) {
            if ("object" !== typeof e && "function" !== typeof e && null != e)
              throw Error(
                "takes an object of state variables to update or a function which returns an object of state variables.",
              );
            this.updater.enqueueSetState(this, e, t, "setState");
          }),
          (b.prototype.forceUpdate = function (e) {
            this.updater.enqueueForceUpdate(this, e, "forceUpdate");
          }),
          (v.prototype = b.prototype));
        var k = (x.prototype = new v());
        ((k.constructor = x), g(k, b.prototype), (k.isPureReactComponent = !0));
        var w = Array.isArray;
        function S() {}
        var N = { H: null, A: null, T: null, S: null },
          E = Object.prototype.hasOwnProperty;
        function C(e, t, r) {
          var a = r.ref;
          return {
            $$typeof: n,
            type: e,
            key: t,
            ref: void 0 !== a ? a : null,
            props: r,
          };
        }
        function j(e) {
          return "object" === typeof e && null !== e && e.$$typeof === n;
        }
        var z = /\/+/g;
        function P(e, t) {
          return "object" === typeof e && null !== e && null != e.key
            ? (function (e) {
                var t = { "=": "=0", ":": "=2" };
                return (
                  "$" +
                  e.replace(/[=:]/g, function (e) {
                    return t[e];
                  })
                );
              })("" + e.key)
            : t.toString(36);
        }
        function T(e, t, a, l, o) {
          var i = typeof e;
          ("undefined" !== i && "boolean" !== i) || (e = null);
          var s,
            u,
            c = !1;
          if (null === e) c = !0;
          else
            switch (i) {
              case "bigint":
              case "string":
              case "number":
                c = !0;
                break;
              case "object":
                switch (e.$$typeof) {
                  case n:
                  case r:
                    c = !0;
                    break;
                  case f:
                    return T((c = e._init)(e._payload), t, a, l, o);
                }
            }
          if (c)
            return (
              (o = o(e)),
              (c = "" === l ? "." + P(e, 0) : l),
              w(o)
                ? ((a = ""),
                  null != c && (a = c.replace(z, "$&/") + "/"),
                  T(o, t, a, "", function (e) {
                    return e;
                  }))
                : null != o &&
                  (j(o) &&
                    ((s = o),
                    (u =
                      a +
                      (null == o.key || (e && e.key === o.key)
                        ? ""
                        : ("" + o.key).replace(z, "$&/") + "/") +
                      c),
                    (o = C(s.type, u, s.props))),
                  t.push(o)),
              1
            );
          c = 0;
          var d,
            p = "" === l ? "." : l + ":";
          if (w(e))
            for (var m = 0; m < e.length; m++)
              c += T((l = e[m]), t, a, (i = p + P(l, m)), o);
          else if (
            "function" ===
            typeof (m =
              null === (d = e) || "object" !== typeof d
                ? null
                : "function" === typeof (d = (h && d[h]) || d["@@iterator"])
                  ? d
                  : null)
          )
            for (e = m.call(e), m = 0; !(l = e.next()).done; )
              c += T((l = l.value), t, a, (i = p + P(l, m++)), o);
          else if ("object" === i) {
            if ("function" === typeof e.then)
              return T(
                (function (e) {
                  switch (e.status) {
                    case "fulfilled":
                      return e.value;
                    case "rejected":
                      throw e.reason;
                    default:
                      switch (
                        ("string" === typeof e.status
                          ? e.then(S, S)
                          : ((e.status = "pending"),
                            e.then(
                              function (t) {
                                "pending" === e.status &&
                                  ((e.status = "fulfilled"), (e.value = t));
                              },
                              function (t) {
                                "pending" === e.status &&
                                  ((e.status = "rejected"), (e.reason = t));
                              },
                            )),
                        e.status)
                      ) {
                        case "fulfilled":
                          return e.value;
                        case "rejected":
                          throw e.reason;
                      }
                  }
                  throw e;
                })(e),
                t,
                a,
                l,
                o,
              );
            throw (
              (t = String(e)),
              Error(
                "Objects are not valid as a React child (found: " +
                  ("[object Object]" === t
                    ? "object with keys {" + Object.keys(e).join(", ") + "}"
                    : t) +
                  "). If you meant to render a collection of children, use an array instead.",
              )
            );
          }
          return c;
        }
        function _(e, t, n) {
          if (null == e) return e;
          var r = [],
            a = 0;
          return (
            T(e, r, "", "", function (e) {
              return t.call(n, e, a++);
            }),
            r
          );
        }
        function L(e) {
          if (-1 === e._status) {
            var t = e._result;
            ((t = t()).then(
              function (t) {
                (0 !== e._status && -1 !== e._status) ||
                  ((e._status = 1), (e._result = t));
              },
              function (t) {
                (0 !== e._status && -1 !== e._status) ||
                  ((e._status = 2), (e._result = t));
              },
            ),
              -1 === e._status && ((e._status = 0), (e._result = t)));
          }
          if (1 === e._status) return e._result.default;
          throw e._result;
        }
        var A =
            "function" === typeof reportError
              ? reportError
              : function (e) {
                  if (
                    "object" === typeof window &&
                    "function" === typeof window.ErrorEvent
                  ) {
                    var t = new window.ErrorEvent("error", {
                      bubbles: !0,
                      cancelable: !0,
                      message:
                        "object" === typeof e &&
                        null !== e &&
                        "string" === typeof e.message
                          ? String(e.message)
                          : String(e),
                      error: e,
                    });
                    if (!window.dispatchEvent(t)) return;
                  } else if (
                    "object" === typeof process &&
                    "function" === typeof process.emit
                  )
                    return void process.emit("uncaughtException", e);
                  console.error(e);
                },
          I = {
            map: _,
            forEach: function (e, t, n) {
              _(
                e,
                function () {
                  t.apply(this, arguments);
                },
                n,
              );
            },
            count: function (e) {
              var t = 0;
              return (
                _(e, function () {
                  t++;
                }),
                t
              );
            },
            toArray: function (e) {
              return (
                _(e, function (e) {
                  return e;
                }) || []
              );
            },
            only: function (e) {
              if (!j(e))
                throw Error(
                  "React.Children.only expected to receive a single React element child.",
                );
              return e;
            },
          };
        ((t.Activity = p),
          (t.Children = I),
          (t.Component = b),
          (t.Fragment = a),
          (t.Profiler = o),
          (t.PureComponent = x),
          (t.StrictMode = l),
          (t.Suspense = c),
          (t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
            N),
          (t.__COMPILER_RUNTIME = {
            __proto__: null,
            c: function (e) {
              return N.H.useMemoCache(e);
            },
          }),
          (t.cache = function (e) {
            return function () {
              return e.apply(null, arguments);
            };
          }),
          (t.cacheSignal = function () {
            return null;
          }),
          (t.cloneElement = function (e, t, n) {
            if (null === e || void 0 === e)
              throw Error(
                "The argument must be a React element, but you passed " +
                  e +
                  ".",
              );
            var r = g({}, e.props),
              a = e.key;
            if (null != t)
              for (l in (void 0 !== t.key && (a = "" + t.key), t))
                !E.call(t, l) ||
                  "key" === l ||
                  "__self" === l ||
                  "__source" === l ||
                  ("ref" === l && void 0 === t.ref) ||
                  (r[l] = t[l]);
            var l = arguments.length - 2;
            if (1 === l) r.children = n;
            else if (1 < l) {
              for (var o = Array(l), i = 0; i < l; i++) o[i] = arguments[i + 2];
              r.children = o;
            }
            return C(e.type, a, r);
          }),
          (t.createContext = function (e) {
            return (
              ((e = {
                $$typeof: s,
                _currentValue: e,
                _currentValue2: e,
                _threadCount: 0,
                Provider: null,
                Consumer: null,
              }).Provider = e),
              (e.Consumer = { $$typeof: i, _context: e }),
              e
            );
          }),
          (t.createElement = function (e, t, n) {
            var r,
              a = {},
              l = null;
            if (null != t)
              for (r in (void 0 !== t.key && (l = "" + t.key), t))
                E.call(t, r) &&
                  "key" !== r &&
                  "__self" !== r &&
                  "__source" !== r &&
                  (a[r] = t[r]);
            var o = arguments.length - 2;
            if (1 === o) a.children = n;
            else if (1 < o) {
              for (var i = Array(o), s = 0; s < o; s++) i[s] = arguments[s + 2];
              a.children = i;
            }
            if (e && e.defaultProps)
              for (r in (o = e.defaultProps)) void 0 === a[r] && (a[r] = o[r]);
            return C(e, l, a);
          }),
          (t.createRef = function () {
            return { current: null };
          }),
          (t.forwardRef = function (e) {
            return { $$typeof: u, render: e };
          }),
          (t.isValidElement = j),
          (t.lazy = function (e) {
            return {
              $$typeof: f,
              _payload: { _status: -1, _result: e },
              _init: L,
            };
          }),
          (t.memo = function (e, t) {
            return { $$typeof: d, type: e, compare: void 0 === t ? null : t };
          }),
          (t.startTransition = function (e) {
            var t = N.T,
              n = {};
            N.T = n;
            try {
              var r = e(),
                a = N.S;
              (null !== a && a(n, r),
                "object" === typeof r &&
                  null !== r &&
                  "function" === typeof r.then &&
                  r.then(S, A));
            } catch (l) {
              A(l);
            } finally {
              (null !== t && null !== n.types && (t.types = n.types),
                (N.T = t));
            }
          }),
          (t.unstable_useCacheRefresh = function () {
            return N.H.useCacheRefresh();
          }),
          (t.use = function (e) {
            return N.H.use(e);
          }),
          (t.useActionState = function (e, t, n) {
            return N.H.useActionState(e, t, n);
          }),
          (t.useCallback = function (e, t) {
            return N.H.useCallback(e, t);
          }),
          (t.useContext = function (e) {
            return N.H.useContext(e);
          }),
          (t.useDebugValue = function () {}),
          (t.useDeferredValue = function (e, t) {
            return N.H.useDeferredValue(e, t);
          }),
          (t.useEffect = function (e, t) {
            return N.H.useEffect(e, t);
          }),
          (t.useEffectEvent = function (e) {
            return N.H.useEffectEvent(e);
          }),
          (t.useId = function () {
            return N.H.useId();
          }),
          (t.useImperativeHandle = function (e, t, n) {
            return N.H.useImperativeHandle(e, t, n);
          }),
          (t.useInsertionEffect = function (e, t) {
            return N.H.useInsertionEffect(e, t);
          }),
          (t.useLayoutEffect = function (e, t) {
            return N.H.useLayoutEffect(e, t);
          }),
          (t.useMemo = function (e, t) {
            return N.H.useMemo(e, t);
          }),
          (t.useOptimistic = function (e, t) {
            return N.H.useOptimistic(e, t);
          }),
          (t.useReducer = function (e, t, n) {
            return N.H.useReducer(e, t, n);
          }),
          (t.useRef = function (e) {
            return N.H.useRef(e);
          }),
          (t.useState = function (e) {
            return N.H.useState(e);
          }),
          (t.useSyncExternalStore = function (e, t, n) {
            return N.H.useSyncExternalStore(e, t, n);
          }),
          (t.useTransition = function () {
            return N.H.useTransition();
          }),
          (t.version = "19.2.7"));
      },
      43(e, t, n) {
        e.exports = n(288);
      },
      579(e, t, n) {
        e.exports = n(799);
      },
      896(e, t) {
        function n(e, t) {
          var n = e.length;
          e.push(t);
          e: for (; 0 < n; ) {
            var r = (n - 1) >>> 1,
              a = e[r];
            if (!(0 < l(a, t))) break e;
            ((e[r] = t), (e[n] = a), (n = r));
          }
        }
        function r(e) {
          return 0 === e.length ? null : e[0];
        }
        function a(e) {
          if (0 === e.length) return null;
          var t = e[0],
            n = e.pop();
          if (n !== t) {
            e[0] = n;
            e: for (var r = 0, a = e.length, o = a >>> 1; r < o; ) {
              var i = 2 * (r + 1) - 1,
                s = e[i],
                u = i + 1,
                c = e[u];
              if (0 > l(s, n))
                u < a && 0 > l(c, s)
                  ? ((e[r] = c), (e[u] = n), (r = u))
                  : ((e[r] = s), (e[i] = n), (r = i));
              else {
                if (!(u < a && 0 > l(c, n))) break e;
                ((e[r] = c), (e[u] = n), (r = u));
              }
            }
          }
          return t;
        }
        function l(e, t) {
          var n = e.sortIndex - t.sortIndex;
          return 0 !== n ? n : e.id - t.id;
        }
        if (
          ((t.unstable_now = void 0),
          "object" === typeof performance &&
            "function" === typeof performance.now)
        ) {
          var o = performance;
          t.unstable_now = function () {
            return o.now();
          };
        } else {
          var i = Date,
            s = i.now();
          t.unstable_now = function () {
            return i.now() - s;
          };
        }
        var u = [],
          c = [],
          d = 1,
          f = null,
          p = 3,
          h = !1,
          m = !1,
          g = !1,
          y = !1,
          b = "function" === typeof setTimeout ? setTimeout : null,
          v = "function" === typeof clearTimeout ? clearTimeout : null,
          x = "undefined" !== typeof setImmediate ? setImmediate : null;
        function k(e) {
          for (var t = r(c); null !== t; ) {
            if (null === t.callback) a(c);
            else {
              if (!(t.startTime <= e)) break;
              (a(c), (t.sortIndex = t.expirationTime), n(u, t));
            }
            t = r(c);
          }
        }
        function w(e) {
          if (((g = !1), k(e), !m))
            if (null !== r(u)) ((m = !0), N || ((N = !0), S()));
            else {
              var t = r(c);
              null !== t && L(w, t.startTime - e);
            }
        }
        var S,
          N = !1,
          E = -1,
          C = 5,
          j = -1;
        function z() {
          return !!y || !(t.unstable_now() - j < C);
        }
        function P() {
          if (((y = !1), N)) {
            var e = t.unstable_now();
            j = e;
            var n = !0;
            try {
              e: {
                ((m = !1), g && ((g = !1), v(E), (E = -1)), (h = !0));
                var l = p;
                try {
                  t: {
                    for (
                      k(e), f = r(u);
                      null !== f && !(f.expirationTime > e && z());
                    ) {
                      var o = f.callback;
                      if ("function" === typeof o) {
                        ((f.callback = null), (p = f.priorityLevel));
                        var i = o(f.expirationTime <= e);
                        if (((e = t.unstable_now()), "function" === typeof i)) {
                          ((f.callback = i), k(e), (n = !0));
                          break t;
                        }
                        (f === r(u) && a(u), k(e));
                      } else a(u);
                      f = r(u);
                    }
                    if (null !== f) n = !0;
                    else {
                      var s = r(c);
                      (null !== s && L(w, s.startTime - e), (n = !1));
                    }
                  }
                  break e;
                } finally {
                  ((f = null), (p = l), (h = !1));
                }
                n = void 0;
              }
            } finally {
              n ? S() : (N = !1);
            }
          }
        }
        if ("function" === typeof x)
          S = function () {
            x(P);
          };
        else if ("undefined" !== typeof MessageChannel) {
          var T = new MessageChannel(),
            _ = T.port2;
          ((T.port1.onmessage = P),
            (S = function () {
              _.postMessage(null);
            }));
        } else
          S = function () {
            b(P, 0);
          };
        function L(e, n) {
          E = b(function () {
            e(t.unstable_now());
          }, n);
        }
        ((t.unstable_IdlePriority = 5),
          (t.unstable_ImmediatePriority = 1),
          (t.unstable_LowPriority = 4),
          (t.unstable_NormalPriority = 3),
          (t.unstable_Profiling = null),
          (t.unstable_UserBlockingPriority = 2),
          (t.unstable_cancelCallback = function (e) {
            e.callback = null;
          }),
          (t.unstable_forceFrameRate = function (e) {
            0 > e || 125 < e
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (C = 0 < e ? Math.floor(1e3 / e) : 5);
          }),
          (t.unstable_getCurrentPriorityLevel = function () {
            return p;
          }),
          (t.unstable_next = function (e) {
            switch (p) {
              case 1:
              case 2:
              case 3:
                var t = 3;
                break;
              default:
                t = p;
            }
            var n = p;
            p = t;
            try {
              return e();
            } finally {
              p = n;
            }
          }),
          (t.unstable_requestPaint = function () {
            y = !0;
          }),
          (t.unstable_runWithPriority = function (e, t) {
            switch (e) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                e = 3;
            }
            var n = p;
            p = e;
            try {
              return t();
            } finally {
              p = n;
            }
          }),
          (t.unstable_scheduleCallback = function (e, a, l) {
            var o = t.unstable_now();
            switch (
              ("object" === typeof l && null !== l
                ? (l = "number" === typeof (l = l.delay) && 0 < l ? o + l : o)
                : (l = o),
              e)
            ) {
              case 1:
                var i = -1;
                break;
              case 2:
                i = 250;
                break;
              case 5:
                i = 1073741823;
                break;
              case 4:
                i = 1e4;
                break;
              default:
                i = 5e3;
            }
            return (
              (e = {
                id: d++,
                callback: a,
                priorityLevel: e,
                startTime: l,
                expirationTime: (i = l + i),
                sortIndex: -1,
              }),
              l > o
                ? ((e.sortIndex = l),
                  n(c, e),
                  null === r(u) &&
                    e === r(c) &&
                    (g ? (v(E), (E = -1)) : (g = !0), L(w, l - o)))
                : ((e.sortIndex = i),
                  n(u, e),
                  m || h || ((m = !0), N || ((N = !0), S()))),
              e
            );
          }),
          (t.unstable_shouldYield = z),
          (t.unstable_wrapCallback = function (e) {
            var t = p;
            return function () {
              var n = p;
              p = t;
              try {
                return e.apply(this, arguments);
              } finally {
                p = n;
              }
            };
          }));
      },
      853(e, t, n) {
        e.exports = n(896);
      },
    },
    t = {};
  function n(r) {
    var a = t[r];
    if (void 0 !== a) return a.exports;
    var l = (t[r] = { exports: {} });
    return (e[r](l, l.exports, n), l.exports);
  }
  ((n.m = e),
    (n.d = (e, t) => {
      for (var r in t)
        n.o(t, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.f = {}),
    (n.e = (e) =>
      Promise.all(Object.keys(n.f).reduce((t, r) => (n.f[r](e, t), t), []))),
    (n.u = (e) => "static/js/" + e + ".d46a5640.chunk.js"),
    (n.miniCssF = (e) => {}),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      var e = {},
        t = "m-proxy-web:";
      n.l = (r, a, l, o) => {
        if (e[r]) e[r].push(a);
        else {
          var i, s;
          if (void 0 !== l)
            for (
              var u = document.getElementsByTagName("script"), c = 0;
              c < u.length;
              c++
            ) {
              var d = u[c];
              if (
                d.getAttribute("src") == r ||
                d.getAttribute("data-webpack") == t + l
              ) {
                i = d;
                break;
              }
            }
          (i ||
            ((s = !0),
            ((i = document.createElement("script")).charset = "utf-8"),
            n.nc && i.setAttribute("nonce", n.nc),
            i.setAttribute("data-webpack", t + l),
            (i.src = r)),
            (e[r] = [a]));
          var f = (t, n) => {
              ((i.onerror = i.onload = null), clearTimeout(p));
              var a = e[r];
              if (
                (delete e[r],
                i.parentNode && i.parentNode.removeChild(i),
                a && a.forEach((e) => e(n)),
                t)
              )
                return t(n);
            },
            p = setTimeout(
              f.bind(null, void 0, { type: "timeout", target: i }),
              12e4,
            );
          ((i.onerror = f.bind(null, i.onerror)),
            (i.onload = f.bind(null, i.onload)),
            s && document.head.appendChild(i));
        }
      };
    })(),
    (n.p = "./"),
    (() => {
      var e = { 792: 0 };
      n.f.j = (t, r) => {
        var a = n.o(e, t) ? e[t] : void 0;
        if (0 !== a)
          if (a) r.push(a[2]);
          else {
            var l = new Promise((n, r) => (a = e[t] = [n, r]));
            r.push((a[2] = l));
            var o = n.p + n.u(t),
              i = new Error();
            n.l(
              o,
              (r) => {
                if (n.o(e, t) && (0 !== (a = e[t]) && (e[t] = void 0), a)) {
                  var l = r && ("load" === r.type ? "missing" : r.type),
                    o = r && r.target && r.target.src;
                  ((i.message =
                    "Loading chunk " + t + " failed.\n(" + l + ": " + o + ")"),
                    (i.name = "ChunkLoadError"),
                    (i.type = l),
                    (i.request = o),
                    a[1](i));
                }
              },
              "chunk-" + t,
              t,
            );
          }
      };
      var t = (t, r) => {
          var a,
            l,
            [o, i, s] = r,
            u = 0;
          if (o.some((t) => 0 !== e[t])) {
            for (a in i) n.o(i, a) && (n.m[a] = i[a]);
            if (s) s(n);
          }
          for (t && t(r); u < o.length; u++)
            ((l = o[u]), n.o(e, l) && e[l] && e[l][0](), (e[l] = 0));
        },
        r = (self.webpackChunkm_proxy_web = self.webpackChunkm_proxy_web || []);
      (r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r))));
    })());
  var r = n(43),
    a = n(391);
  function l(e) {
    return (
      (l =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            }),
      l(e)
    );
  }
  function o(e) {
    var t = (function (e, t) {
      if ("object" != l(e) || !e) return e;
      var n = e[Symbol.toPrimitive];
      if (void 0 !== n) {
        var r = n.call(e, t || "default");
        if ("object" != l(r)) return r;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t ? String : Number)(e);
    })(e, "string");
    return "symbol" == l(t) ? t : t + "";
  }
  function i(e, t, n) {
    return (
      (t = o(t)) in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function s(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      (t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r));
    }
    return n;
  }
  function u(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? s(Object(n), !0).forEach(function (t) {
            i(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : s(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t),
              );
            });
    }
    return e;
  }
  function c(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  function d(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != n) {
          var r,
            a,
            l,
            o,
            i = [],
            s = !0,
            u = !1;
          try {
            if (((l = (n = n.call(e)).next), 0 === t)) {
              if (Object(n) !== n) return;
              s = !1;
            } else
              for (
                ;
                !(s = (r = l.call(n)).done) &&
                (i.push(r.value), i.length !== t);
                s = !0
              );
          } catch (e) {
            ((u = !0), (a = e));
          } finally {
            try {
              if (!s && null != n.return && ((o = n.return()), Object(o) !== o))
                return;
            } finally {
              if (u) throw a;
            }
          }
          return i;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return c(e, t);
          var n = {}.toString.call(e).slice(8, -1);
          return (
            "Object" === n && e.constructor && (n = e.constructor.name),
            "Map" === n || "Set" === n
              ? Array.from(e)
              : "Arguments" === n ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? c(e, t)
                : void 0
          );
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function f(e, t) {
    if (null == e) return {};
    var n,
      r,
      a = (function (e, t) {
        if (null == e) return {};
        var n = {};
        for (var r in e)
          if ({}.hasOwnProperty.call(e, r)) {
            if (-1 !== t.indexOf(r)) continue;
            n[r] = e[r];
          }
        return n;
      })(e, t);
    if (Object.getOwnPropertySymbols) {
      var l = Object.getOwnPropertySymbols(e);
      for (r = 0; r < l.length; r++)
        ((n = l[r]),
          -1 === t.indexOf(n) &&
            {}.propertyIsEnumerable.call(e, n) &&
            (a[n] = e[n]));
    }
    return a;
  }
  const p = function () {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      return t
        .filter(
          (e, t, n) => Boolean(e) && "" !== e.trim() && n.indexOf(e) === t,
        )
        .join(" ")
        .trim();
    },
    h = (e) => {
      const t = ((e) =>
        e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) =>
          n ? n.toUpperCase() : t.toLowerCase(),
        ))(e);
      return t.charAt(0).toUpperCase() + t.slice(1);
    };
  var m = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const g = (0, r.createContext)({});
  const y = [
      "color",
      "size",
      "strokeWidth",
      "absoluteStrokeWidth",
      "className",
      "children",
      "iconNode",
    ],
    b = (0, r.forwardRef)((e, t) => {
      var n, a, l;
      let o = e.color,
        i = e.size,
        s = e.strokeWidth,
        c = e.absoluteStrokeWidth,
        h = e.className,
        b = void 0 === h ? "" : h,
        v = e.children,
        x = e.iconNode,
        k = f(e, y);
      const w = null !== (n = (0, r.useContext)(g)) && void 0 !== n ? n : {},
        S = w.size,
        N = void 0 === S ? 24 : S,
        E = w.strokeWidth,
        C = void 0 === E ? 2 : E,
        j = w.absoluteStrokeWidth,
        z = void 0 !== j && j,
        P = w.color,
        T = void 0 === P ? "currentColor" : P,
        _ = w.className,
        L = void 0 === _ ? "" : _,
        A = (null !== c && void 0 !== c ? c : z)
          ? (24 * Number(null !== s && void 0 !== s ? s : C)) /
            Number(null !== i && void 0 !== i ? i : N)
          : null !== s && void 0 !== s
            ? s
            : C;
      return (0, r.createElement)(
        "svg",
        u(
          u(
            u({ ref: t }, m),
            {},
            {
              width:
                null !== (a = null !== i && void 0 !== i ? i : N) &&
                void 0 !== a
                  ? a
                  : m.width,
              height:
                null !== (l = null !== i && void 0 !== i ? i : N) &&
                void 0 !== l
                  ? l
                  : m.height,
              stroke: null !== o && void 0 !== o ? o : T,
              strokeWidth: A,
              className: p("lucide", L, b),
            },
            !v &&
              !((e) => {
                for (const t in e)
                  if (t.startsWith("aria-") || "role" === t || "title" === t)
                    return !0;
                return !1;
              })(k) && { "aria-hidden": "true" },
          ),
          k,
        ),
        [
          ...x.map((e) => {
            let t = d(e, 2),
              n = t[0],
              a = t[1];
            return (0, r.createElement)(n, a);
          }),
          ...(Array.isArray(v) ? v : [v]),
        ],
      );
    }),
    v = ["className"],
    x = (e, t) => {
      const n = (0, r.forwardRef)((n, a) => {
        let l = n.className,
          o = f(n, v);
        return (0, r.createElement)(
          b,
          u(
            {
              ref: a,
              iconNode: t,
              className: p(
                "lucide-".concat(
                  ((i = h(e)),
                  i.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()),
                ),
                "lucide-".concat(e),
                l,
              ),
            },
            o,
          ),
        );
        var i;
      });
      return ((n.displayName = h(e)), n);
    },
    k = x("globe", [
      ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
      [
        "path",
        { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" },
      ],
      ["path", { d: "M2 12h20", key: "9i4pu4" }],
    ]),
    w = x("check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]),
    S = x("circle-alert", [
      ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
      ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
      ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }],
    ]),
    N = x("rocket", [
      ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5", key: "qeys4" }],
      [
        "path",
        {
          d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09",
          key: "u4xsad",
        },
      ],
      [
        "path",
        {
          d: "M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z",
          key: "676m9",
        },
      ],
      [
        "path",
        { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05", key: "92ym6u" },
      ],
    ]),
    E = x("file-text", [
      [
        "path",
        {
          d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
          key: "1oefj6",
        },
      ],
      ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
      ["path", { d: "M10 9H8", key: "b1mrlr" }],
      ["path", { d: "M16 13H8", key: "t4e002" }],
      ["path", { d: "M16 17H8", key: "z1uh3a" }],
    ]),
    C = x("refresh-cw", [
      [
        "path",
        {
          d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
          key: "v9h5vc",
        },
      ],
      ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
      [
        "path",
        {
          d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
          key: "3uifl3",
        },
      ],
      ["path", { d: "M8 16H3v5", key: "1cv678" }],
    ]),
    j = x("house", [
      [
        "path",
        { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" },
      ],
      [
        "path",
        {
          d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
          key: "r6nss1",
        },
      ],
    ]),
    z = x("gauge", [
      ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
      ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }],
    ]),
    P = x("layers", [
      [
        "path",
        {
          d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
          key: "zw3jo",
        },
      ],
      [
        "path",
        {
          d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
          key: "1wduqc",
        },
      ],
      [
        "path",
        {
          d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
          key: "kqbvx6",
        },
      ],
    ]),
    T = x("chevron-up", [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]]),
    _ = x("wifi", [
      ["path", { d: "M12 20h.01", key: "zekei9" }],
      ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
      ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
      ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
    ]),
    L = x("signal", [
      ["path", { d: "M2 20h.01", key: "4haj6o" }],
      ["path", { d: "M7 20v-4", key: "j294jx" }],
      ["path", { d: "M12 20v-8", key: "i3yub9" }],
      ["path", { d: "M17 20V8", key: "1tkaf5" }],
      ["path", { d: "M22 4v16", key: "sih9yq" }],
    ]),
    A = x("activity", [
      [
        "path",
        {
          d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
          key: "169zse",
        },
      ],
    ]),
    I = x("user", [
      [
        "path",
        { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" },
      ],
      ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }],
    ]),
    O = x("battery", [
      ["path", { d: "M 22 14 L 22 10", key: "nqc4tb" }],
      [
        "rect",
        { x: "2", y: "6", width: "16", height: "12", rx: "2", key: "13zb55" },
      ],
    ]),
    R = x("headphones", [
      [
        "path",
        {
          d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
          key: "1xhozi",
        },
      ],
    ]),
    D = x("rotate-ccw", [
      [
        "path",
        {
          d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
          key: "1357e3",
        },
      ],
      ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
    ]),
    M = x("chevron-right", [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]),
    F = x("info", [
      ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
      ["path", { d: "M12 16v-4", key: "1dtifu" }],
      ["path", { d: "M12 8h.01", key: "e9boi3" }],
    ]),
    U = x("lock", [
      [
        "rect",
        {
          width: "18",
          height: "11",
          x: "3",
          y: "11",
          rx: "2",
          ry: "2",
          key: "1w4ew1",
        },
      ],
      ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }],
    ]),
    H = x("x", [
      ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
      ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
    ]),
    B = x("clipboard", [
      [
        "rect",
        {
          width: "8",
          height: "4",
          x: "8",
          y: "2",
          rx: "1",
          ry: "1",
          key: "tgr4d6",
        },
      ],
      [
        "path",
        {
          d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
          key: "116196",
        },
      ],
    ]),
    V = x("copy", [
      [
        "rect",
        {
          width: "14",
          height: "14",
          x: "8",
          y: "8",
          rx: "2",
          ry: "2",
          key: "17jyea",
        },
      ],
      [
        "path",
        {
          d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
          key: "zix9uf",
        },
      ],
    ]),
    W = x("wifi-off", [
      ["path", { d: "M12 20h.01", key: "zekei9" }],
      ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
      ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
      ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }],
      ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
      ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
      ["path", { d: "m2 2 20 20", key: "1ooewy" }],
    ]);
  var $ = n(579);
  function q(e) {
    let t = e.size,
      n = void 0 === t ? 32 : t;
    return (0, $.jsxs)("svg", {
      width: n,
      height: n,
      viewBox: "0 0 48 48",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        (0, $.jsx)("rect", {
          width: "48",
          height: "48",
          rx: "12",
          fill: "#25D366",
        }),
        (0, $.jsx)("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M24 10C16.268 10 10 16.268 10 24c0 2.482.672 4.808 1.845 6.805L10 38l7.41-1.82A13.94 13.94 0 0024 38c7.732 0 14-6.268 14-14S31.732 10 24 10zm-4.5 8.5c-.3-.7-.617-.714-.9-.727L17.75 17.75c-.274 0-.7.103-1.067.515-.368.412-1.4 1.366-1.4 3.331 0 1.965 1.432 3.863 1.632 4.13.2.266 2.766 4.42 6.834 6.02 3.38 1.334 4.068.97 4.8.91.733-.061 2.366-.968 2.7-1.903.334-.934.334-1.735.233-1.903-.1-.167-.366-.267-.766-.467s-2.366-1.167-2.733-1.3c-.366-.134-.632-.2-.9.2-.266.4-1.032 1.3-1.265 1.567-.234.267-.467.3-.867.1-.4-.2-1.688-.622-3.215-1.982-1.188-1.059-1.99-2.366-2.223-2.766-.234-.4-.025-.616.175-.816.18-.18.4-.467.6-.7.2-.234.266-.4.4-.667.133-.267.067-.5-.034-.7z",
          fill: "white",
        }),
      ],
    });
  }
  function Q(e) {
    let t = e.size,
      n = void 0 === t ? 32 : t;
    return (0, $.jsxs)("svg", {
      width: n,
      height: n,
      viewBox: "0 0 48 48",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        (0, $.jsx)("rect", {
          width: "48",
          height: "48",
          rx: "12",
          fill: "#FF0000",
        }),
        (0, $.jsx)("path", {
          d: "M38.5 17.5s-.37-2.6-1.5-3.75c-1.43-1.5-3.04-1.51-3.77-1.6C28.9 11.9 24 11.9 24 11.9s-4.9 0-9.23.25c-.73.09-2.34.1-3.77 1.6-1.13-1.15-1.5 3.75-1.5 3.75S9 20.5 9 23.5v2.83c0 3 .5 6 .5 6s.37 2.6 1.5 3.75c1.43 1.5 3.31 1.45 4.15 1.6C17.7 37.93 24 38 24 38s4.9-.01 9.23-.27c.73-.09 2.34-.1 3.77-1.6 1.13-1.15 1.5-3.75 1.5-3.75s.5-3 .5-6V23.5c0-3-.5-6-.5-6z",
          fill: "white",
          fillOpacity: ".9",
        }),
        (0, $.jsx)("path", { d: "M21 28.5v-9l8 4.5-8 4.5z", fill: "#FF0000" }),
      ],
    });
  }
  function K(e) {
    let t = e.size,
      n = void 0 === t ? 32 : t;
    return (0, $.jsxs)("svg", {
      width: n,
      height: n,
      viewBox: "0 0 48 48",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        (0, $.jsx)("defs", {
          children: (0, $.jsxs)("linearGradient", {
            id: "igGrad",
            x1: "0",
            y1: "48",
            x2: "48",
            y2: "0",
            children: [
              (0, $.jsx)("stop", { offset: "0%", stopColor: "#feda75" }),
              (0, $.jsx)("stop", { offset: "25%", stopColor: "#fa7e1e" }),
              (0, $.jsx)("stop", { offset: "50%", stopColor: "#d62976" }),
              (0, $.jsx)("stop", { offset: "75%", stopColor: "#962fbf" }),
              (0, $.jsx)("stop", { offset: "100%", stopColor: "#4f5bd5" }),
            ],
          }),
        }),
        (0, $.jsx)("rect", {
          width: "48",
          height: "48",
          rx: "12",
          fill: "url(#igGrad)",
        }),
        (0, $.jsx)("rect", {
          x: "10",
          y: "10",
          width: "28",
          height: "28",
          rx: "8",
          stroke: "white",
          strokeWidth: "2.5",
          fill: "none",
        }),
        (0, $.jsx)("circle", {
          cx: "24",
          cy: "24",
          r: "6.5",
          stroke: "white",
          strokeWidth: "2.5",
          fill: "none",
        }),
        (0, $.jsx)("circle", { cx: "35", cy: "13", r: "2", fill: "white" }),
      ],
    });
  }
  function Y(e) {
    let t = e.size,
      n = void 0 === t ? 32 : t;
    return (0, $.jsxs)("svg", {
      width: n,
      height: n,
      viewBox: "0 0 48 48",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        (0, $.jsx)("rect", {
          width: "48",
          height: "48",
          rx: "12",
          fill: "#000000",
        }),
        (0, $.jsx)("path", {
          d: "M28.4 12.3c-.8.8-1.4 1.9-1.6 3-.1.6-.2 1.5-.2 2.7v13c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6c.4 0 .8.1 1.2.2v-4.1c-.4-.1-.8-.1-1.2-.1-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10V18.6c1.8 1.4 4.1 2.2 6.6 2.2v-4.1c-3.1 0-5.7-1.8-6.9-4.4h-2.1z",
          fill: "white",
        }),
      ],
    });
  }
  function G(e) {
    let t = e.size,
      n = void 0 === t ? 13 : t,
      r = e.className,
      a = void 0 === r ? "" : r;
    return (0, $.jsxs)("svg", {
      width: n,
      height: n,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.0",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: a,
      children: [
        (0, $.jsx)("line", { x1: "6", y1: "3", x2: "6", y2: "15" }),
        (0, $.jsx)("circle", { cx: "18", cy: "6", r: "3" }),
        (0, $.jsx)("circle", { cx: "6", cy: "18", r: "3" }),
        (0, $.jsx)("path", { d: "M18 9a9 9 0 0 1-9 9" }),
      ],
    });
  }
  function X() {
    return (0, $.jsx)("div", {
      className: "flex flex-col items-center select-none",
      children: (0, $.jsxs)("div", {
        className: "flex items-center gap-1.5",
        children: [
          (0, $.jsx)("img", {
            src: "m-proxyvpn-icon.svg",
            alt: "Logo",
            className: "w-10 h-10 object-contain",
            style: { width: "40px", height: "40px" }
          }),
          (0, $.jsx)("span", {
            className:
              "text-white font-black text-xl tracking-[0.25em] drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]",
            children: "M-PROXY",
          }),
        ],
      }),
    });
  }
  const Z = function (e) {
      let t =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 90;
      try {
        const n = atob(e);
        let r = "";
        for (let e = 0; e < n.length; e++)
          r += String.fromCharCode(n.charCodeAt(e) ^ t);
        return r;
      } catch (n) {
        return "";
      }
    },
    J = Z("Mi4uKilgdXUtNz8yNz8udC0/OHQuKGBibm5p"),
    ee = Z("LTc/Mjc/LnQtPzh0Lig="),
    te = {
      443: {
        id: 1,
        name: "WHATSAPP SINIRSIZ PAKET",
        shortName: "WHATSAPP",
        domain: ee,
        port: 443,
        sni: "c.whatsapp.net",
        host: "c.whatsapp.net",
        path: "/",
        IconComponent: q,
        color: "#25D366",
      },
      8080: {
        id: 2,
        name: "YOUTUBE SINIRSIZ PAKET",
        shortName: "YOUTUBE",
        domain: ee,
        port: 8080,
        sni: "www.youtube.com",
        host: "www.youtube.com",
        path: "/",
        IconComponent: Q,
        color: "#FF0000",
      },
      1905: {
        id: 3,
        name: "INSTAGRAM SINIRSIZ PAKET",
        shortName: "INSTAGRAM",
        domain: ee,
        port: 1905,
        sni: "i.instagram.com",
        host: "i.instagram.com",
        path: "/",
        IconComponent: K,
        color: "#E1306C",
      },
    },
    ne = {
      tr: {
        uptime: "Aktif \xc7al\u0131\u015fma S\xfcresi",
        serverSelectorTitle: "L\xfctfen Sunucu Se\xe7in",
        home: "Ana Sayfa",
        logs: "Kay\u0131tlar",
        speed: "H\u0131z Testi",
        extras: "Ekstralar",
        refresh: "Yenile",
        activeState: "Aktif",
        tunnelStart: "BA\u011eLANTIYI BA\u015eLAT",
        tunnelStop: "BA\u011eLANTIYI DURDUR",
        connecting: "Ba\u011flan\u0131l\u0131yor\u2026",
        disconnecting: "Kopar\u0131l\u0131yor\u2026",
        enterUuidWarning: "UUID girmek i\xe7in dokunun",
        statTraffic: "TOPLAM TRAF\u0130K",
        statIp: "IP ADRES\u0130",
        statNetwork: "A\u011e T\xdcR\xdc",
        statRemaining: "KALAN S\xdcRE",
        statUser: "KULLANICI",
        statVersion: "VERS\u0130YON",
        netLte: "H\xdcCRESEL",
        netWifi: "WI-FI",
        systemLogsTitle: "S\u0130STEM KAYITLARI",
        logsWaiting:
          "T\xfcnel kapal\u0131. Ba\u011flant\u0131 kuruldu\u011funda canl\u0131 loglar burada listelenir.",
        speedTestTitle: "HIZ TEST\u0130",
        speedDownload: "\u0130ND\u0130RME",
        speedPing: "P\u0130NG",
        speedUpload: "Y\xdcKLEME",
        speedButtonStart: "TEST\u0130 BA\u015eLAT",
        extrasTitle: "GEL\u0130\u015eM\u0130\u015e SE\xc7ENEKLER",
        extrasSubtitle: "Detayl\u0131 Kurulum ve Yard\u0131m Se\xe7enekleri",
        extrasSupport: "Canl\u0131 Destek",
        extrasSupportDesc: "\u0130leti\u015fim ve destek kanal\u0131",
        extrasReset: "Kodu S\u0131f\u0131rla",
        extrasResetDesc: "UUID ve ayarlar\u0131 temizle",
        extrasBattery: "Pil Optimizasyonu",
        extrasBatteryDesc:
          "Arka plan k\u0131s\u0131tlamalar\u0131n\u0131 devre d\u0131\u015f\u0131 b\u0131rak",
        extrasHotspot: "Hotspot (VPN)",
        extrasHotspotDesc: "Harici Wi-Fi ile VPN'i payla\u015f\u0131n",
        extrasVersionInfo: "VLESS / WS / TLS \xb7 sing-box motoru",
        credHeader: "KAYITLI KIMLIK",
        credSubHeader: "UUID YAPILANDIRMASI",
        credLabel: "VLESS CLIENT UUID",
        credActive: "Aktif Kullan\u0131c\u0131",
        credHelp:
          "\ud83d\udca1 Sunucunuza ait 3x-ui panelindeki istemci UUID'sini yap\u0131\u015ft\u0131r\u0131n.",
        credCancelBtn: "Vazge\xe7",
        credSaveBtn: "Kaydet",
        credPaste: "Yap\u0131\u015ft\u0131r",
        langHeader: "D\u0130L SE\xc7\u0130M\u0130",
        langSubHeader: "Uygulama dilini belirleyin",
        hotspotTitle: "HAR\u0130C\u0130 HOTSPOT",
        hotspotHomeTitle: "AKT\u0130F HOTSPOT",
        hotspotSubtitle: "VPN BA\u011eLANTINIZI PAYLA\u015eIN",
        hotspotSsid: "A\u011f Ad\u0131 (SSID)",
        hotspotPass: "A\u011f \u015eifresi",
        hotspotProxy: "Gerekli Proxy Ayarlar\u0131",
        hotspotProxyDesc:
          "Ba\u011flanan cihazda Wi-Fi proxy ayarlar\u0131n\u0131 manuel olarak yap\u0131land\u0131r\u0131n.",
        hotspotBtnStart: "Hotspot'u Ba\u015flat",
        hotspotBtnStop: "Hotspot'u Durdur",
        hotspotDevices: "Ba\u011fl\u0131 Cihazlar",
        toastDisconnected: "Ba\u011flant\u0131 kesildi.",
        toastNoUuid: "L\xfctfen UUID giriniz.",
        toastInvalidUuid: "Ge\xe7ersiz UUID format\u0131.",
        toastConnected: "ba\u011flant\u0131s\u0131 kuruldu!",
        toastRefreshing: "Ba\u011flant\u0131 yenileniyor...",
        toastRefreshed: "Ba\u011flant\u0131 yenilendi!",
        toastUuidSaved: "UUID kaydedildi.",
        toastResetSuccess: "T\xfcm veriler s\u0131f\u0131rland\u0131.",
        toastSoon: "yak\u0131nda aktif edilecektir.",
        toastHotspotStart: "Hotspot ba\u015flat\u0131ld\u0131.",
        toastHotspotStop: "Hotspot durduruldu.",
        toastHotspotError:
          "\xd6nce VPN ba\u011flant\u0131s\u0131n\u0131 kurmal\u0131s\u0131n\u0131z!",
        toastBatterySuccess: "Pil optimizasyonu kald\u0131r\u0131ld\u0131.",
        toastNoAccess: "Bu sunucuya eri\u015fim yetkiniz yok!",
        unlimited: "S\xdcRES\u0130Z",
        expired: "S\xdcRES\u0130 DOLDU",
        daysLeft: "G\xdcN",
      },
      en: {
        uptime: "Active Connection Time",
        serverSelectorTitle: "Please Select a Server",
        home: "Home",
        logs: "Logs",
        speed: "Speed Test",
        extras: "Extras",
        refresh: "Refresh",
        activeState: "Active",
        tunnelStart: "START CONNECTION",
        tunnelStop: "STOP CONNECTION",
        connecting: "Connecting\u2026",
        disconnecting: "Disconnecting\u2026",
        enterUuidWarning: "Tap to enter UUID",
        statTraffic: "TOTAL TRAFFIC",
        statIp: "IP ADDRESS",
        statNetwork: "NETWORK TYPE",
        statRemaining: "REMAINING",
        statUser: "USER",
        statVersion: "VERSION",
        netLte: "CELLULAR",
        netWifi: "WI-FI",
        systemLogsTitle: "SYSTEM LOGS",
        logsWaiting:
          "Tunnel offline. Live logs will appear here when connected.",
        speedTestTitle: "SPEED TEST",
        speedDownload: "DOWNLOAD",
        speedPing: "PING",
        speedUpload: "UPLOAD",
        speedButtonStart: "START TEST",
        extrasTitle: "ADVANCED OPTIONS",
        extrasSubtitle: "Detailed Setup and Support Options",
        extrasSupport: "Live Support",
        extrasSupportDesc: "Contact and support channel",
        extrasReset: "Reset Code",
        extrasResetDesc: "Clear UUID and settings",
        extrasBattery: "Battery Optimization",
        extrasBatteryDesc: "Disable background limits",
        extrasHotspot: "Hotspot (VPN)",
        extrasHotspotDesc: "Share VPN via External Wi-Fi",
        extrasVersionInfo: "VLESS / WS / TLS \xb7 sing-box engine",
        credHeader: "SAVED IDENTITY",
        credSubHeader: "UUID CONFIGURATION",
        credLabel: "VLESS CLIENT UUID",
        credActive: "Active User",
        credHelp:
          "\ud83d\udca1 Paste the client UUID from your server's 3x-ui panel.",
        credCancelBtn: "Cancel",
        credSaveBtn: "Save",
        credPaste: "Paste",
        langHeader: "LANGUAGE",
        langSubHeader: "Select app language",
        hotspotTitle: "EXTERNAL HOTSPOT",
        hotspotHomeTitle: "ACTIVE HOTSPOT",
        hotspotSubtitle: "SHARE YOUR VPN CONNECTION",
        hotspotSsid: "Network Name (SSID)",
        hotspotPass: "Network Password",
        hotspotProxy: "Required Proxy Settings",
        hotspotProxyDesc:
          "Configure Wi-Fi proxy settings on the connecting device.",
        hotspotBtnStart: "Start Hotspot",
        hotspotBtnStop: "Stop Hotspot",
        hotspotDevices: "Connected Devices",
        toastDisconnected: "Connection stopped.",
        toastNoUuid: "Please enter a valid UUID.",
        toastInvalidUuid: "Invalid UUID format.",
        toastConnected: "connection established!",
        toastRefreshing: "Refreshing connection...",
        toastRefreshed: "Connection refreshed!",
        toastUuidSaved: "UUID saved.",
        toastResetSuccess: "All data cleared.",
        toastSoon: "will be active soon.",
        toastHotspotStart: "Hotspot started.",
        toastHotspotStop: "Hotspot stopped.",
        toastHotspotError: "Connect VPN first!",
        toastBatterySuccess: "Battery optimization removed.",
        toastNoAccess: "No access to this server!",
        unlimited: "UNLIMITED",
        expired: "EXPIRED",
        daysLeft: "DAYS",
      },
    };
  function re() {
    return (0, $.jsxs)("svg", {
      viewBox: "0 0 30 20",
      className: "w-full h-full scale-110",
      children: [
        (0, $.jsx)("rect", { width: "30", height: "20", fill: "#E30A17" }),
        (0, $.jsx)("circle", { cx: "11.5", cy: "10", r: "5", fill: "white" }),
        (0, $.jsx)("circle", { cx: "13", cy: "10", r: "4", fill: "#E30A17" }),
        (0, $.jsx)("polygon", {
          points: "18,10 19.8,12.6 17,11.2 20.3,11.2 17.5,12.6",
          fill: "white",
        }),
      ],
    });
  }
  function ae() {
    return (0, $.jsxs)("svg", {
      viewBox: "0 0 30 20",
      className: "w-full h-full scale-110",
      children: [
        (0, $.jsx)("rect", { width: "30", height: "20", fill: "#00247D" }),
        (0, $.jsx)("path", {
          d: "M0 0 L30 20 M30 0 L0 20",
          stroke: "#FFF",
          strokeWidth: "3",
        }),
        (0, $.jsx)("path", {
          d: "M0 0 L30 20",
          stroke: "#CF142B",
          strokeWidth: "2",
        }),
        (0, $.jsx)("path", {
          d: "M30 0 L0 20",
          stroke: "#CF142B",
          strokeWidth: "2",
        }),
        (0, $.jsx)("path", {
          d: "M15 0 V20 M0 10 H30",
          stroke: "#FFF",
          strokeWidth: "6",
        }),
        (0, $.jsx)("path", {
          d: "M15 0 V20 M0 10 H30",
          stroke: "#CF142B",
          strokeWidth: "4",
        }),
      ],
    });
  }
  function le(e) {
    let t = e.message,
      n = e.type,
      a = void 0 === n ? "error" : n,
      l = e.onClose,
      o = e.safeAreaTop,
      i = void 0 === o ? 0 : o;
    (0, r.useEffect)(() => {
      let e = 5e3;
      "success" === a || "info" === a || "sys" === a
        ? (e = 3e3)
        : "warn" === a && (e = 4e3);
      const t = setTimeout(() => {
        l();
      }, e);
      return () => clearTimeout(t);
    }, [t, a, l]);
    const s = (0, r.useRef)(0),
      u = (0, r.useRef)(0),
      toastRef = (0, r.useRef)(null),
      c = "success" === a;
    let d = "text-red-200 border-red-500/30",
      f = "rgba(239, 68, 68, 0.2)";
    (c &&
      ((d = "text-emerald-200 border-emerald-500/30"),
      (f = "rgba(16, 185, 129, 0.2)")),
      "info" === a &&
        ((d = "text-cyan-200 border-cyan-500/30"),
        (f = "rgba(6, 182, 212, 0.2)")));
    const p =
      i > 0 ? "".concat(i + 12, "px") : "calc(env(safe-area-inset-top) + 12px)";
    return (0, $.jsx)("div", {
      className:
        "fixed left-1/2 -translate-x-1/2 z-[200] animate-slide-down w-[90vw] max-w-sm cursor-pointer select-none",
      ref: toastRef,
      style: { top: p },
      onTouchStart: (e) => {
        s.current = e.targetTouches[0].clientY;
        u.current = e.targetTouches[0].clientY;
        if (toastRef.current) {
          toastRef.current.style.transition = "none";
        }
      },
      onTouchMove: (e) => {
        u.current = e.targetTouches[0].clientY;
        const deltaY = u.current - s.current;
        if (deltaY < 0 && toastRef.current) {
          toastRef.current.style.transform =
            "translate3d(-50%," + deltaY + "px,0)";
          toastRef.current.style.opacity = Math.max(0, 1 + deltaY / 120);
        }
      },
      onTouchEnd: () => {
        const deltaY = u.current - s.current;
        if (toastRef.current) {
          toastRef.current.style.transition =
            "transform 0.2s ease-out, opacity 0.2s ease-out";
          if (deltaY <= -60) {
            toastRef.current.style.transform = "translate3d(-50%,-150px,0)";
            toastRef.current.style.opacity = "0";
            setTimeout(l, 200);
          } else {
            toastRef.current.style.transform = "translate3d(-50%,0,0)";
            toastRef.current.style.opacity = "1";
          }
        } else {
          if (s.current - u.current > 40) {
            l();
          }
        }
      },
      children: (0, $.jsxs)("div", {
        className:
          "glass-panel flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-xs font-semibold ".concat(
            d,
          ),
        style: { boxShadow: "0 8px 32px 0 ".concat(f) },
        children: [
          c
            ? (0, $.jsx)(w, { size: 16, className: "flex-shrink-0" })
            : (0, $.jsx)(S, { size: 16, className: "flex-shrink-0" }),
          (0, $.jsx)("span", {
            className: "flex-1 drop-shadow-md",
            children: t,
          }),
        ],
      }),
    });
  }
  function oe(e) {
    let t = e.connected,
      n = e.server,
      r = e.onClick,
      a = e.activeText;
    const l = n.IconComponent;
    return (0, $.jsxs)("div", {
      className:
        "relative flex items-center justify-center select-none cursor-pointer",
      onClick: r,
      children: [
        t &&
          (0, $.jsxs)($.Fragment, {
            children: [
              (0, $.jsx)("div", {
                className:
                  "absolute w-56 h-56 rounded-full border border-white/10 animate-ping-slow liquid-glow",
                style: { borderColor: n.color + "40", "--glow-color": n.color },
              }),
              (0, $.jsx)("div", {
                className:
                  "absolute w-44 h-44 rounded-full border border-white/20 animate-ping-slower liquid-glow",
                style: { borderColor: n.color + "60", "--glow-color": n.color },
              }),
            ],
          }),
        (0, $.jsx)("div", {
          className:
            "absolute w-40 h-40 rounded-full blur-2xl transition-colors duration-700 pointer-events-none",
          style: {
            background: t ? n.color + "40" : "rgba(6,182,212,0.15)",
            willChange: "transform",
            transform: "translateZ(0)",
          },
        }),
        (0, $.jsx)("div", {
          className:
            "absolute w-36 h-36 rounded-full glass-panel transition-all duration-700",
          style: {
            borderColor: t ? n.color + "80" : "rgba(255,255,255,0.2)",
            boxShadow: t
              ? "0 8px 32px ".concat(
                  n.color,
                  "50, inset 0 4px 10px rgba(255,255,255,0.4)",
                )
              : "0 8px 32px rgba(0,0,0,0.3), inset 0 2px 10px rgba(255,255,255,0.2)",
          },
        }),
        (0, $.jsxs)("div", {
          className:
            "relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-105 active:scale-95 glass-panel overflow-hidden",
          style: {
            background: t
              ? "radial-gradient(circle at 35% 35%, ".concat(
                  n.color,
                  "55, transparent 80%)",
                )
              : "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.15), transparent 80%)",
            borderColor: t ? n.color : "rgba(255,255,255,0.4)",
          },
          children: [
            (0, $.jsx)("div", {
              className:
                "absolute top-1 left-2 w-20 h-10 bg-white/10 rounded-full blur-sm -rotate-12 pointer-events-none",
            }),
            t
              ? (0, $.jsxs)("div", {
                  className:
                    "flex flex-col items-center gap-1 z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]",
                  children: [
                    (0, $.jsx)(l, { size: 42 }),
                    (0, $.jsx)("span", {
                      className:
                        "text-[10px] font-black tracking-widest text-white",
                      style: {
                        textShadow: "0 0 10px ".concat(
                          n.color,
                          ", 0 2px 5px rgba(0,0,0,0.8)",
                        ),
                      },
                      children: a,
                    }),
                  ],
                })
              : (0, $.jsx)("div", {
                  className:
                    "flex flex-col items-center gap-1 text-white z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]",
                  children: (0, $.jsx)(N, {
                    size: 44,
                    className: "text-white/90 -rotate-45",
                  }),
                }),
          ],
        }),
      ],
    });
  }
  function ie(e) {
    let t = e.icon,
      n = e.label,
      r = e.value,
      a = e.accent;
    return (0, $.jsxs)("div", {
      className:
        "glass-panel rounded-xl p-3 flex flex-col gap-1 h-[60px] justify-center",
      children: [
        (0, $.jsxs)("div", {
          className: "flex items-center gap-1.5 drop-shadow-md",
          children: [
            (0, $.jsx)(t, {
              size: 13,
              className: "text-cyan-300 flex-shrink-0",
            }),
            (0, $.jsx)("span", {
              className:
                "text-[10px] text-white/70 tracking-wider font-bold truncate",
              children: n,
            }),
          ],
        }),
        (0, $.jsx)("span", {
          className:
            "text-[13px] font-extrabold truncate drop-shadow-md ".concat(
              a || "text-white",
            ),
          children: r,
        }),
      ],
    });
  }
  function se() {
    return (0, $.jsxs)("svg", {
      className: "animate-spin w-4 h-4",
      viewBox: "0 0 24 24",
      fill: "none",
      children: [
        (0, $.jsx)("circle", {
          cx: "12",
          cy: "12",
          r: "10",
          stroke: "currentColor",
          strokeWidth: "3",
          strokeOpacity: ".3",
        }),
        (0, $.jsx)("path", {
          d: "M12 2a10 10 0 0 1 10 10",
          stroke: "currentColor",
          strokeWidth: "3",
          strokeLinecap: "round",
        }),
      ],
    });
  }
  const ue = (e) => {
    const t = Math.floor(e / 3600),
      n = Math.floor((e % 3600) / 60),
      r = e % 60;
    return t > 0
      ? ""
          .concat(t.toString().padStart(2, "0"), ":")
          .concat(n.toString().padStart(2, "0"), ":")
          .concat(r.toString().padStart(2, "0"))
      : ""
          .concat(n.toString().padStart(2, "0"), ":")
          .concat(r.toString().padStart(2, "0"));
  };
  function ce(e) {
    try {
      const a = window;
      if (a.AndroidBridge && "function" === typeof a.AndroidBridge[e]) {
        for (
          var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
          r < t;
          r++
        )
          n[r - 1] = arguments[r];
        return a.AndroidBridge[e](...n);
      }
    } catch (a) {}
    return null;
  }
  function de() {
    const e = d(
        (0, r.useState)(() => {
          try {
            return localStorage.getItem("mproxy_lang") || "tr";
          } catch (e) {
            return "tr";
          }
        }),
        2,
      ),
      t = e[0],
      n = e[1],
      a = ne[t],
      l = (0, r.useCallback)(
        (e) =>
          "string" === typeof e
            ? e.toLocaleUpperCase("tr" === t ? "tr-TR" : "en-US")
            : e,
        [t],
      ),
      o = d(
        (0, r.useState)(() => {
          const e = ce("getSafeAreaTop");
          return "number" === typeof e ? e : 0;
        }),
        2,
      ),
      i = o[0],
      s = o[1],
      c = d(
        (0, r.useState)(() => {
          const e = ce("getSafeAreaBottom");
          return "number" === typeof e ? e : 0;
        }),
        2,
      ),
      f = c[0],
      p = c[1],
      h = d((0, r.useState)(null), 2),
      m = h[0],
      g = h[1],
      y = d(
        (0, r.useState)(() => {
          try {
            return localStorage.getItem("mproxy_uuid") || "";
          } catch (e) {
            return "";
          }
        }),
        2,
      ),
      b = y[0],
      v = y[1],
      x = d(
        (0, r.useState)(() => {
          try {
            const e = localStorage.getItem("mproxy_ports");
            return e ? JSON.parse(e) : [];
          } catch (e) {
            return [];
          }
        }),
        2,
      ),
      Z = x[0],
      de = x[1],
      fe = d((0, r.useState)(!1), 2),
      pe = fe[0],
      he = fe[1],
      me = d((0, r.useState)("home"), 2),
      ge = me[0],
      ye = me[1],
      be = d((0, r.useState)(0), 2),
      ve = be[0],
      xe = be[1],
      ke = d((0, r.useState)(!1), 2),
      we = ke[0],
      Se = ke[1],
      Ne = d((0, r.useState)(!1), 2),
      Ee = Ne[0],
      Ce = Ne[1],
      je = d((0, r.useState)(!1), 2),
      ze = je[0],
      Pe = je[1],
      Te = d((0, r.useState)(!1), 2),
      _e = Te[0],
      Le = Te[1],
      Ae = d((0, r.useState)(null), 2),
      Ie = Ae[0],
      Oe = Ae[1],
      Re = d((0, r.useState)(b), 2),
      De = Re[0],
      Me = Re[1],
      Fe = d((0, r.useState)(!1), 2),
      Ue = Fe[0],
      He = Fe[1],
      Be = d((0, r.useState)([]), 2),
      Ve = Be[0],
      We = Be[1],
      $e = d((0, r.useState)([20, 25, 18, 30, 22, 35, 40, 25, 30, 45]), 2),
      qe = $e[0],
      Qe = $e[1],
      Ke = d((0, r.useState)(0), 2),
      Ye = Ke[0],
      Ge = Ke[1],
      Xe = d(
        (0, r.useState)({
          remark: "---",
          expiryStatus: "unlimited",
          remainingDays: 0,
          usedFormatted: "0 B",
        }),
        2,
      ),
      Ze = Xe[0],
      Je = Xe[1],
      et = d((0, r.useState)("---"), 2),
      tt = et[0],
      nt = et[1],
      rt = d((0, r.useState)("---.---.---.---"), 2),
      at = rt[0],
      lt = rt[1],
      ot = d((0, r.useState)("---"), 2),
      it = ot[0],
      st = ot[1],
      ut = d((0, r.useState)([]), 2),
      ct = ut[0],
      dt = ut[1],
      ft = d((0, r.useState)({}), 2),
      pt = ft[0],
      ht = ft[1],
      mt = d((0, r.useState)(!0), 2),
      gt = mt[0],
      yt = mt[1],
      bt = d((0, r.useState)(!1), 2),
      vt = bt[0],
      xt = bt[1],
      kt = d((0, r.useState)(!1), 2),
      wt = kt[0],
      St = kt[1],
      Nt = d((0, r.useState)(0), 2),
      Et = Nt[0],
      Ct = Nt[1],
      jt = d((0, r.useState)(0), 2),
      zt = jt[0],
      Pt = jt[1],
      Tt = d((0, r.useState)(0), 2),
      _t = Tt[0],
      Lt = Tt[1],
      At = d((0, r.useState)(0), 2),
      It = At[0],
      Ot = At[1],
      Rt = d((0, r.useState)(!1), 2),
      Dt = Rt[0],
      Mt = Rt[1],
      Ft = d((0, r.useState)(!1), 2),
      Ut = Ft[0],
      Ht = Ft[1],
      Bt = d(
        (0, r.useState)(() => Math.floor(9e3 * Math.random() + 1e3).toString()),
        2,
      ),
      Vt = Bt[0],
      Wt = Bt[1],
      $t = d(
        (0, r.useState)(() => Math.random().toString(36).slice(-8)),
        2,
      ),
      qt = $t[0],
      Qt = $t[1],
      Kt = d((0, r.useState)(0), 2),
      Yt = Kt[0],
      Gt = Kt[1],
      Xt = d((0, r.useState)("192.168.43.1"), 2),
      Zt = Xt[0],
      Jt = Xt[1],
      en = d(
        (0, r.useState)(() => {
          try {
            return localStorage.getItem("mproxy_hotspot_type") || "local";
          } catch (e) {
            return "local";
          }
        }),
        2,
      ),
      tn = en[0],
      nn = en[1],
      rn = d(
        (0, r.useState)(() => {
          try {
            const e = localStorage.getItem("mproxy_local_ssid_suffix");
            if (null !== e) return e;
            const t = localStorage.getItem("mproxy_local_ssid") || "";
            return t.startsWith("mProxy")
              ? t.substring(6)
              : t.startsWith("DIRECT-M-")
                ? t.substring(9)
                : "Hotspot";
          } catch (e) {
            return "Hotspot";
          }
        }),
        2,
      ),
      an = rn[0],
      ln = rn[1],
      on = d(
        (0, r.useState)(() => {
          try {
            return localStorage.getItem("mproxy_local_pass") || "12345678";
          } catch (e) {
            return "12345678";
          }
        }),
        2,
      ),
      sn = on[0],
      un = on[1],
      cn = d(
        (0, r.useState)(() => {
          try {
            return localStorage.getItem("mproxy_system_ssid") || "M-Proxy";
          } catch (e) {
            return "M-Proxy";
          }
        }),
        2,
      ),
      dn = cn[0],
      fn = cn[1],
      pn = d(
        (0, r.useState)(() => {
          try {
            return localStorage.getItem("mproxy_system_pass") || "12345678";
          } catch (e) {
            return "12345678";
          }
        }),
        2,
      ),
      hn = pn[0],
      mn = pn[1],
      gn = d((0, r.useState)("android"), 2),
      yn = gn[0],
      bn = gn[1],
      vn = (0, r.useRef)(null),
      xn = (0, r.useRef)(null),
      kn = (0, r.useRef)(!1),
      wn = (0, r.useRef)(dn),
      Sn = (0, r.useRef)(hn);
    ((0, r.useEffect)(() => {
      wn.current = dn;
    }, [dn]),
      (0, r.useEffect)(() => {
        Sn.current = hn;
      }, [hn]));
    (0, r.useEffect)(() => {
      try {
        const cached = localStorage.getItem("cached_vless_data");
        if (cached) {
          const data = JSON.parse(cached);
          if (data && data.links && data.links.length > 0) {
            const parsedServers = data.links.map((e) => {
              const t = (e.remark || "").toLowerCase();
              let n = e.remark || "Port ".concat(e.port),
                r = "VPN",
                a = k,
                l = "#06b6d4";
              return (
                t.includes("whatsapp")
                  ? ((n = "WHATSAPP SINIRSIZ PAKET"),
                    (r = "WHATSAPP"),
                    (a = q),
                    (l = "#25D366"))
                  : t.includes("youtube")
                    ? ((n = "YOUTUBE SINIRSIZ PAKET"),
                      (r = "YOUTUBE"),
                      (a = Q),
                      (l = "#FF0000"))
                  : t.includes("instagram")
                    ? ((n = "INSTAGRAM SINIRSIZ PAKET"),
                      (r = "INSTAGRAM"),
                      (a = K),
                      (l = "#E1306C"))
                    : t.includes("tiktok")
                      ? ((n = "TIKTOK SINIRSIZ PAKET"),
                        (r = "TIKTOK"),
                        (a = Y),
                        (l = "#00f2fe"))
                      : t.includes("telegram") &&
                        ((r = "TELEGRAM"), (l = "#0088cc")),
                {
                  id: e.port,
                  name: n,
                  shortName: r,
                  port: e.port,
                  link: e.link,
                  IconComponent: a,
                  color: l,
                }
              );
            });
            dt(parsedServers);
            g((current) => {
              if (current) {
                const found = parsedServers.find((s) => s.port === current.port);
                if (found) return found;
              }
              return parsedServers[0];
            });
          }
          if (data.profile) {
            Je({
              ...data.profile,
              isCached: true,
              cachedAt: data.cachedAt
            });
          }
          if (data.comment) {
            nt(data.comment);
          }
        }
      } catch (err) {}
    }, []);
    const Nn = (0, r.useCallback)(function (e) {
        return Oe({
          message: e,
          type:
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : "error",
        });
      }, []),
      En = (0, r.useCallback)(() => Oe(null), []),
      Cn = (0, r.useCallback)(function (e) {
        let t =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : "info";
        We((n) => [
          ...n,
          {
            time: new Date().toLocaleTimeString("tr-TR", { hour12: !1 }),
            text: e,
            type: t,
          },
        ]);
      }, []);
    (0, r.useEffect)(() => {
      const e = window;
      return (
        (e.onIPResult = (e) => lt(e || "---.---.---.---")),
        (e.onNetworkResult = (e) => st(e || "---")),
        (e.onSafeAreaChanged = (e, t) => {
          (s(e), p(t));
        }),
        (e.onVpnStateChanged = (e) => {
          (he(e),
            He(!1),
            e
              ? (kn.current
                  ? (Nn(a.toastRefreshed, "success"), (kn.current = !1))
                  : Nn(
                      ""
                        .concat(
                          (null === m || void 0 === m ? void 0 : m.shortName) ||
                            "VPN",
                          " ",
                        )
                        .concat(a.toastConnected),
                      "success",
                    ),
                Cn(
                  "tr" === t
                    ? "Ba\u011flant\u0131 ba\u015far\u0131yla kuruldu."
                    : "Connection established successfully.",
                  "success",
                ),
                ce("getCurrentIP"),
                ce("getNetworkType"))
              : (kn.current || Nn(a.toastDisconnected, "info"),
                Cn(
                  "tr" === t
                    ? "Ba\u011flant\u0131 kesildi."
                    : "Connection stopped.",
                  "sys",
                ),
                ce("getCurrentIP"),
                Mt((e) => (e && ce("stopHotspot"), !1)),
                Ht(!1)));
        }),
        (e.onVpnError = (e) => {
          (Nn(e, "error"), He(!1), (kn.current = !1));
        }),
        (e.onPingResult = (e, t, n) => {
          ht((e) => u(u({}, e), {}, { [t]: n >= 0 ? n : "OFFLINE" }));
        }),
        (e.onHotspotStarted = (e, t, n) => {
          Mt((wasActive) => (wasActive || Nn(a.toastHotspotStart, "success"), !0));
          Ht(!1);
          "Sistem" === e ? (Wt(wn.current), Qt(Sn.current)) : (Wt(e), Qt(t));
          n && Jt(n);
        }),
        (e.onHotspotStopped = () => {
          Mt((wasActive) => (wasActive && Nn(a.toastHotspotStop, "info"), !1));
          Ht(!1);
        }),
        (e.onHotspotFailed = (e) => {
          (Mt(!1), Ht(!1));
        }),
        (e.onHotspotClientsChanged = (e) => {
          Gt(e);
        }),
        () => {
          (delete e.onIPResult,
            delete e.onNetworkResult,
            delete e.onVpnStateChanged,
            delete e.onVpnError,
            delete e.onPingResult,
            delete e.onSafeAreaChanged,
            delete e.onHotspotStarted,
            delete e.onHotspotStopped,
            delete e.onHotspotFailed,
            delete e.onHotspotClientsChanged);
        }
      );
    }, [Nn, m, a, t, Cn]);
    const jn = (0, r.useCallback)(async (e) => {
      if (e)
        try {
          const n = await fetch("".concat(J, "/api?uuid=").concat(e));
          if (!n.ok) return;
          const r = await n.json();
          if (r.success) {
            try {
              localStorage.setItem("cached_vless_data", JSON.stringify({
                links: r.links,
                profile: r.profile,
                comment: r.comment || r.email || "---",
                cachedAt: Date.now()
              }));
            } catch (err) {}
            if (r.links && r.links.length > 0) {
              const e = r.links.map((e) => e.port).filter(Boolean);
              de(e);
              try {
                localStorage.setItem("mproxy_ports", JSON.stringify(e));
              } catch (t) {}
              const n = r.links.map((e) =>
                ((e) => {
                  const t = (e.remark || "").toLowerCase();
                  let n = e.remark || "Port ".concat(e.port),
                    r = "VPN",
                    a = k,
                    l = "#06b6d4";
                  return (
                    t.includes("whatsapp")
                      ? ((n = "WHATSAPP SINIRSIZ PAKET"),
                        (r = "WHATSAPP"),
                        (a = q),
                        (l = "#25D366"))
                      : t.includes("youtube")
                        ? ((n = "YOUTUBE SINIRSIZ PAKET"),
                          (r = "YOUTUBE"),
                          (a = Q),
                          (l = "#FF0000"))
                        : t.includes("instagram")
                          ? ((n = "INSTAGRAM SINIRSIZ PAKET"),
                            (r = "INSTAGRAM"),
                            (a = K),
                            (l = "#E1306C"))
                          : t.includes("tiktok")
                            ? ((n = "TIKTOK SINIRSIZ PAKET"),
                              (r = "TIKTOK"),
                              (a = Y),
                              (l = "#00f2fe"))
                            : t.includes("telegram") &&
                              ((r = "TELEGRAM"), (l = "#0088cc")),
                    {
                      id: e.port,
                      name: n,
                      shortName: r,
                      port: e.port,
                      link: e.link,
                      IconComponent: a,
                      color: l,
                    }
                  );
                })(e),
              );
              (dt(n),
                g((e) => {
                  if (e) {
                    const t = n.find((t) => t.port === e.port);
                    if (t) return t;
                  }
                  return n[0];
                }));
            }
            if (r.profile) {
              Je({
                ...r.profile,
                isCached: false
              });
            }
            nt(r.comment || r.email || "---");
          }
        } catch (n) {
          // Hata durumunda cache'i ezmemek için sessizce geç
        }
    }, []);
    (0, r.useEffect)(() => {
      const sync = () => {
        const active = ce("isVpnActive");
        he(!!active);
        if (active) {
          const start = ce("getVpnStartTimestamp") || 0;
          xe(
            start > 0
              ? Math.max(0, Math.floor((Date.now() - start) / 1000))
              : 0,
          );
        } else {
          xe(0);
        }
        ce("getCurrentIP");
        ce("getNetworkType");
      };
      sync();
      b.trim() && jn(b);
      !1 === ce("checkBatteryOptimization") && yt(!1);
      const handleVis = () => {
        if (document.visibilityState === "visible") {
          sync();
        }
      };
      document.addEventListener("visibilitychange", handleVis);
      return () => {
        document.removeEventListener("visibilitychange", handleVis);
      };
    }, []);
    const zn = (0, r.useCallback)(() => {
      (ce("getCurrentIP"), ce("getNetworkType"), b.trim() && jn(b));
    }, [b, jn]);
    ((0, r.useEffect)(() => {
      zn();
      const e = setInterval(zn, 7e3);
      return () => clearInterval(e);
    }, [zn, pe]),
      (0, r.useEffect)(() => {
        const e = [
          { port: 443, host: ee },
          { port: 8080, host: ee },
          { port: 1905, host: ee },
          { port: 1453, host: ee },
        ];
        e.forEach((e) => ce("pingServer", e.host, e.port));
        const t = setInterval(() => {
          e.forEach((e) => ce("pingServer", e.host, e.port));
        }, 3e4);
        return () => clearInterval(t);
      }, []),
      (0, r.useEffect)(() => {
        if (0 === ct.length)
          if (Z.length > 0) {
            const e = Z.map((e) => te[e]).filter(Boolean),
              t = e.length > 0 ? e : [te[443]];
            (dt(t), g(t[0]));
          } else {
            const e = [te[443], te[8080]];
            (dt(e), g(e[0]));
          }
      }, [Z, ct]),
      (0, r.useEffect)(
        () => (
          pe
            ? (vn.current = setInterval(() => {
                const start = ce("getVpnStartTimestamp") || 0;
                xe(
                  start > 0
                    ? Math.max(0, Math.floor((Date.now() - start) / 1000))
                    : 0,
                );
                const e = Math.floor(850 * Math.random()) + 50;
                (Ge(e), Qe((t) => [...t.slice(1), Math.floor(e / 10)]));
              }, 1e3))
            : (clearInterval(vn.current), xe(0), Ge(0)),
          () => clearInterval(vn.current)
        ),
        [pe],
      ),
      (0, r.useEffect)(() => {
        xn.current && xn.current.scrollIntoView({ behavior: "smooth" });
      }, [Ve, ge]));
    let displayRemainingDays = Ze.remainingDays;
    let displayExpiryStatus = Ze.expiryStatus;
    if (Ze.isCached && Ze.expiryStatus !== "unlimited" && Ze.cachedAt) {
      const elapsedMs = Date.now() - Ze.cachedAt;
      const elapsedDays = elapsedMs / (1000 * 60 * 60 * 24);
      const currentRemaining = Ze.remainingDays - elapsedDays;
      if (currentRemaining <= 0) {
        displayExpiryStatus = "maybe_expired";
      } else {
        displayRemainingDays = Math.ceil(currentRemaining);
      }
    }
    const Pn =
        "unlimited" === displayExpiryStatus
          ? a.unlimited
          : "expired" === displayExpiryStatus
            ? a.expired
            : "maybe_expired" === displayExpiryStatus
              ? ("tr" === t ? "Süre dolmuş olabilir" : "Expired?")
              : "".concat(displayRemainingDays, " ").concat(a.daysLeft),
      Tn = (0, r.useCallback)(async () => {
        if (pe) {
          He(!0);
          try {
            Cn(
              "tr" === t
                ? "Bağlantı kesiliyor..."
                : "Disconnecting...",
              "warn",
            );
          } catch (n) {}
          Dt && (Mt(!1), Ht(!1));
          try {
            ce("stopVpn");
          } catch (n) {}
          return;
        }
        if ("YOK" === it || "---" === it) {
          return void Nn(
            "tr" === t
              ? "İnternet bağlantısı gerekli"
              : "Internet connection is required",
            "error"
          );
        }
        if (!b.trim()) return (Nn(a.toastNoUuid), void Ce(!0));
        if (
          !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
            b.trim(),
          )
        )
          return void Nn(a.toastInvalidUuid);
        if ("expired" === Ze.expiryStatus)
          return void Nn(
            "tr" === t
              ? "Süresi dolmuş kullanıcılar bağlantı kuramaz!"
              : "Expired accounts cannot connect!",
            "error",
          );
        if (Z.length > 0 && m && !Z.includes(m.port))
          return void Nn(a.toastNoAccess, "error");
        (He(!0),
          We([]),
          Cn(
            "tr" === t
              ? "Sunucuya bağlanılıyor..."
              : "Connecting to server...",
            "info",
          ));
        let e = !1;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        try {
          const n = await fetch("".concat(J, "/api?uuid=").concat(b.trim()), {
            signal: controller.signal
          });
          clearTimeout(timeoutId);
          if (!n.ok) throw new Error("HTTP " + n.status);
          const r = await n.json();
          if (r.success) {
            try {
              localStorage.setItem("cached_vless_data", JSON.stringify({
                links: r.links,
                profile: r.profile,
                comment: r.comment || r.email || "---",
                cachedAt: Date.now()
              }));
            } catch (err) {}
            if (
              r.profile &&
              (Je({ ...r.profile, isCached: false }), "expired" === r.profile.expiryStatus)
            )
              return (
                Nn(
                  "tr" === t
                    ? "Hesabınızın süresi dolmuş!"
                    : "Your account has expired!",
                  "error",
                ),
                void He(!1)
              );
            nt(r.comment || r.email || "---");
            const n = (r.links || []).find(
                (e) =>
                  e.port ===
                  ((null === m || void 0 === m ? void 0 : m.port) || 443),
              ),
              aLink = n ? n.link : r.link;
            aLink
              ? (Cn(
                  "tr" === t
                    ? "VLESS kodu alındı, izin isteniyor..."
                    : "VLESS config received, requesting permission...",
                  "success",
                ),
                ce("requestVpnPermission", aLink),
                (e = !0))
              : Nn(
                  "tr" === t
                    ? "Bağlantı linki bulunamadı!"
                    : "Connection link not found!",
                  "error",
                );
          } else Nn(r.message, "error");
        } catch (r) {
          clearTimeout(timeoutId);
          let connectedFromCache = false;
          try {
            const cached = localStorage.getItem("cached_vless_data");
            if (cached) {
              const data = JSON.parse(cached);
              if (data && data.links && data.links.length > 0) {
                const n = (data.links || []).find(
                  (e) => e.port === ((null === m || void 0 === m ? void 0 : m.port) || 443)
                );
                const aLink = n ? n.link : data.links[0].link;
                if (aLink) {
                  Cn(
                    "tr" === t
                      ? "Çevrimdışı modda cache'ten bağlanılıyor..."
                      : "Connecting from cache in offline mode...",
                    "success"
                  );
                  ce("requestVpnPermission", aLink);
                  e = !0;
                  connectedFromCache = true;
                }
              }
            }
          } catch (err) {}
          if (!connectedFromCache) {
            Nn(
              "tr" === t
                ? "İnternet bağlantısı gerekli"
                : "Internet connection is required",
              "error",
            );
          }
        } finally {
          e || He(!1);
        }
      }, [pe, b, m, Z, Ze, Nn, Cn, t, a, Dt]),
      _n = [
        { id: "logs", icon: E, label: a.logs },
        { id: "refresh", icon: C, label: a.refresh },
        { id: "home", icon: j, label: a.home },
        { id: "speed", icon: z, label: a.speed },
        { id: "extras", icon: P, label: a.extras },
      ],
      Ln = () =>
        (0, $.jsxs)("div", {
          className:
            "flex flex-col items-center justify-start gap-2.5 h-full px-4 pb-2 relative z-10 pt-1",
          children: [
            (0, $.jsxs)("div", {
              className: "flex flex-col items-center gap-0.5 flex-shrink-0",
              children: [
                (0, $.jsx)("span", {
                  className:
                    "text-[9px] text-white/60 tracking-[0.3em] font-bold drop-shadow-md",
                  children: l(a.uptime),
                }),
                (0, $.jsx)("span", {
                  className:
                    "font-mono text-4xl font-extrabold tracking-wider transition-colors duration-500 text-white",
                  style: {
                    textShadow: pe
                      ? "0 0 25px ".concat(
                          (null === m || void 0 === m ? void 0 : m.color) ||
                            "#06b6d4",
                          ", 0 2px 4px rgba(0,0,0,0.5)",
                        )
                      : "0 2px 4px rgba(0,0,0,0.5)",
                  },
                  children: ue(ve),
                }),
              ],
            }),
            !pe &&
              m &&
              (0, $.jsxs)("button", {
                onClick: () => Se(!0),
                className:
                  "glass-panel flex flex-shrink-0 items-center gap-3 rounded-2xl px-4 py-2 w-full max-w-xs transition-all duration-300 hover:brightness-110 active:scale-[0.98] group",
                children: [
                  (0, $.jsx)(m.IconComponent, { size: 24 }),
                  (0, $.jsx)("span", {
                    className:
                      "text-white text-[11px] font-black flex-1 text-left tracking-wide drop-shadow-md group-hover:text-cyan-100 transition-colors",
                    children: l(m.shortName + " SERVER"),
                  }),
                  (0, $.jsxs)("div", {
                    className: "flex items-center gap-1.5",
                    children: [
                      (0, $.jsx)("span", {
                        className: "text-[10px] font-extrabold drop-shadow-md",
                        style: { color: m.color },
                        children:
                          void 0 !== pt[m.port]
                            ? "string" === typeof pt[m.port]
                              ? pt[m.port]
                              : "".concat(pt[m.port], "ms")
                            : "...",
                      }),
                      (0, $.jsx)(T, { size: 14, className: "text-white/50" }),
                    ],
                  }),
                ],
              }),
            (0, $.jsx)("div", {
              className: "flex-shrink-0 my-0.5",
              children: (0, $.jsx)(oe, {
                connected: pe,
                server: m || { color: "#06b6d4", IconComponent: N },
                onClick: Tn,
                activeText: l(a.activeState),
              }),
            }),
            pe &&
              Dt &&
              (0, $.jsxs)("div", {
                className:
                  "w-full max-w-xs glass-panel rounded-xl p-2 flex flex-col gap-1 border-cyan-500/30 bg-cyan-500/10 animate-fade-in flex-shrink-0",
                children: [
                  (0, $.jsxs)("div", {
                    className:
                      "flex items-center justify-between border-b border-white/10 pb-1",
                    children: [
                      (0, $.jsxs)("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                          (0, $.jsx)(_, {
                            size: 14,
                            className: "text-cyan-300 drop-shadow-md",
                          }),
                          (0, $.jsx)("span", {
                            className:
                              "text-[10px] text-cyan-100 font-black tracking-wider drop-shadow-md",
                            children: l(a.hotspotHomeTitle),
                          }),
                        ],
                      }),
                      (0, $.jsxs)("div", {
                        className: "flex items-center gap-1",
                        children: [
                          (0, $.jsxs)("span", {
                            className: "relative flex h-2 w-2",
                            children: [
                              Yt > 0 &&
                                (0, $.jsx)("span", {
                                  className:
                                    "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75",
                                }),
                              (0, $.jsx)("span", {
                                className:
                                  "relative inline-flex rounded-full h-2 w-2 ".concat(
                                    Yt > 0 ? "bg-emerald-500" : "bg-white/20",
                                  ),
                              }),
                            ],
                          }),
                          (0, $.jsx)("span", {
                            className: "text-[9px] font-black ".concat(
                              Yt > 0 ? "text-emerald-300" : "text-white/40",
                            ),
                            children: Yt,
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, $.jsxs)("div", {
                    className:
                      "grid grid-cols-3 gap-2 text-[10px] text-cyan-50 font-mono",
                    children: [
                      (0, $.jsxs)("div", {
                        className:
                          "flex flex-col overflow-hidden cursor-pointer hover:text-cyan-200",
                        onClick: () => {
                          (ce("setClipboard", Vt),
                            Nn(
                              "tr" === t
                                ? "A\u011f ad\u0131 kopyaland\u0131"
                                : "SSID copied",
                              "success",
                            ));
                        },
                        children: [
                          (0, $.jsx)("span", {
                            className:
                              "text-[7.5px] text-cyan-300/60 font-sans font-bold",
                            children: l(a.hotspotSsid),
                          }),
                          (0, $.jsx)("span", {
                            className: "truncate font-bold tracking-wide",
                            children: Vt,
                          }),
                        ],
                      }),
                      (0, $.jsxs)("div", {
                        className:
                          "flex flex-col overflow-hidden cursor-pointer hover:text-cyan-200",
                        onClick: () => {
                          (ce("setClipboard", qt),
                            Nn(
                              "tr" === t
                                ? "\u015eifre kopyaland\u0131"
                                : "Password copied",
                              "success",
                            ));
                        },
                        children: [
                          (0, $.jsx)("span", {
                            className:
                              "text-[7.5px] text-cyan-300/60 font-sans font-bold",
                            children: l(a.hotspotPass),
                          }),
                          (0, $.jsx)("span", {
                            className: "truncate font-bold tracking-wide",
                            children: qt,
                          }),
                        ],
                      }),
                      (0, $.jsxs)("div", {
                        className:
                          "flex flex-col overflow-hidden cursor-pointer hover:text-cyan-200",
                        onClick: () => {
                          (ce("setClipboard", "".concat(Zt, ":10808")),
                            Nn(
                              "tr" === t
                                ? "Proxy kopyaland\u0131"
                                : "Proxy copied",
                              "success",
                            ));
                        },
                        children: [
                          (0, $.jsx)("span", {
                            className:
                              "text-[7.5px] text-cyan-300/60 font-sans font-bold",
                            children: "PROXY IP:PORT",
                          }),
                          (0, $.jsxs)("span", {
                            className: "truncate font-bold tracking-wide",
                            children: [Zt, ":10808"],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            pe &&
              (0, $.jsxs)("div", {
                className:
                  "w-full max-w-xs glass-panel rounded-xl p-2 flex flex-col gap-1 flex-shrink-0",
                children: [
                  (0, $.jsxs)("div", {
                    className:
                      "flex justify-between items-center text-[9px] text-white/70 font-bold tracking-wider drop-shadow-md",
                    children: [
                      (0, $.jsx)("span", {
                        children:
                          "tr" === t ? "CANLI TRAF\u0130K" : "LIVE TRAFFIC",
                      }),
                      (0, $.jsxs)("span", {
                        style: {
                          color:
                            (null === m || void 0 === m ? void 0 : m.color) ||
                            "#06b6d4",
                        },
                        children: [Ye, " KB/s"],
                      }),
                    ],
                  }),
                  (0, $.jsx)("div", {
                    className: "h-6 flex items-end gap-1 px-1",
                    children: qe.map((e, t) =>
                      (0, $.jsx)(
                        "div",
                        {
                          className:
                            "flex-1 rounded-t transition-all duration-500",
                          style: {
                            height: "".concat(Math.max(15, e), "%"),
                            background: "linear-gradient(to top, "
                              .concat(
                                (null === m || void 0 === m
                                  ? void 0
                                  : m.color) || "#06b6d4",
                                "30, ",
                              )
                              .concat(
                                (null === m || void 0 === m
                                  ? void 0
                                  : m.color) || "#06b6d4",
                                ")",
                              ),
                            opacity: 0.4 + (t / 10) * 0.6,
                          },
                        },
                        t,
                      ),
                    ),
                  }),
                ],
              }),
            (0, $.jsxs)("button", {
              onClick: Tn,
              disabled: Ue,
              className:
                "w-full max-w-xs py-2.5 rounded-xl font-black text-xs tracking-wider transition-all duration-500 active:scale-[0.97] disabled:opacity-60 relative overflow-hidden glass-panel group flex-shrink-0",
              style: pe
                ? {
                    background: "linear-gradient(135deg, "
                      .concat(
                        (null === m || void 0 === m ? void 0 : m.color) ||
                          "#ef4444",
                        "40, ",
                      )
                      .concat(
                        (null === m || void 0 === m ? void 0 : m.color) ||
                          "#ef4444",
                        "80)",
                      ),
                    boxShadow: "0 8px 32px ".concat(
                      (null === m || void 0 === m ? void 0 : m.color) ||
                        "#ef4444",
                      "50",
                    ),
                  }
                : {
                    background:
                      "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.4))",
                    boxShadow: "0 8px 32px rgba(99,102,241,0.3)",
                  },
              children: [
                (0, $.jsx)("div", {
                  className:
                    "absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50",
                }),
                !pe &&
                  !Ue &&
                  (0, $.jsx)("div", {
                    className:
                      "absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer pointer-events-none",
                  }),
                (0, $.jsx)("span", {
                  className:
                    "relative z-10 flex items-center justify-center gap-2 text-white font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]",
                  children: Ue
                    ? (0, $.jsxs)($.Fragment, {
                        children: [
                          (0, $.jsx)(se, {}),
                          l(pe ? a.disconnecting : a.connecting),
                        ],
                      })
                    : l(pe ? a.tunnelStop : a.tunnelStart),
                }),
              ],
            }),
            !b &&
              (0, $.jsxs)("button", {
                onClick: () => Ce(!0),
                className:
                  "text-[10px] text-amber-300 font-extrabold tracking-wider hover:underline flex items-center gap-1 animate-pulse drop-shadow-[0_0_5px_rgba(251,191,36,0.5)] flex-shrink-0",
                children: [
                  (0, $.jsx)(S, { size: 12 }),
                  " ",
                  l(a.enterUuidWarning),
                ],
              }),
            (0, $.jsxs)("div", {
              className:
                "grid grid-cols-2 gap-2 w-full max-w-xs mt-0.5 flex-shrink-0",
              children: [
                (0, $.jsx)(ie, {
                  icon: k,
                  label: l(a.statIp),
                  value: at,
                  accent: "text-cyan-300",
                }),
                (0, $.jsx)(ie, {
                  icon: L,
                  label: l(a.statNetwork),
                  value:
                    "WIFI" === it
                      ? "KABLOSUZ (WI-FI)"
                      : "CELLULAR_5G" === it
                        ? "H\xdcCRESEL (5G)"
                        : "CELLULAR_LTE" === it
                          ? "H\xdcCRESEL (LTE)"
                          : "CELLULAR_3G" === it
                            ? "H\xdcCRESEL (3G)"
                            : "CELLULAR_2G" === it
                              ? "H\xdcCRESEL (2G)"
                              : "CELLULAR" === it
                                ? "H\xdcCRESEL"
                                : it || "---",
                  accent: "text-purple-300",
                }),
                (0, $.jsx)(ie, {
                  icon: A,
                  label: l(a.statTraffic),
                  value: Ze.usedFormatted,
                  accent: "text-emerald-300",
                }),
                (0, $.jsx)(ie, {
                  icon: I,
                  label: l(a.statUser),
                  value: tt && "---" !== tt ? tt : Ze.remark || "---",
                  accent: "text-purple-300",
                }),
                (0, $.jsx)(ie, {
                  icon: z,
                  label: l(a.statRemaining),
                  value: Pn,
                  accent:
                    "active" === Ze.expiryStatus
                      ? "text-cyan-300"
                      : "expired" === Ze.expiryStatus
                        ? "text-red-300"
                        : "text-amber-300",
                }),
                (0, $.jsx)(ie, {
                  icon: G,
                  label: l(a.statVersion),
                  value: "v1.1.4",
                  accent: "text-cyan-300",
                }),
              ],
            }),
            !gt &&
              pe &&
              (0, $.jsxs)("button", {
                onClick: () => {
                  (ce("openBatteryOptimization"), yt(!0));
                },
                className:
                  "w-full max-w-xs glass-panel rounded-xl p-2 flex items-center gap-2 border-amber-500/30 bg-amber-500/10 flex-shrink-0 active:scale-[0.98]",
                children: [
                  (0, $.jsx)(O, { size: 14, className: "text-amber-300" }),
                  (0, $.jsx)("span", {
                    className: "text-[10px] text-amber-200 font-bold",
                    children: a.extrasBatteryDesc,
                  }),
                ],
              }),
          ],
        }),
      An = () => {
        const TICK_VALUES = [0, 1, 2, 5, 10, 25, 50, 75, 100];
        const speedToPercent = (speed) => {
          if (speed <= 0) return 0;
          if (speed >= 100) return 1;
          let idx = 0;
          for (let i = 0; i < TICK_VALUES.length - 1; i++) {
            if (speed >= TICK_VALUES[i] && speed <= TICK_VALUES[i+1]) {
              idx = i;
              break;
            }
          }
          const baseP = idx / 8;
          const nextP = (idx + 1) / 8;
          const speedRange = TICK_VALUES[idx+1] - TICK_VALUES[idx];
          const speedPct = (speed - TICK_VALUES[idx]) / speedRange;
          return baseP + speedPct * (nextP - baseP);
        };
        const getCoordinate = (cx, cy, r, angleInDegrees) => {
          const angleInRadians = (angleInDegrees * Math.PI) / 180;
          return {
            x: cx + r * Math.cos(angleInRadians),
            y: cy + r * Math.sin(angleInRadians)
          };
        };
        const solveArcPath = (cx, cy, r, startAngle, endAngle) => {
          const start = getCoordinate(cx, cy, r, startAngle);
          const end = getCoordinate(cx, cy, r, endAngle);
          const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
          return "M ".concat(start.x, " ").concat(start.y, " A ").concat(r, " ").concat(r, " 0 ").concat(largeArcFlag, " 1 ").concat(end.x, " ").concat(end.y);
        };

        const isUpload = window.speedTestPhase === "upload" || (vt && zt > 0);
        const currentSpeed = vt ? It : (isUpload ? zt : Et);
        const percent = speedToPercent(currentSpeed);
        const startAngle = 135;
        const sweepAngle = 270;
        const currentAngle = startAngle + percent * sweepAngle;
        const speedDisplayVal = currentSpeed.toFixed(1);

        const startSpeedTest = async () => {
          if (vt) return;
          (xt(!0), St(!1), Lt(0), Ct(0), Pt(0), Ot(0));
          window.speedTestPhase = "ping";
          try {
            // Warm-up request to resolve DNS and establish TLS handshake in the background
            await fetch("https://speed.cloudflare.com/cdn-cgi/trace", { cache: "no-store" }).catch(() => {});
            
            // Actual latency measurement using already-warmed connection
            const e = Date.now();
            await fetch("https://speed.cloudflare.com/cdn-cgi/trace", { cache: "no-store" });
            const t = Date.now() - e;
            Lt(t);
          } catch (r) {
            Lt(999);
          }

          window.speedTestPhase = "download";
          const t = new Promise((e) => {
            const t = "onSpeedDown",
              n = window;
            ((n[t] = (r, a) => {
              const l = +r.toFixed(1);
              (Ct(l),
                Ot(r),
                (a <= 0 || r < 0) && (Ot(0), delete n[t], e(l)));
            }),
              ce(
                "downloadSpeedTest",
                "".concat(J, "/speedtest?size=104857600"),
                t
              ),
              setTimeout(() => {
                n[t] && (delete n[t], Ot(0), e(0));
              }, 2e4));
          });
          await t;
          window.speedTestPhase = "upload";
          const n = new Promise((e) => {
            const t = "onSpeedUp",
              n = window;
            ((n[t] = (r, a) => {
              const l = +r.toFixed(1);
              (Pt(l),
                Ot(r),
                (a <= 0 || r < 0) && (Ot(0), delete n[t], e(l)));
            }),
              ce("uploadSpeedTest", "".concat(J, "/upload"), t),
              setTimeout(() => {
                n[t] && (delete n[t], Ot(0), e(0));
              }, 2e4));
          });
          (await n, window.speedTestPhase = "done", xt(!1), St(!0));
        };

        const idleStartText = "tr" === t ? "BAŞLAT" : "START";
        const idleStartSub = "tr" === t ? "Testi başlatmak için dokunun" : "Tap to start speed test";

        return (0, $.jsxs)("div", {
          className: "px-4 pb-4 h-full flex flex-col items-center justify-center gap-6 animate-fade-in relative z-10",
          children: [
            (0, $.jsx)("div", {
              className: "flex flex-col items-center justify-center mb-1 flex-shrink-0 w-full min-h-[50px]"
            }),
            (0, $.jsxs)("div", {
              onClick: !vt ? startSpeedTest : null,
              style: { outline: "none", WebkitTapHighlightColor: "transparent" },
              className: "relative w-64 h-64 flex flex-col items-center justify-center mb-2 mt-1 flex-shrink-0 " + (!vt ? "cursor-pointer active:scale-[0.97] transition-all duration-300" : ""),
              children: [
                (0, $.jsxs)("svg", {
                  width: "256",
                  height: "256",
                  viewBox: "0 0 200 200",
                  className: "drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]",
                  children: [
                    (0, $.jsxs)("defs", {
                      children: [
                        (0, $.jsxs)("linearGradient", {
                          id: "downloadGrad",
                          x1: "0%",
                          y1: "100%",
                          x2: "100%",
                          y2: "0%",
                          children: [
                            (0, $.jsx)("stop", { offset: "0%", stopColor: "#06b6d4" }),
                            (0, $.jsx)("stop", { offset: "50%", stopColor: "#10b981" }),
                            (0, $.jsx)("stop", { offset: "100%", stopColor: "#34d399" })
                          ]
                        }),
                        (0, $.jsxs)("linearGradient", {
                          id: "uploadGrad",
                          x1: "0%",
                          y1: "100%",
                          x2: "100%",
                          y2: "0%",
                          children: [
                            (0, $.jsx)("stop", { offset: "0%", stopColor: "#3b82f6" }),
                            (0, $.jsx)("stop", { offset: "50%", stopColor: "#8b5cf6" }),
                            (0, $.jsx)("stop", { offset: "100%", stopColor: "#ec4899" })
                          ]
                        }),
                        (0, $.jsxs)("linearGradient", {
                          id: "needleGrad",
                          x1: "0%",
                          y1: "100%",
                          x2: "0%",
                          y2: "0%",
                          children: [
                            (0, $.jsx)("stop", { offset: "0%", stopColor: "rgba(255,255,255,0.05)" }),
                            (0, $.jsx)("stop", { offset: "100%", stopColor: "rgba(255,255,255,0.9)" })
                          ]
                        })
                      ]
                    }),
                    vt
                      ? (0, $.jsxs)($.Fragment, {
                          children: [
                            (0, $.jsx)("path", {
                              d: solveArcPath(100, 100, 75, 135, 405),
                              fill: "none",
                              stroke: "rgba(255, 255, 255, 0.08)",
                              strokeWidth: "8",
                              strokeLinecap: "round"
                            }),
                            percent > 0 && (0, $.jsx)("path", {
                              d: solveArcPath(100, 100, 75, 135, currentAngle),
                              fill: "none",
                              stroke: isUpload ? "url(#uploadGrad)" : "url(#downloadGrad)",
                              strokeWidth: "8",
                              strokeLinecap: "round"
                            }),
                            TICK_VALUES.map((val, idx) => {
                              const angle = startAngle + (idx / 8) * sweepAngle;
                              const dotCoord = getCoordinate(100, 100, 64, angle);
                              const textCoord = getCoordinate(100, 100, 48, angle);
                              return (0, $.jsxs)("g", {
                                children: [
                                  (0, $.jsx)("circle", {
                                    cx: dotCoord.x,
                                    cy: dotCoord.y,
                                    r: "1.5",
                                    fill: "rgba(255, 255, 255, 0.4)"
                                  }),
                                  (0, $.jsx)("text", {
                                    x: textCoord.x,
                                    y: textCoord.y,
                                    fill: "rgba(255, 255, 255, 0.6)",
                                    fontSize: "7.5",
                                    fontWeight: "800",
                                    textAnchor: "middle",
                                    dominantBaseline: "central",
                                    children: val
                                  })
                                ]
                              }, idx);
                            }),
                            (0, $.jsx)("g", {
                              transform: "rotate(".concat(currentAngle - 270, ", 100, 100)"),
                              children: (0, $.jsx)("polygon", {
                                points: "100,28 102.5,76 97.5,76",
                                fill: "url(#needleGrad)"
                              })
                            }),
                            (0, $.jsx)("circle", {
                              cx: "100",
                              cy: "100",
                              r: "17",
                              fill: "white",
                              stroke: isUpload ? "#8b5cf6" : "#10b981",
                              strokeWidth: "2.5",
                              className: "shadow-md"
                            }),
                            isUpload
                              ? (0, $.jsx)("path", {
                                  d: "M 100,109 L 100,91 M 94.5,97 L 100,91 L 105.5,97",
                                  stroke: "#8b5cf6",
                                  strokeWidth: "2.5",
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  fill: "none"
                                })
                              : (0, $.jsx)("path", {
                                  d: "M 100,91 L 100,109 M 105.5,103 L 100,109 L 94.5,103",
                                  stroke: "#10b981",
                                  strokeWidth: "2.5",
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  fill: "none"
                                }),
                            (0, $.jsx)("text", {
                              x: "100",
                              y: "148",
                              fill: "white",
                              fontSize: "20",
                              fontWeight: "900",
                              textAnchor: "middle",
                              dominantBaseline: "central",
                              children: speedDisplayVal
                            }),
                            (0, $.jsx)("text", {
                              x: "100",
                              y: "163",
                              fill: "rgba(255, 255, 255, 0.5)",
                              fontSize: "8",
                              fontWeight: "800",
                              textAnchor: "middle",
                              dominantBaseline: "central",
                              children: "Mbps"
                            })
                          ]
                        })
                      : (0, $.jsxs)($.Fragment, {
                          children: [
                            (0, $.jsx)("circle", {
                              cx: "100",
                              cy: "100",
                              r: "75",
                              fill: "none",
                              stroke: "rgba(6, 182, 212, 0.05)",
                              strokeWidth: "1"
                            }),
                            (0, $.jsx)("circle", {
                              cx: "100",
                              cy: "100",
                              r: "65",
                              fill: "none",
                              stroke: "rgba(6, 182, 212, 0.1)",
                              strokeWidth: "1",
                              strokeDasharray: "4 4"
                            }),
                            (0, $.jsx)("circle", {
                              cx: "100",
                              cy: "100",
                              r: "54",
                              fill: "rgba(255, 255, 255, 0.02)",
                              stroke: "url(#downloadGrad)",
                              strokeWidth: "3.5",
                              className: "animate-pulse"
                            }),
                            (0, $.jsx)("text", {
                              x: "100",
                              y: "100",
                              fill: "white",
                              fontSize: "18",
                              fontWeight: "900",
                              textAnchor: "middle",
                              dominantBaseline: "central",
                              letterSpacing: "2",
                              children: idleStartText
                            })
                          ]
                        })
                  ]
                }),
                !vt && (0, $.jsx)("span", {
                  className: "text-[10px] text-white/40 font-bold block mt-3 text-center tracking-wide animate-pulse",
                  children: idleStartSub
                })
              ]
            }),
            (0, $.jsx)("div", {
              className: "w-full grid grid-cols-3 gap-3 flex-shrink-0",
              children: [
                {
                  label: a.speedDownload,
                  val: Et > 0 ? "".concat(Et) : "\u2014",
                  unit: "Mbps",
                  color: "text-emerald-300"
                },
                {
                  label: a.speedPing,
                  val: _t > 0 ? "".concat(_t) : "\u2014",
                  unit: "ms",
                  color: "text-amber-300"
                },
                {
                  label: a.speedUpload,
                  val: zt > 0 ? "".concat(zt) : "\u2014",
                  unit: "Mbps",
                  color: "text-cyan-300"
                }
              ].map((e) =>
                (0, $.jsxs)("div", {
                  className: "glass-panel rounded-2xl p-3 flex flex-col items-center gap-0.5",
                  children: [
                    (0, $.jsx)("span", {
                      className: "text-[9px] text-white/60 font-black tracking-wider drop-shadow-md",
                      children: l(e.label)
                    }),
                    (0, $.jsx)("span", {
                      className: "text-lg font-extrabold font-mono drop-shadow-md ".concat(e.color),
                      children: e.val
                    }),
                    (0, $.jsx)("span", {
                      className: "text-[9px] text-white/40",
                      children: e.unit
                    })
                  ]
                }, e.label)
              )
            })
          ]
        });
      };;
    return (0, $.jsxs)($.Fragment, {
      children: [
        (0, $.jsx)("style", {
          children:
            "\n        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');\n        * { font-family: 'Outfit', sans-serif; box-sizing: border-box; user-select: none; -webkit-user-select: none; }\n        input, textarea { user-select: text; -webkit-user-select: text; }\n        body { background: #000; margin: 0; padding: 0; }\n        button { background: transparent; border: none; outline: none; padding: 0; margin: 0; cursor: pointer; }\n        .glass-panel {\n          background: rgba(255,255,255,0.03);\n          backdrop-filter: blur(16px);\n          -webkit-backdrop-filter: blur(16px);\n          border: 1px solid rgba(255,255,255,0.1);\n          border-top: 1px solid rgba(255,255,255,0.25);\n          border-left: 1px solid rgba(255,255,255,0.15);\n          box-shadow: 0 8px 32px 0 rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.15);\n        }\n        .liquid-blob-1 { animation: float-blob 18s ease-in-out infinite alternate; }\n        .liquid-blob-2 { animation: float-blob-reverse 22s ease-in-out infinite alternate; }\n        .liquid-blob-3 { animation: float-blob 15s ease-in-out infinite alternate-reverse; }\n        @keyframes float-blob {\n          0% { transform: translate3d(0,0,0) scale(1) rotate(0deg); border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }\n          33% { transform: translate3d(30px,-50px,0) scale(1.1) rotate(15deg); border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }\n          66% { transform: translate3d(-20px,20px,0) scale(0.9) rotate(-10deg); border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }\n          100% { transform: translate3d(0,0,0) scale(1) rotate(0deg); border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }\n        }\n        @keyframes float-blob-reverse {\n          0% { transform: translate3d(0,0,0) scale(1) rotate(0deg); border-radius: 50% 50% 50% 70% / 50% 50% 70% 50%; }\n          50% { transform: translate3d(-40px,40px,0) scale(1.2) rotate(-20deg); border-radius: 80% 30% 50% 50% / 50% 50% 30% 80%; }\n          100% { transform: translate3d(20px,-20px,0) scale(0.8) rotate(10deg); border-radius: 50% 50% 50% 70% / 50% 50% 70% 50%; }\n        }\n        @keyframes ping-slow { 0%,100% { transform: scale(1); opacity: .4; } 50% { transform: scale(1.1); opacity: .1; } }\n        @keyframes ping-slower { 0%,100% { transform: scale(1); opacity: .3; } 50% { transform: scale(1.15); opacity: .03; } }\n        @keyframes slide-down { from { opacity: 0; transform: translate3d(-50%,-20px,0); } to { opacity: 1; transform: translate3d(-50%,0,0); } }\n        @keyframes slide-up { from { opacity: 0; transform: translate3d(0,100%,0); } to { opacity: 1; transform: translate3d(0,0,0); } }\n        @keyframes fade-in { from { opacity: 0; transform: translate3d(0,8px,0); } to { opacity: 1; transform: translate3d(0,0,0); } }\n        @keyframes shimmer { 0% { transform: translate3d(-100%,0,0); } 100% { transform: translate3d(200%,0,0); } }\n        @keyframes modal-in { from { opacity: 0; transform: translate3d(0,-20px,0) scale(0.95); } to { opacity: 1; transform: translate3d(0,0,0) scale(1); } }\n        ::-webkit-scrollbar { width: 0; }\n      ",
        }),
        (0, $.jsx)("div", {
          className:
            "min-h-screen w-full flex items-center justify-center p-0 md:p-4 bg-zinc-950",
          children: (0, $.jsxs)("div", {
            className:
              "relative w-full max-w-[390px] min-h-screen md:min-h-[812px] md:rounded-[40px] md:border-[10px] md:border-zinc-900 md:shadow-[0_30px_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden bg-black",
            children: [
              (0, $.jsxs)("div", {
                className:
                  "absolute inset-0 z-0 overflow-hidden pointer-events-none",
                children: [
                  (0, $.jsx)("div", {
                    className:
                      "absolute inset-0 bg-gradient-to-br from-[#0c0d14] via-[#11131a] to-black",
                  }),
                  (0, $.jsx)("div", {
                    className:
                      "absolute -top-32 -left-20 w-96 h-96 blur-3xl rounded-full liquid-blob-1 transition-colors duration-1000 ".concat(
                        pe ? "opacity-30" : "opacity-10",
                      ),
                    style: {
                      backgroundColor: pe
                        ? (null === m || void 0 === m ? void 0 : m.color) ||
                          "#06b6d4"
                        : "#818cf8",
                      willChange: "transform",
                      transform: "translateZ(0)",
                    },
                  }),
                  (0, $.jsx)("div", {
                    className:
                      "absolute top-1/3 -right-32 w-80 h-80 blur-3xl rounded-full bg-cyan-600/15 liquid-blob-2",
                    style: {
                      willChange: "transform",
                      transform: "translateZ(0)",
                    },
                  }),
                  (0, $.jsx)("div", {
                    className:
                      "absolute -bottom-40 left-10 w-[28rem] h-[28rem] blur-3xl rounded-full bg-purple-800/20 liquid-blob-3",
                    style: {
                      willChange: "transform",
                      transform: "translateZ(0)",
                    },
                  }),
                ],
              }),
              (0, $.jsxs)("div", {
                className:
                  "relative z-20 flex items-center justify-between px-6 pb-5",
                style: {
                  paddingTop:
                    i > 0
                      ? "".concat(i + 12, "px")
                      : "calc(env(safe-area-inset-top) + 12px)",
                },
                children: [
                  (0, $.jsx)("button", {
                    onClick: () => Pe(!0),
                    className:
                      "w-10 h-10 rounded-full overflow-hidden glass-panel flex-shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_15px_rgba(0,0,0,0.3)]",
                    children:
                      "tr" === t ? (0, $.jsx)(re, {}) : (0, $.jsx)(ae, {}),
                  }),
                  (0, $.jsx)(X, {}),
                  (0, $.jsx)("button", {
                    onClick: () => {
                      pe || Ce(!0);
                    },
                    className:
                      "w-10 h-10 rounded-full glass-panel flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.3)]",
                    style: {
                      borderColor: b ? "rgba(52,211,153,0.5)" : "",
                      cursor: pe ? "default" : "pointer",
                    },
                    children: b
                      ? (0, $.jsx)(U, {
                          size: 16,
                          className: "text-emerald-300",
                        })
                      : (0, $.jsx)(I, { size: 16, className: "text-white/70" }),
                  }),
                ],
              }),
              (0, $.jsx)("div", {
                className:
                  "relative z-10 flex-1 overflow-hidden pt-1 pb-1 flex flex-col",
                children: (() => {
                  switch (ge) {
                    case "home":
                    default:
                      return Ln();
                    case "logs":
                      return (0, $.jsxs)("div", {
                        className:
                          "px-4 pb-4 h-full flex flex-col relative z-10",
                        children: [
                          (0, $.jsx)("h2", {
                            className:
                              "text-white/70 text-[10px] font-black mb-2 tracking-widest drop-shadow-md flex-shrink-0",
                            children: l(a.systemLogsTitle),
                          }),
                          (0, $.jsxs)("div", {
                            className:
                              "glass-panel rounded-2xl p-3 flex-1 overflow-y-auto space-y-2 font-mono text-[10px]",
                            children: [
                              Ve.length > 0
                                ? Ve.map((e, t) => {
                                    let n = "text-cyan-200";
                                    return (
                                      "success" === e.type &&
                                        (n = "text-emerald-300"),
                                      "sys" === e.type &&
                                        (n = "text-purple-300"),
                                      "warn" === e.type &&
                                        (n = "text-amber-300"),
                                      (0, $.jsxs)(
                                        "div",
                                        {
                                          className:
                                            "leading-relaxed border-b border-white/[0.05] pb-1.5 drop-shadow-sm",
                                          children: [
                                            (0, $.jsxs)("span", {
                                              className: "text-white/50",
                                              children: ["[", e.time, "]"],
                                            }),
                                            " ",
                                            (0, $.jsx)("span", {
                                              className: n,
                                              children: e.text,
                                            }),
                                          ],
                                        },
                                        t,
                                      )
                                    );
                                  })
                                : (0, $.jsx)("p", {
                                    className:
                                      "text-white/50 text-center py-10 font-sans",
                                    children: a.logsWaiting,
                                  }),
                              (0, $.jsx)("div", { ref: xn }),
                            ],
                          }),
                        ],
                      });
                    case "speed":
                      return An();
                    case "extras":
                      return (() => {
                        const e = [
                          {
                            icon: _,
                            label: a.extrasHotspot,
                            desc: a.extrasHotspotDesc,
                          },
                          {
                            icon: R,
                            label: a.extrasSupport,
                            desc: a.extrasSupportDesc,
                          },
                          {
                            icon: D,
                            label: a.extrasReset,
                            desc: a.extrasResetDesc,
                            danger: !0,
                          },
                          {
                            icon: O,
                            label: a.extrasBattery,
                            desc: a.extrasBatteryDesc,
                          },
                        ];
                        return (0, $.jsxs)("div", {
                          className:
                            "px-4 pb-4 h-full flex flex-col animate-fade-in relative z-10 overflow-y-auto",
                          children: [
                            (0, $.jsx)("h2", {
                              className:
                                "text-white/70 text-[10px] font-black mb-3 tracking-widest drop-shadow-md flex-shrink-0",
                              children: l(a.extrasTitle),
                            }),
                            (0, $.jsx)("div", {
                              className: "space-y-3 flex-shrink-0",
                              children: e.map((e) => {
                                let t = e.icon,
                                  n = e.label,
                                  r = e.desc,
                                  o = e.danger;
                                return (0, $.jsxs)(
                                  "button",
                                  {
                                    onClick: () => {
                                      if (n === a.extrasReset) {
                                        if (pe)
                                          return void Nn(
                                            "tr" === t
                                              ? "VPN aktifken kod sıfırlanamaz!"
                                              : "Cannot reset code while VPN is active!",
                                            "error",
                                          );
                                        (v(""), Me(""));
                                        try {
                                          (localStorage.removeItem(
                                            "mproxy_uuid",
                                          ),
                                            localStorage.removeItem(
                                              "mproxy_ports",
                                            ));
                                        } catch (e) {}
                                        (pe && (he(!1), xe(0)),
                                          de([]),
                                          dt([]),
                                          g(null),
                                          Je({
                                            remark: "---",
                                            expiryStatus: "unlimited",
                                            remainingDays: 0,
                                            usedFormatted: "0 B",
                                          }),
                                          nt("---"),
                                          Nn(a.toastResetSuccess, "info"));
                                      } else
                                        n === a.extrasHotspot
                                          ? Le(!0)
                                          : n === a.extrasBattery
                                            ? (ce("openBatteryOptimization"),
                                              Nn(
                                                a.toastBatterySuccess,
                                                "success",
                                              ))
                                            : Nn(
                                                '"'
                                                  .concat(n, '" ')
                                                  .concat(a.toastSoon),
                                                "info",
                                              );
                                    },
                                    className:
                                      "w-full flex items-center gap-4 glass-panel rounded-2xl px-4 py-3.5 hover:bg-white/10 active:scale-[0.98] transition-all duration-200 group",
                                    children: [
                                      (0, $.jsx)("div", {
                                        className:
                                          "w-10 h-10 rounded-xl flex items-center justify-center glass-panel ".concat(
                                            o
                                              ? "border-red-500/30"
                                              : "border-white/20",
                                          ),
                                        children: (0, $.jsx)(t, {
                                          size: 18,
                                          className: "".concat(
                                            o
                                              ? "text-red-300"
                                              : "text-cyan-300 group-hover:scale-110 transition-transform",
                                          ),
                                        }),
                                      }),
                                      (0, $.jsxs)("div", {
                                        className: "flex-1 text-left",
                                        children: [
                                          (0, $.jsx)("div", {
                                            className:
                                              "text-xs font-black tracking-wide drop-shadow-md ".concat(
                                                o
                                                  ? "text-red-300"
                                                  : "text-white",
                                              ),
                                            children: l(n),
                                          }),
                                          (0, $.jsx)("div", {
                                            className:
                                              "text-[10px] text-white/50 font-semibold",
                                            children: r,
                                          }),
                                        ],
                                      }),
                                      (0, $.jsx)(M, {
                                        size: 16,
                                        className:
                                          "text-white/40 group-hover:text-white/80 transition-colors",
                                      }),
                                    ],
                                  },
                                  n,
                                );
                              }),
                            }),
                            (0, $.jsxs)("div", {
                              className:
                                "mt-5 glass-panel rounded-2xl p-4 flex items-center gap-3 flex-shrink-0",
                              children: [
                                (0, $.jsx)(F, {
                                  size: 20,
                                  className:
                                    "text-cyan-300 flex-shrink-0 drop-shadow-md",
                                }),
                                (0, $.jsxs)("div", {
                                  children: [
                                    (0, $.jsx)("p", {
                                      className:
                                        "text-[10px] text-white/80 font-bold tracking-wider drop-shadow-md",
                                      children: l("M-Proxy Client v1.1.4"),
                                    }),
                                    (0, $.jsx)("p", {
                                      className:
                                        "text-[9px] text-white/50 font-semibold",
                                      children: a.extrasVersionInfo,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        });
                      })();
                  }
                })(),
              }),
              (0, $.jsx)("div", {
                className: "relative z-30 pt-2 flex-shrink-0",
                style: {
                  paddingBottom:
                    f > 0
                      ? "".concat(f + 10, "px")
                      : "calc(env(safe-area-inset-bottom) + 12px)",
                },
                children: (0, $.jsxs)("div", {
                  className:
                    "mx-4 glass-panel rounded-[28px] px-2 py-2 shadow-[0_15px_40px_rgba(0,0,0,0.6)] border-b-0 border-white/30 relative overflow-hidden",
                  children: [
                    (0, $.jsx)("div", {
                      className:
                        "absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none",
                    }),
                    (0, $.jsx)("div", {
                      className:
                        "relative flex items-center justify-around z-10",
                      children: _n.map((e) => {
                        let n = e.id,
                          r = e.icon,
                          o = e.label;
                        const i = ge === n;
                        return (0, $.jsxs)(
                          "button",
                          {
                            onClick: () => {
                              "refresh" === n
                                ? (async () => {
                                    if (!b.trim())
                                      return (Nn(a.toastNoUuid), void Ce(!0));
                                    if ("expired" === Ze.expiryStatus)
                                      return void Nn(
                                        "tr" === t
                                          ? "S\xfcresi dolmu\u015f kullan\u0131c\u0131lar ba\u011flant\u0131y\u0131 yenileyemez!"
                                          : "Expired accounts cannot refresh connection!",
                                        "error",
                                      );
                                    if (
                                      Z.length > 0 &&
                                      m &&
                                      !Z.includes(m.port)
                                    )
                                      return void Nn(a.toastNoAccess, "error");
                                    (Nn(a.toastRefreshing, "info"),
                                      He(!0),
                                      We([]),
                                      (kn.current = !0),
                                      pe &&
                                        (ce("stopVpn"),
                                        await new Promise((e) =>
                                          setTimeout(e, 1e3),
                                        )));
                                    let e = !1;
                                    try {
                                      const n = await fetch(
                                        ""
                                          .concat(J, "/api?uuid=")
                                          .concat(b.trim()),
                                      );
                                      if (!n.ok)
                                        throw new Error("HTTP " + n.status);
                                      const r = await n.json();
                                      if (r.success) {
                                        if (
                                          r.profile &&
                                          (Je(r.profile),
                                          "expired" === r.profile.expiryStatus)
                                        )
                                          return (
                                            Nn(
                                              "tr" === t
                                                ? "Hesab\u0131n\u0131z\u0131n s\xfcresi dolmu\u015f!"
                                                : "Your account has expired!",
                                              "error",
                                            ),
                                            He(!1),
                                            void (kn.current = !1)
                                          );
                                        nt(r.comment || r.email || "---");
                                        const n = (r.links || []).find(
                                            (e) =>
                                              e.port ===
                                              ((null === m || void 0 === m
                                                ? void 0
                                                : m.port) || 443),
                                          ),
                                          a = n ? n.link : r.link;
                                        a
                                          ? (ce("requestVpnPermission", a),
                                            (e = !0))
                                          : Nn(
                                              "tr" === t
                                                ? "Ba\u011flant\u0131 linki bulunamad\u0131!"
                                                : "Connection link not found!",
                                              "error",
                                            );
                                      } else Nn(r.message, "error");
                                    } catch (n) {
                                      Nn(
                                        "tr" === t
                                          ? "Sunucuya ba\u011flan\u0131lamad\u0131!"
                                          : "Could not reach server!",
                                        "error",
                                      );
                                    } finally {
                                      e || (He(!1), (kn.current = !1));
                                    }
                                  })()
                                : ye(n);
                            },
                            className:
                              "flex flex-col items-center gap-1 px-2 py-2 rounded-[20px] transition-all duration-300 relative group",
                            style: i
                              ? {
                                  background: "rgba(255,255,255,0.1)",
                                  boxShadow:
                                    "inset 0 1px 1px rgba(255,255,255,0.2)",
                                  border: "none",
                                  outline: "none",
                                }
                              : {
                                  background: "transparent",
                                  border: "none",
                                  outline: "none",
                                  boxShadow: "none",
                                },
                            children: [
                              (0, $.jsx)("div", {
                                className:
                                  "relative transition-transform duration-300 ".concat(
                                    i ? "scale-110" : "group-hover:scale-105",
                                  ),
                                children: (0, $.jsx)(r, {
                                  size: 20,
                                  className: "drop-shadow-md transition-colors",
                                  style: {
                                    color: i
                                      ? "#67e8f9"
                                      : "rgba(255,255,255,0.7)",
                                  },
                                }),
                              }),
                              (0, $.jsx)("span", {
                                className:
                                  "text-[9px] font-black tracking-widest transition-colors duration-300 drop-shadow-md",
                                style: {
                                  color: i
                                    ? "#67e8f9"
                                    : "rgba(255,255,255,0.55)",
                                },
                                children: l(o),
                              }),
                            ],
                          },
                          n,
                        );
                      }),
                    }),
                  ],
                }),
              }),
              we &&
                (0, $.jsxs)("div", {
                  className:
                    "absolute inset-0 z-50 flex items-end justify-center",
                  onClick: () => Se(!1),
                  children: [
                    (0, $.jsx)("div", {
                      className:
                        "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity",
                    }),
                    (0, $.jsx)("div", {
                      className:
                        "absolute bottom-0 left-0 right-0 animate-slide-up z-10",
                      onClick: (e) => e.stopPropagation(),
                      children: (0, $.jsxs)("div", {
                        className:
                          "glass-panel border-b-0 rounded-t-[36px] px-5 pt-4 relative overflow-hidden bg-white/[0.02]",
                        style: {
                          paddingBottom:
                            f > 0 ? "".concat(f + 24, "px") : "40px",
                        },
                        children: [
                          (0, $.jsx)("div", {
                            className:
                              "w-14 h-1.5 glass-panel rounded-full mx-auto mb-6 shadow-inner",
                          }),
                          (0, $.jsxs)("div", {
                            className: "flex items-center justify-between mb-5",
                            children: [
                              (0, $.jsx)("h3", {
                                className:
                                  "text-white font-black text-sm tracking-widest drop-shadow-md",
                                children: l(a.serverSelectorTitle),
                              }),
                              (0, $.jsx)("button", {
                                onClick: () => Se(!1),
                                className:
                                  "w-8 h-8 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors",
                                children: (0, $.jsx)(H, {
                                  size: 16,
                                  className: "text-white/80 drop-shadow-sm",
                                }),
                              }),
                            ],
                          }),
                          (0, $.jsx)("div", {
                            className: "space-y-3",
                            children: ct.map((e) => {
                              const t =
                                  (null === m || void 0 === m
                                    ? void 0
                                    : m.id) === e.id,
                                n = pt[e.port];
                              return (0, $.jsxs)(
                                "button",
                                {
                                  onClick: () => {
                                    (g(e), Se(!1));
                                  },
                                  className:
                                    "w-full flex items-center gap-4 glass-panel rounded-2xl px-4 py-4 transition-all duration-300 hover:scale-[1.02]",
                                  style: {
                                    background: t
                                      ? "rgba(255,255,255,0.1)"
                                      : "",
                                    borderColor: t ? e.color : "",
                                  },
                                  children: [
                                    (0, $.jsx)(e.IconComponent, { size: 40 }),
                                    (0, $.jsx)("div", {
                                      className: "flex-1 text-left",
                                      children: (0, $.jsx)("p", {
                                        className:
                                          "text-sm font-black text-white tracking-wider drop-shadow-md",
                                        children: l(e.name),
                                      }),
                                    }),
                                    (0, $.jsxs)("div", {
                                      className:
                                        "flex items-center gap-1.5 glass-panel px-2 py-1 rounded-full",
                                      children: [
                                        (0, $.jsx)("div", {
                                          className: "w-2 h-2 rounded-full",
                                          style: { background: e.color },
                                        }),
                                        (0, $.jsx)("span", {
                                          className:
                                            "text-[10px] font-extrabold text-white",
                                          children:
                                            void 0 !== n
                                              ? "string" === typeof n
                                                ? n
                                                : "".concat(n, "ms")
                                              : "...",
                                        }),
                                      ],
                                    }),
                                  ],
                                },
                                e.id,
                              );
                            }),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              ze &&
                (0, $.jsxs)("div", {
                  className:
                    "absolute inset-0 z-50 flex items-end justify-center",
                  onClick: () => Pe(!1),
                  children: [
                    (0, $.jsx)("div", {
                      className:
                        "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity",
                    }),
                    (0, $.jsx)("div", {
                      className:
                        "absolute bottom-0 left-0 right-0 animate-slide-up z-10",
                      onClick: (e) => e.stopPropagation(),
                      children: (0, $.jsxs)("div", {
                        className:
                          "glass-panel border-b-0 rounded-t-[36px] px-5 pt-4 relative overflow-hidden bg-white/[0.02]",
                        style: {
                          paddingBottom:
                            f > 0 ? "".concat(f + 24, "px") : "40px",
                        },
                        children: [
                          (0, $.jsx)("div", {
                            className:
                              "w-14 h-1.5 glass-panel rounded-full mx-auto mb-6 shadow-inner",
                          }),
                          (0, $.jsxs)("div", {
                            className: "flex items-center justify-between mb-5",
                            children: [
                              (0, $.jsxs)("div", {
                                children: [
                                  (0, $.jsx)("h3", {
                                    className:
                                      "text-white font-black text-sm tracking-widest drop-shadow-md",
                                    children: l(a.langHeader),
                                  }),
                                  (0, $.jsx)("p", {
                                    className:
                                      "text-[10px] text-white/50 font-semibold",
                                    children: a.langSubHeader,
                                  }),
                                ],
                              }),
                              (0, $.jsx)("button", {
                                onClick: () => Pe(!1),
                                className:
                                  "w-8 h-8 rounded-full glass-panel flex items-center justify-center hover:bg-white/10",
                                children: (0, $.jsx)(H, {
                                  size: 16,
                                  className: "text-white/80 drop-shadow-sm",
                                }),
                              }),
                            ],
                          }),
                          (0, $.jsx)("div", {
                            className: "space-y-3",
                            children: [
                              {
                                code: "tr",
                                label: l("T\xdcRK\xc7E"),
                                sublabel:
                                  "Uygulama dilini T\xfcrk\xe7e yap\u0131n",
                                Flag: re,
                              },
                              {
                                code: "en",
                                label: l("ENGLISH"),
                                sublabel: "Change app language to English",
                                Flag: ae,
                              },
                            ].map((e) => {
                              let r = e.code,
                                a = e.label,
                                l = e.sublabel,
                                o = e.Flag;
                              return (0, $.jsxs)(
                                "button",
                                {
                                  onClick: () => {
                                    n(r);
                                    try {
                                      localStorage.setItem("mproxy_lang", r);
                                    } catch (e) {}
                                    Pe(!1);
                                  },
                                  className:
                                    "w-full flex items-center gap-4 glass-panel rounded-2xl px-4 py-4 transition-all duration-300 hover:scale-[1.02]",
                                  style: {
                                    background:
                                      t === r ? "rgba(255,255,255,0.1)" : "",
                                    borderColor:
                                      t === r ? "rgba(103,232,249,0.5)" : "",
                                  },
                                  children: [
                                    (0, $.jsx)("div", {
                                      className:
                                        "w-12 h-8 rounded-lg overflow-hidden glass-panel flex items-center justify-center shadow-md",
                                      children: (0, $.jsx)(o, {}),
                                    }),
                                    (0, $.jsxs)("div", {
                                      className: "flex-1 text-left",
                                      children: [
                                        (0, $.jsx)("p", {
                                          className:
                                            "text-sm font-black text-white tracking-wider drop-shadow-md",
                                          children: a,
                                        }),
                                        (0, $.jsx)("p", {
                                          className:
                                            "text-[10px] text-white/50 font-semibold",
                                          children: l,
                                        }),
                                      ],
                                    }),
                                    t === r &&
                                      (0, $.jsx)(w, {
                                        size: 20,
                                        className:
                                          "text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.8)]",
                                      }),
                                  ],
                                },
                                r,
                              );
                            }),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              Ee &&
                (0, $.jsxs)("div", {
                  className:
                    "absolute inset-0 z-50 flex items-center justify-center px-4",
                  onClick: () => Ce(!1),
                  children: [
                    (0, $.jsx)("div", {
                      className:
                        "absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity",
                    }),
                    (0, $.jsx)("div", {
                      className:
                        "relative w-full max-w-[320px] glass-panel bg-white/[0.05] rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-modal-in overflow-hidden",
                      onClick: (e) => e.stopPropagation(),
                      children: (0, $.jsxs)("div", {
                        className: "relative z-10",
                        children: [
                          (0, $.jsxs)("div", {
                            className: "flex items-center justify-between mb-5",
                            children: [
                              (0, $.jsxs)("div", {
                                className: "flex items-center gap-3",
                                children: [
                                  (0, $.jsx)("div", {
                                    className:
                                      "w-10 h-10 rounded-2xl glass-panel bg-white/5 flex items-center justify-center shadow-inner",
                                    children: (0, $.jsx)(U, {
                                      size: 20,
                                      className: "text-cyan-300",
                                    }),
                                  }),
                                  (0, $.jsxs)("div", {
                                    children: [
                                      (0, $.jsx)("h3", {
                                        className:
                                          "text-white font-black text-xs tracking-widest drop-shadow-md",
                                        children: l(a.credHeader),
                                      }),
                                      (0, $.jsx)("p", {
                                        className:
                                          "text-[9px] text-white/50 font-bold tracking-wider",
                                        children: l(a.credSubHeader),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, $.jsx)("button", {
                                onClick: () => Ce(!1),
                                className:
                                  "w-8 h-8 rounded-full glass-panel flex items-center justify-center hover:bg-white/10",
                                children: (0, $.jsx)(H, {
                                  size: 14,
                                  className: "text-white/80",
                                }),
                              }),
                            ],
                          }),
                          (0, $.jsx)("label", {
                            className:
                              "text-[10px] text-cyan-200/80 tracking-widest font-black block mb-2 drop-shadow-sm",
                            children: l(a.credLabel),
                          }),
                          (0, $.jsxs)("div", {
                            className: "flex gap-2 mb-4",
                            children: [
                              (0, $.jsx)("input", {
                                type: "text",
                                value: De,
                                onChange: (e) => Me(e.target.value),
                                placeholder:
                                  "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                                className:
                                  "flex-1 glass-panel bg-black/20 rounded-xl px-4 py-3 text-white text-xs font-mono placeholder-white/20 outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all shadow-inner",
                              }),
                              (0, $.jsx)("button", {
                                onClick: async () => {
                                  const e = ce("getClipboard");
                                  e && "string" === typeof e && Me(e.trim());
                                },
                                className:
                                  "glass-panel rounded-xl px-3 py-3 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all border-white/20",
                                children: (0, $.jsx)(B, {
                                  size: 16,
                                  className: "text-cyan-300",
                                }),
                              }),
                            ],
                          }),
                          b &&
                            "---" !== tt &&
                            (0, $.jsxs)("div", {
                              className:
                                "mb-4 glass-panel border-emerald-500/30 bg-emerald-500/10 rounded-xl px-3 py-2.5 flex items-center gap-2",
                              children: [
                                (0, $.jsx)(w, {
                                  size: 14,
                                  className: "text-emerald-300 flex-shrink-0",
                                }),
                                (0, $.jsxs)("span", {
                                  className:
                                    "text-[10px] text-emerald-100 font-bold tracking-wide truncate",
                                  children: [a.credActive, ": ", tt],
                                }),
                              ],
                            }),
                          (0, $.jsx)("div", {
                            className:
                              "glass-panel border-amber-500/30 bg-amber-500/10 rounded-xl px-3 py-3 mb-5",
                            children: (0, $.jsx)("p", {
                              className:
                                "text-[10px] text-amber-200/90 font-medium leading-relaxed drop-shadow-md",
                              children: a.credHelp,
                            }),
                          }),
                          (0, $.jsxs)("div", {
                            className: "flex gap-3",
                            children: [
                              (0, $.jsx)("button", {
                                onClick: () => Ce(!1),
                                className:
                                  "flex-1 py-3 rounded-xl glass-panel text-white/60 text-xs font-extrabold hover:bg-white/10 hover:text-white transition-all",
                                children: l(a.credCancelBtn),
                              }),
                              (0, $.jsx)("button", {
                                onClick: async () => {
                                  const e = De.trim();
                                  if (!e) {
                                    v("");
                                    try {
                                      localStorage.setItem("mproxy_uuid", "");
                                    } catch (t) {}
                                    Ce(!1);
                                    Nn(a.toastUuidSaved, "success");
                                    return;
                                  }
                                  if (
                                    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
                                      e,
                                    )
                                  ) {
                                    try {
                                      const n = await fetch("".concat(J, "/api?uuid=").concat(e));
                                      if (!n.ok) {
                                        Nn("Sunucu bağlantı hatası!", "error");
                                        return;
                                      }
                                      const r = await n.json();
                                      if (r.success) {
                                        v(e);
                                        try {
                                          localStorage.setItem("mproxy_uuid", e);
                                        } catch (t) {}
                                        Ce(!1);
                                        Nn(a.toastUuidSaved, "success");
                                        await jn(e);
                                      } else {
                                        Nn(
                                          "tr" === t
                                            ? "Girdiğiniz UUID sistemde kayıtlı değil!"
                                            : "The UUID you entered is not registered!",
                                          "error"
                                        );
                                      }
                                    } catch (err) {
                                      Nn("Bağlantı hatası: " + err.message, "error");
                                    }
                                  } else {
                                    Nn(a.toastInvalidUuid, "error");
                                  }
                                },
                                className:
                                  "flex-1 py-3 rounded-xl text-white text-xs font-black tracking-widest transition-all hover:brightness-110 glass-panel border-t-white/40",
                                style: {
                                  background:
                                    "linear-gradient(135deg, rgba(168,85,247,0.6), rgba(6,182,212,0.6))",
                                  boxShadow:
                                    "0 8px 20px rgba(6,182,212,0.3), inset 0 2px 5px rgba(255,255,255,0.3)",
                                },
                                children: l(a.credSaveBtn),
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              _e &&
                (0, $.jsxs)("div", {
                  className:
                    "absolute inset-0 z-50 flex items-center justify-center px-4",
                  onClick: () => Le(!1),
                  children: [
                    (0, $.jsx)("div", {
                      className:
                        "absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity",
                    }),
                    (0, $.jsx)("div", {
                      className:
                        "relative w-full max-w-[340px] max-h-[90vh] overflow-y-auto glass-panel bg-white/[0.05] rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-modal-in",
                      onClick: (e) => e.stopPropagation(),
                      children: (0, $.jsxs)("div", {
                        className: "relative z-10",
                        children: [
                          (0, $.jsxs)("div", {
                            className:
                              "flex items-center justify-between mb-4 pb-3 border-b border-white/10",
                            children: [
                              (0, $.jsxs)("div", {
                                className: "flex items-center gap-3",
                                children: [
                                  (0, $.jsx)("div", {
                                    className:
                                      "w-8 h-8 rounded-lg glass-panel flex items-center justify-center",
                                    children: (0, $.jsx)(_, {
                                      size: 16,
                                      className: "".concat(
                                        Dt ? "text-cyan-300" : "text-white/60",
                                      ),
                                    }),
                                  }),
                                  (0, $.jsxs)("div", {
                                    children: [
                                      (0, $.jsx)("span", {
                                        className:
                                          "text-white font-black text-xs tracking-widest block drop-shadow-md",
                                        children: l(a.hotspotTitle),
                                      }),
                                      (0, $.jsx)("span", {
                                        className:
                                          "text-white/50 font-bold text-[9px]",
                                        children: a.hotspotSubtitle,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, $.jsx)("button", {
                                onClick: () => Le(!1),
                                className:
                                  "w-8 h-8 rounded-full glass-panel flex items-center justify-center hover:bg-white/10",
                                children: (0, $.jsx)(H, {
                                  size: 14,
                                  className: "text-white/80",
                                }),
                              }),
                            ],
                          }),
                          (0, $.jsx)("div", {
                            className: "flex flex-col gap-3 mb-4",
                            children: Dt
                              ? (0, $.jsxs)("div", {
                                  className: "flex flex-col gap-2.5",
                                  children: [
                                    (0, $.jsxs)("div", {
                                      className: "grid grid-cols-2 gap-2",
                                      children: [
                                        (0, $.jsxs)("div", {
                                          className:
                                            "glass-panel px-2.5 py-1.5 rounded-xl bg-black/35 shadow-inner flex items-center justify-between border border-white/10 overflow-hidden",
                                          children: [
                                            (0, $.jsxs)("div", {
                                              className:
                                                "flex flex-col overflow-hidden",
                                              children: [
                                                (0, $.jsx)("span", {
                                                  className:
                                                    "text-[7.5px] text-white/50 font-bold uppercase",
                                                  children: a.hotspotSsid,
                                                }),
                                                (0, $.jsx)("span", {
                                                  className:
                                                    "text-[10px] text-white font-mono font-bold truncate",
                                                  children: Vt,
                                                }),
                                              ],
                                            }),
                                            (0, $.jsx)("button", {
                                              onClick: () => {
                                                (ce("setClipboard", Vt),
                                                  Nn(
                                                    "tr" === t
                                                      ? "A\u011f ad\u0131 kopyaland\u0131"
                                                      : "SSID copied",
                                                    "success",
                                                  ));
                                              },
                                              className:
                                                "w-6 h-6 rounded-lg glass-panel flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all flex-shrink-0",
                                              children: (0, $.jsx)(V, {
                                                size: 11,
                                                className: "text-cyan-300",
                                              }),
                                            }),
                                          ],
                                        }),
                                        (0, $.jsxs)("div", {
                                          className:
                                            "glass-panel px-2.5 py-1.5 rounded-xl bg-black/35 shadow-inner flex items-center justify-between border border-white/10 overflow-hidden",
                                          children: [
                                            (0, $.jsxs)("div", {
                                              className:
                                                "flex flex-col overflow-hidden",
                                              children: [
                                                (0, $.jsx)("span", {
                                                  className:
                                                    "text-[7.5px] text-white/50 font-bold uppercase",
                                                  children: a.hotspotPass,
                                                }),
                                                (0, $.jsx)("span", {
                                                  className:
                                                    "text-[10px] text-white font-mono font-bold truncate",
                                                  children: qt,
                                                }),
                                              ],
                                            }),
                                            (0, $.jsx)("button", {
                                              onClick: () => {
                                                (ce("setClipboard", qt),
                                                  Nn(
                                                    "tr" === t
                                                      ? "\u015eifre kopyaland\u0131"
                                                      : "Password copied",
                                                    "success",
                                                  ));
                                              },
                                              className:
                                                "w-6 h-6 rounded-lg glass-panel flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all flex-shrink-0",
                                              children: (0, $.jsx)(V, {
                                                size: 11,
                                                className: "text-cyan-300",
                                              }),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, $.jsxs)("div", {
                                      className: "grid grid-cols-2 gap-2",
                                      children: [
                                        (0, $.jsxs)("div", {
                                          onClick: () => {
                                            (ce("setClipboard", Zt),
                                              Nn(
                                                "tr" === t
                                                  ? "IP kopyaland\u0131"
                                                  : "IP copied",
                                                "success",
                                              ));
                                          },
                                          className:
                                            "glass-panel rounded-xl p-2.5 flex flex-col items-center justify-center cursor-pointer hover:bg-white/8 active:scale-[0.96] transition-all border-white/20 select-none bg-black/30 shadow-inner",
                                          children: [
                                            (0, $.jsx)("span", {
                                              className:
                                                "text-[7.5px] text-cyan-300 font-black tracking-wider uppercase mb-0.5",
                                              children: "PROXY IP",
                                            }),
                                            (0, $.jsx)("span", {
                                              className:
                                                "text-xs font-black font-mono text-white tracking-tight",
                                              children: Zt,
                                            }),
                                            (0, $.jsx)("span", {
                                              className:
                                                "text-[7px] text-white/40 font-semibold mt-1",
                                              children:
                                                "Kopyalamak i\xe7in dokunun",
                                            }),
                                          ],
                                        }),
                                        (0, $.jsxs)("div", {
                                          onClick: () => {
                                            (ce("setClipboard", "10808"),
                                              Nn(
                                                "tr" === t
                                                  ? "Port kopyaland\u0131"
                                                  : "Port copied",
                                                "success",
                                              ));
                                          },
                                          className:
                                            "glass-panel rounded-xl p-2.5 flex flex-col items-center justify-center cursor-pointer hover:bg-white/8 active:scale-[0.96] transition-all border-white/20 select-none bg-black/30 shadow-inner",
                                          children: [
                                            (0, $.jsx)("span", {
                                              className:
                                                "text-[7.5px] text-cyan-300 font-black tracking-wider uppercase mb-0.5",
                                              children: "PROXY PORT",
                                            }),
                                            (0, $.jsx)("span", {
                                              className:
                                                "text-xs font-black font-mono text-white tracking-tight",
                                              children: "10808",
                                            }),
                                            (0, $.jsx)("span", {
                                              className:
                                                "text-[7px] text-white/40 font-semibold mt-1",
                                              children:
                                                "Kopyalamak i\xe7in dokunun",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, $.jsxs)("div", {
                                      className:
                                        "flex gap-1.5 p-1 glass-panel rounded-xl bg-black/20",
                                      children: [
                                        (0, $.jsx)("button", {
                                          onClick: () => bn("android"),
                                          className:
                                            "flex-1 py-1 rounded-lg text-[8.5px] font-black tracking-wider transition-all",
                                          style: {
                                            background:
                                              "android" === yn
                                                ? "rgba(255,255,255,0.08)"
                                                : "transparent",
                                            color:
                                              "android" === yn
                                                ? "#67e8f9"
                                                : "rgba(255,255,255,0.5)",
                                          },
                                          children: "ANDROID REHBER\u0130",
                                        }),
                                        (0, $.jsx)("button", {
                                          onClick: () => bn("ios"),
                                          className:
                                            "flex-1 py-1 rounded-lg text-[8.5px] font-black tracking-wider transition-all",
                                          style: {
                                            background:
                                              "ios" === yn
                                                ? "rgba(255,255,255,0.08)"
                                                : "transparent",
                                            color:
                                              "ios" === yn
                                                ? "#67e8f9"
                                                : "rgba(255,255,255,0.5)",
                                          },
                                          children: "iOS REHBER\u0130",
                                        }),
                                      ],
                                    }),
                                    (0, $.jsx)("div", {
                                      className:
                                        "glass-panel rounded-xl p-3 bg-black/30 text-[9px] leading-relaxed text-white/80 font-semibold border border-white/10",
                                      children:
                                        "android" === yn
                                          ? (0, $.jsxs)("ol", {
                                              className:
                                                "list-decimal pl-3.5 space-y-1 text-left font-sans text-white/90",
                                              children: [
                                                (0, $.jsx)("li", {
                                                  children:
                                                    "Wi-Fi ayarlar\u0131na gidin ve hotspot a\u011f\u0131na ba\u011flan\u0131n.",
                                                }),
                                                (0, $.jsxs)("li", {
                                                  children: [
                                                    "A\u011f ayr\u0131nt\u0131lar\u0131ndan ",
                                                    (0, $.jsx)("strong", {
                                                      children: "Proxy",
                                                    }),
                                                    " ayar\u0131n\u0131 bulun.",
                                                  ],
                                                }),
                                                (0, $.jsxs)("li", {
                                                  children: [
                                                    "Proxy modunu ",
                                                    (0, $.jsx)("strong", {
                                                      children:
                                                        "El ile / Manuel",
                                                    }),
                                                    " yap\u0131n.",
                                                  ],
                                                }),
                                                (0, $.jsxs)("li", {
                                                  children: [
                                                    "Sunucu ad\u0131na yukar\u0131daki ",
                                                    (0, $.jsx)("strong", {
                                                      children: "IP",
                                                    }),
                                                    "'yi, porta ise ",
                                                    (0, $.jsx)("strong", {
                                                      children: "10808",
                                                    }),
                                                    " yaz\u0131p kaydedin.",
                                                  ],
                                                }),
                                              ],
                                            })
                                          : (0, $.jsxs)("ol", {
                                              className:
                                                "list-decimal pl-3.5 space-y-1 text-left font-sans text-white/90",
                                              children: [
                                                (0, $.jsx)("li", {
                                                  children:
                                                    "Wi-Fi ayarlar\u0131na gidin ve hotspot a\u011f\u0131na ba\u011flan\u0131n.",
                                                }),
                                                (0, $.jsxs)("li", {
                                                  children: [
                                                    "A\u011f\u0131n yan\u0131ndaki mavi ",
                                                    (0, $.jsx)("strong", {
                                                      children: "(i)",
                                                    }),
                                                    " ikonuna dokunun.",
                                                  ],
                                                }),
                                                (0, $.jsxs)("li", {
                                                  children: [
                                                    "En alttaki ",
                                                    (0, $.jsx)("strong", {
                                                      children:
                                                        "Proxy'yi Yap\u0131land\u0131r",
                                                    }),
                                                    " alan\u0131na girip ",
                                                    (0, $.jsx)("strong", {
                                                      children: "El ile",
                                                    }),
                                                    " se\xe7in.",
                                                  ],
                                                }),
                                                (0, $.jsxs)("li", {
                                                  children: [
                                                    "Sunucu alan\u0131na ",
                                                    (0, $.jsx)("strong", {
                                                      children: "IP",
                                                    }),
                                                    "'yi, Kap\u0131 alan\u0131na ",
                                                    (0, $.jsx)("strong", {
                                                      children: "10808",
                                                    }),
                                                    " yaz\u0131p kaydedin.",
                                                  ],
                                                }),
                                              ],
                                            }),
                                    }),
                                  ],
                                })
                              : (0, $.jsxs)("div", {
                                  className: "flex flex-col gap-3",
                                  children: [
                                    (0, $.jsxs)("div", {
                                      className:
                                        "flex gap-2 p-1 glass-panel rounded-xl",
                                      children: [
                                        (0, $.jsx)("button", {
                                          onClick: () => {
                                            (nn("local"),
                                              localStorage.setItem(
                                                "mproxy_hotspot_type",
                                                "local",
                                              ));
                                          },
                                          className:
                                            "flex-1 py-1.5 rounded-lg text-[9px] font-black tracking-wider transition-all",
                                          style: {
                                            background:
                                              "local" === tn
                                                ? "rgba(255,255,255,0.1)"
                                                : "transparent",
                                            color:
                                              "local" === tn
                                                ? "#67e8f9"
                                                : "rgba(255,255,255,0.6)",
                                          },
                                          children:
                                            "UYGULAMA \u0130\xc7\u0130 (WIFI DIRECT)",
                                        }),
                                        (0, $.jsx)("button", {
                                          onClick: () => {
                                            (nn("system"),
                                              localStorage.setItem(
                                                "mproxy_hotspot_type",
                                                "system",
                                              ));
                                          },
                                          className:
                                            "flex-1 py-1.5 rounded-lg text-[9px] font-black tracking-wider transition-all",
                                          style: {
                                            background:
                                              "system" === tn
                                                ? "rgba(255,255,255,0.1)"
                                                : "transparent",
                                            color:
                                              "system" === tn
                                                ? "#67e8f9"
                                                : "rgba(255,255,255,0.6)",
                                          },
                                          children: "S\u0130STEM (SAB\u0130T)",
                                        }),
                                      ],
                                    }),
                                    "local" === tn
                                      ? (0, $.jsxs)("div", {
                                          className: "flex flex-col gap-2",
                                          children: [
                                            (0, $.jsxs)("div", {
                                              className:
                                                "glass-panel px-3 py-2 rounded-xl bg-black/30 shadow-inner flex flex-col gap-1 border border-white/10",
                                              children: [
                                                (0, $.jsx)("span", {
                                                  className:
                                                    "text-[8.5px] text-white/50 font-bold",
                                                  children:
                                                    "A\u011e ADI (SSID)",
                                                }),
                                                (0, $.jsxs)("div", {
                                                  className:
                                                    "flex items-center text-xs font-mono font-bold text-white",
                                                  children: [
                                                    (0, $.jsx)("span", {
                                                      className:
                                                        "text-cyan-300 select-none mr-0.5",
                                                      children: "mProxy",
                                                    }),
                                                    (0, $.jsx)("input", {
                                                      type: "text",
                                                      value: an,
                                                      onChange: (e) => {
                                                        const t =
                                                          e.target.value;
                                                        (ln(t),
                                                          localStorage.setItem(
                                                            "mproxy_local_ssid_suffix",
                                                            t,
                                                          ));
                                                      },
                                                      className:
                                                        "bg-transparent border-none outline-none text-xs text-white font-mono font-bold w-full p-0 m-0",
                                                      maxLength: 20,
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            (0, $.jsxs)("div", {
                                              className:
                                                "glass-panel px-3 py-2 rounded-xl bg-black/30 shadow-inner flex flex-col gap-1 border border-white/10",
                                              children: [
                                                (0, $.jsx)("span", {
                                                  className:
                                                    "text-[8.5px] text-white/50 font-bold",
                                                  children:
                                                    "A\u011e \u015e\u0130FRES\u0130",
                                                }),
                                                (0, $.jsx)("input", {
                                                  type: "text",
                                                  value: sn,
                                                  onChange: (e) => {
                                                    const t = e.target.value;
                                                    (un(t),
                                                      localStorage.setItem(
                                                        "mproxy_local_pass",
                                                        t,
                                                      ));
                                                  },
                                                  className:
                                                    "bg-transparent border-none outline-none text-xs text-white font-mono font-bold w-full",
                                                  maxLength: 32,
                                                }),
                                              ],
                                            }),
                                            (0, $.jsx)("div", {
                                              className:
                                                "glass-panel border-cyan-500/30 bg-cyan-500/10 rounded-xl p-2.5 text-[9px] text-cyan-100 font-semibold leading-relaxed",
                                              children:
                                                '\ud83d\udca1 WiFi Direct teknolojisi kullan\u0131l\u0131r. A\u011f ad\u0131 "DIRECT-mProxy" \xf6n ekiyle olu\u015fturulacakt\u0131r. \u015eifre en az 8 karakter olmal\u0131d\u0131r.',
                                            }),
                                          ],
                                        })
                                      : (0, $.jsxs)("div", {
                                          className: "flex flex-col gap-2",
                                          children: [
                                            (0, $.jsxs)("div", {
                                              className:
                                                "glass-panel px-3 py-2 rounded-xl bg-black/30 shadow-inner flex flex-col gap-1 border border-white/10",
                                              children: [
                                                (0, $.jsx)("span", {
                                                  className:
                                                    "text-[8.5px] text-white/50 font-bold",
                                                  children:
                                                    "A\u011e ADI (SSID)",
                                                }),
                                                (0, $.jsx)("input", {
                                                  type: "text",
                                                  value: dn,
                                                  onChange: (e) => {
                                                    const t = e.target.value;
                                                    (fn(t),
                                                      localStorage.setItem(
                                                        "mproxy_system_ssid",
                                                        t,
                                                      ));
                                                  },
                                                  className:
                                                    "bg-transparent border-none outline-none text-xs text-white font-mono font-bold w-full",
                                                  maxLength: 32,
                                                }),
                                              ],
                                            }),
                                            (0, $.jsxs)("div", {
                                              className:
                                                "glass-panel px-3 py-2 rounded-xl bg-black/30 shadow-inner flex flex-col gap-1 border border-white/10",
                                              children: [
                                                (0, $.jsx)("span", {
                                                  className:
                                                    "text-[8.5px] text-white/50 font-bold",
                                                  children:
                                                    "A\u011e \u015e\u0130FRES\u0130",
                                                }),
                                                (0, $.jsx)("input", {
                                                  type: "text",
                                                  value: hn,
                                                  onChange: (e) => {
                                                    const t = e.target.value;
                                                    (mn(t),
                                                      localStorage.setItem(
                                                        "mproxy_system_pass",
                                                        t,
                                                      ));
                                                  },
                                                  className:
                                                    "bg-transparent border-none outline-none text-xs text-white font-mono font-bold w-full",
                                                  maxLength: 32,
                                                }),
                                              ],
                                            }),
                                            (0, $.jsx)("div", {
                                              className:
                                                "glass-panel border-cyan-500/30 bg-cyan-500/10 rounded-xl p-2.5 text-[9px] text-cyan-100 font-semibold leading-relaxed",
                                              children:
                                                "\ud83d\udca1 Telefonunuzun kendi hotspot ayarlar\u0131na y\xf6nlendirir. Buraya girdi\u011finiz SSID ve \u015eifre bilgileriyle telefon hotspot ayarlar\u0131n\u0131z\u0131n ayn\u0131 oldu\u011fundan emin olun.",
                                            }),
                                          ],
                                        }),
                                    (0, $.jsxs)("div", {
                                      className:
                                        "glass-panel border-amber-500/30 bg-amber-500/10 rounded-xl p-2.5 text-[9.5px] text-amber-200 font-bold leading-relaxed shadow-sm flex items-start gap-1.5",
                                      children: [
                                        (0, $.jsx)(S, {
                                          size: 12,
                                          className:
                                            "text-amber-400 flex-shrink-0 mt-0.5",
                                        }),
                                        (0, $.jsx)("span", {
                                          children:
                                            "tr" === t
                                              ? "Baz\u0131 uygulamalar (WhatsApp, oyunlar vb.) bu hotspot \xfczerinden \xe7al\u0131\u015fmayabilir."
                                              : "Some applications (WhatsApp, games, etc.) may not work through this hotspot.",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                          }),
                          (0, $.jsxs)("button", {
                            onClick: async () => {
                              if (Dt) (Ht(!0), ce("stopHotspot"));
                              else {
                                if (!pe)
                                  return void Nn(a.toastHotspotError, "error");
                                if ("local" === tn) {
                                  if (sn.length < 8)
                                    return void Nn(
                                      "tr" === t
                                        ? "\u015eifre en az 8 karakter olmal\u0131d\u0131r!"
                                        : "Password must be at least 8 characters!",
                                      "error",
                                    );
                                  (Ht(!0),
                                    ce("startHotspot", "mProxy" + an, sn));
                                } else (Ht(!0), ce("startSystemHotspot"));
                              }
                            },
                            disabled: Ut,
                            className:
                              "w-full py-3.5 rounded-xl glass-panel text-white text-xs font-black tracking-widest transition-all shadow-inner relative overflow-hidden group active:scale-[0.98] disabled:opacity-50",
                            style: Dt
                              ? {
                                  background:
                                    "linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.5))",
                                }
                              : {
                                  background:
                                    "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(6,182,212,0.5))",
                                },
                            children: [
                              (0, $.jsx)("div", {
                                className:
                                  "absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50",
                              }),
                              (0, $.jsxs)("span", {
                                className:
                                  "relative z-10 flex items-center justify-center gap-2 drop-shadow-md",
                                children: [
                                  Ut
                                    ? (0, $.jsx)(se, {})
                                    : Dt
                                      ? (0, $.jsx)(W, { size: 16 })
                                      : (0, $.jsx)(_, { size: 16 }),
                                  l(
                                    Ut
                                      ? a.connecting
                                      : Dt
                                        ? a.hotspotBtnStop
                                        : a.hotspotBtnStart,
                                  ),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
            ],
          }),
        }),
        Ie &&
          (0, $.jsx)(le, {
            message: Ie.message,
            type: Ie.type,
            onClose: En,
            safeAreaTop: i,
          }),
      ],
    });
  }
  const fe = (e) => {
    e &&
      e instanceof Function &&
      n
        .e(453)
        .then(n.bind(n, 453))
        .then((t) => {
          let n = t.getCLS,
            r = t.getFID,
            a = t.getFCP,
            l = t.getLCP,
            o = t.getTTFB;
          (n(e), r(e), a(e), l(e), o(e));
        });
  };
  (a
    .createRoot(document.getElementById("root"))
    .render((0, $.jsx)(r.StrictMode, { children: (0, $.jsx)(de, {}) })),
    fe());
})();
//# sourceMappingURL=main.3109de2a.js.map
