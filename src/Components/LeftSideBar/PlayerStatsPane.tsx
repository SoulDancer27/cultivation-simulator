import { Box, Typography, useTheme } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import HealthBar from "./PlayerStatsPane/HealthBar";
import StatDetailsTooltip from "./PlayerStatsPane/StatDetailsTooltip";

// Displays current player stats
export default function PlayerStatsPane() {
  const player = React.useContext(PlayerContext);
  const { stats } = player;
  const { currentHealth, health, attack, defence, healthRegen, insight } =
    stats;
  const theme = useTheme();

  return (
    <Box
      width={512}
      paddingTop={theme.spacing(1)}
      paddingLeft={theme.spacing(1)}
    >
      <StatDetailsTooltip stat="health">
        <Box>
          <HealthBar
            label={`Health: ${currentHealth.toFixed(2)} / ${health.toFixed(2)}`}
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
    </Box>
  );
}