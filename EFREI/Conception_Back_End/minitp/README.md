# 🎮 Pokémon Battle API - Mini TP

API REST de gestion de combats Pokémon avec système de dresseurs, d'attaques et d'arènes. Développé en TypeScript avec Express et PostgreSQL.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

---

## 🚀 Installation et Démarrage

### Prérequis

- **Node.js** 18+ installé
- **PostgreSQL** 14+ installé et démarré
- **npm** ou **yarn**

### Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd Formation/EFREI/Conception_Back_End/minitp

# Installer les dépendances
npm install
```

---

## ⚙️ Configuration

### 1. Créer le fichier `.env`

Créer un fichier `.env` à la racine du projet :

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=pokemon_db
DB_PASSWORD=votre_mot_de_passe
DB_PORT=5432
```

### 2. Initialiser la base de données

#### Option 1 : Avec psql (Terminal)

```bash
psql -U postgres -d pokemon_db -f schema.sql
```

#### Option 2 : Avec pgAdmin

1. Ouvrir pgAdmin
2. Se connecter à votre serveur PostgreSQL
3. Créer une base de données `pokemon_db`
4. Ouvrir l'outil Query Tool
5. Copier/coller le contenu de `schema.sql`
6. Exécuter (F5)

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
minitp/
├── src/
│   ├── server.ts                      # Point d'entrée du serveur
│   ├── config/
│   │   └── database.ts                # Configuration PostgreSQL
│   ├── models/                        # Modèles métier
│   │   ├── Attack.ts                  # Modèle Attaque
│   │   ├── Pokemon.ts                 # Modèle Pokémon
│   │   └── Trainer.ts                 # Modèle Dresseur
│   ├── repositories/                  # Couche d'accès aux données
│   │   ├── AttackRepository.ts        # CRUD Attaques
│   │   ├── PokemonRepository.ts       # CRUD Pokémon
│   │   └── TrainerRepository.ts       # CRUD Dresseurs
│   ├── controllers/                   # Logique métier
│   │   ├── AttackController.ts        # Routes /attacks
│   │   ├── PokemonController.ts       # Routes /pokemon
│   │   ├── TrainerController.ts       # Routes /trainers
│   │   └── BattleController.ts        # Routes /battles
│   ├── routes/                        # Définition des routes
│   │   ├── attackRoutes.ts
│   │   ├── pokemonRoutes.ts
│   │   ├── trainerRoutes.ts
│   │   └── battleRoutes.ts
│   └── middlewares/
│       └── loggerMiddleware.ts        # Logs des requêtes
├── schema.sql                         # Schéma de la base de données
├── package.json                       # Dépendances du projet
├── tsconfig.json                      # Configuration TypeScript
└── Pokemon_API.postman_collection.json # Collection Postman complète
```

---

## 📡 API Endpoints

### 🧑‍🎓 Dresseurs (Trainers)

| Méthode | Endpoint                 | Description                        |
| ------- | ------------------------ | ---------------------------------- |
| GET     | `/api/trainers`          | Lister tous les dresseurs          |
| GET     | `/api/trainers/:id`      | Voir un dresseur avec ses Pokémon  |
| POST    | `/api/trainers`          | Créer un nouveau dresseur          |
| POST    | `/api/trainers/:id/heal` | Soigner tous les Pokémon (taverne) |
| DELETE  | `/api/trainers/:id`      | Supprimer un dresseur              |

### 🐉 Pokémon

| Méthode | Endpoint                        | Description                       |
| ------- | ------------------------------- | --------------------------------- |
| GET     | `/api/pokemon`                  | Lister tous les Pokémon           |
| GET     | `/api/pokemon/:id`              | Voir un Pokémon avec ses attaques |
| POST    | `/api/pokemon`                  | Créer un nouveau Pokémon          |
| POST    | `/api/pokemon/:id/learn-attack` | Apprendre une attaque (max 4)     |
| DELETE  | `/api/pokemon/:id`              | Supprimer un Pokémon              |

### ⚔️ Attaques (Attacks)

| Méthode | Endpoint           | Description                |
| ------- | ------------------ | -------------------------- |
| GET     | `/api/attacks`     | Lister toutes les attaques |
| GET     | `/api/attacks/:id` | Voir une attaque           |
| POST    | `/api/attacks`     | Créer une nouvelle attaque |
| DELETE  | `/api/attacks/:id` | Supprimer une attaque      |

### 🏟️ Combats (Battles)

| Méthode | Endpoint                               | Description                                      |
| ------- | -------------------------------------- | ------------------------------------------------ |
| POST    | `/api/battles/random-challenge`        | Combat aléatoire (1 Pokémon random par dresseur) |
| POST    | `/api/battles/deterministic-challenge` | Combat déterministe (Pokémon avec le plus de PV) |
| POST    | `/api/battles/arena1`                  | Arène 1 (100 combats aléatoires)                 |
| POST    | `/api/battles/arena2`                  | Arène 2 (100 combats déterministes)              |

---

## 🧪 Tests avec Postman

### Import de la collection

1. Ouvrir Postman
2. Cliquer sur **Import**
3. Sélectionner le fichier `Pokemon_API.postman_collection.json`
4. La collection **"Pokemon API - Tests Complets"** apparaît

### Structure de la collection

La collection contient **50+ requêtes** organisées en 4 phases :

1. **📦 CRÉATION JEU D'ESSAI**

   - Créer 6 attaques (Éclair, Flammèche, Hydrocanon, etc.)
   - Créer 4 dresseurs (Sacha, Pierre, Ondine, Régis)
   - Créer 10 Pokémon (Pikachu, Salamèche, Carapuce, etc.)
   - Apprendre des attaques aux Pokémon (26 requêtes)

2. **✅ VÉRIFICATIONS**

   - Lister toutes les ressources
   - Voir les détails des dresseurs et Pokémon

3. **⚔️ TESTS FONCTIONNALITÉS**

   - Soigner les Pokémon (taverne)
   - Lancer des combats aléatoires et déterministes
   - Tester les arènes (100 combats)
   - Combats cross-trainers

4. **🗑️ NETTOYAGE**
   - Supprimer toutes les données créées
   - Vérifier que la base est vide
