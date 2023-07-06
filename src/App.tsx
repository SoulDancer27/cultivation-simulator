import { Box, CssBaseline } from "@mui/material";
import { TopBar } from "Components";
import DataManager from "GameEngine/DataManager";
import GameRuntime from "GameEngine/GameRuntime";
import { store } from "GameEngine/store";

import SettingsPage from "Pages/SettingsPage";
import { useWindowDimensions } from "Utils";
import { getWindowDimensions } from "Utils/useWindowDimensions";
import React from "react";
import { Provider } from "react-redux";

export default function App() {
  // Re-renders page on window size change
  useWindowDimensions();
  const { width, height } = getWindowDimensions();
  // State to open/close settings page
  const [settings, setSettings] = React.useState<boolean>(true);

  return (
    <CssBaseline>
      <Provider store={store}>
        <DataManager>
          <GameRuntime>
            <Box width={width} height={height} overflow="hidden">
              <TopBar setSettings={setSettings} />
              {settings && <SettingsPage setSettings={setSettings} />}
              {!settings && <Box display="flex"></Box>}
            </Box>
          </GameRuntime>
        </DataManager>
      </Provider>
    </CssBaseline>
  );
}
