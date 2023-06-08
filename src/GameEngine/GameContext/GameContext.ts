import { GameContent, gameContent } from "GameConstants";
import React from "react";

// Declarations for the React Context type
// Contains game data. Is stored to localStorage every autosave interval.
export type GameContextType = GameContent;

export const gameContext: GameContextType = gameContent;

/** Context initializator */
export const GameContext = React.createContext({
  ...gameContext,
  updateContext: (newData: Partial<GameContextType>) => {},
  setContext: (value: React.SetStateAction<GameContextType>) => {},
});

export default GameContext;
