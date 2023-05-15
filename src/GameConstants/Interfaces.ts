import { Activity } from "./Activities";
import { CultivationManualType } from "./CultivationManuals";
import { EnemyType } from "./Enemies";
import { PlayerBaseStats, PlayerSkills } from "./Player";
import { Treasure } from "./Treasures";

/* ______________________________________________________________________
  Player Types                                             
_________________________________________________________________________*/
export type PlayerAction =
  | "idle"
  | "fighting"
  | "breakthrough"
  | "cultivating"
  | "activity"; // most of the actions in the game

export type PlayerState = {
  action: PlayerAction;
  enemy?: PlayerEnemyType;
  realm?: RealmTribulation;
  manual?: PlayerCultivationManual;
  activity?: { name: string; source: string }; // player action source from global lists. Is used as a key to retrieve value from GameContext object
};

export type PlayerActivity = Activity & { currentTime?: number };

export type RealmTribulation = {
  index: number; // A pointer into global tribulation array
};

// Player stats are calculated based on baseStats, equipped items, learned manuals and so on
export type PlayerStats = PlayerBaseStats & {
  age: number; // in milliseconds
  currentHealth: number;
};

// This probably needs a rework
export type PlayerEnemyType = EnemyType & {
  currentHealth: number;
};

export type PlayerRealm = {
  index: number;
  power: Partial<PlayerBaseStats>; // a calculated value based on passed tribulations
};

export type PlayerCultivationManual = {
  manual: CultivationManualType;
  learningProgress: {
    exp: number;
    level: number;
  };
  isEquipped: boolean;
};

export type InventoryItem =
  | InventoryTreasure
  | InventoryMoney
  | InventoryMineral;

export type InventoryTreasure = {
  type: "treasure";
  id: string;
  isEquipped?: boolean;
  item: Required<Treasure>;
};
export type InventoryMoney = {
  type: "money";
  id: string;
  name: string;
  amount: number;
};

export type InventoryMineral = {
  type: "mineral";
  id: string;
  name: string;
  amount: number;
};

export type PlayerContextType = {
  stats: PlayerStats; // calcuated stat values
  baseStats: PlayerBaseStats;
  skills: PlayerSkills; // calculated skill values
  baseSkills: PlayerSkills;
  realm: PlayerRealm; // an index pointing to the global realms array and total calculated multiplier based on passed tribulations
  manuals?: PlayerCultivationManual[]; // an array of all learned manuals with progress tracked for each
  inventory: InventoryItem[]; // an array of all inventory items
  state: PlayerState; // current player action
};

export type CountableItemType = "money" | "mineral";
export type CountableItem = {
  type: CountableItemType;
  name: string;
  amount: number;
};

// Lazy type guards
export function isInventoryTreasure(item: any): item is InventoryTreasure {
  return item.type === "treasure" && item.id && item.item;
}

export function isInventoryMoney(item: any): item is InventoryMoney {
  return item.type === "money" && item.id && item.name && item.amount;
}

export function isInventoryMineral(item: any): item is InventoryMineral {
  return item.type === "mineral" && item.id && item.name && item.amount;
}

export function isCountableItem(item: any): item is CountableItem {
  return item.name && item.amount;
}

export type Image = {
  path: string;
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
};
