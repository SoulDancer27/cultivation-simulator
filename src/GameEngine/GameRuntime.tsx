import { defaultUpdateInterval } from "GameConstants/Constants";
import React from "react";
import GameContext, {
  gameContext,
  GameContextType,
} from "./GameContext/GameContext";
import breakthroughManager from "./Player/breakthroughManager";
import fightManager from "./Player/fightManager";
import PlayerContext from "./Player/PlayerContext";
import { playerStats } from "./Player/playerStats";

// Wrapper for loading player save data
export default function GameRuntime(props: any) {
  const player = React.useContext(PlayerContext);
  let { stats, state, baseStats, realm, updateContext } = player;
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
    // Update age
    const elapsedTime = timer.currentTime - timer.previousTime;
    stats.age += elapsedTime;
    // Regen health if health is not full
    if (
      stats.currentHealth <= stats.health &&
      ["idle", "training"].includes(state.action)
    )
      stats.currentHealth = Math.min(
        stats.currentHealth + (stats.healthRegen * elapsedTime) / 1000,
        stats.health
      );

    if (state.action === "training" && state.training) {
      for (const [key, value] of Object.entries(state.training.stats)) {
        baseStats[key] += (value * elapsedTime) / 1000;
      }
      // Update calculated stat values based on new baseStats
      stats = playerStats(player);
    }

    // Fighting situation update
    if (state.action === "fighting" && state.enemy) {
      const fightResult = fightManager({ state, stats, elapsedTime });
      state = fightResult.state;
      stats = fightResult.stats;
    }

    if (state.action === "breakthrough" && state.realm) {
      const breakthroughResult = breakthroughManager({
        player,
        elapsedTime,
      });
      state = breakthroughResult.state;
      stats = breakthroughResult.stats;
      realm = breakthroughResult.realm;
    }

    updateContext({ stats, state, realm, baseStats });
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
