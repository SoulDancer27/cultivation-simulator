import { PlayerBaseStats } from "./Player";

export type CultivationRealmType = {
  name: string;
  health: number;
  healthRegen: number;
  defence: number;
  attack: number;
  realmPowers: Partial<PlayerBaseStats>;
};

export const CultivationRealms: CultivationRealmType[] = [
  {
    name: "Mortal 0",
    health: 0,
    healthRegen: 0,
    defence: 0,
    attack: 0,
    realmPowers: {
      health: 1,
      healthRegen: 1,
      defence: 1,
      attack: 1,
      insight: 1,
    },
  },
  {
    name: "Mortal 1",
    health: 100,
    healthRegen: 0,
    defence: 0,
    attack: 3,
    realmPowers: {
      health: 1.2,
      healthRegen: 1.2,
      defence: 1.2,
      attack: 1.2,
      insight: 1.2,
    },
  },
  {
    name: "Mortal 2",
    health: 300,
    healthRegen: 0,
    defence: 0,
    attack: 5,
    realmPowers: {
      health: 1.44,
      healthRegen: 1.44,
      defence: 1.44,
      attack: 1.44,
      insight: 1.44,
    },
  },
  {
    name: "Mortal 3",
    health: 500,
    healthRegen: 1,
    defence: 0,
    attack: 8,
    realmPowers: {
      health: 1.73,
      healthRegen: 1.73,
      defence: 1.73,
      attack: 1.73,
      insight: 1.73,
    },
  },
];
