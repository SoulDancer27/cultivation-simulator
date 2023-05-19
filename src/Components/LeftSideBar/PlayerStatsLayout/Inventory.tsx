import { Box } from "@mui/material";

import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import InventoryBottomPanel from "./Inventory/InventoryBottomPanel";
import InventoryFiltersPane from "./Inventory/InventoryFilters";
import InventoryGrid from "./Inventory/InventoryGrid";
import { isInventoryTreasure } from "GameConstants/Interfaces";

export type InventoryFilters =
  | "all"
  | "money"
  | "treasure"
  | "mineral"
  | "herb";

export default function Inventory() {
  const { inventory } = React.useContext(PlayerContext);
  const [type, setType] = React.useState<InventoryFilters>("all");
  // Filter equipped items
  let displayedInventory = inventory.filter((item) => {
    if (!isInventoryTreasure(item)) return true;
    else {
      return !item.isEquipped;
    }
  });

  // Filter according to type
  if (type !== "all") {
    displayedInventory = displayedInventory.filter(
      (item) => item.type === type
    );
  }

  const [pages, setPages] = React.useState<InventoryPages>({
    current: 1,
    total: Math.ceil(displayedInventory.length / 36),
  });

  React.useEffect(() => {
    setPages((pages) => {
      const total = Math.max(Math.ceil(displayedInventory.length / 36), 1);
      return { current: Math.min(pages.current, total), total };
    });
  }, [displayedInventory.length]);

  // Select inventory for the page
  const inventoryPage = displayedInventory.slice(
    (pages.current - 1) * 36,
    Math.min(pages.current * 36, displayedInventory.length)
  );

  return (
    <Box>
      <Box display="flex">
        <InventoryGrid inventory={inventoryPage} />
        <InventoryFiltersPane type={type} setType={setType} />
      </Box>
      <InventoryBottomPanel pages={pages} setPages={setPages} />
    </Box>
  );
}

export type InventoryPages = {
  current: number;
  total: number;
};
