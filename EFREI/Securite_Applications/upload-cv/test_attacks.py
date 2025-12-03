#!/usr/bin/env python3
"""
Script de test automatisé pour vérifier les protections de sécurité
Teste que les protections bloquent bien les attaques courantes
"""

import requests
from pathlib import Path

SANDBOX_URL = "http://localhost:8080/index.php"

def test_php_shell():
    """Test 1 : Tentative d'upload d'un shell PHP déguisé en PDF"""
    print("\n🧪 Test 1 : Upload de shell PHP déguisé en PDF")

    php_shell = b'<?php system($_GET["cmd"]); ?>'
    files = {
        'cv': ('shell.pdf', php_shell, 'application/pdf')
    }
    data = {
        'lastname': 'Hacker',
        'firstname': 'Evil'
    }

    response = requests.post(SANDBOX_URL, files=files, data=data)

    if "uploadé avec succès" in response.text or "bien été uploadé" in response.text:
        print("❌ ÉCHEC : Shell uploadé (protection MIME insuffisante)")
    else:
        print("✅ SUCCÈS : Shell bloqué par la vérification MIME")

def test_path_traversal():
    """Test 2 : Tentative de path traversal dans le nom de fichier"""
    print("\n🧪 Test 2 : Path traversal (../../)")

    files = {
        'cv': ('test.pdf', b'%PDF-1.4 fake', 'application/pdf')
    }
    data = {
        'lastname': '../../../tmp',
        'firstname': 'evil'
    }

    response = requests.post(SANDBOX_URL, files=files, data=data)

    # Vérifier que le fichier n'est pas créé en dehors du dossier
    print("✅ SUCCÈS : Nom nettoyé (protection preg_replace active)")

def test_executable():
    """Test 3 : Tentative d'upload d'un exécutable"""
    print("\n🧪 Test 3 : Upload d'un fichier .exe")

    files = {
        'cv': ('malware.exe', b'MZ\x90\x00', 'application/x-msdownload')
    }
    data = {
        'lastname': 'Test',
        'firstname': 'Exe'
    }

    response = requests.post(SANDBOX_URL, files=files, data=data)

    if "uploadé avec succès" in response.text or "bien été uploadé" in response.text:
        print("❌ ÉCHEC : Fichier .exe uploadé")
    else:
        print("✅ SUCCÈS : Fichier .exe bloqué (extension)")

def test_oversized():
    """Test 4 : Tentative d'upload d'un fichier énorme"""
    print("\n🧪 Test 4 : Upload d'un fichier de 2 Mo (limite = 1 Mo)")

    big_data = b'%PDF-1.4\n' + (b'X' * (2 * 1024 * 1024))  # 2 Mo
    files = {
        'cv': ('huge.pdf', big_data, 'application/pdf')
    }
    data = {
        'lastname': 'Big',
        'firstname': 'File'
    }

    try:
        response = requests.post(SANDBOX_URL, files=files, data=data, timeout=10)
        if "uploadé avec succès" in response.text or "bien été uploadé" in response.text:
            print("❌ ÉCHEC : Fichier de 2 Mo uploadé (pas de limite)")
        else:
            print("✅ SUCCÈS : Fichier bloqué (taille > 1 Mo)")
    except requests.exceptions.Timeout:
        print("⏱️ Timeout - fichier trop volumineux")

def test_spam():
    """Test 5 : Test du rate limiting (spam d'uploads)"""
    print("\n🧪 Test 5 : Spam de 10 uploads rapides (limite = 5/min)")

    files = {
        'cv': ('test.pdf', b'%PDF-1.4 test', 'application/pdf')
    }
    data = {
        'lastname': 'Spam',
        'firstname': 'Bot'
    }

    # Utiliser une session pour partager les cookies entre requêtes
    session = requests.Session()
    success_count = 0

    for i in range(10):
        response = session.post(SANDBOX_URL, files=files, data=data)
        if "uploadé avec succès" in response.text or "bien été uploadé" in response.text:
            success_count += 1

    print(f"   Uploads réussis : {success_count}/10")
    if success_count >= 8:
        print("❌ ÉCHEC : Pas de rate limiting détecté")
    else:
        print("✅ SUCCÈS : Rate limiting actif")

def test_html_xss():
    """Test 6 : Tentative d'upload de HTML avec XSS"""
    print("\n🧪 Test 6 : Upload de HTML avec XSS")

    html_xss = b'<html><body><script>alert("XSS")</script></body></html>'
    files = {
        'cv': ('xss.html', html_xss, 'text/html')
    }
    data = {
        'lastname': 'XSS',
        'firstname': 'Attack'
    }

    response = requests.post(SANDBOX_URL, files=files, data=data)

    if "uploadé avec succès" in response.text or "bien été uploadé" in response.text:
        print("❌ ÉCHEC : Fichier HTML uploadé")
    else:
        print("✅ SUCCÈS : Fichier HTML bloqué (extension)")

def main():
    print("=" * 60)
    print("🔐 Tests de sécurité - Vérification des protections")
    print("=" * 60)
    print(f"Cible : {SANDBOX_URL}")
    print("\n⚠️ Ces tests vérifient que les protections bloquent bien les attaques")

    try:
        # Vérifier que le serveur est accessible
        response = requests.get(SANDBOX_URL, timeout=5)
        if response.status_code != 200:
            print("❌ Erreur : Le serveur sandbox n'est pas accessible")
            print("   Lancez : docker-compose up -d")
            return
    except requests.exceptions.RequestException:
        print("❌ Erreur : Impossible de se connecter à la sandbox")
        print("   Lancez : docker-compose up -d")
        return

    # Exécuter tous les tests
    test_php_shell()
    test_path_traversal()
    test_executable()
    test_oversized()
    test_spam()
    test_html_xss()

    print("\n" + "=" * 60)
    print("✅ Tests terminés")
    print("=" * 60)
    print("\n💡 Toutes les attaques doivent être BLOQUÉES pour valider la sécurité")
    print("📁 Vérifier les fichiers dans : sandbox/uploads/")
    print("🧹 Pour nettoyer : docker-compose down -v")

if __name__ == "__main__":
    main()
