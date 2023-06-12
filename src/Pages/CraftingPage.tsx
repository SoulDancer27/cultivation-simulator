import { Box } from "@mui/material";
import React from "react";
import { Crafting } from "GameConstants/Activities";
import TreasureTooltip from "./CraftingPage/TreasureTooltip";
import { GridItemType, ItemGrid, BasicGridCell } from "Components";
import { GameContext } from "GameEngine";
import ActiveItem from "./CraftingPage/ActiveItem";
import PriceMultiplier from "./CraftingPage/PriceMultiplier";

export default function CraftingPage() {
  const { crafting } = React.useContext(GameContext);
  const [activeItem, setActiveItem] = React.useState<string | undefined>();

  let items: Array<GridItemType | undefined> = [];

  // Fill items array for the crafting grid
  for (let activity of Crafting) {
    const reward = activity.result.items;
    if (!reward) {
      items.push(undefined);
      continue;
    }
    const { name, type } = reward[0];
    items.push({
      name,
      type,
      data: activity,
    });
  }

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
        sizeX={4}
        sizeY={4}
        items={items}
        itemData={crafting}
        itemTypes={[
          { type: "treasure", Tooltip: TreasureTooltip, Cell: BasicGridCell },
        ]}
        context={{ setActiveItem }}
      />
    </Box>
  );
}
