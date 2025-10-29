import TrainerService from '@/services/TrainerService';
import { Request, Response } from 'express';

class TrainerController {
  constructor(private trainerService: TrainerService) {}

  /** GET /trainers */
  public getAll = async (req: Request, res: Response): Promise<void> => {
    const trainers = await this.trainerService.getAllTrainers();
    res.json(trainers);
  };

  /** GET /trainers/:id */
  public getById = async (req: Request, res: Response): Promise<void> => {
    const trainer = await this.trainerService.getTrainerById(parseInt(req.params.id));

    if (!trainer) {
      res.status(404).json({ error: 'Dresseur non trouvé' });
      return;
    }

    res.json(trainer);
  };

  /** POST /trainers/:id/heal - Heals all trainer's Pokémon */
  public healAll = async (req: Request, res: Response): Promise<void> => {
    await this.trainerService.healAllPokemons(parseInt(req.params.id));
    res.json({ message: 'Tous les Pokémon ont été soignés' });
  };

  /** POST /trainers */
  public create = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;
    const trainer = await this.trainerService.createTrainer(name);
    res.status(201).json(trainer);
  };

  /** DELETE /trainers/:id */
  public delete = async (req: Request, res: Response): Promise<void> => {
    await this.trainerService.deleteTrainer(parseInt(req.params.id));
    res.status(204).send();
  };
}

export default TrainerController;
