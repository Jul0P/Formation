# Anime API - Mini Exo

API REST de gestion d'animes avec système de recherche avancé. Développé en TypeScript avec Express et MongoDB.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 🚀 Installation et Démarrage

### Prérequis

- **Node.js** 18+ installé
- **MongoDB** en cours d'exécution (Docker ou local)
- **npm** ou **yarn**

### Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd Formation/EFREI/Conception_Back_End/miniexo

# Installer les dépendances
npm install
```

---

## ⚙️ Configuration

### 1. Créer le fichier `.env`

Créer un fichier `.env` à la racine du projet :

```env
MONGO_URI=mongodb://localhost:27017/anime-db
```

### 2. Démarrer MongoDB (avec Docker)

```bash
# Lancer MongoDB
docker run --name miniexo -p 27017:27017 -d mongodb/mongodb-community-server:latest

# Lancer Mongo Express (interface graphique)
docker run --name mongo-express --link miniexo:mongo -p 8081:8081 -e ME_CONFIG_MONGODB_URL="mongodb://mongo:27017/" -d mongo-express
```

**Accès à Mongo Express** : http://localhost:8081

- **Username** : `admin`
- **Password** : `pass`

---

## 🎯 Démarrage

### Mode développement (avec hot reload)

```bash
npm run dev
```

Le serveur démarre sur **http://localhost:3000**

---

## 🏗️ Architecture du Projet

```
miniexo/
├── src/
│   ├── server.ts                      # Point d'entrée du serveur
│   ├── config/
│   │   └── database.ts                # Configuration MongoDB (Singleton)
│   ├── models/                        # Modèles Mongoose
│   │   └── Anime.ts                   # Schéma Anime + Interface
│   ├── types/                         # Types et interfaces TypeScript
│   │   └── index.ts                   # Interface IAnime
│   ├── services/                      # Logique métier (POO)
│   │   └── AnimeService.ts            # Classe avec méthodes métiers
│   ├── controllers/                   # Orchestration requêtes/réponses
│   │   └── AnimeController.ts         # Routes /animes
│   ├── routes/                        # Définition des routes
│   │   └── animeRoutes.ts             # Routes Express
│   └── views/                         # Vues EJS (sans CSS)
│       ├── layout.ejs                 # Layout principal
│       ├── index.ejs                  # Page d'accueil
│       └── animes/
│           ├── index.ejs              # Liste des animes
│           ├── show.ejs               # Détail d'un anime
│           ├── new.ejs                # Formulaire de création
│           └── search.ejs             # Formulaire de recherche
├── package.json                       # Dépendances du projet
├── tsconfig.json                      # Configuration TypeScript
└── .env                               # Variables d'environnement
```

---

## 📡 API Endpoints

### Animes

| Méthode | Endpoint             | Description                                   |
| ------- | -------------------- | --------------------------------------------- |
| POST    | `/api/animes`        | Créer un anime                                |
| GET     | `/api/animes/:id`    | Récupérer un anime par ID                     |
| GET     | `/api/animes`        | Liste paginée des animes                      |
| GET     | `/api/animes/search` | Recherche avancée (keyword, genre, status...) |

### Vues HTML

| Méthode | Endpoint         | Description              |
| ------- | ---------------- | ------------------------ |
| GET     | `/`              | Page d'accueil           |
| GET     | `/animes`        | Liste des animes (HTML)  |
| GET     | `/animes/:id`    | Détail d'un anime (HTML) |
| GET     | `/animes/search` | Formulaire de recherche  |
