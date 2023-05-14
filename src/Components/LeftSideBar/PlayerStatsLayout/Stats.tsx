import { Box, Typography } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import { getStatName } from "GameEngine/Player/PlayerStatsDictionary";
import React from "react";

// Player baseStats display
export default function Stats() {
  const { baseStats } = React.useContext(PlayerContext);
  const { health, healthRegen, attack, defence } = baseStats;
  let description: Array<JSX.Element> = [];
  for (const [key, value] of Object.entries(baseStats)) {
    description.push(
      <Typography key={key}>
        {getStatName(key)}: {value.toFixed(2)}
      </Typography>
    );
  }

  return (
    <Box>
      <Typography>Base stats</Typography>
      {description}
    </Box>
  );
}
