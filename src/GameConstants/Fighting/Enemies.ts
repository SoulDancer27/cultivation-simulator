import { ActivityItem } from "GameConstants/Activities";
import { PlayerBaseStats } from "GameConstants/Player";

export type EnemyType = {
  name: string;
  stats: {
    health: number;
    healthRegen: number;
    defence: number;
    attack: number;
  };
  description?: string;
  // Activity result (aka reward)
  result: {
    baseStats?: Partial<PlayerBaseStats>; // character stats rewarded for completing activity
    baseStatsMulti?: string; // calculate stats reward multiplier
    items?: ActivityItem[]; // items rewarded for completing activity
  };
};

// Total placeholder content
export const Enemies: EnemyType[] = [
  {
    name: "Random Nobody",
    description: "A pathetic person with no prospects in life",
    stats: { health: 10, healthRegen: 0, defence: 0, attack: 1 },
    result: {
      items: [{ type: "money", amount: 1, name: "Copper Coin" }],
    },
  },
  {
    name: "Street Thug",
    description: "A gangster from the streets",
    stats: { health: 50, healthRegen: 0, defence: 0, attack: 3 },
    result: {
      items: [{ type: "money", amount: 5, name: "Copper Coin" }],
    },
  },
  {
    name: "Ordinary rabbit",
    description: "Turns out, they are pretty dangerous",
    stats: { health: 150, healthRegen: 1, defence: 10, attack: 4 },
    result: {
      items: [{ type: "money", amount: 20, name: "Copper Coin" }],
    },
  },
  {
    name: "Feral Rat",
    stats: { health: 250, healthRegen: 2, defence: 30, attack: 10 },
    result: {
      items: [{ type: "money", amount: 50, name: "Copper Coin" }],
    },
  },
  {
    name: "Forest Wolf",
    stats: { health: 500, healthRegen: 5, defence: 10, attack: 40 },
    result: {
      items: [{ type: "money", amount: 250, name: "Copper Coin" }],
    },
  },
  {
    name: "Forest Bandit",
    stats: { health: 1000, healthRegen: 10, defence: 30, attack: 70 },
    result: {
      items: [{ type: "money", amount: 1000, name: "Copper Coin" }],
    },
  },
  {
    name: "Black Boar",
    stats: { health: 1500, healthRegen: 10, defence: 30, attack: 150 },
    result: {
      items: [{ type: "money", amount: 1, name: "Silver Coin" }],
    },
  },
  {
    name: "Turtle",
    stats: { health: 5000, healthRegen: 25, defence: 100, attack: 30 },
    result: {
      items: [{ type: "money", amount: 5, name: "Silver Coin" }],
    },
  },
  {
    name: "Stone Wolf",
    stats: { health: 8000, healthRegen: 20, defence: 50, attack: 400 },
    result: {
      items: [{ type: "money", amount: 25, name: "Silver Coin" }],
    },
  },
  {
    name: "White Tiger",
    stats: { health: 15000, healthRegen: 100, defence: 50, attack: 1000 },
    result: {
      items: [{ type: "money", amount: 200, name: "Silver Coin" }],
    },
  },
  {
    name: "Forest Bandit Leader",
    stats: { health: 25000, healthRegen: 200, defence: 20, attack: 1500 },
    result: {
      items: [{ type: "money", amount: 500, name: "Silver Coin" }],
    },
  },
  {
    name: "Evil Bat",
    stats: { health: 50000, healthRegen: 200, defence: 60, attack: 2500 },
    result: {
      items: [{ type: "money", amount: 1500, name: "Silver Coin" }],
    },
  },
  {
    name: "Spirit Hare",
    description: "What in the world is this thing?",
    stats: { health: 100000, healthRegen: 400, defence: 120, attack: 4000 },
    result: {
      items: [{ type: "money", amount: 1, name: "Golden Coin" }],
    },
  },
  {
    name: "Swamp Alligator",
    stats: { health: 250000, healthRegen: 1500, defence: 200, attack: 10000 },
    result: {
      items: [{ type: "money", amount: 5, name: "Golden Coin" }],
    },
  },
  {
    name: "Thunder Lizard",
    stats: { health: 600000, healthRegen: 2500, defence: 200, attack: 20000 },
    result: {
      items: [{ type: "money", amount: 25, name: "Golden Coin" }],
    },
  },
  {
    name: "Blazing Leopard",
    stats: { health: 1.2e6, healthRegen: 6000, defence: 250, attack: 50000 },
    result: {
      items: [{ type: "money", amount: 150, name: "Golden Coin" }],
    },
  },
  {
    name: "Steel Turtle",
    stats: { health: 2e6, healthRegen: 10000, defence: 500, attack: 20000 },
    result: {
      items: [{ type: "money", amount: 350, name: "Golden Coin" }],
    },
  },
  {
    name: "Arrogant Young Master",
    description: "Never heard of you!",
    stats: { health: 4e6, healthRegen: 10000, defence: 100, attack: 150000 },
    result: {
      items: [{ type: "money", amount: 1000, name: "Golden Coin" }],
    },
  },
];
