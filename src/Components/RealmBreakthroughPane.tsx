import { Box, Button, Typography } from "@mui/material";
import PlayerContext from "Context/PlayerContext/PlayerContext";
import {
  CultivationRealms,
  CultivationRealmType,
} from "GameConstants/CultivationRealms";
import React from "react";

export default function RealmBreakthroughPane() {
  const { state, realm } = React.useContext(PlayerContext);
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
  const { name, health, healthRegen, attack, defence } = realm;
  return (
    <Box>
      <Typography>{realm.name}</Typography>
      <Typography>Tribulation power:</Typography>
      <Typography>Hp: {health}</Typography>
      <Typography>Hp.regen: {healthRegen}</Typography>
      <Typography>Atk: {attack}</Typography>
      <Typography>Def: {defence}</Typography>
    </Box>
  );
}

/*
function BreakthroughButton(props: {
  enemy: EnemyType;
  isActive: boolean;
  setActiveEnemyName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { enemy, isActive, setActiveEnemyName } = props;
  const { updateContext } = React.useContext(PlayerContext);
  function handleClick() {
    setActiveEnemyName(isActive ? "" : enemy.name);
    updateContext({
      state: {
        action: isActive ? "idle" : "fighting",
        enemy: isActive ? undefined : structuredClone(enemy),
      },
    });
  }
  return (
    <Button onClick={handleClick} variant="outlined">
      {isActive ? "Flee" : "Fight"}
    </Button>
  );
}
*/
