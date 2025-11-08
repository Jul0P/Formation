import TrainerController from '@/controllers/TrainerController';
import { idParamValidation, trainerValidation } from '@/middlewares/validators';
import TrainerRepository from '@/repositories/TrainerRepository';
import TrainerService from '@/services/TrainerService';
import { Router } from 'express';

const router = Router();

const trainerRepo = new TrainerRepository();
const trainerService = new TrainerService(trainerRepo);
const controller = new TrainerController(trainerService);

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
router.get('/', controller.getAll);

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
router.get('/:id', idParamValidation, controller.getById);

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
router.post('/', trainerValidation, controller.create);

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
router.post('/:id/heal', idParamValidation, controller.healAll);

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
router.delete('/:id', idParamValidation, controller.delete);

export default router;
