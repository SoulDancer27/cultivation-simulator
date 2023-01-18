import {
  PlayerContextType,
  isInventoryMoney,
  PlayerState,
  PlayerStats,
  InventoryItem,
  PlayerBaseStats,
} from "GameConstants/Player";
import { playerStats } from "./playerStats";

type ActivityState = {
  player: PlayerContextType;
  elapsedTime: number;
};

type ActivityResult = {
  state: PlayerState;
  stats: PlayerStats;
  baseStats: PlayerBaseStats;
  inventory: InventoryItem[];
};
export default function activityManager(props: ActivityState): ActivityResult {
  const { player, elapsedTime } = props;
  let { stats, state, baseStats, inventory } = player;
  // Typeguard
  if (state.action !== "activity" || !state.activity)
    return { state, stats, inventory, baseStats };

  const activity = state.activity;
  // If activity increaces base stats
  if (activity.result.baseStats) {
    for (const [key, value] of Object.entries(activity.result.baseStats)) {
      baseStats[key] += (value * elapsedTime) / 1000;
    }
    // Update calculated stat values based on new baseStats
    stats = playerStats(player);
  }

  // Process reward
  if (activity.result.items) {
    for (let item of activity.result.items) {
      // Process money type reward
      if (item.type === "money") {
        const amountToAdd = (item.amount * elapsedTime) / 1000;
        const itemIndex = inventory.findIndex(
          (value) => value.type === "money" && value.name === item.name
        );
        const currentItem = inventory[itemIndex];
        if (itemIndex === -1) {
          /* don't have this type of money yet */ inventory.push({
            type: "money",
            id: Date.now(),
            name: item.name,
            amount: amountToAdd,
          });
        } else if (currentItem && isInventoryMoney(currentItem)) {

        /* player already possess this type of money */
          currentItem.amount += amountToAdd;
        }
      }
    }
  }
  return { stats, state, inventory, baseStats };
}
