import Pokemon from './Pokemon';

class Trainer {
  private pokemons: Pokemon[] = [];
  private static readonly EXP_PER_LEVEL = 10;

  constructor(public id: number | null, public name: string, public level: number = 1, public experience: number = 0) {}

  public addPokemon(pokemon: Pokemon): void {
    pokemon.trainerId = this.id!;
    this.pokemons.push(pokemon);
  }

  public removePokemon(pokemonId: number): void {
    this.pokemons = this.pokemons.filter((p) => p.id !== pokemonId);
  }

  public healAllPokemons(): void {
    this.pokemons.forEach((pokemon) => pokemon.heal());
  }

  public gainExperience(exp: number): void {
    this.experience += exp;
    while (this.experience >= Trainer.EXP_PER_LEVEL) {
      this.experience -= Trainer.EXP_PER_LEVEL;
      this.level++;
    }
  }

  public getPokemons(): Pokemon[] {
    return this.pokemons;
  }

  public setPokemons(pokemons: Pokemon[]): void {
    this.pokemons = pokemons;
  }

  public hasAlivePokemons(): boolean {
    return this.pokemons.some((pokemon) => pokemon.isAlive());
  }

  public getRandomAlivePokemon(): Pokemon | null {
    const alivePokemons = this.pokemons.filter((pokemon) => pokemon.isAlive());
    if (alivePokemons.length === 0) {
      return null;
    }

    // Return a random alive Pokemon
    return alivePokemons[Math.floor(Math.random() * alivePokemons.length)];
  }

  public getPokemonWithMostHP(): Pokemon | null {
    const alivePokemons = this.pokemons.filter((pokemon) => pokemon.isAlive());
    if (alivePokemons.length === 0) {
      return null;
    }
    return alivePokemons.reduce((max, p) => (p.lifePoint > max.lifePoint ? p : max));
  }

  public getPokemonCount(): number {
    return this.pokemons.length;
  }

  public getAlivePokemonCount(): number {
    return this.pokemons.filter((pokemon) => pokemon.isAlive()).length;
  }
}

export default Trainer;
