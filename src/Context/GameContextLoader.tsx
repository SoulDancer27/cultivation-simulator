import React from "react";
import GameContext, {
  gameContext,
  GameContextType,
} from "./GameContext/GameContext";
import PlayerContext from "./PlayerContext/PlayerContext";

// Update interval in milliseconds
const defaultUpdateInterval = 100;

// Wrapper for loading player save data
export default function GameContextLoader(props: any) {
  const { stats, state, updateContext } = React.useContext(PlayerContext);
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
    if (state.action === "training" && state.training) {
      for (const [key, value] of Object.entries(state.training.stats)) {
        stats[key] += (value * elapsedTime) / 1000;
      }
    }
    updateContext({ stats });
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
