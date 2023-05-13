import { Box, Button, Paper, useTheme } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import getSpacing from "Utils/getSpacing";
import { getWindowDimensions } from "Utils/useWindowDimensions";
import ManualsPage from "./Pages/ManualsPage";
import RealmBreakthroughPage from "./Pages/RealmBreakthroughPage";
import GameContext from "GameEngine/GameContext/GameContext";
import breakthroughSuccess from "./Pages/RealmBreakthroughPage/breakthroughSuccess";
import MiningPage from "./Pages/MiningPage";
import CraftingPage from "./Pages/CraftingPage";
import TrainingPage from "./Pages/TrainingPage";

export type ActivePane =
  | "training"
  | "manuals"
  | "breakthrough"
  | "mining"
  | "crafting";

// Switches between different pages
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
  let startingPane: ActivePane = "training";
  if (state.action === "cultivating") startingPane = "manuals";
  const [pane, setPane] = React.useState<ActivePane>(startingPane);
  return (
    <Box width={width - 512} height={height - getSpacing(theme, 8)}>
      <Paper elevation={2}>
        <Box width={width - 512}>
          <Button
            variant="outlined"
            size="large"
            color={pane === "training" ? "success" : "primary"}
            onClick={() => setPane("training")}
            sx={{ margin: theme.spacing(2) }}
          >
            Training
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
            color={pane === "mining" ? "success" : "primary"}
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
      {pane === "training" ? <TrainingPage /> : ""}
      {pane === "manuals" ? <ManualsPage /> : ""}
      {pane === "breakthrough" ? <RealmBreakthroughPage /> : ""}
      {pane === "mining" ? <MiningPage /> : ""}
      {pane === "crafting" ? <CraftingPage /> : ""}
    </Box>
  );
}
