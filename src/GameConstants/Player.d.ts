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
  health: number;
  currentHealth: number;
  healthRegen: number;
  defence: number;
  attack: number;
};

export type PlayerRealm = {
  name: string;
  power: Partial<PlayerStats>;
};

export type PlayerContextType = {
  stats: PlayerStats;
  realm: PlayerRealm;
  state: PlayerState;
};
