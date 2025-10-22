import Pokemon from '../models/Pokemon';
import Trainer from '../models/Trainer';
import TrainerService from './TrainerService';

interface BattleResult {
  winner: Trainer;
  loser: Trainer;
  rounds: number;
  log: string[];
}

class BattleService {
  constructor(private trainerService: TrainerService) {}

  /** Heal both trainers, select random Pokemon, battle - winner gains 1 XP */
  public async randomChallenge(trainer1: Trainer, trainer2: Trainer): Promise<BattleResult> {
    const log: string[] = [];

    trainer1.healAllPokemons();
    trainer2.healAllPokemons();
    log.push('🏥 Les dresseurs soignent leurs Pokémon à la taverne');

    const pokemon1 = trainer1.getRandomAlivePokemon()!;
    const pokemon2 = trainer2.getRandomAlivePokemon()!;

    log.push(`${trainer1.name} choisit ${pokemon1.name} !`);
    log.push(`${trainer2.name} choisit ${pokemon2.name} !`);

    const result = this.duel(pokemon1, pokemon2, log);

    const winner = result.winner === pokemon1 ? trainer1 : trainer2;
    const loser = result.winner === pokemon1 ? trainer2 : trainer1;

    winner.gainExperience(1);
    await this.trainerService.updateTrainer(trainer1);
    await this.trainerService.updateTrainer(trainer2);

    return { winner, loser, rounds: result.rounds, log };
  }

  /** 100 random battles - winner determined by level/XP */
  public async arena1(trainer1: Trainer, trainer2: Trainer): Promise<BattleResult> {
    const log: string[] = [];
    log.push('🏟️ ARÈNE 1 - 100 combats aléatoires !');

    let wins1 = 0;
    let wins2 = 0;

    for (let i = 1; i <= 100; i++) {
      const result = await this.randomChallenge(trainer1, trainer2);
      if (result.winner.id === trainer1.id) wins1++;
      else wins2++;

      if (i % 20 === 0) {
        log.push(`--- Après ${i} combats: ${trainer1.name} ${wins1} - ${wins2} ${trainer2.name} ---`);
      }
    }

    log.push(`\n📊 Résultat final: ${trainer1.name} ${wins1} - ${wins2} ${trainer2.name}`);

    let winner: Trainer, loser: Trainer;

    if (trainer1.level > trainer2.level) {
      winner = trainer1;
      loser = trainer2;
    } else if (trainer2.level > trainer1.level) {
      winner = trainer2;
      loser = trainer1;
    } else if (trainer1.experience >= trainer2.experience) {
      winner = trainer1;
      loser = trainer2;
    } else {
      winner = trainer2;
      loser = trainer1;
    }

    log.push(`🏆 ${winner.name} remporte l'arène (Niveau: ${winner.level}, XP: ${winner.experience})`);

    return { winner, loser, rounds: 100, log };
  }

  /** Select Pokemon with most HP, battle - winner gains 1 XP (no healing) */
  public async deterministicChallenge(trainer1: Trainer, trainer2: Trainer): Promise<BattleResult> {
    const log: string[] = [];

    const pokemon1 = trainer1.getPokemonWithMostHP();
    const pokemon2 = trainer2.getPokemonWithMostHP();

    if (!pokemon1 || !pokemon2) {
      throw new Error("Un des dresseurs n'a plus de Pokémon vivant");
    }

    log.push(`${trainer1.name} envoie ${pokemon1.name} (${pokemon1.lifePoint} PV) !`);
    log.push(`${trainer2.name} envoie ${pokemon2.name} (${pokemon2.lifePoint} PV) !`);

    const result = this.duel(pokemon1, pokemon2, log);

    const winner = result.winner === pokemon1 ? trainer1 : trainer2;
    const loser = result.winner === pokemon1 ? trainer2 : trainer1;

    winner.gainExperience(1);
    await this.trainerService.updateTrainer(trainer1);
    await this.trainerService.updateTrainer(trainer2);

    return { winner, loser, rounds: result.rounds, log };
  }

  /** 100 deterministic battles until one trainer has no Pokémon left (no healing) */
  public async arena2(trainer1: Trainer, trainer2: Trainer): Promise<BattleResult> {
    const log: string[] = [];
    log.push('🏟️ ARÈNE 2 - 100 combats déterministes !');

    for (let i = 1; i <= 100; i++) {
      if (!trainer1.hasAlivePokemons() || !trainer2.hasAlivePokemons()) {
        log.push(`\n⚠️ Combat arrêté au round ${i}: un dresseur n'a plus de Pokémon`);
        break;
      }

      await this.deterministicChallenge(trainer1, trainer2);

      if (i % 20 === 0) {
        log.push(`--- Round ${i} terminé ---`);
      }
    }

    const winner = trainer1.hasAlivePokemons() ? trainer1 : trainer2;
    const loser = trainer1.hasAlivePokemons() ? trainer2 : trainer1;

    log.push(`\n🏆 ${winner.name} remporte l'arène 2 !`);

    return { winner, loser, rounds: 100, log };
  }

  /** Execute duel between two Pokemon with alternating attacks */
  private duel(pokemon1: Pokemon, pokemon2: Pokemon, log: string[]): { winner: Pokemon; rounds: number } {
    let rounds = 0;

    while (pokemon1.isAlive() && pokemon2.isAlive()) {
      rounds++;

      if (pokemon1.getAvailableAttacks().length === 0 && pokemon2.getAvailableAttacks().length === 0) {
        log.push("💤 Plus d'attaques disponibles, match nul !");
        break;
      }

      if (pokemon1.getAvailableAttacks().length > 0) {
        const { attack, damage } = pokemon1.attackPokemon(pokemon2);
        log.push(`⚔️ ${pokemon1.name} utilise ${attack.name} (-${damage} PV) → ${pokemon2.name}: ${pokemon2.lifePoint} PV`);
      }

      if (pokemon2.isAlive() && pokemon2.getAvailableAttacks().length > 0) {
        const { attack, damage } = pokemon2.attackPokemon(pokemon1);
        log.push(`⚔️ ${pokemon2.name} utilise ${attack.name} (-${damage} PV) → ${pokemon1.name}: ${pokemon1.lifePoint} PV`);
      }
    }

    const winner = pokemon1.isAlive() ? pokemon1 : pokemon2;
    log.push(`🏆 ${winner.name} remporte le combat !`);

    return { winner, rounds };
  }
}

export default BattleService;
