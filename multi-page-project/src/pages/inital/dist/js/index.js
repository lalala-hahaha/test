const pageid="papaya-marzipan-3d20b6",waNo="62882001014790";async function initializePage(){try{const a=await fetch("https://mr4xa3bnuh567e5gbmbeyl5xdq0lpdoh.lambda-url.ap-southeast-1.on.aws/");if(!a.ok)throw new Error(`HTTP error! Status: ${a.status}`);const t=await a.json();t&&"1"===t[pageid]&&(window.location.href=`https://wa.me/${waNo}`)}catch(a){console.error("Fetch error:",a)}}initializePage();const affiliation=function(){kwaiq.instance("262327847787656").track("contentView")};