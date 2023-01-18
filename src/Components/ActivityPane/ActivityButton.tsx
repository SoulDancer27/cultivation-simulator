import { Box, Paper, Typography, useTheme } from "@mui/material";
import { PlayerActivity, PlayerState } from "GameConstants/Player";
import PlayerContext from "GameEngine/Player/PlayerContext";
import PlayerStatsDictionary from "GameEngine/Player/PlayerStatsDictionary";
import React from "react";

type ActivityButtonProps = { activity: PlayerActivity };

export default function ActivityButton(props: ActivityButtonProps) {
  const { activity } = props;
  const { name, result } = activity;
  const { updateContext, realm, state } = React.useContext(PlayerContext);
  const theme = useTheme();
  const isActive = state.activity && state.activity.name === activity.name;

  const ActivityStatsDescription: ActivityButtonStatsLine[] = [];
  if (result.baseStats) {
    for (const [key, value] of Object.entries(result.baseStats)) {
      ActivityStatsDescription.push({
        text: PlayerStatsDictionary[key],
        effect: value * (realm.power[key] || 1),
      });
    }
  }

  const ActivityRewardDescription: ActivityRewardLine[] = [];
  if (result.items) {
    for (let item of result.items) {
      ActivityRewardDescription.push({
        name: item.name,
        amount: item.amount,
      });
    }
  }

  const handleClick = () => {
    const newPlayerState: PlayerState = isActive
      ? { action: "idle" }
      : {
          action: "activity",
          activity: { ...activity, currentTime: undefined },
        };
    updateContext({ state: newPlayerState });
  };

  // Determine remaining time for timed activities
  let remainingTime: number | undefined = activity.requiredTime;
  if (state.activity && isActive) {
    if (state.activity.requiredTime)
      remainingTime = state.activity.requiredTime;
    if (state.activity.requiredTime && state.activity.currentTime)
      remainingTime = state.activity.requiredTime - state.activity.currentTime;
  }

  return (
    <Paper
      elevation={8}
      sx={{ margin: theme.spacing(2), borderRadius: theme.spacing(2) }}
    >
      <Box
        bgcolor={isActive ? "lightgray" : "white"}
        width={theme.spacing(24)}
        height={theme.spacing(12)}
        onClick={handleClick}
        borderRadius={theme.spacing(2)}
        border="1px solid lightgray"
        borderColor={isActive ? theme.palette.primary.main : "lightgray"}
        padding={theme.spacing(1)}
      >
        <Typography variant="body1" marginLeft={theme.spacing(2)}>
          {name}
        </Typography>
        {remainingTime && (
          <Typography marginLeft={theme.spacing(2)} variant="body2">
            Time:
            {remainingTime.toFixed(2)}
            sec
          </Typography>
        )}
        {ActivityStatsDescription.map((item) => (
          <Typography
            key={item.text}
            variant="body1"
            marginLeft={theme.spacing(2)}
          >
            {item.text} {item.effect}
          </Typography>
        ))}
        {ActivityRewardDescription.map((item) => (
          <Typography
            key={item.name}
            variant="body1"
            marginLeft={theme.spacing(2)}
          >
            {item.name} {item.amount}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
}

type ActivityButtonStatsLine = {
  text: string;
  effect: number;
};

type ActivityRewardLine = {
  name: string;
  amount: number;
};
