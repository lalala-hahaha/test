const pageid = "effortless-moxie-cde575";
async function initializePage() {
  const response = await fetch(
    "https://mr4xa3bnuh567e5gbmbeyl5xdq0lpdoh.lambda-url.ap-southeast-1.on.aws/"
  );
  const data = await response.json();
  if (data[pageid] === "1") {
    window.location.href = "https://wa.me/62882001014784";
  }
}
initializePage();
