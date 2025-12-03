<?php
// AVANT
// function start_session() {
//     session_start();  // Pas de configuration sécurisée des cookies
// }
//
// PROBLÈME 1 : Pas de flags de sécurité sur les cookies de session
//   - httponly manquant : JavaScript peut voler le cookie (vulnérable XSS)
//   - secure manquant : Cookie transmis en HTTP non chiffré
//   - samesite manquant : Vulnérable aux attaques CSRF
//
// PROBLÈME 2 : Pas de fonctions pour gérer les tokens CSRF
//   - Toutes les actions POST sont vulnérables aux attaques CSRF
//   - Un site malveillant peut forcer l'utilisateur à faire des actions
//

// APRÈS
// Sécurisation de la session
function start_session() {
  // Configuration sécurisée des cookies de session
  session_set_cookie_params([
    'lifetime' => 0,           // Session expire à la fermeture du navigateur
    'path' => '/',
    'domain' => '',
    'secure' => false,         // true en prod avec HTTPS <--- !!!!!!!!
    'httponly' => true,        // Empêche l'accès JavaScript (protection XSS)
    'samesite' => 'Strict'     // Protection CSRF basique
  ]);
  session_start();
}
// CORRECTION 1 : Ajout des flags de sécurité
//   - httponly=true : Même si XSS, le cookie de session ne peut pas être volé
//   - samesite=Strict : Le cookie n'est envoyé que depuis le même site
//   - secure=false (dev), true (prod) : Cookie uniquement en HTTPS

// Génération de token CSRF
function generate_csrf_token() {
  if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
  }
  return $_SESSION['csrf_token'];
}
// CORRECTION 2 : Token CSRF cryptographiquement sécurisé
//   - random_bytes(32) : 256 bits aléatoires impossibles à deviner
//   - Stocker en session pour vérifier plus tard

// Vérification de token CSRF
function verify_csrf_token($token) {
  return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}
// CORRECTION 3 : Vérification sécurisée
//   - hash_equals() : Évite les timing attacks (comparaison en temps constant)
//   - Retourne false si token absent ou invalide
//

// AVANT
// $USERS = [
//   'alice' => password_hash('alice123', PASSWORD_DEFAULT),  // Mot de passe faible
//   'bob'   => password_hash('bob456',   PASSWORD_DEFAULT),  // Mot de passe faible
// ];
//
// PROBLÈME : Pas de validation de robustesse
//   - Mots de passe courts (< 12 caractères)
//   - Pas de caractères spéciaux
//   - Pas de majuscules
//   - Vulnérable au brute-force
//

// APRÈS
// Validation de robustesse du mot de passe
function validate_password_strength($password) {
  // Minimum 12 caractères
  if (strlen($password) < 12) {
    return "Le mot de passe doit contenir au moins 12 caractères";
  }

  // Au moins 1 majuscule
  if (!preg_match('/[A-Z]/', $password)) {
    return "Le mot de passe doit contenir au moins une majuscule";
  }

  // Au moins 1 minuscule
  if (!preg_match('/[a-z]/', $password)) {
    return "Le mot de passe doit contenir au moins une minuscule";
  }

  // Au moins 1 chiffre
  if (!preg_match('/[0-9]/', $password)) {
    return "Le mot de passe doit contenir au moins un chiffre";
  }

  // Au moins 1 caractère spécial
  if (!preg_match('/[^A-Za-z0-9]/', $password)) {
    return "Le mot de passe doit contenir au moins un caractère spécial";
  }

  return true;
}

// Hachage sécurisé avec BCRYPT
function hash_password($password) {
  return password_hash($password, PASSWORD_BCRYPT);
}

// Dummy user store avec mots de passe robustes
// En prod : stocker en base
$USERS = [
  'alice' => hash_password('a@L_2.0Se!cur3#'),
  'bob'   => hash_password('B0b$Tr0ngP@ss!')
];
?>
