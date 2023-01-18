import { Box, Typography, useTheme } from "@mui/material";
import InventoryFilters from "./Inventory/InventoryFilters";
import InventoryGrid from "./Inventory/InventoryGrid";

export default function Inventory() {
  const theme = useTheme();
  return (
    <Box paddingLeft={theme.spacing(1)}>
      <Typography variant="h5" marginTop={theme.spacing(2)}>
        Inventory
      </Typography>
      <Box display="flex">
        <InventoryGrid />
        <InventoryFilters />
      </Box>
    </Box>
  );
}
