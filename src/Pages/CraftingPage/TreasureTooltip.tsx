import { Box, Button, Typography } from "@mui/material";
import { ActivitiesFunctions, Activity } from "GameConstants/Activities";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import parseTime from "Utils/parseTime";
import ItemDescriptions from "Components/shared/ItemDescriptions";
import ActivityStatsDescription from "Components/shared/ActivityStatsDescription";

type Props = {
  item: any;
  context: {
    setActiveItem: React.Dispatch<React.SetStateAction<string | undefined>>;
  };
};

export default function TreasureTooltip(props: Props) {
  const { item, context } = props;
  const activity: Activity = item;
  const craftTime = activity.time
    ? ActivitiesFunctions[activity.time](activity)
    : activity.baseTime;

  const craftTimeLabel =
    craftTime < 1000
      ? (1000 / craftTime).toFixed(2) + "/s"
      : parseTime(craftTime);

  const { result, price } = activity;

  return (
    <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
      <Typography variant="h6">{item.name}</Typography>
      <Typography>Craft time: {craftTimeLabel}</Typography>
      <Typography>{item.description}</Typography>
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
          requiredTime={craftTime}
          multiplicatorFunctionName={activity.result.baseStatsMulti}
        />
      )}
      {result.skills && (
        <ActivityStatsDescription
          stats={result.skills}
          activity={activity}
          requiredTime={craftTime}
          multiplicatorFunctionName={activity.result.skillsMulti}
        />
      )}
      <Button
        variant="outlined"
        onClick={() => context.setActiveItem(activity.name)}
      >
        Select
      </Button>
    </Box>
  );
}
