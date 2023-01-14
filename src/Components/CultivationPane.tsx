import { Box } from "@mui/material";
import React from "react";
import EquippedManuals from "./CultivationPane/EquippedManuals";
import ManualsList from "./CultivationPane/ManualsList";

export default function CultivationPane() {
  return (
    <Box>
      <EquippedManuals />
      <ManualsList />
    </Box>
  );
}
