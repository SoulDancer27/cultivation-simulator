import React from "react";
import { TrainingType } from "Variables/Trainings";

export type PlayerAction = "idle" | "training";

export type PlayerState = { action: PlayerAction; training?: TrainingType };

export type PlayerStats = {
  age: number;
  health: number;
  defence: number;
  attack: number;
};

export type PlayerContextType = {
  stats: PlayerStats;
  state: PlayerState;
};

export const playerContext: PlayerContextType = {
  stats: {
    // just set at 10 years
    age: (3600000 / 70) * 10,
    health: 10,
    defence: 0,
    attack: 1,
  },
  state: { action: "idle" },
};

/** Context initializator */
export const PlayerContext = React.createContext({
  ...playerContext,
  updateContext: (newData: Partial<PlayerContextType>) => {},
  setContext: (value: React.SetStateAction<PlayerContextType>) => {},
});

export default PlayerContext;
