const pageId = "effulgent-hamster-1ba671";
// 获取当前wa列表
async function fetchWaLinks() {
  const response = await fetch(
      `https://trbd6biik2jndc4cs4lhn2q3gu0konjv.lambda-url.ap-southeast-1.on.aws/`,
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
      gtag('event', 'transfer_ID_A', {
        event_category: 'ui',
        event_label: 'transfer_ID_A',
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
