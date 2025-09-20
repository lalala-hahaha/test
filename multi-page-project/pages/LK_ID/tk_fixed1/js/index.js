"use strict";

var pageId = "zesty-pika-f8c7c4";
var linkIndex;
try {
  var val = getQueryParam("idx");
  // 转成数字，且判断有效数字，否则默认1
  linkIndex = Number(val);
  if (isNaN(linkIndex) || linkIndex < 1) {
    linkIndex = 1;
  }
} catch (e) {
  linkIndex = 1;
}
var eventStr = "";

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