import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import logger from './middlewares/loggerMiddleware';

import Database from './config/database';
import { swaggerSpec } from './config/swagger';
import AttackRoutes from './routes/attackRoutes';
import BattleRoutes from './routes/battleRoutes';
import PokemonRoutes from './routes/pokemonRoutes';
import TrainerRoutes from './routes/trainerRoutes';

dotenv.config();

class Server {
  private app: Application;
  private port: number;
  private database: Database;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT!);
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
    this.app.use(logger);
  }

  private initializeRoutes(): void {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    this.app.get('/', (req: Request, res: Response) => {
      res.render('index', { title: 'Accueil' });
    });

    const trainerRoutes = new TrainerRoutes();
    const pokemonRoutes = new PokemonRoutes();
    const attackRoutes = new AttackRoutes();
    const battleRoutes = new BattleRoutes();

    this.app.use('/trainers', trainerRoutes.getRouter());
    this.app.use('/pokemon', pokemonRoutes.getRouter());
    this.app.use('/attacks', attackRoutes.getRouter());
    this.app.use('/battles', battleRoutes.getRouter());

    this.app.use('/api/trainers', trainerRoutes.getRouter());
    this.app.use('/api/pokemon', pokemonRoutes.getRouter());
    this.app.use('/api/attacks', attackRoutes.getRouter());
    this.app.use('/api/battles', battleRoutes.getRouter());
  }

  public async start(): Promise<void> {
    try {
      await this.database.connect();

      this.app.listen(this.port, () => {
        console.log(`
╔════════════════════════════════════════╗
║      🚀  Serveur Pokémon lancé         ║
║      📡  http://localhost:${this.port}         ║
║      🎮  Interface Web disponible      ║
║      📊  API REST disponible           ║
║  📚  Docs: http://localhost:${this.port}/docs  ║
╚════════════════════════════════════════╝
      `);
      });
    } catch (error) {
      console.error('Erreur au démarrage:', error);
      process.exit(1);
    }
  }

  public getApp(): Application {
    return this.app;
  }
}

const server = new Server();
server.start();
