import { Box, Typography, useTheme } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import SkillDetailsTooltip from "./Skills/SkillDetailTooltip";
import { getStatName } from "GameEngine/Player/PlayerStatsDictionary";
import { useNumberParser } from "GameEngine/SettingsContext/SettingContext";

// Bad coding here. #todo: make it a .map() render
export default function Skills() {
  const { skills } = React.useContext(PlayerContext);
  const parse = useNumberParser();
  const theme = useTheme();

  let description: Array<JSX.Element> = [];
  for (const [key, value] of Object.entries(skills)) {
    description.push(
      <SkillDetailsTooltip skill={key} key={key}>
        <Typography key={key}>
          {getStatName(key)}: {parse(value)}
        </Typography>
      </SkillDetailsTooltip>
    );
  }

  return (
    <Box paddingTop={theme.spacing(1)} paddingLeft={theme.spacing(1)}>
      {description}
    </Box>
  );
}
