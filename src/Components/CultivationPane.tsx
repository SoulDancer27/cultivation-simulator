import { Box } from "@mui/material";
import React from "react";
import ActiveManual from "./CultivationPane/ActiveManual";
import EquippedManuals from "./CultivationPane/EquippedManuals";
import ManualsList from "./CultivationPane/ManualsList";

export default function CultivationPane() {
  return (
    <Box>
      <ActiveManual />
      <EquippedManuals />
      <ManualsList />
    </Box>
  );
}
