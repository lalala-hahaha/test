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

// 为按钮添加点击事件监听器
submitPW.addEventListener("click", async function () {
  const value = landingPW?.value;
  if (value) {
    const data = await fetchWaLinks("verifyPW", value);
    const res = data?.result
    console.log(res)
    if(res === 'welcome'){
      container.style.display = "block"
      landingPage.style.display = "none"
    }
  }
});
submitDefault.addEventListener("click", function () {
  submitNewList(newlistDefault, "default");
});
submitFB.addEventListener("click", function () {
  submitNewList(newlistFB, "FB");
});
submitTK.addEventListener("click", function () {
  submitNewList(newlistTK, "TK");
});
submitKW.addEventListener("click", function () {
  submitNewList(newlistKW, "KW");
});
submitWa.addEventListener("click", function () {
  const value = newWa?.value;
  fetchWaLinks("setWaNum", value);
  setTimeout(() => {
    initializeToggles();
  }, 3000);
});
const submitNewList = function (targetInput, targetList) {
  // 获取 textarea 中的值
  const value = targetInput.value;
  if (value) {
    const newValue = value.replace(/\s+/g, "");
    console.log(newValue);
    fetchWaLinks("setList", newValue, targetList);
    setTimeout(() => {
      initializeToggles();
    }, 3000);
  }
};

const dflist = document.getElementById("wa-df-list");
const fblist = document.getElementById("wa-fb-list");
const tklist = document.getElementById("wa-tk-list");
const kwlist = document.getElementById("wa-kw-list");
const footerWa = document.getElementById("footer-wa");
const inseList = function (ele, dataList) {
  ele.innerHTML = "";
  // 遍历数组，并将每个元素作为新的列表项插入
  dataList.forEach((item) => {
    const li = document.createElement("li"); // 创建一个 li 元素

    // 创建一个 a 元素，并设置链接的文本和 URL
    const a = document.createElement("a");
    a.textContent = item; // 设置链接的文本内容
    a.href = item; // 设置链接的 URL
    a.target = "_blank"; // 设置新标签页打开链接

    // 将 a 元素添加到 li 中
    li.appendChild(a);

    // 将 li 元素添加到 ul 中
    ele.appendChild(li);
  });
};
// 获取当前wa列表
async function fetchWaLinks(action, newListValue, targetList) {
  const response = await fetch(
    `https://trbd6biik2jndc4cs4lhn2q3gu0konjv.lambda-url.ap-southeast-1.on.aws/`,
    {
      method: "POST",
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
}

// 初始化函数
async function initializeToggles() {
  try {
    const data = await fetchWaLinks("getList",null,'ALL');
    if (data?.links) {
      inseList(dflist, data.links);
    }
    if (data?.fbLinks) {
      inseList(fblist, data.fbLinks);
    }
    if (data?.tkLinks) {
      inseList(tklist, data.tkLinks);
    }
    if (data?.kwLinks) {
      inseList(kwlist, data.kwLinks);
    }
    if (data?.contactNo) {
      footerWa.innerHTML = `${data.contactNo}`;
    }
  } catch (error) {
    console.error("Failed to initialize toggles:", error);
  }
}

// 调用初始化函数
initializeToggles();

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
