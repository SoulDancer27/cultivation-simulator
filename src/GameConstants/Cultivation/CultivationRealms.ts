import { PlayerBaseStats } from "../Player";
//___________________________________________________________________
// You can change breakthrough logic and Cultivation Realm stats here
//___________________________________________________________________

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
  // Additional stats for heavenly tribulations
  tribulation?: Tribulation;
  // Reward stats multipliers
  realmPowers: Partial<PlayerBaseStats>;
};

export let CultivationRealms: CultivationRealm[] = [];
const LargeRealms = [
  "Mortal",
  "Body Refinement",
  "Qi Gathering",
  "Foundation",
  "Qi Transformation",
];
const smallRealmIndex = 9;

const multi = (factor: number, power: number) => factor ** power;

const tribulation = {
  steps: 10,
  statsMulti: 1.05,
  multiplier: 1.1,
};

let index = 0;
for (let realm of LargeRealms) {
  for (let smallIndex = 1; smallIndex <= smallRealmIndex; smallIndex++) {
    const name = realm + " " + smallIndex;
    if (index === 0) {
      CultivationRealms.push({
        name,
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
      });
      index++;
      continue;
    }
    const statMulti = multi(1.5, index - 1);
    const powerMulti = multi(1.2, index);
    CultivationRealms.push({
      name,
      baseStats: {
        health: 50 * statMulti,
        healthRegen: 0,
        defence: 0,
        attack: 6 * statMulti,
      },
      realmPowers: {
        health: 1 * powerMulti,
        healthRegen: 1 * powerMulti,
        attack: 1 * powerMulti,
        defence: 1,
        insight: 1 * powerMulti,
      },
      tribulation: smallIndex === 1 ? tribulation : undefined,
    });
    index++;
  }
}
