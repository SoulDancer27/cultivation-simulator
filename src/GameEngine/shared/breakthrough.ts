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
