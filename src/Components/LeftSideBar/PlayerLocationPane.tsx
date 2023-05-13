import { Box, Typography, useTheme } from "@mui/material";
import Villages from "GameConstants/Villages";
import getSpacing from "Utils/getSpacing";

// Just a placeholder for now
export default function PlayerLocationPane() {
  const theme = useTheme();
  const location = Villages[0];
  const src = "/locations/" + location.imagePath;
  return (
    <Box height={theme.spacing(16)} padding={theme.spacing(1)} width={512}>
      <Typography variant="h5">Current Location</Typography>
      <Box display="flex">
        <img
          src={src}
          alt=""
          height={theme.spacing(12)}
          width={theme.spacing(12)}
        ></img>
        <Box width={512 - getSpacing(theme, 12)} paddingLeft={theme.spacing(1)}>
          <Typography variant="h6">{location.name}</Typography>
          <Typography variant="body1">{location.description}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
