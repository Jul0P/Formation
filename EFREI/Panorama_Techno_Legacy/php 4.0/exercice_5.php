<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$xml = '<livres>
            <livre>
                <titre>Le Petit Prince</titre>
                <auteur>Saint-Exupéry</auteur>
            </livre>
        </livres>';

// Extension domxml : Non activée par défaut, remplacée par DOMDocument en PHP 5.
$doc = domxml_open_mem($xml) or die("Erreur XML");
$livres = $doc->get_elements_by_tagname("livre");

// Pas de try/catch.
foreach ($livres as $livre) {
    $elements = $livre->get_elements_by_tagname("titre");
    $titre = $elements[0]->get_content();
    echo "Livre : $titre<br>";
}
?>