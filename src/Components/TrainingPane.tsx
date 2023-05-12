import { Box, Typography } from "@mui/material";
import React from "react";
import GameContext from "GameEngine/GameContext/GameContext";
import Activity from "./shared/Activity";
import PlayerContext from "GameEngine/Player/PlayerContext";

export default function TrainingPane() {
  const { trainings } = React.useContext(GameContext);
  const { state } = React.useContext(PlayerContext);

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
