import { PlayerStats } from "./Player";

const Treasures: TreasureType[] = [
  {
    name: "Rusty Sword",
    description: "",
    imagePath: "/treasures/swords1.png",
    x: 0,
    y: 0,
    size: 32,
    realmIndex: 0,
    grade: "Common",
    stats: {
      attack: 5,
    },
  },
];

export type TreasureType = {
  name: string;
  stats: Partial<PlayerStats>;
  description: string;
  imagePath: string;
  // coordinates of the top left corner
  x: number;
  y: number;
  size: number;
  // Index in the realms array
  realmIndex: number;
  grade: TreasureGrade;
};

type TreasureGrade =
  | "Common"
  | "Good"
  | "Excellent"
  | "Perfect"
  | "Legendary"
  | "Divine";

export default Treasures;
