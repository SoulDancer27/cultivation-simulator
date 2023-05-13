import { Activity } from "GameConstants/Activities";
import {
  CountableItem,
  InventoryItem,
  PlayerContextType,
  isCountableItem,
} from "GameConstants/Player";
import Treasures, { Treasure } from "GameConstants/Treasures";
import { v4 as uuid } from "uuid";

// Add activity reward to the players inventory
export default function rewardActivityItems(
  player: PlayerContextType,
  activity: Activity,
  times: number
): InventoryItem[] {
  let inventory = player.inventory;
  if (!activity.result.items) return [];
  for (let piece of activity.result.items) {
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
        let treasure;
        if (
          activity.generators &&
          typeof activity.generators[piece.name] === "function"
        )
          treasure = activity.generators[piece.name](activity, player, piece);
        else {
          let item = Treasures.find((i: Treasure) => i.name === piece.name);
          if (item) {
            treasure.type = "treasure";
            treasure.id = uuid();
            treasure.treasure = item;
          }
        }
        if (treasure) {
          for (let i = 0; i < times * piece.amount; i++) {
            inventory.push(treasure);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return inventory;
}
