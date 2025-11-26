<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

if (isset($HTTP_POST_FILES['file'])) {
    $file = $HTTP_POST_FILES['file'];

    // Vérification basique (insuffisante)
    // Un attaquant upload un fichier shell.php renommé en shell.php.jpg si le serveur est configuré pour exécuter les fichiers .php même avec une double extension
    if (preg_match('/\.(jpg|png)$/i', $file['name'])) {
        $dest = "uploads/" . basename($file['name']);
        if (copy($file['tmp_name'], $dest)) {
            echo "Fichier uploadé : <img src='$dest' width='200'>";
        } else {
            echo "Échec de l'upload";
        }
    } else {
        echo "Seules les images JPG/PNG sont autorisées";
    }
}

// Un fichier .php renommé en .jpg passera.
?>

<form enctype="multipart/form-data" method="post">
    <input type="file" name="file"><br>
    <input type="submit" value="Uploader">
</form>