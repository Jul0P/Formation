import database from '../config/database';
import Attack from '../models/Attack';
import Pokemon from '../models/Pokemon';

class PokemonRepository {
  constructor() {}

  public async findById(id: number): Promise<Pokemon | null> {
    const row = await database.getOne('SELECT * FROM pokemon WHERE id = $1', [id]);
    if (!row) {
      return null;
    }
    const pokemon = new Pokemon(row.id, row.name, row.life_point, row.max_life_point, row.trainer_id);
    const attacks = await this.getAttacksForPokemon(pokemon.id!);
    attacks.forEach((attack) => pokemon.learnAttack(attack));
    return pokemon;
  }

  public async findByTrainerId(trainerId: number): Promise<Pokemon[]> {
    const result = await database.query('SELECT * FROM pokemon WHERE trainer_id = $1', [trainerId]);

    return Promise.all(
      result.rows.map(async (row) => {
        const pokemon = new Pokemon(row.id, row.name, row.life_point, row.max_life_point, row.trainer_id);
        const attacks = await this.getAttacksForPokemon(pokemon.id!);
        attacks.forEach((attack) => pokemon.learnAttack(attack));
        return pokemon;
      }),
    );
  }

  public async findAll(): Promise<Pokemon[]> {
    const result = await database.query('SELECT * FROM pokemon');
    return Promise.all(
      result.rows.map(async (row) => {
        const pokemon = new Pokemon(row.id, row.name, row.life_point, row.max_life_point, row.trainer_id);
        const attacks = await this.getAttacksForPokemon(pokemon.id!);
        attacks.forEach((attack) => pokemon.learnAttack(attack));
        return pokemon;
      }),
    );
  }

  public async create(pokemon: Pokemon): Promise<Pokemon> {
    const result = await database.getOne('INSERT INTO pokemon (name, life_point, max_life_point, trainer_id) VALUES ($1, $2, $3, $4) RETURNING *', [
      pokemon.name,
      pokemon.lifePoint,
      pokemon.maxLifePoint,
      pokemon.trainerId,
    ]);

    return new Pokemon(result.id, result.name, result.life_point, result.max_life_point, result.trainer_id);
  }

  public async update(pokemon: Pokemon): Promise<void> {
    await database.query('UPDATE pokemon SET life_point = $1, max_life_point = $2, trainer_id = $3 WHERE id = $4', [
      pokemon.lifePoint,
      pokemon.maxLifePoint,
      pokemon.trainerId,
      pokemon.id,
    ]);

    for (const attack of pokemon.getAttacks()) {
      await database.query('UPDATE pokemon_attack SET current_usage = $1 WHERE pokemon_id = $2 AND attack_id = $3', [
        attack.currentUsage,
        pokemon.id,
        attack.id,
      ]);
    }
  }

  public async delete(id: number): Promise<void> {
    await database.query('DELETE FROM pokemon WHERE id = $1', [id]);
  }

  public async learnAttack(pokemonId: number, attackId: number): Promise<void> {
    await database.query('INSERT INTO pokemon_attack (pokemon_id, attack_id, current_usage) VALUES ($1, $2, $3)', [pokemonId, attackId, 0]);
  }

  private async getAttacksForPokemon(pokemonId: number): Promise<any[]> {
    const result = await database.query(
      `SELECT a.id, a.name, a.damage, a.usage_limit, pa.current_usage
       FROM attack a
       JOIN pokemon_attack pa ON a.id = pa.attack_id
       WHERE pa.pokemon_id = $1`,
      [pokemonId],
    );

    return result.rows.map((row) => new Attack(row.id, row.name, row.damage, row.usage_limit, row.current_usage));
  }
}

export default PokemonRepository;
