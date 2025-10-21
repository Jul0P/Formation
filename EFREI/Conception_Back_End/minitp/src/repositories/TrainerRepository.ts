import database from '../config/database';
import Trainer from '../models/Trainer';
import PokemonRepository from './PokemonRepository';

class TrainerRepository {
  private pokemonRepository: PokemonRepository = new PokemonRepository();

  constructor() {}

  public async findById(id: number): Promise<Trainer | null> {
    const row = await database.getOne('SELECT * FROM trainer WHERE id = $1', [id]);
    if (!row) {
      return null;
    }

    const trainer = new Trainer(row.id, row.name);
    const pokemons = await this.pokemonRepository.findByTrainerId(trainer.id!);
    pokemons.forEach((pokemon) => trainer.addPokemon(pokemon));

    return trainer;
  }

  public async findAll(): Promise<Trainer[]> {
    const result = await database.query('SELECT * FROM trainer');

    return Promise.all(
      result.rows.map(async (row) => {
        const trainer = new Trainer(row.id, row.name, row.level, row.experience);
        const pokemons = await this.pokemonRepository.findByTrainerId(trainer.id!);
        pokemons.forEach((pokemon) => trainer.addPokemon(pokemon));
        return trainer;
      }),
    );
  }

  public async create(trainer: Trainer): Promise<Trainer> {
    const result = await database.getOne('INSERT INTO trainer (name, level, experience) VALUES ($1, $2, $3) RETURNING *', [
      trainer.name,
      trainer.level,
      trainer.experience,
    ]);

    return new Trainer(result.id, result.name, result.level, result.experience);
  }

  public async update(trainer: Trainer): Promise<void> {
    await database.query('UPDATE trainer SET name = $1, level = $2, experience = $3 WHERE id = $4', [
      trainer.name,
      trainer.level,
      trainer.experience,
      trainer.id,
    ]);

    for (const pokemon of trainer.getPokemons()) {
      await this.pokemonRepository.update(pokemon);
    }
  }

  public async delete(id: number): Promise<void> {
    await database.query('DELETE FROM trainer WHERE id = $1', [id]);
  }
}

export default TrainerRepository;
