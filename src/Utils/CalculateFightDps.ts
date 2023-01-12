// Stats that matter for the fighting actor
type AttackerStats = {
  attack: number;
};

type DefenderStats = {
  defence: number;
  healthRegen: number;
};
export default function CalculateFightDps(
  attacker: AttackerStats,
  defender: DefenderStats
) {
  return attacker.attack / (1 + 0.01 * defender.defence) - defender.healthRegen;
}
