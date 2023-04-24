import { Box, Typography } from "@mui/material";
import React from "react";
import GameContext from "GameEngine/GameContext/GameContext";
import Activity from "./shared/Activity";

export default function TrainingPane() {
  const { trainings } = React.useContext(GameContext);
  return (
    <Box>
      <Typography variant="h5">Train</Typography>
      <Box display="flex">
        {trainings.map((training) => (
          <Activity activity={training} isActive={false} />
        ))}
      </Box>
    </Box>
  );
}
