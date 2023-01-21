import {
  PlayerContextType,
  isInventoryMoney,
  PlayerState,
  PlayerStats,
  InventoryItem,
  PlayerBaseStats,
} from "GameConstants/Player";
import Treasures from "GameConstants/Treasures";
import { v4 as uuid } from "uuid";
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
  // If activity is timed
  if (activity.requiredTime) {
    if (!state.activity.currentTime) state.activity.currentTime = 0;
    state.activity.currentTime += elapsedTime / 1000;
    // Action not completed yet
    if (state.activity.currentTime < activity.requiredTime)
      return { stats, state, baseStats, inventory };
    // Action finished. Process reward
    else {
      activity.currentTime = 0;
      // If activity increaces base stats
      if (activity.result.baseStats) {
        for (const [key, value] of Object.entries(activity.result.baseStats)) {
          baseStats[key] += value;
        }
        // Update calculated stat values based on new baseStats
        stats = playerStats(player);
      }
      // Process reward
      if (activity.result.items) {
        for (let item of activity.result.items) {
          // Process money type reward
          if (item.type === "money") {
            const amountToAdd = item.amount;
            const itemIndex = inventory.findIndex(
              (value) => value.type === "money" && value.name === item.name
            );
            const currentItem = inventory[itemIndex];
            if (itemIndex === -1) {
              /* don't have this type of money yet */ inventory.push({
                type: "money",
                id: uuid(),
                name: item.name,
                amount: amountToAdd,
              });
            } else if (currentItem && isInventoryMoney(currentItem)) {
              /* player already possess this type of money */
              currentItem.amount += amountToAdd;
            }
          }
          // process treasure type rewards
          if (item.type === "treasure") {
            const treasure = Treasures.find((i) => i.name === item.name);
            if (treasure) {
              inventory.push({
                type: "treasure",
                id: uuid(),
                stats: treasure,
              });
            }
          }
        }
      }
    }
    return { stats, state, baseStats, inventory };
  }
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
            id: uuid(),
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
