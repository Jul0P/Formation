<?php
$xml = '<livres>
            <livre>
                <titre>Le Petit Prince</titre>
                <auteur>Saint-Exupéry</auteur>
            </livre>
        </livres>';

// DOMDocument : Standard et maintenu.
$doc = new DOMDocument();
$doc->loadXML($xml);
$livres = $doc->getElementsByTagName("livre");

foreach ($livres as $livre) {
    $titre = $livre->getElementsByTagName("titre")->item(0)->nodeValue;
    echo "Livre : " . htmlspecialchars($titre) . "<br>";
}
?>

