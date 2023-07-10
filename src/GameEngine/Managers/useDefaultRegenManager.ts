import { month } from "GameConstants/Constants";
import { GameTimer } from "GameEngine/GameRuntime";
import SettingsContext from "GameEngine/SettingsContext/SettingContext";
import { useAppSelector } from "GameEngine/store";
import { selectTreasures } from "GameEngine/store/features/inventorySlice";
import { selectGameSpeed } from "GameEngine/store/features/settingsSlice";
import React from "react";
import PlayerContext from "../Player/PlayerContext";

// Placeholder. #todo: replace it with some better logic.
export default function useDefaultRegenManager(timer: GameTimer) {
  const { stats, currentStats, state, updateContext } =
    React.useContext(PlayerContext);
  const gameSpeed = useAppSelector(selectGameSpeed);

  const { currentTime, previousTime } = timer;
  React.useEffect(() => {
    // Regen health if health is not full
    const elapsedTime = (currentTime - previousTime) * gameSpeed;
    if (
      currentStats.health <= stats.health &&
      ["training", "activity", "cultivating"].includes(state.action)
    ) {
      const passiveRegen = 30; // additional passive regen outside of fighting in percents of max health
      const additionalHealth =
        (((stats.health * passiveRegen) / 100) * elapsedTime) / month;
      currentStats.health = Math.min(
        currentStats.health +
          (stats.healthRegen * elapsedTime) / 1000 +
          additionalHealth,
        stats.health
      );
      updateContext({ stats });
    }
  }, [currentTime]);
}
