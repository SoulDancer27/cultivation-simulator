import React from "react";

import useAgeManager from "./Managers/useAgeManager";
import useDefaultRegenManager from "./Managers/useDefaultRegenManager";
import useFightManager from "./Managers/useFightManager";
import useCultivationManager from "./Managers/useCultivationManager";
import useActivityManager from "./Managers/useActivityManager";
import useBreakthroughManager from "./Managers/useBreakthroughManager";
import { SettingsContext } from "@SoulDancer27/idle-rpg-lib";

export type GameTimer = {
  previousTime: number;
  currentTime: number;
};

// Wrapper for loading player save data
export default function GameRuntime(props: any) {
  const { tickRate } = React.useContext(SettingsContext);

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
    }, 1000 / tickRate);
    // clears the timer on component unmount to prevent memory leak
    return () => {
      clearInterval(interval);
    };
  }, [tickRate]);

  // Run game managers
  useAgeManager(timer);
  useDefaultRegenManager(timer);
  useFightManager(timer);
  useCultivationManager(timer);
  useActivityManager(timer);
  useBreakthroughManager(timer);

  return <>{props.children}</>;
}
