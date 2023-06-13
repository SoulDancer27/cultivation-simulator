import { PlayerContextType } from "../Interfaces";
import { PlayerBaseStats } from "../Player";

//___________________________________________________________________
// You can change breakthrough logic and Cultivation Realm stats here
//___________________________________________________________________

export function TribulationDps(
  realm: TribulationStats,
  player: PlayerContextType
) {
  return (
    realm.attack / (1 + 0.01 * player.stats.defence) - player.stats.healthRegen
  );
}

export function BreakthroughDps(
  player: PlayerContextType,
  realm: TribulationStats
) {
  return player.stats.attack / (1 + 0.01 * realm.defence) - realm.healthRegen;
}

export type Tribulation = {
  steps: number;
  multiplier: number;
  statsMulti: number;
  stepReached?: number;
};

export type TribulationStats = {
  health: number;
  healthRegen: number;
  attack: number;
  defence: number;
};

export type CultivationRealm = {
  name: string;
  baseStats: TribulationStats;
  currentStats?: TribulationStats & { currentHealth: number }; // currentHealth is for progress tracking
  // Additional stats for heavenly tribulations
  tribulation?: Tribulation;
  // Reward stats multipliers
  realmPowers: Partial<PlayerBaseStats>;
};

// Some placeholder content
export const CultivationRealms: CultivationRealm[] = [
  {
    name: "Mortal 1",
    baseStats: {
      health: 0,
      healthRegen: 0,
      defence: 0,
      attack: 0,
    },
    realmPowers: {
      health: 1,
      healthRegen: 1,
      attack: 1,
      defence: 1,
      insight: 1,
    },
  },
  {
    name: "Mortal 2",
    baseStats: {
      health: 100,
      healthRegen: 0,
      defence: 0,
      attack: 3,
    },
    realmPowers: {
      health: 1.2,
      healthRegen: 1.2,
      attack: 1.2,
      insight: 1.2,
    },
  },
  {
    name: "Mortal 3",
    baseStats: {
      health: 150,
      healthRegen: 0,
      defence: 0,
      attack: 4.5,
    },
    realmPowers: {
      health: 1.44,
      healthRegen: 1.44,
      attack: 1.44,
      insight: 1.44,
    },
  },
  {
    name: "Mortal 4",
    baseStats: {
      health: 225,
      healthRegen: 0,
      defence: 0,
      attack: 6.5,
    },
    realmPowers: {
      health: 1.73,
      healthRegen: 1.73,
      attack: 1.73,
      insight: 1.73,
    },
  },
  {
    name: "Mortal 5",
    baseStats: {
      health: 350,
      healthRegen: 0,
      defence: 0,
      attack: 10,
    },
    realmPowers: {
      health: 2.08,
      healthRegen: 2.08,
      attack: 2.08,
      insight: 2.08,
    },
  },
  {
    name: "Mortal 6",
    baseStats: {
      health: 500,
      healthRegen: 0,
      defence: 0,
      attack: 15,
    },
    realmPowers: {
      health: 2.49,
      healthRegen: 2.49,
      attack: 2.49,
      insight: 2.49,
    },
  },
  {
    name: "Mortal 7",
    baseStats: {
      health: 750,
      healthRegen: 0,
      defence: 0,
      attack: 22.5,
    },
    realmPowers: {
      health: 3,
      healthRegen: 3,
      attack: 3,
      insight: 3,
    },
  },
  {
    name: "Mortal 8",
    baseStats: {
      health: 1100,
      healthRegen: 0,
      defence: 0,
      attack: 34,
    },
    realmPowers: {
      health: 3.58,
      healthRegen: 3.58,
      attack: 3.58,
      insight: 3.58,
    },
  },
  {
    name: "Mortal 9",
    baseStats: {
      health: 1700,
      healthRegen: 0,
      defence: 0,
      attack: 50,
    },
    realmPowers: {
      health: 4.3,
      healthRegen: 4.3,
      attack: 4.3,
      insight: 4.3,
    },
  },
  {
    name: "Body Refinement 1",
    baseStats: {
      health: 2500,
      healthRegen: 0,
      defence: 0,
      attack: 75,
    },
    realmPowers: {
      health: 5.17,
      healthRegen: 5.17,
      attack: 5.17,
      insight: 5.17,
    },
    tribulation: {
      steps: 10,
      statsMulti: 1.05,
      multiplier: 1.1,
    },
  },
  {
    name: "Body Refinement 2",
    baseStats: {
      health: 3750,
      healthRegen: 0,
      defence: 0,
      attack: 110,
    },
    realmPowers: {
      health: 6.19,
      healthRegen: 6.19,
      attack: 6.19,
      insight: 6.19,
    },
  },
  {
    name: "Body Refinement 3",
    baseStats: {
      health: 5500,
      healthRegen: 0,
      defence: 0,
      attack: 165,
    },
    realmPowers: {
      health: 7.44,
      healthRegen: 7.44,
      attack: 7.44,
      insight: 7.44,
    },
  },
  {
    name: "Body Refinement 4",
    baseStats: {
      health: 8500,
      healthRegen: 0,
      defence: 0,
      attack: 250,
    },
    realmPowers: {
      health: 8.93,
      healthRegen: 8.93,
      attack: 8.93,
      insight: 8.93,
    },
  },
  {
    name: "Body Refinement 5",
    baseStats: {
      health: 12500,
      healthRegen: 0,
      defence: 0,
      attack: 380,
    },
    realmPowers: {
      health: 10.7,
      healthRegen: 10.7,
      attack: 10.7,
      insight: 10.7,
    },
  },
  {
    name: "Body Refinement 6",
    baseStats: {
      health: 19000,
      healthRegen: 0,
      defence: 0,
      attack: 570,
    },
    realmPowers: {
      health: 12.85,
      healthRegen: 12.85,
      attack: 12.85,
      insight: 12.85,
    },
  },
  {
    name: "Body Refinement 7",
    baseStats: {
      health: 28500,
      healthRegen: 0,
      defence: 0,
      attack: 850,
    },
    realmPowers: {
      health: 15.42,
      healthRegen: 15.42,
      attack: 15.42,
      insight: 15.42,
    },
  },
  {
    name: "Body Refinement 8",
    baseStats: {
      health: 42000,
      healthRegen: 0,
      defence: 0,
      attack: 1300,
    },
    realmPowers: {
      health: 18.51,
      healthRegen: 18.51,
      attack: 18.51,
      insight: 18.51,
    },
  },
  {
    name: "Body Refinement 9",
    baseStats: {
      health: 64000,
      healthRegen: 0,
      defence: 0,
      attack: 1900,
    },
    realmPowers: {
      health: 22.21,
      healthRegen: 22.21,
      attack: 22.21,
      insight: 22.21,
    },
  },
  {
    name: "Qi Gathering 1",
    baseStats: {
      health: 96000,
      healthRegen: 0,
      defence: 0,
      attack: 2900,
    },
    realmPowers: {
      health: 26.65,
      healthRegen: 26.65,
      attack: 26.65,
      insight: 26.65,
    },
    tribulation: {
      steps: 10,
      statsMulti: 1.05,
      multiplier: 1.1,
    },
  },
];
