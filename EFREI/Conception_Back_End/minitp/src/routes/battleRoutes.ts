import BattleController from '@/controllers/BattleController';
import { battleValidation } from '@/middlewares/validators';
import TrainerRepository from '@/repositories/TrainerRepository';
import BattleService from '@/services/BattleService';
import TrainerService from '@/services/TrainerService';
import { Router } from 'express';

const router = Router();

const trainerRepo = new TrainerRepository();
const trainerService = new TrainerService(trainerRepo);
const battleService = new BattleService(trainerService);
const battleController = new BattleController(battleService, trainerService);

/**
 * @swagger
 * /api/battles/new:
 *   get:
 *     summary: Affiche le formulaire de bataille
 *     tags: [Battles]
 *     responses:
 *       200:
 *         description: Page HTML du formulaire de bataille
 */
router.get('/new', battleController.showBattleForm);

/**
 * @swagger
 * /api/battles/random-challenge:
 *   post:
 *     summary: Lance un combat aléatoire entre deux dresseurs
 *     description: Combat avec sélection aléatoire des Pokémon et des attaques. Le gagnant reçoit 50 points d'expérience.
 *     tags: [Battles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BattleRequest'
 *     responses:
 *       200:
 *         description: Résultat du combat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BattleResult'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Un ou plusieurs dresseurs n'ont pas été trouvés
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/random-challenge', battleValidation, battleController.randomChallenge);

/**
 * @swagger
 * /api/battles/arena1:
 *   post:
 *     summary: Lance 100 combats aléatoires entre deux dresseurs
 *     description: Effectue 100 combats avec sélection aléatoire. Retourne les statistiques complètes et le gagnant final.
 *     tags: [Battles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BattleRequest'
 *     responses:
 *       200:
 *         description: Résultats de l'arène (100 combats)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalBattles:
 *                   type: integer
 *                   example: 100
 *                 trainer1Wins:
 *                   type: integer
 *                   example: 58
 *                 trainer2Wins:
 *                   type: integer
 *                   example: 42
 *                 overallWinner:
 *                   type: string
 *                   example: "Sacha"
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Un ou plusieurs dresseurs n'ont pas été trouvés
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/arena1', battleValidation, battleController.arena1);

/**
 * @swagger
 * /api/battles/deterministic-challenge:
 *   post:
 *     summary: Lance un combat déterministe entre deux dresseurs
 *     description: Combat avec sélection déterministe - toujours le premier Pokémon et la première attaque. Résultats reproductibles.
 *     tags: [Battles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BattleRequest'
 *     responses:
 *       200:
 *         description: Résultat du combat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BattleResult'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Un ou plusieurs dresseurs n'ont pas été trouvés
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/deterministic-challenge', battleValidation, battleController.deterministicChallenge);

/**
 * @swagger
 * /api/battles/arena2:
 *   post:
 *     summary: Lance 100 combats déterministes entre deux dresseurs
 *     description: Effectue 100 combats avec sélection déterministe. Résultats parfaitement reproductibles.
 *     tags: [Battles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BattleRequest'
 *     responses:
 *       200:
 *         description: Résultats de l'arène (100 combats)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalBattles:
 *                   type: integer
 *                   example: 100
 *                 trainer1Wins:
 *                   type: integer
 *                   example: 100
 *                 trainer2Wins:
 *                   type: integer
 *                   example: 0
 *                 overallWinner:
 *                   type: string
 *                   example: "Sacha"
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Un ou plusieurs dresseurs n'ont pas été trouvés
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/arena2', battleValidation, battleController.arena2);

export default router;
