import { Box, Button, useTheme } from "@mui/material";
import React from "react";
import Equipment from "./Equipment";
import Inventory from "./Inventory";

type Layout = "inventory" | "equipment";

export default function PlayerStatsLayout() {
  const [panel, selectPanel] = React.useState<Layout>("inventory");
  const theme = useTheme();
  return (
    <>
      <Box width={512} height={32} paddingBottom={theme.spacing(5)}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => selectPanel("inventory")}
          color={panel === "inventory" ? "success" : "primary"}
        >
          Inventory
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => selectPanel("equipment")}
          color={panel === "equipment" ? "success" : "primary"}
        >
          Equipment
        </Button>
      </Box>
      <Box width={512} height={512}>
        {panel === "inventory" ? <Inventory /> : ""}
        {panel === "equipment" ? <Equipment /> : ""}
      </Box>
    </>
  );
}
