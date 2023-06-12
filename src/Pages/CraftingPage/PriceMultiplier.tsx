import { Box, Input, Paper, Typography } from "@mui/material";
import { Activity } from "GameConstants/Activities";
import { GameContext } from "GameEngine";
import React from "react";

type Props = {
  activity: Activity;
};

export default function PriceMultiplier(props: Props) {
  const { activity } = props;
  const { crafting, updateContext } = React.useContext(GameContext);
  const multi = activity.price?.priceMulti || 1;

  const handleChange = (event) => {
    try {
      const newMulti = parseInt(event.target.value);
      if (isNaN(newMulti)) throw new Error(`Price multiplier is not a number`);
      const index = crafting.findIndex((craft) => craft.name === activity.name);
      if (index === -1) return;
      if (crafting[index].price)
        (crafting[index].price as any).priceMulti = newMulti;
      updateContext({ crafting: crafting.slice() });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Paper
      elevation={8}
      sx={{
        borderRadius: 2,
        minHeight: 60,
        border: "1px solid lightgray",
        borderColor: "lightgray",
        padding: 1,
        minWidth: 60,
      }}
    >
      <Box display="flex" flexDirection={"column"} minHeight={60} height="100%">
        <Typography>Price Multi</Typography>
        <Input defaultValue={multi} onChange={handleChange} />
      </Box>
    </Paper>
  );
}
