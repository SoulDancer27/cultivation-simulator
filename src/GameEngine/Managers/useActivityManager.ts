import { playerStats } from "../Player/playerStats";
import React from "react";
import PlayerContext from "../Player/PlayerContext";
import { GameTimer } from "GameEngine/GameRuntime";
import GameContext from "GameEngine/GameContext/GameContext";
import { Activity } from "GameConstants/Activities";
import removeItems from "GameEngine/shared/removeItems";
import addBaseStats from "GameEngine/shared/addBaseStats";
import calculateTimesCompleted from "GameEngine/shared/calculateTimesCompleted";
import addSkillsExp from "GameEngine/shared/addSkillExp";
import { playerSkills } from "GameEngine/Player/playerSkills";
import rewardActivityItems from "GameEngine/shared/rewardActivityItems";

export default function useActivityManager(timer: GameTimer) {
  const player = React.useContext(PlayerContext);
  const game = React.useContext(GameContext);
  let {
    state,
    baseStats,
    stats,
    inventory,
    baseSkills,
    skills,
    updateContext,
  } = player;

  React.useEffect(() => {
    try {
      if (state.action !== "activity" || !state.activity) return;

      const elapsedTime = timer.currentTime - timer.previousTime;
      let activity = game[state.activity.source].find(
        (item: Activity) => state.activity && item.name === state.activity.name
      );
      if (!activity) return;
      if (!activity.currentTime) activity.currentTime = 0;
      const { timesCompleted, currentTime } = calculateTimesCompleted(
        elapsedTime,
        activity,
        player
      );

      activity.currentTime = currentTime;
      activity.timesCompleted =
        (activity?.timesCompleted || 0) + timesCompleted;
      // Action not completed yet
      if (timesCompleted === 0) {
        game.updateContext({ ...game });
        return;
      }
      // Action finished. Process cost and reward
      else {
        // Process activity price a bit of a hacky way
        if (activity.price) {
          const priceMulti = activity.priceMulti || 1;
          if (activity.price.baseStats)
            baseStats = addBaseStats(
              baseStats,
              activity.price.baseStats,
              -timesCompleted * priceMulti
            );
          // Process activity price in terms of items
          if (activity.price.items)
            inventory = removeItems(
              inventory,
              activity.price.items,
              timesCompleted * priceMulti
            );
        }

        // If activity increaces base stats
        if (activity.result.baseStats)
          baseStats = addBaseStats(
            baseStats,
            activity.result.baseStats,
            timesCompleted *
              (typeof activity.baseStatsMulti === "function"
                ? activity.baseStatsMulti()
                : 1)
          );
        if (activity.result.skills)
          baseSkills = addSkillsExp(
            baseSkills,
            activity.result.skills,
            timesCompleted *
              (typeof activity.skillsMulti === "function"
                ? activity.skillsMulti()
                : 1)
          );
        // Process reward
        if (activity.result.items) {
          inventory = rewardActivityItems(player, activity, timesCompleted);
        }
      }
      // Update calculated stat values based on new baseStats
      stats = playerStats(player);
      skills = playerSkills(player);
      updateContext({ stats, baseStats, baseSkills, skills, inventory });
    } catch (error) {
      console.log(error);
    }
  }, [timer]);
}
