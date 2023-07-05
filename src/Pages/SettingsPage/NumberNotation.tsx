import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import {
  changeNotation,
  selectNotation,
} from "GameEngine/store/features/settingsSlice";
import { useAppDispatch, useAppSelector } from "GameEngine/store/hooks";

export default function NumberNotation() {
  const notation = useAppSelector(selectNotation);
  const dispatch = useAppDispatch();
  return (
    <Box>
      <Typography variant="h6">Number Notation</Typography>
      <FormControl>
        <RadioGroup defaultValue={notation} name="radio-buttons-group">
          <FormControlLabel
            value="trivial"
            control={<Radio />}
            label="trivial"
            onClick={() => dispatch(changeNotation({ notation: "trivial" }))}
          />
          <FormControlLabel
            value="exponential"
            control={<Radio />}
            label="exponential"
            onClick={() =>
              dispatch(changeNotation({ notation: "exponential" }))
            }
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
