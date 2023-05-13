import { Activity } from "GameConstants/Activities";
import {
  CultivationRealm,
  CultivationRealms,
} from "GameConstants/CultivationRealms";
import Trainings from "GameConstants/Trainings";
import Mining from "GameConstants/Mining";
import React from "react";
import Crafting from "GameConstants/Craft";

// Declarations for the React Context type
// Contains game data. Is stored to localStorage every autosave interval.
export type GameContextType = {
  trainings: Activity[]; // List of available activities for training tab
  mining: Activity[]; // List of available activities for mining tab
  crafting: Activity[]; // List of available activities for crafting tab
  cultivationRealms: CultivationRealm[]; // Player cultivation realms with all tribulations passed and stat modifiers
};

export const gameContext: GameContextType = {
  trainings: Trainings,
  mining: Mining,
  crafting: Crafting,
  cultivationRealms: CultivationRealms,
};

/** Context initializator */
export const GameContext = React.createContext({
  ...gameContext,
  updateContext: (newData: Partial<GameContextType>) => {},
  setContext: (value: React.SetStateAction<GameContextType>) => {},
});

export default GameContext;
