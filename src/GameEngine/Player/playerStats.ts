import {
  PlayerContextType,
  PlayerCultivationManual,
  PlayerStats,
} from "GameConstants/Player";

export function playerHealth(player: PlayerContextType) {
  const cultivationMulti = manualsMultiplier("health", player.manuals);
  const realmMulti = player.realm.power.health || 1;
  return player.baseStats.health * realmMulti * cultivationMulti;
}

export function playerAttack(player: PlayerContextType) {
  const cultivationMulti = manualsMultiplier("attack", player.manuals);
  const realmMulti = player.realm.power.attack || 1;
  return player.baseStats.attack * realmMulti * cultivationMulti;
}

export function playerDefence(player: PlayerContextType) {
  const cultivationMulti = manualsMultiplier("defence", player.manuals);
  const realmMulti = player.realm.power.defence || 1;
  return player.baseStats.defence * realmMulti * cultivationMulti;
}

export function playerHealthRegen(player: PlayerContextType) {
  const cultivationMulti = manualsMultiplier("healthRegen", player.manuals);
  const realmMulti = player.realm.power.healthRegen || 1;
  return player.baseStats.healthRegen * realmMulti * cultivationMulti;
}

export function playerInsight(player: PlayerContextType) {
  const cultivationMulti = manualsMultiplier("insight", player.manuals);
  const realmMulti = player.realm.power.insight || 1;
  return player.baseStats.insight * realmMulti * cultivationMulti;
}

export function playerStats(player: PlayerContextType): PlayerStats {
  const stats = { ...player.stats };
  stats.health = playerHealth(player);
  stats.attack = playerAttack(player);
  stats.defence = playerDefence(player);
  stats.healthRegen = playerHealthRegen(player);
  stats.insight = playerInsight(player);
  return stats;
}

export function manualsMultiplier(
  stat: string,
  manuals: PlayerCultivationManual[] | undefined
) {
  // Calculate manuals multiplier
  let totalPower = 1;
  if (!manuals) return 1;
  manuals.forEach((value) => {
    if (value.isEquipped) {
      const manualPower =
        (value.manual.stats[stat] || 0) * value.learningProgress.level;
      totalPower += manualPower;
    }
  });
  return totalPower;
}

type StatStructure = {
  base: number;
  realm: number;
  manuals: number;
};

export function getStatStructure(
  stat: string,
  player: PlayerContextType
): StatStructure {
  const { stats, realm, manuals } = player;
  const baseStat = stats[stat];
  const realmBonus = realm.power[stat] || 1;
  const manualsBonus = manualsMultiplier(stat, manuals);
  return {
    base: baseStat,
    realm: realmBonus,
    manuals: manualsBonus,
  };
}
