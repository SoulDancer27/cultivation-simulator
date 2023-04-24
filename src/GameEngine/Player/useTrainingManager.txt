import PlayerContext from "./PlayerContext";
import { playerStats } from "./playerStats";
import React from "react";
import { GameTimer } from "GameEngine/GameRuntime";

export default function useTrainingManager(timer: GameTimer) {
  const player = React.useContext(PlayerContext);
  let { state, baseStats, stats, updateContext } = player;
  const { currentTime, previousTime } = timer;
  React.useEffect(() => {
    const elapsedTime = currentTime - previousTime;
    if (state.action !== "training" || !state?.training) return;
    for (const [key, value] of Object.entries(state.training.stats)) {
      baseStats[key] += (value * elapsedTime) / 1000;
    }
    // Update calculated stat values based on new baseStats
    stats = playerStats(player);

    updateContext({ stats });
  }, [currentTime]);
}
