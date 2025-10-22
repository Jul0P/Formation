import { Router } from 'express';
import BattleController from '../controllers/BattleController';
import TrainerRepository from '../repositories/TrainerRepository';
import BattleService from '../services/BattleService';
import TrainerService from '../services/TrainerService';

const router = Router();

const trainerRepo = new TrainerRepository();
const trainerService = new TrainerService(trainerRepo);
const battleService = new BattleService(trainerService);
const battleController = new BattleController(battleService, trainerService);

router.post('/random-challenge', battleController.randomChallenge);
router.post('/arena1', battleController.arena1);
router.post('/deterministic-challenge', battleController.deterministicChallenge);
router.post('/arena2', battleController.arena2);

export default router;
