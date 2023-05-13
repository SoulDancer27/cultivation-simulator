import { CultivationRealm } from "GameConstants/CultivationRealms";

// For the breakthrough manager
export default function calculateTribulationPower(
  index: number,
  realms: CultivationRealm[]
): { health: number; attack: number; healthRegen: number; defence: number } {
  const currentRealm = realms[index];
  const power = {
    health: currentRealm.baseStats.health,
    attack: currentRealm.baseStats.attack,
    healthRegen: currentRealm.baseStats.healthRegen,
    defence: currentRealm.baseStats.defence,
  };
  // First step doesn't get more difficult
  if (!currentRealm.tribulation || !currentRealm.tribulation.stepReached)
    return power;
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
