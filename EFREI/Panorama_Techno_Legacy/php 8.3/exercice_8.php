<?php

// DateTime : Gère les dates au-delà de 2038. Plus flexible que les timestamps.
$date = new DateTime("2039-01-01");
echo "Date après 2038 : " . $date->format('Y-m-d');
?>

