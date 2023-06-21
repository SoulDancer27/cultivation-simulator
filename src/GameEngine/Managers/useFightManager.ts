import React from "react";
import PlayerContext from "../Player/PlayerContext";
import { GameTimer } from "GameEngine/GameRuntime";
import { playerSkills } from "GameEngine/Player/playerSkills";
import { playerStats } from "../Player/playerStats";
import { EnemyFightDps, PlayerFightDps } from "GameConstants/Fighting/fightDps";
import enemyTimesDefeated from "GameEngine/shared/enemyTimesDefeated";
import addBaseStats from "GameEngine/shared/addBaseStats";
import addSkillsExp from "GameEngine/shared/addSkillExp";
import rewardItems from "GameEngine/shared/rewardItems";
import { SettingsContext } from "@SoulDancer27/idle-rpg-lib";

// This is not yet properly tested, beware
export default function useFightManager(timer: GameTimer) {
  const player = React.useContext(PlayerContext);
  let {
    stats,
    baseStats,
    baseSkills,
    currentStats,
    state,
    skills,
    inventory,
    updateContext,
  } = player;
  const { gameSpeed } = React.useContext(SettingsContext);
  const { currentTime, previousTime } = timer;
  React.useEffect(() => {
    // Update age
    const elapsedTime = (timer.currentTime - timer.previousTime) * gameSpeed;
    if (state.action !== "fighting" || !state.enemy) return;
    const enemy = state.enemy;
    // Calculate damage dealt by both parties
    const playerDps = PlayerFightDps(player, enemy);
    const enemyDps = EnemyFightDps(enemy, player);
    const playerDamage = (playerDps * elapsedTime) / 1000;
    const enemyDamage = (enemyDps * elapsedTime) / 1000;

    const timesCompleted = enemyTimesDefeated(elapsedTime, enemy, player);

    const newEnemyHealth = Math.min(
      enemy.currentHealth - (playerDamage - enemy.health * timesCompleted),
      enemy.health
    );

    const newPlayerHealth = Math.min(
      currentStats.health - enemyDamage,
      stats.health
    );

    // Process reward
    if (timesCompleted > 0) {
      // If activity increaces base stats
      if (enemy.result.baseStats)
        baseStats = addBaseStats(
          baseStats,
          enemy.result.baseStats,
          timesCompleted
        );
      if (enemy.result.skills) {
        baseSkills = addSkillsExp(
          baseSkills,
          enemy.result.skills,
          timesCompleted
        );
      }

      // Process reward
      if (enemy.result.items) {
        inventory = rewardItems(player, enemy.result.items, timesCompleted);
      }
    }

    // Loss condition
    if (newPlayerHealth <= 0) {
      state = { action: "idle", enemy: undefined };
    }
    // Update Hp values for both parties
    else {
      currentStats.health = newPlayerHealth;
      state.enemy.currentHealth = newEnemyHealth;
    }
    // Update calculated stat values based on new baseStats
    stats = playerStats(player);
    skills = playerSkills(player);
    updateContext({
      currentStats,
      baseStats,
      baseSkills,
      inventory,
      state,
      stats,
      skills,
    });
  }, [currentTime]);
}
