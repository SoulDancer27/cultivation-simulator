import { year } from "GameConstants/Constants";
import { CultivationManuals } from "GameConstants/Cultivation/CultivationManuals";
import { PlayerContextType } from "GameConstants/Interfaces";
import { baseStats, playerSkills } from "GameConstants/Player";
import React from "react";

// Some placeholder values to fill in the player object on first launch
export const playerContext: PlayerContextType = {
  stats: {
    age: year * 10,
    currentHealth: 10,
    ...baseStats,
  },
  baseStats,
  skills: playerSkills,
  baseSkills: playerSkills,
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
