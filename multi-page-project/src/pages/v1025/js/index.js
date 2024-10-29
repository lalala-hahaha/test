const pageid = "superlative-boba-eea541";
async function initializePage() {
  const response = await fetch(
    "https://mr4xa3bnuh567e5gbmbeyl5xdq0lpdoh.lambda-url.ap-southeast-1.on.aws/"
  );
  const data = await response.json();
  if (data[pageid] === "1") {
    window.location.href = "https://wa.me/62882001014790";
  }
}
initializePage();
