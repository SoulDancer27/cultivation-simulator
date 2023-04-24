import { defaultUpdateInterval } from "GameConstants/Constants";
import React from "react";
import GameContext, {
  gameContext,
  GameContextType,
} from "./GameContext/GameContext";
import useAgeManager from "./Player/useAgeManager";
import useDefaultRegenManager from "./Player/useDefaultRegenManager";
import useTrainingManager from "./Player/useTrainingManager";
import useFightManager from "./Player/useFightManager";
import useCultivationManager from "./Player/useCultivationManager";
import useActivityManager from "./Player/useActivityManager";
import useBreakthroughManager from "./Player/useBreakthroughManager";

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

  // Run game managers
  useAgeManager();
  useDefaultRegenManager();
  useTrainingManager();
  useFightManager();
  useCultivationManager();
  useActivityManager();
  useBreakthroughManager();

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
