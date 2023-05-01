import { CultivationRealm } from "GameConstants/CultivationRealms";
import { PlayerStats } from "GameConstants/Player";
import {
  BreakthroughDps,
  TribulationDps,
} from "GameEngine/shared/breakthrough";

export default function breakthroughSuccess(
  stats: PlayerStats,
  realm: CultivationRealm | undefined
) {
  if (!realm) return false;
  const { currentHealth } = stats;
  const playerDps = BreakthroughDps(
    { attack: stats.attack },
    {
      defence: realm.baseStats.defence,
      healthRegen: realm.baseStats.healthRegen,
    }
  );
  const realmDps = TribulationDps(
    { attack: realm.baseStats.attack },
    { defence: stats.defence, healthRegen: stats.healthRegen }
  );
  const time = realm.baseStats.health / playerDps;
  return stats.currentHealth > realmDps * time;
}
