# 🏖️ Sandbox - Environnement de test isolé

## 📋 Objectif

Ce dossier contient une **copie identique** de ta version sécurisée, exécutée dans un environnement Docker isolé pour tester les protections sans risque pour ton système.

## 🚀 Lancer la sandbox

```bash
# Depuis la racine du projet upload-cv/
docker-compose up -d

# Accéder à la sandbox
# http://localhost:8080
```

## 🧪 Tests automatisés

Utilise le script Python pour automatiser les tests :

```bash
# Installer les dépendances
pip install requests

# Lancer tous les tests
python test_attacks.py
```

Le script teste automatiquement les 6 scénarios de sécurité.

## 📁 Structure

```
sandbox/
├── public/
│   └── index.php           # Page d'upload (copie sécurisée)
├── src/
│   └── Upload.php          # Classe avec protections
└── uploads/                 # Fichiers uploadés (isolés)
```

## 🔍 Vérifier les fichiers uploadés

```bash
# Lister les fichiers uploadés
ls -la sandbox/uploads/

# Vérifier les permissions
stat sandbox/uploads/fichier.pdf

# Lire les logs Docker
docker-compose logs -f
```

## 🧹 Nettoyer après les tests

```bash
# Arrêter et supprimer le container
docker-compose down -v

# Supprimer les fichiers uploadés
rm -rf sandbox/uploads/*
```
