<?php

class Upload
{
  // Dossier sécurisé hors du répertoire public
  private string $uploadDirectory;

  // Extensions autorisées (simple mais obligatoire)
  private array $allowedExtensions = ['pdf'];

  // MIME autorisés (ajouté → renforce la sécurité contre les faux PDF)
  private array $allowedMimeTypes = ['application/pdf'];

  // Taille max (1 Mo)
  private int $maxFileSize = 1000000;

  // Rate limiting : nombre max d'uploads par intervalle de temps
  private int $maxUploadsPerMinute = 5;

  public function __construct()
  {
    // Utilisation de realpath (ajouté)
    // Empêche l'utilisation de chemins forgés (sécurité path traversal)
    // c'est quoi les chemins forgés ? : Des chemins qui utilisent des séquences comme "../" pour accéder à des répertoires parents
    $this->uploadDirectory = realpath(__DIR__ . '/../uploads') . DIRECTORY_SEPARATOR;

    // Création automatique du dossier (ajouté)
    // Dans le TP ce n'est pas obligatoire mais ici on assure la robustesse
    if (!is_dir($this->uploadDirectory)) {
      if (!mkdir($this->uploadDirectory, 0755, true) && !is_dir($this->uploadDirectory)) {
        throw new RuntimeException('Impossible de créer le dossier uploads.');
      }
    }
  }

  public function upload(): bool
  {
    // Vérifie que la session est active (ajouté)
    // Permet d'envoyer des messages d'erreur propres
    if (session_status() !== PHP_SESSION_ACTIVE) {
      session_start();
    }

    // Rate limiting : Protection anti-spam (ajouté)
    // Limite le nombre d'uploads par utilisateur pour éviter les attaques par déni de service
    if (!$this->checkRateLimit()) {
      $_SESSION['message'] = 'Trop d\'uploads. Réessayez dans quelques instants.';
      return false;
    }

    // Vérification des champs obligatoires
    if (empty($_FILES['cv']) || empty($_POST['lastname']) || empty($_POST['firstname'])) {
      $_SESSION['message'] = 'Merci de remplir tous les champs';
      return false;
    }

    $file = $_FILES['cv'];

    // Vérification que PHP a bien reçu les données
    if (!isset($file['error']) || is_array($file['error'])) {
      $_SESSION['message'] = 'Erreur fichier invalide.';
      return false;
    }

    if ($file['error'] !== UPLOAD_ERR_OK) {
      $_SESSION['message'] = $this->codeToMessage($file['error']);
      return false;
    }

    // Vérification via is_uploaded_file (ajoutée)
    // PRÉVENTION : empêche l’injection de fichiers non uploadés via HTTP POST
    if (!is_uploaded_file($file['tmp_name'])) {
      $_SESSION['message'] = 'Upload invalide.';
      return false;
    }

    // Vérification stricte de la taille réelle (améliorée)
    // Plus fiable que $_FILES['size']
    // pourquoi ? : Un attaquant pourrait manipuler la valeur dans $_FILES['size'] pour contourner les restrictions de taille.
    // comment manipuler ? : En utilisant des outils comme Burp Suite ou en modifiant directement la requête HTTP pour envoyer une valeur différente.
    $size = filesize($file['tmp_name']);
    if ($size === false || $size > $this->maxFileSize) {
      $_SESSION['message'] = 'Le fichier est trop volumineux (1Mo max)';
      return false;
    }

    // Vérification de l'extension
    $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($extension, $this->allowedExtensions, true)) {
      $_SESSION['message'] = 'Le fichier doit être un PDF (extension).';
      return false;
    }

    // Vérification du type MIME réel via finfo (ajoutée)
    // Empêche qu'un EXE renommé en .pdf passe
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($file['tmp_name']);
    if ($mime === false || !in_array($mime, $this->allowedMimeTypes, true)) {
      $_SESSION['message'] = 'Le fichier doit être un PDF (type MIME).';
      return false;
    }

    // Scan antivirus ClamAV (ajouté)
    // Détecte les malwares, virus et code malveillant dans le fichier
    if (!$this->scanWithClamAV($file['tmp_name'])) {
      $_SESSION['message'] = 'Le fichier contient une menace potentielle.';
      return false;
    }

    // Nettoyage des noms (ajouté)
    // Empêche injection, caractères spéciaux, accents
    $lastname = strtolower(preg_replace('/[^a-zA-Z]/', '', $_POST['lastname']));
    $firstname = strtolower(preg_replace('/[^a-zA-Z]/', '', $_POST['firstname']));

    // Génération d'un identifiant unique sécurisé (ajout majeur)
    // Évite collisions + empêche deviner les noms de fichiers
    try {
      $uniqId = bin2hex(random_bytes(8)); // sécurisé cryptographiquement
    } catch (Exception $e) {
      // fallback en cas d'erreur improbable
      $uniqId = preg_replace('/[^a-zA-Z0-9]/', '', uniqid('', true));
    }

    // Construction d'un nom de fichier sécurisé
    $filename = 'cv_' . $lastname . '_' . $firstname . '_' . $uniqId . '.' . $extension;

    $destination = $this->uploadDirectory . $filename;

    // Déplacement du fichier
    if (!move_uploaded_file($file['tmp_name'], $destination)) {
      $_SESSION['message'] = 'Erreur lors de l\'upload.';
      return false;
    }

    // Restriction volontaire des permissions (ajoutée)
    // Empêche l'exécution ou la modification par d'autres utilisateurs
    // explique : En limitant les permissions du fichier, on réduit le risque qu'un attaquant puisse exécuter ou modifier le fichier uploadé.
    @chmod($destination, 0644); // lecture/écriture pour le propriétaire, lecture pour les autres

    // Incrémenter le compteur d'uploads (ajouté)
    $this->incrementUploadCount();

    return true;
  }

  // Scan antivirus : ClamAV (ajouté)
  // Scanne le fichier avec ClamAV pour détecter les malwares
  // Nécessite : sudo apt install clamav clamav-daemon (Linux) ou brew install clamav (macOS)
  private function scanWithClamAV(string $filePath): bool
  {
    // Vérifier si clamscan est disponible
    $clamScanPath = trim(shell_exec('which clamscan 2>/dev/null') ?? '');

    if (empty($clamScanPath)) {
      // ClamAV non installé - log et autoriser (ou rejeter selon politique)
      error_log('ClamAV non installé - scan antivirus ignoré');
      return true; // À changer en false pour bloquer si ClamAV obligatoire
    }

    // Échapper le chemin du fichier pour éviter injection de commande
    $escapedPath = escapeshellarg($filePath);

    // Exécuter clamscan : --no-summary (pas de résumé), --infected (seulement si infecté)
    $output = [];
    $returnCode = 0;
    exec("clamscan --no-summary --infected {$escapedPath} 2>&1", $output, $returnCode);

    // Code retour 0 = fichier propre, 1 = virus détecté
    if ($returnCode === 0) {
      return true; // Fichier propre
    }

    // Virus détecté - logger l'information
    error_log('ClamAV: Virus détecté dans ' . basename($filePath) . ' - ' . implode(' ', $output));
    return false;
  }

  // Rate limiting : vérification (ajoutée)
  // Vérifie si l'utilisateur a dépassé la limite d'uploads autorisée
  // Protection contre les attaques par déni de service (DoS)
  private function checkRateLimit(): bool
  {
    // Initialisation du compteur si première visite
    if (!isset($_SESSION['upload_count'])) {
      $_SESSION['upload_count'] = 0;
      $_SESSION['upload_time'] = time();
      return true;
    }

    $elapsedTime = time() - $_SESSION['upload_time'];

    // Si plus d'une minute s'est écoulée, on réinitialise le compteur
    if ($elapsedTime >= 60) {
      $_SESSION['upload_count'] = 0;
      $_SESSION['upload_time'] = time();
      return true;
    }

    // Si le compteur dépasse la limite, on bloque
    return $_SESSION['upload_count'] < $this->maxUploadsPerMinute;
  }

  // Rate limiting : incrémentation (ajoutée)
  // Incrémente le compteur d'uploads après un upload réussi
  private function incrementUploadCount(): void
  {
    if (isset($_SESSION['upload_count'])) {
      $_SESSION['upload_count']++;
    }
  }

  // Fonction utilitaire pour traduire les codes d'erreur PHP
  private function codeToMessage(int $code): string
  {
    switch ($code) {
      case UPLOAD_ERR_INI_SIZE:
      case UPLOAD_ERR_FORM_SIZE:
        return 'Fichier trop volumineux.';
      case UPLOAD_ERR_PARTIAL:
        return 'Le fichier a été partiellement uploadé.';
      case UPLOAD_ERR_NO_FILE:
        return 'Aucun fichier envoyé.';
      case UPLOAD_ERR_NO_TMP_DIR:
        return 'Dossier temporaire manquant.';
      case UPLOAD_ERR_CANT_WRITE:
        return 'Écriture impossible.';
      case UPLOAD_ERR_EXTENSION:
        return 'Upload stoppé par une extension.';
      default:
        return 'Erreur inconnue.';
    }
  }
}
