import BattleService from '@/services/BattleService';
import TrainerService from '@/services/TrainerService';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

class BattleController {
  constructor(private battleService: BattleService, private trainerService: TrainerService) {}

  /** POST /battles/random-challenge */
  public randomChallenge = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { trainer1Id, trainer2Id } = req.body;
    const trainer1 = await this.trainerService.getTrainerById(trainer1Id);
    const trainer2 = await this.trainerService.getTrainerById(trainer2Id);

    if (!trainer1 || !trainer2) {
      res.status(404).json({ error: 'Dresseur non trouvé' });
      return;
    }

    const result = await this.battleService.randomChallenge(trainer1, trainer2);

    if (req.accepts('html')) {
      res.render('battles/result', { result, title: 'Résultat du combat' });
    } else {
      res.json(result);
    }
  };

  /** POST /battles/arena1 - 100 random battles */
  public arena1 = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { trainer1Id, trainer2Id } = req.body;
    const trainer1 = await this.trainerService.getTrainerById(trainer1Id);
    const trainer2 = await this.trainerService.getTrainerById(trainer2Id);

    if (!trainer1 || !trainer2) {
      res.status(404).json({ error: 'Dresseur non trouvé' });
      return;
    }

    const result = await this.battleService.arena1(trainer1, trainer2);

    if (req.accepts('html')) {
      res.render('battles/result', { result, title: 'Arène 1' });
    } else {
      res.json(result);
    }
  };

  /** POST /battles/deterministic-challenge */
  public deterministicChallenge = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { trainer1Id, trainer2Id } = req.body;
    const trainer1 = await this.trainerService.getTrainerById(trainer1Id);
    const trainer2 = await this.trainerService.getTrainerById(trainer2Id);

    if (!trainer1 || !trainer2) {
      res.status(404).json({ error: 'Dresseur non trouvé' });
      return;
    }

    const result = await this.battleService.deterministicChallenge(trainer1, trainer2);

    if (req.accepts('html')) {
      res.render('battles/result', { result, title: 'Combat déterministe' });
    } else {
      res.json(result);
    }
  };

  /** POST /battles/arena2 - 100 deterministic battles */
  public arena2 = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { trainer1Id, trainer2Id } = req.body;
    const trainer1 = await this.trainerService.getTrainerById(trainer1Id);
    const trainer2 = await this.trainerService.getTrainerById(trainer2Id);

    if (!trainer1 || !trainer2) {
      res.status(404).json({ error: 'Dresseur non trouvé' });
      return;
    }

    const result = await this.battleService.arena2(trainer1, trainer2);

    if (req.accepts('html')) {
      res.render('battles/result', { result, title: 'Arène 2' });
    } else {
      res.json(result);
    }
  };

  /** GET /battles/new - Show battle initiation form */
  public showBattleForm = async (req: Request, res: Response): Promise<void> => {
    const trainers = await this.trainerService.getAllTrainers();
    res.render('battles/form', { trainers, title: 'Lancer un combat' });
  };
}

export default BattleController;
