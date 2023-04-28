import { playerStats } from "../Player/playerStats";
import React from "react";
import PlayerContext from "../Player/PlayerContext";
import { GameTimer } from "GameEngine/GameRuntime";
import GameContext from "GameEngine/GameContext/GameContext";
import { Activity } from "GameConstants/Activities";
import removeItems from "GameEngine/shared/removeItems";
import rewardItems from "GameEngine/shared/rewardItems";
import addBaseStats from "GameEngine/shared/addBaseStats";
import calculateTimesCompleted from "GameEngine/shared/calculateTimesCompleted";
import addSkillsExp from "GameEngine/shared/addSkillExp";

export default function useActivityManager(timer: GameTimer) {
  const player = React.useContext(PlayerContext);
  const game = React.useContext(GameContext);
  let { state, baseStats, stats, inventory, skills, updateContext } = player;

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
          if (activity.price.baseStats)
            baseStats = addBaseStats(
              baseStats,
              activity.price.baseStats,
              -timesCompleted
            );
          // Process activity price in terms of items
          if (activity.price.items)
            inventory = removeItems(
              inventory,
              activity.price.items,
              timesCompleted
            );
        }

        // If activity increaces base stats
        if (activity.result.baseStats) console.log(activity?.baseStatsMulti());
        baseStats = addBaseStats(
          baseStats,
          activity.result.baseStats,
          timesCompleted * activity?.baseStatsMulti() || 1
        );
        if (activity.result.skills)
          skills = addSkillsExp(
            skills,
            activity.result.skills,
            timesCompleted * activity?.skillsMulti() || 1
          );
        // Process reward
        if (activity.result.items) {
          inventory = rewardItems(
            inventory,
            activity.result.items,
            timesCompleted
          );
        }
      }
      // Update calculated stat values based on new baseStats
      stats = playerStats(player);
      updateContext({ stats, baseStats, skills, inventory });
    } catch (error) {
      console.log(error);
    }
  }, [timer]);
}
