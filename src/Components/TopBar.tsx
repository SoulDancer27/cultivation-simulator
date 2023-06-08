import { Box, Paper, Typography, useTheme } from "@mui/material";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import React from "react";
import { getWindowDimensions } from "Utils/useWindowDimensions";
import { PlayerContext, GameContext, SettingsContext } from "GameEngine";
import { year, month } from "GameConstants";

type Props = {
  setSettings: React.Dispatch<React.SetStateAction<boolean>>;
};

// Top bar with some game stats and values
export default function TopBar(props: Props) {
  const theme = useTheme();
  const { stats, realm } = React.useContext(PlayerContext);
  const { cultivationRealms } = React.useContext(GameContext);
  const { gameSpeed } = React.useContext(SettingsContext);

  const { width, height } = getWindowDimensions();
  return (
    <>
      <Paper elevation={8}>
        <Box
          height={theme.spacing(8)}
          width={width}
          display="flex"
          alignItems={"center"}
          gap={2}
          paddingX={2}
        >
          <Box>
            <Typography variant="h5">Age: {parseAge(stats.age)}</Typography>
            <Typography variant="h5">
              Realm: {cultivationRealms[realm.index].name}
            </Typography>
          </Box>

          <Box marginLeft="auto" display="flex" alignItems={"center"} gap={1}>
            <Typography>Game Speed: x{gameSpeed}</Typography>
            <SettingsOutlinedIcon
              fontSize="large"
              onClick={() => props.setSettings((settings) => !settings)}
            />
          </Box>
        </Box>
      </Paper>
    </>
  );
}
function parseAge(time: number): string {
  const years = Math.floor(time / year);
  // Just in case to not overflow 12 due to rounding
  const months = Math.min(Math.floor((time - years * year) / month), 12);
  return `${years} years ${months} months`;
}
