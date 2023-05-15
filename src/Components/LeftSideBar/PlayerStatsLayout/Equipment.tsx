import { Box } from "@mui/material";

import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import EquipmentCard from "./Equipment/EquipmentCard";
import {
  isInventoryTreasure,
  InventoryTreasure,
} from "GameConstants/Interfaces";

// Player equipment
export default function Equipment() {
  const { inventory } = React.useContext(PlayerContext);
  const equippedItems = inventory.filter(
    (item) => isInventoryTreasure(item) && item.isEquipped
  );
  equippedItems as InventoryTreasure[];
  const weapon = (equippedItems as InventoryTreasure[]).find(
    (item) => item.item.type === "weapon"
  );
  const armor = (equippedItems as InventoryTreasure[]).find(
    (item) => item.item.type === "armor"
  );
  const helmet = (equippedItems as InventoryTreasure[]).find(
    (item) => item.item.type === "helmet"
  );
  const ring = (equippedItems as InventoryTreasure[]).find(
    (item) => item.item.type === "ring"
  );
  const pendant = (equippedItems as InventoryTreasure[]).find(
    (item) => item.item.type === "pendant"
  );
  return (
    <Box>
      <EquipmentCard treasure={weapon} type={"weapon"} />
      <EquipmentCard treasure={armor} type={"armor"} />
      <EquipmentCard treasure={helmet} type={"helmet"} />
      <EquipmentCard treasure={ring} type={"ring"} />
      <EquipmentCard treasure={pendant} type={"pendant"} />
    </Box>
  );
}
