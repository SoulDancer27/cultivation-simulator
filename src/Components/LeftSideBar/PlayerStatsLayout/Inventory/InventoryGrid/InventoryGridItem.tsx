import EmptyCell from "./EmptyCell";
import InventoryTreasureItem from "./InventoryTreasureItem";
import { InventoryItem } from "GameConstants/Interfaces";
import InventoryCountableItem from "./InventoryCountableItem";

type GridItemProps = {
  item: InventoryItem | undefined;
};

// Draw inventory tile based on item type
export default function InventoryGridItem(props: GridItemProps) {
  const { item } = props;

  if (!item) return <EmptyCell />;
  else if (item.type === "money") return <InventoryCountableItem {...item} />;
  else if (item.type === "mineral") return <InventoryCountableItem {...item} />;
  else if (item.type === "herb") return <InventoryCountableItem {...item} />;
  else if (item.type === "treasure") return <InventoryTreasureItem {...item} />;

  return <EmptyCell />;
}
