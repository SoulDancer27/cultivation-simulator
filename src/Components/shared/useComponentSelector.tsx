import { Box, Button, Paper, useTheme } from "@mui/material";
import ActivityCard from "Components/ActivityCards/Activity";
import GatheringActivityCard from "Components/ActivityCards/GatheringActivity";
import { PlayerContext, GameContext } from "GameEngine";
import ActionsPage from "Pages/ActionsPage";
import CraftingPage from "Pages/CraftingPage";
import FightingPage from "Pages/FightingPage";
import ManualsPage from "Pages/ManualsPage";
import RealmBreakthroughPage from "Pages/RealmBreakthroughPage";
import breakthroughSuccess from "Pages/RealmBreakthroughPage/breakthroughSuccess";
import getSpacing from "Utils/getSpacing";
import useWindowDimensions from "Utils/useWindowDimensions";
import React from "react";

export type State = { [key: string]: () => JSX.Element };

export const states = {
  Training: <ActionsPage source={"trainings"} Card={ActivityCard} />,
  Manuals: <ManualsPage />,
  Breakthrough: <RealmBreakthroughPage />,
  Mining: <ActionsPage source={"mining"} Card={GatheringActivityCard} />,
  Crafting: <CraftingPage />,
  Gathering: <ActionsPage source={"gathering"} Card={GatheringActivityCard} />,
  Fighting: <FightingPage />,
};

export default function useComponentSelector(
  defaultComponent: string,
  components: Record<string, JSX.Element>
) {
  const [state, setState] = React.useState<string>(defaultComponent);
  const Content = () => components[state];
  return { state, Content, setState, states: Object.keys(components) };
}

export const MainWindow = (props: { states: Record<string, JSX.Element> }) => {
  const { width, height } = useWindowDimensions();
  const theme = useTheme();
  const { state, setState, states, Content } = useComponentSelector(
    "Training",
    props.states
  );
  return (
    <Box width={width - 512} height={height - getSpacing(theme, 8)}>
      <Menu state={state} setState={setState} states={states} />
      <Content />
    </Box>
  );
};

const Menu = (props: {
  state: string;
  states: string[];
  setState: (item: any) => void;
}) => {
  const { state, states, setState } = props;
  const { width } = useWindowDimensions();
  const player = React.useContext(PlayerContext);
  const { cultivationRealms } = React.useContext(GameContext);
  // For the breakthrough custom button color
  const canBreakthrough = breakthroughSuccess(
    player,
    cultivationRealms[player.realm.index + 1]
  );

  function buttonColor(page, item): any {
    let color = "primary";
    if (page === item) color = "success";
    if (canBreakthrough && item === "Breakthrough") color = "warning";
    return color;
  }
  return (
    <Paper elevation={2}>
      <Box width={width - 512}>
        {states.map((item) => (
          <Button
            variant="outlined"
            size="large"
            color={buttonColor(state, item)}
            onClick={() => setState(item)}
            sx={{ margin: 2 }}
            key={item}
          >
            {item}
          </Button>
        ))}
      </Box>
    </Paper>
  );
};
