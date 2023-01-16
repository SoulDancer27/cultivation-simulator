import { PlayerStats } from "./Player";

const Treasures: TreasureType[] = [
  {
    name: "Old Ring",
    stats: {
      health: 100,
    },
  },
  {
    name: "Rusty Sword",
    stats: {
      attack: 5,
    },
  },
  {
    name: "Broken Armor",
    stats: {
      defence: 20,
    },
  },
];

export type TreasureType = {
  name: string;
  stats: Partial<PlayerStats>;
};

export default Treasures;
