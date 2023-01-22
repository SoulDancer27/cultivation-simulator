import { PlayerBaseStats } from "./Player";

export const CultivationManuals: CultivationManualType[] = [
  {
    name: "Fist Strike",
    realm: "Mortal 1",
    rarity: "common",
    maxLevel: 10,
    stats: {
      attack: 0.01,
    },
  },
  {
    name: "Block",
    realm: "Mortal 1",
    rarity: "common",
    maxLevel: 10,
    stats: {
      defence: 0.05,
    },
  },
  {
    name: "Block 1",
    realm: "Mortal 1",
    rarity: "common",
    maxLevel: 10,
    stats: {
      defence: 0.05,
    },
  },
  {
    name: "Block 2",
    realm: "Mortal 1",
    rarity: "common",
    maxLevel: 10,
    stats: {
      defence: 0.05,
    },
  },
  {
    name: "Block 3",
    realm: "Mortal 1",
    rarity: "common",
    maxLevel: 10,
    stats: {
      defence: 0.05,
    },
  },
  {
    name: "Block 4",
    realm: "Mortal 1",
    rarity: "common",
    maxLevel: 10,
    stats: {
      defence: 0.05,
    },
  },
  {
    name: "Block 5",
    realm: "Mortal 1",
    rarity: "common",
    maxLevel: 10,
    stats: {
      defence: 0.05,
    },
  },
  {
    name: "Block 6",
    realm: "Mortal 1",
    rarity: "common",
    maxLevel: 10,
    stats: {
      defence: 0.05,
    },
  },
  {
    name: "Block 7",
    realm: "Mortal 1",
    rarity: "common",
    maxLevel: 10,
    stats: {
      defence: 0.05,
    },
  },
  {
    name: "Block 8",
    realm: "Mortal 1",
    rarity: "common",
    maxLevel: 10,
    stats: {
      defence: 0.05,
    },
  },
  {
    name: "Block 9",
    realm: "Mortal 1",
    rarity: "common",
    maxLevel: 10,
    stats: {
      defence: 0.05,
    },
  },
  {
    name: "Block 10",
    realm: "Mortal 3",
    rarity: "common",
    maxLevel: 10,
    stats: {
      defence: 0.05,
    },
  },
  {
    name: "Block 11",
    realm: "Mortal 2",
    rarity: "common",
    maxLevel: 10,
    stats: {
      defence: 0.05,
    },
  },
];

export type CultivationManualType = {
  name: string;
  realm: string;
  rarity: string;
  maxLevel: number;
  // Cumulative bonus to base stats
  stats: Partial<PlayerBaseStats>;
};

export function levelExp(level, realm, rarity) {
  return 10 * level;
}

export function totalExp(level) {
  return 5 * (1 + level) * level;
}
