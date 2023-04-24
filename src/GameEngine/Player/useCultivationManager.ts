import { levelExp, totalExp } from "GameConstants/CultivationManuals";
import { PlayerContextType } from "GameConstants/Player";
import { playerStats } from "./playerStats";
import GameContext from "GameEngine/GameContext/GameContext";
import React from "react";
import PlayerContext from "./PlayerContext";

export default function useCultivationManager() {
  const player = React.useContext(PlayerContext);
  let { stats, state, updateContext } = player;
  const { currentTime, previousTime } = React.useContext(GameContext);
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
