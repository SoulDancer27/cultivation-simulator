import { Box, Button, Input } from "@mui/material";
import { gameContent } from "GameConstants/GameContent";
import GameContext from "GameEngine/GameContext/GameContext";
import PlayerContext, { playerContext } from "GameEngine/Player/PlayerContext";
import React from "react";

export default function WipeSave() {
  const { setContext: setPlayer } = React.useContext(PlayerContext);
  const { setContext: setGame } = React.useContext(GameContext);

  const handleClick = () => {
    setPlayer(playerContext);
    setGame(gameContent);
    localStorage.removeItem("player");
    localStorage.removeItem("game");
  };

  return (
    <Button variant="outlined" color="error" onClick={handleClick}>
      Wipe Save
    </Button>
  );
}
