import TrainerController from '@/controllers/TrainerController';
import { idParamValidation, trainerValidation } from '@/middlewares/validators';
import TrainerRepository from '@/repositories/TrainerRepository';
import TrainerService from '@/services/TrainerService';
import { Router } from 'express';

class TrainerRoutes {
  public router: Router;
  private trainerRepository: TrainerRepository;
  private trainerService: TrainerService;
  private trainerController: TrainerController;

  constructor() {
    this.router = Router();
    this.trainerRepository = new TrainerRepository();
    this.trainerService = new TrainerService(this.trainerRepository);
    this.trainerController = new TrainerController(this.trainerService);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @swagger
     * /api/trainers:
     *   get:
     *     summary: Liste tous les dresseurs
     *     tags: [Trainers]
     *     responses:
     *       200:
     *         description: Liste de tous les dresseurs
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Trainer'
     */
    this.router.get('/', this.trainerController.getAll);

    /**
     * @swagger
     * /api/trainers/{id}:
     *   get:
     *     summary: Récupère un dresseur par son ID
     *     tags: [Trainers]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID du dresseur
     *     responses:
     *       200:
     *         description: Détails du dresseur avec ses Pokémon
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Trainer'
     *       400:
     *         description: ID invalide
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ValidationError'
     *       404:
     *         description: Dresseur non trouvé
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    this.router.get('/:id', idParamValidation, this.trainerController.getById);

    /**
     * @swagger
     * /api/trainers:
     *   post:
     *     summary: Crée un nouveau dresseur
     *     tags: [Trainers]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/TrainerInput'
     *     responses:
     *       201:
     *         description: Dresseur créé avec succès
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Trainer'
     *       400:
     *         description: Données invalides
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ValidationError'
     */
    this.router.post('/', trainerValidation, this.trainerController.create);

    /**
     * @swagger
     * /api/trainers/{id}/heal:
     *   post:
     *     summary: Soigne tous les Pokémon d'un dresseur
     *     tags: [Trainers]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID du dresseur
     *     responses:
     *       200:
     *         description: Pokémon soignés avec succès
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Tous les Pokémon ont été soignés"
     *       400:
     *         description: ID invalide
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ValidationError'
     */
    this.router.post('/:id/heal', idParamValidation, this.trainerController.healAll);

    /**
     * @swagger
     * /api/trainers/{id}:
     *   delete:
     *     summary: Supprime un dresseur
     *     tags: [Trainers]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID du dresseur
     *     responses:
     *       204:
     *         description: Dresseur supprimé avec succès
     *       400:
     *         description: ID invalide
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ValidationError'
     */
    this.router.delete('/:id', idParamValidation, this.trainerController.delete);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default TrainerRoutes;
