import {
  isInventoryMoney,
  InventoryItem,
  PlayerBaseStats,
  InventoryMoney,
  InventoryTreasure,
} from "GameConstants/Player";
import Treasures from "GameConstants/Treasures";
import { v4 as uuid } from "uuid";
import { playerStats } from "./playerStats";
import GameContext from "GameEngine/GameContext/GameContext";
import React from "react";
import PlayerContext from "./PlayerContext";

export default function useActivityManager() {
  const player = React.useContext(PlayerContext);
  let { state, baseStats, stats, inventory, updateContext } = player;
  const { currentTime, previousTime } = React.useContext(GameContext);
  React.useEffect(() => {
    if (state.action !== "activity" || !state.activity) return;
    const elapsedTime = currentTime - previousTime;
    let activity = state.activity;
    if (!state.activity.currentTime) state.activity.currentTime = 0;
    state.activity.currentTime += elapsedTime / 1000;
    // Action not completed yet
    if (state.activity.currentTime < activity.time) {
      updateContext({ state });
      return;
    }
    // Action finished. Process reward
    else {
      activity.currentTime = 0;
      // If activity increaces base stats
      if (activity.result.baseStats)
        baseStats = rewardBaseStats(baseStats, activity.result.baseStats);
      // Process reward
      if (activity.result.items) {
        inventory = rewardItems(inventory, activity.result.items);
      }
    }
    // Update calculated stat values based on new baseStats
    stats = playerStats(player);
    updateContext({ stats, baseStats, inventory });
  }, [currentTime]);
}

function rewardBaseStats(
  baseStats: PlayerBaseStats,
  reward: Partial<PlayerBaseStats>
): PlayerBaseStats {
  for (const [key, value] of Object.entries(reward)) {
    baseStats[key] += value;
  }
  return baseStats;
}

function rewardItems(
  inventory: InventoryItem[],
  reward: Omit<InventoryItem, "id">[]
): InventoryItem[] {
  for (let piece of reward) {
    // Process money type reward
    if (piece.type === "money") {
      let item = piece as InventoryMoney;
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
    if (piece.type === "treasure") {
      const item = piece as InventoryTreasure;
      const treasure = Treasures.find((i) => i.name === item.stats.name);
      if (treasure) {
        inventory.push({
          type: "treasure",
          id: uuid(),
          stats: treasure,
        });
      }
    }
  }
  return inventory;
}
