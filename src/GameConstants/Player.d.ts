import { EnemyType } from "./Enemies";
import { TrainingType } from "./Trainings";
export type PlayerAction = "idle" | "training" | "fighting";

export type PlayerState = {
  action: PlayerAction;
  training?: TrainingType;
  enemy?: EnemyType;
};

export type PlayerStats = {
  age: number;
  health: number;
  currentHealth: number;
  healthRegen: number;
  defence: number;
  attack: number;
};

export type PlayerContextType = {
  stats: PlayerStats;
  state: PlayerState;
};
