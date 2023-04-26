import { levelExp, totalExp } from "GameConstants/CultivationManuals";
import { playerStats } from "../Player/playerStats";
import React from "react";
import PlayerContext from "../Player/PlayerContext";
import { GameTimer } from "GameEngine/GameRuntime";

export default function useCultivationManager(timer: GameTimer) {
  const player = React.useContext(PlayerContext);
  let { stats, state, updateContext } = player;
  const { currentTime, previousTime } = timer;
  React.useEffect(() => {
    if (state.action !== "cultivating" || !state.manual) return;
    // Update age
    const elapsedTime = currentTime - previousTime;
    // calculate exp gain
    const { learningProgress, manual } = state.manual;
    const { level, exp } = learningProgress;
    const expGain = (stats.insight * elapsedTime) / 1000;
    const maxExp = totalExp(manual.maxLevel);
    const newExp = Math.min(exp + expGain, maxExp);
    const overflowExp = newExp - totalExp(level);
    const newLevel =
      overflowExp >=
      levelExp(learningProgress.level + 1, manual.realm, manual.rarity)
        ? level + 1
        : level;
    // update manual progress
    state.manual.learningProgress.exp = newExp;
    // update player stats on reaching new level
    if (newLevel !== level) {
      state.manual.learningProgress.level = newLevel;
      stats = playerStats(player);
    }
    updateContext({ state, stats });
  }, [currentTime]);
}
