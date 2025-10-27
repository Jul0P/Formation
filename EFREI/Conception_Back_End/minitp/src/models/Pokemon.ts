import Attack from './Attack';

class Pokemon {
  private attacks: Attack[] = [];
  private static readonly MAX_ATTACKS = 4;

  constructor(public id: number | null, public name: string, public lifePoint: number, public maxLifePoint: number, public trainerId: number) {}

  public learnAttack(attack: Attack): void {
    if (this.attacks.length >= Pokemon.MAX_ATTACKS) {
      throw new Error(`${this.name} connaît déjà ${Pokemon.MAX_ATTACKS} attaques`);
    }

    if (this.attacks.some((a) => a.id === attack.id)) {
      throw new Error(`${this.name} connaît déjà l'attaque ${attack.name}`);
    }

    this.attacks.push(attack);
  }

  public heal(): void {
    this.lifePoint = this.maxLifePoint;
    this.attacks.forEach((attack) => attack.reset());
  }

  public isAlive(): boolean {
    return this.lifePoint > 0;
  }

  public getAvailableAttacks(): Attack[] {
    return this.attacks.filter((attack) => attack.canBeUsed());
  }

  public attackPokemon(target: Pokemon): { attack: Attack; damage: number } {
    if (!this.isAlive()) {
      throw new Error(`${this.name} est KO et ne peut pas attaquer`);
    }

    const availableAttacks = this.getAvailableAttacks();
    if (availableAttacks.length === 0) {
      throw new Error(`${this.name} n'a plus d'attaques disponibles`);
    }

    // Select a random available attack
    const attack = availableAttacks[Math.floor(Math.random() * availableAttacks.length)];
    attack.use();

    // Calculate damage (cannot exceed target's current life points)
    const damage = Math.min(attack.damage, target.lifePoint);
    target.takeDamage(damage);

    return { attack, damage };
  }

  private takeDamage(damage: number): void {
    // Prevent negative life points
    this.lifePoint = Math.max(0, this.lifePoint - damage);
  }

  public getAttacks(): Attack[] {
    return this.attacks;
  }

  public setAttacks(attacks: Attack[]): void {
    if (attacks.length > Pokemon.MAX_ATTACKS) {
      throw new Error(`${this.name} ne peut pas connaître plus de ${Pokemon.MAX_ATTACKS} attaques`);
    }
    this.attacks = attacks;
  }

  public getHealthPourcentage(): number {
    return (this.lifePoint / this.maxLifePoint) * 100;
  }
}

export default Pokemon;
