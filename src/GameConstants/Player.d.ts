import { CultivationManualType } from "./CultivationManuals";
import { CultivationRealmType } from "./CultivationRealms";
import { EnemyType } from "./Enemies";
import { TrainingType } from "./Trainings";
export type PlayerAction =
  | "idle"
  | "training"
  | "fighting"
  | "breakthrough"
  | "cultivating";

export type PlayerState = {
  action: PlayerAction;
  training?: TrainingType;
  enemy?: PlayerEnemyType;
  realm?: PlayerCultivationRealmType;
  manual?: PlayerCultivationManual;
};

type PlayerCultivationRealmType = CultivationRealmType & {
  currentHealth: number;
};

export type PlayerStats = {
  age: number;
  currentHealth: number;
  // Calculated values. Are stored to not recalculate them on every game tick
  health: number;
  healthRegen: number;
  defence: number;
  attack: number;
  insight: number;
};

export type PlayerBaseStats = {
  health: number;
  healthRegen: number;
  defence: number;
  attack: number;
  // multiplier for cultivation experience gain
  insight: number;
};

export type PlayerEnemyType = EnemyType & {
  currentHealth: number;
};

export type PlayerRealm = {
  name: string;
  power: Partial<PlayerBaseStats>;
};

export type PlayerCultivationManual = {
  manual: CultivationManualType;
  learningProgress: {
    exp: number;
    level: number;
  };
  isEquipped: boolean;
};

export type PlayerContextType = {
  stats: PlayerStats;
  baseStats: PlayerBaseStats;
  realm: PlayerRealm;
  manuals?: PlayerCultivationManual[];
  state: PlayerState;
};
