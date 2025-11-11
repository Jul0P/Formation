import Trainer from '@/models/Trainer';
import TrainerRepository from '@/repositories/TrainerRepository';

class TrainerService {
  private trainerRepository: TrainerRepository;

  constructor(trainerRepository: TrainerRepository) {
    this.trainerRepository = trainerRepository;
  }

  public async getTrainerById(id: number): Promise<Trainer | null> {
    return this.trainerRepository.findById(id);
  }

  public async getAllTrainers(): Promise<Trainer[]> {
    return this.trainerRepository.findAll();
  }

  public async createTrainer(name: string): Promise<Trainer> {
    const trainer = new Trainer(null, name);
    return this.trainerRepository.create(trainer);
  }

  public async updateTrainer(trainer: Trainer): Promise<void> {
    return this.trainerRepository.update(trainer);
  }

  public async deleteTrainer(id: number): Promise<void> {
    return this.trainerRepository.delete(id);
  }

  public async healAllPokemons(trainerId: number): Promise<void> {
    const trainer = await this.trainerRepository.findById(trainerId);
    if (!trainer) {
      throw new Error('Dresseur non trouvé');
    }

    trainer.healAllPokemons();
    await this.trainerRepository.update(trainer);
  }
}

export default TrainerService;
