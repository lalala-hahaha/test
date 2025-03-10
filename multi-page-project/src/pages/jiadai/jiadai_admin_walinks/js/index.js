const pageId = "moonlit-blancmange-1b9078";
// 获取按钮和 textarea 元素
const submitDefault = document.getElementById("submit-default");
const newlistDefault = document.getElementById("newlist-default");

// 为按钮添加点击事件监听器
submitDefault.addEventListener("click", function () {
  submitNewList(newlistDefault, "default");
});

const submitNewList = function (targetInput, targetList) {
  // 获取 textarea 中的值
  const value = targetInput.value;
  if (value) {
    const newValue = value.replace(/\s+/g, "");

    let regex = /http/i; // "i" 表示忽略大小写
    if (regex.test(newValue)) {
      console.log(newValue);
      fetchWaLinks("setList", newValue, targetList);
      setTimeout(() => {
        initializeToggles();
      }, 3000);
    } else {
      alert("请输入正确的网址");
    }
  }
};

const dflist = document.getElementById("df-list");
const inseList = function (ele, dataList) {
  ele.innerHTML = "";
  // 遍历数组，并将每个元素作为新的列表项插入
  dataList.forEach((item) => {
    const li = document.createElement("li"); // 创建一个 li 元素

    // 创建一个 a 元素，并设置链接的文本和 URL
    const a = document.createElement("a");
    a.textContent = item; // 设置链接的文本内容
    a.href = item; // 设置链接的 URL
    a.target = "_blank"; // 设置新标签页打开链接

    // 将 a 元素添加到 li 中
    li.appendChild(a);

    // 将 li 元素添加到 ul 中
    ele.appendChild(li);
  });
};
// 获取当前wa列表
async function fetchWaLinks(action, newListValue, targetList) {
  const response = await fetch(
    `https://5ddg43joymslsgw6f6gq4cumhi0oknjl.lambda-url.ap-southeast-1.on.aws/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: action,
        newdata: newListValue,
        target: targetList,
      }),
    }
  );
  const data = await response.json();
  return data;
}

// 初始化函数
async function initializeToggles() {
  try {
    const data = await fetchWaLinks("getList", null);
    if (data?.links) {
      inseList(dflist, data.links);
    }
  } catch (error) {
    console.error("Failed to initialize toggles:", error);
  }
}

// 调用初始化函数
initializeToggles();
