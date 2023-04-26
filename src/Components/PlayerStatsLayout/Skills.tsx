import { Box, Typography } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";

export default function Skills() {
  const { skills } = React.useContext(PlayerContext);
  const { training } = skills;

  return (
    <Box>
      <Typography>Training: {training.toFixed(2)}</Typography>
    </Box>
  );
}
