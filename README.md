HDM Todo List - Test Technique
## Présentation
Ce projet est une application Todo List composée :

- d'un frontend en React + Vite + TypeScript,

- d'un backend en NestJS,

- avec une base de données MySQL.

L’objectif était de compléter certaines fonctionnalités côté frontend et backend.

Installation et mise en route
Prérequis
Node.js et Yarn installés
Docker (optionnel pour MySQL)
MySQL 5.7 fonctionnel sur la machine locale

Étapes d'installation
Cloner les deux dépôts (frontend et backend) depuis mon GitHub.

## Installer les dépendances dans chaque projet :

- bash
- Copier
- Modifier
- yarn install
- Configurer la base de données :

## Créer une base de données MySQL (nom et identifiants à vérifier dans le fichier .env du backend).

Lancer les migrations Prisma pour créer les tables :

bash
Copier
Modifier
yarn prisma:migrate
Démarrer les projets :

Backend :

bash
Copier
Modifier
yarn start:dev
Frontend :

bash
Copier
Modifier
yarn dev
Fonctionnalités développées
Backend
Implémentation de la création d'une tâche (POST /tasks).

Implémentation de la modification d'une tâche (PATCH /tasks/:id).

Suppression de tâche déjà existante (DELETE /tasks/:id).

*****Frontend*******
Affichage de la liste des tâches (récupérées depuis le backend).

Création d'une tâche (formulaire avec TextField et bouton Ajouter une tâche).

Édition d'une tâche (bouton "Edit", modification du texte, bouton de sauvegarde).

Suppression d'une tâche (bouton corbeille).

***************Gestion des états :****************

Utilisation de useState et useEffect pour gérer les données.

Appels API centralisés via un hook personnalisé useFetch.

************Difficultés rencontrées*******************
Problèmes initiaux de connexion entre le frontend et le backend (résolus en corrigeant l'URL de base dans useFetch).

Problèmes de typage TypeScript sur le backend (corrigés en ajustant les Dto et les paramètres attendus par les UseCases).

Correction d'une erreur où tasks.map échouait car la réponse de l'API n'était pas un tableau → Correction faite en forçant setTasks à recevoir un tableau.

**********Choix techniques*************

Utilisation de TypeScript pour renforcer la robustesse du code et limiter les erreurs de typage.

Utilisation de Prisma ORM pour simplifier la manipulation de la base de données.

Utilisation de Vite pour accélérer le développement frontend avec React.

Utilisation de Material UI pour un design rapide et professionnel des composants.

***************Bonus (Non réalisé / À réaliser si temps supplémentaire)****************

   1.Ajouter une fonctionnalité de marquage d'une tâche comme "complétée"
   2.Ajout d'une pagination pour la liste des tâches.
   3.Gestion des erreurs serveur avec une meilleure UX (messages utilisateurs, etc.).
