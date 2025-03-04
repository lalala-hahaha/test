const pageId = "effortless-moxie-cde575";
const targetPlatform = "TK";
let isAppear = true;

// 生成一个1到8之间的随机数
const randomNum = Math.floor(Math.random() * 10) + 1;

// 封装随机上报逻辑
function shouldTrackEvent() {
  console.log(randomNum);
  // 只有当随机数小于x时才进行上报
  if (randomNum > 2) {
    console.log(randomNum, "正常上报");
    return true;
  } else {
    isAppear = false; // 如果随机数大于等于x，则不执行上报
    console.log(randomNum, "不上报");
    return false;
  }
}

async function initializePage() {
  try {
    const response = await fetch(
      "https://mr4xa3bnuh567e5gbmbeyl5xdq0lpdoh.lambda-url.ap-southeast-1.on.aws/"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (data?.[pageId] === "1") {
      // 上报逻辑已通过 randomNum 判断决定
      shouldTrackEvent();
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// 获取 WA 链接列表
async function fetchWaLinks(targetList) {
  try {
    const response = await fetch(
      "https://wjqicpjvr34cvmzucfiocae3ie0irrxb.lambda-url.ap-southeast-1.on.aws/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "getList", target: targetList }),
      }
    );

    if (!response.ok)
      throw new Error(`Failed to fetch WA links: ${response.status}`);

    const data = await response.json();
    return data || {}; // 确保返回对象
  } catch (error) {
    console.error("fetchWaLinks error:", error);
    return {};
  }
}

// 设置页面的链接
async function finalLinks() {
  try {
    const { links = [], contactNo } = await fetchWaLinks(targetPlatform);

    if (links.length) {
      let targetUrl = links[0];
      if (links.length > 1) {
        targetUrl = links[1];
      }
      console.log(targetUrl);
      const targetEle = document.getElementById("welcome-link");
      if (targetEle) targetEle.href = targetUrl;
    }

    if (contactNo) {
      const contactEle = document.getElementById("contact-no");
      if (contactEle) contactEle.innerText = contactNo;
    }
  } catch (error) {
    console.error("finalLinks error:", error);
  }
}

// 绑定按钮点击事件
function bindButtonEvents() {
  const sexMaleButton = document.getElementById("sex-male");
  const sexFemaleButton = document.getElementById("sex-female");
  const welcomeLink = document.getElementById("welcome-link");
  if (sexMaleButton) {
    sexMaleButton.addEventListener("click", () => {
      document.getElementById("page-sex").style.display = "none";
      document.getElementById("page-thank").style.display = "flex";
      if (isAppear) {
        ttq.track("D_male");
      }
    });
  }

  if (sexFemaleButton) {
    sexFemaleButton.addEventListener("click", () => {
      document.getElementById("page-sex").style.display = "none";
      document.getElementById("page-welcome").style.display = "flex";
      if (isAppear) {
        ttq.track("D_female");
        ttq.track("ClickButton");
      }
    });
  }

  if (welcomeLink) {
    welcomeLink.addEventListener("click", () => {
      if (isAppear) {
        ttq.track("D_welcome");
        ttq.track("Contact");
      }
    });
  }
}

// 页面初始化逻辑
async function initialize() {
  await initializePage();
  await finalLinks();
  bindButtonEvents();
  ttq.track("ViewContent");
}

// 等待 DOM 加载完成后初始化
document.addEventListener("DOMContentLoaded", initialize);
