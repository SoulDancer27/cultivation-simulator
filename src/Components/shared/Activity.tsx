import { Box, Paper, Typography, useTheme } from "@mui/material";
import { Activity } from "GameConstants/Activities";
import PlayerStatsDictionary from "GameEngine/Player/PlayerStatsDictionary";
import ProgressBar from "./ProgressBar";

type Props = {
  activity: Activity;
  isActive: boolean;
};
export default function ActivityPanel(props: Props) {
  const { activity, isActive } = props;
  const { result } = activity;
  const theme = useTheme();

  // Display the reward description
  const StatsRewardDescription: StatsRewardLine[] = [];
  if (result.baseStats) {
    for (const [key, value] of Object.entries(result.baseStats)) {
      StatsRewardDescription.push({
        text: PlayerStatsDictionary[key],
        effect: value,
      });
    }
  }

  const ItemRewardDescription: ItemRewardLine[] = [];
  if (result.items) {
    for (let item of result.items) {
      ItemRewardDescription.push({
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
  return (
    <Paper
      elevation={8}
      sx={{ margin: theme.spacing(2), borderRadius: theme.spacing(2) }}
    >
      <Box display="flex" flexDirection={"column"}>
        <Box display="flex">
          <Box display="flex" flexDirection={"column"}>
            <Typography>{activity.name}</Typography>
            {StatsRewardDescription.map((item) => (
              <Typography
                key={item.text}
                variant="body1"
                marginLeft={theme.spacing(2)}
              >
                {item.text} {item.effect}
              </Typography>
            ))}
            {ItemRewardDescription.map((item) => (
              <Typography
                key={item.name}
                variant="body1"
                marginLeft={theme.spacing(2)}
              >
                {item.name} {item.amount}
              </Typography>
            ))}
          </Box>
        </Box>
        <ProgressBar
          value={(currentTime / activity.time) * 100}
          label={`${remainingTime} / ${activity.time}`}
        />
      </Box>
    </Paper>
  );
}

type StatsRewardLine = {
  text: string;
  effect: number;
};

type ItemRewardLine = {
  name: string;
  amount: number;
};
