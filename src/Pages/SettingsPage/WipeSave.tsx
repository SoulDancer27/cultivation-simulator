import { Button } from "@mui/material";

import React from "react";

export default function WipeSave() {
  const handleClick = () => {
    localStorage.removeItem("player");
    localStorage.removeItem("game");
  };

  return (
    <Button variant="outlined" color="error" onClick={handleClick}>
      Wipe Save
    </Button>
  );
}
