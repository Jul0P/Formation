function add(a, b) {
  // étape 3 (refactor)
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Les deux paramètres doivent être des nombres');
  }

  // étape 2 (green)
  return a + b;
}

module.exports = { add };
