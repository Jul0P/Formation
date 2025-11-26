<?php
class Animal {
    public $nom; // Visibilité explicite

    public function __construct($nom) {
        $this->nom = $nom;
    }
}

class Chien extends Animal {
    use AboyerTrait; // Utilisation d'un trait pour simuler l'héritage multiple

    public function aboyer() {
        echo $this->nom . " dit Woof !<br>";
    }
}

trait AboyerTrait {
    public function aboyerFort() {
        echo $this->nom . " dit WOOF !<br>";
    }
}
?>
