import { Box, Paper, Typography, useTheme } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import { monthSpan, yearSpan } from "GameConstants/Constants";
import React from "react";
import HealthBar from "./PlayerStatsPane/HealthBar";
import StatDetailsTooltip from "./PlayerStatsPane/StatDetailsTooltip";

export default function PlayerStatsPane() {
  const player = React.useContext(PlayerContext);
  const { stats, realm } = player;
  const { age, currentHealth, health, attack, defence, healthRegen, insight } =
    stats;
  const theme = useTheme();

  return (
    <Box width={512} padding={theme.spacing(2)}>
      <Typography variant="h5">Age: {parsePlayerAge(age)}</Typography>
      <Typography variant="h5">Realm: {realm.name}</Typography>
      <Paper elevation={12} sx={{ padding: theme.spacing(1) }}>
        <StatDetailsTooltip stat="health">
          <Box>
            <HealthBar
              label={`Health: ${currentHealth.toFixed(2)} / ${health.toFixed(
                2
              )}`}
              value={(currentHealth / health) * 100}
            />
          </Box>
        </StatDetailsTooltip>
        <StatDetailsTooltip stat="healthRegen">
          <Typography>Health regen {healthRegen.toFixed(2)}</Typography>
        </StatDetailsTooltip>
        <StatDetailsTooltip stat="attack">
          <Typography>Attack: {attack.toFixed(2)}</Typography>
        </StatDetailsTooltip>

        <StatDetailsTooltip stat="defence">
          <Typography>Defence: {defence.toFixed(2)}</Typography>
        </StatDetailsTooltip>

        <StatDetailsTooltip stat="insight">
          <Typography>Insight: {insight.toFixed(2)}</Typography>
        </StatDetailsTooltip>
      </Paper>
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
