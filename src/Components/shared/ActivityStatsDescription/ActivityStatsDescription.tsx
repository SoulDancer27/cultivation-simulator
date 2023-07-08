import { Box, Typography } from "@mui/material";
import { ActivitiesFunctions, Activity } from "GameConstants/Activities";
import { PlayerBaseStats } from "GameConstants/Player";
import { getStatName } from "GameEngine/Utils/getStatName";
import { useNumberParser } from "GameEngine/Utils/useNumberParser";
import { useAppSelector } from "GameEngine/store";
import React from "react";

type Props = {
  stats: Partial<PlayerBaseStats>;
  requiredTime?: number;
  activity: Activity;
  multiplicatorFunctionName?: string;
};

export default function ActivityStatsDescription(props: Props) {
  const player = useAppSelector((state) => state.player);
  const { stats, activity, multiplicatorFunctionName, requiredTime } = props;
  const parse = useNumberParser();
  // Display the  description
  const StatsDescription: StatsLine[] = [];
  for (const [key, value] of Object.entries(stats)) {
    StatsDescription.push({
      text: getStatName(key),
      effect:
        value *
        (multiplicatorFunctionName
          ? ActivitiesFunctions[multiplicatorFunctionName](activity, player)
          : 1),
    });
  }
  return (
    <Box display="flex" gap={1}>
      {StatsDescription.map((item) => (
        <Typography key={item.text} variant="body1" display="inline">
          {item.text}{" "}
          {requiredTime
            ? requiredTime > 1000
              ? parse(item.effect)
              : parse((item.effect / requiredTime) * 1000)
            : ""}
        </Typography>
      ))}
      {requiredTime && requiredTime < 1000 ? "/s" : ""}
    </Box>
  );
}

type StatsLine = {
  text: string;
  effect: number;
};
