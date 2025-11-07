import dotenv from 'dotenv';
import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

import database from './config/database.js';
import { swaggerSpec } from './config/swagger.js';
import animeRoutes from './routes/animeRoutes.js';

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

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.render('index', { title: 'Accueil - API Anime' });
});

app.use('/animes', animeRoutes);
app.use('/api/animes', animeRoutes);

async function startServer() {
  try {
    await database.connect();

    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║      🚀  Serveur Anime lancé           ║
║      📡  http://localhost:${PORT}         ║
║   📚  Docs: http://localhost:${PORT}/docs ║
╚════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur :', error);
    process.exit(1); // Leave the process on errors
  }
}

startServer();
