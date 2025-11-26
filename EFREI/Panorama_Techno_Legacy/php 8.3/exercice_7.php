<?php

// Contrôle explicite : session_start() est obligatoire (meilleure visibilité).
session_start();
// $_SESSION : Méthode standard depuis PHP 4.1.
$_SESSION['user'] = "Jean";

echo "Utilisateur enregistré en session : " . htmlspecialchars($_SESSION['user']);
?>