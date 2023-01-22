import { Box, Typography, useTheme } from "@mui/material";
import getSpacing from "Utils/getSpacing";
import { getWindowDimensions } from "Utils/useWindowDimensions";
import ActiveManual from "./CultivationPane/ActiveManual";
import EquippedManuals from "./CultivationPane/EquippedManuals";
import ManualsList from "./CultivationPane/ManualsList";

export default function ManualsPanel() {
  const theme = useTheme();
  const { height } = getWindowDimensions();
  return (
    <Box
      marginLeft={theme.spacing(2)}
      marginTop={theme.spacing(2)}
      height={height - getSpacing(theme, 20)}
      overflow="auto"
    >
      <Typography variant="h5" marginBottom={theme.spacing(2)}>
        Studying Manual
      </Typography>
      <ActiveManual />
      <EquippedManuals />
      <ManualsList />
    </Box>
  );
}
