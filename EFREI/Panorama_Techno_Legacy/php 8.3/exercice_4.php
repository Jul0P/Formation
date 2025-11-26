<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file           = $_FILES['file'];
    $allowedTypes   = ['image/jpeg', 'image/png'];
    $maxSize        = 2 * 1024 * 1024; // 2 Mo

    // $_FILES : Remplace $HTTP_POST_FILES.
    // Vérification du type MIME : Plus fiable que l'extension.
    if (in_array($file['type'], $allowedTypes) && $file['size'] <= $maxSize) {
        $dest = "uploads/" . bin2hex(random_bytes(8)) . "_" . basename($file['name']);
        // Nom de fichier aléatoire : Évite les collisions et les attaques par nom de fichier.
        if (move_uploaded_file($file['tmp_name'], $dest)) {
            echo "Fichier uploadé : <img src='$dest' width='200'>";
        } else {
            echo "Échec de l'upload";
        }
    } else {
        echo "Type de fichier invalide ou trop volumineux";
    }
}
?>

<form enctype="multipart/form-data" method="post">
    <input type="file" name="file" required><br>
    <input type="submit" value="Uploader">
</form>
