import { InventoryItem } from "GameConstants/Player";
import EmptyCell from "./EmptyCell";
import InventoryMoneyItem from "./InventoryMoneyItem";
import InventoryTreasureItem from "./InventoryTreasureItem";

type GridItemProps = {
  item: InventoryItem | undefined;
};

export default function InventoryGridItem(props: GridItemProps) {
  const { item } = props;
  if (!item) return <EmptyCell />;
  else if (item.type === "money") return <InventoryMoneyItem {...item} />;
  else if (item.type === "treasure") return <InventoryTreasureItem {...item} />;
  return <EmptyCell />;
}
