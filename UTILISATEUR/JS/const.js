const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    sidebar.classList.toggle('open');
});

// Fermer le menu si on clique ailleurs
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('open');
        sidebar.classList.remove('open');
    }
});
