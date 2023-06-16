import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import getSpacing from "Utils/getSpacing";
import { getWindowDimensions } from "Utils/useWindowDimensions";
import TickRate from "Pages/SettingsPage/TickRate";
import GameSpeed from "Pages/SettingsPage/GameSpeed";
import ExportSave from "Pages/SettingsPage/ExportSave";
import ImportSave from "Pages/SettingsPage/ImportSave";
import WipeSave from "Pages/SettingsPage/WipeSave";
import NumberNotation from "Pages/SettingsPage/NumberNotation";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  setSettings: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SettingsPage(props: Props) {
  const { setSettings } = props;
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
        <Box
          display="flex"
          width={width}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box />
          <Typography variant="h4" sx={{ alignSelf: "center" }}>
            Settings
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setSettings((x) => !x)}
            sx={{ marginRight: 2 }}
          >
            <CloseIcon fontSize="small" />
          </Button>
        </Box>

        <TickRate />
        <GameSpeed />
        <NumberNotation />
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
