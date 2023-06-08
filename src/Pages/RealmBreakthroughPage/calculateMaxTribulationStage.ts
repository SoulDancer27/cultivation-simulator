import { CultivationRealm } from "GameConstants/Cultivation/CultivationRealms";

import calculateTribulationPower from "GameEngine/shared/calculateTribulationPower";
import {
  BreakthroughDps,
  TribulationDps,
} from "GameConstants/Cultivation/CultivationRealms";
import { PlayerContextType } from "GameConstants/Interfaces";

export default function calculateMaxTribulationStage(props: {
  player: PlayerContextType;
  cultivationRealms: CultivationRealm[];
  nextRealmIndex: number;
}): number {
  const { player, cultivationRealms, nextRealmIndex } = props;
  const { stats } = player;
  let step = 0;
  let remainingHealth = stats.currentHealth;
  const cultivationRealmsCopy: CultivationRealm[] = JSON.parse(
    JSON.stringify(cultivationRealms)
  );

  const currentRealm = cultivationRealmsCopy[nextRealmIndex];
  if (!currentRealm.tribulation) return 0;
  for (let i = 0; i <= currentRealm.tribulation.steps; i++) {
    const tribulation = calculateTribulationPower(
      nextRealmIndex,
      cultivationRealmsCopy
    );
    const tribulationDps = TribulationDps(
      currentRealm.currentStats || currentRealm.baseStats,
      player
    );
    const playerDps = BreakthroughDps(
      player,
      currentRealm.currentStats || currentRealm.baseStats
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
