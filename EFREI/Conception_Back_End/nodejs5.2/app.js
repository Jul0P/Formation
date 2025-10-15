import { randomUUID } from 'crypto';
import express from 'express';
import { firewall, loggerMiddleware } from './middlewares/auth.js';
import { addAuthenticatedUser, checkCredentials, newUserRegister } from './repositories/userRepository.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use(loggerMiddleware);
app.use(firewall);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/hello', (req, res) => {
  res.send('<h1>hello</h1>');
});

app.get('/restricted1', (req, res) => {
  res.json({ message: 'topsecret' });
});

app.get('/restricted2', (req, res) => {
  res.send('<h1>Admin space</h1>');
});

app.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  const user = await checkCredentials(email, password);

  if (!user) {
    return res.status(403).send('Identifiants invalides');
  }

  const token = randomUUID();

  await addAuthenticatedUser(token, user.id);

  res.json({ token });
});

app.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  await newUserRegister(email, password, role);

  res.send('Inscription réussie');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
