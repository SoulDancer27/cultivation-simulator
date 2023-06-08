import EmptyCell from "./EmptyCell";
import CraftingMoneyItem from "./CraftingMoneyItem";
import CraftingTreasureItem from "./CraftingTreasureItem";
import { Activity } from "GameConstants/Activities";

type GridItemProps = {
  item: Activity | undefined;
};

export default function CraftingGridItem(props: GridItemProps) {
  const { item } = props;
  if (!item || !item.result.items) return <EmptyCell />;
  const mainItem = item.result.items[0];
  if (mainItem.type === "money") return <CraftingMoneyItem activity={item} />;
  else if (mainItem.type === "treasure")
    return <CraftingTreasureItem activity={item} />;

  return <EmptyCell />;
}
