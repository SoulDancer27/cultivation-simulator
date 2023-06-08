import { Box } from "@mui/material";
import React from "react";
import EquipmentCard from "./Equipment/EquipmentCard";

import { PlayerContext } from "GameEngine";
import {
  isInventoryTreasure,
  PlayerEquipment,
  InventoryTreasure,
} from "GameConstants";

// Player equipment
export default function Equipment() {
  const { inventory } = React.useContext(PlayerContext);
  const equippedItems = inventory.filter(
    (item) => isInventoryTreasure(item) && item.isEquipped
  );
  const EquipCards: Array<JSX.Element> = [];
  for (let itemType of PlayerEquipment) {
    const treasure = (equippedItems as InventoryTreasure[]).find(
      (item) => item.item.type === itemType
    );
    EquipCards.push(
      <EquipmentCard treasure={treasure} type={itemType} key={itemType} />
    );
  }
  return <Box>{EquipCards}</Box>;
}
