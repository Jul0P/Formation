import ProductController from '@/controllers/Product.controller';
import AuthMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';

class ProductRoutes {
  public router: Router;
  private productController: ProductController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.productController = new ProductController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @swagger
     * /products:
     *   get:
     *     summary: Récupère tous les produits
     *     tags: [Products]
     *     responses:
     *       200:
     *         description: Liste des produits
     */
    this.router.get('/', this.productController.list);

    /**
     * @swagger
     * /products:
     *   post:
     *     summary: Crée un nouveau produit (Authentifié)
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Product'
     *     responses:
     *       201:
     *         description: Produit créé
     *       401:
     *         description: Non authentifié
     */
    this.router.post('/', this.authMiddleware.authenticate, this.productController.create);

    /**
     * @swagger
     * /products/{id}:
     *   put:
     *     summary: Modifie un produit (Authentifié)
     *     tags: [Products]
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
     *             $ref: '#/components/schemas/Product'
     *     responses:
     *       200:
     *         description: Produit modifié
     *       401:
     *         description: Non authentifié
     */
    this.router.put('/:id', this.authMiddleware.authenticate, this.productController.update);

    /**
     * @swagger
     * /products/{id}:
     *   delete:
     *     summary: Supprime un produit (Admin uniquement)
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Produit supprimé
     *       401:
     *         description: Non authentifié
     *       403:
     *         description: Accès refusé - Admin uniquement
     */
    this.router.delete('/:id', this.authMiddleware.authenticate, this.authMiddleware.isAdmin, this.productController.delete);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default ProductRoutes;
