import { Box, Paper, Typography, useTheme } from "@mui/material";
import ProgressBar from "../shared/ProgressBar";
import React from "react";
import parseTime from "Utils/parseTime";
import { ActivityCardProps } from "./types";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import itemDescriptions from "../shared/itemDescriptions";
import { PlayerContext, useNumberParser, getStatName } from "GameEngine";
import { ActivitiesFunctions } from "GameConstants/Activities";
import { defaultUpdateInterval } from "GameConstants/Constants";

// Activity panel for activity without price, shows result image in the top right corner
export default function CraftingActivityCard(props: ActivityCardProps) {
  const { activity, isActive, source } = props;
  const player = React.useContext(PlayerContext);
  const { updateContext } = player;
  const parse = useNumberParser();
  const { result, price } = activity;
  const theme = useTheme();

  // Make result description with images
  let resultDescription: JSX.Element[] = [];
  if (result.items) resultDescription = itemDescriptions(result.items);

  let priceDescription: JSX.Element[] = [];
  if (price && price.items) priceDescription = itemDescriptions(price.items);
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

  // Display the reward description
  const StatsRewardDescription: StatsLine[] = [];
  if (result.baseStats) {
    for (const [key, value] of Object.entries(result.baseStats)) {
      StatsRewardDescription.push({
        text: getStatName(key),
        effect:
          value *
          (activity.result?.baseStatsMulti
            ? ActivitiesFunctions[activity.result.baseStatsMulti](activity)
            : 1),
      });
    }
  }

  const SkillsRewardDescription: StatsLine[] = [];
  if (result.skills) {
    for (const [key, value] of Object.entries(result.skills)) {
      SkillsRewardDescription.push({
        text: getStatName(key),
        effect:
          value *
          (activity.result?.skillsMulti
            ? ActivitiesFunctions[activity.result.skillsMulti](activity)
            : 1),
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
          <Box>{priceDescription}</Box>

          <ArrowForwardIcon fontSize={"large"} />

          <Box display={"flex"} marginRight={2}>
            {resultDescription}
          </Box>
        </Box>

        {StatsRewardDescription.length > 0 && (
          <Box display="flex" gap={theme.spacing(1)}>
            {StatsRewardDescription.map((item) => (
              <Typography key={item.text} variant="body1" display="inline">
                {item.text}{" "}
                {requiredTime > 1000
                  ? parse(item.effect)
                  : parse((item.effect / requiredTime) * 1000)}
              </Typography>
            ))}
            {requiredTime < 1000 ? "/s" : ""}
          </Box>
        )}

        {SkillsRewardDescription.length > 0 && (
          <Box display="flex" gap={theme.spacing(1)}>
            <Typography>Skill exp: </Typography>
            {SkillsRewardDescription.map((item) => (
              <Typography key={item.text} variant="body1" display="inline">
                {item.text}{" "}
                {requiredTime > 1000
                  ? parse(item.effect)
                  : parse((item.effect / requiredTime) * 1000)}
              </Typography>
            ))}
            {requiredTime < 1000 ? "/s" : ""}
          </Box>
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
