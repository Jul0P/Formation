import TrainerController from '@/controllers/TrainerController';
import { idParamValidation, trainerValidation } from '@/middlewares/validators';
import TrainerRepository from '@/repositories/TrainerRepository';
import TrainerService from '@/services/TrainerService';
import { Router } from 'express';

const router = Router();

const trainerRepo = new TrainerRepository();
const trainerService = new TrainerService(trainerRepo);
const controller = new TrainerController(trainerService);

router.post('/', trainerValidation, controller.create);
router.get('/', controller.getAll);
router.get('/:id', idParamValidation, controller.getById);
router.post('/:id/heal', idParamValidation, controller.healAll);
router.delete('/:id', idParamValidation, controller.delete);

export default router;
