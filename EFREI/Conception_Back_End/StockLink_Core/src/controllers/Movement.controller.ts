import MovementService from '@/services/Movement.service';
import { NextFunction, Request, Response } from 'express';

class MovementController {
  private movementService: MovementService;

  constructor() {
    this.movementService = new MovementService();
  }

  /**
   * GET /movements - Liste l'historique des mouvements de stock
   */
  public list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const movements = await this.movementService.list();

      res.status(200).json(movements);
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /movements - Enregistre un nouveau mouvement (entrée ou sortie) et met à jour le stock
   */
  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const movementData = req.body;
      const newMovement = await this.movementService.create(movementData);

      res.status(201).json(newMovement);
    } catch (error) {
      next(error);
    }
  };
}

export default MovementController;
