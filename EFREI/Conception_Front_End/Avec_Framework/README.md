# 📊 Projefrei - Portail de Gestion ESN

> **Épreuve E2 - Interface avec framework React**  
> Projefrei : Plateforme de gestion de collaborateurs et de leurs tâches pour une Entreprise de Services Numériques (ESN)

[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat&logo=react-query&logoColor=white)](https://tanstack.com/query/latest)
[![JSONPlaceholder](https://img.shields.io/badge/API-JSONPlaceholder-green)](https://jsonplaceholder.typicode.com/)

---

## 📋 Présentation du Projet

Cette application web permet aux collaborateurs d'une ESN de **visualiser et gérer les projets en cours**. Elle centralise les informations des projets dans une interface unique, accessible et intuitive, remplaçant les outils disparates (emails, tableurs, etc.).

---

## 🚀 Installation et Utilisation

### Prérequis

- **Node.js** (version 18 ou supérieure)
- **npm** ou **yarn**

### Installation

1. **Cloner** le projet ou télécharger les fichiers

```bash
git clone [url-du-projet]
cd ProjetE2
```

2. **Installer les dépendances**

```bash
npm install
# ou
yarn install
```

3. **Lancer l'application en mode développement**

```bash
npm run dev
# ou
yarn dev
```

4. **Ouvrir l'application**
   - L'application sera accessible sur `http://localhost:5173`
   - Le serveur se recharge automatiquement lors des modifications

### Build de production

```bash
npm run build
# ou
yarn build
```

Les fichiers de production seront générés dans le dossier `dist/`

---

## 📁 Architecture du Projet

```
ProjetE2/
├── index.html                    # Point d'entrée HTML
├── package.json                  # Dépendances et scripts
├── vite.config.ts               # Configuration Vite
├── tsconfig.json                # Configuration TypeScript
├── tailwind.config.js           # Configuration Tailwind CSS
├── components.json              # Configuration shadcn/ui
├── public/                      # Assets statiques
└── src/
    ├── main.tsx                 # Point d'entrée React
    ├── App.tsx                  # Composant principal
    ├── router.tsx               # Configuration des routes
    ├── index.css                # Styles globaux et variables CSS
    ├── assets/                  # Images et assets
    ├── components/              # Composants réutilisables
    │   ├── layouts/            # Header, Footer
    │   │   ├── Header.tsx
    │   │   └── Footer.tsx
    │   ├── ui/                 # Composants UI (shadcn/ui)
    │   │   ├── button.tsx
    │   │   ├── card.tsx
    │   │   ├── input.tsx
    │   │   └── ...
    │   ├── SearchBar.tsx       # Barre de recherche
    │   ├── UserCard.tsx        # Carte utilisateur
    │   ├── TodoForm.tsx        # Formulaire de création de tâche
    │   ├── mode-switcher.tsx   # Switch thème clair/sombre
    │   └── theme-provider.tsx  # Provider du thème
    ├── hooks/                   # Custom hooks React
    │   └── useUsers.ts         # Hooks pour gérer utilisateurs et tâches
    ├── layouts/                 # Layouts de page
    │   └── RootLayout.tsx      # Layout principal avec Header/Footer
    ├── lib/                     # Utilitaires et validations
    │   ├── utils.ts            # Fonctions utilitaires
    │   └── validations.ts      # Schémas de validation Zod
    ├── routes/                  # Pages de l'application
    │   ├── index.tsx           # Page d'accueil (liste utilisateurs)
    │   ├── details.tsx         # Page détail utilisateur
    │   └── error.tsx           # Page d'erreur
    ├── services/                # Services API
    │   └── api.ts              # Appels à l'API JSONPlaceholder
    ├── stores/                  # State management (Zustand)
    │   └── appStore.ts         # Store global de l'application
    └── types/                   # Types TypeScript
        └── index.ts            # Définitions des types
```

---

## 🏗️ Architecture et Choix Techniques

### **Approche Desktop First**

Le projet utilise une approche **Desktop First** plutôt que Mobile First, choix justifié par le contexte d'usage spécifique de cette application d'entreprise. Étant donné qu'il s'agit d'un application interne de type dashboard qui est également destiné à de la gestion de collaborateurs et projets, l'usage principal se fait sur ordinateurs et non sur mobiles. De plus, ce type d'application contenant des informations sensibles est restreint au réseau interne d'entreprise, limitant naturellement l'accès mobile externe.

### **Qualité de Code**

Le code a été formaté avec **Prettier** et analysé avec **ESLint** pour garantir une cohérence et un respect des bonnes pratiques JavaScript.

---

## 📸 Captures d'écran

Les captures d'écran de l'application (versions desktop et mobile) sont disponibles dans le dossier [`docs/`](docs/) du projet.

---

## 📚 Ressources et Documentation

### APIs Utilisées

- **JSONPlaceholder** : [https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/)
- **Endpoints** :
  - `GET /users` - Liste des utilisateurs
  - `GET /users/{id}` - Détail utilisateur
  - `GET /todos?userId={id}` - Tâches d'un utilisateur
  - `POST /todos` - Création d'une tâche

### Documentation Externe

- [React Documentation](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Router](https://reactrouter.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Zod](https://zod.dev/)
