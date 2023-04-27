import PlayerContext from "GameEngine/Player/PlayerContext";
import { PlayerBaseStats, PlayerSkills } from "./Player";

export type Activity = {
  name: string;
  description?: string;
  baseTime: number; // in seconds
  time?: (player?: PlayerContext) => number; // calculate completion time based on props
  currentTime?: number;
  timesCompleted?: number;
  price?: {
    baseStats?: Partial<PlayerBaseStats>;
    items?: ActivityItem[];
  };
  result: {
    baseStats?: Partial<PlayerBaseStats>;
    baseStatsMulti?: (player?: PlayerContext) => number;
    skills?: Partial<PlayerSkills>;
    skillsMulti?: (player?: PlayerContext) => number;
    items?: ActivityItem[];
  };
};

type TreasureReward = {
  type: "treasure";
  name: string;
  amount: number;
};

type ActivityItem = Omit<InventoryMoney, "id"> | TreasureReward;
