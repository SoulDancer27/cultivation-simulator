import { Box } from "@mui/material";
import PlayerStatsPane from "./LeftSideBar/PlayerStatsPane";
import PlayerLocationPane from "./LeftSideBar/PlayerLocationPane";
import PlayerStatsLayout from "./LeftSideBar/PlayerStatsLayout";

export default function LeftSideBar() {
  return (
    <Box borderRight={"1px solid gray"}>
      <PlayerStatsPane
        displayStats={[
          { name: "Health Regen", stat: "healthRegen" },
          { name: "Attack", stat: "attack" },
          { name: "Defence", stat: "defence" },
          { name: "Insight", stat: "insight" },
        ]}
      />
      <PlayerStatsLayout />
      <PlayerLocationPane />
    </Box>
  );
}
