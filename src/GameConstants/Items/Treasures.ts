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
    name: "Copper Helmet",
    description: "",
    image: {
      path: "/treasures/helmets.png",
      x: 1 * 32,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
    realmIndex: 0,
    type: "helmet",
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
  },
  {
    name: "Copper Ring",
    description: "",
    image: { path: "/treasures/rings.png", x: 0, y: 0, sizeX: 32, sizeY: 32 },
    realmIndex: 0,
    type: "ring",
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
    realmIndex: 9,
    type: "armor",
  },
  {
    name: "Iron Helmet",
    description: "",
    image: {
      path: "/treasures/helmets.png",
      x: 2 * 32,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
    realmIndex: 9,
    type: "helmet",
  },
  {
    name: "Iron Pendant",
    description: "",
    image: {
      path: "/treasures/pendants.png",
      x: 1 * 32,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
    realmIndex: 9,
    type: "pendant",
  },
  {
    name: "Iron Ring",
    description: "",
    image: {
      path: "/treasures/rings.png",
      x: 1 * 32,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
    realmIndex: 9,
    type: "ring",
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
    realmIndex: 18,
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
    realmIndex: 18,
    type: "armor",
  },
  {
    name: "Steel Helmet",
    description: "",
    image: {
      path: "/treasures/helmets.png",
      x: 3 * 32,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
    realmIndex: 18,
    type: "helmet",
  },
  {
    name: "Steel Pendant",
    description: "",
    image: {
      path: "/treasures/pendants.png",
      x: 2 * 32,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
    realmIndex: 18,
    type: "pendant",
  },
  {
    name: "Steel Ring",
    description: "",
    image: {
      path: "/treasures/rings.png",
      x: 2 * 32,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
    realmIndex: 18,
    type: "ring",
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
