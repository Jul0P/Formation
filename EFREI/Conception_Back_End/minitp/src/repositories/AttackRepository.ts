import Database from '@/config/database';
import Attack from '@/models/Attack';

class AttackRepository {
  private database: Database;

  constructor() {
    this.database = Database.getInstance();
  }

  public async findById(id: number): Promise<Attack | null> {
    const row = await this.database.getOne('SELECT * FROM attack WHERE id = $1', [id]);
    if (!row) {
      return null;
    }
    return new Attack(row.id, row.name, row.damage, row.usage_limit);
  }

  public async findAll(): Promise<Attack[]> {
    const result = await this.database.query('SELECT * FROM attack');
    return result.rows.map((row) => new Attack(row.id, row.name, row.damage, row.usage_limit));
  }

  public async create(attack: Attack): Promise<Attack> {
    const result = await this.database.getOne('INSERT INTO attack (name, damage, usage_limit) VALUES ($1, $2, $3) RETURNING *', [
      attack.name,
      attack.damage,
      attack.usageLimit,
    ]);
    return new Attack(result.id, result.name, result.damage, result.usage_limit);
  }

  public async update(attack: Attack): Promise<void> {
    await this.database.query('UPDATE attack SET name = $1, damage = $2, usage_limit = $3 WHERE id = $4', [
      attack.name,
      attack.damage,
      attack.usageLimit,
      attack.id,
    ]);
  }

  public async delete(id: number): Promise<void> {
    await this.database.query('DELETE FROM attack WHERE id = $1', [id]);
  }
}

export default AttackRepository;
