import MovementController from '@/controllers/Movement.controller';
import AuthMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';

class MovementRoutes {
  public router: Router;
  private movementController: MovementController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.movementController = new MovementController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @swagger
     * /movements:
     *   get:
     *     summary: Récupère tous les mouvements
     *     tags: [Movements]
     *     responses:
     *       200:
     *         description: Liste des mouvements
     */
    this.router.get('/', this.movementController.list);

    /**
     * @swagger
     * /movements:
     *   post:
     *     summary: Crée un nouveau mouvement (Authentifié)
     *     tags: [Movements]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Movement'
     *     responses:
     *       201:
     *         description: Mouvement créé
     *       401:
     *         description: Non authentifié
     */
    this.router.post('/', this.authMiddleware.authenticate, this.movementController.create);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default MovementRoutes;
