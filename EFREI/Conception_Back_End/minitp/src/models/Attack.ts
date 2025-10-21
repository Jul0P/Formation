class Attack {
  constructor(public id: number | null, public name: string, public damage: number, public usageLimit: number, public currentUsage: number = 0) {}

  public canBeUsed(): boolean {
    return this.currentUsage < this.usageLimit;
  }

  public use(): void {
    if (!this.canBeUsed()) {
      throw new Error(`L'attaque ${this.name} ne peut plus être utilisée`);
    }
    this.currentUsage++;
  }

  public reset(): void {
    this.currentUsage = 0;
  }

  public getInfo(): string {
    return `${this.name} (Dégâts: ${this.damage}, Utilisations ${this.currentUsage}/${this.usageLimit})`;
  }

  public getRemainingUses(): number {
    return this.usageLimit - this.currentUsage;
  }
}

export default Attack;
