import React from "react";
import PlayerContext from "../Player/PlayerContext";
import { GameTimer } from "GameEngine/GameRuntime";

export default function useAgeManager(timer: GameTimer) {
  const { stats, updateContext } = React.useContext(PlayerContext);

  const { currentTime, previousTime } = timer;
  React.useEffect(() => {
    // Update age
    const elapsedTime = currentTime - previousTime;
    stats.age += elapsedTime;
    updateContext({ stats });
  }, [currentTime]);
}
