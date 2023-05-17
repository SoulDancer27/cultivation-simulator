import { Box, Typography } from "@mui/material";
import { usePlayerState } from "GameEngine/Player/PlayerContext";
import React from "react";
import MiningPanel from "./MiningPage/MiningPanel";
import { useGameState } from "GameEngine/GameContext/GameContext";

export default function MiningPage() {
  const { mining } = useGameState();
  const { state } = usePlayerState();
  // Determine active action if any
  const { action, activity } = state;
  let activityName = "";
  if (action === "activity" && activity) {
    activityName = activity.name;
  }
  return (
    <Box paddingLeft={2} paddingTop={2}>
      <Typography variant="h5">Mine</Typography>
      <Box display="flex" flexWrap={"wrap"}>
        {mining.map((action) => (
          <MiningPanel
            activity={action}
            isActive={activityName === action.name}
            showTimesCompleted
            source="mining"
            key={action.name}
          />
        ))}
      </Box>
    </Box>
  );
}
