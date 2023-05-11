import { Box, Typography } from "@mui/material";
import GameContext from "GameEngine/GameContext/GameContext";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import Activity from "./shared/Activity";

export default function CraftingPane() {
  const { crafting } = React.useContext(GameContext);
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
        {crafting.map((recipe) => (
          <Activity
            activity={recipe}
            isActive={activityName === recipe.name}
            showTimesCompleted
            source="crafting"
            key={recipe.name}
          />
        ))}
      </Box>
    </Box>
  );
}
