import React from "react";
import useAgeManager from "./Managers/useAgeManager";
import { useAppSelector } from "./store";
import { selectTickRate } from "./store/features/settingsSlice";

export type GameTimer = {
  previousTime: number;
  currentTime: number;
};

// Wrapper for loading player save data
export default function GameRuntime(props: any) {
  const tickRate = useAppSelector(selectTickRate);

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

  useAgeManager(timer);

  return <>{props.children}</>;
}
