import { PlayerContextType, PlayerStats } from "GameConstants/Player";

export function playerHealth(player: PlayerContextType) {
  return player.baseStats.health * (player.realm.power.health || 1);
}

export function playerAttack(player: PlayerContextType) {
  return player.baseStats.attack * (player.realm.power.attack || 1);
}

export function playerDefence(player: PlayerContextType) {
  return player.baseStats.defence * (player.realm.power.defence || 1);
}

export function playerHealthRegen(player: PlayerContextType) {
  return player.baseStats.healthRegen * (player.realm.power.healthRegen || 1);
}

export function playerStats(player: PlayerContextType): PlayerStats {
  const stats = { ...player.stats };
  stats.health = playerHealth(player);
  stats.attack = playerAttack(player);
  stats.defence = playerDefence(player);
  stats.healthRegen = playerHealthRegen(player);
  return stats;
}
