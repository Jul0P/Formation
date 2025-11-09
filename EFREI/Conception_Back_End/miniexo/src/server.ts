import dotenv from 'dotenv';
import express, { Application } from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import Database from './config/database.js';
import { swaggerSpec } from './config/swagger.js';
import AnimeRoutes from './routes/animeRoutes.js';

dotenv.config();

const { PORT } = process.env;

class Server {
  private app: Application;
  private port: number;
  private database: Database;

  constructor() {
    this.app = express();
    this.port = parseInt(PORT!);
    this.database = Database.getInstance();

    this.initializeViewEngine();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeViewEngine(): void {
    const __dirname = import.meta.dirname;
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.use(expressEjsLayouts);
    this.app.set('layout', 'layout');
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    const animeRoutes = new AnimeRoutes();

    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    this.app.get('/', (req, res) => {
      res.render('index', { title: 'Accueil - API Anime' });
    });

    this.app.use('/animes', animeRoutes.getRouter());
    this.app.use('/api/animes', animeRoutes.getRouter());
  }

  public async start(): Promise<void> {
    try {
      await this.database.connect();

      this.app.listen(this.port, () => {
        console.log(`
╔════════════════════════════════════════╗
║      🚀  Serveur Anime lancé           ║
║      📡  http://localhost:${this.port}         ║
║   📚  Docs: http://localhost:${this.port}/docs ║
╚════════════════════════════════════════╝
        `);
      });
    } catch (error) {
      console.error('Erreur lors du démarrage du serveur :', error);
      process.exit(1);
    }
  }

  public getApp(): Application {
    return this.app;
  }
}

const server = new Server();
server.start();
