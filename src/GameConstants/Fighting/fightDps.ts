import { PlayerContextType } from "GameConstants/Interfaces";
import { EnemyType } from "./Enemies";

export function PlayerFightDps(player: PlayerContextType, enemy: EnemyType) {
  return player.stats.attack / (1 + 0.01 * enemy.defence) - enemy.healthRegen;
}

export function EnemyFightDps(enemy: EnemyType, player: PlayerContextType) {
  return (
    enemy.attack / (1 + 0.01 * player.stats.defence) - player.stats.healthRegen
  );
}
