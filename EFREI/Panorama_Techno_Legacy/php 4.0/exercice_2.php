<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$conn = mysql_connect("127.0.0.1:3306", "root", "") or die("Erreur MySQL: " . mysql_error());
mysql_select_db("test") or die("Base introuvable");

$nom = "hacker', 'hacker@example.com') #";
$email = "test@example.com";

mysql_query("INSERT INTO utilisateurs (nom, email) VALUES ('$nom', '$email')") or die(mysql_error());

$result = mysql_query("SELECT * FROM utilisateurs");
while ($row = mysql_fetch_array($result)) {
    echo $row['nom'] . ' - ' . $row['email'];
}

// Injection SQL : Si $nom contient '); DROP TABLE utilisateurs;--, la table est supprimée.
// Payload malveillant (à saisir dans le champ nom) : '); DROP TABLE utilisateurs;--

/* 
-- commente le reste de la requête pour éviter les erreurs de syntaxe.
*/
?>

