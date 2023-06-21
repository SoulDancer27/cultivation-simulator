import { Box } from "@mui/material";
import { ItemGrid } from "Components";
import { CultivationManuals } from "GameConstants/Items/CultivationManuals";
import React from "react";
import ManualCell from "./ManualsShop/ManualCell";
import ManualTooltip from "./ManualsShop/ManualTooltip";

export default function ManualsShop() {
  const [shopItems, setShopItems] = React.useState(CultivationManuals);
  return (
    <Box>
      <ItemGrid
        cellWidth={100}
        cellHeight={100}
        sizeX={5}
        sizeY={5}
        items={shopItems}
        Cell={ManualCell}
        Tooltip={ManualTooltip}
        context={setShopItems}
      />
    </Box>
  );
}
