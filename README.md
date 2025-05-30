------------------------------------------------------------
  HDM Todo List - Test Technique
-------------------------------------------------------------
## Présentation
Ce projet est une application Todo List composée :

- d'un frontend en React + Vite + TypeScript,

- d'un backend en NestJS,

- avec une base de données MySQL.

L’objectif était de compléter certaines fonctionnalités côté frontend et backend.

## Installation et mise en route
Prérequis
- Node.js et Yarn installés
- Docker (optionnel pour MySQL)
- MySQL 5.7 fonctionnel sur la machine locale

## Étapes d'installation
1. Cloner les deux dépôts (frontend et backend) depuis mon GitHub.

2. Installer les dépendances dans chaque projet :

       bash
       yarn install
  
3. Configurer la base de données :

Créer une base de données MySQL (nom et identifiants à vérifier dans le fichier .env du backend).

4.Migration de la base de données
    
    npx prisma migrate dev --create-only
    npx prisma migrate dev

  
5. Démarrer les projets :

   - Backend :

         yarn start

   - Frontend :

         yarn dev

## Fonctionnalités développées
Backend
 - Implémentation de la création d'une tâche (POST /tasks).
 - Implémentation de la modification d'une tâche (PATCH /tasks/:id).
 - Suppression de tâche déjà existante (DELETE /tasks/:id).

Frontend
 - Affichage de la liste des tâches (récupérées depuis le backend).
 - Création d'une tâche (formulaire avec TextField et bouton Ajouter une tâche).
 - Édition d'une tâche (bouton "Edit", modification du texte, bouton de sauvegarde).
 - Suppression d'une tâche (bouton corbeille).



## Difficultés rencontrées

- Problèmes de typage TypeScript sur le backend (corrigés en ajustant les Dto et les paramètres attendus par les UseCases).
- Correction d'une erreur où tasks.map échouait car la réponse de l'API n'était pas un tableau → Correction faite en forçant setTasks à recevoir un tableau.

## Choix techniques

- Utilisation de Vite pour accélérer le développement frontend avec React.


## Bonus (Non réalisé / À réaliser si temps supplémentaire)

   - Ajouter une fonctionnalité de marquage d'une tâche comme "complétée"
   
   - Ajout d'une pagination pour la liste des tâches.
   
   - Gestion des erreurs serveur avec une meilleure UX (messages utilisateurs, etc.).
