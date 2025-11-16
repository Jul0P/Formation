# StockLink Core - API de Gestion d'Entrepôt

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

---

## Installation

### Prérequis

- **Node.js** 18+ ([Télécharger](https://nodejs.org/))
- **PostgreSQL** 14+ ([Télécharger](https://www.postgresql.org/download/))
- **MongoDB** 6+ ([Télécharger](https://www.mongodb.com/try/download/community))
- **npm** ou **yarn**

### Étapes d'Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Créer le fichier .env
cp .env.example .env

#3. Générer la clé JWT
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 4. Créer la base de données PostgreSQL
Créer votre base de données suivant votre .env et en prenant le init.sql.

# 5. Lancer le serveur en mode développement
npm run dev
```

---

## API Endpoints

### **Products**

| Méthode  | Endpoint        | Description             | Protection  |
| -------- | --------------- | ----------------------- | ----------- |
| `GET`    | `/products`     | Liste tous les produits | Libre       |
| `POST`   | `/products`     | Ajoute un produit       | Authentifié |
| `PUT`    | `/products/:id` | Met à jour un produit   | Authentifié |
| `DELETE` | `/products/:id` | Supprime un produit     | Admin       |

### **Movements**

| Méthode | Endpoint     | Description                       | Protection  |
| ------- | ------------ | --------------------------------- | ----------- |
| `GET`   | `/movements` | Liste l'historique des mouvements | Libre       |
| `POST`  | `/movements` | Enregistre un mouvement (IN/OUT)  | Authentifié |

### **Warehouses**

| Méthode | Endpoint                    | Description                               | Protection  |
| ------- | --------------------------- | ----------------------------------------- | ----------- |
| `GET`   | `/warehouses/:id/locations` | Récupère la structure Mongo d'un entrepôt | Libre       |
| `POST`  | `/warehouses/:id/locations` | Crée la structure interne d'un entrepôt   | Authentifié |
| `PUT`   | `/warehouses/:id/locations` | Met à jour la structure interne           | Authentifié |
| `GET`   | `/warehouses`               | Liste tous les entrepôts                  | Libre       |
| `POST`  | `/warehouses`               | Crée un nouvel entrepôt                   | Authentifié |

### **Locations**

| Méthode | Endpoint                     | Description              | Protection |
| ------- | ---------------------------- | ------------------------ | ---------- |
| `GET`   | `/locations/:binCode/exists` | Vérifie si un bac existe | Libre      |

---

## Lancer les tests

```bash
npm run test
```

## URL Swagger

[http://localhost:3000/docs](http://localhost:3000/docs)

## 📁 Structure du Projet

```
StockLink_Core/
├── src/
│   ├── config/
│   │   ├── mongo.ts
│   │   └── postgre.ts
│   ├── controllers/
│   │   ├── product.controller.ts
│   │   ├── movement.controller.ts
│   │   ├── location.controller.ts
│   │   └── warehourse.controller.ts
│   ├── models/
│   │   ├── product.model.ts
│   │   ├── Movement.model.ts
│   │   ├── Warehourse.model.ts
│   │   └── Location.model.ts
│   ├── services/
│   │   ├── product.service.ts
│   │   ├── movement.service.ts
│   │   ├── location.service.ts
│   │   └── warehourse.service.ts
│   ├── routes/
│   │   ├── product.route.ts
│   │   ├── movement.route.ts
│   │   ├── location.route.ts
│   │   └── warehourse.route.ts
│   ├── types/
│   │   ├── product.types.ts
│   │   ├── movement.types.ts
│   │   ├── location.types.ts
│   │   └── warehouse.types.ts
│   └── server.ts
├── .env
├── schema.sql
├── StockLink_Core.postman_collection.json
├── package.json
├── tsconfig.json
└── README.md
```
