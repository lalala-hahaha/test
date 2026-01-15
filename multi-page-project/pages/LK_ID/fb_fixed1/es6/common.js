const targetPlatform = "FB";
// 获取 WA 链接列表
async function fetchWaLinks(targetList) {
  try {
    const response = await fetch(
      `https://japqvanyxxykw6fzi67pfeafeq0qezxn.lambda-url.ap-southeast-1.on.aws/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "getList", target: targetList }),
      }
    );

    if (!response.ok) throw new Error(`Failed to fetch WA links: ${response.status}`);

    const data = await response.json();
    return data || {}; // 确保返回对象
  } catch (error) {
    console.error("fetchWaLinks error:", error);
    return {};
  }
}


// 设置页面的链接
async function finalLinks(index) {
  let relIndex = index - 1
  if(relIndex<0){
    relIndex = 0
  }
  try {
    const { links = [], contactNo } = await fetchWaLinks(targetPlatform);

    if (links.length) {
      let targetUrl = links[0];
      if(links.length>relIndex&&links[relIndex]){
        targetUrl = links[relIndex]
      }
      console.log('targetUrl==',targetUrl)
      const targetEle = document.getElementById("welcome-link");
      if (targetEle) targetEle.href = targetUrl;
    }

    if (contactNo) {
      const contactEle = document.getElementById("contact-no");
      if (contactEle) contactEle.innerText = contactNo;
    }
  } catch (error) {
    console.error("finalLinks error:", error);
  }
}


// 绑定按钮点击事件
function bindButtonEvents(eventStrCode) {
  const sexMaleButton = document.getElementById("sex-male");
  const sexFemaleButton = document.getElementById("sex-female");
  const welcomeLink = document.getElementById("welcome-link");
  if (sexMaleButton) {
    sexMaleButton.addEventListener("click", () => {
      document.getElementById("page-sex").style.display = "none";
      document.getElementById("page-thank").style.display = "flex";
      // fbq("track", `LK_ID_male`);
    });
  }
  
  if(sexFemaleButton){
    sexFemaleButton.addEventListener("click", () => {
      document.getElementById("page-sex").style.display = "none";
      document.getElementById("page-welcome").style.display = "flex";
      fbq("track", "ViewContent");
      // fbq("track", `LK_ID_female`);
    });
  }

  if (welcomeLink) {
    welcomeLink.addEventListener("click", () => {
      fbq('track', 'Lead', {content_name: 'WhatsApp Click'})
      gtag('event', 'fb_LK_ID_welcome', {
        event_category: 'ui',
        event_label: 'AddToCart',
        value: 1
      });
    });
  }
}

// 剩余名额
function thePlaces() {
  const displayEl = document.getElementById("remaining-spots");

  let number;
  let nextDecreaseAt;

  // 生成随机延迟（毫秒）
  function getDelay() {
    if (number > 10) {
      // 1 ~ 2 秒
      return Math.random() * 1000 + 1000;
    } else {
      // 3 ~ 5 秒
      return Math.random() * 2000 + 3000;
    }
  }

  // 保存当前状态到 localStorage
  function saveState() {
    localStorage.setItem("remaining-number", number);
    localStorage.setItem("next-decrease-at", nextDecreaseAt);
  }

  // 恢复状态
  function restoreState() {
    const savedNumber = parseInt(localStorage.getItem("remaining-number"));
    const savedNext = parseInt(localStorage.getItem("next-decrease-at"));

    if (!isNaN(savedNumber) && savedNext) {
      number = savedNumber;
      nextDecreaseAt = savedNext;
    } else {
      number = Math.floor(Math.random() * 41) + 50;
      nextDecreaseAt = Date.now() + getDelay();
      saveState();
    }
  }

  // 主循环
  function tick() {
    const now = Date.now();

    if (number <= 0) {
      number = 0;
      displayEl.textContent = number;
      localStorage.removeItem("remaining-number");
      localStorage.removeItem("next-decrease-at");
      console.log("已到 0，停止");
      return;
    }

    if (now >= nextDecreaseAt) {
      number -= 1;
      displayEl.textContent = number;

      const delay = getDelay();
      nextDecreaseAt = now + delay;
      saveState();

      // console.log("当前数字：", number);
    }

    requestAnimationFrame(tick);
  }

  // 初始化
  restoreState();
  displayEl.textContent = number;
  requestAnimationFrame(tick);
}

// 倒计时
function startFlashSaleCountdown() {
  const el = document.getElementById("stat-timer");
  if (!el) {
    console.error(`Element with id="${stat - timer}" not found`);
    return;
  }

  const STORAGE_KEY = "flash_sale_end_time";

  const now = Date.now();

  let endTime = localStorage.getItem(STORAGE_KEY);

  if (!endTime || Number(endTime) <= now) {
    // 随机 5~10 分钟
    const minMs = 5 * 60 * 1000; // 5分钟
    const maxMs = 10 * 60 * 1000; // 10分钟
    const countdownMs = Math.floor(Math.random() * (maxMs - minMs) + minMs);

    endTime = now + countdownMs;
    localStorage.setItem(STORAGE_KEY, endTime);
  } else {
    endTime = Number(endTime);
  }

  const timer = setInterval(() => {
    const remaining = endTime - Date.now();

    if (remaining <= 0) {
      clearInterval(timer);
      el.textContent = `00:00:00`;
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    el.textContent =
      `00:` +
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0");
  }, 500);
}
