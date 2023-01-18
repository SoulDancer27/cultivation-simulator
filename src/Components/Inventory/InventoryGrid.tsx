import { Box } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import InventoryGridItem from "./InventoryGrid/InventoryGridItem";

export default function InventoryGrid() {
  const { inventory } = React.useContext(PlayerContext);
  const length =
    inventory.length === 0 ? 36 : Math.ceil(inventory.length / 36) * 36;
  const tileIndex = Array(length)
    .fill(0)
    .map((element, index) => index);

  const Tiles = tileIndex.map((value) => ({
    item: inventory[value] || undefined,
    index: value,
  }));
  return (
    <Box width={512 - 128} height={512 - 128} display="flex" flexWrap="wrap">
      {Tiles.map((tile) => (
        <InventoryGridItem key={tile.index} item={tile.item} />
      ))}
    </Box>
  );
}
