# 🎓 Formation EFREI

> Recueil des projets académiques réalisés dans le cadre de la formation EFREI en développement web et technologies JavaScript.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

---

## 📁 Structure du Repository

```
EFREI/
├── Conception_Front_End/
│   ├── Sans_Framework/        # Projet vanilla HTML/CSS/JS
│   └── Avec_Framework/        # Projet React + TypeScript
├── Conception_Back_End/
│   ├── nodejs2/               # Express.js - Routes & Query Strings
│   ├── nodejs3/               # Express.js - API REST CRUD
│   ├── nodejs4/               # Node.js + PostgreSQL
│   ├── nodejs5/               # Express.js - Middlewares
│   ├── nodejs5.2/             # Express.js - Authentification avec PostgreSQL
│   ├── miniexo/               # API REST Anime - Express.js + TypeScript
│   ├── minitp/                # API REST Pokémon - Express.js + TypeScript + PostgreSQL
│   └── StockLink_Core/        # API Gestion Entrepôt - Express + PostgreSQL + MongoDB
├── ProjetRenforcementTechnique/  # Jeu multitâche TypeScript
└── Test_Qualite/
    └── minitp_test_qualite/   # Tests Jest & Cypress - API Pokémon
```

---

## 🚀 Projets

### 1. 📊 Conception Front-End

Deux implémentations d'une plateforme de gestion ESN démontrant les approches avec et sans framework.

#### **Sans Framework** (`Sans_Framework/`) : 📖 [Documentation complète](./EFREI/Conception_Front_End/Sans_Framework/README.md)

#### **Avec Framework** (`Avec_Framework/`) : 📖 [Documentation complète](./EFREI/Conception_Front_End/Avec_Framework/README.md)

---

### 2. 🎮 Projet Renforcement Technique

Jeu multitâche progressif développé en TypeScript démontrant la gestion d'événements et la programmation orientée objet.

📖 [Documentation complète](./EFREI/ProjetRenforcementTechnique/README.md)

---

### 3. 🔧 Conception Back-End

#### **nodejs2** - Express.js Fundamentals
Introduction à Express.js avec gestion des routes et query strings.

#### **nodejs3** - API REST CRUD
Création d'une API REST complète avec opérations CRUD.

#### **nodejs4** - Node.js + PostgreSQL
Intégration de PostgreSQL avec Node.js pour la persistance des données.

#### **nodejs5** - Express.js Middlewares
Implémentation et utilisation de middlewares personnalisés.

#### **nodejs5.2** - Authentification PostgreSQL
Système d'authentification sécurisé avec base de données PostgreSQL.

#### **miniexo** - API REST Anime
API TypeScript pour la gestion d'animes avec Express.js.

#### **minitp** - API REST Pokémon
📖 [Documentation complète](./EFREI/Conception_Back_End/minitp/README.md)

API complète de gestion de combats Pokémon avec TypeScript, Express.js et PostgreSQL.

#### **StockLink_Core** - Gestion d'Entrepôt
📖 [Documentation complète](./EFREI/Conception_Back_End/StockLink_Core/README.md)

API de gestion d'entrepôt avec architecture complète PostgreSQL + MongoDB, authentification JWT et tests.

---

### 4. ✅ Test & Qualité

#### **minitp_test_qualite** - Tests Pokémon API
Tests unitaires (Jest), d'intégration (Supertest) et E2E (Cypress) pour l'API Pokémon.
