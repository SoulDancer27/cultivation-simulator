import PlayerContext from "GameEngine/Player/PlayerContext";
import { PlayerBaseStats, PlayerSkills } from "./Player";

export type Activity = {
  name: string;
  description?: string;
  baseTime: number; // in seconds
  time?: (player?: PlayerContext) => number; // calculate completion time based on props
  currentTime?: number;
  timesCompleted?: number;
  baseStatsMulti?: (player?: PlayerContext) => number;
  skillsMulti?: (player?: PlayerContext) => number;
  price?: {
    baseStats?: Partial<PlayerBaseStats>;
    items?: ActivityItem[];
  };
  result: {
    baseStats?: Partial<PlayerBaseStats>;
    skills?: Partial<PlayerSkills>;
    items?: ActivityItem[];
  };
};

type ItemReward = {
  type: "treasure" | "money" | "mineral";
  name: string;
  amount: number;
};

type ActivityItem = ItemReward;
