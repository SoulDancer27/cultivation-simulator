import { InventoryItem, PlayerBaseStats, PlayerSkills } from "../Player";
import { ItemType } from "../Interfaces";

// Generic activity type
// Currently is a bit of a mess, will be restructured in the near future
export type Activity = {
  name: string;
  description?: string;
  baseTime: number; // time to complete activity in milliseconds
  time?: string; // calculate completion time based on props

  // Values for action progress tracking
  currentTime?: number; // for progress tracking
  timesCompleted?: number; // total times completed

  // Activity price (aka cost)
  price?: {
    baseStats?: Partial<PlayerBaseStats>; // character stats consumed to start activity
    items?: ActivityItem[]; // items consumed to start activity
    priceMulti?: number; // price multiplier, has impact on some activities, like Crafting for example
  };

  // Activity result (aka reward)
  result: {
    baseStats?: Partial<PlayerBaseStats>; // character stats rewarded for completing activity
    baseStatsMulti?: string; // calculate stats reward multiplier
    skills?: Partial<PlayerSkills>; // skill exp rewarded for completing activity
    skillsMulti?: string; // calculate skills reward multiplier
    items?: ActivityItem[]; // items rewarded for completing activity
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
