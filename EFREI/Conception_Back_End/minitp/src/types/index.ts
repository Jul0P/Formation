import Trainer from '@/models/Trainer';

export interface BattleResult {
  winner: Trainer;
  loser: Trainer;
  rounds: number;
  log: string[];
}
