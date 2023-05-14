import { PlayerBaseStats, PlayerSkills } from "./Player";

// Some example manuals for now
// Act like training techniques which you can study and they provide player with cumulative stat bonuses
export const CultivationManuals: CultivationManualType[] = [
  {
    name: "Fist Strike",
    realm: "Mortal 1",
    rarity: "common",
    imagePath: "/manuals/red.png",
    maxLevel: 10,
    stats: {
      attack: 0.01,
      test: 0.1,
    },
  },
  {
    name: "Block",
    realm: "Mortal 1",
    rarity: "common",
    imagePath: "/manuals/yellow.png",
    maxLevel: 10,
    stats: {
      defence: 0.01,
    },
  },
  {
    name: "Meditation",
    realm: "Mortal 1",
    rarity: "common",
    imagePath: "/manuals/green.png",
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
    imagePath: "/manuals/purple.png",
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
  imagePath?: string;
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
