<?php

$data       = ["nom" => "O'Reilly"];
$json       = json_encode($data);
$decoded    = json_decode($json, true);

print_r($decoded);
?>
