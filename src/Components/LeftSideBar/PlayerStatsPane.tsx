import { Box, Typography, useTheme } from "@mui/material";
import { usePlayerState } from "GameEngine/Player/PlayerContext";
import HealthBar from "./PlayerStatsPane/HealthBar";
import StatDetailsTooltip from "./PlayerStatsPane/StatDetailsTooltip";

type Props = { displayStats: { name: string; stat: string }[] };

// Displays current player stats
export default function PlayerStatsPane(props: Props) {
  const player = usePlayerState();
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
        <StatDetailsTooltip stat={item.stat} key={item.stat}>
          <Typography>
            {item.name} {player.stats[item.stat].toFixed(2)}
          </Typography>
        </StatDetailsTooltip>
      ))}
    </Box>
  );
}
