import { Box } from "@mui/material";
import SettingsPage from "Pages/SettingsPage";
import store from "engine/store";
import React from "react";
import { Provider } from "react-redux";

/**
 *
 * @returns Main application
 */
export default function App() {
  const [settings, setSettings] = React.useState<boolean>(true);
  return (
    <Provider store={store}>
      <Box>
        <SettingsPage setSettings={setSettings} />
      </Box>
    </Provider>
  );
}
