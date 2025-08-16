const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme");

  // Changer l’icône
  if (body.classList.contains("dark-theme")) {
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }

  // Sauvegarde dans le localStorage
  localStorage.setItem("theme", body.classList.contains("dark-theme") ? "dark" : "light");
});

// Charger le thème sauvegardé
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.classList.remove("light-theme", "dark-theme");
  body.classList.add(`${savedTheme}-theme`);
  toggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}
