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
