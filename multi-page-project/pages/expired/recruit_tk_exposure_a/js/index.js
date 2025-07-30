const targetPlatform = "TK";
// function getQueryParam(name) {
//   const match = window.location.search.match(new RegExp(`[?&]${name}=([^&]*)`));
//   return match ? decodeURIComponent(match[1]) : null;
// }

// const customPlatform = getQueryParam('platform');

// if (customPlatform) {
//   targetPlatform = customPlatform
// }

// 获取当前wa列表
async function fetchWaLinks(targetList) {
  const response = await fetch(
    `https://wjqicpjvr34cvmzucfiocae3ie0irrxb.lambda-url.ap-southeast-1.on.aws/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "getList",
        target: targetList,
      }),
    }
  );
  const data = await response.json();
  return data;
}

// 初始化函数
async function finalPage() {
  try {
    const data = await fetchWaLinks(targetPlatform);
    if (data?.links) {
      const links = data.links
      let targetUrl = links[0];
      if(links.length>1){
        targetUrl = links[1]
      }
      console.log(targetUrl);
      const targetEle = document.getElementById("welcome-link");
      targetEle.href = targetUrl;
      // targetEle.innerText = targetUrl;
    }
  } catch (error) {
    console.error("Failed to initialize toggles:", error);
  }
}

// 调用初始化函数
finalPage();

// 为按钮添加点击事件监听器
document.getElementById("welcome-link").addEventListener("click", function () {
  ttq.track("D_welcome");
});
