const { getUserInfo, getUserInfoRefactored, getUserInfoOptimized } = require('./user');

test('retourne nom et âge', () => {
  const user = { nom: 'Dupont', age: 30 };
  expect(getUserInfo(user)).toBe('DUPONT - Âge: 30');
  expect(getUserInfoRefactored(user)).toBe('DUPONT - Âge: 30');
  expect(getUserInfoOptimized(user)).toBe('DUPONT - Âge: 30');
});

test('retourne tous les champs', () => {
  const user = { nom: 'Martin', age: 25, email: 'martin@example.com', adresse: '123 Rue Principale' };

  const expected = 'MARTIN - Âge: 25 - Email: martin@example.com - Adresse: 123 Rue Principale';

  expect(getUserInfo(user)).toBe(expected);
  expect(getUserInfoRefactored(user)).toBe(expected);
  expect(getUserInfoOptimized(user)).toBe(expected);
});

test('ignore les champs vides', () => {
  const user = { nom: '', age: 0, email: '', adresse: '' };
  const expected = '';

  expect(getUserInfo(user)).toBe(expected);
  expect(getUserInfoRefactored(user)).toBe(expected);
  expect(getUserInfoOptimized(user)).toBe(expected);
});
