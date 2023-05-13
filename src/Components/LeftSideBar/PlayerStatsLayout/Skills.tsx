import { Box, Typography } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import SkillDetailsTooltip from "./Skills/SkillDetailTooltip";

// Bad coding here. #todo: make it a .map() render
export default function Skills() {
  const { skills } = React.useContext(PlayerContext);
  const { training, mining, crafting } = skills;

  return (
    <Box>
      <SkillDetailsTooltip skill="training">
        <Typography>Training: {training.toFixed(2)}</Typography>
      </SkillDetailsTooltip>
      <SkillDetailsTooltip skill="mining">
        <Typography>Mining: {mining.toFixed(2)}</Typography>
      </SkillDetailsTooltip>
      <SkillDetailsTooltip skill="crafting">
        <Typography>Crafting: {crafting.toFixed(2)}</Typography>
      </SkillDetailsTooltip>
    </Box>
  );
}
