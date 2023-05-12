import { PlayerBaseStats, PlayerSkills } from "./Player";

export const CultivationManuals: CultivationManualType[] = [
  {
    name: "Fist Strike",
    realm: "Mortal 1",
    rarity: "common",
    imagePath: "/manuals/red.png",
    maxLevel: 10,
    stats: {
      attack: 0.01,
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
  rarity: string;
  imagePath?: string;
  maxLevel: number;
  // Cumulative bonus to base stats
  stats?: Partial<PlayerBaseStats>;
  skills?: Partial<PlayerSkills>;
};

export function levelExp(level, realm, rarity) {
  return 10 * level;
}

export function totalExp(level) {
  return 5 * (1 + level) * level;
}
