const pageId = "elaborate-semolina-f0becb";
const targetPlatform = "FB";

// 获取 WA 链接列表
async function fetchWaLinks(targetList) {
  try {
    const response = await fetch(
      "https://wjqicpjvr34cvmzucfiocae3ie0irrxb.lambda-url.ap-southeast-1.on.aws/",
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
async function finalLinks() {
  try {
    const { contactNo } = await fetchWaLinks(targetPlatform);

    if (contactNo) {
      const contactEle = document.getElementById("contact-no");
      if (contactEle) contactEle.innerText = contactNo;
    }
  } catch (error) {
    console.error("finalLinks error:", error);
  }
}

// 绑定按钮点击事件
function bindButtonEvents() {
  const sexMaleButton = document.getElementById("sex-male");
  const sexFemaleButton = document.getElementById("sex-female");
  if (sexMaleButton) {
    sexMaleButton.addEventListener("click", () => {
      document.getElementById("page-sex").style.display = "none";
      document.getElementById("page-thank").style.display = "flex";
      fbq("track", "B_male");
    });
  }
  
  if(sexFemaleButton){
    sexFemaleButton.addEventListener("click", () => {
      console.log('目标用户，联系客服')
      fbq("track", "Lead", { event_source_url: window.location.href });
      fbq("track", "B_welcome");
    });
  }
}

// 页面初始化逻辑
function initialize() {
  finalLinks();
  bindButtonEvents();
  // zc("config",{
  //   custom:true, //设置自定义生效 第二步
  //   locale:"id", //id-印尼语，en-英文，cn-简体中文，tw-繁体中文（默认简体中文）
  //   type: 4, // 客服接待模式 1仅机器人客服 2仅人工客服 3机器人客服优先 4人工客服优先
  //   msg_flag: '0', // 结束会话后是否显示留言入口 1关闭 0开启
  //   photo_flag: '1', // 上传附件按钮 仅H5 1开启 0关闭
  //   source: '4', // 来源 0:桌面网站,1:微信,2:APP,3:微博,4:移动网站,9：企业微信,10：微信小程序
  //   tip_title: '', // 邀请文案
  //   submit_title: '',// 接受邀请按钮
  //   expand_size: 'half',// 规定在H5侧，聊天组件弹出高度。half为半屏，full为全屏，默认为全屏
  // })
}

// 等待 DOM 加载完成后初始化
document.addEventListener("DOMContentLoaded", initialize);
