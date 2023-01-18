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
  const player = React.useContext(PlayerContext);
  let { stats, state, baseStats, realm, inventory, updateContext } = player;
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
    // Copying variables to use inside use effect
    let _stats = stats;
    let _inventory = inventory;
    let _baseStats = baseStats;
    let _realm = realm;
    let _state = state;
    // Update age
    const elapsedTime = timer.currentTime - timer.previousTime;
    stats.age += elapsedTime;
    // Regen health if health is not full
    if (
      stats.currentHealth <= stats.health &&
      ["idle", "training", "activity"].includes(state.action)
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
      _stats = playerStats(player);
    }

    if (state.action === "activity" && state.activity) {
      const activityResult = activityManager({ player, elapsedTime });
      _state = activityResult.state;
      _inventory = activityResult.inventory;
      _stats = activityResult.stats;
      _baseStats = activityResult.baseStats;
    }

    // Fighting situation update
    if (state.action === "fighting" && state.enemy) {
      const fightResult = fightManager({ state, stats, elapsedTime });
      _state = fightResult.state;
      _stats = fightResult.stats;
    }

    if (state.action === "breakthrough" && state.realm) {
      const breakthroughResult = breakthroughManager({
        player,
        elapsedTime,
      });
      _state = breakthroughResult.state;
      _stats = breakthroughResult.stats;
      _realm = breakthroughResult.realm;
    }

    if (state.action === "cultivating" && state.manual) {
      const cultivationResult = cultivationManager({ player, elapsedTime });
      _stats = cultivationResult.player.stats;
      _state = cultivationResult.player.state;
    }

    updateContext({
      stats: _stats,
      state: _state,
      realm: _realm,
      baseStats: _baseStats,
      inventory: _inventory,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
