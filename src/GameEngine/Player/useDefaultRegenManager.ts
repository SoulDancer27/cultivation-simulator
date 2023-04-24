import GameContext from "GameEngine/GameContext/GameContext";
import PlayerContext from "./PlayerContext";
import React from "react";

export default function useDefaultRegenManager() {
  const { stats, state, updateContext } = React.useContext(PlayerContext);
  const { currentTime, previousTime } = React.useContext(GameContext);
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
