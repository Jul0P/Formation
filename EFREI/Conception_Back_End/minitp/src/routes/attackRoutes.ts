import AttackController from '@/controllers/AttackController';
import AttackRepository from '@/repositories/AttackRepository';
import AttackService from '@/services/AttackService';
import { Router } from 'express';
import { attackValidation, idParamValidation } from '@/middlewares/validators';

const router = Router();

const attackRepository = new AttackRepository();
const attackService = new AttackService(attackRepository);
const attackController = new AttackController(attackService);

router.post('/', attackValidation, attackController.create);
router.get('/', attackController.getAll);
router.get('/:id', idParamValidation, attackController.getById);
router.delete('/:id', idParamValidation, attackController.delete);

export default router;
