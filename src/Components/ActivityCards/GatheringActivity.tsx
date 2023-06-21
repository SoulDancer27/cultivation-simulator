import { Box, Paper, Typography, useTheme } from "@mui/material";
import ProgressBar from "../shared/ProgressBar";
import React from "react";
import parseTime from "Utils/parseTime";
import { ActivityCardProps } from "./types";
import itemImages from "../shared/ItemImages";
import { PlayerContext } from "GameEngine";
import { ActivitiesFunctions } from "GameConstants/Activities";
import { defaultUpdateInterval } from "GameConstants/Constants";
import ItemImages from "../shared/ItemImages";
import ActivityStatsDescription from "Components/shared/ActivityStatsDescription";
import { useNumberParser } from "@SoulDancer27/idle-rpg-lib";

// Activity panel for activity without price, shows result image in the top right corner
export default function GatheringActivityCard(props: ActivityCardProps) {
  const { activity, isActive, source } = props;
  const player = React.useContext(PlayerContext);
  const parse = useNumberParser();
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

  const ItemRewardDescription: ItemLine[] = [];
  if (result.items) {
    for (let item of result.items) {
      ItemRewardDescription.push({
        name: item.name,
        amount: item.amount,
      });
    }
  }

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
      <Box display={"flex"}>
        <Box
          display="flex"
          flexDirection={"column"}
          justifyContent={"space-between"}
          minWidth={price ? 400 : 600}
          minHeight={60}
          height="100%"
          onClick={() => handleClick()}
        >
          <Box display="flex">
            <Box display="flex" flexDirection={"column"}>
              <Typography>{activity.name}</Typography>
              {result.baseStats && (
                <ActivityStatsDescription
                  stats={result.baseStats}
                  activity={activity}
                  requiredTime={requiredTime}
                  multiplicatorFunctionName={result.baseStatsMulti}
                />
              )}

              {ItemRewardDescription.length > 0 && (
                <Box display="flex" gap={theme.spacing(1)}>
                  {ItemRewardDescription.map((item, index) => (
                    <Typography key={index} variant="body1" display="inline">
                      {item.name} {parse(item.amount)}
                    </Typography>
                  ))}
                </Box>
              )}
              {result.skills && (
                <ActivityStatsDescription
                  stats={result.skills}
                  activity={activity}
                  requiredTime={requiredTime}
                  multiplicatorFunctionName={result.skillsMulti}
                />
              )}
            </Box>
            <Box marginLeft="auto" display={"flex"} marginRight={2}>
              {result.items && <ItemImages items={result.items} />}
            </Box>
          </Box>
          <Box>
            <ProgressBar
              value={
                fastAction && isActive
                  ? 100
                  : (currentTime / requiredTime) * 100
              }
              label={progressBarLabel}
              rightLabel
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

type StatsLine = {
  text: string;
  effect: number;
};

type ItemLine = {
  name: string;
  amount: number;
};
