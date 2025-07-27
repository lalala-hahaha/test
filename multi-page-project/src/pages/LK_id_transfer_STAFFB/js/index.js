const pageId = 'subtle-bublanina-a4a19c'
// 获取当前wa列表
async function fetchWaLinks() {
    const response = await fetch(
      `https://pz4ccil4iqhrps7h5t7ecggfhi0glowz.lambda-url.ap-southeast-1.on.aws/`,
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