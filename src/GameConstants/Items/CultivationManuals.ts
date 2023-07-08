import { ActivityItem } from "GameConstants/Activities";
import { PlayerBaseStats, PlayerSkills } from "../Player";
import { Image } from "GameConstants/Interfaces";

// Some example manuals for now
// Act like training techniques which you can study and they provide player with cumulative stat bonuses
export const CultivationManuals: CultivationManualType[] = [
  {
    name: "Fist Strike",
    realm: "Mortal 1",
    rarity: "common",
    price: [{ name: "Copper Coin", type: "money", amount: 100 }],
    image: {
      path: "/manuals/red.png",
      x: 0,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
    maxLevel: 10,
    stats: {
      attack: 0.01,
    },
  },
  {
    name: "Block",
    realm: "Mortal 1",
    rarity: "common",
    price: [{ name: "Copper Coin", type: "money", amount: 100 }],
    image: {
      path: "/manuals/yellow.png",
      x: 0,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
    maxLevel: 10,
    stats: {
      defence: 0.01,
    },
  },
  {
    name: "Meditation",
    realm: "Mortal 1",
    rarity: "common",
    price: [{ name: "Copper Coin", type: "money", amount: 100 }],
    image: {
      path: "/manuals/green.png",
      x: 0,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
    maxLevel: 10,
    stats: {
      health: 0.01,
      healthRegen: 0.01,
    },
  },
  {
    name: "Training Guidance",
    realm: "Mortal 1",
    rarity: "common",
    price: [{ name: "Copper Coin", type: "money", amount: 100 }],
    image: {
      path: "/manuals/purple.png",
      x: 0,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
    maxLevel: 10,
    skills: {
      training: 0.01,
    },
  },
];

export type CultivationManualType = {
  name: string;
  realm: string;
  rarity: string; // an unused parameter for now
  image: Image;
  price: ActivityItem[];
  maxLevel: number;
  // Cumulative bonus to base stats
  stats?: Partial<PlayerBaseStats>;
  skills?: Partial<PlayerSkills>;
};

// a placeholder
export function levelExp(level, realm, rarity) {
  return 10 * level;
}

// also a placeholder
export function totalExp(level) {
  return 5 * (1 + level) * level;
}
