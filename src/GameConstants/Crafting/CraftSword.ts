import { Activity, ActivityItem } from "GameConstants/Activities";
import { PlayerContextType, InventoryTreasure } from "GameConstants/Interfaces";
import Treasures, { Treasure } from "GameConstants/Treasures";
import { v4 as uuid } from "uuid";
import quality from "./quality";

// A function that returns treasure item as a result. Stats are based on player current skills
export default function CraftSword(
  activity: Activity,
  player: PlayerContextType,
  item: ActivityItem
): InventoryTreasure | undefined {
  try {
    let treasure = Treasures.find((i: Treasure) => i.name === item.name);
    if (!treasure) throw new Error(`${item.name} не найден`);
    const invTreasure: InventoryTreasure = {
      type: "treasure",
      id: uuid(),
      item: treasure as Required<Treasure>,
    };
    const itemQuality = quality(
      treasure.realmIndex,
      player.skills.crafting,
      activity?.price?.priceMulti || 1
    );
    invTreasure.item.stats = {
      stats: {
        attack: itemQuality / 2,
      },
    };
    invTreasure.item.quality = itemQuality;
    return invTreasure;
  } catch (error) {
    console.log(error);
  }
  return undefined;
}
