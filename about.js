// Simple animation for heading
document.addEventListener("DOMContentLoaded", () => {
  const heading = document.querySelector("h2");
  heading.style.opacity = 0;
  heading.style.transition = "opacity 1.5s";
  setTimeout(() => heading.style.opacity = 1, 300);
});
