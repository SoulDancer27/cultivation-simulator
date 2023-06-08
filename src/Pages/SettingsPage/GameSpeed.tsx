import { Box, Slider, Typography } from "@mui/material";
import { SettingsContext } from "GameEngine";
import React from "react";

const marks = [
  {
    value: 1,
    label: 1,
  },
  {
    value: 2,
    label: 2,
  },
  {
    value: 3,
    label: 3,
  },
  {
    value: 5,
    label: 5,
  },
  {
    value: 10,
    label: 10,
  },
];

export default function GameSpeed() {
  const { gameSpeed, updateContext } = React.useContext(SettingsContext);

  return (
    <Box>
      <Typography variant="h6"> Game speed: </Typography>
      <Box width={"300px"}>
        <Slider
          defaultValue={gameSpeed}
          getAriaValueText={(value) => value.toString()}
          step={0.1}
          max={10}
          valueLabelDisplay="auto"
          marks={marks}
          onChangeCommitted={(event, value) => {
            updateContext({ gameSpeed: value as number });
          }}
        />
      </Box>
    </Box>
  );
}
