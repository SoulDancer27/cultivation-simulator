import { Box, Typography } from "@mui/material";
import React from "react";
import { Crafting } from "GameConstants/Activities";
import TreasureTooltip from "./CraftingPage/TreasureTooltip";
import { GridItemType, ItemGrid, BasicGridCell } from "Components";
import { PlayerContext } from "GameEngine";

export default function CraftingPage() {
  const { state } = React.useContext(PlayerContext);

  // Determine active training if any
  const { action, activity } = state;
  let activityName = "";
  if (action === "activity" && activity) {
    activityName = activity.name;
  }

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
    <Box>
      <Typography variant="h5">Craft</Typography>
      <ItemGrid
        cellWidth={120}
        cellHeight={64}
        sizeX={4}
        sizeY={4}
        items={items}
        itemData={Crafting}
        itemTypes={[
          { type: "treasure", Tooltip: TreasureTooltip, Cell: BasicGridCell },
        ]}
      />
    </Box>
  );
}
