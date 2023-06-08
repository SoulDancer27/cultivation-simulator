import { Activity } from "./Activities/Activities";
import { CultivationManualType } from "./Cultivation/CultivationManuals";
import { EnemyType } from "./Enemies";
import { PlayerBaseStats, PlayerSkills } from "./Player";
import { Treasure } from "./Items/Treasures";

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

/* ______________________________________________________________________
  Item types                                           
_________________________________________________________________________*/

export const CountableItems = <const>["money", "mineral", "herb"];
export type CountableItemType = (typeof CountableItems)[number];
export const UniqueItems = <const>["treasure", "potion"];
export type UniqueItemType = (typeof UniqueItems)[number];
export type ItemType = CountableItemType | UniqueItemType;

export type InventoryTreasure = {
  type: "treasure";
  id: string;
  isEquipped?: boolean;
  item: Required<Treasure>;
};

export type InventoryCountableItem = {
  type: CountableItemType;
  id: string;
  name: string;
  amount: number;
};
export type InventoryItem = InventoryTreasure | InventoryCountableItem;

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

export type CountableItem = {
  type: CountableItemType;
  name: string;
  amount: number;
};

// Lazy type guards
export function isInventoryTreasure(item: any): item is InventoryTreasure {
  return item.type === "treasure" && item.id && item.item;
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

export type Material = {
  name: string;
  description: string;
  image: Image;
};
