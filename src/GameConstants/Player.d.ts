import { CultivationRealmType } from "./CultivationRealms";
import { EnemyType } from "./Enemies";
import { TrainingType } from "./Trainings";
export type PlayerAction = "idle" | "training" | "fighting" | "breakthrough";

export type PlayerState = {
  action: PlayerAction;
  training?: TrainingType;
  enemy?: EnemyType;
  realm?: CultivationRealmType;
};

export type PlayerStats = {
  age: number;
  currentHealth: number;
  // Calculated values. Are stored to not recalculate them on every game tick
  health: number;
  healthRegen: number;
  defence: number;
  attack: number;
};

export type PlayerBaseStats = {
  health: number;
  healthRegen: number;
  defence: number;
  attack: number;
};

export type PlayerRealm = {
  name: string;
  power: Partial<PlayerBaseStats>;
};

export type PlayerContextType = {
  stats: PlayerStats;
  baseStats: PlayerBaseStats;
  realm: PlayerRealm;
  state: PlayerState;
};
