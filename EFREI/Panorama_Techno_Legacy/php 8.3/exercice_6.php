<?php
$email = "user@sub.domain.com";

// preg_match() : Utilise PCRE (Perl-Compatible Regular Expressions), plus puissant.
// Pattern mis à jour : Supporte les sous-domaines et les nouveaux TLDs.
if (preg_match("/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/", $email)) {
    echo "Email valide";
} else {
    echo "Email invalide";
}
?>

