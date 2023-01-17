import { Box, Paper, Typography, useTheme } from "@mui/material";
import { yearSpan, monthSpan } from "GameConstants/Constants";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";

export default function TopBar() {
  const theme = useTheme();
  const { stats, realm } = React.useContext(PlayerContext);
  return (
    <Paper elevation={8}>
      <Box height={theme.spacing(8)} width="100vw">
        <Typography variant="h5">Age: {parsePlayerAge(stats.age)}</Typography>
        <Typography variant="h5">Realm: {realm.name}</Typography>
      </Box>
    </Paper>
  );
}

function parsePlayerAge(age: number): string {
  const years = Math.floor(age / yearSpan);
  // Just in case to not overflow 12 due to rounding
  const months = Math.min(Math.floor((age - years * yearSpan) / monthSpan), 12);
  return `${years} years ${months} months`;
}
