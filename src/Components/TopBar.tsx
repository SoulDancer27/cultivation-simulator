import { Box, Paper, Typography, useTheme } from "@mui/material";
import { month, year } from "GameConstants/Constants";
import { useGameState } from "GameEngine/GameContext/GameContext";
import { usePlayerState } from "GameEngine/Player/PlayerContext";
import React from "react";

// Top bar with some game stats and values
export default function TopBar() {
  const theme = useTheme();
  const { stats, realm } = usePlayerState();
  const { cultivationRealms } = useGameState();
  return (
    <Paper elevation={8}>
      <Box height={theme.spacing(8)} width="100vw">
        <Typography variant="h5">Age: {parseAge(stats.age)}</Typography>
        <Typography variant="h5">
          Realm: {cultivationRealms[realm.index].name}
        </Typography>
      </Box>
    </Paper>
  );
}
function parseAge(time: number): string {
  const years = Math.floor(time / year);
  // Just in case to not overflow 12 due to rounding
  const months = Math.min(Math.floor((time - years * year) / month), 12);
  return `${years} years ${months} months`;
}
