import { Box, Typography, useTheme } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import { getWindowDimensions } from "Utils/useWindowDimensions";
import EquippedManualCard from "./EquippedManuals/EquippedManualCard";
import PlaceholderCard from "./EquippedManuals/PlaceholderCard";

export default function EquippedManuals() {
  const { manuals } = React.useContext(PlayerContext);
  const { width } = getWindowDimensions();
  const theme = useTheme();
  const equippedManuals = manuals?.filter((manual) => manual.isEquipped);
  const tileIndex = Array(10)
    .fill(0)
    .map((element, index) => index);
  return (
    <>
      <Typography
        variant="h5"
        marginTop={theme.spacing(2)}
        marginBottom={theme.spacing(2)}
      >
        Equipped Manuals
      </Typography>
      <Box display="flex" flexWrap={"wrap"} maxWidth={width - 512}>
        {tileIndex.map((index) => {
          if (equippedManuals && equippedManuals[index])
            return (
              <EquippedManualCard {...equippedManuals[index]} key={index} />
            );
          return <PlaceholderCard key={index} />;
        })}
      </Box>
    </>
  );
}
