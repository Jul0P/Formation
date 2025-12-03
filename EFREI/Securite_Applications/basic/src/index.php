<?php
require __DIR__.'/utils.php';
start_session();

// AVANT
// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     global $USERS;
//     $user = $_POST['username'] ?? '';
//     $pass = $_POST['password'] ?? '';
//
//     if (isset($USERS[$user]) && password_verify($pass, $USERS[$user])) {
//         // VULNÉRABILITÉ 1 : SESSION FIXATION
//         if (!empty($_POST['sessid'])) {
//             session_id($_POST['sessid']);  // L'attaquant force son ID !
//         }
//         $_SESSION['user'] = $user;
//         header('Location: dashboard.php');
//         exit;
//     }
// }
//
// PROBLÈME : Session Fixation Attack
//   1. Attaquant crée une session avec ID connu : PHPSESSID=attacker123
//   2. Attaquant envoie lien piégé à la victime avec sessid=attacker123
//   3. Victime se connecte avec cet ID de session
//   4. Attaquant utilise PHPSESSID=attacker123 et accède au compte victime
//
// PROBLÈME 2 : Pas de protection CSRF
//   - Formulaire sans token CSRF
//   - Un site malveillant peut soumettre le formulaire à l'insu de l'utilisateur
//

// APRÈS
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // CORRECTION 1 : Vérification du token CSRF
    if (!verify_csrf_token($_POST['csrf_token'] ?? '')) {
      die('CSRF token invalid');
    }
    // Protection : Un site externe ne peut pas soumettre ce formulaire
    // car il ne connaît pas le token généré côté serveur

    global $USERS;
    $user = $_POST['username'] ?? '';
    $pass = $_POST['password'] ?? '';

    // CORRECTION 3 : Message d'erreur générique
    // AVANT : Messages précis révélaient si username existe
    //   - "Utilisateur inexistant" → énumération possible
    //   - "Mot de passe incorrect" → username existe
    // APRÈS : Message unique pour toutes les erreurs

    if (isset($USERS[$user]) && password_verify($pass, $USERS[$user])) {
      // CORRECTION 2 : Régénération de l'ID de session après login
      session_regenerate_id(true);
      // Protection Session Fixation :
      //   - PHP génère un NOUVEL ID de session aléatoire
      //   - L'ancien ID (fourni par l'attaquant) est invalidé
      //   - L'attaquant ne peut plus utiliser son ID pour accéder au compte

      $_SESSION['user'] = $user;
      header('Location: dashboard.php');
      exit;
    } else {
      // MESSAGE GÉNÉRIQUE : empêche énumération d'utilisateurs
      $error = 'Identifiants invalides';
      // Protection : L'attaquant ne sait pas si username ou password est faux
    }
}
//
?>
<!doctype html>
<html>
<head><title>Login – Basic (Sécurisé)</title></head>
<body>
<h2>Login (sécurisé)</h2>
<?php if (!empty($error)) echo "<p style='color:red;'>$error</p>"; ?>

<!-- AVANT
<form method="post">
    Username: <input name="username"><br>
    Password: <input type="password" name="password"><br>
    Session ID (optional): <input name="sessid">  <-- VULNÉRABLE
    <button type="submit">Log in</button>
</form>
PROBLÈME : Champ sessid permet la session fixation
-->

<!-- APRÈS -->
<form method="post">
  Username: <input name="username" required><br>
  Password: <input type="password" name="password" required><br>
  <!-- CORRECTION : Token CSRF ajouté -->
  <input type="hidden" name="csrf_token" value="<?= generate_csrf_token() ?>">
  <!-- Champ sessid SUPPRIMÉ : Plus de session fixation possible -->
  <button type="submit">Log in</button>
</form>
<!-- -->
</body>
</html>
