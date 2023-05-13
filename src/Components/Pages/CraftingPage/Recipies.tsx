import { Box } from "@mui/material";
import React from "react";
import GameContext from "GameEngine/GameContext/GameContext";
import CraftingGrid from "./Recipies/CraftingGrid";

export type InventoryFilters = "all" | "money" | "treasure" | "mineral";

export default function Recipies() {
  const { crafting } = React.useContext(GameContext);

  return (
    <Box>
      <CraftingGrid items={crafting} />
    </Box>
  );
}

export type InventoryPages = {
  current: number;
  total: number;
};
