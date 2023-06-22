import { year } from "GameConstants/Constants";
import { CultivationManuals } from "GameConstants/Items/CultivationManuals";
import { PlayerContextType } from "GameConstants/Interfaces";
import { baseStats, currentStats, playerSkills } from "GameConstants/Player";
import React from "react";
import { Inventory } from "@SoulDancer27/idle-rpg-lib";

export const CountableItems = ["money", "mineral", "herb"];
export const UniqueItems = ["treasure", "potion"];

// Some placeholder values to fill in the player object on first launch
export const playerContext: PlayerContextType = {
  stats: {
    age: year * 10,
    ...baseStats,
  },
  currentStats: currentStats,
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
  inventory: new Inventory({
    countableItemTypes: CountableItems,
    uniqueItemTypes: UniqueItems,
    items: [],
  }),
  state: { action: "idle" },
};

/** Context initializator */
export const PlayerContext = React.createContext({
  ...playerContext,
  updateContext: (newData: Partial<PlayerContextType>) => {},
  setContext: (value: React.SetStateAction<PlayerContextType>) => {},
});

export default PlayerContext;
