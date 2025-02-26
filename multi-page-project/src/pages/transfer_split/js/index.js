// 获取当前wa列表
async function fetchWaLinks() {
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
        const targetUrl = data.url;
        window.location.href = targetUrl;
      }
    } catch (error) {
      console.error("Failed to initialize toggles:", error);
    }
  }
  
  // 调用初始化函数
  finalPage();