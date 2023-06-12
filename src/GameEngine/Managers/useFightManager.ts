import React from "react";
import PlayerContext from "../Player/PlayerContext";
import { GameTimer } from "GameEngine/GameRuntime";
import SettingsContext from "GameEngine/SettingsContext/SettingContext";

// This is not yet properly tested, beware
export default function useFightManager(timer: GameTimer) {
  let { stats, currentStats, state, updateContext } =
    React.useContext(PlayerContext);
  const { gameSpeed } = React.useContext(SettingsContext);
  const { currentTime, previousTime } = timer;
  React.useEffect(() => {
    // Update age
    const elapsedTime = (timer.currentTime - timer.previousTime) * gameSpeed;
    if (state.action !== "fighting" || !state.enemy) return;
    // Calculate damage dealt by both parties
    const playerDps = FightDps(
      { attack: stats.attack },
      { defence: state.enemy.defence, healthRegen: state.enemy.healthRegen }
    );
    const enemyDps = FightDps(
      { attack: state.enemy.attack },
      {
        defence: stats.defence,
        healthRegen: stats.healthRegen,
      }
    );
    const playerDamage = (playerDps * elapsedTime) / 1000;
    const enemyDamage = (enemyDps * elapsedTime) / 1000;

    const newEnemyHealth = Math.min(
      state.enemy.currentHealth - playerDamage,
      state.enemy.health
    );

    const newPlayerHealth = Math.min(
      currentStats.health - enemyDamage,
      stats.health
    );

    // Victory condition
    if (newEnemyHealth <= 0) {
      state = { action: "idle", enemy: undefined };
      alert("You defeated an enemy!");
    }
    // Loss condition
    else if (newPlayerHealth <= 0) {
      state = { action: "idle", enemy: undefined };
      alert("Enemy was too strong and you had to escape");
    }
    // Update Hp values for both parties
    else {
      currentStats.health = newPlayerHealth;
      state.enemy.currentHealth = newEnemyHealth;
    }
    updateContext({ currentStats, state });
  }, [currentTime]);
}

// Stats that matter for the fighting actor
type AttackerStats = {
  attack: number;
};

type DefenderStats = {
  defence: number;
  healthRegen: number;
};
function FightDps(attacker: AttackerStats, defender: DefenderStats) {
  return attacker.attack / (1 + 0.01 * defender.defence) - defender.healthRegen;
}
