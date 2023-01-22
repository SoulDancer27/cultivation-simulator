import { Box, Button, Paper, useTheme } from "@mui/material";
import { ActivePane } from "App";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import getSpacing from "Utils/getSpacing";
import { getWindowDimensions } from "Utils/useWindowDimensions";
import ActionsPane from "./ActionsPane";
import ManualsPane from "./ManualsPane";

export default function MainNavigationBar() {
  const { width, height } = getWindowDimensions();
  const theme = useTheme();
  const { state } = React.useContext(PlayerContext);
  let startingPane: ActivePane = "actions";
  if (state.action === "cultivating") startingPane = "manuals";
  const [pane, setPane] = React.useState<ActivePane>(startingPane);
  return (
    <Box width={width - 512} height={height - getSpacing(theme, 8)}>
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
      {pane === "actions" ? <ActionsPane /> : ""}
      {pane === "manuals" ? <ManualsPane /> : ""}
    </Box>
  );
}
