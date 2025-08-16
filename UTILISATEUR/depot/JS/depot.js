const methods = document.querySelectorAll('.method-item');
const formContainer = document.getElementById('form-container');

methods.forEach(method => {
    method.addEventListener('click', () => {
        const type = method.dataset.method;
        let htmlForm = '';

        if (type === 'virement') {
            htmlForm = `
                <h3>Virement Bancaire</h3>
                <input type="text" placeholder="Nom de la banque" id="bankName">
                <input type="text" placeholder="Titulaire du compte" id="accountHolder">
                <input type="text" placeholder="Numéro de compte" id="accountNumber">
                <input type="number" placeholder="Montant" id="amount">
                <button onclick="submitDeposit('Virement Bancaire')">Effectuer le dépôt</button>
            `;
        } else if (type === 'carte') {
            htmlForm = `
                <h3>Carte Bancaire</h3>
                <input type="text" placeholder="Nom sur la carte" id="cardHolder">
                <input type="text" placeholder="Numéro de carte" id="cardNumber">
                <input type="number" placeholder="Montant" id="amount">
                <button onclick="submitDeposit('Carte Bancaire')">Effectuer le dépôt</button>
            `;
        } else if (type === 'moncash') {
            htmlForm = `
                <h3>MonCash</h3>
                <input type="text" placeholder="Numéro de téléphone" id="phoneNumber">
                <input type="text" placeholder="Nom complet" id="fullName">
                <input type="number" placeholder="Montant" id="amount">
                <button onclick="submitDeposit('MonCash')">Effectuer le dépôt</button>
            `;
        } else if (type === 'natcash') {
            htmlForm = `
                <h3>NatCash</h3>
                <input type="text" placeholder="Numéro de téléphone" id="phoneNumber">
                <input type="text" placeholder="Nom complet" id="fullName">
                <input type="number" placeholder="Montant" id="amount">
                <button onclick="submitDeposit('NatCash')">Effectuer le dépôt</button>
            `;
        } else if (type === 'p2p') {
            htmlForm = `
                <h3>P2P</h3>
                <input type="text" placeholder="Identifiant du destinataire" id="recipientId">
                <input type="number" placeholder="Montant" id="amount">
                <button onclick="submitDeposit('P2P')">Effectuer le dépôt</button>
            `;
        }

        formContainer.innerHTML = htmlForm;
        formContainer.style.display = 'block';
    });
});

function submitDeposit(method) {
    alert(method + " effectué !");
}
