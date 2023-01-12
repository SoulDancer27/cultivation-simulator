import { Box, ThemeProvider } from "@mui/material";
import LightTheme from "Themes/LightTheme";
import React from "react";

import PlayerStatsPane from "Components/PlayerStatsPane";
import TrainingPane from "Components/TrainingPane";
import EnemyPane from "Components/EnemyPane";
import RealmBreakthroughPane from "Components/RealmBreakthroughPane";
import SaveLoader from "GameEngine/SaveLoader";
import GameRuntime from "GameEngine/GameRuntime";

export default function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <SaveLoader>
        <GameRuntime>
          <Box display="flex">
            <Box marginRight={10}>
              <PlayerStatsPane />
              <TrainingPane />
              <EnemyPane />
            </Box>
            <RealmBreakthroughPane />
          </Box>
        </GameRuntime>
      </SaveLoader>
    </ThemeProvider>
  );
}
