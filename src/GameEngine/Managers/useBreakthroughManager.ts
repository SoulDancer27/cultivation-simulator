import {
  CultivationRealm,
  CultivationRealms,
} from "GameConstants/CultivationRealms";
import { playerStats } from "../Player/playerStats";
import React from "react";
import PlayerContext from "../Player/PlayerContext";
import { GameTimer } from "GameEngine/GameRuntime";
import GameContext from "GameEngine/GameContext/GameContext";
import { PlayerBaseStats, RealmTribulation } from "GameConstants/Player";
import calculateRealmPower from "GameEngine/shared/calculateRealmPower";

export default function useBreakthroughManager(timer: GameTimer) {
  const player = React.useContext(PlayerContext);
  const { cultivationRealms, updateContext: updateGameContext } =
    React.useContext(GameContext);
  let { stats, state, realm, updateContext } = player;
  const { currentTime, previousTime } = timer;
  React.useEffect(() => {
    if (state.action !== "breakthrough" || !state.realm) return;
    const elapsedTime = currentTime - previousTime;
    // Calculate damage dealt by both parties
    const breakthrough = state.realm;
    const playerDps = BreakthroughDps(
      { attack: stats.attack },
      { defence: breakthrough.defence, healthRegen: breakthrough.healthRegen }
    );
    const realmDps = TribulationDps(
      { attack: breakthrough.attack },
      {
        defence: stats.defence,
        healthRegen: stats.healthRegen,
      }
    );
    const playerDamage = (playerDps * elapsedTime) / 1000;
    const realmDamage = (realmDps * elapsedTime) / 1000;

    const newRealmHealth = Math.min(
      breakthrough.currentHealth - playerDamage,
      breakthrough.health
    );
    const newPlayerHealth = Math.min(
      stats.currentHealth - realmDamage,
      stats.health
    );

    // Victory condition
    if (newRealmHealth <= 0) {
      // Check if the tribulation has layers
      if (breakthrough.tribulation && state.realm.tribulation) {
        const stepReached = state.realm.tribulation.stepReached;
        if (!stepReached || breakthrough.tribulation.steps > stepReached) {
          // Proceed to the next step

          const newStep = stepReached ? stepReached + 1 : 1;
          state.realm.tribulation.stepReached = newStep;
          const newMulti = breakthrough.tribulation.multiplier ** newStep;
          state.realm.health = breakthrough.health * newMulti;
          state.realm.attack = breakthrough.attack * newMulti;
          state.realm.defence = breakthrough.defence * newMulti;
          state.realm.healthRegen = breakthrough.healthRegen * newMulti;
          state.realm.currentHealth = state.realm.health;

          updateContext({ state });
          return;
        } else {
          // All steps finished update player realm and game context
          realm.index = breakthrough.index;
          if (cultivationRealms[realm.index].tribulation)
            (cultivationRealms[realm.index] as any).tribulation.stepReached =
              breakthrough.tribulation.steps;
          realm.power = calculateRealmPower(
            breakthrough.index,
            cultivationRealms
          );
          state = { action: "idle", realm: undefined };
          // Update player stats
          stats = playerStats(player);
          updateContext({ stats, state, realm });
          updateGameContext({ cultivationRealms });
          alert("Breakthrough success!");
          return;
        }
      }
      // Update player realm
      realm.index = breakthrough.index;
      state = { action: "idle", realm: undefined };
      // Update player stats
      realm.power = calculateRealmPower(breakthrough.index, cultivationRealms);
      stats = playerStats(player);
      updateContext({ stats, state, realm });
      alert("Breakthrough success!");
    }

    // Loss condition
    else if (newPlayerHealth <= 0) {
      if (breakthrough.tribulation && state.realm.tribulation) {
        const stepReached = state.realm.tribulation.stepReached;
        if (!stepReached) {
          state = { action: "idle", realm: undefined };
          alert("Breakthrough failed, you are not strong enough yet");
          // The breakthrough was successful, albeit not stages were finished
        } else {
          realm.index = breakthrough.index;
          if (cultivationRealms[realm.index].tribulation)
            (cultivationRealms[realm.index] as any).tribulation.stepReached =
              state.realm.tribulation.stepReached;
          realm.power = calculateRealmPower(
            breakthrough.index,
            CultivationRealms
          );
          state = { action: "idle", realm: undefined };
          // Update player stats
          stats = playerStats(player);
          updateContext({ stats, state, realm });

          updateGameContext({ cultivationRealms });
          alert("Breakthrough success!");
          return;
        }
      }
      state = { action: "idle", realm: undefined };
      alert("Breakthrough failed, you are not strong enough yet");
    }
    // Update Hp values for both parties
    else {
      stats.currentHealth = newPlayerHealth;
      state.realm.currentHealth = newRealmHealth;
      updateContext({ stats, state, realm });
    }
  }, [currentTime]);
}

// Realm tribulation damage to the player during breakthrough attempt
type PlayerDefenceStats = {
  defence: number;
  healthRegen: number;
};

type RealmTribulationStats = {
  attack: number;
};
export function TribulationDps(
  realm: RealmTribulationStats,
  player: PlayerDefenceStats
) {
  return realm.attack / (1 + 0.01 * player.defence) - player.healthRegen;
}

// Stats that matter for the fighting actor
type PlayerBreakthroughStats = {
  attack: number;
};

type RealmDefenceStats = {
  defence: number;
  healthRegen: number;
};
export function BreakthroughDps(
  player: PlayerBreakthroughStats,
  realm: RealmDefenceStats
) {
  return player.attack / (1 + 0.01 * realm.defence) - realm.healthRegen;
}
