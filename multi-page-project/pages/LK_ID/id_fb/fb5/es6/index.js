const pageId = "tubular-mooncake-ca1088";
const linkIndex = 5
const eventStr = 'F'

// 页面初始化逻辑
function initialize() {
  // 获取 WA 链接列表
  finalLinks(linkIndex);
  // 绑定按钮点击事件
  bindButtonEvents(eventStr);
  // 剩余名额
  thePlaces();
  // 倒计时
  startFlashSaleCountdown();
}

// 等待 DOM 加载完成后初始化
document.addEventListener("DOMContentLoaded", initialize);
