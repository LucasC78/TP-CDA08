document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/missions")  
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          const missionsContainer = document.getElementById("missions-container");
  
          // Parcours des missions et création des cartes
          data.forEach(mission => {
            const missionCard = document.createElement("div");
            missionCard.classList.add("mission-card");
            missionCard.innerHTML = `
              <h3>${mission.titre}</h3>
              <p>${mission.description}</p>
              <p><strong>Entreprise :</strong> ${mission.entreprise}</p>
              <p><strong>Compétences :</strong> ${mission.competences.join(", ")}</p>
              <p><strong>Rémunération :</strong> ${mission.remuneration}</p>
              <a class="btn-postuler" href="postuler.html?missionId=${mission.id}" class="btn">Postuler</a>
            `;
            missionsContainer.appendChild(missionCard);
          });
        } else {
          console.error("La réponse de l'API n'est pas un tableau.");
        }
      })
      .catch(error => console.error("Erreur lors du chargement des missions :", error));
  });
  