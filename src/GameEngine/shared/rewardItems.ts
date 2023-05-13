import { ActivityItem } from "GameConstants/Activities";
import {
  CountableItem,
  InventoryItem,
  isCountableItem,
} from "GameConstants/Player";
import Treasures, { Treasure } from "GameConstants/Treasures";
import { v4 as uuid } from "uuid";

// Basically the same as rewardActivityItems, but accepts an array of items as a parameter
// Currently unused
export default function rewardItems(
  inventory: InventoryItem[],
  reward: ActivityItem[],
  times: number
): InventoryItem[] {
  for (let piece of reward) {
    try {
      // Process money type reward
      if (["money", "mineral"].includes(piece.type)) {
        let item = piece as CountableItem;
        const amountToAdd = item.amount * times;
        const itemIndex = inventory.findIndex(
          (value) =>
            value.type === item.type &&
            (value as CountableItem).name === item.name
        );
        const currentItem = inventory[itemIndex];
        if (itemIndex === -1) {
          /* don't have this type of money yet */ inventory.push({
            type: item.type,
            id: uuid(),
            name: item.name,
            amount: amountToAdd,
          });
        } else if (currentItem && isCountableItem(currentItem)) {
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
