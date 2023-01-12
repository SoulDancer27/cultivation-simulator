import { defaultUpdateInterval } from "GameConstants/Constants";
import { CultivationRealms } from "GameConstants/CultivationRealms";
import React from "react";
import BreakthroughDps from "Utils/BreakthroughDps";
import CalculateFightDps from "Utils/CalculateFightDps";
import {
  playerAttack,
  playerDefence,
  playerHealth,
  playerHealthRegen,
} from "Utils/PlayerStats";
import TribulationDps from "Utils/RealmTribulationDps";
import GameContext, {
  gameContext,
  GameContextType,
} from "./GameContext/GameContext";
import PlayerContext from "./PlayerContext/PlayerContext";

// Wrapper for loading player save data
export default function GameContextLoader(props: any) {
  const player = React.useContext(PlayerContext);
  let { stats, state, realm, updateContext } = player;
  const [timer, setTimer] = React.useState(gameContext);
  /** Updates player context using shallow merge of UserContext attributes. */
  const updateGameContext = (newData: Partial<GameContextType>) =>
    setTimer((data) => ({ ...data, ...newData }));

  // Initializing the game loop
  React.useEffect(() => {
    // update the timers
    const interval = setInterval(() => {
      setTimer((timer) => ({
        previousTime: timer.currentTime,
        currentTime: Date.now(),
      }));
    }, defaultUpdateInterval);
    // clears the timer on component unmount to prevent memory leak
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Updating player data
  React.useEffect(() => {
    const elapsedTime = timer.currentTime - timer.previousTime;
    stats.age += elapsedTime;
    // Regen health if health is not full
    if (
      stats.currentHealth <= stats.health &&
      ["idle", "training"].includes(state.action)
    )
      stats.currentHealth = Math.min(
        stats.currentHealth + (playerHealthRegen(player) * elapsedTime) / 1000,
        playerHealth(player)
      );

    if (state.action === "training" && state.training) {
      for (const [key, value] of Object.entries(state.training.stats)) {
        stats[key] += (value * elapsedTime) / 1000;
      }
    }
    if (state.action === "fighting" && state.enemy) {
      // Calculate damage dealt by both parties
      const playerDps = CalculateFightDps(
        { attack: playerAttack(player) },
        { defence: state.enemy.defence, healthRegen: state.enemy.healthRegen }
      );
      const enemyDps = CalculateFightDps(
        { attack: state.enemy.attack },
        {
          defence: playerDefence(player),
          healthRegen: playerHealthRegen(player),
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
    }
    if (state.action === "breakthrough" && state.realm) {
      // Calculate damage dealt by both parties
      const playerDps = BreakthroughDps(
        { attack: playerAttack(player) },
        { defence: state.realm.defence, healthRegen: state.realm.healthRegen }
      );
      const realmDps = TribulationDps(
        { attack: state.realm.attack },
        {
          defence: playerDefence(player),
          healthRegen: playerHealthRegen(player),
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
    }
    updateContext({ stats, state, realm });
  }, [timer]);

  return (
    <GameContext.Provider
      value={{
        ...timer,
        updateContext: updateGameContext,
        setContext: setTimer,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
