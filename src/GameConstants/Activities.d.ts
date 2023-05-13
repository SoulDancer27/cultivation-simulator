import PlayerContext from "GameEngine/Player/PlayerContext";
import { InventoryItem, PlayerBaseStats, PlayerSkills } from "./Player";

// Generic activity type
// Currently is a bit of a mess, will be restructured in the near future
export type Activity = {
  name: string;
  description?: string;
  baseTime: number; // in milliseconds
  time?: (player?: PlayerContext) => number; // calculate completion time based on props
  currentTime?: number; // for progress tracking
  timesCompleted?: number; // total times completed
  baseStatsMulti?: (player?: PlayerContextType) => number; // calculate stats reward multiplier,  #todo: rework for not using implicit self
  skillsMulti?: (player?: PlayerContextType) => number; // calculate skills reward multiplier, #todo: rework for not using implicit self
  // Craft items if any are a reward
  // A dictionary of functions, if specified action manager calls corresponding function for items in result.items like generators[item.name]
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
  priceMulti?: number; // price multiplier, has impact on some activities, like Crafting for example, #todo move it to the activity.price
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
