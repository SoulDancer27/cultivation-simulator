import { Box, Paper, Typography, useTheme } from "@mui/material";
import ProgressBar from "../shared/ProgressBar";
import React from "react";
import parseTime from "Utils/parseTime";
import { ActivityCardProps } from "./types";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { PlayerContext } from "GameEngine";
import { ActivitiesFunctions } from "GameConstants/Activities";
import { defaultUpdateInterval } from "GameConstants/Constants";
import ItemDescriptions from "../shared/ItemDescriptions";
import ActivityStatsDescription from "Components/shared/ActivityStatsDescription";

// Activity panel for activity without price, shows result image in the top right corner
export default function CraftingActivityCard(props: ActivityCardProps) {
  const { activity, isActive, source } = props;
  const player = React.useContext(PlayerContext);
  const { updateContext } = player;
  const { result, price } = activity;
  const theme = useTheme();

  const handleClick = () => {
    // If training is active
    if (isActive)
      updateContext({ state: { action: "idle", activity: undefined } });
    // Set active training
    else {
      updateContext({
        state: {
          action: "activity",
          activity: { name: activity.name, source },
        },
      });
    }
  };

  // Determine remaining time for timed activities
  const requiredTime = activity.time
    ? ActivitiesFunctions[activity.time](activity, player)
    : activity.baseTime;
  const currentTime = activity.currentTime || 0;

  // Change some displayed effects if action is really fast
  const fastAction = requiredTime / defaultUpdateInterval < 5;
  const progressBarLabel =
    requiredTime < 1000
      ? (1000 / requiredTime).toFixed(2) + "/s"
      : parseTime(requiredTime);
  return (
    <Paper
      elevation={8}
      sx={{
        paddingX: theme.spacing(2),
        paddingY: theme.spacing(1),
        margin: theme.spacing(2),
        borderRadius: theme.spacing(2),
        minHeight: 60,
        border: "1px solid lightgray",
        borderColor: isActive ? theme.palette.primary.main : "lightgray",
        padding: theme.spacing(1),
      }}
    >
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent={"space-between"}
        minWidth={price ? 400 : 600}
        minHeight={60}
        height="100%"
        onClick={() => handleClick()}
      >
        <Typography variant="h6">{activity.name}</Typography>
        <Box
          display="flex"
          justifyContent={"space-between"}
          marginY={2}
          alignItems={"center"}
        >
          {price && price.items && <ItemDescriptions items={price.items} />}

          <ArrowForwardIcon fontSize={"large"} />

          <Box display={"flex"} marginRight={2}>
            {result.items && <ItemDescriptions items={result.items} />}
          </Box>
        </Box>
        {result.baseStats && (
          <ActivityStatsDescription
            stats={result.baseStats}
            activity={activity}
            requiredTime={requiredTime}
            multiplicatorFunctionName={activity.result.baseStatsMulti}
          />
        )}
        {result.skills && (
          <ActivityStatsDescription
            stats={result.skills}
            activity={activity}
            requiredTime={requiredTime}
            multiplicatorFunctionName={activity.result.skillsMulti}
          />
        )}
        <Box>
          <ProgressBar
            value={
              fastAction && isActive ? 100 : (currentTime / requiredTime) * 100
            }
            label={progressBarLabel}
            rightLabel
          />
        </Box>
      </Box>
    </Paper>
  );
}

type StatsLine = {
  text: string;
  effect: number;
};
