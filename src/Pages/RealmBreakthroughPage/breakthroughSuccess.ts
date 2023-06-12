import { CultivationRealm } from "GameConstants/Cultivation/CultivationRealms";
import { PlayerContextType } from "GameConstants/Interfaces";

import {
  BreakthroughDps,
  TribulationDps,
} from "GameConstants/Cultivation/CultivationRealms";

export default function breakthroughSuccess(
  player: PlayerContextType,
  realm: CultivationRealm | undefined
) {
  if (!realm) return false;
  const playerDps = BreakthroughDps(player, realm.baseStats);
  const realmDps = TribulationDps(
    realm.currentStats || realm.baseStats,
    player
  );
  const time = realm.baseStats.health / playerDps;
  return player.currentStats.health > realmDps * time;
}
