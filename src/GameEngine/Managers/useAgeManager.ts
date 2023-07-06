import { GameTimer } from "GameEngine/GameRuntime";
import { useAppDispatch, useAppSelector } from "GameEngine/store";
import { changePlayerAge } from "GameEngine/store/features/playerSlice";
import { selectGameSpeed } from "GameEngine/store/features/settingsSlice";
import React from "react";

// Just a function to update player age
export default function useAgeManager(timer: GameTimer) {
  const gameSpeed = useAppSelector(selectGameSpeed);
  const dispatch = useAppDispatch();
  const { currentTime, previousTime } = timer;
  React.useEffect(() => {
    // Update age
    const elapsedTime = (timer.currentTime - timer.previousTime) * gameSpeed;
    dispatch(changePlayerAge(elapsedTime));
  }, [currentTime]);
}
