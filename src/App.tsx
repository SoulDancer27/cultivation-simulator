import { Box, CssBaseline, ThemeProvider, useTheme } from "@mui/material";
import LightTheme from "Themes/LightTheme";
import GameRuntime from "GameEngine/GameRuntime";
import TopBar from "Components/TopBar";
import useWindowDimensions, {
  getWindowDimensions,
} from "Utils/useWindowDimensions";
import LeftSideBar from "Components/LeftSideBar";
import React from "react";
import {
  ContextManagerProps,
  RuntimeContextDict,
  SettingsPage,
} from "@SoulDancer27/idle-rpg-lib";
import { MainWindow, states } from "Components/shared/useComponentSelector";
import {
  DataManager,
  SettingsContext,
  settingsContextDefault,
  GameRuntime as Test,
  useAgeManager,
} from "@SoulDancer27/idle-rpg-lib";
import PlayerContext, { playerContext } from "GameEngine/Player/PlayerContext";
import { GameContext } from "GameEngine";

import { gameContent } from "GameConstants/GameContent";
import { PlayerContextType } from "GameConstants/Interfaces";

export default function App() {
  // Re-render page on innerWidth and innerHeight change
  useWindowDimensions();
  const { width, height } = getWindowDimensions();
  const [settings, setSettings] = React.useState<boolean>(false);

  return (
    <CssBaseline>
      <ThemeProvider theme={LightTheme}>
        <DataManager data={appData}>
          <GameRuntime>
            <Box width={width} height={height} overflow="hidden">
              <TopBar setSettings={setSettings} />
              {settings && (
                <SettingsPage setOpened={setSettings} data={appData} />
              )}
              {!settings && (
                <Box display="flex">
                  <LeftSideBar />
                  <MainWindow states={states} />
                </Box>
              )}
            </Box>
          </GameRuntime>
        </DataManager>
      </ThemeProvider>
    </CssBaseline>
  );
}

const managers = [
  { hook: useAgeManager, context: { PlayerContext: PlayerContext } },
];

const appData: ContextManagerProps<any>[] = [
  {
    Context: SettingsContext,
    defaultContextValue: settingsContextDefault,
    cookies: [
      {
        key: "tickRate",
        cookieName: "tickrate",
        type: "number",
      },
      { key: "gameSpeed", cookieName: "gamespeed", type: "number" },
      { key: "notation", cookieName: "notation" },
    ],
  },
  {
    Context: PlayerContext,
    defaultContextValue: playerContext,
    localStorageName: "player",
  },
  {
    Context: GameContext,
    defaultContextValue: gameContent,
    localStorageName: "game",
  },
];
