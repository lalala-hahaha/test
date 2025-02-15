const pageId = "charming-melba-31ae66";
const targetPlatform = "FB";
// let isAppear = true; // 用来决定是否进行上报
// const randomNum = Math.floor(Math.random() * 2) + 1; // 随机生成1到2之间的数

// // 封装随机上报逻辑
// function shouldTrackEvent() {
//   console.log(randomNum);
//   // 只有当随机数小于2时才进行上报
//   if (randomNum < 2) {
//     console.log(randomNum, "正常上报");
//     return true;
//   } else {
//     isAppear = false; // 随机数大于等于2时不执行上报
//     console.log(randomNum, "不上报");
//     return false;
//   }
// }

// 初始化页面并判断是否需要上报
// async function initializePage() {
//   try {
//     const response = await fetch(
//       "https://mr4xa3bnuh567e5gbmbeyl5xdq0lpdoh.lambda-url.ap-southeast-1.on.aws/"
//     );
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     if (data?.[pageId] === "1") {
//       shouldTrackEvent(); // 根据返回数据决定是否执行上报
//     }
//   } catch (error) {
//     console.error("Fetch error:", error);
//   }
// }

// 获取WA链接列表
async function fetchWaLinks(targetList) {
  try {
    const response = await fetch(
      `https://wjqicpjvr34cvmzucfiocae3ie0irrxb.lambda-url.ap-southeast-1.on.aws/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "getList", target: targetList }),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch WA links: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 设置页面的链接
async function finalLinks() {
  try {
    const data = await fetchWaLinks(targetPlatform);
    if (data?.links) {
      const targetUrl = data.links[0];
      console.log(targetUrl);
      const targetEle = document.getElementById("welcome-link");
      if (targetEle) {
        targetEle.href = targetUrl;
      }
    }
  } catch (error) {
    console.error("Failed to set links:", error);
  }
}

// 绑定按钮点击事件
function bindButtonEvents() {
  const sexMaleButton = document.getElementById("sex-male");
  const sexFemaleButton = document.getElementById("sex-female");
  const formSubmitButton = document.getElementById("form-submit-btn");
  const welcomeLink = document.getElementById("welcome-link");

  if (sexMaleButton) {
    sexMaleButton.addEventListener("click", () => {
      document.getElementById("page-sex").style.display = "none";
      document.getElementById("page-form").style.display = "flex";
      fbq("track", "B_male");
    });
  }

  if (sexFemaleButton) {
    sexFemaleButton.addEventListener("click", () => {
      document.getElementById("page-sex").style.display = "none";
      document.getElementById("page-welcome").style.display = "flex";
      fbq("track", "B_female");
    });
  }

  if (formSubmitButton) {
    formSubmitButton.addEventListener("click", () => {
      document.getElementById("page-form").style.display = "none";
      document.getElementById("page-thank").style.display = "flex";
      fbq("track", "B_submit_form");
    });
  }

  if (welcomeLink) {
    welcomeLink.addEventListener("click", () => {
      fbq("track", "Lead", {
        event_source_url: window.location.href,
      });
      fbq("track", "B_welcome");
    });
  }
}

// 页面初始化逻辑
async function initialize() {
  await finalLinks(); // 设置链接
  bindButtonEvents(); // 绑定按钮点击事件
}

// 等待DOM加载完成后初始化
document.addEventListener("DOMContentLoaded", initialize);
