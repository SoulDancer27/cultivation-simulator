import { CultivationRealms } from "GameConstants/CultivationRealms";
import { playerStats } from "./playerStats";
import React from "react";
import PlayerContext from "./PlayerContext";
import { GameTimer } from "GameEngine/GameRuntime";

export default function useBreakthroughManager(timer: GameTimer) {
  const player = React.useContext(PlayerContext);
  let { stats, state, realm, updateContext } = player;
  const { currentTime, previousTime } = timer;
  React.useEffect(() => {
    if (state.action !== "breakthrough" || !state.realm) return;
    const elapsedTime = currentTime - previousTime;
    // Calculate damage dealt by both parties
    const playerDps = BreakthroughDps(
      { attack: stats.attack },
      { defence: state.realm.defence, healthRegen: state.realm.healthRegen }
    );
    const realmDps = TribulationDps(
      { attack: state.realm.attack },
      {
        defence: stats.defence,
        healthRegen: stats.healthRegen,
      }
    );
    const playerDamage = (playerDps * elapsedTime) / 1000;
    const realmDamage = (realmDps * elapsedTime) / 1000;

    const newRealmHealth = Math.min(
      state.realm.currentHealth - playerDamage,
      state.realm.health
    );
    const newPlayerHealth = Math.min(
      stats.currentHealth - realmDamage,
      stats.health
    );

    // Victory condition
    if (newRealmHealth <= 0) {
      // Update player realm
      const newRealm = CultivationRealms.find(
        (item) => item.name === state.realm?.name
      );
      if (newRealm) {
        realm.name = newRealm.name;
        realm.power = newRealm.realmPowers;
      }
      state = { action: "idle", realm: undefined };
      // Update player stats
      stats = playerStats(player);
      alert("Breakthrough success!");
    }
    // Loss condition
    else if (newPlayerHealth <= 0) {
      state = { action: "idle", realm: undefined };
      alert("Breakthrough failed, you are not strong enough yet");
    }
    // Update Hp values for both parties
    else {
      stats.currentHealth = newPlayerHealth;
      state.realm.currentHealth = newRealmHealth;
    }
    updateContext({ stats, state, realm });
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
