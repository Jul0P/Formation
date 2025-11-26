<?php
// Force l'affichage des erreurs (même en CLI)
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$argv = array(
    1 => "admin",
    2 => "1234"
);

// Variable globale obsolète : $HTTP_POST_VARS est remplacée par $_POST en PHP 4.1+.
$HTTP_POST_VARS = array(
    'login'    => $argv[1],
    'password' => $argv[2]
);

// Pas de hachage : Les mots de passe sont en clair.
if ($HTTP_POST_VARS['login'] == "admin" && $HTTP_POST_VARS['password'] == "1234") {
    echo "Connexion réussie (mais non sécurisée !)";
} else {
    echo "Échec de connexion";
}
?>