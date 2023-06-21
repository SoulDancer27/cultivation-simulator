import { Box, Button, Paper } from "@mui/material";
import ManualsShop from "./ShopsPage/ManualsShop";
import {
  useContentSelector,
  useWindowDimensions,
} from "@SoulDancer27/idle-rpg-lib";

const shops = {
  Manuals: <ManualsShop />,
};

export default function ShopsPage() {
  const { state, states, setState, Content } = useContentSelector(
    "Manuals",
    shops
  );
  return (
    <Box>
      <ShopsMenu state={state} states={states} setState={setState} />
      <Content />
    </Box>
  );
}

const ShopsMenu = (props: {
  state: string;
  states: string[];
  setState: (item: any) => void;
}) => {
  const { state, states, setState } = props;
  const { width } = useWindowDimensions();

  return (
    <Paper elevation={2}>
      <Box width={width - 512}>
        {states.map((item) => (
          <Button
            variant="outlined"
            size="large"
            color={state === item ? "info" : "primary"}
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
