<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

// Bug de l'an 2038 : mktime() retourne -1 pour les dates après 2038
$timestamp = mktime(0, 0, 0, 1, 1, 2039);
echo "Timestamp pour 2039 : " . $timestamp; // Affiche -1 (erreur)
?>

