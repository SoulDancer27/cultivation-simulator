import { ActivityItem } from "GameConstants/Activities";
import {
  InventoryItem,
  InventoryMoney,
  isInventoryMoney,
} from "GameConstants/Player";

// Removes an array of items from players inventory
export default function removeItems(
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
