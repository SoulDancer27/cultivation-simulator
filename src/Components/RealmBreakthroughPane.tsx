import { Box, Button, Typography } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import { CultivationRealms } from "GameConstants/CultivationRealms";
import React from "react";
import calculateTribulationPower from "GameEngine/shared/calculateTribulationPower";

export default function RealmBreakthroughPane() {
  const { realm } = React.useContext(PlayerContext);
  const currentRealm = CultivationRealms[realm.index];
  const nextRealmIndex =
    CultivationRealms.length >= realm.index + 2 ? realm.index + 1 : undefined;

  return (
    <Box>
      {nextRealmIndex ? (
        <BreakthroughCard realmIndex={nextRealmIndex} />
      ) : (
        "You reached a pinnacle of power!"
      )}
    </Box>
  );
}

function BreakthroughCard(props: { realmIndex: number }) {
  const { realmIndex } = props;
  const realm = CultivationRealms[realmIndex];
  const power = calculateTribulationPower(realmIndex, CultivationRealms);
  const { healthRegen, attack, defence, health } = power;
  const { state, updateContext } = React.useContext(PlayerContext);
  const isActive = state.action === "breakthrough";
  const currentHealth = state.realm?.currentHealth || health;
  const handleClick = () => {
    state.action = isActive ? "idle" : "breakthrough";
    state.realm = isActive
      ? undefined
      : {
          ...realm,
          index: realmIndex,
          currentHealth: health,
          health,
          attack,
          defence,
          healthRegen,
        };
    updateContext({ state });
  };

  // Effective values to display
  let stepReached = 1;
  let multiplier = 1;
  if (state.realm?.tribulation) {
    stepReached = state.realm.tribulation.stepReached || 0;
    multiplier = state.realm.tribulation.multiplier;
  }
  const powerFactor = multiplier ** stepReached;
  const effCurrentHealth = currentHealth;
  const effHealthRegen = healthRegen * powerFactor;
  const effAttack = attack * powerFactor;
  const effDefence = defence * powerFactor;
  return (
    <Box>
      <Typography>{realm.name}</Typography>
      <Typography>Tribulation power:</Typography>
      <Typography>Hp: {effCurrentHealth.toFixed(2)}</Typography>
      <Typography>Hp.regen: {effHealthRegen.toFixed(2)}</Typography>
      <Typography>Atk: {effAttack.toFixed(2)}</Typography>
      <Typography>Def: {effDefence.toFixed(2)}</Typography>
      <Button onClick={handleClick} variant="outlined">
        {isActive ? "Stop" : "Breakthrough"}
      </Button>
    </Box>
  );
}
