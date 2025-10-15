import { getUserRole, isTokenValid } from '../repositories/userRepository.js';

export function loggerMiddleware(req, res, next) {
  console.log(req.headers);
  next();
}

export async function firewall(req, res, next) {
  const publicUrls = ['/', '/hello', '/authenticate', '/register'];

  if (publicUrls.includes(req.path)) {
    return next();
  }

  const token = req.header('authorization');

  if (!(await isTokenValid(token))) {
    return res.status(403).send('Accès refusé');
  }

  if (req.path === '/restricted2') {
    const role = await getUserRole(token);
    if (role !== 'admin') {
      return res.status(403).send('Accès refusé');
    }
  }

  next();
}
