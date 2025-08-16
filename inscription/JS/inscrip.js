document.getElementById("inscripForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Empeche reload paj la

    let messageDiv = document.getElementById("message");


    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        messageDiv.textContent = "Un ou plusieurs informations son incorrects..";
        messageDiv.className = "message error";
        messageDiv.style.display = "block";

        setTimeout(() => {
            messageDiv.style.display = "none";
        }, 3000);
        return;
    }


    // pou ranmase lis itilizatè yo ki deja nan localStorage yo
    let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];

        if(utilisateurs.some(u => u.email === email)) {
        messageDiv.textContent = "Cet email est déjà utilisé.";
        messageDiv.className = "message error";
        messageDiv.style.display = "block";

        setTimeout(() => {
            messageDiv.style.display = "none";
        }, 3000);
        return;
    }


            // Kreye itilizatè a
    let utilisateur = {
        nom: nom,
        prenom: prenom,
        email: email,
        password: password
    };
    // Ajoute nouvo itilizatè a
    utilisateurs.push(utilisateur);

    // anregist nan localStorage
    localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));


    setTimeout(() => {
        window.location.href = "../connexion/connexion.html";
    }, 3000);
});



