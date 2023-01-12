import { CultivationRealms } from "GameConstants/CultivationRealms";
import { PlayerRealm, PlayerState, PlayerStats } from "GameConstants/Player";

type BreakthroughState = {
  stats: PlayerStats;
  state: PlayerState;
  realm: PlayerRealm;
  elapsedTime: number;
};

type BreakthroughResult = {
  stats: PlayerStats;
  state: PlayerState;
  realm: PlayerRealm;
};

export default function breakthroughManager(
  props: BreakthroughState
): BreakthroughResult {
  let { stats, state, elapsedTime, realm } = props;
  // Typeguard
  if (state.action !== "breakthrough" || !state.realm)
    return { state, stats, realm };

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

  const newRealmHealth = state.realm.health - playerDamage;
  const newPlayerHealth = stats.currentHealth - realmDamage;

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
    state.realm.health = newRealmHealth;
  }
  return { state, stats, realm };
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
