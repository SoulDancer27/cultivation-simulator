import React from "react";
import PlayerContext from "../Player/PlayerContext";
import { GameTimer } from "GameEngine/GameRuntime";
import SettingsContext from "GameEngine/SettingsContext/SettingContext";

// Just a function to update player age
export default function useAgeManager(timer: GameTimer) {
  const { stats, updateContext } = React.useContext(PlayerContext);
  const { gameSpeed } = React.useContext(SettingsContext);

  const { currentTime, previousTime } = timer;
  React.useEffect(() => {
    // Update age
    const elapsedTime = (timer.currentTime - timer.previousTime) * gameSpeed;
    stats.age += elapsedTime;
    updateContext({ stats });
  }, [currentTime]);
}
