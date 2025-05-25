# Organiz’asso

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

### 1. Cloner le dépôt :

```bash
git clone https://github.com/ton-pseudo/organizasso.git
cd organizasso
```

### 2. Configuration du serveur :

```bash
cd serveur
npm start
```

### 3. Lancer le frontend :

```bash
cd client
npm run dev
```
