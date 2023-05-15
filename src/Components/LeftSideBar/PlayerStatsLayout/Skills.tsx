import { Box, Typography } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import SkillDetailsTooltip from "./Skills/SkillDetailTooltip";
import { getStatName } from "GameEngine/Player/PlayerStatsDictionary";

// Bad coding here. #todo: make it a .map() render
export default function Skills() {
  const { skills } = React.useContext(PlayerContext);

  let description: Array<JSX.Element> = [];
  for (const [key, value] of Object.entries(skills)) {
    description.push(
      <SkillDetailsTooltip skill={key} key={key}>
        <Typography key={key}>
          {getStatName(key)}: {value.toFixed(2)}
        </Typography>
      </SkillDetailsTooltip>
    );
  }

  return <Box>{description}</Box>;
}
