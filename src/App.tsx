import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import LightTheme from "Themes/LightTheme";

import SaveLoader from "GameEngine/PlayerLoader";
import GameRuntime from "GameEngine/GameRuntime";
import TopBar from "Components/TopBar";
import useWindowDimensions, {
  getWindowDimensions,
} from "Utils/useWindowDimensions";
import MainNavigationBar from "Components/MainNavigationBar";
import WorldLoader from "GameEngine/WorldLoader";
import LeftSideBar from "Components/LeftSideBar";

export default function App() {
  // Re-render page on innerWidth and innerHeight change
  useWindowDimensions();
  const { width, height } = getWindowDimensions();

  return (
    <CssBaseline>
      <ThemeProvider theme={LightTheme}>
        <SaveLoader>
          <WorldLoader>
            <GameRuntime>
              <Box width={width} height={height} overflow="hidden">
                <TopBar />

                <Box display="flex">
                  <LeftSideBar />
                  <MainNavigationBar />
                </Box>
              </Box>
            </GameRuntime>
          </WorldLoader>
        </SaveLoader>
      </ThemeProvider>
    </CssBaseline>
  );
}
