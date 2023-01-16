import { Box, Button, Typography } from "@mui/material";
import Treasures, { TreasureType } from "GameConstants/Treasures";
import PlayerContext from "GameEngine/Player/PlayerContext";
import PlayerStatsDictionary from "GameEngine/Player/PlayerStatsDictionary";
import React from "react";

export default function TreasuresList() {
  const { updateContext, inventory } = React.useContext(PlayerContext);

  const takeTreasure = (treasure: TreasureType) => {
    inventory.push({ type: "treasure", id: Date.now(), stats: treasure });
    updateContext({ inventory });
  };
  return (
    <Box>
      {Treasures.map((item) => {
        const TreasureDescription: TreasureDescriptionLine[] = [];
        for (const [key, value] of Object.entries(item.stats)) {
          TreasureDescription.push({
            text: PlayerStatsDictionary[key],
            effect: value,
          });
        }
        return (
          <Box>
            <Typography>{item.name}</Typography>
            {TreasureDescription.map((line) => {
              return (
                <Typography>
                  {line.text}: {line.effect}
                </Typography>
              );
            })}
            <Button onClick={() => takeTreasure(item)} variant="outlined">
              Take
            </Button>
          </Box>
        );
      })}
    </Box>
  );
}

type TreasureDescriptionLine = {
  text: string;
  effect: number;
};
