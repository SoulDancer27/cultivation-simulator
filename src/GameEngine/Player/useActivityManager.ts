import {
  isInventoryMoney,
  InventoryItem,
  PlayerBaseStats,
  InventoryMoney,
  PlayerContextType,
} from "GameConstants/Player";
import Treasures, { Treasure } from "GameConstants/Treasures";
import { v4 as uuid } from "uuid";
import { playerStats } from "./playerStats";
import React from "react";
import PlayerContext from "./PlayerContext";
import { GameTimer } from "GameEngine/GameRuntime";
import GameContext from "GameEngine/GameContext/GameContext";
import { Activity, ActivityItem } from "GameConstants/Activities";

export default function useActivityManager(timer: GameTimer) {
  const player = React.useContext(PlayerContext);
  const game = React.useContext(GameContext);
  let { state, baseStats, stats, inventory, updateContext } = player;
  const { currentTime, previousTime } = timer;

  React.useEffect(() => {
    try {
      if (state.action !== "activity" || !state.activity) return;

      const elapsedTime = currentTime - previousTime;
      let activity = game[state.activity.source].find(
        (item: Activity) => state.activity && item.name === state.activity.name
      );
      if (!activity) return;
      if (!activity.currentTime) activity.currentTime = 0;
      activity.currentTime += elapsedTime / 1000;
      // Calculate overflow
      let timesCompleted = Math.floor(activity.currentTime / activity.time);
      activity.currentTime =
        activity.currentTime - timesCompleted * activity.time;
      // Limit if activity has a set price
      const maxActions = calculateMaxActions(player, activity);
      if (maxActions <= timesCompleted) activity.currentTime = 0; // reset to the end of the last completed activity
      timesCompleted = Math.min(timesCompleted, maxActions);
      // Action not completed yet
      if (timesCompleted === 0) {
        game.updateContext({ ...game });
        return;
      }
      // Action finished. Process cost and reward
      else {
        // Process activity price a bit of a hacky way
        if (activity.price) {
          if (activity.price.baseStats)
            baseStats = rewardBaseStats(
              baseStats,
              activity.price.baseStats,
              -timesCompleted
            );
          // Process activity price in terms of items
          if (activity.price.items)
            inventory = removeItems(
              inventory,
              activity.price.items,
              timesCompleted
            );
        }

        // If activity increaces base stats
        if (activity.result.baseStats)
          baseStats = rewardBaseStats(
            baseStats,
            activity.result.baseStats,
            timesCompleted
          );
        // Process reward
        if (activity.result.items) {
          inventory = rewardItems(
            inventory,
            activity.result.items,
            timesCompleted
          );
        }
      }
      // Update calculated stat values based on new baseStats
      stats = playerStats(player);
      updateContext({ stats, baseStats, inventory });
    } catch (error) {
      console.log(error);
    }
  }, [currentTime]);
}

function rewardBaseStats(
  baseStats: PlayerBaseStats,
  reward: Partial<PlayerBaseStats>,
  times: number
): PlayerBaseStats {
  for (const [key, value] of Object.entries(reward)) {
    try {
      baseStats[key] += value * times;
    } catch (error) {
      console.log(error);
    }
  }
  return baseStats;
}

function rewardItems(
  inventory: InventoryItem[],
  reward: ActivityItem[],
  times: number
): InventoryItem[] {
  for (let piece of reward) {
    try {
      // Process money type reward
      if (piece.type === "money") {
        let item = piece as InventoryMoney;
        const amountToAdd = item.amount * times;
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
        const treasure = Treasures.find((i: Treasure) => i.name === piece.name);
        if (treasure) {
          for (let i = 0; i < times * piece.amount; i++) {
            inventory.push({
              type: "treasure",
              id: uuid(),
              stats: treasure,
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return inventory;
}

function removeItems(
  inventory: InventoryItem[],
  price: ActivityItem[],
  times: number
): InventoryItem[] {
  for (let piece of price) {
    try {
      // Process money type reward
      if (piece.type === "money") {
        let item = piece as InventoryMoney;
        const amountToRemove = item.amount * times;
        const itemIndex = inventory.findIndex(
          (value) => value.type === "money" && value.name === item.name
        );
        const currentItem = inventory[itemIndex];
        if (itemIndex === -1) {
          throw new Error(`Not enough ${piece.name} to complete action`);
        } else if (currentItem && isInventoryMoney(currentItem)) {
          /* player already possess this type of money */
          if (currentItem.amount < amountToRemove)
            throw new Error(`Not enough ${piece.name} to complete action`);
          currentItem.amount -= amountToRemove;
          if (currentItem.amount === 0) inventory.splice(itemIndex, 1);
        }
      }
      // process treasure type rewards
      if (piece.type === "treasure") {
        for (let i = 0; i < times * piece.amount; i++) {
          const itemIndex = inventory.findIndex(
            (item) => item.type === "treasure" && item.stats.name === piece.name
          );
          if (itemIndex === -1)
            throw new Error(`Not enough ${piece.name} to complete action`);
          inventory.splice(itemIndex, 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return inventory;
}

function calculateMaxActions(
  player: PlayerContextType,
  action: Activity
): number {
  try {
    let maxActions = Number.MAX_VALUE;
    if (!action.price) return maxActions;
    if (action.price.baseStats) {
      for (const [key, value] of Object.entries(action.price.baseStats)) {
        const actionsNumber = Math.floor(player.baseStats[key] / value);
        if (actionsNumber < maxActions) maxActions = actionsNumber;
      }
    }
    if (action.price.items) {
      for (const item of action.price.items) {
        // Process money
        if (item.type === "money") {
          const itemIndex = player.inventory.findIndex(
            (value) => value.type === "money" && value.name === item.name
          );
          if (itemIndex === -1) return 0;
          const currentItem = player.inventory[itemIndex];
          if (currentItem && isInventoryMoney(currentItem)) {
            const actionsNumber = Math.floor(currentItem.amount / item.amount);
            if (actionsNumber < maxActions) maxActions = actionsNumber;
          }
        }
        // Process treasures
        if (item.type === "treasure") {
          const items = player.inventory.filter(
            (value) =>
              value.type === "treasure" && value.stats.name === item.name
          );
          const actionsNumber = Math.floor(items.length / item.amount);
          if (actionsNumber < maxActions) maxActions = actionsNumber;
        }
      }
    }
    return maxActions;
  } catch (error) {
    console.log(error);
  }
  return 0;
}
