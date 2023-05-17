import { Box, Button, Typography } from "@mui/material";
import { Enemies, EnemyType } from "GameConstants/Enemies";
import {
  usePlayerState,
  useSetPlayerState,
} from "GameEngine/Player/PlayerContext";

// Currently unused
export default function EnemyPage() {
  return (
    <Box>
      {Enemies.map((enemy) => (
        <EnemyCard enemy={enemy} key={enemy.name} />
      ))}
    </Box>
  );
}

type EnemyCardProps = {
  enemy: EnemyType;
};

function EnemyCard(props: EnemyCardProps) {
  const { enemy } = props;
  const { name, health, attack, defence, healthRegen } = enemy;
  const { state } = usePlayerState();
  const setContext = useSetPlayerState();
  const currentEnemy = state.enemy;
  const isActive = currentEnemy && currentEnemy.name === name;
  const currentHealth = isActive
    ? currentEnemy.currentHealth.toFixed(2)
    : health;

  function handleClick() {
    setContext((prev) => ({
      ...prev,
      ...{
        state: {
          action: isActive ? "idle" : "fighting",
          enemy: isActive
            ? undefined
            : { ...structuredClone(enemy), currentHealth: enemy.health },
        },
      },
    }));
  }
  return (
    <Box>
      <Typography>{name}</Typography>
      <Typography>Hp: {currentHealth}</Typography>
      <Typography>Hp.regen: {healthRegen}</Typography>
      <Typography>Atk: {attack}</Typography>
      <Typography>Def: {defence}</Typography>
      <Button onClick={handleClick} variant="outlined">
        {isActive ? "Flee" : "Fight"}
      </Button>
    </Box>
  );
}
