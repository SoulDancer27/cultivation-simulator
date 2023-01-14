import React from "react";
import { PlayerContextType } from "GameConstants/Player";
import { yearSpan } from "GameConstants/Constants";
import { CultivationManuals } from "GameConstants/CultivationManuals";

export const playerContext: PlayerContextType = {
  stats: {
    age: yearSpan * 10,
    currentHealth: 10,
    health: 10,
    healthRegen: 0.5,
    defence: 0,
    attack: 1,
    insight: 1,
  },
  baseStats: {
    health: 10,
    healthRegen: 0.5,
    defence: 0,
    attack: 1,
    insight: 1,
  },
  realm: {
    name: "Mortal 0",
    power: {},
  },
  manuals: CultivationManuals.map((manual) => ({
    manual,
    learningProgress: { exp: 0, level: 0 },
    isEquipped: false,
  })),
  state: { action: "idle" },
};

/** Context initializator */
export const PlayerContext = React.createContext({
  ...playerContext,
  updateContext: (newData: Partial<PlayerContextType>) => {},
  setContext: (value: React.SetStateAction<PlayerContextType>) => {},
});

export default PlayerContext;
