import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { EnemyType } from "GameConstants/Enemies";

type Props = {
  item: any;
};
export default function EnemyRow(props: Props) {
  const enemy = props.item as EnemyType;
  const { name, health, attack, defence, healthRegen } = enemy;
  return (
    <>
      <TableCell>{name}</TableCell>
      <TableCell>{health}</TableCell>
      <TableCell>{attack}</TableCell>
      <TableCell>{defence}</TableCell>
      <TableCell>{healthRegen}</TableCell>
    </>
  );
}
