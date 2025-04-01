const express = require('express');
const cors = require('cors');  // Import du module CORS
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Autoriser toutes les origines (à ajuster si nécessaire pour des raisons de sécurité)
app.use(cors());
// Utiliser express.json pour parser le corps de la requête en JSON
app.use(express.json());


// Simuler une base de données en mémoire
let missions = require('./data/missions.json');

// Middleware pour servir le fichier JSON avec les missions
const missionsData = require('./data/missions.json');

app.get('/missions', (req, res) => {
    res.json(missionsData.missions);
});


// Suppression d'une candidature spécifique d'une mission
app.delete('/missions/:missionId/candidatures/:index', (req, res) => {
    const { missionId, index } = req.params;

    // Charger les missions depuis le fichier JSON
    fs.readFile('data/missions.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur de lecture du fichier JSON:', err);
            return res.status(500).send('Erreur serveur');
        }

        // Parse le fichier JSON
        const jsonData = JSON.parse(data);

        // Trouver la mission correspondante
        const mission = jsonData.missions.find(m => m.id == missionId);
        if (!mission) {
            return res.status(404).send('Mission introuvable');
        }

        // Convertir l'index en entier
        const candidateIndex = parseInt(index, 10);

        // Vérifier si l'index est valide
        if (candidateIndex < 0 || candidateIndex >= mission.candidatures.length) {
            return res.status(404).send('Candidat introuvable');
        }

        // Supprimer la candidature
        mission.candidatures.splice(candidateIndex, 1);

        // Sauvegarder les missions mises à jour dans le fichier JSON
        fs.writeFile('data/missions.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Erreur d\'écriture du fichier JSON:', err);
                return res.status(500).send('Erreur serveur lors de la mise à jour des données');
            }

            // Répondre avec succès
            res.status(200).send('Candidature supprimée');
        });
    });
});



// Route POST pour la soumission de la candidature
app.post('/postuler', (req, res) => {
    const { nom, email, message, missionId } = req.body;

    if (!nom || !email || !message || !missionId) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    // Chercher la mission correspondante
    const mission = missionsData.missions.find(m => m.id == missionId);

    if (!mission) {
        return res.status(404).json({ error: "Mission non trouvée" });
    }

    // Ajouter la candidature à la mission
    const newCandidature = {
        id: new Date().getTime().toString(),
        nom,
        email,
        message
    };

    mission.candidatures.push(newCandidature);

    // Sauvegarder la mise à jour dans le fichier
    fs.writeFile(path.join(__dirname, 'data', 'missions.json'), JSON.stringify(missionsData, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la sauvegarde des données" });
        }
        res.status(200).json({ success: true, message: "Candidature envoyée avec succès !" });
    });
});
// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
