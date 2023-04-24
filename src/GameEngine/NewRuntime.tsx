import { defaultUpdateInterval } from "GameConstants/Constants";
import React from "react";
import GameContext, {
  gameContext,
  GameContextType,
} from "./GameContext/GameContext";
import activityManager from "./Player/activityManager";
import breakthroughManager from "./Player/breakthroughManager";
import cultivationManager from "./Player/cultivationManager";
import fightManager from "./Player/fightManager";
import PlayerContext from "./Player/PlayerContext";
import { playerStats } from "./Player/playerStats";

// Wrapper for loading player save data
export default function GameRuntime(props: any) {
  const [timer, setTimer] = React.useState(gameContext);
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

function useAgeManager() {
  const { stats, updateContext } = React.useContext(PlayerContext);
  const { currentTime, previousTime } = React.useContext(GameContext);
  React.useEffect(() => {
    // Update age
    const elapsedTime = currentTime - previousTime;
    stats.age += elapsedTime;
    updateContext({ stats });
  }, [currentTime]);
}

function useDefaultRegenManager() {
  const { stats, state, updateContext } = React.useContext(PlayerContext);
  const { currentTime, previousTime } = React.useContext(GameContext);
  React.useEffect(() => {
    // Regen health if health is not full
    const elapsedTime = currentTime - previousTime;
    if (
      stats.currentHealth <= stats.health &&
      ["idle", "training", "activity"].includes(state.action)
    )
      stats.currentHealth = Math.min(
        stats.currentHealth + (stats.healthRegen * elapsedTime) / 1000,
        stats.health
      );
    updateContext({ stats });
  }, [currentTime]);
}

function useTrainingManager() {
  const player = React.useContext(PlayerContext);
  let { state, baseStats, stats, updateContext } = player;
  const { currentTime, previousTime } = React.useContext(GameContext);
  React.useEffect(() => {
    const elapsedTime = currentTime - previousTime;
    if (state.action === "training" && state.training) {
      for (const [key, value] of Object.entries(state.training.stats)) {
        baseStats[key] += (value * elapsedTime) / 1000;
      }
      // Update calculated stat values based on new baseStats
      stats = playerStats(player);
    }
    updateContext({ stats });
  }, [currentTime]);
}
