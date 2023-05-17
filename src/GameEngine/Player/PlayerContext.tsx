import React, { ReactNode } from "react";
import { baseStats, playerSkills } from "GameConstants/Player";
import { year } from "GameConstants/Constants";
import { CultivationManuals } from "GameConstants/CultivationManuals";
import { PlayerContextType } from "GameConstants/Interfaces";
import { createContainer } from "react-tracked";

// Some placeholder values to fill in the player object on first launch
export const playerState: PlayerContextType = {
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

const useState = () => React.useState(playerState);

export const {
  Provider: PlayerStateProvider,
  useTrackedState: usePlayerState,
  useUpdate: useSetPlayerState,
} = createContainer(useState);
