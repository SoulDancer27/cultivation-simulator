import { Activity } from "GameConstants/Activities";
import { PlayerContextType, isInventoryMoney } from "GameConstants/Player";

// Calculate the number of times activity can be executed
export default function calculateMaxActions(
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
