function validateEmail(email) {
  // Vérifie le @
  if (!email.includes('@')) return false;

  // Sépare le nom et le domaine
  const parts = email.split('@');

  // email doit avoir 2 parties
  if (parts.length !== 2) return false;

  const [name, domain] = parts;

  // Le nom n'est pas vide
  if (!name || name.length === 0) return false;

  // Le domaine ne doit pas être vide et doit contenir un point
  if (!domain || domain.length === 0 || !domain.includes('.')) return false;

  return true;
}

module.exports = { validateEmail };
