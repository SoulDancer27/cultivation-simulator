import { Box, Button, Typography } from "@mui/material";
import { PlayerCultivationManual } from "GameConstants/Player";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";

export default function EquippedManuals() {
  const { manuals } = React.useContext(PlayerContext);
  if (!manuals) return <Box />;
  const equipped = manuals.filter((item) => item.isEquipped);
  return (
    <Box>
      {equipped.map((item) => (
        <EquippedManualCard {...item} key={item.manual.name} />
      ))}
    </Box>
  );
}

function EquippedManualCard(props: PlayerCultivationManual) {
  const { manual } = props;
  let { manuals, state, updateContext } = React.useContext(PlayerContext);

  const selectButtonClick = () => {
    if (!manuals) return;
    const index = manuals.findIndex((item) => item.manual.name === manual.name);
    if (index === -1) return;
    updateContext({ state: { action: "cultivating", manual: manuals[index] } });
  };

  const unequipButtonClick = () => {
    if (!manuals) return;
    const index = manuals.findIndex((item) => item.manual.name === manual.name);
    if (index === -1) return;
    manuals[index].isEquipped = !manuals[index].isEquipped;
    if (state.manual && state.manual.manual.name === manual.name)
      state = { action: "idle" };
    updateContext({ manuals, state });
  };
  return (
    <Box>
      <Typography>{manual.name}</Typography>
      <Button variant="contained" onClick={selectButtonClick}>
        Study
      </Button>
      <Button variant="outlined" onClick={unequipButtonClick}>
        Unequip
      </Button>
    </Box>
  );
}
