import { Activity } from "GameConstants/Activities";
import {
  CultivationRealm,
  CultivationRealms,
} from "GameConstants/CultivationRealms";
import Trainings from "GameConstants/Trainings";
import React from "react";

export type GameContextType = {
  trainings: Activity[];
  cultivationRealms: CultivationRealm[];
};

export const gameContext: GameContextType = {
  trainings: Trainings,
  cultivationRealms: CultivationRealms,
};

/** Context initializator */
export const GameContext = React.createContext({
  ...gameContext,
  updateContext: (newData: Partial<GameContextType>) => {},
  setContext: (value: React.SetStateAction<GameContextType>) => {},
});

export default GameContext;
