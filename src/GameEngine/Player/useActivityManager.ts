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
import React from "react";
import PlayerContext from "./PlayerContext";
import { GameTimer } from "GameEngine/GameRuntime";
import GameContext from "GameEngine/GameContext/GameContext";
import { Activity } from "GameConstants/Activities";

export default function useActivityManager(timer: GameTimer) {
  const player = React.useContext(PlayerContext);
  const game = React.useContext(GameContext);
  let { state, baseStats, stats, inventory, updateContext } = player;
  const { currentTime, previousTime } = timer;

  React.useEffect(() => {
    if (!["activity", "training"].includes(state.action)) return;
    if (!state.activity) return;
    const elapsedTime = currentTime - previousTime;
    let activity = game[state.activity.source].find(
      (item: Activity) => state.activity && item.name === state.activity.name
    );
    if (!activity) return;
    if (!activity.currentTime) activity.currentTime = 0;
    activity.currentTime += elapsedTime / 1000;
    // Action not completed yet
    if (activity.currentTime < activity.time) {
      game.updateContext({ ...game });
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
