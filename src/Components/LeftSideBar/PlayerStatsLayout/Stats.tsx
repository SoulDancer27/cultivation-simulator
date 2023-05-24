import { Box, Typography, useTheme } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import { getStatName } from "GameEngine/Player/PlayerStatsDictionary";
import { useNumberParser } from "GameEngine/SettingsContext/SettingContext";
import React from "react";

// Player baseStats display
export default function Stats() {
  const { baseStats } = React.useContext(PlayerContext);
  const parse = useNumberParser();
  const theme = useTheme();

  let description: Array<JSX.Element> = [];
  for (const [key, value] of Object.entries(baseStats)) {
    description.push(
      <Typography key={key}>
        {getStatName(key)}: {parse(value)}
      </Typography>
    );
  }

  return (
    <Box paddingTop={theme.spacing(1)} paddingLeft={theme.spacing(1)}>
      <Typography>Base stats</Typography>
      {description}
    </Box>
  );
}
