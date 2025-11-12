function getUserInfo(user) {
  let info = '';
  if (user.nom && user.nom !== '') {
    info += user.nom.toUpperCase();
  }
  if (user.age && user.age > 0) {
    if (info !== '') info += ' - ';
    info += 'Âge: ' + user.age;
  }
  if (user.email && user.email.includes('@')) {
    if (info !== '') info += ' - ';
    info += 'Email: ' + user.email;
  }
  if (user.adresse) {
    if (info !== '') info += ' - ';
    info += 'Adresse: ' + user.adresse;
  }
  return info;
}

// refactored version
function getUserInfoRefactored(user) {
  const infoParts = [];
  if (user.nom && user.nom !== '') {
    infoParts.push(user.nom.toUpperCase());
  }
  if (user.age && user.age > 0) {
    infoParts.push('Âge: ' + user.age);
  }
  if (user.email && user.email.includes('@')) {
    infoParts.push('Email: ' + user.email);
  }
  if (user.adresse) {
    infoParts.push('Adresse: ' + user.adresse);
  }
  return infoParts.join(' - ');
}

function getUserInfoOptimized(user) {
  const FORMATTERS = {
    nom: { validate: (v) => v?.trim(), format: (v) => v.toUpperCase() },
    age: { validate: (v) => v > 0, format: (v) => `Âge: ${v}` },
    email: { validate: (v) => v?.includes('@'), format: (v) => `Email: ${v}` },
    adresse: { validate: (v) => v?.trim(), format: (v) => `Adresse: ${v}` },
  };

  return Object.entries(FORMATTERS)
    .filter(([key, { validate }]) => validate(user[key]))
    .map(([key, { format }]) => format(user[key]))
    .join(' - ');
}

console.log(getUserInfo({ nom: 'Dupont', age: 30, email: 'dupont@example.com', adresse: '456 Rue Secondaire' }));
console.log(getUserInfoRefactored({ nom: 'Dupont', age: 30, email: 'dupont@example.com', adresse: '456 Rue Secondaire' }));
console.log(getUserInfoOptimized({ nom: 'Dupont', age: 30, email: 'dupont@example.com', adresse: '456 Rue Secondaire' }));

module.exports = { getUserInfo, getUserInfoRefactored, getUserInfoOptimized };
