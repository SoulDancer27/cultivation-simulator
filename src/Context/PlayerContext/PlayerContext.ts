import React from "react";
import { PlayerContextType } from "GameConstants/Player";
import { yearSpan } from "GameConstants/Constants";

export const playerContext: PlayerContextType = {
  stats: {
    // just set at 10 years
    age: yearSpan * 10,
    health: 10,
    currentHealth: 10,
    healthRegen: 0.5,
    defence: 0,
    attack: 1,
  },
  realm: {
    name: "Mortal 0",
    power: {},
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
