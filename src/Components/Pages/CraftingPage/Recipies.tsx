import { Box } from "@mui/material";
import React from "react";
import { useGameState } from "GameEngine/GameContext/GameContext";
import CraftingGrid from "./Recipies/CraftingGrid";

export type InventoryFilters = "all" | "money" | "treasure" | "mineral";

export default function Recipies() {
  const { crafting } = useGameState();

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
