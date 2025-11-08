import AttackController from '@/controllers/AttackController';
import { attackValidation, idParamValidation } from '@/middlewares/validators';
import AttackRepository from '@/repositories/AttackRepository';
import AttackService from '@/services/AttackService';
import { Router } from 'express';

const router = Router();

const attackRepository = new AttackRepository();
const attackService = new AttackService(attackRepository);
const attackController = new AttackController(attackService);

/**
 * @swagger
 * /api/attacks:
 *   get:
 *     summary: Liste toutes les attaques
 *     tags: [Attacks]
 *     responses:
 *       200:
 *         description: Liste de toutes les attaques
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attack'
 */
router.get('/', attackController.getAll);

/**
 * @swagger
 * /api/attacks/{id}:
 *   get:
 *     summary: Récupère une attaque par son ID
 *     tags: [Attacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'attaque
 *     responses:
 *       200:
 *         description: Détails de l'attaque
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attack'
 *       400:
 *         description: ID invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Attaque non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', idParamValidation, attackController.getById);

/**
 * @swagger
 * /api/attacks:
 *   post:
 *     summary: Crée une nouvelle attaque
 *     tags: [Attacks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AttackInput'
 *     responses:
 *       201:
 *         description: Attaque créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attack'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */
router.post('/', attackValidation, attackController.create);

/**
 * @swagger
 * /api/attacks/{id}:
 *   delete:
 *     summary: Supprime une attaque
 *     tags: [Attacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'attaque
 *     responses:
 *       204:
 *         description: Attaque supprimée avec succès
 *       400:
 *         description: ID invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */
router.delete('/:id', idParamValidation, attackController.delete);

export default router;
