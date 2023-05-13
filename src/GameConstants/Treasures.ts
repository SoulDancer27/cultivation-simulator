import { PlayerStats } from "./Player";
import { Image } from "./Interfaces";

// Will be reworked soon
const Treasures: Treasure[] = [
  {
    name: "Rusty Sword",
    description: "",
    image: { path: "/treasures/swords1.png", x: 0, y: 0, sizeX: 32, sizeY: 32 },
    realmIndex: 0,
    type: "weapon",
    quality: 10,
    stats: {
      attack: 5,
    },
  },
  {
    name: "Rusty Armor",
    description: "",
    image: { path: "/treasures/armors.png", x: 0, y: 0, sizeX: 32, sizeY: 32 },
    realmIndex: 0,
    type: "armor",
    quality: 10,
    stats: {
      health: 50,
    },
  },
  {
    name: "Rusty Helmet",
    description: "",
    image: { path: "/treasures/helmets.png", x: 0, y: 0, sizeX: 32, sizeY: 32 },
    realmIndex: 0,
    type: "helmet",
    quality: 10,
    stats: {
      defence: 10,
    },
  },
  {
    name: "Copper Ring",
    description: "",
    image: { path: "/treasures/rings.png", x: 0, y: 0, sizeX: 32, sizeY: 32 },
    realmIndex: 0,
    type: "ring",
    quality: 10,
    stats: {
      attack: 1,
      defence: 2,
    },
  },
  {
    name: "Copper Pendant",
    description: "",
    image: {
      path: "/treasures/pendants.png",
      x: 0,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
    realmIndex: 0,
    type: "pendant",
    quality: 10,
    stats: {
      health: 10,
      healthRegen: 0.2,
    },
  },
];

export type Treasure = {
  name: string;
  stats: Partial<PlayerStats>;
  description: string;
  image: Image;
  type: TreasureType;
  // Index in the realms array
  realmIndex: number;
  quality: number;
};

type TreasureGrade =
  | "Common"
  | "Good"
  | "Excellent"
  | "Perfect"
  | "Legendary"
  | "Divine";

export type TreasureType = "weapon" | "armor" | "helmet" | "ring" | "pendant";

export default Treasures;
