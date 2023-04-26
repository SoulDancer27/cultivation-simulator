import { Box } from "@mui/material";
import { InventoryTreasure, isInventoryTreasure } from "GameConstants/Player";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import EquipmentCard from "./Equipment/EquipmentCard";

export default function Equipment() {
  const { inventory } = React.useContext(PlayerContext);
  const equippedItems = inventory.filter(
    (item) => isInventoryTreasure(item) && item.isEquipped
  );
  equippedItems as InventoryTreasure[];
  const weapon = (equippedItems as InventoryTreasure[]).find(
    (item) => item.stats.type === "weapon"
  );
  const armor = (equippedItems as InventoryTreasure[]).find(
    (item) => item.stats.type === "armor"
  );
  const helmet = (equippedItems as InventoryTreasure[]).find(
    (item) => item.stats.type === "helmet"
  );
  const ring = (equippedItems as InventoryTreasure[]).find(
    (item) => item.stats.type === "ring"
  );
  const pendant = (equippedItems as InventoryTreasure[]).find(
    (item) => item.stats.type === "pendant"
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
