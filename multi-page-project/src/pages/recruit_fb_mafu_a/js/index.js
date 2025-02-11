const pageid = "resilient-dusk-3aab6a";

// 为按钮添加点击事件监听器
document.getElementById("sex-male").addEventListener("click", function () {
  document.getElementById("page-sex").style.display = "none";
  document.getElementById("page-form").style.display = "flex";
  fbq('track', 'male');
});
document.getElementById("sex-female").addEventListener("click", function () {
  document.getElementById("page-sex").style.display = "none";
  document.getElementById("page-welcome").style.display = "flex";
  fbq('track', 'female');
});
document.getElementById("form-submit-btn").addEventListener("click", function () {
  document.getElementById("page-form").style.display = "none";
  document.getElementById("page-thank").style.display = "flex";
  fbq('track', 'submit_form');
});
document.getElementById("welcome-link").addEventListener("click", function () {
  fbq('track', 'Lead', {
    event_source_url: window.location.href,
  });
  fbq('track', 'welcome');
});

// 获取当前wa列表
async function fetchWaLinks(channelName) {
  const response = await fetch(
    `https://wjqicpjvr34cvmzucfiocae3ie0irrxb.lambda-url.ap-southeast-1.on.aws/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: channelName,
      }),
    }
  );
  const data = await response.json();
  return data;
}

// 初始化函数
async function finalPage() {
  try {
    const data = await fetchWaLinks('FB');
    if (data?.url) {
      const targetUrl = data.url;
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
