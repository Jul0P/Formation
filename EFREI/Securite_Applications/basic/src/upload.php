<?php
require __DIR__.'/utils.php';
start_session();

if (empty($_SESSION['user'])) {
    header('Location: index.php');
    exit;
}

// AVANT
// $msg = '';
// if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
//     // VULNÉRABILITÉ 1 : Pas de protection CSRF
//     // Un site externe peut forcer l'upload d'un fichier malveillant
//
//     // VULNÉRABILITÉ 2 : Nom de fichier non sécurisé
//     $dest = __DIR__.'/uploads/'.basename($_FILES['file']['name']);
//     // Problème : Utilise le nom original du fichier
//     //   - Peut écraser des fichiers existants
//     //   - Nom prévisible (pas de randomisation)
//
//     // VULNÉRABILITÉ 3 : Pas de vérification MIME
//     // Accepte TOUS les fichiers : .php, .exe, .sh, etc.
//
//     // VULNÉRABILITÉ 4 : Pas de limite de taille
//     // Attaque DoS possible en uploadant des fichiers énormes
//
//     if (move_uploaded_file($_FILES['file']['tmp_name'], $dest)) {
//         $msg = "File uploaded to $dest";
//     }
// }
//

// APRÈS
$msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    // CORRECTION 1 : Vérification du token CSRF
    if (!verify_csrf_token($_POST['csrf_token'] ?? '')) {
      die('CSRF token invalid');
    }
    // Protection : Site externe ne peut pas forcer l'upload

    $file = $_FILES['file'];

    // CORRECTION 2 : Vérification de la taille (1 Mo exact)
    $maxSize = 1048576; // 1 Mo = 1024 * 1024 bytes
    if ($file['size'] > $maxSize) {
      $msg = "Fichier trop volumineux (maximum 1 Mo)";
    }
    // Protection DoS : Limite la taille pour éviter saturation disque

    // CORRECTION 3 : Validation stricte extension + MIME
    else {
      // Extensions autorisées explicites
      $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf'];
      $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

      if (!in_array($extension, $allowedExtensions)) {
        $msg = "Extension non autorisée (autorisées : JPG, PNG, GIF, PDF)";
      } else {
        // Types MIME avec correspondance extension
        $allowedMimes = [
          'image/jpeg' => ['jpg', 'jpeg'],
          'image/png' => ['png'],
          'image/gif' => ['gif'],
          'application/pdf' => ['pdf']
        ];

        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->file($file['tmp_name']);
        // Protection : Vérifie le contenu réel, pas juste l'extension
        //   - Empêche upload de shell.php renommé en shell.jpg

        // Vérifier que le MIME correspond à l'extension
        $extensionValid = false;
        foreach ($allowedMimes as $mimeType => $exts) {
          if ($mime === $mimeType && in_array($extension, $exts)) {
            $extensionValid = true;
            break;
          }
        }

        if (!$extensionValid) {
          $msg = "Type de fichier invalide (le contenu ne correspond pas à l'extension)";
        } else {
          // CORRECTION 4 : Génération d'un nom de fichier sécurisé avec timestamp
          $timestamp = date('Ymd_His');
          $randomId = bin2hex(random_bytes(4)); // 8 caractères hexa
          $safeName = "upload_{$timestamp}_{$randomId}.{$extension}";
          // Protection :
          //   - Nom avec date/heure pour traçabilité
          //   - ID aléatoire impossible à deviner
          //   - Pas d'écrasement de fichiers existants
          //   - Évite les attaques par nom de fichier (../../../etc/passwd)
          // Exemple : upload_20251203_143052_a3f8b2c1.pdf

          $dest = __DIR__.'/uploads/'.$safeName;

          if (move_uploaded_file($file['tmp_name'], $dest)) {
            // CORRECTION 5 : Permissions restrictives
            @chmod($dest, 0644);
            // Protection : Fichier en lecture seule (pas exécutable)
            $msg = "Fichier uploadé avec succès : {$safeName}";
          } else {
            $msg = "Erreur lors de l'upload";
          }
        }
      }
    }
}
//
?>
<!doctype html>
<html>
<head><title>Upload – Basic (Sécurisé)</title></head>
<body>
<h2>File upload (sécurisé)</h2>
<p><?= htmlspecialchars($msg) ?></p>

<!-- AVANT
<form method="post" enctype="multipart/form-data">
    Choose file: <input type="file" name="file"><br>
    <button type="submit">Upload</button>
</form>

PROBLÈMES :
  - Pas de token CSRF
  - Accepte tous les types de fichiers
  - Pas de limite de taille affichée
-->

<!-- APRÈS -->
<form method="post" enctype="multipart/form-data">
  Choose file: <input type="file" name="file" required><br>
  <small>Allowed: JPEG, PNG, GIF, PDF (max 1 Mo)</small><br>
  <!-- CORRECTION : Token CSRF ajouté -->
  <input type="hidden" name="csrf_token" value="<?= generate_csrf_token() ?>">
  <button type="submit">Upload</button>
</form>
<!-- -->
<p><a href="dashboard.php">Back to dashboard</a></p>
</body>
</html>
