import { Box, Typography, useTheme } from "@mui/material";
import { isInventoryTreasure } from "GameConstants/Player";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import InventoryFilters from "./Inventory/InventoryFilters";
import InventoryGrid from "./Inventory/InventoryGrid";

type InventoryFilters = "all" | "money" | "treasure";

export default function Inventory() {
  const theme = useTheme();
  const { inventory } = React.useContext(PlayerContext);
  // Filter equipped items
  const displayedInventory = inventory.filter((item) => {
    if (!isInventoryTreasure(item)) return true;
    else {
      return !item.isEquipped;
    }
  });
  return (
    <Box paddingLeft={theme.spacing(1)}>
      <Typography variant="h5" marginTop={theme.spacing(2)}>
        Inventory
      </Typography>
      <Box display="flex">
        <InventoryGrid inventory={displayedInventory} />
        <InventoryFilters />
      </Box>
    </Box>
  );
}
