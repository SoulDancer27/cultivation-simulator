import { PlayerContextType } from "./Interfaces";
import { PlayerBaseStats } from "./Player";

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
    name: "Mortal 0",
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
    name: "Mortal 1",
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
      defence: 1.2,
      insight: 1.2,
    },
    tribulation: {
      steps: 25,
      statsMulti: 1.05,
      multiplier: 1.1,
    },
  },
  {
    name: "Mortal 2",
    baseStats: {
      health: 300,
      healthRegen: 0,
      defence: 0,
      attack: 5,
    },
    realmPowers: {
      health: 1.44,
      healthRegen: 1.44,
      attack: 1.44,
      defence: 1.44,
      insight: 1.44,
    },
    tribulation: {
      steps: 20,
      statsMulti: 1.05,
      multiplier: 1.1,
    },
  },
  {
    name: "Mortal 3",
    baseStats: {
      health: 500,
      healthRegen: 1,
      defence: 0,
      attack: 8,
    },
    realmPowers: {
      health: 1.73,
      healthRegen: 1.73,
      attack: 1.73,
      defence: 1.73,
      insight: 1.73,
    },
  },
];
