import { Box, Button, Paper, useTheme } from "@mui/material";
import { ActivePane } from "App";
import { getWindowDimensions } from "Utils/useWindowDimensions";

type Props = {
  pane: ActivePane;
  setPane: React.Dispatch<React.SetStateAction<ActivePane>>;
};

export default function MainNavigationBar(props: Props) {
  const { pane, setPane } = props;
  const { width } = getWindowDimensions();
  const theme = useTheme();
  return (
    <Paper elevation={2}>
      <Box width={width - 512}>
        <Button
          variant="outlined"
          size="large"
          color={pane === "actions" ? "success" : "primary"}
          onClick={() => setPane("actions")}
          sx={{ margin: theme.spacing(2) }}
        >
          Actions
        </Button>
        <Button
          variant="outlined"
          size="large"
          color={pane === "manuals" ? "success" : "primary"}
          onClick={() => setPane("manuals")}
          sx={{ margin: theme.spacing(2), marginLeft: theme.spacing(1) }}
        >
          Manuals
        </Button>
      </Box>
    </Paper>
  );
}
