import { CultivationRealm } from "GameConstants/CultivationRealms";

export default function calculateTribulationPower(
  index: number,
  realms: CultivationRealm[]
): { health: number; attack: number; healthRegen: number; defence: number } {
  const currentRealm = realms[index];
  const power = {
    health: currentRealm.health,
    attack: currentRealm.attack,
    healthRegen: currentRealm.healthRegen,
    defence: currentRealm.defence,
  };
  if (!currentRealm.tribulation) return power;
  // Take all reached heavenly tribulation steps into account
  for (let i = 0; i <= index; i++) {
    const realm = realms[i];
    if (!realm.tribulation || !realm.tribulation.stepReached) continue;
    const powerMulti =
      realm.tribulation.multiplier ** realm.tribulation.stepReached;

    power.health *= powerMulti;
    power.attack *= powerMulti;
    power.defence *= powerMulti;
    power.healthRegen *= powerMulti;
  }

  return power;
}
