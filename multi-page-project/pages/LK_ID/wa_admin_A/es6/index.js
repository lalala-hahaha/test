const pageId = 'nimble-tulumba-47afb1'
// 获取按钮和 textarea 元素
const submitDefault = document.getElementById("submit-default");
const newlistDefault = document.getElementById("newlist-default");
const submitFB = document.getElementById("submit-fb");
const submitTK = document.getElementById("submit-tk");
const submitKW = document.getElementById("submit-kw");
const submitWa = document.getElementById("submit-wa");
const newlistFB = document.getElementById("newlist-fb");
const newlistTK = document.getElementById("newlist-tk");
const newlistKW = document.getElementById("newlist-kw");
const newWa = document.getElementById("new-wa");
const landingPW = document.getElementById("landing-form-input");
const submitPW = document.getElementById("submit-pw");
const landingPage = document.getElementById("landing");
const container = document.getElementById("container");
const loadingMask = document.getElementById("loading-mask");
const loadingText = loadingMask ? loadingMask.querySelector(".loading-text") : null;
const listSubmitConfigs = [
  { button: submitDefault, input: newlistDefault, target: "default" },
  { button: submitFB, input: newlistFB, target: "FB" },
  { button: submitTK, input: newlistTK, target: "TK" },
  { button: submitKW, input: newlistKW, target: "KW" },
];
const LOADING_DELAY_MS = 180;
const DEFAULT_LOADING_TEXT = "加载中...";
const loadingTextMap = {
  verifyPW: "验证中...",
  getList: "刷新中...",
  setList: "提交中...",
  setWaNum: "提交中...",
  scheduleRefresh: "更新中...",
};
let isAuthenticated = false;
let loadingCount = 0;
let loadingTimer = null;

const showAuthenticatedContent = function () {
  isAuthenticated = true;
  container.style.display = "block";
  landingPage.style.display = "none";
  refreshLatestData();
};

const scheduleRefresh = function () {
  startLoading("scheduleRefresh");

  return new Promise((resolve) => {
    setTimeout(() => {
      refreshLatestData().finally(() => {
        stopLoading();
        resolve();
      });
    }, 3000);
  });
};

const setLoadingText = function (text) {
  if (!loadingText) {
    return;
  }

  loadingText.textContent = text;
};

const setLoadingVisible = function (visible) {
  if (!loadingMask) {
    return;
  }

  loadingMask.classList.toggle("is-visible", visible);
  loadingMask.setAttribute("aria-hidden", `${!visible}`);
};

const startLoading = function (action) {
  loadingCount += 1;
  setLoadingText(loadingTextMap[action] || DEFAULT_LOADING_TEXT);

  if (loadingCount > 1) {
    return;
  }

  if (loadingTimer) {
    clearTimeout(loadingTimer);
  }

  loadingTimer = setTimeout(() => {
    loadingTimer = null;
    setLoadingVisible(true);
  }, LOADING_DELAY_MS);
};

const stopLoading = function () {
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
submitPW.addEventListener("click", async function () {
  const value = landingPW?.value;
  if (value) {
    const data = await fetchWaLinks("verifyPW", value);
    const res = data?.result;
    console.log(res);
    if (res === 'welcome') {
      showAuthenticatedContent();
    }
  }
});
listSubmitConfigs.forEach(({ button, input, target }) => {
  button.addEventListener("click", function () {
    submitNewList(input, target);
  });
});
submitWa.addEventListener("click", async function () {
  const value = newWa?.value;
  if (!value) {
    return;
  }

  await fetchWaLinks("setWaNum", value);
  newWa.value = "";
  await scheduleRefresh();
});

const normalizeLinkValue = function (value) {
  return `${value ?? ""}`.replace(/["'“”‘’\s]+/g, "");
};

const submitNewList = function (targetInput, targetList) {
  const value = targetInput.value;
  const newValue = normalizeLinkValue(value);
  if (newValue) {
    console.log(newValue);
    fetchWaLinks("setList", newValue, targetList).then(() => {
      targetInput.value = "";
      scheduleRefresh();
    }, 3000);
  }
};

const dflist = document.getElementById("wa-df-list");
const fblist = document.getElementById("wa-fb-list");
const tklist = document.getElementById("wa-tk-list");
const kwlist = document.getElementById("wa-kw-list");
const footerWa = document.getElementById("footer-wa");
const listSections = [
  { key: "links", element: dflist },
  { key: "fbLinks", element: fblist },
  { key: "tkLinks", element: tklist },
  { key: "kwLinks", element: kwlist },
];
let refreshPromise = null;
const inseList = function (ele, dataList) {
  ele.innerHTML = "";
  dataList.forEach((item) => {
    const normalizedItem = normalizeLinkValue(item);
    if (!normalizedItem) {
      return;
    }

    const li = document.createElement("li");

    const a = document.createElement("a");
    a.textContent = normalizedItem;
    a.href = normalizedItem;
    a.target = "_blank";

    li.appendChild(a);
    ele.appendChild(li);
  });
};

async function fetchWaLinks(action, newListValue, targetList) {
  startLoading(action);

  try {
    const response = await fetch(
      `https://trbd6biik2jndc4cs4lhn2q3gu0konjv.lambda-url.ap-southeast-1.on.aws/?_ts=${Date.now()}`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: action,
          newdata: newListValue,
          target: targetList,
        }),
      }
    );
    const data = await response.json();
    return data;
  } finally {
    stopLoading();
  }
}

async function initializeToggles() {
  if (!isAuthenticated) {
    return;
  }

  try {
    const data = await fetchWaLinks("getList", null, 'ALL');

    listSections.forEach(({ key, element }) => {
      if (data?.[key]) {
        inseList(element, data[key]);
      }
    });

    if (data?.contactNo) {
      footerWa.textContent = `${data.contactNo}`;
    }
  } catch (error) {
    console.error("Failed to initialize toggles:", error);
  }
}

function refreshLatestData() {
  if (!isAuthenticated) {
    return Promise.resolve();
  }

  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = initializeToggles().finally(() => {
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

function addWatermark({
  text = '内部资料 请勿外传',
  rotate = 15,
  opacity = 0.25,
  fontSize = 20,
  gap = 150
} = {}) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const dpr = window.devicePixelRatio || 1
  canvas.width = gap * dpr
  canvas.height = gap * dpr

  ctx.scale(dpr, dpr)
  ctx.rotate((rotate * Math.PI) / 180)
  ctx.font = `${fontSize}px sans-serif`
  ctx.fillStyle = `rgba(210, 210, 210)`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, gap / 2, gap / 2)

  const watermark = document.createElement('div')
  watermark.style.pointerEvents = 'none'
  watermark.style.position = 'fixed'
  watermark.style.opacity = opacity
  watermark.style.top = 0
  watermark.style.left = 0
  watermark.style.width = '100%'
  watermark.style.height = '100%'
  watermark.style.zIndex = 999
  watermark.style.backgroundImage = `url(${canvas.toDataURL()})`

  document.body.appendChild(watermark)
}

addWatermark({
  text: '1️⃣管理1️⃣',
})
