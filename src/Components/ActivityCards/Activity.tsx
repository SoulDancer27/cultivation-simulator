import { Box, Paper, Typography, useTheme } from "@mui/material";
import ProgressBar from "../shared/ProgressBar";
import React from "react";
import parseTime from "Utils/parseTime";
import { ActivityCardProps } from "./types";
import { PlayerContext, useNumberParser, getStatName } from "GameEngine";
import { ActivitiesFunctions } from "GameConstants/Activities";
import { defaultUpdateInterval } from "GameConstants/Constants";

// Generic activity panel without decorations suitable for any activity
export default function ActivityCard(props: ActivityCardProps) {
  const { activity, isActive, source, showTimesCompleted } = props;
  const player = React.useContext(PlayerContext);
  const parse = useNumberParser();
  const { updateContext } = player;
  const { result, price } = activity;
  const theme = useTheme();

  // Handle click on activity card
  const handleClick = () => {
    // If activity is active on click, set character state.action to 'idle' (i.e. deactivate training)
    if (isActive)
      updateContext({
        state: {
          action: "idle",
          activity: undefined,
        },
      });
    // If activity is not active on click, set character state.action to 'activity' (i.e. activate training)
    else {
      updateContext({
        state: {
          action: "activity",
          activity: { name: activity.name, source },
        },
      });
    }
  };

  // Object to display the result description for baseStat rewards
  const StatsRewardDescription: StatsLine[] = [];

  // If the activity result includes baseStats
  if (result.baseStats) {
    // For every entry of baseStats in the result object, push the baseStat name and exp reward to the StatsRewardDescription array for display
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

  // Object to display the result description for item rewards
  const ItemRewardDescription: ItemLine[] = [];

  // If the activity result includes items
  if (result.items) {
    // For every item in the result object, push the item name and quantity to the ItemRewardDescription array for display
    for (let item of result.items) {
      ItemRewardDescription.push({
        name: item.name,
        amount: item.amount,
      });
    }
  }

  // Object to display the result description for skill rewards
  const SkillsRewardDescription: StatsLine[] = [];

  // If the activity result includes skills
  if (result.skills) {
    // For every entry of skills in the result object, push the skill name and exp reward to the SkillsRewardDescription array for display
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

  // Object to display the result description for prices / costs of the activity
  const StatsPriceDescription: StatsLine[] = [];

  // If the activity price includes baseStats
  if (price?.baseStats) {
    // For every entry of baseStats in the price object, push the baseStat name and exp cost to the StatsPriceDescription array for display
    for (const [key, value] of Object.entries(price.baseStats)) {
      StatsPriceDescription.push({
        text: getStatName(key),
        effect: value,
      });
    }
  }

  // Object to display the result description for item prices / costs of the activity
  const ItemPriceDescription: ItemLine[] = [];

  // If the activity price includes items
  if (price?.items) {
    // For every item in the price object, push the item name and quantity to the ItemPriceDescription array for display
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
  // Action is a 'fast action' if it takes less than 5 update intervals to complete
  const fastAction = requiredTime / defaultUpdateInterval < 5;

  // Adding text to the progress bar label:
  // If action takes less than 1000ms to complete, display the amount of actions completed per second
  // Else, display the amount of time required to complete the action in ms
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
              {/* Display for rewarded stats */}
              {/* If baseStats are rewarded: Display a list of the stats and their exp quantities */}
              {/* Per baseStat: If required time to complete is greater than 1s, show exp gained per completion. Else, show exp gained divided by required time multiplied by 1000 */}
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
              {/* Display for rewarded items */}
              {/* If items are rewarded: Display a list of the items and their quantities */}
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
              {/* Display for rewarded skills */}
              {/* If skills are rewarded: Display a list of the skills and their rewarded exp */}
              {/* Per skill: If the required time for activity completion is greater than 1s, show the rewarded exp per completion. Else, show the rewarded exp divided by required time to complete and multiplied by 1000 */}
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
          {/* The progress bar of the activity card */}
          <Box>
            {/* Value of the progress bar is 100 (i.e. complete) if the action is marked 'fast' and is active, otherwise it's the percentage of the current time out of the required time */}
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

// Object to contain name of baseStat and exp change
type StatsLine = {
  text: string;
  effect: number;
};

// Object to contain name and quantity of items
type ItemLine = {
  name: string;
  amount: number;
};
