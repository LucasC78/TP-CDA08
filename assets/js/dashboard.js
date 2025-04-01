document.addEventListener("DOMContentLoaded", () => {
    const dashboardBody = document.getElementById("dashboard-body");

    // Charger les missions depuis l'API
    fetch("http://localhost:3000/missions")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors du chargement des missions");
            }
            return response.json();
        })
        .then(data => {
            console.log("Données reçues :", data);  // Afficher les données dans la console

            // Vérification si les missions sont dans un tableau
            if (!Array.isArray(data)) {
                console.error("Erreur : Les missions ne sont pas un tableau.");
                return;
            }

            dashboardBody.innerHTML = ""; // Vider le tableau avant d'insérer de nouvelles lignes

            // Parcours des missions et ajout dans le tableau
            data.forEach(mission => {
                const nombreCandidats = mission.candidatures.length;
                const row = `
                    <tr>
                        <td>${mission.titre}</td>
                        <td>${mission.entreprise}</td>
                        <td>${nombreCandidats}</td>
                        <td>
                            <button onclick='afficherCandidats(${mission.id})'>
                                Voir
                            </button>
                        </td>
                    </tr>
                `;
                dashboardBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error("Erreur lors du chargement des missions :", error);
            dashboardBody.innerHTML = "<tr><td colspan='4'>Erreur lors du chargement des données.</td></tr>";
        });
});

function afficherCandidats(missionId) {
    const candidatsContainer = document.getElementById("candidats-container");
    const missionTitre = document.getElementById("mission-titre");
    const candidatsList = document.getElementById("candidats-list");

    console.log(`Mission ID: ${missionId}`);  // Vérification de l'ID passé

    fetch("http://localhost:3000/missions")
        .then(response => response.json())
        .then(data => {
            console.log("Données des missions:", data);  // Vérification des données

            const mission = data.find(m => m.id === missionId);  // On cherche la mission par ID
            if (mission) {
                missionTitre.textContent = mission.titre;  // On met le titre de la mission
                candidatsList.innerHTML = "";  // Vider la liste des candidats

                if (mission.candidatures.length === 0) {
                    candidatsList.innerHTML = "<tr><td colspan='3'>Aucun candidat pour cette mission.</td></tr>";
                } else {
                    mission.candidatures.forEach((candidat, index) => {
                        const row = `
                            <tr id="candidat-${index}">
                                <td>${candidat.nom}</td>
                                <td>${candidat.email}</td>
                                <td>${candidat.message}</td>
                                <td>
                                    <button onclick="supprimerCandidature(${mission.id}, ${index})">Supprimer</button>
                                </td>
                            </tr>
                        `;
                        candidatsList.innerHTML += row;  // Ajouter le candidat à la liste
                    });
                }

                candidatsContainer.classList.remove("hidden");
            } else {
                candidatsList.innerHTML = "<tr><td colspan='3'>Mission introuvable.</td></tr>";
            }
        })
        .catch(error => {
            console.error("Erreur lors du chargement des candidats :", error);
            candidatsList.innerHTML = "<tr><td colspan='3'>Erreur lors du chargement des candidats.</td></tr>";
        });
}
function fermerCandidats() {
    // Cache le conteneur des candidats
    const candidatsContainer = document.getElementById("candidats-container");
    candidatsContainer.classList.add("hidden");
}

function supprimerCandidature(missionId, index) {
    fetch(`http://localhost:3000/missions/${missionId}/candidatures/${index}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression de la candidature");
        }
        // Si la suppression est réussie, on supprime la ligne du candidat dans l'interface
        const candidatRow = document.getElementById(`candidat-${index}`);
        if (candidatRow) {
            candidatRow.remove();
        }
    })
    .catch(error => {
        console.error("Erreur lors de la suppression de la candidature :", error);
        alert("Erreur lors de la suppression de la candidature.");
    });
}
