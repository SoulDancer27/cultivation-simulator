import { PlayerBaseStats } from "GameConstants/Player";

// Function to increment player baseStats
export default function addBaseStats(
  baseStats: PlayerBaseStats,
  reward: Partial<PlayerBaseStats>,
  times: number
): PlayerBaseStats {
  for (const [key, value] of Object.entries(reward)) {
    try {
      baseStats[key] += value * times;
    } catch (error) {
      console.log(error);
    }
  }
  return baseStats;
}
