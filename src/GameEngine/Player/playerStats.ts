import { isInventoryTreasure } from "GameConstants/Interfaces";
import {
  PlayerStats,
  PlayerCultivationManual,
  InventoryItem,
  PlayerContextType,
} from "GameConstants/Interfaces";

// Functions that calculate total player stats values based on inGame variables
export function calculateStat(stat: string, player: PlayerContextType) {
  const cultivationMulti = manualsStatsMultiplier(stat, player.manuals);
  const realmMulti = player.realm.power[stat] || 1;
  const treasuresMulti = treasuresStatsMultiplier(stat, player.inventory);
  const treasuresPower = treasuresBonus(stat, player.inventory);
  return (
    player.baseStats[stat] * realmMulti * cultivationMulti * treasuresMulti +
    treasuresPower
  );
}

// Returns all of the player stats
export function playerStats(player: PlayerContextType): PlayerStats {
  let currentStats = { ...player.baseStats };
  for (const [key] of Object.entries(player.baseStats)) {
    currentStats[key] = calculateStat(key, player);
  }

  let stats = { ...player.stats, ...currentStats };
  return stats;
}

// Calculates effect on player stats from manuals
export function manualsStatsMultiplier(
  stat: string,
  manuals: PlayerCultivationManual[] | undefined
) {
  // Calculate manuals multiplier
  let totalPower = 1;
  if (!manuals) return 1;
  manuals.forEach((value) => {
    try {
      if (!value.isEquipped || !value.manual.stats) throw new Error("skip");
      const manualPower =
        (value.manual.stats[stat] || 0) * value.learningProgress.level;
      totalPower += manualPower;
    } catch (error) {
      /* do nothing*/
    }
  });
  return totalPower;
}

// Treasures provide multiplier and flat bonus
export function treasuresStatsMultiplier(
  stat: string,
  treasures: InventoryItem[] | undefined
) {
  let totalMulti = 1;
  if (!treasures) return 0;
  treasures.forEach((item) => {
    if (isInventoryTreasure(item) && item.isEquipped) {
      const statsMulti = item.item.stats.statsMulti;
      const itemMulti = (statsMulti && statsMulti[stat]) || 1;
      totalMulti *= 1 + itemMulti;
    }
  });
  return totalMulti;
}

// Treasures just provide flat bonuses for now
export function treasuresBonus(
  stat: string,
  treasures: InventoryItem[] | undefined
) {
  let totalBonus = 0;
  if (!treasures) return 0;
  treasures.forEach((item) => {
    if (isInventoryTreasure(item) && item.isEquipped) {
      const stats = item.item.stats.stats;
      const itemBonus = (stats && stats[stat]) || 0;
      totalBonus += itemBonus;
    }
  });
  return totalBonus;
}

type StatStructure = {
  base: number;
  realm: number;
  manuals: number;
  treasuresMulti: number;
  treasures: number;
};

// Stat structure disambiguation for tooltips
export function getStatStructure(
  stat: string,
  player: PlayerContextType
): StatStructure {
  const { baseStats, realm, manuals, inventory } = player;
  const baseStat = baseStats[stat];
  const realmBonus = realm.power[stat] || 1;
  const manualsBonus = manualsStatsMultiplier(stat, manuals);
  const treasuresMulti = treasuresStatsMultiplier(stat, inventory);
  const treasuresPower = treasuresBonus(stat, inventory);
  return {
    base: baseStat,
    realm: realmBonus,
    manuals: manualsBonus,
    treasuresMulti,
    treasures: treasuresPower,
  };
}
