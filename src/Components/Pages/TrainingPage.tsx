import { Box, Typography } from "@mui/material";
import React from "react";
import { useGameState } from "GameEngine/GameContext/GameContext";
import Activity from "../shared/ActivityCards/Activity";
import { usePlayerState } from "GameEngine/Player/PlayerContext";

export default function TrainingPage() {
  const { trainings } = useGameState();
  const { state } = usePlayerState();

  // Determine active training if any
  const { action, activity } = state;
  let activityName = "";
  if (action === "activity" && activity) {
    activityName = activity.name;
  }

  return (
    <Box>
      <Typography variant="h5">Train</Typography>
      <Box display="flex" flexWrap={"wrap"}>
        {trainings.map((training) => (
          <Activity
            activity={training}
            isActive={activityName === training.name}
            showTimesCompleted
            source="trainings"
            key={training.name}
          />
        ))}
      </Box>
    </Box>
  );
}
