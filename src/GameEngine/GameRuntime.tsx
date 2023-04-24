import { defaultUpdateInterval } from "GameConstants/Constants";
import React from "react";

import useAgeManager from "./Player/useAgeManager";
import useDefaultRegenManager from "./Player/useDefaultRegenManager";
import useFightManager from "./Player/useFightManager";
import useCultivationManager from "./Player/useCultivationManager";
import useActivityManager from "./Player/useActivityManager";
import useBreakthroughManager from "./Player/useBreakthroughManager";

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
