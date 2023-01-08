import { ThemeProvider } from "@mui/material";
import LightTheme from "Themes/LightTheme";
import React from "react";
import PlayerContextLoader from "Context/PlayerContextLoader";
import GameContextLoader from "Context/GameContextLoader";
import PlayerStatsPane from "Components/PlayerStatsPane";
import TrainingPane from "Components/TrainingPane";

export default function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <PlayerContextLoader>
        <GameContextLoader>
          <PlayerStatsPane />
          <TrainingPane />
        </GameContextLoader>
      </PlayerContextLoader>
    </ThemeProvider>
  );
}
