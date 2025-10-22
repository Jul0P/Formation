import { Router } from 'express';
import AttackController from '../controllers/AttackController';
import AttackRepository from '../repositories/AttackRepository';
import AttackService from '../services/AttackService';

const router = Router();

const attackRepository = new AttackRepository();
const attackService = new AttackService(attackRepository);
const attackController = new AttackController(attackService);

router.post('/', attackController.create);
router.get('/', attackController.getAll);
router.get('/:id', attackController.getById);
router.delete('/:id', attackController.delete);

export default router;
