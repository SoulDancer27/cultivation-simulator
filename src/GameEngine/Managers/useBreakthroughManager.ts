import { playerStats } from "../Player/playerStats";
import React from "react";
import PlayerContext from "../Player/PlayerContext";
import { GameTimer } from "GameEngine/GameRuntime";
import GameContext from "GameEngine/GameContext/GameContext";
import calculateRealmPower from "GameEngine/shared/calculateRealmPower";
import calculateTribulationPower from "GameEngine/shared/calculateTribulationPower";
import {
  BreakthroughDps,
  TribulationDps,
} from "GameConstants/CultivationRealms";
import SettingsContext from "GameEngine/SettingsContext/SettingContext";

// Manages realm breakthroughs
export default function useBreakthroughManager(timer: GameTimer) {
  const player = React.useContext(PlayerContext);
  const { gameSpeed } = React.useContext(SettingsContext);
  const { cultivationRealms, updateContext: updateGameContext } =
    React.useContext(GameContext);
  let { stats, state, realm, updateContext } = player;
  const { currentTime, previousTime } = timer;
  React.useEffect(() => {
    if (state.action !== "breakthrough" || !state.realm) return;
    const elapsedTime = (timer.currentTime - timer.previousTime) * gameSpeed;
    // Calculate damage dealt by both parties
    const breakthrough = cultivationRealms[state.realm.index];

    if (!breakthrough || !breakthrough.currentStats) return;

    const playerDps = BreakthroughDps(
      player,
      breakthrough.currentStats || breakthrough.baseStats
    );
    const realmDps = TribulationDps(
      breakthrough.currentStats || breakthrough.baseStats,
      player
    );
    const playerDamage = (playerDps * elapsedTime) / 1000;
    const realmDamage = (realmDps * elapsedTime) / 1000;
    console.log(playerDps, realmDps);

    const newRealmHealth = Math.min(
      breakthrough.currentStats.currentHealth - playerDamage,
      breakthrough.currentStats.health
    );
    const newPlayerHealth = Math.min(
      stats.currentHealth - realmDamage,
      stats.health
    );

    // Victory condition
    if (newRealmHealth <= 0) {
      // Check if the tribulation has layers
      if (breakthrough.tribulation) {
        const stepReached = breakthrough.tribulation.stepReached;
        if (!stepReached || breakthrough.tribulation.steps > stepReached) {
          // Proceed to the next step

          const newStep = stepReached !== undefined ? stepReached + 1 : 1;
          breakthrough.tribulation.stepReached = newStep;
          const { health, healthRegen, attack, defence } =
            calculateTribulationPower(state.realm.index, cultivationRealms);

          breakthrough.currentStats.health = health;
          breakthrough.currentStats.healthRegen = healthRegen;
          breakthrough.currentStats.attack = attack;
          breakthrough.currentStats.defence = defence;
          breakthrough.currentStats.currentHealth = health;
          updateGameContext({ cultivationRealms: cultivationRealms.slice() });
          return;
        } else {
          // All steps finished update player realm and game context
          realm.index = state.realm.index;
          if (breakthrough.tribulation)
            breakthrough.tribulation.stepReached =
              breakthrough.tribulation.steps;
          realm.power = calculateRealmPower(realm.index, cultivationRealms);
          state = { action: "idle", realm: undefined };
          breakthrough.currentStats = undefined;
          // Update player stats
          stats = playerStats(player);
          updateContext({ stats, state, realm });
          updateGameContext({ cultivationRealms: cultivationRealms.slice() });
          alert("Breakthrough success!");
          return;
        }
      }
      // Update player realm
      realm.index = state.realm.index;
      state = { action: "idle", realm: undefined };
      // Update player stats
      realm.power = calculateRealmPower(realm.index, cultivationRealms);
      stats = playerStats(player);
      breakthrough.currentStats = undefined;
      updateContext({ stats, state, realm });
      updateGameContext({ cultivationRealms: cultivationRealms.slice() });
      alert("Breakthrough success!");
    }

    // Loss condition
    else if (newPlayerHealth <= 0) {
      if (breakthrough.tribulation) {
        const stepReached = breakthrough.tribulation.stepReached;
        if (!stepReached) {
          state = { action: "idle", realm: undefined };
          updateContext({ state });
          // The breakthrough was successful, albeit not stages were finished
        } else {
          realm.index = state.realm.index;
          realm.power = calculateRealmPower(realm.index, cultivationRealms);
          state = { action: "idle", realm: undefined };
          // Update player stats
          stats = playerStats(player);
          breakthrough.currentStats = undefined;
          (breakthrough.tribulation as any).stepReached -= 1;
          updateContext({ stats, state, realm });

          updateGameContext({ cultivationRealms: cultivationRealms.slice() });
          alert("Breakthrough success!");
          return;
        }
      }
      state = { action: "idle", realm: undefined };
      breakthrough.currentStats = undefined;
      alert("Breakthrough failed, you are not strong enough yet");
    }
    // Update Hp values for both parties
    else {
      stats.currentHealth = newPlayerHealth;
      breakthrough.currentStats.currentHealth = newRealmHealth;
      updateContext({ stats, state, realm });
      updateGameContext({ cultivationRealms });
    }
  }, [currentTime]);
}
