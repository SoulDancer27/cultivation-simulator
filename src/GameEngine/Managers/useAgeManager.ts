import React from "react";
import PlayerContext from "../Player/PlayerContext";
import { GameTimer } from "GameEngine/GameRuntime";
import { SettingsContext } from "@SoulDancer27/idle-rpg-lib";

// Just a function to update player age
export default function useAgeManager(timer: GameTimer) {
  const { stats, state, updateContext } = React.useContext(PlayerContext);
  const { gameSpeed } = React.useContext(SettingsContext);

  const { currentTime, previousTime } = timer;
  React.useEffect(() => {
    // Update age
    if (["idle", "breakthrough"].includes(state.action)) return;
    const elapsedTime = (timer.currentTime - timer.previousTime) * gameSpeed;
    stats.age += elapsedTime;
    updateContext({ stats });
  }, [currentTime]);
}
