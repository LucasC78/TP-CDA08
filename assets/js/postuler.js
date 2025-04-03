document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form-candidature").addEventListener("submit", function(event) {
        event.preventDefault(); 

        const nom = document.getElementById("nom").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        const urlParams = new URLSearchParams(window.location.search);
        const missionId = urlParams.get('missionId'); 

        if (!nom || !email || !message || !missionId) {
            alert("Veuillez remplir tous les champs et vérifier l'ID de la mission.");
            return;
        }

        fetch("http://localhost:3000/postuler", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nom: nom,
                email: email,
                message: message,
                missionId: missionId 
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Candidature envoyée avec succès !");
                window.location.href = "index.html"; 
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