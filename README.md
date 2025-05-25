# Organiz’asso

Organiz’asso est une plateforme web permettant aux membres d’une association de communiquer via des forums, avec un système de gestion des utilisateurs et des rôles (membres et administrateurs). Le site est construit avec **React** pour le frontend et **MongoDB** pour la base de données, avec une architecture en deux répertoires : `client/` (frontend) et `server/` (backend).

## 🔧 Technologies utilisées

- **Frontend** : React, JavaScript, Axios, CSS
- **Backend** : Node.js, Express, MongoDB (via Mongoose), JWT (authentification)
- **Base de données** : MongoDB
- **Outils** : Postman, Git

## 📁 Structure du projet

```
Organizasso/
├── client/           # Application React (frontend)
│   └── ...
├── server/           # Application Express (backend)
│   └── ...
└── README.md
```

## 🧩 Fonctionnalités principales

### ✅ Non connecté

- Créer un compte (demande d’inscription en attente de validation)
- Se connecter

### 🧑 Membre (après validation)

- Accéder au forum ouvert
- Créer un nouveau message ou répondre à un message existant
- Rechercher des messages (par mots-clés, auteur, ou période)
- Consulter son profil (liste des messages publiés)
- Supprimer ses propres messages
- Consulter le profil d’autres membres
- Se déconnecter

### 🛡️ Administrateur

- Accès au forum fermé
- Valider ou refuser les inscriptions des nouveaux membres
- Promouvoir ou rétrograder d’autres utilisateurs au statut d’administrateur (sauf lui-même)
- Toutes les actions possibles pour un membre

## ⚙️ Installation locale

### 1. Cloner le dépôt

```bash
git clone https://github.com/ton-pseudo/organizasso.git
cd organizasso
```

### 2. Installation du serveur

```bash
cd server
npm install
```

Créer un fichier `.env` dans le dossier `server` avec les variables suivantes :

```
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_secret_key
```

Lancer le backend :

```bash
npm run dev
```

### 3. Installation du client

```bash
cd ../client
npm install
npm start
```

Le client est lancé sur `http://localhost:3000` et communique avec le serveur (port 5000 par défaut).

## ✍️ Auteurs

- Projet réalisé dans le cadre d’un cours universitaire
- Développé par [Votre Nom ou Équipe]

## 📜 Licence

Ce projet est sous licence MIT.
