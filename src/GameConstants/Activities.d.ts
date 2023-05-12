import PlayerContext from "GameEngine/Player/PlayerContext";
import { InventoryItem, PlayerBaseStats, PlayerSkills } from "./Player";

export type Activity = {
  name: string;
  description?: string;
  baseTime: number; // in seconds
  time?: (player?: PlayerContext) => number; // calculate completion time based on props
  currentTime?: number;
  timesCompleted?: number; // total times completed
  baseStatsMulti?: (player?: PlayerContextType) => number; // calculate stats reward multiplier, usually the more you complete an action the less it becomes
  skillsMulti?: (player?: PlayerContextType) => number; // calculate stats reward multiplier, usually the more you complete an action the less it becomes
  // Craft items if any are a reward
  generators?: {
    [key: string]: (
      activity: Activity,
      player: PlayerContextType,
      item: ActivityItem
    ) => InventoryItem | undefined;
  };
  // Activity price
  price?: {
    baseStats?: Partial<PlayerBaseStats>;
    items?: ActivityItem[];
  };
  priceMulti?: number; // price multiplier, has impact on some activities, like Crafting for example
  // Activity result
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
