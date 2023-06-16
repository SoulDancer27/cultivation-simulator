import { PlayerContextType } from "GameConstants/Interfaces";
import { PlayerCurrentStats } from "GameConstants/Player";
import { playerStats } from "./playerStats";

// Prevents overflow on player stats change for all of the currentStats
export function playerCurrentStats(
  player: PlayerContextType
): PlayerCurrentStats {
  let currentStats = { ...player.currentStats };
  let stats = playerStats(player);
  for (const [key] of Object.entries(player.baseStats)) {
    currentStats[key] = Math.min(currentStats[key], stats[key]);
  }

  return currentStats;
}
