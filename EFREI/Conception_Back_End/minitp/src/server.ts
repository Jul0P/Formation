import dotenv from 'dotenv';
import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
import logger from './middlewares/loggerMiddleware';

import database from './config/database';
import attackRoutes from './routes/attackRoutes';
import battleRoutes from './routes/battleRoutes';
import pokemonRoutes from './routes/pokemonRoutes';
import trainerRoutes from './routes/trainerRoutes';

dotenv.config();

const app = express();
const { PORT } = process.env;
const __dirname = import.meta.dirname;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressEjsLayouts);
app.set('layout', 'layout');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.get('/', (req, res) => {
  res.render('index', { title: 'Accueil' });
});

app.use('/trainers', trainerRoutes);
app.use('/pokemon', pokemonRoutes);
app.use('/attacks', attackRoutes);
app.use('/battles', battleRoutes);

app.use('/api/trainers', trainerRoutes);
app.use('/api/pokemon', pokemonRoutes);
app.use('/api/attacks', attackRoutes);
app.use('/api/battles', battleRoutes);

async function startServer() {
  try {
    await database.connect();

    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║      🚀  Serveur Pokémon lancé         ║
║      📡  http://localhost:${PORT}         ║
║      🎮  Interface Web disponible      ║
║      📊  API REST disponible           ║
╚════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Erreur au démarrage:', error);
    process.exit(1); // Leave the process on error
  }
}

startServer();

export default app;
