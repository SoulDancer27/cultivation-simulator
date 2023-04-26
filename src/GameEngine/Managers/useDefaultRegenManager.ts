import PlayerContext from "../Player/PlayerContext";
import React from "react";
import { GameTimer } from "GameEngine/GameRuntime";

export default function useDefaultRegenManager(timer: GameTimer) {
  const { stats, state, updateContext } = React.useContext(PlayerContext);
  const { currentTime, previousTime } = timer;
  React.useEffect(() => {
    // Regen health if health is not full
    const elapsedTime = currentTime - previousTime;
    if (
      stats.currentHealth <= stats.health &&
      ["idle", "training", "activity"].includes(state.action)
    )
      stats.currentHealth = Math.min(
        stats.currentHealth + (stats.healthRegen * elapsedTime) / 1000,
        stats.health
      );
    updateContext({ stats });
  }, [currentTime]);
}
