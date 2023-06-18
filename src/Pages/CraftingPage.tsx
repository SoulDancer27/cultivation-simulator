import { Box } from "@mui/material";
import React from "react";
import { Crafting } from "GameConstants/Activities";
import TreasureTooltip from "./CraftingPage/TreasureTooltip";
import { ItemGrid } from "Components";
import { GameContext } from "GameEngine";
import ActiveItem from "./CraftingPage/ActiveItem";
import PriceMultiplier from "./CraftingPage/PriceMultiplier";
import TreasureCell from "./CraftingPage/TreasureCell";

export default function CraftingPage() {
  const { crafting } = React.useContext(GameContext);
  const [activeItem, setActiveItem] = React.useState<string | undefined>();

  return (
    <Box marginLeft={2} marginTop={2}>
      {activeItem && (
        <Box display="flex" gap={2} marginBottom={2}>
          <PriceMultiplier
            activity={
              crafting.find((activity) => activity.name === activeItem)!
            }
          />
          <ActiveItem
            activity={
              crafting.find((activity) => activity.name === activeItem)!
            }
          />
        </Box>
      )}
      <ItemGrid
        cellWidth={120}
        cellHeight={64}
        sizeX={5}
        sizeY={3}
        items={crafting}
        Cell={TreasureCell}
        Tooltip={TreasureTooltip}
        context={{ setActiveItem }}
      />
    </Box>
  );
}
