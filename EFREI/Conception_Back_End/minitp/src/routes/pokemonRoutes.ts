import PokemonController from '@/controllers/PokemonController';
import { idParamValidation, learnAttackValidation, pokemonValidation } from '@/middlewares/validators';
import AttackRepository from '@/repositories/AttackRepository';
import PokemonRepository from '@/repositories/PokemonRepository';
import PokemonService from '@/services/PokemonService';
import { Router } from 'express';

class PokemonRoutes {
  public router: Router;
  private pokemonRepository: PokemonRepository;
  private attackRepository: AttackRepository;
  private pokemonService: PokemonService;
  private pokemonController: PokemonController;

  constructor() {
    this.router = Router();
    this.pokemonRepository = new PokemonRepository();
    this.attackRepository = new AttackRepository();
    this.pokemonService = new PokemonService(this.pokemonRepository, this.attackRepository);
    this.pokemonController = new PokemonController(this.pokemonService);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @swagger
     * /api/pokemon:
     *   get:
     *     summary: Liste tous les Pokémon
     *     tags: [Pokemon]
     *     responses:
     *       200:
     *         description: Liste de tous les Pokémon
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Pokemon'
     */
    this.router.get('/', this.pokemonController.getAll);

    /**
     * @swagger
     * /api/pokemon/{id}:
     *   get:
     *     summary: Récupère un Pokémon par son ID
     *     tags: [Pokemon]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID du Pokémon
     *     responses:
     *       200:
     *         description: Détails du Pokémon
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Pokemon'
     *       400:
     *         description: ID invalide
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ValidationError'
     *       404:
     *         description: Pokémon non trouvé
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    this.router.get('/:id', idParamValidation, this.pokemonController.getById);

    /**
     * @swagger
     * /api/pokemon:
     *   post:
     *     summary: Crée un nouveau Pokémon
     *     tags: [Pokemon]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/PokemonInput'
     *     responses:
     *       201:
     *         description: Pokémon créé avec succès
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Pokemon'
     *       400:
     *         description: Données invalides
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ValidationError'
     */
    this.router.post('/', pokemonValidation, this.pokemonController.create);

    /**
     * @swagger
     * /api/pokemon/{id}/learn-attack:
     *   post:
     *     summary: Apprendre une attaque à un Pokémon
     *     tags: [Pokemon]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID du Pokémon
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [attackId]
     *             properties:
     *               attackId:
     *                 type: integer
     *                 minimum: 1
     *                 example: 1
     *     responses:
     *       200:
     *         description: Attaque apprise avec succès
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Pokemon'
     *       400:
     *         description: Données invalides ou limite d'attaques atteinte
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ValidationError'
     */
    this.router.post('/:id/learn-attack', learnAttackValidation, this.pokemonController.learnAttack);

    /**
     * @swagger
     * /api/pokemon/{id}:
     *   delete:
     *     summary: Supprime un Pokémon
     *     tags: [Pokemon]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID du Pokémon
     *     responses:
     *       204:
     *         description: Pokémon supprimé avec succès
     *       400:
     *         description: ID invalide
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ValidationError'
     */
    this.router.delete('/:id', idParamValidation, this.pokemonController.delete);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default PokemonRoutes;
