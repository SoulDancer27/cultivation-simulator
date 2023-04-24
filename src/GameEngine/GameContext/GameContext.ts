import { Activity } from "GameConstants/Activities";
import Trainings from "GameConstants/Trainings";
import React from "react";

export type GameContextType = {
  trainings: Activity[];
};

export const gameContext: GameContextType = {
  trainings: Trainings,
};

/** Context initializator */
export const GameContext = React.createContext({
  ...gameContext,
  updateContext: (newData: Partial<GameContextType>) => {},
  setContext: (value: React.SetStateAction<GameContextType>) => {},
});

export default GameContext;
