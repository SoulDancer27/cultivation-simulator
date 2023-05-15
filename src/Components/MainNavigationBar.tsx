import { Box, Button, Paper, useTheme } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import getSpacing from "Utils/getSpacing";
import { getWindowDimensions } from "Utils/useWindowDimensions";
import ManualsPage from "./Pages/ManualsPage";
import RealmBreakthroughPage from "./Pages/RealmBreakthroughPage";
import GameContext from "GameEngine/GameContext/GameContext";
import breakthroughSuccess from "./Pages/RealmBreakthroughPage/breakthroughSuccess";
import MiningPage from "./Pages/MiningPage";
import CraftingPage from "./Pages/CraftingPage";
import TrainingPage from "./Pages/TrainingPage";
import ActionsPage from "./Pages/ActionsPage";
import ActivityCard from "./shared/ActivityCards/Activity";
import MiningActivityCard from "./shared/ActivityCards/MiningActivity";
import { NavigationBarPages } from "GameConstants/GameContent";

export type ActivePage = (typeof NavigationBarPages)[number];

// Switches between different pages
export default function MainNavigationBar() {
  const { width, height } = getWindowDimensions();
  const theme = useTheme();
  const { state, stats, realm } = React.useContext(PlayerContext);
  const { cultivationRealms } = React.useContext(GameContext);
  // For the breakthrough custom button color
  const canBreakthrough = breakthroughSuccess(
    stats,
    cultivationRealms[realm.index + 1]
  );
  let startingPage: ActivePage = "Training";
  if (state.action === "cultivating") startingPage = "Manuals";
  const [page, setPage] = React.useState<ActivePage>(startingPage);

  function buttonColor(page, item): any {
    let color = "primary";
    if (page === item) color = "success";
    if (page !== item && canBreakthrough && item === "Breakthrough")
      color = "warning";
    return color;
  }

  return (
    <Box width={width - 512} height={height - getSpacing(theme, 8)}>
      <Paper elevation={2}>
        <Box width={width - 512}>
          {NavigationBarPages.map((item) => (
            <Button
              variant="outlined"
              size="large"
              color={buttonColor(page, item)}
              onClick={() => setPage(item)}
              sx={{ margin: theme.spacing(2) }}
              key={item}
            >
              {item}
            </Button>
          ))}
        </Box>
      </Paper>
      {page === "Training" ? (
        <ActionsPage source={"trainings"} Card={ActivityCard} />
      ) : (
        ""
      )}
      {page === "Manuals" ? <ManualsPage /> : ""}
      {page === "Breakthrough" ? <RealmBreakthroughPage /> : ""}
      {page === "Mining" ? (
        <ActionsPage source={"mining"} Card={MiningActivityCard} />
      ) : (
        ""
      )}
      {page === "Crafting" ? <CraftingPage /> : ""}
    </Box>
  );
}
