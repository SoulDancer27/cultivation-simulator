import { Box, Button, Typography } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import {
  CultivationRealms,
  CultivationRealmType,
} from "GameConstants/CultivationRealms";
import React from "react";

export default function RealmBreakthroughPane() {
  const { realm } = React.useContext(PlayerContext);
  const currentRealm = CultivationRealms.find(
    (value) => value.name === realm.name
  );
  const currentRealmIndex =
    currentRealm && CultivationRealms.indexOf(currentRealm);
  const nextRealm =
    currentRealmIndex !== undefined
      ? CultivationRealms.length >= currentRealmIndex + 2
        ? CultivationRealms[currentRealmIndex + 1]
        : undefined
      : undefined;

  return (
    <Box>
      {nextRealm ? (
        <BreakthroughCard realm={nextRealm} />
      ) : (
        "You reached a pinnacle of power!"
      )}
    </Box>
  );
}

function BreakthroughCard(props: { realm: CultivationRealmType }) {
  const { realm } = props;
  const { name, healthRegen, attack, defence } = realm;
  const { state, updateContext } = React.useContext(PlayerContext);
  const isActive = state.action === "breakthrough";
  const currentHealth = state.realm?.currentHealth.toFixed(2) || realm.health;
  const handleClick = () => {
    state.action = isActive ? "idle" : "breakthrough";
    state.realm = isActive
      ? undefined
      : { ...structuredClone(realm), currentHealth: realm.health };
    updateContext({ state });
  };
  return (
    <Box>
      <Typography>{name}</Typography>
      <Typography>Tribulation power:</Typography>
      <Typography>Hp: {currentHealth}</Typography>
      <Typography>Hp.regen: {healthRegen}</Typography>
      <Typography>Atk: {attack}</Typography>
      <Typography>Def: {defence}</Typography>
      <Button onClick={handleClick} variant="outlined">
        {isActive ? "Stop" : "Breakthrough"}
      </Button>
    </Box>
  );
}
