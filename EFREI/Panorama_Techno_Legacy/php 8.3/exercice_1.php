<?php
declare(strict_types=1);

$prenom = "Jean";
$age    = 25;

// htmlspecialchars() protège contre XSS.
// Typage explicite (int)
echo "Bonjour " . htmlspecialchars($prenom) . ", vous avez " . (int)$age . " ans.<br>";

// L'opérateur ?? évite les notices.
$age_non_defini ??= 'inconnu'; // Opérateur null coalescing (PHP 7+)
echo "Age non défini : $age_non_defini ans.";

?>
