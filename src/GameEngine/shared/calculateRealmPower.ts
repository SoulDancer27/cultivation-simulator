import { CultivationRealm } from "GameConstants/CultivationRealms";
import { PlayerBaseStats } from "GameConstants/Player";

export default function calculateRealmPower(
  index: number,
  realms: CultivationRealm[]
): PlayerBaseStats {
  const power: PlayerBaseStats = {
    health: 1,
    healthRegen: 1,
    attack: 1,
    defence: 1,
    insight: 1,
  };
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
    for (let [key, value] of Object.entries(realm.realmPowers)) {
      power[key] *= powerMulti;
    }
  }
  return power;
}
