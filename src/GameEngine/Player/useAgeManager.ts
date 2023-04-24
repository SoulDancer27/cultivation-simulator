import GameContext from "GameEngine/GameContext/GameContext";
import React from "react";
import PlayerContext from "./PlayerContext";

export default function useAgeManager() {
  const { stats, updateContext } = React.useContext(PlayerContext);
  const { currentTime, previousTime } = React.useContext(GameContext);
  React.useEffect(() => {
    // Update age
    const elapsedTime = currentTime - previousTime;
    stats.age += elapsedTime;
    updateContext({ stats });
  }, [currentTime]);
}
