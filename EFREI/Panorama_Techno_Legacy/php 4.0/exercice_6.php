<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$email = "user@sub.domain.com";

// ereg() : Supprimé en PHP 7
// Pattern incomplet : Échoue pour les sous-domaines ou les nouveaux TLDs (.io, .xyz).
if (ereg("^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$", $email)) {
    echo "Email valide (mais le pattern est incomplet !)";
} else {
    echo "Email invalide";
}
?>

