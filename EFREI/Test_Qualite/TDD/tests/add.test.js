const { add } = require('../src/add');

describe('Fonction add', () => {
  // étape 1 (red)
  test('devrait additionner deux nombres positifs', () => {
    expect(add(2, 3)).toBe(5);
  });

  // cycle supplémentaire

  // étape 1 (red)
  test('devrait additionner deux nombres négatifs', () => {
    expect(add(-2, -3)).toBe(-5);
  });

  test('devrait additionner un nombre positif et un nombre négatif', () => {
    expect(add(5, -3)).toBe(2);
  });

  // refactor
  test('devrait lever une erreur si les paramètres ne sont pas des nombres', () => {
    expect(() => add('2', 3)).toThrow(TypeError);
    expect(() => add(2, '3')).toThrow(TypeError);
    expect(() => add('a', 'b')).toThrow('Les deux paramètres doivent être des nombres');
  });
});
