import { Box, Typography } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";

export default function Stats() {
  const { baseStats } = React.useContext(PlayerContext);
  const { health, healthRegen, attack, defence } = baseStats;

  return (
    <Box>
      <Typography>Base stats</Typography>
      <Typography>Health: {health.toFixed(2)}</Typography>
      <Typography>Health regen: {healthRegen.toFixed(2)}</Typography>
      <Typography>Attack: {attack.toFixed(2)}</Typography>
      <Typography>Defence: {defence.toFixed(2)}</Typography>
    </Box>
  );
}
