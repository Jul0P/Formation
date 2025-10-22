import { Request, Response } from 'express';
import BattleService from '../services/BattleService';
import TrainerService from '../services/TrainerService';

class BattleController {
  constructor(private battleService: BattleService, private trainerService: TrainerService) {}

  /** POST /battles/random-challenge */
  randomChallenge = async (req: Request, res: Response): Promise<void> => {
    const { trainer1Id, trainer2Id } = req.body;
    const trainer1 = await this.trainerService.getTrainerById(trainer1Id);
    const trainer2 = await this.trainerService.getTrainerById(trainer2Id);

    if (!trainer1 || !trainer2) {
      res.status(404).json({ error: 'Dresseur non trouvé' });
      return;
    }

    const result = await this.battleService.randomChallenge(trainer1, trainer2);
    res.json(result);
  };

  /** POST /battles/arena1 - 100 random battles */
  arena1 = async (req: Request, res: Response): Promise<void> => {
    const { trainer1Id, trainer2Id } = req.body;
    const trainer1 = await this.trainerService.getTrainerById(trainer1Id);
    const trainer2 = await this.trainerService.getTrainerById(trainer2Id);

    if (!trainer1 || !trainer2) {
      res.status(404).json({ error: 'Dresseur non trouvé' });
      return;
    }

    const result = await this.battleService.arena1(trainer1, trainer2);
    res.json(result);
  };

  /** POST /battles/deterministic-challenge */
  deterministicChallenge = async (req: Request, res: Response): Promise<void> => {
    const { trainer1Id, trainer2Id } = req.body;
    const trainer1 = await this.trainerService.getTrainerById(trainer1Id);
    const trainer2 = await this.trainerService.getTrainerById(trainer2Id);

    if (!trainer1 || !trainer2) {
      res.status(404).json({ error: 'Dresseur non trouvé' });
      return;
    }

    const result = await this.battleService.deterministicChallenge(trainer1, trainer2);
    res.json(result);
  };

  /** POST /battles/arena2 - 100 deterministic battles */
  arena2 = async (req: Request, res: Response): Promise<void> => {
    const { trainer1Id, trainer2Id } = req.body;
    const trainer1 = await this.trainerService.getTrainerById(trainer1Id);
    const trainer2 = await this.trainerService.getTrainerById(trainer2Id);

    if (!trainer1 || !trainer2) {
      res.status(404).json({ error: 'Dresseur non trouvé' });
      return;
    }

    const result = await this.battleService.arena2(trainer1, trainer2);
    res.json(result);
  };
}

export default BattleController;
