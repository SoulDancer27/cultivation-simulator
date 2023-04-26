import { defaultUpdateInterval } from "GameConstants/Constants";
import React from "react";

import useAgeManager from "./Managers/useAgeManager";
import useDefaultRegenManager from "./Managers/useDefaultRegenManager";
import useFightManager from "./Managers/useFightManager";
import useCultivationManager from "./Managers/useCultivationManager";
import useActivityManager from "./Managers/useActivityManager";
import useBreakthroughManager from "./Managers/useBreakthroughManager";

export type GameTimer = {
  previousTime: number;
  currentTime: number;
};

// Wrapper for loading player save data
export default function GameRuntime(props: any) {
  const [timer, setTimer] = React.useState<GameTimer>({
    previousTime: Date.now(),
    currentTime: Date.now(),
  });

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
  useAgeManager(timer);
  useDefaultRegenManager(timer);
  useFightManager(timer);
  useCultivationManager(timer);
  useActivityManager(timer);
  useBreakthroughManager(timer);

  return <>{props.children}</>;
}
