import { levelExp, totalExp } from "GameConstants/CultivationManuals";
import { PlayerContextType } from "GameConstants/Player";
import { playerStats } from "./playerStats";

type CultivationState = {
  player: PlayerContextType;
  elapsedTime: number;
};

type CultivationResult = {
  player: PlayerContextType;
};
export default function cultivationManager(
  props: CultivationState
): CultivationResult {
  const { player } = props;
  let { stats, state } = player;
  // skip if state is incorrect
  if (state.action !== "cultivating" || !state.manual) return { player };
  // calculate exp gain
  const { learningProgress, manual } = state.manual;
  const { level, exp } = learningProgress;
  const expGain = (stats.insight * props.elapsedTime) / 1000;
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
    props.player.stats = playerStats(props.player);
  }
  // stop cultivating on reaching max level
  if (newLevel === manual.maxLevel) return { player };

  return { player };
}
