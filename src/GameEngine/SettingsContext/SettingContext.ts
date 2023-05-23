import { defaultUpdateInterval } from "GameConstants/Constants";
import React from "react";

// Declarations for the React Context type
export type SettingsContextType = {
  tickRate: number;
  gameSpeed: number;
};

export const settingsContext: SettingsContextType = {
  tickRate: 1000 / defaultUpdateInterval,
  gameSpeed: 1,
};

/** Context initializator */
export const SettingsContext = React.createContext({
  ...settingsContext,
  updateContext: (newData: Partial<SettingsContextType>) => {},
  setContext: (value: React.SetStateAction<SettingsContextType>) => {},
});

export default SettingsContext;
