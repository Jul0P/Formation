<?php
require __DIR__.'/utils.php';
start_session();

// AVANT
// session_destroy();
// header('Location: index.php');
// exit;
//
// PROBLÈME 1 : Pas de protection CSRF
//   Un site externe peut forcer la déconnexion avec :
//     <img src="http://site.com/logout.php">
//   La victime est déconnectée sans le savoir
//
// PROBLÈME 2 : Destruction incomplète de la session
//   - session_destroy() ne supprime pas $_SESSION
//   - Le cookie de session reste dans le navigateur
//   - Risque de réutilisation de session
//

// APRÈS
// CORRECTION 1 : Vérification du token CSRF + méthode POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !verify_csrf_token($_POST['csrf_token'] ?? '')) {
  die('CSRF token invalid or invalid request method');
}
// Protection : Seul un formulaire légitime peut déconnecter l'utilisateur

// CORRECTION 2 : Destruction propre de la session
$_SESSION = [];  // Vide le tableau de session

// CORRECTION 3 : Suppression du cookie de session
if (ini_get('session.use_cookies')) {
  $params = session_get_cookie_params();
  setcookie(session_name(), '', time() - 42000,
    $params['path'], $params['domain'],
    $params['secure'], $params['httponly']
  );
}
// Protection : Le cookie est expiré dans le navigateur (time() - 42000)

// CORRECTION 4 : Destruction finale de la session
session_destroy();
// Protection : Supprime le fichier de session côté serveur
//

header('Location: index.php');
exit;
