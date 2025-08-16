document.getElementById("connexionForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageDiv = document.getElementById("loginMessage");

    const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];

    const utilisateur = utilisateurs.find(user => user.email === email && user.password === password);

    if(utilisateur) {
        // Sove itilizatè a nan yon sèl kle: currentUser
        localStorage.setItem("currentUser", JSON.stringify(utilisateur));

        messageDiv.textContent = "Connexion réussie ✅ Redirection...";
        messageDiv.className = "message success";
        messageDiv.style.display = "block";

        setTimeout(() => {
            window.location.href = "../UTILISATEUR/accueil.html"; 
        }, 1500);

    } else {
        messageDiv.textContent = "Email ou mot de passe incorrect. Réessayer!!";
        messageDiv.className = "message error";
        messageDiv.style.display = "block";

        setTimeout(() => {
            messageDiv.style.display = "none";
        }, 3000);
    }
});
