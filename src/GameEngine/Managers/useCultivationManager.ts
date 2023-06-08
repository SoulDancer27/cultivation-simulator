import { playerStats } from "../Player/playerStats";
import React from "react";
import PlayerContext from "../Player/PlayerContext";
import { GameTimer } from "GameEngine/GameRuntime";
import { playerSkills } from "GameEngine/Player/playerSkills";
import SettingsContext from "GameEngine/SettingsContext/SettingContext";
import { totalExp, levelExp } from "GameConstants";

// Updates cultivation manuals learning progress
export default function useCultivationManager(timer: GameTimer) {
  const player = React.useContext(PlayerContext);
  const { gameSpeed } = React.useContext(SettingsContext);
  let { stats, state, skills, updateContext } = player;
  const { currentTime, previousTime } = timer;
  React.useEffect(() => {
    if (state.action !== "cultivating" || !state.manual) return;
    // Update age
    const elapsedTime = (timer.currentTime - timer.previousTime) * gameSpeed;
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
      if (manual.stats) stats = playerStats(player);
      if (manual.skills) skills = playerSkills(player);
    }
    updateContext({ state, stats, skills });
  }, [currentTime]);
}
