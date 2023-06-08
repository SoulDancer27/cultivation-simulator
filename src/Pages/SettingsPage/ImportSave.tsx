import { Box, Button, Input } from "@mui/material";
import { PlayerContext, GameContext } from "GameEngine";
import React from "react";

export default function ImportSave() {
  const { setContext: setPlayer } = React.useContext(PlayerContext);

  const { setContext: setGame } = React.useContext(GameContext);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      const input = event.target as HTMLInputElement;
      if (input.files === null) {
        throw new Error("No files submitted!");
      }
      const file = input.files.item(0);
      if (!file) throw new Error("File is undefined");
      const text = await file.text();
      const data = JSON.parse(text);
      if (!data.game || !data.player)
        throw new Error("Wrong data format, should be {game, player}");
      setPlayer(data.player);
      setGame(data.game);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <form encType="multipart/form-data" onChange={(event) => submit(event)}>
        <Button
          variant="outlined"
          color="primary"
          component="label"
          htmlFor="fileimport"
        >
          Import Save
        </Button>
        <Input type="file" id="fileimport" style={{ display: "none" }} />
      </form>
    </Box>
  );
}
