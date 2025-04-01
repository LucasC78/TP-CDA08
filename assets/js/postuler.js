document.addEventListener("DOMContentLoaded", function() {
    // Formulaire de candidature
    document.getElementById("form-candidature").addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        // Récupérer les valeurs du formulaire
        const nom = document.getElementById("nom").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Récupérer l'ID de la mission depuis l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const missionId = urlParams.get('missionId'); // Récupérer le paramètre 'missionId'

        // Vérifier si les valeurs sont valides
        if (!nom || !email || !message || !missionId) {
            alert("Veuillez remplir tous les champs et vérifier l'ID de la mission.");
            return;
        }

        // Envoi de la requête POST pour soumettre la candidature
        fetch("http://localhost:3000/postuler", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nom: nom,
                email: email,
                message: message,
                missionId: missionId // Ajouter l'ID de la mission dans la requête
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Candidature envoyée avec succès !");
                window.location.href = "index.html"; // Redirection après soumission
            } else {
                alert("Une erreur est survenue lors de l'envoi de la candidature.");
            }
        })
        .catch(error => {
            console.error("Erreur lors de la soumission de la candidature:", error);
            alert("Une erreur s'est produite.");
        });
    });
});