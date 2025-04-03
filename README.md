# Projet de Gestion des Missions Freelance

## Description
Ce projet consiste à créer une plateforme permettant aux freelances et aux entreprises de gérer les missions de manière efficace. Les utilisateurs peuvent consulter des missions disponibles, postuler à celles-ci et les entreprises peuvent gérer les candidatures reçues. 

Le système inclut une interface utilisateur avec une barre de recherche dynamique pour faciliter la navigation à travers les missions disponibles.

## Fonctionnalités

### Utilisateur (Freelance)
- **Afficher les missions** : Les missions disponibles sont affichées avec des informations détaillées (titre, description, entreprise, rémunération, etc.).
- **Postuler à des missions** : Les freelances peuvent soumettre une candidature avec un message personnalisé.
- **Recherche dynamique** : Utilisation d'une barre de recherche pour filtrer les missions en fonction de critères spécifiques (par exemple, titre, entreprise, etc.).

### Administrateur (Entreprise)
- **Gestion des candidatures** : L'entreprise peut visualiser les candidatures reçues pour chaque mission.
- **Ajout/Modification des missions** : L'entreprise peut publier de nouvelles missions et les gérer depuis le tableau de bord.

## Technologies utilisées
- **Frontend** : HTML, CSS, JavaScript
  - Utilisation de **vanilla JS** pour la gestion dynamique des missions.
  - **CSS** personnalisé pour la mise en page et le style responsive.
- **Backend** : Node.js (optionnel pour gérer les demandes en cas de besoin)
- **Données** : Le projet utilise un fichier `JSON` pour stocker les informations relatives aux missions.

## Installation

### Prérequis
1. Node.js et npm doivent être installés sur votre machine pour faire fonctionner ce projet.

### Étapes d'installation

1. Clonez le repository sur votre machine locale :
   ```bash
   git clone https://github.com/LucasC78/TP-CDA08.git
