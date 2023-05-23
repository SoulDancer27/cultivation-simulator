import { Box, Button } from "@mui/material";
import { saveAs } from "file-saver";

export default function ExportSave() {
  const handleClick = () => {
    try {
      let playerData = localStorage.getItem("player");
      let gameData = localStorage.getItem("game");
      if (!gameData || !playerData)
        throw new Error("Save data not found in local storage");
      const save = {
        player: JSON.parse(playerData),
        game: JSON.parse(gameData),
      };
      const blob = new Blob([JSON.stringify(save)], {
        type: "application/json;charset=utf-8",
      });
      saveAs(blob, "save.json");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <Button variant="outlined" color="success" onClick={handleClick}>
        Export Save
      </Button>
    </Box>
  );
}
