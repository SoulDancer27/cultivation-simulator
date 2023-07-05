import { Box } from "@mui/material";
import DataManager from "GameEngine/DataManager";
import { store } from "GameEngine/store";

import SettingsPage from "Pages/SettingsPage";
import React from "react";
import { Provider } from "react-redux";

export default function App() {
  const [settings, setSettings] = React.useState<boolean>(true);
  return (
    <Provider store={store}>
      <DataManager>
        <Box>
          <SettingsPage setSettings={setSettings} />
        </Box>
      </DataManager>
    </Provider>
  );
}
