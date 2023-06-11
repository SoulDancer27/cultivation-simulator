import { Box, Typography } from "@mui/material";
import { GridItemType, itemDescriptions } from "Components";
import { ActivitiesFunctions, Activity } from "GameConstants/Activities";
import { CultivationRealms } from "GameConstants/Cultivation/CultivationRealms";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getStatName } from "GameEngine";
import parseTime from "Utils/parseTime";
import ItemDescriptions from "Components/shared/ItemDescriptions";

type Props = {
  item: GridItemType;
  data: any;
};

export default function TreasureTooltip(props: Props) {
  const { item } = props;
  const activity: Activity = props.data;
  const craftTime = activity.time
    ? ActivitiesFunctions[activity.time](activity)
    : activity.baseTime;

  const craftTimeLabel =
    craftTime < 1000
      ? (1000 / craftTime).toFixed(2) + "/s"
      : parseTime(craftTime);

  const { result, price } = activity;

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

  return (
    <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
      <Typography variant="h6">{item.name}</Typography>
      <Typography>Craft time: {craftTimeLabel}</Typography>
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
    </Box>
  );
}

type StatsLine = {
  text: string;
  effect: number;
};
