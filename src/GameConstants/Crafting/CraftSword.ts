import { ActivityItem } from "GameConstants/Activities";
import { PlayerContextType, InventoryTreasure } from "GameConstants/Player";
import Treasures, { Treasure } from "GameConstants/Treasures";
import { v4 as uuid } from "uuid";
import quality from "./quality";

export default function CraftSword(
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
    const itemQuality = quality(treasure.realmIndex, player.skills.crafting);
    invTreasure.stats.quality = itemQuality;
    invTreasure.stats.stats.attack = itemQuality / 2;
    return invTreasure;
  } catch (error) {
    console.log(error);
  }
  return undefined;
}
