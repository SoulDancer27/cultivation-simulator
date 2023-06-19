import { ActivityItem } from "GameConstants/Activities";
import { PlayerBaseStats, PlayerSkills } from "GameConstants/Player";

export type EnemyType = {
  name: string;
  health: number;
  healthRegen: number;
  defence: number;
  attack: number;
  // Activity result (aka reward)
  result: {
    baseStats?: Partial<PlayerBaseStats>; // character stats rewarded for completing activity
    baseStatsMulti?: string; // calculate stats reward multiplier
    skills?: Partial<PlayerSkills>; // skill exp rewarded for completing activity
    skillsMulti?: string; // calculate skills reward multiplier
    items?: ActivityItem[]; // items rewarded for completing activity
  };
};

// Total placeholder content
export const Enemies: EnemyType[] = [
  {
    name: "Random Nobody",
    health: 10,
    healthRegen: 0,
    defence: 0,
    attack: 1,
    result: {
      items: [{ type: "money", amount: 1, name: "Copper Coin" }],
    },
  },
  {
    name: "Street Thug",
    health: 20,
    healthRegen: 0,
    defence: 0,
    attack: 2,
    result: {
      items: [{ type: "money", amount: 3, name: "Copper Coin" }],
    },
  },
  {
    name: "Obscure Master",
    health: 50,
    healthRegen: 1,
    defence: 20,
    attack: 4,
    result: {
      items: [{ type: "money", amount: 5, name: "Copper Coin" }],
    },
  },
];
