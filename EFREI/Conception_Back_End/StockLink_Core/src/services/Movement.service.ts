import MovementModel from '@/models/Movement.model';
import { IMovement } from '@/types/movement.types';

class MovementService {
  private movementModel: MovementModel;

  constructor() {
    this.movementModel = new MovementModel();
  }

  public async create(movementData: IMovement): Promise<IMovement> {
    try {
      const newMovement = await this.movementModel.create(movementData);
      return newMovement;
    } catch (error) {
      throw new Error('Erreur lors de la création du mouvement');
    }
  }

  public async list(): Promise<IMovement[]> {
    try {
      const movements = await this.movementModel.findAll();
      return movements;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des mouvements');
    }
  }
}

export default MovementService;
