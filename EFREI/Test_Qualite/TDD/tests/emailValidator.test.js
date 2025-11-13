const { validateEmail } = require('../src/emailValidator');

// itération 1 : email basique
describe('Validateur Email - Itération 1', () => {
  test('devrait valider un email basique', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });
});

// itération 2 : email invalide
describe('Validateur Email - Itération 2', () => {
  test('devrait rejeter un email sans @', () => {
    expect(validateEmail('testexample.com')).toBe(false);
  });
});

// itération 3 : structure email
describe('Validateur Email - Itération 3', () => {
  test('devrait rejeter un email sans domaine après @', () => {
    expect(validateEmail('test@')).toBe(false);
  });

  test('devrait rejeter un email sans nom avant @', () => {
    expect(validateEmail('@example.com')).toBe(false);
  });

  test('devrait rejeter un email sans extension', () => {
    expect(validateEmail('test@example')).toBe(false);
  });
});
