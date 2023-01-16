import { Box, Button, Typography } from "@mui/material";
import { InventoryItem } from "GameConstants/Player";
import PlayerContext from "GameEngine/Player/PlayerContext";
import PlayerStatsDictionary from "GameEngine/Player/PlayerStatsDictionary";
import React from "react";

export default function Inventory() {
  const { inventory, updateContext } = React.useContext(PlayerContext);
  return (
    <Box marginLeft={10}>
      <Typography>Inventory</Typography>
      {inventory.map((item, index) => (
        <ItemCard item={item} key={index} />
      ))}
    </Box>
  );
}

function ItemCard(props: { item: InventoryItem }) {
  const { item } = props;
  const { inventory, updateContext } = React.useContext(PlayerContext);

  const TreasureDescription: TreasureDescriptionLine[] = [];
  for (const [key, value] of Object.entries(item.stats.stats)) {
    TreasureDescription.push({
      text: PlayerStatsDictionary[key],
      effect: value,
    });
  }

  const dropItem = (id: number) => {
    const index = inventory.findIndex((item) => item.id === id);
    if (index === -1) return;
    inventory.splice(index, 1);
    updateContext({ inventory });
  };

  return (
    <Box>
      <Typography>{item.stats.name}</Typography>
      {TreasureDescription.map((item) => (
        <Typography key={item.text}>
          {item.text} {item.effect}
        </Typography>
      ))}
      <Button variant="outlined" onClick={() => dropItem(item.id)}>
        Drop
      </Button>
    </Box>
  );
}

type TreasureDescriptionLine = {
  text: string;
  effect: number;
};
