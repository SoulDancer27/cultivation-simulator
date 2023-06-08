import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import SettingsContext from "GameEngine/SettingsContext/SettingContext";
import React from "react";

export default function NumberNotation() {
  const { notation, updateContext } = React.useContext(SettingsContext);
  return (
    <Box>
      <Typography variant="h6">Number Notation</Typography>
      <FormControl>
        <RadioGroup defaultValue={notation} name="radio-buttons-group">
          <FormControlLabel
            value="trivial"
            control={<Radio />}
            label="trivial"
            onClick={() => updateContext({ notation: "trivial" })}
          />
          <FormControlLabel
            value="exponential"
            control={<Radio />}
            label="exponential"
            onClick={() => updateContext({ notation: "exponential" })}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
