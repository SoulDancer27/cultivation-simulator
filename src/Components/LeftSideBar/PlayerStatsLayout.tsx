import { Box, Button, useTheme } from "@mui/material";
import React from "react";
import Equipment from "./PlayerStatsLayout/Equipment";
import Inventory from "./PlayerStatsLayout/Inventory";
import Stats from "./PlayerStatsLayout/Stats";
import Skills from "./PlayerStatsLayout/Skills";

type Layout = "inventory" | "equipment" | "stats" | "skills";

// Menu to switch between inventory, equipment and player stats displays
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
        <Button
          variant="outlined"
          size="small"
          onClick={() => selectPanel("stats")}
          color={panel === "stats" ? "success" : "primary"}
        >
          Stats
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => selectPanel("skills")}
          color={panel === "skills" ? "success" : "primary"}
        >
          Skills
        </Button>
      </Box>
      <Box width={512} height={512} overflow="auto">
        {panel === "inventory" ? <Inventory /> : ""}
        {panel === "equipment" ? <Equipment /> : ""}
        {panel === "stats" ? <Stats /> : ""}
        {panel === "skills" ? <Skills /> : ""}
      </Box>
    </>
  );
}
