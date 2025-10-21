import { Request, Response } from 'express';
import TrainerService from '../services/TrainerService';

class TrainerController {
  constructor(private trainerService: TrainerService) {}

  public getAll = async (req: Request, res: Response): Promise<void> => {
    const trainers = await this.trainerService.getAllTrainers();
    res.json(trainers);
  };

  public getById = async (req: Request, res: Response): Promise<void> => {
    const trainer = await this.trainerService.getTrainerById(parseInt(req.params.id));

    if (!trainer) {
      res.status(404).json({ error: 'Dresseur non trouvé' });
      return;
    }

    res.json(trainer);
  };

  public healAll = async (req: Request, res: Response): Promise<void> => {
    await this.trainerService.healAllPokemons(parseInt(req.params.id));
    res.json({ message: 'Tous les Pokémon ont été soignés' });
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;
    const trainer = await this.trainerService.createTrainer(name);
    res.status(201).json(trainer);
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    await this.trainerService.deleteTrainer(parseInt(req.params.id));
    res.status(204).send();
  };
}

export default TrainerController;
