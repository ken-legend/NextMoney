document.getElementById("connexionForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const messageDiv = document.getElementById("loginMessage");

    const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];

    const utilisateur = utilisateurs.find(user => user.email === email && user.password === password);

    if(utilisateur) {

        localStorage.setItem("utilisateurConnecte", JSON.stringify(utilisateur));
localStorage.setItem("utilisateurActif", JSON.stringify(utilisateur));
        


        setTimeout(() => {
            window.location.href = "../UTILISATEUR/accueil.html"; 
        }, 2000);

    } else {
        // Mesaj erè sou paj la
        messageDiv.textContent = "Email ou mot de passe incorrect. Réesayer!!";
        messageDiv.className = "message error";
        messageDiv.style.display = "block";

        // pou fè mesaj la disparèt apre 3 segond
        setTimeout(() => {
            messageDiv.style.display = "none";
        }, 3000);
    }
});
