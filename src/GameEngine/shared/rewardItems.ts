import { ActivityItem } from "GameConstants/Activities";
import {
  InventoryItem,
  InventoryMineral,
  InventoryMoney,
  isInventoryMineral,
  isInventoryMoney,
} from "GameConstants/Player";
import Treasures, { Treasure } from "GameConstants/Treasures";
import { v4 as uuid } from "uuid";

export default function rewardItems(
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
      // Process mineral type reward
      if (piece.type === "mineral") {
        let item = piece as InventoryMineral;
        const amountToAdd = item.amount * times;
        const itemIndex = inventory.findIndex(
          (value) => value.type === "mineral" && value.name === item.name
        );
        const currentItem = inventory[itemIndex];
        if (itemIndex === -1) {
          /* don't have this type of mineral yet */ inventory.push({
            type: "mineral",
            id: uuid(),
            name: item.name,
            amount: amountToAdd,
          });
        } else if (currentItem && isInventoryMineral(currentItem)) {
          /* player already possess this type of mineral */
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
