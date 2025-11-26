<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

// magic_quotes : Ajoute des antislashs automatiquement (comportement imprévisible).
$data = array("nom" => "O'Reilly");
$serialized = serialize($data);
echo "Sérialisé : " . $serialized; // Peut corrompre les données sérialisées.

// Désérialisation
$unserialized = unserialize($serialized);
print_r($unserialized);
?>

