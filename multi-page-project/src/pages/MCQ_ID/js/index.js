// 为按钮添加点击事件监听器
document.getElementById("age-not").addEventListener("click", function () {
  document.getElementById("page-age").style.display = "none";
  document.getElementById("page-age-not").style.display = "flex";
});
document.getElementById("age-yes").addEventListener("click", function () {
  finalPage()
  document.getElementById("page-age").style.display = "none";
  document.getElementById("page-sex").style.display = "flex";
});
document.getElementById("sex-male").addEventListener("click", function () {
  document.getElementById("page-sex").style.display = "none";
  document.getElementById("page-form").style.display = "flex";
});
document.getElementById("sex-female").addEventListener("click", function () {
  document.getElementById("page-sex").style.display = "none";
  document.getElementById("page-welcome").style.display = "flex";
});
document.getElementById("form-submit-btn").addEventListener("click", function () {
  document.getElementById("page-form").style.display = "none";
  document.getElementById("page-thank").style.display = "flex";
});

// 获取当前wa列表
async function fetchWaLinks(action, newListValue) {
  const response = await fetch(
    `https://wjqicpjvr34cvmzucfiocae3ie0irrxb.lambda-url.ap-southeast-1.on.aws/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}

// 初始化函数
async function finalPage() {
  try {
    const data = await fetchWaLinks();
    if (data?.url) {
      const targetUrl = data.url
      console.log(targetUrl);
      const targetEle = document.getElementById("welcome-link")
      targetEle.href = targetUrl
      targetEle.innerText = targetUrl
    }
  } catch (error) {
    console.error("Failed to initialize toggles:", error);
  }
}

// 调用初始化函数
// finalPage();
