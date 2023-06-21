import { Button, TableCell, TableRow } from "@mui/material";
import { EnemyType } from "GameConstants/Fighting/Enemies";
import { PlayerContext } from "GameEngine";
import React from "react";
import EnemyTooltip from "./EnemyTooltip";
import { useNumberParser, withTooltip } from "@SoulDancer27/idle-rpg-lib";

type Props = {
  item: any;
};
const EnemyRow = withTooltip<Props>((props) => {
  const enemy = props.item as EnemyType;
  const { name, health, attack, defence, healthRegen } = enemy;
  const parse = useNumberParser();
  const { state, updateContext } = React.useContext(PlayerContext);
  const isActive =
    state.action === "fighting" && state.enemy
      ? state.enemy.name === name
      : false;
  const handleClick = () => {
    if (isActive) {
      updateContext({ state: { action: "idle", enemy: undefined } });
      return;
    }
    const currentEnemy = JSON.parse(JSON.stringify(enemy));
    currentEnemy.currentHealth = currentEnemy.health;
    updateContext({
      state: { action: "fighting", enemy: currentEnemy },
    });
  };
  const enemyHealthLabel =
    isActive && state.enemy
      ? `${parse(state.enemy.health)}/${parse(state.enemy.currentHealth)}`
      : parse(health);
  return (
    <TableRow>
      <TableCell
        onClick={props.toggleTooltip}
        onMouseOver={props.showTooltip}
        onMouseOut={props.hideTooltip}
      >
        {name}
      </TableCell>
      <TableCell onClick={props.toggleTooltip}>{enemyHealthLabel}</TableCell>
      <TableCell onClick={props.toggleTooltip}>{parse(attack)}</TableCell>
      <TableCell onClick={props.toggleTooltip}>{parse(defence)}</TableCell>
      <TableCell onClick={props.toggleTooltip}>{parse(healthRegen)}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          onClick={handleClick}
          color={isActive ? "warning" : "primary"}
        >
          {isActive ? "Flee" : "Fight"}
        </Button>
      </TableCell>
    </TableRow>
  );
}, EnemyTooltip);

export default EnemyRow;
