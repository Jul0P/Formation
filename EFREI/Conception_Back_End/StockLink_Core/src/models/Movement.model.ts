import PostgreDatabase from '@/config/postgre';
import { IMovement } from '@/types/movement.types';

class MovementModel {
  private postgreConfig: PostgreDatabase;

  constructor() {
    this.postgreConfig = PostgreDatabase.getInstance();
  }

  public async findAll(): Promise<IMovement[]> {
    try {
      const movements = await this.postgreConfig.query('SELECT * FROM movements');
      return movements.rows;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des mouvements');
    }
  }

  public async findById(id: string): Promise<IMovement | null> {
    try {
      const movement = await this.postgreConfig.query('SELECT * FROM movements WHERE id = $1', [id]);
      return movement.rows[0] || null;
    } catch (error) {
      throw new Error('Erreur lors de la récupération du mouvement');
    }
  }

  public async create(movementData: IMovement): Promise<IMovement> {
    try {
      const result = await this.postgreConfig.query('INSERT INTO movements (product_id, quantity, type) VALUES ($1, $2, $3) RETURNING *', [
        movementData.product_id,
        movementData.quantity,
        movementData.type,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error('Erreur lors de la création du mouvement');
    }
  }
}

export default MovementModel;
