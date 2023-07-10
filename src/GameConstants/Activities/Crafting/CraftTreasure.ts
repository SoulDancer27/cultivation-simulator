import { Activity, ActivityItem } from "GameConstants/Activities/Activities";
import Treasures, {
  Treasure,
  TreasureStats,
} from "GameConstants/Items/Treasures";
import { v4 as uuid } from "uuid";
import power from "./power";
import quality from "./quality";

// A function that returns treasure item as a result. Stats are based on player current skills
export default function CraftTreasure(stats: (power: number) => TreasureStats) {
  return function (
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
      invTreasure.item.stats = stats(itemPower);
      invTreasure.item.quality = itemQuality;
      return invTreasure;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  };
}
