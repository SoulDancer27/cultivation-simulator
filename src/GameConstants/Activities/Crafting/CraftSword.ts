import { Activity, ActivityItem } from "GameConstants/Activities/Activities";
import { PlayerContextType, InventoryTreasure } from "GameConstants/Interfaces";
import Treasures, { Treasure } from "GameConstants/Items/Treasures";
import { v4 as uuid } from "uuid";
import quality from "./quality";
import power from "./power";

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
    const itemPower = power(itemQuality, treasure.realmIndex);
    invTreasure.item.stats = {
      stats: {
        attack: itemPower / 2,
      },
      statsMulti: {
        attack: Math.sqrt(itemPower) / 100,
      },
    };
    invTreasure.item.quality = itemQuality;
    return invTreasure;
  } catch (error) {
    console.log(error);
  }
  return undefined;
}
