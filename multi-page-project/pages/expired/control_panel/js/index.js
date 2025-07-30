const toggleSwitches = document.querySelectorAll(".toggle-switch");
const statusText = document.getElementById("status");

// 模拟接口获取数据的函数
async function fetchToggleStatus() {
  const response = await fetch(
    "https://mr4xa3bnuh567e5gbmbeyl5xdq0lpdoh.lambda-url.ap-southeast-1.on.aws/"
  );
  const data = await response.json();
  console.log(data);
  return data;
}

// 模拟更新接口的状态函数
async function updateToggleStatus(id, status) {
  let actionValue = status ? "1" : "0";
  // 假设POST请求将开关的当前状态传给后端
  await fetch(
    `https://mr4xa3bnuh567e5gbmbeyl5xdq0lpdoh.lambda-url.ap-southeast-1.on.aws/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pid: id,
        action: actionValue,
      }),
    }
  );
}
// 初始化开关状态
async function initializeToggles() {
  try {
    const data = await fetchToggleStatus();

    toggleSwitches.forEach((toggleSwitch) => {
      const id = toggleSwitch.dataset.id;
      // 根据接口数据设置开关状态
      const status = data[id];
      if (status === "1") {
        toggleSwitch.checked = true;
      } else {
        toggleSwitch.checked = false;
      }

      // 绑定事件监听
      toggleSwitch.addEventListener("change", async () => {
        const status = toggleSwitch.checked;
        statusText.textContent = `Item ${id} is ${status ? "ON" : "OFF"}`;

        // 更新状态到接口
        await updateToggleStatus(id, status);
      });
    });
  } catch (error) {
    console.error("Failed to initialize toggles:", error);
  }
}

// 调用初始化函数
initializeToggles();
