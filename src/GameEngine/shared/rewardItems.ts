import { Activity, ActivityItem } from "GameConstants/Activities";
import CraftingFunctions from "GameConstants/Activities/Crafting";
import {
  CountableItem,
  CountableItems,
  InventoryItem,
  PlayerContextType,
  isCountableItem,
} from "GameConstants/Interfaces";

import Treasures, { Treasure } from "GameConstants/Items/Treasures";
import { v4 as uuid } from "uuid";

// Add activity reward to the players inventory
export default function rewardItems(
  player: PlayerContextType,
  items: ActivityItem[],
  times: number
): InventoryItem[] {
  let inventory = player.inventory;
  for (let piece of items) {
    try {
      // Process money type reward
      if (CountableItems.includes(piece.type as any)) {
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
        let treasure = <InventoryItem | any>{};
        // using deep copy for the object
        let item = JSON.parse(
          JSON.stringify(Treasures.find((i: Treasure) => i.name === piece.name))
        );
        if (item) {
          treasure.type = "treasure";
          treasure.id = uuid();
          treasure.item = item;
        }
        if (treasure) {
          for (let i = 0; i < times * piece.amount; i++) {
            inventory.push(treasure);
          }
        }
      }
    } catch (error) {
      console.log(`rewardItems: ${error}`);
    }
  }
  return inventory;
}
