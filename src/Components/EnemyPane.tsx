import { Box, Button, Typography } from "@mui/material";
import PlayerContext from "Context/PlayerContext/PlayerContext";
import { Enemies, EnemyType } from "GameConstants/Enemies";
import React from "react";

export default function EnemyPane() {
  const [activeEnemyName, setActiveEnemyName] = React.useState<string>("");
  const { state } = React.useContext(PlayerContext);

  React.useEffect(() => {
    setActiveEnemyName(state.enemy?.name || "");
  }, [state.enemy?.name]);

  return (
    <Box>
      {Enemies.map((enemy) => (
        <EnemyCard
          enemy={enemy}
          isActive={activeEnemyName === enemy.name}
          setActiveEnemyName={setActiveEnemyName}
          key={enemy.name}
        />
      ))}
    </Box>
  );
}

type EnemyCardProps = {
  enemy: EnemyType;
  isActive: boolean;
  setActiveEnemyName: React.Dispatch<React.SetStateAction<string>>;
};

function EnemyCard(props: EnemyCardProps) {
  const { enemy, isActive, setActiveEnemyName } = props;
  const { name, health, attack, defence, healthRegen } = enemy;
  const { state } = React.useContext(PlayerContext);
  const currentHealth = isActive
    ? state.enemy
      ? state.enemy.health.toFixed(2)
      : health
    : health;
  return (
    <Box>
      <Typography>{name}</Typography>
      <Typography>Hp: {currentHealth}</Typography>
      <Typography>Hp.regen: {healthRegen}</Typography>
      <Typography>Atk: {attack}</Typography>
      <Typography>Def: {defence}</Typography>
      <FightButton
        enemy={enemy}
        isActive={isActive}
        setActiveEnemyName={setActiveEnemyName}
      />
    </Box>
  );
}

function FightButton(props: {
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
