const pageid = "effortless-moxie-cde575";
const waNo = "85261927693";
async function initializePage() {
  try {
    const response = await fetch(
      "https://mr4xa3bnuh567e5gbmbeyl5xdq0lpdoh.lambda-url.ap-southeast-1.on.aws/"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (data && data[pageid] === "1") {
      window.location.href = `https://wa.me/${waNo}`;
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
initializePage();
const affiliation = function () {
  if (kwaiq) {
    kwaiq.instance("262327847787656").track("contentView");
  }
};