document.addEventListener("DOMContentLoaded", async () => {
    const searchInput = document.getElementById("search");
    const missionsContainer = document.getElementById("missions-container");

    try {

        const response = await fetch("data/missions.json");
        const data = await response.json();
        const missions = data.missions;

        function displayMissions(filteredMissions) {
            missionsContainer.innerHTML = "";
            filteredMissions.forEach(mission => {
                const card = document.createElement("div");
                card.classList.add("mission-card");
                card.innerHTML = `
                    <h3 class="mission-title">${mission.titre}</h3>
                    <p class="mission-details">${mission.description}</p>
                    <p class="mission-details"><strong>Entreprise :</strong> ${mission.entreprise}</p>
                `;
                missionsContainer.appendChild(card);
            });
        }

        searchInput.addEventListener("input", () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredMissions = missions.filter(mission =>
                mission.titre.toLowerCase().includes(searchTerm)
            );
            displayMissions(filteredMissions);
        });

        displayMissions(missions);
    } catch (error) {
        console.error("Erreur lors du chargement des missions :", error);
    }
});
