<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$user = "Jean";
// session_register() : Supprimé en PHP 5.4.
session_register("user");

echo "Utilisateur enregistré en session : $user";
?>

