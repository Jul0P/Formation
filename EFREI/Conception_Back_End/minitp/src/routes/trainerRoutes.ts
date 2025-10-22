import { Router } from 'express';
import TrainerController from '../controllers/TrainerController';
import TrainerRepository from '../repositories/TrainerRepository';
import TrainerService from '../services/TrainerService';

const router = Router();

const trainerRepo = new TrainerRepository();
const trainerService = new TrainerService(trainerRepo);
const controller = new TrainerController(trainerService);

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/:id/heal', controller.healAll);
router.delete('/:id', controller.delete);

export default router;
