import { Box, Typography, useTheme } from "@mui/material";
import ActiveManual from "./CultivationPane/ActiveManual";
import EquippedManuals from "./CultivationPane/EquippedManuals";
import ManualsList from "./CultivationPane/ManualsList";

export default function ManualsPanel() {
  const theme = useTheme();
  return (
    <Box marginLeft={theme.spacing(2)} marginTop={theme.spacing(2)}>
      <Typography variant="h5" marginBottom={theme.spacing(2)}>
        Studying Manual
      </Typography>
      <ActiveManual />
      <EquippedManuals />
      <ManualsList />
    </Box>
  );
}
