import { Box, ThemeProvider } from "@mui/material";
import LightTheme from "Themes/LightTheme";
import React from "react";
import PlayerContextLoader from "Context/PlayerContextLoader";
import GameContextLoader from "Context/GameContextLoader";
import PlayerStatsPane from "Components/PlayerStatsPane";
import TrainingPane from "Components/TrainingPane";
import EnemyPane from "Components/EnemyPane";
import RealmBreakthroughPane from "Components/RealmBreakthroughPane";

export default function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <PlayerContextLoader>
        <GameContextLoader>
          <Box display="flex">
            <Box marginRight={10}>
              <PlayerStatsPane />
              <TrainingPane />
              <EnemyPane />
            </Box>
            <RealmBreakthroughPane />
          </Box>
        </GameContextLoader>
      </PlayerContextLoader>
    </ThemeProvider>
  );
}
