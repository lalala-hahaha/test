const pageid = "superlative-boba-eea541";
const targetPlatform = "FB";
let isAppear = true;

// 生成一个1到8之间的随机数
const randomNum = Math.floor(Math.random() * 2) + 1;

// 封装随机上报逻辑
function shouldTrackEvent() {
  console.log(randomNum)
  // 只有当随机数小于x时才进行上报
  if (randomNum < 2) {
    fbq("track", "PageView");
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
    const response = await fetch("https://mr4xa3bnuh567e5gbmbeyl5xdq0lpdoh.lambda-url.ap-southeast-1.on.aws/");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (data?.[pageid] === "1") {
      // 上报逻辑已通过 randomNum 判断决定
      shouldTrackEvent();
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// 获取WA列表
async function fetchWaLinks(targetList) {
  try {
    const response = await fetch(
      `https://wjqicpjvr34cvmzucfiocae3ie0irrxb.lambda-url.ap-southeast-1.on.aws/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "getList", target: targetList })
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch WA links:", error);
    return null;
  }
}

async function finalLinks() {
  try {
    const data = await fetchWaLinks(targetPlatform);
    if (data?.links) {
      const links = data.links;
      const targetUrl = links.length > 2 ? links[2] : links[0];
      console.log(targetUrl);
      const targetEle = document.getElementById("welcome-link");
      targetEle.href = targetUrl;
    }
  } catch (error) {
    console.error("Failed to initialize toggles:", error);
  }
}

// 通用的按钮点击事件处理函数
function handleButtonClick(buttonId, pageToHide, pageToShow, fbEvent, eventLabel) {
  document.getElementById(buttonId).addEventListener("click", function () {
    document.getElementById(pageToHide).style.display = "none";
    document.getElementById(pageToShow).style.display = "flex";
    if (isAppear) {
      fbq("track", fbEvent);
      console.log(eventLabel);
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  // 初始化页面
  await initializePage();
  await finalLinks();

  // 添加按钮事件
  handleButtonClick("sex-male", "page-sex", "page-form", "D_male", "D_male");
  handleButtonClick("sex-female", "page-sex", "page-welcome", "D_female", "D_female");

  document.getElementById("form-submit-btn").addEventListener("click", function () {
    document.getElementById("page-form").style.display = "none";
    document.getElementById("page-thank").style.display = "flex";
    if (isAppear) {
      fbq("track", "D_submit_form");
      console.log("D_submit_form");
    }
  });

  document.getElementById("welcome-link").addEventListener("click", function () {
    if (isAppear) {
      fbq("track", "Lead", { event_source_url: window.location.href });
      fbq("track", "D_welcome");
      console.log("D_welcome");
    }
  });
});
