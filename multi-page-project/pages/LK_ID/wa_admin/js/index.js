"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var pageId = 'bright-kulfi-2fb39e';
// 获取按钮和 textarea 元素
var submitDefault = document.getElementById("submit-default");
var newlistDefault = document.getElementById("newlist-default");
var submitFB = document.getElementById("submit-fb");
var submitTK = document.getElementById("submit-tk");
var submitKW = document.getElementById("submit-kw");
var submitWa = document.getElementById("submit-wa");
var newlistFB = document.getElementById("newlist-fb");
var newlistTK = document.getElementById("newlist-tk");
var newlistKW = document.getElementById("newlist-kw");
var newWa = document.getElementById("new-wa");
var landingPW = document.getElementById("landing-form-input");
var submitPW = document.getElementById("submit-pw");
var landingPage = document.getElementById("landing");
var container = document.getElementById("container");
var loadingMask = document.getElementById("loading-mask");
var loadingText = loadingMask ? loadingMask.querySelector(".loading-text") : null;
var listSubmitConfigs = [{
  button: submitDefault,
  input: newlistDefault,
  target: "default"
}, {
  button: submitFB,
  input: newlistFB,
  target: "FB"
}, {
  button: submitTK,
  input: newlistTK,
  target: "TK"
}, {
  button: submitKW,
  input: newlistKW,
  target: "KW"
}];
var LOADING_DELAY_MS = 180;
var DEFAULT_LOADING_TEXT = "加载中...";
var loadingTextMap = {
  verifyPW: "验证中...",
  getList: "刷新中...",
  setList: "提交中...",
  setWaNum: "提交中...",
  scheduleRefresh: "更新中..."
};
var isAuthenticated = false;
var loadingCount = 0;
var loadingTimer = null;
var showAuthenticatedContent = function showAuthenticatedContent() {
  isAuthenticated = true;
  container.style.display = "block";
  landingPage.style.display = "none";
  refreshLatestData();
};
var scheduleRefresh = function scheduleRefresh() {
  startLoading("scheduleRefresh");
  return new Promise(function (resolve) {
    setTimeout(function () {
      refreshLatestData().finally(function () {
        stopLoading();
        resolve();
      });
    }, 3000);
  });
};
var setLoadingText = function setLoadingText(text) {
  if (!loadingText) {
    return;
  }
  loadingText.textContent = text;
};
var setLoadingVisible = function setLoadingVisible(visible) {
  if (!loadingMask) {
    return;
  }
  loadingMask.classList.toggle("is-visible", visible);
  loadingMask.setAttribute("aria-hidden", "".concat(!visible));
};
var startLoading = function startLoading(action) {
  loadingCount += 1;
  setLoadingText(loadingTextMap[action] || DEFAULT_LOADING_TEXT);
  if (loadingCount > 1) {
    return;
  }
  if (loadingTimer) {
    clearTimeout(loadingTimer);
  }
  loadingTimer = setTimeout(function () {
    loadingTimer = null;
    setLoadingVisible(true);
  }, LOADING_DELAY_MS);
};
var stopLoading = function stopLoading() {
  loadingCount = Math.max(loadingCount - 1, 0);
  if (loadingCount > 0) {
    return;
  }
  if (loadingTimer) {
    clearTimeout(loadingTimer);
    loadingTimer = null;
  }
  setLoadingVisible(false);
  setLoadingText(DEFAULT_LOADING_TEXT);
};

// 为按钮添加点击事件监听器
submitPW.addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
  var value, data, res;
  return _regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        value = landingPW === null || landingPW === void 0 ? void 0 : landingPW.value;
        if (!value) {
          _context.n = 2;
          break;
        }
        _context.n = 1;
        return fetchWaLinks("verifyPW", value);
      case 1:
        data = _context.v;
        res = data === null || data === void 0 ? void 0 : data.result;
        console.log(res);
        if (res === 'welcome') {
          showAuthenticatedContent();
        }
      case 2:
        return _context.a(2);
    }
  }, _callee);
})));
listSubmitConfigs.forEach(function (_ref2) {
  var button = _ref2.button,
    input = _ref2.input,
    target = _ref2.target;
  button.addEventListener("click", function () {
    submitNewList(input, target);
  });
});
submitWa.addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
  var value;
  return _regenerator().w(function (_context2) {
    while (1) switch (_context2.n) {
      case 0:
        value = newWa === null || newWa === void 0 ? void 0 : newWa.value;
        if (value) {
          _context2.n = 1;
          break;
        }
        return _context2.a(2);
      case 1:
        _context2.n = 2;
        return fetchWaLinks("setWaNum", value);
      case 2:
        newWa.value = "";
        _context2.n = 3;
        return scheduleRefresh();
      case 3:
        return _context2.a(2);
    }
  }, _callee2);
})));
var normalizeLinkValue = function normalizeLinkValue(value) {
  return "".concat(value !== null && value !== void 0 ? value : "").replace(/["'“”‘’\s]+/g, "");
};
var submitNewList = function submitNewList(targetInput, targetList) {
  var value = targetInput.value;
  var newValue = normalizeLinkValue(value);
  if (newValue) {
    console.log(newValue);
    fetchWaLinks("setList", newValue, targetList).then(function () {
      targetInput.value = "";
      scheduleRefresh();
    });
  }
};
var dflist = document.getElementById("wa-df-list");
var fblist = document.getElementById("wa-fb-list");
var tklist = document.getElementById("wa-tk-list");
var kwlist = document.getElementById("wa-kw-list");
var footerWa = document.getElementById("footer-wa");
var listSections = [{
  key: "links",
  element: dflist
}, {
  key: "fbLinks",
  element: fblist
}, {
  key: "tkLinks",
  element: tklist
}, {
  key: "kwLinks",
  element: kwlist
}];
var refreshPromise = null;
var inseList = function inseList(ele, dataList) {
  ele.innerHTML = "";
  dataList.forEach(function (item) {
    var normalizedItem = normalizeLinkValue(item);
    if (!normalizedItem) {
      return;
    }
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.textContent = normalizedItem;
    a.href = normalizedItem;
    a.target = "_blank";
    li.appendChild(a);
    ele.appendChild(li);
  });
};
function fetchWaLinks(_x, _x2, _x3) {
  return _fetchWaLinks.apply(this, arguments);
}
function _fetchWaLinks() {
  _fetchWaLinks = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(action, newListValue, targetList) {
    var response, data;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          startLoading(action);
          _context3.p = 1;
          _context3.n = 2;
          return fetch("https://wbbmqhc5frknpeamn4tfd2lxsi0hndve.lambda-url.ap-southeast-3.on.aws/?_ts=".concat(Date.now()), {
            method: "POST",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              action: action,
              newdata: newListValue,
              target: targetList
            })
          });
        case 2:
          response = _context3.v;
          _context3.n = 3;
          return response.json();
        case 3:
          data = _context3.v;
          return _context3.a(2, data);
        case 4:
          _context3.p = 4;
          stopLoading();
          return _context3.f(4);
        case 5:
          return _context3.a(2);
      }
    }, _callee3, null, [[1,, 4, 5]]);
  }));
  return _fetchWaLinks.apply(this, arguments);
}
function initializeToggles() {
  return _initializeToggles.apply(this, arguments);
}
function _initializeToggles() {
  _initializeToggles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var data, _t;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          if (isAuthenticated) {
            _context4.n = 1;
            break;
          }
          return _context4.a(2);
        case 1:
          _context4.p = 1;
          _context4.n = 2;
          return fetchWaLinks("getList", null, 'ALL');
        case 2:
          data = _context4.v;
          listSections.forEach(function (_ref5) {
            var key = _ref5.key,
              element = _ref5.element;
            if (data !== null && data !== void 0 && data[key]) {
              inseList(element, data[key]);
            }
          });
          if (data !== null && data !== void 0 && data.contactNo) {
            footerWa.textContent = "".concat(data.contactNo);
          }
          _context4.n = 4;
          break;
        case 3:
          _context4.p = 3;
          _t = _context4.v;
          console.error("Failed to initialize toggles:", _t);
        case 4:
          return _context4.a(2);
      }
    }, _callee4, null, [[1, 3]]);
  }));
  return _initializeToggles.apply(this, arguments);
}
function refreshLatestData() {
  if (!isAuthenticated) {
    return Promise.resolve();
  }
  if (refreshPromise) {
    return refreshPromise;
  }
  refreshPromise = initializeToggles().finally(function () {
    refreshPromise = null;
  });
  return refreshPromise;
}
function refreshOnPageActive() {
  if (document.visibilityState === "visible") {
    refreshLatestData();
  }
}
refreshLatestData();
document.addEventListener("visibilitychange", refreshOnPageActive);
window.addEventListener("focus", refreshOnPageActive);
window.addEventListener("pageshow", refreshOnPageActive);
function addWatermark() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref4$text = _ref4.text,
    text = _ref4$text === void 0 ? '内部资料 请勿外传' : _ref4$text,
    _ref4$rotate = _ref4.rotate,
    rotate = _ref4$rotate === void 0 ? 15 : _ref4$rotate,
    _ref4$opacity = _ref4.opacity,
    opacity = _ref4$opacity === void 0 ? 0.25 : _ref4$opacity,
    _ref4$fontSize = _ref4.fontSize,
    fontSize = _ref4$fontSize === void 0 ? 20 : _ref4$fontSize,
    _ref4$gap = _ref4.gap,
    gap = _ref4$gap === void 0 ? 150 : _ref4$gap;
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 1;
  canvas.width = gap * dpr;
  canvas.height = gap * dpr;
  ctx.scale(dpr, dpr);
  ctx.rotate(rotate * Math.PI / 180);
  ctx.font = "".concat(fontSize, "px sans-serif");
  ctx.fillStyle = "rgba(210, 210, 210)";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, gap / 2, gap / 2);
  var watermark = document.createElement('div');
  watermark.style.pointerEvents = 'none';
  watermark.style.position = 'fixed';
  watermark.style.opacity = opacity;
  watermark.style.top = 0;
  watermark.style.left = 0;
  watermark.style.width = '100%';
  watermark.style.height = '100%';
  watermark.style.zIndex = 999;
  watermark.style.backgroundImage = "url(".concat(canvas.toDataURL(), ")");
  document.body.appendChild(watermark);
}
addWatermark({
  text: '🇮🇩印尼'
});