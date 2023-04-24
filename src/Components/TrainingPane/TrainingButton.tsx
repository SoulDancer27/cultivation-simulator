import { Box, Paper, Typography, useTheme } from "@mui/material";
import { Activity } from "GameConstants/Activities";
import { PlayerState } from "GameConstants/Player";
import PlayerContext from "GameEngine/Player/PlayerContext";
import PlayerStatsDictionary from "GameEngine/Player/PlayerStatsDictionary";
import React from "react";

type TrainingButtonProps = Activity & {
  isActive: boolean;
};

export default function TrainingButton(props: TrainingButtonProps) {
  const { name, result, isActive } = props;
  const { updateContext, realm } = React.useContext(PlayerContext);
  const theme = useTheme();
  if (!result.baseStats) return;

  const TrainingDescription: TrainingButtonStatsLine[] = [];
  for (const [key, value] of Object.entries(result.baseStats)) {
    TrainingDescription.push({
      text: PlayerStatsDictionary[key],
      effect: value * (realm.power[key] || 1),
    });
  }

  const handleClick = () => {
    const newPlayerState: PlayerState = isActive
      ? { action: "idle" }
      : {
          action: "activity",
          activity: { name, source: "trainings" },
        };
    updateContext({ state: newPlayerState });
  };
  return (
    <Paper
      elevation={8}
      sx={{ margin: theme.spacing(2), borderRadius: theme.spacing(2) }}
    >
      <Box
        bgcolor={isActive ? "lightgray" : "white"}
        onClick={handleClick}
        width={theme.spacing(24)}
        height={theme.spacing(12)}
        borderRadius={theme.spacing(2)}
        border="1px solid lightgray"
        borderColor={isActive ? theme.palette.primary.main : "lightgray"}
        padding={theme.spacing(1)}
      >
        <Typography variant="body1" marginLeft={theme.spacing(2)}>
          {name}
        </Typography>
        {TrainingDescription.map((item) => (
          <Typography
            key={item.text}
            variant="body1"
            marginLeft={theme.spacing(2)}
          >
            {item.text} {item.effect}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
}

type TrainingButtonStatsLine = {
  text: string;
  effect: number;
};
