import { Box, Slider, Typography } from "@mui/material";
import { changeTickRate, selectTickRate } from "engine/features/settingsSlice";
import { useAppSelector, useAppDispatch } from "engine/hooks";

const marks = [
  {
    value: 1,
    label: 1,
  },
  {
    value: 5,
    label: 5,
  },
  {
    value: 15,
    label: 15,
  },
  {
    value: 30,
    label: 30,
  },
  {
    value: 50,
    label: 50,
  },
  {
    value: 100,
    label: 100,
  },
];

export default function TickRate() {
  const tickRate = useAppSelector(selectTickRate);
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Typography variant="h6"> Game tick rate: </Typography>
      <Box width={"300px"}>
        <Slider
          defaultValue={tickRate}
          getAriaValueText={(value) => value.toString()}
          step={1}
          valueLabelDisplay="auto"
          marks={marks}
          onChangeCommitted={(event, value) => {
            dispatch(changeTickRate({ tickRate: value as number }));
          }}
        />
      </Box>
    </Box>
  );
}
