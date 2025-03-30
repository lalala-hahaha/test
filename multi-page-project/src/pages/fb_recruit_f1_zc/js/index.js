const pageId = "elaborate-semolina-f0becb";
const targetPlatform = "FB";

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

    if (!response.ok) throw new Error(`Failed to fetch WA links: ${response.status}`);

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
    const { contactNo } = await fetchWaLinks(targetPlatform);

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
  if (sexMaleButton) {
    sexMaleButton.addEventListener("click", () => {
      document.getElementById("page-sex").style.display = "none";
      document.getElementById("page-thank").style.display = "flex";
      fbq("track", "G_male");
    });
  }
  
  if(sexFemaleButton){
    sexFemaleButton.addEventListener("click", () => {
      console.log('目标用户，联系客服')
      fbq("track", "Lead", { event_source_url: window.location.href });
      fbq("track", "G_welcome");
    });
  }
}

// 页面初始化逻辑
function initialize() {
  finalLinks();
  bindButtonEvents();
}

// 等待 DOM 加载完成后初始化
document.addEventListener("DOMContentLoaded", initialize);
