import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { GameContext } from "GameEngine";
import React from "react";
import EnemyRow from "./FightingPage/EnemyRow";

export default function FightingPage() {
  const { enemies } = React.useContext(GameContext);
  return (
    <Box marginTop={2} marginLeft={2}>
      <TableContainer sx={{ width: 800, height: 600, overflow: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>health</TableCell>
              <TableCell>attack</TableCell>
              <TableCell>defence</TableCell>
              <TableCell>healthRegen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enemies.map((enemy) => (
              <EnemyRow item={enemy} key={enemy.name} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
