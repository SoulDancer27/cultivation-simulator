import EmptyCell from "./EmptyCell";
import InventoryTreasureItem from "./InventoryTreasureItem";
import InventoryCountableItem from "./InventoryCountableItem";
import { InventoryItem } from "GameConstants";

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
