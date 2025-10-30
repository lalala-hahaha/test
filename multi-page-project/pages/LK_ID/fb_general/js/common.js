"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var targetPlatform = "FB";
// 获取 WA 链接列表
function fetchWaLinks(_x) {
  return _fetchWaLinks.apply(this, arguments);
} // 设置页面的链接
function _fetchWaLinks() {
  _fetchWaLinks = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(targetList) {
    var response, data, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          _context.n = 1;
          return fetch("https://japqvanyxxykw6fzi67pfeafeq0qezxn.lambda-url.ap-southeast-1.on.aws/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              action: "getList",
              target: targetList
            })
          });
        case 1:
          response = _context.v;
          if (response.ok) {
            _context.n = 2;
            break;
          }
          throw new Error("Failed to fetch WA links: ".concat(response.status));
        case 2:
          _context.n = 3;
          return response.json();
        case 3:
          data = _context.v;
          return _context.a(2, data || {});
        case 4:
          _context.p = 4;
          _t = _context.v;
          console.error("fetchWaLinks error:", _t);
          return _context.a(2, {});
      }
    }, _callee, null, [[0, 4]]);
  }));
  return _fetchWaLinks.apply(this, arguments);
}
function finalLinks(_x2) {
  return _finalLinks.apply(this, arguments);
}
function _finalLinks() {
  _finalLinks = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(index) {
    var relIndex, _yield$fetchWaLinks, _yield$fetchWaLinks$l, links, contactNo, targetUrl, targetEle, contactEle, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          relIndex = index - 1;
          if (relIndex < 0) {
            relIndex = 0;
          }
          _context2.p = 1;
          _context2.n = 2;
          return fetchWaLinks(targetPlatform);
        case 2:
          _yield$fetchWaLinks = _context2.v;
          _yield$fetchWaLinks$l = _yield$fetchWaLinks.links;
          links = _yield$fetchWaLinks$l === void 0 ? [] : _yield$fetchWaLinks$l;
          contactNo = _yield$fetchWaLinks.contactNo;
          if (links.length) {
            targetUrl = links[0];
            if (links.length > relIndex && links[relIndex]) {
              targetUrl = links[relIndex];
            }
            console.log("targetUrl==", targetUrl);
            targetEle = document.getElementById("welcome-link");
            if (targetEle) targetEle.innerText = targetUrl;
          }
          if (contactNo) {
            contactEle = document.getElementById("contact-no");
            if (contactEle) contactEle.innerText = contactNo;
          }
          _context2.n = 4;
          break;
        case 3:
          _context2.p = 3;
          _t2 = _context2.v;
          console.error("finalLinks error:", _t2);
        case 4:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 3]]);
  }));
  return _finalLinks.apply(this, arguments);
}
var toast = document.getElementById("toast");
function showToast(msg) {
  if (toast) {
    toast.textContent = msg;
    toast.style.opacity = 1;
    setTimeout(function () {
      return toast.style.opacity = 0;
    }, 1800);
  }
}
function safeCopy(_x3) {
  return _safeCopy.apply(this, arguments);
} // 绑定按钮点击事件
function _safeCopy() {
  _safeCopy = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(text) {
    var input, success, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          if (!(navigator.clipboard && window.isSecureContext)) {
            _context3.n = 4;
            break;
          }
          _context3.p = 1;
          _context3.n = 2;
          return navigator.clipboard.writeText(text);
        case 2:
          showToast("Penyalinan berhasil ✅");
          return _context3.a(2, true);
        case 3:
          _context3.p = 3;
          _t3 = _context3.v;
          console.warn("Clipboard API error:", _t3);
        case 4:
          // Fallback: execCommand
          input = document.createElement("textarea");
          input.value = text;
          document.body.appendChild(input);
          input.select();
          input.setSelectionRange(0, text.length);
          success = document.execCommand("copy");
          document.body.removeChild(input);
          if (success) showToast("Penyalinan berhasil ✅");else showToast("Silakan tekan lama untuk menyalin secara manual. 🙏");
          return _context3.a(2, success);
      }
    }, _callee3, null, [[1, 3]]);
  }));
  return _safeCopy.apply(this, arguments);
}
function bindButtonEvents(eventStrCode) {
  var textEl = document.getElementById("welcome-link");
  var copyBtn = document.getElementById("copyBtn");
  var sexMaleButton = document.getElementById("sex-male");
  var sexFemaleButton = document.getElementById("sex-female");
  var welcomeLink = document.getElementById("welcome-link");
  if (sexMaleButton) {
    sexMaleButton.addEventListener("click", function () {
      document.getElementById("page-sex").style.display = "none";
      document.getElementById("page-thank").style.display = "flex";
      fbq("track", "LK_ID_male");
    });
  }
  if (sexFemaleButton) {
    sexFemaleButton.addEventListener("click", function () {
      document.getElementById("page-sex").style.display = "none";
      document.getElementById("page-welcome").style.display = "flex";
      fbq("track", "ViewContent");
      fbq("track", "LK_ID_female");
    });
  }
  if (welcomeLink) {
    welcomeLink.addEventListener("click", function () {
      var text = textEl.innerText;
      safeCopy(text);
      fbq("track", "AddToCart");
      fbq("track", "Contact");
      fbq("track", "LK_ID_welcome");
    });
  }
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var text = textEl.innerText;
      safeCopy(text);
      fbq("track", "AddToCart");
      fbq("track", "Contact");
      fbq("track", "LK_ID_welcome");
    });
  }
}

// 剩余名额
function thePlaces() {
  var displayEl = document.getElementById("remaining-spots");
  var number;
  var nextDecreaseAt;

  // 生成随机延迟（毫秒）
  function getDelay() {
    if (number > 10) {
      // 1 ~ 2 秒
      return Math.random() * 1000 + 1000;
    } else {
      // 3 ~ 5 秒
      return Math.random() * 2000 + 3000;
    }
  }

  // 保存当前状态到 localStorage
  function saveState() {
    localStorage.setItem("remaining-number", number);
    localStorage.setItem("next-decrease-at", nextDecreaseAt);
  }

  // 恢复状态
  function restoreState() {
    var savedNumber = parseInt(localStorage.getItem("remaining-number"));
    var savedNext = parseInt(localStorage.getItem("next-decrease-at"));
    if (!isNaN(savedNumber) && savedNext) {
      number = savedNumber;
      nextDecreaseAt = savedNext;
    } else {
      number = Math.floor(Math.random() * 41) + 50;
      nextDecreaseAt = Date.now() + getDelay();
      saveState();
    }
  }

  // 主循环
  function tick() {
    var now = Date.now();
    if (number <= 0) {
      number = 0;
      displayEl.textContent = number;
      localStorage.removeItem("remaining-number");
      localStorage.removeItem("next-decrease-at");
      console.log("已到 0，停止");
      return;
    }
    if (now >= nextDecreaseAt) {
      number -= 1;
      displayEl.textContent = number;
      var delay = getDelay();
      nextDecreaseAt = now + delay;
      saveState();

      // console.log("当前数字：", number);
    }
    requestAnimationFrame(tick);
  }

  // 初始化
  restoreState();
  displayEl.textContent = number;
  requestAnimationFrame(tick);
}

// 倒计时
function startFlashSaleCountdown() {
  var el = document.getElementById("stat-timer");
  if (!el) {
    console.error("Element with id=\"".concat(stat - timer, "\" not found"));
    return;
  }
  var STORAGE_KEY = "flash_sale_end_time";
  var now = Date.now();
  var endTime = localStorage.getItem(STORAGE_KEY);
  if (!endTime || Number(endTime) <= now) {
    // 随机 5~10 分钟
    var minMs = 5 * 60 * 1000; // 5分钟
    var maxMs = 10 * 60 * 1000; // 10分钟
    var countdownMs = Math.floor(Math.random() * (maxMs - minMs) + minMs);
    endTime = now + countdownMs;
    localStorage.setItem(STORAGE_KEY, endTime);
  } else {
    endTime = Number(endTime);
  }
  var timer = setInterval(function () {
    var remaining = endTime - Date.now();
    if (remaining <= 0) {
      clearInterval(timer);
      el.textContent = "00:00:00";
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    var minutes = Math.floor(remaining / 60000);
    var seconds = Math.floor(remaining % 60000 / 1000);
    el.textContent = "00:" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
  }, 500);
}