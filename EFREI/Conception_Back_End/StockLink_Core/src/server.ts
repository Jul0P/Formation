import MongoDatabase from '@/config/mongo';
import PostgreDatabase from '@/config/postgre';
import { swaggerSpec } from '@/config/swagger';
import { generalLimiter } from '@/middlewares/rateLimit.middleware';
import AuthRoutes from '@/routes/auth.route';
import LocationRoutes from '@/routes/location.route';
import MovementRoutes from '@/routes/movement.route';
import ProductRoutes from '@/routes/product.route';
import WarehouseRoutes from '@/routes/warehourse.route';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const { PORT, CORS_ORIGIN } = process.env;

class Server {
  private app: Application;
  private port: number;
  private mongoConfig: MongoDatabase;
  private postgreConfig: PostgreDatabase;

  constructor() {
    this.app = express();
    this.port = parseInt(PORT!);
    this.mongoConfig = MongoDatabase.getInstance();
    this.postgreConfig = PostgreDatabase.getInstance();

    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(helmet());

    this.app.use(
      cors({
        origin: CORS_ORIGIN,
        credentials: true,
      }),
    );

    this.app.use(generalLimiter);

    this.app.use(express.json());

    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    const locationRoutes = new LocationRoutes();
    const movementRoutes = new MovementRoutes();
    const productRoutes = new ProductRoutes();
    const warehouseRoutes = new WarehouseRoutes();
    const authRoutes = new AuthRoutes();

    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    this.app.use('/auth', authRoutes.getRouter());
    this.app.use('/locations', locationRoutes.getRouter());
    this.app.use('/movements', movementRoutes.getRouter());
    this.app.use('/products', productRoutes.getRouter());
    this.app.use('/warehouses', warehouseRoutes.getRouter());
  }

  public async start(): Promise<void> {
    try {
      await this.mongoConfig.connect();

      try {
        await this.postgreConfig.connect();
      } catch (error) {
        console.error('Erreur au démarrage (PostgreSQL):', error);
      }

      this.app.listen(this.port, () => {
        console.log('---------------------------------');
        console.log(`Serveur démarré sur le port ${this.port}`);
        console.log('---------------------------------');
        console.log('Bases de données :');
        console.log(`MongoDB: ${this.mongoConfig.getConnectionStatus() ? '✅' : '❌'}`);
        console.log(`PostgreSQL: ${this.postgreConfig.getConnectionStatus() ? '✅' : '❌'}`);
        console.log('---------------------------------');
      });
    } catch (error) {
      console.error('Erreur au démarrage (MongoDB):', error);
      process.exit(1);
    }
  }
}

const server = new Server();
server.start();
