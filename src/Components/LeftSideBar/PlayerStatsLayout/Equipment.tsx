import { Box } from "@mui/material";

import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import EquipmentCard from "./Equipment/EquipmentCard";
import {
  isInventoryTreasure,
  InventoryTreasure,
} from "GameConstants/Interfaces";
import { PlayerEquipment } from "GameConstants/Player";

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
