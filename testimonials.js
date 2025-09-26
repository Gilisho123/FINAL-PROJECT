// Highlight each testimonial on hover
document.querySelectorAll(".testimonial").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.03)";
    card.style.transition = "0.3s";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
  });
});
