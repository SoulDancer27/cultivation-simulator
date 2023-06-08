import { Box } from "@mui/material";
import CraftingGridItem from "./CraftingGridItem";
import { Activity } from "GameConstants/Activities/Activities";

export default function CraftingGrid(props: { items: Activity[] }) {
  const { items } = props;

  const length = 96;
  const tileIndex = Array(length)
    .fill(0)
    .map((element, index) => index);

  const Tiles = tileIndex.map((value) => ({
    item: items[value] || undefined,
    index: value,
  }));
  return (
    <Box width={768} height={512} display="flex" flexWrap="wrap">
      {Tiles.map((tile) => (
        <CraftingGridItem key={tile.index} item={tile.item} />
      ))}
    </Box>
  );
}
