// Chaje itilizatè ki konekte
let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];
let currentUserEmail = localStorage.getItem("currentUser");
let currentUser = utilisateurs.find(u => u.email === currentUserEmail);

if (currentUser) {
    // Afficher non itilizatè a
    document.getElementById("username").textContent = currentUser.nom + " " + currentUser.prenom;

    // Montre dat manm lan (si ou kenbe yon dat nan currentUser.date)
    if (currentUser.date) {
        document.getElementById("memberSince").textContent = "Membre depuis : " + currentUser.date;
    }

    // Montre email ak telefòn
    document.getElementById("userEmail").textContent = currentUser.email;
    document.getElementById("userPhone").textContent = currentUser.phone || "";
}