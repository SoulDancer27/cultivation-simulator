import PlayerContext from "GameEngine/Player/PlayerContext";
import { Activity, ActivityItem } from "./Activities";
import { day } from "./Constants";
import { InventoryTreasure, PlayerContextType } from "./Player";
import Treasures, { Treasure } from "./Treasures";
import { v4 as uuid } from "uuid";

let Crafting: Activity[] = [
  {
    name: "Generic",
    baseTime: 10 * day,
    price: {
      items: [
        {
          name: "Copper",
          amount: 1,
          type: "mineral",
        },
      ],
    },
    result: {
      items: [{ name: "Copper Coin", amount: 1, type: "money" }],
    },
  },
  {
    name: "Iron Sword",
    baseTime: 30 * day,
    generators: { "Rusty Sword": CraftSword },
    price: {
      items: [
        {
          name: "Iron",
          amount: 3,
          type: "mineral",
        },
      ],
    },
    result: {
      items: [{ name: "Rusty Sword", amount: 1, type: "treasure" }],
    },
  },
];

function CraftSword(
  player: PlayerContextType,
  item: ActivityItem
): InventoryTreasure | undefined {
  try {
    let treasure = Treasures.find((i: Treasure) => i.name === item.name);
    if (!treasure) throw new Error(`${item.name} не найден`);
    const invTreasure: InventoryTreasure = {
      type: "treasure",
      id: uuid(),
      stats: treasure,
    };
    invTreasure.stats.stats.attack = Math.random();
    return invTreasure;
  } catch (error) {
    console.log(error);
  }
  return undefined;
}

export default Crafting;
