import WarehouseController from '@/controllers/Warehourse.controller';
import AuthMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';

class WarehouseRoutes {
  public router: Router;
  private warehouseController: WarehouseController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.warehouseController = new WarehouseController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @swagger
     * /warehouses:
     *   get:
     *     summary: Récupère tous les entrepôts
     *     tags: [Warehouses]
     *     responses:
     *       200:
     *         description: Liste des entrepôts
     */
    this.router.get('/', this.warehouseController.list);

    /**
     * @swagger
     * /warehouses:
     *   post:
     *     summary: Crée un nouvel entrepôt (Authentifié)
     *     tags: [Warehouses]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               location:
     *                 type: string
     *     responses:
     *       201:
     *         description: Entrepôt créé
     *       401:
     *         description: Non authentifié
     */
    this.router.post('/', this.authMiddleware.authenticate, this.warehouseController.create);

    /**
     * @swagger
     * /warehouses/{id}/locations:
     *   get:
     *     summary: Récupère les emplacements d'un entrepôt
     *     tags: [Warehouses]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Liste des emplacements
     */
    this.router.get('/:id/locations', this.warehouseController.listLocations);

    /**
     * @swagger
     * /warehouses/{id}/locations:
     *   post:
     *     summary: Ajoute un emplacement à un entrepôt (Authentifié)
     *     tags: [Warehouses]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *     responses:
     *       201:
     *         description: Emplacement ajouté
     *       401:
     *         description: Non authentifié
     */
    this.router.post('/:id/locations', this.authMiddleware.authenticate, this.warehouseController.addLocation);

    /**
     * @swagger
     * /warehouses/{id}/locations:
     *   put:
     *     summary: Modifie un emplacement d'un entrepôt (Authentifié)
     *     tags: [Warehouses]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *     responses:
     *       200:
     *         description: Emplacement modifié
     *       401:
     *         description: Non authentifié
     */
    this.router.put('/:id/locations', this.authMiddleware.authenticate, this.warehouseController.updateLocation);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default WarehouseRoutes;
