import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import LightTheme from "Themes/LightTheme";

import PlayerStatsPane from "Components/PlayerStatsPane";
import SaveLoader from "GameEngine/SaveLoader";
import GameRuntime from "GameEngine/GameRuntime";
import TopBar from "Components/TopBar";
import useWindowDimensions, {
  getWindowDimensions,
} from "Utils/useWindowDimensions";
import PlayerLocationPane from "Components/PlayerLocationPane";
import PlayerStatsLayout from "Components/PlayerStatsLayout";
import MainNavigationBar from "Components/MainNavigationBar";

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
                <Box borderRight={"1px solid gray"}>
                  <PlayerStatsPane />
                  <PlayerStatsLayout />
                  <PlayerLocationPane />
                </Box>

                <MainNavigationBar />
              </Box>
            </Box>
          </GameRuntime>
        </SaveLoader>
      </ThemeProvider>
    </CssBaseline>
  );
}

export type ActivePane = "actions" | "manuals";
