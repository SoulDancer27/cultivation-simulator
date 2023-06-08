import { Box, Slider, Typography } from "@mui/material";
import SettingsContext from "GameEngine/SettingsContext/SettingContext";
import React from "react";

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
  const { tickRate, updateContext } = React.useContext(SettingsContext);

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
            updateContext({ tickRate: value as number });
          }}
        />
      </Box>
    </Box>
  );
}
