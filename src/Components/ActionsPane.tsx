import { Box, Typography, useTheme } from "@mui/material";
import TrainingPane from "./TrainingPane";

export default function ActionsPane() {
  const theme = useTheme();
  return (
    <Box paddingLeft={theme.spacing(2)} paddingTop={theme.spacing(2)}>
      <Typography variant="h3">Actions</Typography>
      <TrainingPane />
    </Box>
  );
}
