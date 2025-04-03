document.addEventListener("DOMContentLoaded", () => {
    const dashboardBody = document.getElementById("dashboard-body");

    fetch("http://localhost:3000/missions")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors du chargement des missions");
            }
            return response.json();
        })
        .then(data => {
            console.log("Données reçues :", data);  

            if (!Array.isArray(data)) {
                console.error("Erreur : Les missions ne sont pas un tableau.");
                return;
            }

            dashboardBody.innerHTML = ""; 

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

    console.log(`Mission ID: ${missionId}`);  

    fetch("http://localhost:3000/missions")
        .then(response => response.json())
        .then(data => {
            console.log("Données des missions:", data);  

            const mission = data.find(m => m.id === missionId);  
            if (mission) {
                missionTitre.textContent = mission.titre;  
                candidatsList.innerHTML = "";  

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
                        candidatsList.innerHTML += row;  
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
