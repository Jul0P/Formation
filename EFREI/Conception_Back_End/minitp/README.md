# 🎮 Pokémon Battle API - Mini TP

API REST & Interface Web de gestion de combats Pokémon avec système de dresseurs, d'attaques et d'arènes. Développé en TypeScript avec Express, PostgreSQL et EJS.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)

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
│   ├── types/
│   │   └── index.ts                   # Interfaces
│   ├── models/                        # Modèles métier
│   │   ├── Attack.ts                  # Modèle Attaque
│   │   ├── Pokemon.ts                 # Modèle Pokémon
│   │   └── Trainer.ts                 # Modèle Dresseur
│   ├── repositories/                  # Couche d'accès aux données
│   │   ├── AttackRepository.ts        # CRUD Attaques
│   │   ├── PokemonRepository.ts       # CRUD Pokémons
│   │   └── TrainerRepository.ts       # CRUD Dresseurs
│   ├── services/                      # Orchestration métier
│   │   ├── AttackService.ts           # Logique métier attaques
│   │   ├── PokemonService.ts          # Logique métier pokémons
│   │   ├── TrainerService.ts          # Logique métier dresseurs
│   │   └── BattleService.ts           # Logique de combat
│   ├── controllers/                   # Handlers HTTP
│   │   ├── AttackController.ts        # Routes /attacks
│   │   ├── PokemonController.ts       # Routes /pokemon
│   │   ├── TrainerController.ts       # Routes /trainers
│   │   └── BattleController.ts        # Routes /battles
│   ├── routes/                        # Définition des routes Express
│   │   ├── attackRoutes.ts            # Injection des dépendances
│   │   ├── pokemonRoutes.ts
│   │   ├── trainerRoutes.ts
│   │   └── battleRoutes.ts
│   ├── views/                         # Vues EJS (interface web)
│   │   ├── layout.ejs                 # Layout principal (minimal design)
│   │   ├── index.ejs                  # Page d'accueil
│   │   ├── trainers/
│   │   │   ├── index.ejs              # Liste des dresseurs
│   │   │   └── show.ejs               # Détail dresseur + pokémons
│   │   ├── pokemon/
│   │   │   ├── index.ejs              # Liste des pokémons
│   │   │   └── show.ejs               # Détail pokémon + attaques
│   │   ├── attack/
│   │   │   ├── index.ejs              # Liste des attaques
│   │   │   └── show.ejs               # Détail attaque
│   │   └── battle/
│   │       ├── form.ejs               # Formulaire de combat
│   │       └── result.ejs             # Résultat du combat
│   └── middlewares/
│       └── loggerMiddleware.ts        # Logs des requêtes
├── schema.sql                         # Schéma
├── package.json                       # Dépendances
├── tsconfig.json                      # Config TypeScript
└── Pokemon_API.postman_collection.json # Collection Postman
```

---

## 📡 API Endpoints

### 🧑‍🎓 Dresseurs (Trainers)

| Méthode | Endpoint                 | Description                        | Format |
| ------- | ------------------------ | ---------------------------------- | ------ |
| GET     | `/trainers`              | Page web liste des dresseurs       | HTML   |
| GET     | `/trainers/:id`          | Page web détail d'un dresseur      | HTML   |
| GET     | `/api/trainers`          | Lister tous les dresseurs          | JSON   |
| GET     | `/api/trainers/:id`      | Voir un dresseur avec ses Pokémon  | JSON   |
| POST    | `/api/trainers`          | Créer un nouveau dresseur          | JSON   |
| POST    | `/api/trainers/:id/heal` | Soigner tous les Pokémon (taverne) | JSON   |
| DELETE  | `/api/trainers/:id`      | Supprimer un dresseur              | JSON   |

### 🐉 Pokémon

| Méthode | Endpoint                        | Description                       | Format |
| ------- | ------------------------------- | --------------------------------- | ------ |
| GET     | `/pokemon`                      | Page web liste des pokémons       | HTML   |
| GET     | `/pokemon/:id`                  | Page web détail d'un pokémon      | HTML   |
| GET     | `/api/pokemon`                  | Lister tous les Pokémon           | JSON   |
| GET     | `/api/pokemon/:id`              | Voir un Pokémon avec ses attaques | JSON   |
| POST    | `/api/pokemon`                  | Créer un nouveau Pokémon          | JSON   |
| POST    | `/api/pokemon/:id/learn-attack` | Apprendre une attaque (max 4)     | JSON   |
| DELETE  | `/api/pokemon/:id`              | Supprimer un Pokémon              | JSON   |

### ⚔️ Attaques (Attacks)

| Méthode | Endpoint           | Description                   | Format |
| ------- | ------------------ | ----------------------------- | ------ |
| GET     | `/attacks`         | Page web liste des attaques   | HTML   |
| GET     | `/attacks/:id`     | Page web détail d'une attaque | HTML   |
| GET     | `/api/attacks`     | Lister toutes les attaques    | JSON   |
| GET     | `/api/attacks/:id` | Voir une attaque              | JSON   |
| POST    | `/api/attacks`     | Créer une nouvelle attaque    | JSON   |
| DELETE  | `/api/attacks/:id` | Supprimer une attaque         | JSON   |

### 🏟️ Combats (Battles)

| Méthode | Endpoint                               | Description                                      | Format |
| ------- | -------------------------------------- | ------------------------------------------------ | ------ |
| GET     | `/battles/form`                        | Formulaire de combat (interface web)             | HTML   |
| POST    | `/api/battles/random-challenge`        | Combat aléatoire (1 Pokémon random par dresseur) | JSON   |
| POST    | `/api/battles/deterministic-challenge` | Combat déterministe (Pokémon avec le plus de PV) | JSON   |
| POST    | `/api/battles/arena1`                  | Arène 1 (100 combats aléatoires)                 | JSON   |
| POST    | `/api/battles/arena2`                  | Arène 2 (100 combats déterministes)              | JSON   |

### 🎨 Système de Combat

- **Random Challenge** : Heal → Pokémon aléatoire → Combat → +1 XP gagnant
- **Deterministic Challenge** : Pokémon avec le plus de HP → Combat → +1 XP (sans heal)
- **Arena 1** : 100 random challenges → Le dresseur avec le niveau/XP le plus élevé gagne
- **Arena 2** : 100 deterministic challenges → Combat jusqu'à ce qu'un dresseur n'ait plus de Pokémon vivant

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
