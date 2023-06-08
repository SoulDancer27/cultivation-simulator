import { defaultUpdateInterval } from "GameConstants";
import { exponentialNumber, trivialNumber } from "Utils/parseNumber";
import React from "react";

// Declarations for the React Context type
export type SettingsContextType = {
  tickRate: number;
  gameSpeed: number;
  notation: "exponential" | "trivial";
};

export const settingsContext: SettingsContextType = {
  tickRate: 1000 / defaultUpdateInterval,
  gameSpeed: 1,
  notation: "trivial",
};

/** Context initializator */
export const SettingsContext = React.createContext({
  ...settingsContext,
  updateContext: (newData: Partial<SettingsContextType>) => {},
  setContext: (value: React.SetStateAction<SettingsContextType>) => {},
});

export default SettingsContext;

export function useNumberParser() {
  const { notation } = React.useContext(SettingsContext);
  return (num: number): string => {
    if (notation === "trivial") return trivialNumber(num);
    if (notation === "exponential") return exponentialNumber(num);
    return num.toFixed(2);
  };
}
