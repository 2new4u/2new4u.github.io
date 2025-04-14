async function fetchFacts() {
  try {
    const file = await fetch("data/otters.json");
    const facts = await file.json();
    const otterParagraph = document.querySelector("#otterFact");

    if (facts.length > 0) {
      const randomIndex = Math.floor(Math.random() * facts.length);
      const randomFact = facts[randomIndex];
      otterParagraph.textContent = randomFact;
    } else {
      otterParagraph.textContent = "No facts available.";
    }
  } catch (error) {
    console.error(
      "Error fetching information from json file. Please check if the file exists and has the proper format",
      error
    );
  }
}

document.addEventListener("DOMContentLoaded", fetchFacts);
