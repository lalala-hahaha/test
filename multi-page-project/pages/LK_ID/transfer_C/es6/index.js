const pageId = "tourmaline-bubblegum-cef002";
// 获取当前wa列表
async function fetchWaLinks() {
  const response = await fetch(
      `https://ixorsyqhrvytfq5dce22ruz73i0ogttc.lambda-url.ap-southeast-1.on.aws/`,
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
      gtag('event', 'transfer_ID_C', {
        event_category: 'ui',
        event_label: 'transfer_ID_C',
        value: 1
      });
      const targetUrl = data.url;
      window.location.href = targetUrl;
    }
  } catch (error) {
    console.error("Failed to initialize toggles:", error);
  }
}

// 调用初始化函数
finalPage();
