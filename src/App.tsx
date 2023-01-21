import { Box, CssBaseline, ThemeProvider, useTheme } from "@mui/material";
import LightTheme from "Themes/LightTheme";

import PlayerStatsPane from "Components/PlayerStatsPane";
import SaveLoader from "GameEngine/SaveLoader";
import GameRuntime from "GameEngine/GameRuntime";
import TopBar from "Components/TopBar";
import useWindowDimensions, {
  getWindowDimensions,
} from "Utils/useWindowDimensions";
import PlayerLocationPane from "Components/PlayerLocationPane";
import getSpacing from "Utils/getSpacing";
import ActionsPane from "Components/ActionsPane";
import PlayerStatsLayout from "Components/PlayerStatsLayout";

export default function App() {
  // Re-render page on innerWidth and innerHeight change
  useWindowDimensions();
  const { width, height } = getWindowDimensions();
  const theme = useTheme();
  return (
    <CssBaseline>
      <ThemeProvider theme={LightTheme}>
        <SaveLoader>
          <GameRuntime>
            <Box width={width} height={height} overflow="hidden">
              <TopBar />

              <Box display="flex">
                <Box borderRight={"1px solid gray"}>
                  <PlayerStatsPane />
                  <PlayerStatsLayout />
                  <PlayerLocationPane />
                </Box>
                <Box width={width - 512} height={height - getSpacing(theme, 8)}>
                  <ActionsPane />
                </Box>

                {/*
                <TrainingPane />
                <EnemyPane />
                <RealmBreakthroughPane />
                <CultivationPane />
                <TreasuresList />
                <Inventory />

  */}
              </Box>
            </Box>
          </GameRuntime>
        </SaveLoader>
      </ThemeProvider>
    </CssBaseline>
  );
}
