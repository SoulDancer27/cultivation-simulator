import React from "react";

import { GameContent, gameContent } from "GameConstants/GameContent";
import { createContainer } from "react-tracked";

// Declarations for the React Context type
// Contains game data. Is stored to localStorage every autosave interval.
export type GameContextType = GameContent;

export const gameContext: GameContextType = gameContent;

const useState = () => React.useState(gameContext);

export const {
  Provider: GameStateProvider,
  useTrackedState: useGameState,
  useUpdate: useSetGameState,
} = createContainer(useState);
