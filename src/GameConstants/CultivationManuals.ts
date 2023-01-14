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
];

export type CultivationManualType = {
  name: string;
  realm: string;
  rarity: string;
  maxLevel: number;
  // Cumulative bonus to base stats
  stats: Partial<PlayerBaseStats>;
};
