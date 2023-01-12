import { PlayerContextType } from "GameConstants/Player";

export function playerHealth(player: PlayerContextType) {
  return player.stats.health * (player.realm.power.health || 1);
}

export function playerAttack(player: PlayerContextType) {
  return player.stats.attack * (player.realm.power.attack || 1);
}

export function playerDefence(player: PlayerContextType) {
  return player.stats.defence * (player.realm.power.defence || 1);
}

export function playerHealthRegen(player: PlayerContextType) {
  return player.stats.healthRegen * (player.realm.power.healthRegen || 1);
}
