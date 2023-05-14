import { Box, Typography, useTheme } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import HealthBar from "./PlayerStatsPane/HealthBar";
import StatDetailsTooltip from "./PlayerStatsPane/StatDetailsTooltip";

type Props = { displayStats: { name: string; stat: string }[] };

// Displays current player stats
export default function PlayerStatsPane(props: Props) {
  const player = React.useContext(PlayerContext);
  const { stats } = player;
  const { currentHealth, health } = stats;
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
      {props.displayStats.map((item) => (
        <Typography>
          {item.name} {player.stats[item.stat].toFixed(2)}
        </Typography>
      ))}
    </Box>
  );
}
