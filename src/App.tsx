import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import LightTheme from "Themes/LightTheme";

import PlayerStatsPane from "Components/PlayerStatsPane";
import TrainingPane from "Components/TrainingPane";
import EnemyPane from "Components/EnemyPane";
import RealmBreakthroughPane from "Components/RealmBreakthroughPane";
import SaveLoader from "GameEngine/SaveLoader";
import GameRuntime from "GameEngine/GameRuntime";
import CultivationPane from "Components/CultivationPane";
import TreasuresList from "Components/TreasuresList";
import Inventory from "Components/Inventory";

export default function App() {
  return (
    <CssBaseline>
      <ThemeProvider theme={LightTheme}>
        <SaveLoader>
          <GameRuntime>
            <Box
              display="flex"
              bgcolor="rgb(240, 240, 240)"
              width="100vw"
              height="100vh"
            >
              <PlayerStatsPane />

              <TrainingPane />
              <EnemyPane />
              <RealmBreakthroughPane />
              <CultivationPane />
              <TreasuresList />
              <Inventory />
            </Box>
          </GameRuntime>
        </SaveLoader>
      </ThemeProvider>
    </CssBaseline>
  );
}
