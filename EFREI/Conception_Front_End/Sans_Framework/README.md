# 📊 Projefrei - Portail de Gestion ESN

> **Épreuve E1 - Interface sans framework**  
> Projefrei : Plateforme de gestion de collaborateurs et de leurs tâches pour une Entreprise de Services Numériques (ESN)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![JSONPlaceholder](https://img.shields.io/badge/API-JSONPlaceholder-green)](https://jsonplaceholder.typicode.com/)

---

## 📋 Présentation du Projet

Cette application web permet aux collaborateurs d'une ESN de **visualiser et gérer les projets en cours**. Elle centralise les informations des projets dans une interface unique, accessible et intuitive, remplaçant les outils disparates (emails, tableurs, etc.).

---

## 🚀 Installation et Utilisation

### Prérequis

- Navigateur web moderne (Chrome, Firefox, Safari, Edge)

### Installation

1. **Télécharger** le projet dans un dossier local

2. **Lancer l'application** :

#### Option A: Serveur web local (recommandé pour les modules ES6)

```bash
# Python (si installé)
python -m http.server 8000
# Puis ouvrir http://localhost:8000

# Node.js (si installé)
npx serve .
# Puis ouvrir http://localhost:3000
```

#### Option B: Extension Live Server (VS Code)

1. Installer l'extension **Live Server** dans VS Code
2. Clic droit sur `index.html` → **"Open with Live Server"**
3. L'application s'ouvre automatiquement dans votre navigateur

#### Option C: Ouverture directe

- Double-cliquer sur `index.html` pour l'ouvrir dans le navigateur
- ⚠️ _Certaines fonctionnalités peuvent ne pas fonctionner à cause des modules ES6_

---

## 📁 Architecture du Projet

```
Projefrei/
├── index.html              # Page d'accueil
├── user.html               # Page détail utilisateur
├── README.md               # Documentation
├── docs/                   # Captures d'écran et documentation
├── css/
│   ├── style.css          # Styles principaux (imports)
│   ├── reset.css          # Reset CSS
│   ├── variables.css      # Variables CSS
│   ├── utils.css          # Classes utilitaires
│   ├── responsive.css     # Media queries
│   └── components/        # Composants CSS
│       ├── header.css
│       ├── hero.css
│       ├── card.css
│       ├── section.css
│       └── footer.css
└── js/
    ├── main.js           # Logique page d'accueil
    ├── user.js           # Logique page utilisateur
    ├── api.js            # Fonctions API
    └── utils.js          # Fonctions utilitaires
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

## 📚 Ressources

### APIs Utilisées

- **JSONPlaceholder** : [https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/)
- **Endpoints** :
  - `GET /users` - Liste des utilisateurs
  - `GET /users/{id}` - Détail utilisateur
  - `GET /todos?userId={id}` - Tâches d'un utilisateur
  - `POST /todos` - Création d'une tâche
