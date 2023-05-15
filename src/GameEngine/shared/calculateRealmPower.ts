import { CultivationRealm } from "GameConstants/CultivationRealms";
import { PlayerBaseStats, baseStats } from "GameConstants/Player";

// Caclulates realm stats multiplier based on all tribulations completed
export default function calculateRealmPower(
  index: number,
  realms: CultivationRealm[]
): PlayerBaseStats {
  const power = <PlayerBaseStats>{};
  for (const [key] of Object.entries(baseStats)) {
    power[key] = 1;
  }
  // Take current realm into account
  for (let [key, value] of Object.entries(realms[index].realmPowers)) {
    power[key] *= value;
  }
  // Take all reached heavenly tribulation steps into account
  for (let i = 0; i <= index; i++) {
    const realm = realms[i];
    if (!realm.tribulation || !realm.tribulation.stepReached) continue;
    const powerMulti =
      realm.tribulation.statsMulti ** realm.tribulation.stepReached;
    for (let [key] of Object.entries(realm.realmPowers)) {
      power[key] *= powerMulti;
    }
  }
  return power;
}
