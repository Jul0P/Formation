import Attack from '@/models/Attack';
import AttackRepository from '@/repositories/AttackRepository';

class AttackService {
  constructor(private attackRepository: AttackRepository) {}

  public async getAttackById(id: number): Promise<Attack | null> {
    return this.attackRepository.findById(id);
  }

  public async getAllAttacks(): Promise<Attack[]> {
    return this.attackRepository.findAll();
  }

  public async createAttack(name: string, damage: number, usageLimit: number): Promise<Attack> {
    const attack = new Attack(null, name, damage, usageLimit);
    return this.attackRepository.create(attack);
  }

  public async updateAttack(attack: Attack): Promise<void> {
    return this.attackRepository.update(attack);
  }

  public async deleteAttack(id: number): Promise<void> {
    return this.attackRepository.delete(id);
  }
}

export default AttackService;
