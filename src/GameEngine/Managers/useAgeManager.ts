import { GameTimer } from "GameEngine/GameRuntime";
import { useAppDispatch, useAppSelector } from "GameEngine/store";
import {
  changePlayerAge,
  selectPlayerState,
} from "GameEngine/store/features/playerSlice";
import { selectGameSpeed } from "GameEngine/store/features/settingsSlice";
import React from "react";

// Just a function to update player age
export default function useAgeManager(timer: GameTimer) {
  const gameSpeed = useAppSelector(selectGameSpeed);
  const state = useAppSelector(selectPlayerState);
  const dispatch = useAppDispatch();
  const { currentTime, previousTime } = timer;
  React.useEffect(() => {
    // Update age
    if (["idle", "breakthrough"].includes(state.action)) return;
    const elapsedTime = (timer.currentTime - timer.previousTime) * gameSpeed;
    dispatch(changePlayerAge(elapsedTime));
  }, [currentTime]);
}
