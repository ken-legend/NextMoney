// Ranmase lis itilizatè yo nan localStorage
let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];
let currentUserEmail = localStorage.getItem("currentUser");

// Jwenn itilizatè ki konekte a
let currentUser = utilisateurs.find(u => u.email === currentUserEmail);

if (currentUser) {
    // Ranpli chan yo ak done aktyèl
    document.getElementById("editNom").value = currentUser.nom;
    document.getElementById("editPrenom").value = currentUser.prenom;
    document.getElementById("editEmail").value = currentUser.email;
    document.getElementById("editPhone").value = currentUser.phone || "";
}

// Jere submit
document.getElementById("editForm").addEventListener("submit", (e) => {
    e.preventDefault();

    // Ranpli nouvo done yo
    currentUser.nom = document.getElementById("editNom").value;
    currentUser.prenom = document.getElementById("editPrenom").value;
    currentUser.email = document.getElementById("editEmail").value;
    currentUser.phone = document.getElementById("editPhone").value;

    // Tcheke si email deja itilize pa yon lòt
    let index = utilisateurs.findIndex(u => u.email === currentUserEmail);
    let emailExists = utilisateurs.some((u, i) => u.email === currentUser.email && i !== index);

    if (emailExists) {
        alert("Cet email est déjà utilisé !");
        return;
    }

    // Mete ajou nan lis la
    utilisateurs[index] = currentUser;
    localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));

    // Mete ajou currentUser nan localStorage
    localStorage.setItem("currentUser", currentUser.email);

    alert("Informations mises à jour !");
    window.location.href = "monCompte.html"; // retounen sou paj kont lan
});
