import { Box, Typography, useTheme } from "@mui/material";
import getSpacing from "Utils/getSpacing";
import { getWindowDimensions } from "Utils/useWindowDimensions";
import ActiveManual from "./CultivationPage/ActiveManual";
import EquippedManuals from "./CultivationPage/EquippedManuals";
import ManualsList from "./CultivationPage/ManualsList";

export default function ManualsPage() {
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
