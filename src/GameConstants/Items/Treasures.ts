import { PlayerSkills, PlayerBaseStats, PlayerEquipment } from "../Player";
import { Image } from "../Interfaces";

const Treasures: Treasure[] = [
  {
    name: "Copper Sword",
    description: "",
    image: {
      path: "/treasures/swords1.png",
      x: 2 * 32,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
    realmIndex: 0,
    type: "weapon",
  },
  {
    name: "Copper Armor",
    description: "",
    image: {
      path: "/treasures/armors.png",
      x: 1 * 32,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
    realmIndex: 0,
    type: "armor",
  },
  {
    name: "Iron Sword",
    description: "",
    image: {
      path: "/treasures/swords1.png",
      x: 0 * 32,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
    realmIndex: 9,
    type: "weapon",
  },
  {
    name: "Iron Armor",
    description: "",
    image: {
      path: "/treasures/armors.png",
      x: 2 * 32,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
    realmIndex: 0,
    type: "armor",
  },
  {
    name: "Steel Sword",
    description: "",
    image: {
      path: "/treasures/swords1.png",
      x: 4 * 32,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
    realmIndex: 19,
    type: "weapon",
  },
  {
    name: "Steel Armor",
    description: "",
    image: {
      path: "/treasures/armors.png",
      x: 3 * 32,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
    realmIndex: 0,
    type: "armor",
  },
  {
    name: "Rusty Helmet",
    description: "",
    image: { path: "/treasures/helmets.png", x: 0, y: 0, sizeX: 32, sizeY: 32 },
    realmIndex: 0,
    type: "helmet",
    quality: 10,
    stats: {
      stats: {
        defence: 10,
      },
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
      stats: {
        attack: 1,
        defence: 2,
      },
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
      stats: {
        health: 10,
        healthRegen: 0.2,
      },
    },
  },
];

export type Treasure = {
  name: string;

  description: string;
  image: Image;
  type: TreasureType;
  // Index in the realms array
  realmIndex: number;
  stats?: TreasureStats;
  quality?: number;
};

type TreasureStats = {
  stats?: Partial<PlayerBaseStats>;
  statsMulti?: Partial<PlayerBaseStats>;
  skills?: Partial<PlayerSkills>;
  skillsMulti?: Partial<PlayerSkills>;
};

export type TreasureType = (typeof PlayerEquipment)[number];

export default Treasures;
