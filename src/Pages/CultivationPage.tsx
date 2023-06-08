import { Box } from "@mui/material";
import ActiveManual from "./CultivationPage/ActiveManual";
import EquippedManuals from "./CultivationPage/EquippedManuals";
import ManualsList from "./CultivationPage/ManualsList";

export default function CultivationPage() {
  return (
    <Box>
      <ActiveManual />
      <EquippedManuals />
      <ManualsList />
    </Box>
  );
}
