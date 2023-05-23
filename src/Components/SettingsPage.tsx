import { Box, Paper, Slider, Typography, useTheme } from "@mui/material";
import getSpacing from "Utils/getSpacing";
import { getWindowDimensions } from "Utils/useWindowDimensions";
import TickRate from "./SettingsPage/TickRate";
import GameSpeed from "./SettingsPage/GameSpeed";
import ExportSave from "./SettingsPage/ExportSave";
import ImportSave from "./SettingsPage/ImportSave";
import WipeSave from "./SettingsPage/WipeSave";

export default function SettingsPage() {
  const theme = useTheme();
  const { width, height } = getWindowDimensions();

  return (
    <Paper>
      <Box
        position="absolute"
        width={width}
        height={height - getSpacing(theme, 8)}
        top={getSpacing(theme, 8)}
        left={0}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={2}
        paddingTop={2}
      >
        <Typography variant="h4">Settings</Typography>
        <TickRate />
        <GameSpeed />
        <Box display="flex" flexDirection={"column"}>
          <Typography variant="h6">Save Manager</Typography>
        </Box>
        <Box display="flex" gap={2}>
          <ExportSave />
          <ImportSave />
          <WipeSave />
        </Box>
      </Box>
    </Paper>
  );
}
