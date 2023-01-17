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
import TopBar from "Components/TopBar";
import useWindowDimensions, {
  getWindowDimensions,
} from "Utils/useWindowDimensions";

export default function App() {
  // Re-render page on innerWidth and innerHeight change
  useWindowDimensions();
  const { width, height } = getWindowDimensions();
  return (
    <CssBaseline>
      <ThemeProvider theme={LightTheme}>
        <SaveLoader>
          <GameRuntime>
            <Box width={width} height={height} overflow="hidden">
              <TopBar />

              <Box display="flex">
                <PlayerStatsPane />

                <TrainingPane />
                <EnemyPane />
                <RealmBreakthroughPane />
                <CultivationPane />
                <TreasuresList />
                <Inventory />
              </Box>
            </Box>
          </GameRuntime>
        </SaveLoader>
      </ThemeProvider>
    </CssBaseline>
  );
}
