document.addEventListener("DOMContentLoaded", () => {
    // Récupère l'utilisateur actif
    let utilisateurActif = JSON.parse(localStorage.getItem("utilisateurActif"));
    let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];

    if (!utilisateurActif) {
        // Si pa gen moun konekte, retounen sou connexion
        window.location.href = "../connexion/connexion.html";
        return;
    }

    // --- Affichage des infos ---
    document.getElementById("username").textContent = utilisateurActif.prenom + " " + utilisateurActif.nom;
    document.getElementById("userEmail").textContent = utilisateurActif.email;

    // --- Modifier les infos (nom, prénom) ---
    const editForm = document.getElementById("editForm");
    if (editForm) {
        editForm.addEventListener("submit", function(e) {
            e.preventDefault();
            let newNom = document.getElementById("editNom").value;
            let newPrenom = document.getElementById("editPrenom").value;

            // Mettre à jour utilisateurActif
            utilisateurActif.nom = newNom;
            utilisateurActif.prenom = newPrenom;

            // Mettre à jour la liste globale
            utilisateurs = utilisateurs.map(u => 
                u.email === utilisateurActif.email ? utilisateurActif : u
            );

            // Sauvegarder
            localStorage.setItem("utilisateurActif", JSON.stringify(utilisateurActif));
            localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));

            alert("Informations modifiées avec succès ✅");
            location.reload();
        });
    }

    // --- Changer mot de passe ---
    const passwordForm = document.getElementById("passwordForm");
    if (passwordForm) {
        passwordForm.addEventListener("submit", function(e) {
            e.preventDefault();
            let newPass = document.getElementById("newPassword").value;
            let confirmPass = document.getElementById("confirmPassword").value;

            if (newPass !== confirmPass) {
                alert("Les mots de passe ne correspondent pas ❌");
                return;
            }

            utilisateurActif.password = newPass;
            utilisateurs = utilisateurs.map(u => 
                u.email === utilisateurActif.email ? utilisateurActif : u
            );

            localStorage.setItem("utilisateurActif", JSON.stringify(utilisateurActif));
            localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));

            alert("Mot de passe modifié ✅");
            document.getElementById("passwordForm").reset();
        });
    }

    // --- Supprimer compte ---
    const deleteBtn = document.querySelector(".delete-account .btna");
    if (deleteBtn) {
        deleteBtn.addEventListener("click", () => {
            if (confirm("Voulez-vous vraiment supprimer votre compte ?")) {
                utilisateurs = utilisateurs.filter(u => u.email !== utilisateurActif.email);
                localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));
                localStorage.removeItem("utilisateurActif");
                alert("Compte supprimé ❌");
                window.location.href = "../index.html";
            }
        });
    }

    // --- Déconnexion ---
    const logoutBtn = document.querySelector(".Deconnex .btna1");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("utilisateurActif");
            window.location.href = "../connexion/connexion.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // --- Ranmase done nan localStorage ---
    let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

    // Si pa gen moun konekte, redirije sou connexion
    if (!currentUser) {
        window.location.href = "../connexion/connexion.html";
        return;
    }

    // --- Afichaj ---
    document.getElementById("username").textContent = currentUser.nom + " " + currentUser.prenom;
    document.getElementById("userEmail").textContent = currentUser.email;
    document.querySelector(".account-info span[id='']").textContent = currentUser.nom + " " + currentUser.prenom;
    document.getElementById("memberSince").textContent = "Membre depuis " + (currentUser.createdAt || "2025");

    // --- Modal jere ---
    let editModal = document.getElementById("editModal");
    let passwordModal = document.getElementById("passwordModal");
    let closeBtns = document.querySelectorAll(".modal .close");

    // Bouton ouvri modal modifye
    document.querySelector(".account-info .btn").addEventListener("click", () => {
        document.getElementById("editNom").value = currentUser.nom;
        document.getElementById("editPrenom").value = currentUser.prenom;
        editModal.style.display = "block";
    });

    // Bouton ouvri modal password
    document.getElementById("passwordBtn").addEventListener("click", () => {
        passwordModal.style.display = "block";
    });

    // Bouton fèmen modal
    closeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest(".modal").style.display = "none";
        });
    });

    // Fèmen modal si klike deyò
    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal")) {
            e.target.style.display = "none";
        }
    });

    // --- Form pou modifye infos ---
    document.getElementById("editForm").addEventListener("submit", function (e) {
        e.preventDefault();
        currentUser.nom = document.getElementById("editNom").value;
        currentUser.prenom = document.getElementById("editPrenom").value;

        // Mete ajou nan localStorage
        let index = utilisateurs.findIndex(u => u.email === currentUser.email);
        if (index !== -1) {
            utilisateurs[index] = currentUser;
            localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        }

        // Rafrechi afichaj
        document.getElementById("username").textContent = currentUser.nom + " " + currentUser.prenom;
        document.querySelector(".account-info span[id='']").textContent = currentUser.nom + " " + currentUser.prenom;

        editModal.style.display = "none";
    });

    // --- Form pou chanje mot de pase ---
    document.getElementById("passwordForm").addEventListener("submit", function (e) {
        e.preventDefault();
        let newPass = document.getElementById("newPassword").value;
        let confirmPass = document.getElementById("confirmPassword").value;

        if (newPass !== confirmPass) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        currentUser.password = newPass;

        let index = utilisateurs.findIndex(u => u.email === currentUser.email);
        if (index !== -1) {
            utilisateurs[index] = currentUser;
            localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        }

        passwordModal.style.display = "none";
        alert("Mot de passe changé avec succès !");
    });

    // --- Supprimer kont ---
    document.querySelector(".delete-account .btna").addEventListener("click", () => {
        if (confirm("Voulez-vous vraiment supprimer ce compte ?")) {
            utilisateurs = utilisateurs.filter(u => u.email !== currentUser.email);
            localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));
            localStorage.removeItem("currentUser");
            window.location.href = "../inscription/inscription.html";
        }
    });

    // --- Déconnexion ---
    document.querySelector(".Deconnex .btna1").addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.href = "../connexion/connexion.html";
    });
});
