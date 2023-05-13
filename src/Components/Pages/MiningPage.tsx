import { Box, Typography } from "@mui/material";
import GameContext from "GameEngine/GameContext/GameContext";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import MiningPanel from "./MiningPage/MiningPanel";

export default function MiningPage() {
  const { mining } = React.useContext(GameContext);
  const { state } = React.useContext(PlayerContext);
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
