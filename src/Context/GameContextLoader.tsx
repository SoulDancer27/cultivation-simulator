import { defaultUpdateInterval } from "GameConstants/Constants";
import React from "react";
import CalculateFightDps from "Utils/CalculateFightDps";
import GameContext, {
  gameContext,
  GameContextType,
} from "./GameContext/GameContext";
import PlayerContext from "./PlayerContext/PlayerContext";

// Wrapper for loading player save data
export default function GameContextLoader(props: any) {
  let { stats, state, updateContext } = React.useContext(PlayerContext);
  const [timer, setTimer] = React.useState(gameContext);
  /** Updates player context using shallow merge of UserContext attributes. */
  const updateGameContext = (newData: Partial<GameContextType>) =>
    setTimer((data) => ({ ...data, ...newData }));

  // Initializing the game loop
  React.useEffect(() => {
    // update the timers
    const interval = setInterval(() => {
      setTimer((timer) => ({
        previousTime: timer.currentTime,
        currentTime: Date.now(),
      }));
    }, defaultUpdateInterval);
    // clears the timer on component unmount to prevent memory leak
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Updating player data
  React.useEffect(() => {
    const elapsedTime = timer.currentTime - timer.previousTime;
    stats.age += elapsedTime;
    // Regen health if health is not full
    if (stats.currentHealth <= stats.health)
      stats.currentHealth = Math.min(
        stats.currentHealth + (stats.healthRegen * elapsedTime) / 1000,
        stats.health
      );

    if (state.action === "training" && state.training) {
      for (const [key, value] of Object.entries(state.training.stats)) {
        stats[key] += (value * elapsedTime) / 1000;
      }
    }
    if (state.action === "fighting" && state.enemy) {
      // Calculate damage dealt by both parties
      const playerDps = CalculateFightDps(
        { attack: stats.attack },
        { defence: state.enemy.defence }
      );
      const enemyDps = CalculateFightDps(
        { attack: state.enemy.attack },
        { defence: stats.defence }
      );
      const playerDamage = (playerDps * elapsedTime) / 1000;
      const enemyDamage = (enemyDps * elapsedTime) / 1000;

      const newEnemyHealth = Math.min(
        state.enemy.health -
          playerDamage +
          (state.enemy.healthRegen * elapsedTime) / 1000,
        state.enemy.health
      );
      const newPlayerHealth = stats.currentHealth - enemyDamage;

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
        stats.currentHealth = newPlayerHealth;
        state.enemy.health = newEnemyHealth;
      }
    }
    updateContext({ stats, state });
  }, [timer]);

  return (
    <GameContext.Provider
      value={{
        ...timer,
        updateContext: updateGameContext,
        setContext: setTimer,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
