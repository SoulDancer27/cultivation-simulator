import { PlayerState, PlayerStats } from "GameConstants/Player";

type FightState = {
  stats: PlayerStats;
  state: PlayerState;
  elapsedTime: number;
};

type FightResult = {
  stats: PlayerStats;
  state: PlayerState;
};

export default function fightManager(props: FightState): FightResult {
  let { stats, state, elapsedTime } = props;
  // Typeguard
  if (state.action !== "fighting" || !state.enemy) return { state, stats };
  // Calculate damage dealt by both parties
  const playerDps = FightDps(
    { attack: stats.attack },
    { defence: state.enemy.defence, healthRegen: state.enemy.healthRegen }
  );
  const enemyDps = FightDps(
    { attack: state.enemy.attack },
    {
      defence: stats.defence,
      healthRegen: stats.healthRegen,
    }
  );
  const playerDamage = (playerDps * elapsedTime) / 1000;
  const enemyDamage = (enemyDps * elapsedTime) / 1000;

  const newEnemyHealth = state.enemy.health - playerDamage;

  const newPlayerHealth = stats.currentHealth - enemyDamage;

  // Victory condition
  if (newEnemyHealth <= 0) {
    state = { action: "idle", enemy: undefined };
    alert("You defeated an enemy!");
  }
  // Loss condition
  else if (newPlayerHealth <= 0) {
    state = { action: "idle", enemy: undefined };
    alert("Enemy was too strong and you had to escape");
  }
  // Update Hp values for both parties
  else {
    stats.currentHealth = newPlayerHealth;
    state.enemy.health = newEnemyHealth;
  }
  return { state, stats };
}

// Stats that matter for the fighting actor
type AttackerStats = {
  attack: number;
};

type DefenderStats = {
  defence: number;
  healthRegen: number;
};
function FightDps(attacker: AttackerStats, defender: DefenderStats) {
  return attacker.attack / (1 + 0.01 * defender.defence) - defender.healthRegen;
}
