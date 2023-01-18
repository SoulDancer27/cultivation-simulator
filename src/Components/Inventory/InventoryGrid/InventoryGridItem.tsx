import { Box } from "@mui/material";
import { InventoryItem } from "GameConstants/Player";
import InventoryMoneyItem from "./InventoryMoneyItem";

type GridItemProps = {
  item: InventoryItem | undefined;
};

export default function InventoryGridItem(props: GridItemProps) {
  const { item } = props;
  if (!item) return <EmptyCell />;
  else if (item.type === "money") return <InventoryMoneyItem {...item} />;
  return <EmptyCell />;
}

function EmptyCell() {
  return <Box width={64} height={64} border="1px solid gray" />;
}
