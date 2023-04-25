import { Box, Paper, Typography, useTheme } from "@mui/material";
import { Activity } from "GameConstants/Activities";
import PlayerStatsDictionary from "GameEngine/Player/PlayerStatsDictionary";
import ProgressBar from "./ProgressBar";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import { defaultUpdateInterval } from "GameConstants/Constants";

type Props = {
  activity: Activity;
  isActive: boolean;
  source: string;
};
export default function ActivityPanel(props: Props) {
  const { activity, isActive, source } = props;
  const { updateContext } = React.useContext(PlayerContext);
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
        text: PlayerStatsDictionary[key],
        effect: value,
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

  // Display the price description
  const StatsPriceDescription: StatsLine[] = [];
  if (price?.baseStats) {
    for (const [key, value] of Object.entries(price.baseStats)) {
      StatsPriceDescription.push({
        text: PlayerStatsDictionary[key],
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
  let remainingTime: number | undefined = activity.time;
  if (activity && isActive) {
    if (activity.time) remainingTime = activity.time;
    if (activity.time && activity.currentTime)
      remainingTime = activity.time - activity.currentTime;
  }
  const currentTime = activity.currentTime || 0;
  // Change some displayed effects if action is really fast
  const fastAction = (activity.time / defaultUpdateInterval) * 1000 < 5;
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
              <Box display="flex" gap={theme.spacing(1)}>
                {StatsRewardDescription.map((item) => (
                  <Typography key={item.text} variant="body1" display="inline">
                    {item.text} {item.effect}
                  </Typography>
                ))}
              </Box>

              <Box display="flex" gap={theme.spacing(1)}>
                {ItemRewardDescription.map((item) => (
                  <Typography key={item.name} variant="body1" display="inline">
                    {item.name} {item.amount}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
          <Box>
            <ProgressBar
              value={
                fastAction && isActive
                  ? 100
                  : (currentTime / activity.time) * 100
              }
              label={`${remainingTime.toFixed(2)} / ${activity.time.toFixed(
                2
              )}`}
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
                  {item.text} {item.effect}
                </Typography>
              ))}
            </Box>

            <Box display="flex" gap={theme.spacing(1)}>
              {ItemPriceDescription.map((item) => (
                <Typography key={item.name} variant="body1" display="inline">
                  {item.name} {item.amount}
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
