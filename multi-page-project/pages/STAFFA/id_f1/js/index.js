"use strict";

var pageId = "darling-starship-8f3cb4";
var linkIndex = 1;
var eventStr = '';

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