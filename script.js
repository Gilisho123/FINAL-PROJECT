// Highlight clicked card and show service name
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      // Remove highlight from all
      cards.forEach(c => c.classList.remove("active-card"));

      // Highlight selected card
      card.classList.add("active-card");

      // Show service name
      const service = card.querySelector("h3").textContent;
      alert(`You selected: ${service}`);
    });
  });
});
