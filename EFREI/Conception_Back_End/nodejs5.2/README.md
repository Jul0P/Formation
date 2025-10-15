# Système d'authentification Node.js + PostgreSQL

API REST avec authentification par token et système de rôles.

---

## 📦 Installation

### Prérequis

- Node.js 18+ installé
- PostgreSQL 14+ installé et démarré
- npm ou yarn

### Étapes

```bash
# Cloner le projet
git clone <url-du-repo>
cd Formation/EFREI/Conception_Back_End/nodejs5.2

# Installer les dépendances
npm install
```

---

## ⚙️ Configuration

### 1. Créer le fichier `.env`

Copier `.env.example` et le renommer en `.env` :

```bash
cp .env.example .env
```

### 2. Remplir les informations PostgreSQL

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=mabase
DB_PASSWORD=votre_mot_de_passe
DB_PORT=5432
```

---

## 🗄️ Initialisation de la base de données

### Option 1 : Avec psql (Terminal)

```bash
psql -U postgres -d mabase -f schema.sql
```

### Option 2 : Avec pgAdmin

1. Ouvrir pgAdmin
2. Se connecter à votre serveur PostgreSQL
3. Créer une base de données `mabase` (si elle n'existe pas)
4. Ouvrir l'outil Query Tool
5. Copier/coller le contenu de `schema.sql`
6. Exécuter (F5)

### Structure créée

```sql
-- Table users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user'
);

-- Table sessions
CREATE TABLE sessions (
  token UUID PRIMARY KEY,
  user_id INTEGER REFERENCES users(id)
);
```

---

## 🚀 Démarrage

### Mode développement (avec hot reload)

```bash
npm run dev
```

Le serveur démarre sur **http://localhost:3000**

### Mode production

```bash
node app.js
```

---

## 📡 Utilisation

### 1. S'inscrire

**POST** `http://localhost:3000/register`

```json
{
  "email": "admin@test.com",
  "password": "admin123",
  "role": "admin"
}
```

### 2. Se connecter

**POST** `http://localhost:3000/authenticate`

```json
{
  "email": "admin@test.com",
  "password": "admin123"
}
```

Réponse : `{ "token": "uuid..." }` → Copier le token

### 3. Accéder aux routes protégées

**GET** `http://localhost:3000/restricted1`

Header : `authorization: [votre-token]`

- `/restricted1` → Accessible par tous
- `/restricted2` → Accessible par admin uniquement
