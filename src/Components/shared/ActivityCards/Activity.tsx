import { Box, Paper, Typography, useTheme } from "@mui/material";
import { getStatName } from "GameEngine/Player/PlayerStatsDictionary";
import ProgressBar from "../ProgressBar";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import { defaultUpdateInterval } from "GameConstants/Constants";
import parseTime from "Utils/parseTime";
import ActivitiesFunctions from "GameConstants/ActivitiesFunctions";
import { ActivityCardProps } from "./types";
import { useNumberParser } from "GameEngine/SettingsContext/SettingContext";

// Generic activity panel without decorations suitable for any activity
export default function ActivityCard(props: ActivityCardProps) {
  const { activity, isActive, source, showTimesCompleted } = props;
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

  const ItemRewardDescription: ItemLine[] = [];
  if (result.items) {
    for (let item of result.items) {
      ItemRewardDescription.push({
        name: item.name,
        amount: item.amount,
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

  // Display the price description
  const StatsPriceDescription: StatsLine[] = [];
  if (price?.baseStats) {
    for (const [key, value] of Object.entries(price.baseStats)) {
      StatsPriceDescription.push({
        text: getStatName(key),
        effect: value,
      });
    }
  }

  const ItemPriceDescription: ItemLine[] = [];
  if (price?.items) {
    for (let item of price.items) {
      ItemPriceDescription.push({
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
              {StatsRewardDescription.length > 0 && (
                <Box display="flex" gap={theme.spacing(1)}>
                  {StatsRewardDescription.map((item) => (
                    <Typography
                      key={item.text}
                      variant="body1"
                      display="inline"
                    >
                      {item.text}{" "}
                      {requiredTime > 1000
                        ? parse(item.effect)
                        : parse((item.effect / requiredTime) * 1000)}
                    </Typography>
                  ))}
                  {requiredTime < 1000 ? "/s" : ""}
                </Box>
              )}
              {ItemRewardDescription.length > 0 && (
                <Box display="flex" gap={theme.spacing(1)}>
                  {ItemRewardDescription.map((item) => (
                    <Typography
                      key={item.name}
                      variant="body1"
                      display="inline"
                    >
                      {item.name} {parse(item.amount)}
                    </Typography>
                  ))}
                </Box>
              )}
              {SkillsRewardDescription.length > 0 && (
                <Box display="flex" gap={theme.spacing(1)}>
                  <Typography>Skill exp: </Typography>
                  {SkillsRewardDescription.map((item) => (
                    <Typography
                      key={item.text}
                      variant="body1"
                      display="inline"
                    >
                      {item.text}{" "}
                      {requiredTime > 1000
                        ? parse(item.effect)
                        : parse((item.effect / requiredTime) * 1000)}
                    </Typography>
                  ))}
                  {requiredTime < 1000 ? "/s" : ""}
                </Box>
              )}
            </Box>
            {showTimesCompleted && (
              <Box marginLeft="auto">
                <Typography>{activity.timesCompleted}</Typography>
              </Box>
            )}
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
        {price && (
          <Box
            borderLeft="1px solid gray"
            paddingLeft={theme.spacing(2)}
            minWidth={200}
            minHeight={60}
          >
            <Typography>Price</Typography>
            <Box display="flex" gap={theme.spacing(1)}>
              {StatsPriceDescription.map((item) => (
                <Typography key={item.text} variant="body1" display="inline">
                  {item.text} {parse(item.effect)}
                </Typography>
              ))}
            </Box>

            <Box display="flex" gap={theme.spacing(1)}>
              {ItemPriceDescription.map((item) => (
                <Typography key={item.name} variant="body1" display="inline">
                  {item.name} {parse(item.amount)}
                </Typography>
              ))}
            </Box>
          </Box>
        )}
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
