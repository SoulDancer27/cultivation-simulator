// Stats that matter for the fighting actor
type PlayerStats = {
  attack: number;
};

type RealmStats = {
  defence: number;
  healthRegen: number;
};
export default function BreakthroughDps(
  player: PlayerStats,
  realm: RealmStats
) {
  return player.attack / (1 + 0.01 * realm.defence) - realm.healthRegen;
}
