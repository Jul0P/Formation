import Pokemon from '@/models/Pokemon';
import AttackRepository from '@/repositories/AttackRepository';
import PokemonRepository from '@/repositories/PokemonRepository';

class PokemonService {
  private pokemonRepository: PokemonRepository;
  private attackRepository: AttackRepository;

  constructor(pokemonRepository: PokemonRepository, attackRepository: AttackRepository) {
    this.pokemonRepository = pokemonRepository;
    this.attackRepository = attackRepository;
  }

  public async getPokemonById(id: number): Promise<Pokemon | null> {
    return this.pokemonRepository.findById(id);
  }

  public async getAllPokemons(): Promise<Pokemon[]> {
    return this.pokemonRepository.findAll();
  }

  public async createPokemon(name: string, lifePoint: number, trainerId: number): Promise<Pokemon> {
    const pokemon = new Pokemon(null, name, lifePoint, lifePoint, trainerId);
    return this.pokemonRepository.create(pokemon);
  }

  public async updatePokemon(pokemon: Pokemon): Promise<void> {
    return this.pokemonRepository.update(pokemon);
  }

  public async deletePokemon(id: number): Promise<void> {
    return this.pokemonRepository.delete(id);
  }

  public async learnAttack(pokemonId: number, attackId: number): Promise<void> {
    const pokemon = await this.pokemonRepository.findById(pokemonId);
    if (!pokemon) {
      throw new Error('Pokémon non trouvé');
    }

    const attack = await this.attackRepository.findById(attackId);
    if (!attack) {
      throw new Error('Attaque non trouvée');
    }

    pokemon.learnAttack(attack);
    await this.pokemonRepository.learnAttack(pokemonId, attackId);
  }

  public async getPokemonByTrainerId(trainerId: number): Promise<Pokemon[]> {
    return await this.pokemonRepository.findByTrainerId(trainerId);
  }
}

export default PokemonService;
