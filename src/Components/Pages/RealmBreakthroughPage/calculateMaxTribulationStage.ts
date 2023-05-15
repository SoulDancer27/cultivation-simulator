import { CultivationRealm } from "GameConstants/CultivationRealms";

import calculateTribulationPower from "GameEngine/shared/calculateTribulationPower";
import {
  BreakthroughDps,
  TribulationDps,
} from "GameEngine/shared/breakthrough";
import { PlayerStats } from "GameConstants/Interfaces";

export default function calculateMaxTribulationStage(props: {
  stats: PlayerStats;
  cultivationRealms: CultivationRealm[];
  nextRealmIndex: number;
}): number {
  const { stats, cultivationRealms, nextRealmIndex } = props;
  let step = 0;
  let remainingHealth = stats.currentHealth;
  const cultivationRealmsCopy = JSON.parse(JSON.stringify(cultivationRealms));

  const currentRealm = cultivationRealmsCopy[nextRealmIndex];
  if (!currentRealm.tribulation) return 0;
  for (let i = 0; i <= currentRealm.tribulation.steps; i++) {
    const tribulation = calculateTribulationPower(
      nextRealmIndex,
      cultivationRealmsCopy
    );
    const tribulationDps = TribulationDps(
      { attack: tribulation.attack },
      { defence: stats.defence, healthRegen: stats.healthRegen }
    );
    const playerDps = BreakthroughDps(
      { attack: stats.attack },
      { defence: tribulation.defence, healthRegen: tribulation.healthRegen }
    );
    if (playerDps <= 0) break;
    if (tribulationDps <= 0) {
      step++;
      (cultivationRealmsCopy[nextRealmIndex] as any).tribulation.stepReached =
        step;
      continue;
    }
    const time = tribulation.health / playerDps;
    const damageReceived = tribulationDps * time;
    remainingHealth -= damageReceived;
    if (remainingHealth <= 0) break;

    step++;
    (cultivationRealmsCopy[nextRealmIndex] as any).tribulation.stepReached =
      step;
  }
  return Math.min(Math.max(step - 1, 0), currentRealm.tribulation.steps);
}
