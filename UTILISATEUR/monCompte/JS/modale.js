document.addEventListener("DOMContentLoaded", () => {
    let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Redirection si pa gen moun konekte
    if (!currentUser || !currentUser.email) {
        setTimeout(() => {
            window.location.href = "../connexion/connexion.html";
        }, 50);
        return;
    }

    // DOM eleman
    const usernameEl = document.getElementById("username");
    const userEmailEl = document.getElementById("userEmail");
    const memberSinceEl = document.getElementById("memberSince");

    const editModal = document.getElementById("editModal");
    const passwordModal = document.getElementById("passwordModal");
    const closeBtns = document.querySelectorAll(".modal .close");

    const editForm = document.getElementById("editForm");
    const passwordForm = document.getElementById("passwordForm");

    const editBtn = document.querySelector(".account-info .btn");
    const passwordBtn = document.getElementById("passwordBtn");
    const deleteBtn = document.querySelector(".delete-account .btna");
    const logoutBtn = document.querySelector(".Deconnex .btna1");

    // Fonksyon pou mete ajou DOM
    function updateUserInfo() {
        if(usernameEl) usernameEl.textContent = `${currentUser.nom} ${currentUser.prenom}`;
        if(userEmailEl) userEmailEl.textContent = currentUser.email;
        if(memberSinceEl) memberSinceEl.textContent = `Membre depuis ${currentUser.createdAt || "2025"}`;
    }

    updateUserInfo();

    // Ouvri modal modifye info
    if(editBtn && editModal) {
        alert("Li peze");
        editBtn.addEventListener("click", () => {
            document.getElementById("editNom").value = currentUser.nom;
            document.getElementById("editPrenom").value = currentUser.prenom;
            editModal.style.display = "block";
        });
    }

    // Ouvri modal modpas
    if(passwordBtn && passwordModal) {
        passwordBtn.addEventListener("click", () => {
            passwordModal.style.display = "block";
        });
    }

    // Fèmen modal
    closeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const modal = btn.closest(".modal");
            if(modal) modal.style.display = "none";
        });
    });
    window.addEventListener("click", (e) => {
        if(e.target.classList.contains("modal")) e.target.style.display = "none";
    });

    // Modifye info itilizatè
    if(editForm) {
        editForm.addEventListener("submit", (e) => {
            e.preventDefault();
            currentUser.nom = document.getElementById("editNom").value.trim();
            currentUser.prenom = document.getElementById("editPrenom").value.trim();

            let index = utilisateurs.findIndex(u => u.email === currentUser.email);
            if(index !== -1) {
                utilisateurs[index] = currentUser;
                localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
            }

            updateUserInfo();
            editModal.style.display = "none";
            alert("Informations modifiées avec succès.");
        });
    }

    // Chanje modpas
    if(passwordForm) {
        passwordForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const newPass = document.getElementById("newPassword").value.trim();
            const confirmPass = document.getElementById("confirmPassword").value.trim();

            if(newPass === "" || newPass !== confirmPass) {
                alert("Les mots de passe ne correspondent pas ou sont vides.");
                return;
            }

            currentUser.password = newPass;
            let index = utilisateurs.findIndex(u => u.email === currentUser.email);
            if(index !== -1) {
                utilisateurs[index] = currentUser;
                localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
            }

            passwordForm.reset();
            passwordModal.style.display = "none";
            alert("Mot de passe modifié.");
        });
    }

    // Supprimer kont
    if(deleteBtn) {
        deleteBtn.addEventListener("click", () => {
            if(confirm("Voulez-vous vraiment supprimer ce compte ?")) {
                utilisateurs = utilisateurs.filter(u => u.email !== currentUser.email);
                localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));
                localStorage.removeItem("currentUser");
                alert("Compte supprimé");
                window.location.href = "../inscription/inscription.html";
            }
        });
    }

    // Déconnexion
    if(logoutBtn) {
        alert("Li peze");
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            window.location.href = "../connexion/connexion.html";
        });
    }
});
