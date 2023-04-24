import { Activity } from "./Activities";
import { CultivationManualType } from "./CultivationManuals";
import { CultivationRealmType } from "./CultivationRealms";
import { EnemyType } from "./Enemies";
import { Treasure } from "./Treasures";
export type PlayerAction =
  | "idle"
  | "fighting"
  | "breakthrough"
  | "cultivating"
  | "activity";

export type PlayerState = {
  action: PlayerAction;
  enemy?: PlayerEnemyType;
  realm?: PlayerCultivationRealmType;
  manual?: PlayerCultivationManual;
  activity?: { name: string; source: string }; // player action source from global lists
};

export type PlayerActivity = Activity & { currentTime?: number };

export type PlayerCultivationRealmType = CultivationRealmType & {
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

export type InventoryItem = InventoryTreasure | InventoryMoney;

export type InventoryTreasure = {
  type: "treasure";
  id: string;
  isEquipped?: boolean;
  stats: Treasure;
};
export type InventoryMoney = {
  type: "money";
  id: string;
  name: string;
  amount: number;
};

export type PlayerContextType = {
  stats: PlayerStats;
  baseStats: PlayerBaseStats;
  realm: PlayerRealm;
  manuals?: PlayerCultivationManual[];
  inventory: InventoryItem[];
  state: PlayerState;
};

// Lazy type guards
export function isInventoryTreasure(item: any): item is InventoryTreasure {
  return item.type === "treasure" && item.id && item.stats;
}

export function isInventoryMoney(item: any): item is InventoryMoney {
  return item.type === "money" && item.id && item.name && item.amount;
}
