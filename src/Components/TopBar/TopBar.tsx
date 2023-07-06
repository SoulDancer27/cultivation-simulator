import { Box, Paper, Typography, useTheme } from "@mui/material";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { month, year } from "GameConstants/Constants";
import { useAppSelector } from "GameEngine/store";
import { selectGameSpeed } from "GameEngine/store/features/settingsSlice";
import { getWindowDimensions } from "Utils/useWindowDimensions";
import React from "react";

type Props = {
  setSettings: React.Dispatch<React.SetStateAction<boolean>>;
};

// Top bar with some game stats and values
export default function TopBar(props: Props) {
  const theme = useTheme();
  const gameSpeed = useAppSelector(selectGameSpeed);
  const age = useAppSelector((state) => state.player.age);

  const { width } = getWindowDimensions();

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
            <Typography variant="h5">Age: {parseAge(age)}</Typography>
          </Box>

          <Box marginLeft="auto" display="flex" alignItems={"center"} gap={1}>
            <Box display="flex" flexDirection={"column"}>
              <Typography>Game Speed: x{gameSpeed}</Typography>
            </Box>

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
