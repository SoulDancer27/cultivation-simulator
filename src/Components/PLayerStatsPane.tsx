import { Box, Typography } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import { monthSpan, yearSpan } from "GameConstants/Constants";
import React from "react";

export default function PlayerStatsPane() {
  const { stats, realm } = React.useContext(PlayerContext);
  const { age, currentHealth, health, attack, defence, healthRegen, insight } =
    stats;

  return (
    <Box>
      <Typography>Nameless Hero</Typography>
      <Typography>Age: {parsePlayerAge(age)}</Typography>
      <Typography>Realm: {realm.name}</Typography>
      <Typography>
        Hp: {currentHealth.toFixed(2)} / {health.toFixed(2)}
      </Typography>
      <Typography>Hp.regen {healthRegen.toFixed(2)}</Typography>
      <Typography>Atk: {attack.toFixed(2)}</Typography>
      <Typography>Def: {defence.toFixed(2)}</Typography>
      <Typography>Insight: {insight.toFixed(2)}</Typography>
    </Box>
  );
}

// 70 years equals 1 hour
function parsePlayerAge(age: number): string {
  const years = Math.floor(age / yearSpan);
  // Just in case to not overflow 12 due to rounding
  const months = Math.min(Math.floor((age - years * yearSpan) / monthSpan), 12);
  return `${years} years ${months} months`;
}
