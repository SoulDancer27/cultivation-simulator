import React from "react";
import { PlayerContextType } from "GameConstants/Player";
import { year } from "GameConstants/Constants";
import { CultivationManuals } from "GameConstants/CultivationManuals";

export const playerContext: PlayerContextType = {
  stats: {
    age: year * 10,
    currentHealth: 10,
    health: 10,
    healthRegen: 0.5,
    defence: 0,
    attack: 1,
    insight: 1,
  },
  baseStats: {
    attack: 1,
    health: 10,
    healthRegen: 0.5,
    defence: 0,
    insight: 1,
  },
  skills: {
    training: 0,
    mining: 0,
  },
  baseSkills: {
    training: 0,
    mining: 0,
  },
  realm: {
    index: 0,
    power: {},
  },
  manuals: CultivationManuals.map((manual) => ({
    manual,
    learningProgress: { exp: 0, level: 0 },
    isEquipped: false,
  })),
  inventory: [],
  state: { action: "idle" },
};

/** Context initializator */
export const PlayerContext = React.createContext({
  ...playerContext,
  updateContext: (newData: Partial<PlayerContextType>) => {},
  setContext: (value: React.SetStateAction<PlayerContextType>) => {},
});

export default PlayerContext;
