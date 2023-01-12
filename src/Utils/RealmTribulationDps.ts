// Realm tribulation damage to the player during breakthrough attempt
type PlayerStats = {
  defence: number;
  healthRegen: number;
};

type RealmStats = {
  attack: number;
};
export default function TribulationDps(realm: RealmStats, player: PlayerStats) {
  return realm.attack / (1 + 0.01 * player.defence) - player.healthRegen;
}
