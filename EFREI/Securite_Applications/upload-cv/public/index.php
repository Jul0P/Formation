<?php
  session_start();

  // Upload du fichier
  $message = null;
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once __DIR__ . '/../src/Upload.php';

    $upload = new Upload();
    if ($upload->upload()) {
      $message = 'Votre CV a bien été uploadé.';
    } else {
      $message = $_SESSION['message'] ?? 'Erreur lors de l\'upload.';
    }

    // Suppression du message d'erreur de la session pour qu'il ne s'affiche qu'une fois
    unset($_SESSION['message']);
  }
?>

<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload de CV</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/light.css">
  </head>
  <body>
    <h1>Upload de CV</h1>
    <hr/>
    <h3>Candidat</h3>
    <p>Merci d'uploader votre CV par ce formulaire</p>
    <form action="" method="post" enctype="multipart/form-data">
      <label for="lastname">Votre nom</label>
      <input type="text" name="lastname" id="lastname" required>

      <label for="firstname">Votre prénom</label>
      <input type="text" name="firstname" id="firstname" required>

      <label for="cv">Votre CV (PDF, max 1 Mo)</label>
      <input type="file" name="cv" id="cv" accept="application/pdf" required>

      <input type="submit" value="Envoyer">
    </form>

    <?php if (!empty($message)): ?>
      <div style="margin-top:1rem; padding:0.5rem; border:1px solid #ddd;">
        <?= htmlspecialchars($message, ENT_QUOTES); ?>
      </div>
    <?php endif; ?>
  </body>
</html>