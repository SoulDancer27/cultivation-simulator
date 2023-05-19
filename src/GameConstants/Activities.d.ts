import PlayerContext from "GameEngine/Player/PlayerContext";
import { InventoryItem, PlayerBaseStats, PlayerSkills } from "./Player";
import { ItemType } from "./Interfaces";

// Generic activity type
// Currently is a bit of a mess, will be restructured in the near future
export type Activity = {
  name: string;
  description?: string;
  baseTime: number; // in milliseconds
  time?: string; // calculate completion time based on props

  // Values for action progress tracking
  currentTime?: number; // for progress tracking
  timesCompleted?: number; // total times completed

  // Activity price
  price?: {
    baseStats?: Partial<PlayerBaseStats>;
    items?: ActivityItem[];
    priceMulti?: number; // price multiplier, has impact on some activities, like Crafting for example
  };

  // Activity result
  result: {
    baseStats?: Partial<PlayerBaseStats>;
    baseStatsMulti?: string; // calculate stats reward multiplier
    skills?: Partial<PlayerSkills>;
    skillsMulti?: string; // calculate skills reward multiplier
    items?: ActivityItem[];
  };
  data?: any; // additional custom data for activity logic
};

type ItemReward = {
  type: ItemType;
  name: string;
  amount: number;
  generator?: string;
};

type ActivityItem = ItemReward;
