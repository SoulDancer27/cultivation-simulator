import { EnemyFightDps, PlayerFightDps } from "GameConstants/Fighting/fightDps";
import { PlayerContextType, PlayerEnemyType } from "GameConstants/Interfaces";

// Calculate the amount of times enemy can be defeated in a certain time period
export default function enemyTimesDefeated(
  elapsedTime: number,
  enemy: PlayerEnemyType,
  player: PlayerContextType
) {
  const { currentStats } = player;
  const playerDps = PlayerFightDps(player, enemy);
  const enemyDps = EnemyFightDps(enemy, player);
  let playerDamage = (playerDps * elapsedTime) / 1000;
  let enemyDamage = (enemyDps * elapsedTime) / 1000;
  if (enemyDamage >= currentStats.health) {
    playerDamage *= currentStats.health / enemyDamage; // if the player actually died in this span of time
  }
  if (playerDamage < enemy.currentHealth) return 0;
  if (playerDamage < enemy.health)
    return playerDamage > enemy.currentHealth ? 1 : 0;
  return Math.floor((playerDamage - enemy.currentHealth) / enemy.health);
}
