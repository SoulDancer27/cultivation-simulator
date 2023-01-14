import { Box, Typography } from "@mui/material";
import { levelExp, totalExp } from "GameConstants/CultivationManuals";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";

export default function ActiveManual() {
  const { state } = React.useContext(PlayerContext);
  if (state.action !== "cultivating" || !state.manual) return <Box />;
  const { rarity, realm, maxLevel } = state.manual.manual;
  const { exp, level } = state.manual.learningProgress;
  const expForPrevLevel = totalExp(level);
  const expForNextLevel = levelExp(level + 1, rarity, realm);
  return (
    <Box>
      <Typography>Learning Manual</Typography>
      <Typography>Name: {state.manual.manual.name}</Typography>
      <Typography>
        Level: {level} / {maxLevel}
      </Typography>
      <Typography>
        {level !== maxLevel
          ? `Exp: ${(exp - expForPrevLevel).toFixed(2)}/${expForNextLevel}`
          : ""}
      </Typography>
    </Box>
  );
}
