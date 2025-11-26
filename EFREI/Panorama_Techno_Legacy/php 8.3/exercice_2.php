<?php
$pdo = new PDO("mysql:host=localhost;dbname=test;charset=utf8mb4", "root", "");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$nom = "O'Connor";
$email = "test@example.com";

// Requêtes préparées : Évite les injections SQL.
// PDO : Abstraction de la base de données (compatible MySQL, PostgreSQL, etc.).
$stmt = $pdo->prepare("INSERT INTO utilisateurs (nom, email) VALUES (:nom, :email)");
$stmt->execute(['nom' => $nom, 'email' => $email]);

// Récupération des données
foreach ($pdo->query("SELECT * FROM utilisateurs") as $row) {
    echo htmlspecialchars($row['nom']) . " - " . htmlspecialchars($row['email']) . "<br>";
}
?>
