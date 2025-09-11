# 🎮 Multitask Game

Un jeu de multitâche progressif développé en TypeScript avec Vite, où les joueurs doivent gérer simultanément plusieurs mini-jeux qui apparaissent au fur et à mesure que le score augmente.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 🚀 Installation et Démarrage

### Prérequis

- **[Node.js](https://nodejs.org/)**

### Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd Formation/EFREI/ProjetRenforcementTechnique

# Installer les dépendances
npm install
```

### Démarrage en développement

```bash
# Lancer le serveur de développement
npm run dev
```

Le jeu sera accessible sur `http://localhost:5173`

### Build de production

```bash
# Compiler le projet
npm run build

# Prévisualiser le build
npm run preview
```

Le jeu sera accessible sur `http://localhost:4173`

## 🏗️ Architecture du Projet

```
src/
├── game/                    # Logique de jeu
│   ├── core/               # Classes de base
│   │   └── GameState.ts    # État global du jeu
│   ├── games/              # Mini-jeux
│   │   └── dodge/          # Jeu d'esquive
│   │       ├── DodgeGame.ts       # Logique principale
│   │       └── ArrowManager.ts    # Gestion des projectiles
│   ├── types/              # Interfaces TypeScript
│   │   └── index.ts        # Définitions des types
│   └── utils/              # Utilitaires
│       └── SoundManager.ts # Système audio
├── config/                 # Configuration
│   └── GameConfig.ts       # Paramètres du jeu
├── shared/                 # Code partagé
│   └── storage.ts          # Gestion localStorage
├── styles/                 # Feuilles de style
│   ├── global.css          # Variables CSS et reset
│   ├── game.css            # Styles du jeu
│   └── home.css            # Styles de l'accueil
├── game.ts                 # Point d'entrée du jeu
└── main.ts                 # Point d'entrée de l'accueil
```