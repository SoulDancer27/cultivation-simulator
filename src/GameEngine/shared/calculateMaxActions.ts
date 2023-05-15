import { Activity } from "GameConstants/Activities";
import { PlayerContextType, isCountableItem } from "GameConstants/Interfaces";

// Calculate the number of times activity can be executed
export default function calculateMaxActions(
  player: PlayerContextType,
  action: Activity
): number {
  try {
    let maxActions = Number.MAX_VALUE;
    if (!action.price) return maxActions;
    const priceMulti = action.price.priceMulti || 1;
    if (action.price.baseStats) {
      for (const [key, value] of Object.entries(action.price.baseStats)) {
        const actionsNumber = Math.floor(
          player.baseStats[key] / value / priceMulti
        );
        if (actionsNumber < maxActions) maxActions = actionsNumber;
      }
    }
    if (action.price.items) {
      for (const item of action.price.items) {
        // Process money
        if (["money", "mineral"].includes(item.type)) {
          const itemIndex = player.inventory.findIndex(
            (value) =>
              value.type === item.type && (value as any).name === item.name
          );
          if (itemIndex === -1) return 0;
          const currentItem = player.inventory[itemIndex];
          if (currentItem && isCountableItem(currentItem)) {
            const actionsNumber = Math.floor(
              currentItem.amount / item.amount / priceMulti
            );
            if (actionsNumber < maxActions) maxActions = actionsNumber;
          }
        }
        // Process treasures
        if (item.type === "treasure") {
          const items = player.inventory.filter(
            (value) =>
              value.type === "treasure" && value.item.name === item.name
          );
          const actionsNumber = Math.floor(
            items.length / item.amount / priceMulti
          );
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
