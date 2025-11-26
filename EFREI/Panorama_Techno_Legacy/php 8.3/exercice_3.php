<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $login = $_POST['login'] ?? '';
    $password = $_POST['password'] ?? '';

    // Vérification basique (en réalité, utilise password_verify() avec un hash)
    if ($login === "admin" && $password === "1234") {
        // Utilisation de $_SESSION pour gérer l'état.
        $_SESSION['logged_in'] = true;
        echo "Connexion réussie (mais utilisez password_hash() en production !)";
    } else {
        echo "Échec de connexion";
    }
}
?>

<form method="post">
    Login: <input type="text" name="login" required><br>
    Password: <input type="password" name="password" required><br>
    <input type="submit" value="Se connecter">
</form>
