import { useNumberParser } from "@SoulDancer27/idle-rpg-lib";
import { Box, Button, Typography } from "@mui/material";
import ItemDescriptions from "Components/shared/ItemDescriptions";
import { CultivationManualType } from "GameConstants/Items/CultivationManuals";
import { PlayerContext, getStatName } from "GameEngine";
import React from "react";

export default function ManualTooltip(props) {
  const manual: CultivationManualType = props.item;
  const setShopItems = props.context;
  const { manuals, inventory } = React.useContext(PlayerContext);
  const { name, realm, stats, skills, maxLevel, price } = manual;
  const parse = useNumberParser();

  const buyManual = (manual) => {};
  let description: Array<JSX.Element> = [];
  if (stats)
    for (const [key, value] of Object.entries(stats)) {
      description.push(
        <Typography key={key}>
          {getStatName(key)}: {parse(value * 100) + "%"}
        </Typography>
      );
    }
  if (skills)
    for (const [key, value] of Object.entries(skills)) {
      description.push(
        <Typography key={key}>
          {getStatName(key)}: {parse(value * 100) + "%"}
        </Typography>
      );
    }
  return (
    <Box border={1} p={2} bgcolor={"background.paper"}>
      <Typography variant="h6">{name}</Typography>
      <Typography>{realm}</Typography>
      <Typography>Max Level: {maxLevel}</Typography>
      <Typography variant="h6" marginY={1}>
        Stats per Level:
      </Typography>
      {description}
      <Typography variant="h6">Price</Typography>
      <ItemDescriptions items={price} />
      <Button variant="contained" onClick={buyManual}>
        Buy
      </Button>
    </Box>
  );
}
