<?php
require __DIR__.'/utils.php';
start_session();

if (empty($_SESSION['user'])) {
  header('Location: index.php');
  exit;
}
?>
<!doctype html>
<html>
<head><title>Dashboard – Basic (Sécurisé)</title></head>
<body>
<h2>Welcome, <?= htmlspecialchars($_SESSION['user']) ?></h2>

<!-- AVANT
<?php
// VULNÉRABILITÉ : XSS Reflected (Cross-Site Scripting)
if (isset($_GET['msg'])) {
  echo $_GET['msg'];  // pas échappement
}
?>

PROBLÈME : Injection de code JavaScript
  Exemple d'attaque :
    http://site.com/dashboard.php?msg=<script>alert(document.cookie)</script>

  Résultat :
    - Le script est exécuté dans le navigateur de la victime
    - L'attaquant peut voler les cookies (si pas httponly)
    - L'attaquant peut modifier le DOM, rediriger, etc.
-->

<!-- APRÈS -->
<?php
// CORRECTION : XSS corrigée avec htmlspecialchars()
if (isset($_GET['msg'])) {
  echo htmlspecialchars($_GET['msg'], ENT_QUOTES, 'UTF-8');
  // Protection :
  //   - < devient &lt;
  //   - > devient &gt;
  //   - " devient &quot;
  //   - ' devient &#039;
  // Le script est affiché comme texte et pas exécuté
}
?>
<!-- -->

<!-- AVANT
<p>
  <a href="upload.php">Upload a file</a> |
  <a href="logout.php">Logout</a>  <-- Lien GET vulnérable CSRF
</p>

PROBLÈME CSRF sur logout :
  Un site malveillant peut forcer la déconnexion :
    <img src="http://site.com/logout.php">
  La victime est déconnectée sans le savoir
-->

<!-- APRÈS -->
<p><a href="upload.php">Upload a file</a> |
<form method="post" action="logout.php" style="display:inline;">
  <!-- CORRECTION : Logout protégé par token CSRF -->
  <input type="hidden" name="csrf_token" value="<?= generate_csrf_token() ?>">
  <button type="submit">Logout</button>
</form>
<!-- Protection : Site externe ne peut pas soumettre ce formulaire -->
</p>
<!-- -->
</body>
</html>
