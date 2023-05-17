import React from "react";
import { usePlayerState, useSetPlayerState } from "../Player/PlayerContext";
import { GameTimer } from "GameEngine/GameRuntime";

// Just a function to update player age
export default function useAgeManager(timer: GameTimer) {
  const { stats } = usePlayerState();
  const setContext = useSetPlayerState();

  const { currentTime, previousTime } = timer;
  React.useEffect(() => {
    // Update age
    const elapsedTime = currentTime - previousTime;
    stats.age += elapsedTime;
    setContext((data) => ({ ...data, ...{ stats } }));
  }, [currentTime]);
}
