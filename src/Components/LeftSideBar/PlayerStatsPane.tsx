import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import HealthBar from "./PlayerStatsPane/HealthBar";
import StatDetailsTooltip from "./PlayerStatsPane/StatDetailsTooltip";
import { PlayerContext, useNumberParser } from "GameEngine";

type Props = { displayStats: { name: string; stat: string }[] };

// Displays current player stats
export default function PlayerStatsPane(props: Props) {
  const player = React.useContext(PlayerContext);
  const parse = useNumberParser();
  const { stats, currentStats } = player;
  const { health } = stats;
  const currentHealth = currentStats.health;
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
            label={`Health: ${parse(currentHealth)} / ${parse(health)}`}
            value={(currentHealth / health) * 100}
          />
        </Box>
      </StatDetailsTooltip>
      {props.displayStats.map((item) => (
        <StatDetailsTooltip stat={item.stat} key={item.stat}>
          <Typography>
            {item.name} {parse(player.stats[item.stat])}
          </Typography>
        </StatDetailsTooltip>
      ))}
    </Box>
  );
}
