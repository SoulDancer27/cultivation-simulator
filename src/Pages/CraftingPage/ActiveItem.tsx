import { Box, Button, Paper, useTheme } from "@mui/material";
import { ActivityStatsDescription } from "Components";
import ItemDescriptions from "Components/shared/ItemDescriptions";
import { ActivitiesFunctions, Activity } from "GameConstants/Activities";
import parseTime from "Utils/parseTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ProgressBar from "Components/shared/ProgressBar";
import { GameContext, PlayerContext } from "GameEngine";
import React from "react";
import { defaultUpdateInterval } from "GameConstants/Constants";

type Props = {
  activity: Activity;
};

export default function ActiveItem(props: Props) {
  const { activity } = props;
  const player = React.useContext(PlayerContext);
  const { crafting, updateContext: updateGameContext } =
    React.useContext(GameContext);
  const theme = useTheme();
  const { price, result } = activity;
  const isActive =
    player.state.action === "activity" &&
    player.state.activity?.name === activity.name;
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

  const craftButtonClick = () => {
    if (isActive) {
      player.updateContext({ state: { action: "idle", activity: undefined } });
      const index = crafting.findIndex((craft) => craft.name === activity.name);
      if (index !== -1) {
        crafting[index].currentTime = 0;
        updateGameContext({ crafting: crafting.slice() });
      }
    } else {
      player.updateContext({
        state: {
          action: "activity",
          activity: { name: activity.name, source: "crafting" },
        },
      });
    }
  };

  return (
    <Paper
      elevation={8}
      sx={{
        paddingX: theme.spacing(2),
        paddingY: theme.spacing(1),
        borderRadius: theme.spacing(2),
        minHeight: 60,
        border: "1px solid lightgray",
        borderColor: isActive ? theme.palette.primary.main : "lightgray",
        padding: theme.spacing(1),
        maxWidth: "600px",
      }}
    >
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent={"space-between"}
        minWidth={price ? 400 : 600}
        minHeight={60}
        height="100%"
      >
        {" "}
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
        <Button variant="outlined" onClick={craftButtonClick}>
          {isActive ? "stop" : "craft"}
        </Button>
      </Box>
    </Paper>
  );
}
