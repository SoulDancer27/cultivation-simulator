import { Activity } from "GameConstants/Activities";
import {
  CultivationRealm,
  CultivationRealms,
} from "GameConstants/CultivationRealms";
import Trainings from "GameConstants/Trainings";
import Mining from "GameConstants/Mining";
import React from "react";
import Crafting from "GameConstants/Craft";

export type GameContextType = {
  trainings: Activity[];
  mining: Activity[];
  crafting: Activity[];
  cultivationRealms: CultivationRealm[];
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
