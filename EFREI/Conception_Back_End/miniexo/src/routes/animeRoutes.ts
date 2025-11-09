import AnimeController from '@/controllers/AnimeController';
import { animeValidation, mongoIdValidation, paginationValidation, searchValidation } from '@/middlewares/validators';
import AnimeService from '@/services/AnimeService';
import { Router } from 'express';

class AnimeRoutes {
  public router: Router;
  private animeService: AnimeService;
  private animeController: AnimeController;

  constructor() {
    this.router = Router();
    this.animeService = new AnimeService();
    this.animeController = new AnimeController(this.animeService);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Form route
    this.router.get('/new', this.animeController.showCreateForm);

    /**
     * @swagger
     * /api/animes:
     *   get:
     *     summary: Liste tous les animes avec pagination
     *     tags: [Animes]
     *     parameters:
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *           minimum: 1
     *           default: 1
     *         description: Numéro de la page
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *           minimum: 1
     *           maximum: 100
     *           default: 10
     *         description: Nombre d'animes par page
     *     responses:
     *       200:
     *         description: Liste paginée des animes
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/PaginatedResponse'
     *       400:
     *         description: Paramètres de pagination invalides
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ValidationError'
     */
    this.router.get('/', paginationValidation, this.animeController.list);

    /**
     * @swagger
     * /api/animes/search:
     *   get:
     *     summary: Recherche des animes avec filtres
     *     tags: [Animes]
     *     parameters:
     *       - in: query
     *         name: keyword
     *         schema:
     *           type: string
     *         description: Mot-clé à rechercher dans le titre et la description
     *         example: Naruto
     *       - in: query
     *         name: genre
     *         schema:
     *           type: string
     *         description: Filtrer par genre
     *         example: Shonen
     *       - in: query
     *         name: status
     *         schema:
     *           type: string
     *           enum: [ongoing, completed, upcoming]
     *         description: Filtrer par statut
     *       - in: query
     *         name: minRating
     *         schema:
     *           type: number
     *           minimum: 0
     *           maximum: 10
     *         description: Note minimale
     *         example: 8.0
     *     responses:
     *       200:
     *         description: Liste des animes correspondant aux critères
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Anime'
     *       400:
     *         description: Paramètres de recherche invalides
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ValidationError'
     */
    this.router.get('/search', searchValidation, this.animeController.search);

    /**
     * @swagger
     * /api/animes/{id}:
     *   get:
     *     summary: Récupère un anime par son ID
     *     tags: [Animes]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID MongoDB de l'anime
     *         example: 507f1f77bcf86cd799439011
     *     responses:
     *       200:
     *         description: Détails de l'anime
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Anime'
     *       400:
     *         description: ID invalide
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ValidationError'
     *       404:
     *         description: Anime non trouvé
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    this.router.get('/:id', mongoIdValidation, this.animeController.getById);

    /**
     * @swagger
     * /api/animes:
     *   post:
     *     summary: Crée un nouvel anime
     *     tags: [Animes]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/AnimeInput'
     *     responses:
     *       201:
     *         description: Anime créé avec succès
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Anime'
     *       400:
     *         description: Données invalides
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ValidationError'
     */
    this.router.post('/', animeValidation, this.animeController.create);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default AnimeRoutes;
