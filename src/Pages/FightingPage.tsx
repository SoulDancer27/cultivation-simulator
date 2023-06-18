import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { GameContext } from "GameEngine";
import React from "react";
import EnemyRow from "./FightingPage/EnemyRow";
import { Table } from "Components";
import EnemyTooltip from "./FightingPage/EnemyTooltip";

export default function FightingPage() {
  const { enemies } = React.useContext(GameContext);
  return (
    <Box>
      <Table
        width={600}
        maxHeight={600}
        items={enemies}
        HeaderRow={HeaderRow}
        Row={EnemyRow}
        RowTooltip={EnemyTooltip}
      />
    </Box>
  );
}

function HeaderRow() {
  return (
    <>
      <TableCell>name</TableCell>
      <TableCell>health</TableCell>
      <TableCell>attack</TableCell>
      <TableCell>defence</TableCell>
      <TableCell>healthRegen</TableCell>
    </>
  );
}
