import { Activity } from "./Activities";
import { PlayerContextType } from "../Interfaces";
import { quality } from "./Crafting";
import { Treasures } from "GameConstants/Items";
import { Treasure } from "GameConstants/Items/Treasures";

// One function per activity type (training, crafting, mining) - determines how to calculate how long an activity takes based on skill level
const ActivitiesFunctions = {
  "training time": function (activity: Activity, player: PlayerContextType) {
    const { skills } = player;
    const multi = 1 + skills.training;
    return activity.baseTime / multi;
  },
  "mining time": function (activity: Activity, player: PlayerContextType) {
    const { skills } = player;
    const multi = 1 + skills.mining;
    return activity.baseTime / multi;
  },
  "crafting skill reward": function (
    activity: Activity,
    player: PlayerContextType
  ): number {
    const priceMulti = activity.price?.priceMulti || 1;
    const mainItem = activity.result.items
      ? activity.result.items[0]
      : undefined;
    if (!mainItem) return 1;
    let treasure = Treasures.find((i: Treasure) => i.name === mainItem.name);
    if (!treasure) return 1;
    const itemQuality = quality(
      treasure.realmIndex,
      player.skills.crafting,
      priceMulti
    );
    return itemQuality;
  },
  default: function (activity: Activity): number {
    return 1 / divisionCoeff(activity.timesCompleted || 0);
  },
};

// A placeholder function
export function divisionCoeff(timesCompleted: number) {
  if (timesCompleted <= 10) return 1;
  return 0.233 * (1 + Math.sqrt(timesCompleted));
}

export default ActivitiesFunctions;
