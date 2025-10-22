import { Request, Response } from 'express';
import AttackService from '../services/AttackService';

class AttackController {
  constructor(private attackService: AttackService) {}

  /** GET /attacks */
  public getAll = async (req: Request, res: Response): Promise<void> => {
    const attacks = await this.attackService.getAllAttacks();
    res.json(attacks);
  };

  /** GET /attacks/:id */
  public getById = async (req: Request, res: Response): Promise<void> => {
    const attack = await this.attackService.getAttackById(parseInt(req.params.id));

    if (!attack) {
      res.status(404).json({ error: 'Attaque non trouvée' });
      return;
    }

    res.json(attack);
  };

  /** POST /attacks */
  public create = async (req: Request, res: Response): Promise<void> => {
    const { name, damage, usageLimit } = req.body;
    const attack = await this.attackService.createAttack(name, damage, usageLimit);
    res.status(201).json(attack);
  };

  /** DELETE /attacks/:id */
  public delete = async (req: Request, res: Response): Promise<void> => {
    await this.attackService.deleteAttack(parseInt(req.params.id));
    res.status(204).send();
  };
}

export default AttackController;
