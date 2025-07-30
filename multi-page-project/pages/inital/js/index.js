

const pageid = "papaya-marzipan-3d20b6";
async function initializePage() {
  try {
    const response = await fetch(
      "https://mr4xa3bnuh567e5gbmbeyl5xdq0lpdoh.lambda-url.ap-southeast-1.on.aws/"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data[pageid]);
    (function (w, d, e, x) {
      w[e] = function () {
        w.cbk = w.cbk || [];
        w.cbk.push(arguments);
      };
      x = d.createElement("script");
      x.async = true;
      x.id = "zhichiScript";
      x.className = "btn";
      x.src = "https://sg.sobot.com/chat/frame/v6/entrance.js?sysnum=0609ebe3231142b8a815d7bd1831d3f3";
      d.body.appendChild(x);
    })(window, document, "zc");
    if (data && data[pageid] === "1") {
      zc("config", {
        cardTrigger: 1,
        type: 1,
        custom: true,
        man_trace: true,
        auto_expand: true,
        custom_title:"welcome",
        guide_flag: "1"
      });
    }else{
      zc("config", {
        cardTrigger: 1,
        type: 1,
        custom: true,
        man_trace: true,
        auto_expand: false,
        custom_title:"welcome",
        guide_flag: "1"
      });
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
initializePage();
