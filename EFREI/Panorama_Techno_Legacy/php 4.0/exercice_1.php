<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$prenom = "Jean";
$age    = "25"; // String intentionnellement

// Exemple d'attaque XSS
// Supposons que $prenom vient de $_GET['prenom'] :
// $prenom = $_GET['prenom']; // http://ton-site.com/script.php?prenom=<script>alert('Hack!')</script>

// Interpolation directe (PHP 4 tolère les variables non typées)
echo "Bonjour $prenom, vous avez $age ans.<br>";

// Cas non défini (génère une notice, mais pas d'erreur fatale)
echo "Age non défini : $age_non_defini ans.";
?>