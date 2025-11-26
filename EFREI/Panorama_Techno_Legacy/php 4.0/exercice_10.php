<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

class Animal {
    var $nom; // 'var' est remplacé par public/private/protected en PHP 5+

    function __construct($nom) {
        $this->nom = $nom;
    }
}

class Chien extends Animal {
    function aboyer() {
        echo $this->nom . " dit Woof !<br>";
    }
}

// "Héritage multiple" simulé avec include (mauvaise pratique)
include 'traits.php'; // Contient des méthodes à mixer
?>
