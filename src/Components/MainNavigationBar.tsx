import { Box, Button, Paper, useTheme } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import getSpacing from "Utils/getSpacing";
import { getWindowDimensions } from "Utils/useWindowDimensions";
import ActionsPane from "./ActionsPane";
import ManualsPane from "./ManualsPane";
import RealmBreakthroughPane from "./RealmBreakthroughPane";
import GameContext from "GameEngine/GameContext/GameContext";
import breakthroughSuccess from "./RealmBreakthroughPane/breakthroughSuccess";
import MiningPage from "./MiningPage";
import CraftingPane from "./CraftingPane";

export type ActivePane =
  | "actions"
  | "manuals"
  | "breakthrough"
  | "mining"
  | "crafting";

export default function MainNavigationBar() {
  const { width, height } = getWindowDimensions();
  const theme = useTheme();
  const { state, stats, realm } = React.useContext(PlayerContext);
  const { cultivationRealms } = React.useContext(GameContext);
  // For the button color
  const canBreakthrough = breakthroughSuccess(
    stats,
    cultivationRealms[realm.index + 1]
  );
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
          <Button
            variant="outlined"
            size="large"
            color={
              pane === "breakthrough"
                ? "success"
                : canBreakthrough
                ? "warning"
                : "primary"
            }
            onClick={() => setPane("breakthrough")}
            sx={{ margin: theme.spacing(2) }}
          >
            Breakthrough
          </Button>
          <Button
            variant="outlined"
            size="large"
            color={pane === "manuals" ? "success" : "primary"}
            onClick={() => setPane("mining")}
            sx={{ margin: theme.spacing(2) }}
          >
            Mining
          </Button>
          <Button
            variant="outlined"
            size="large"
            color={pane === "crafting" ? "success" : "primary"}
            onClick={() => setPane("crafting")}
            sx={{ margin: theme.spacing(2) }}
          >
            Crafting
          </Button>
        </Box>
      </Paper>
      {pane === "actions" ? <ActionsPane /> : ""}
      {pane === "manuals" ? <ManualsPane /> : ""}
      {pane === "breakthrough" ? <RealmBreakthroughPane /> : ""}
      {pane === "mining" ? <MiningPage /> : ""}
      {pane === "crafting" ? <CraftingPane /> : ""}
    </Box>
  );
}
