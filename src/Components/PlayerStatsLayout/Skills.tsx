import { Box, Typography } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import SkillDetailsTooltip from "./Skills/SkillDetailTooltip";

export default function Skills() {
  const { skills } = React.useContext(PlayerContext);
  const { training } = skills;
  console.log(training);

  return (
    <Box>
      <SkillDetailsTooltip skill="training">
        <Typography>Training: {training.toFixed(2)}</Typography>
      </SkillDetailsTooltip>
    </Box>
  );
}
