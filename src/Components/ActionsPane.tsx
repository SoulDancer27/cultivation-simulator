import { Box, Typography, useTheme } from "@mui/material";
import ActivityPane from "./ActivityPane";
import TrainingPane from "./TrainingPane";

export default function ActionsPane() {
  const theme = useTheme();
  return (
    <Box paddingLeft={theme.spacing(2)} paddingTop={theme.spacing(2)}>
      <Typography variant="h5">Village</Typography>
      <ActivityPane />
    </Box>
  );
}
