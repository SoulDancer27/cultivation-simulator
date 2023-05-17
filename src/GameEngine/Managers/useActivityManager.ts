import { playerStats } from "../Player/playerStats";
import React from "react";
import { usePlayerState, useSetPlayerState } from "../Player/PlayerContext";
import { GameTimer } from "GameEngine/GameRuntime";
import { Activity } from "GameConstants/Activities";
import removeItems from "GameEngine/shared/removeItems";
import addBaseStats from "GameEngine/shared/addBaseStats";
import calculateTimesCompleted from "GameEngine/shared/calculateTimesCompleted";
import addSkillsExp from "GameEngine/shared/addSkillExp";
import { playerSkills } from "GameEngine/Player/playerSkills";
import rewardActivityItems from "GameEngine/shared/rewardActivityItems";
import {
  useGameState,
  useSetGameState,
} from "GameEngine/GameContext/GameContext";

// The main function for inGame player actions processing
export default function useActivityManager(timer: GameTimer) {
  const player = usePlayerState();
  const game = useGameState();
  const setGameState = useSetGameState();
  let { state, baseStats, stats, inventory, baseSkills, skills } = player;
  const setContext = useSetPlayerState();

  React.useEffect(() => {
    try {
      // Bail out
      if (state.action !== "activity" || !state.activity) return;

      // Calculate activity progress based on time passed
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
      // Action not completed yet. Just update the progress and move on
      if (timesCompleted === 0) {
        setGameState({ ...game });
        return;
      }
      // Action finished. Process cost and reward
      else {
        let inventoryIsUpdated = false;
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
          if (activity.price.items) {
            inventory = removeItems(
              inventory,
              activity.price.items,
              timesCompleted * priceMulti
            );
            inventoryIsUpdated = true;
          }
        }

        // If activity increaces base stats
        if (activity.result.baseStats)
          baseStats = addBaseStats(
            baseStats,
            activity.result.baseStats,
            timesCompleted *
              (typeof activity.result.baseStatsMulti === "function"
                ? activity.result.baseStatsMulti(activity)
                : 1)
          );
        if (activity.result.skills)
          baseSkills = addSkillsExp(
            baseSkills,
            activity.result.skills,
            timesCompleted *
              (typeof activity.result.skillsMulti === "function"
                ? activity.result.skillsMulti(activity)
                : 1)
          );
        // Process reward
        if (activity.result.items) {
          const inventory = rewardActivityItems(
            player,
            activity,
            timesCompleted
          );
          inventoryIsUpdated = true;
        }
        // Update calculated stat values based on new baseStats
        stats = playerStats(player);
        skills = playerSkills(player);
        setContext((prev) => ({
          ...prev,
          ...{
            stats,
            baseStats,
            baseSkills,
            skills,
          },
        }));
        if (inventoryIsUpdated) {
          setContext((prev) => ({
            ...prev,
            inventory: inventory.map((x) => x),
          }));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [timer]);
}
