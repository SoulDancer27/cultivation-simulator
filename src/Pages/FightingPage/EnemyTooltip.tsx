import { useNumberParser } from "@SoulDancer27/idle-rpg-lib";
import { Box, Typography } from "@mui/material";
import ItemDescriptions from "Components/shared/ItemDescriptions";
import { EnemyType } from "GameConstants/Fighting/Enemies";
import { getStatName } from "GameEngine";

export default function EnemyTooltip(props: { item: EnemyType }) {
  const enemy = props.item;
  const { health, healthRegen, defence, attack } = enemy;
  const parse = useNumberParser();
  let description: Array<JSX.Element> = [];
  for (const [key, value] of Object.entries({
    health,
    attack,
    healthRegen,
    defence,
  })) {
    description.push(
      <Typography key={key}>
        {getStatName(key)}: {parse(value)}
      </Typography>
    );
  }
  return (
    <Box bgcolor={"background.paper"} border={1} padding={2}>
      <Typography variant="h6">{enemy.name}</Typography>
      <Typography marginY={1}>{enemy.description}</Typography>
      {description}

      {enemy.result.items && (
        <>
          <Typography variant="h6" marginTop={2}>
            Reward
          </Typography>
          <ItemDescriptions items={enemy.result.items} />
        </>
      )}
    </Box>
  );
}
