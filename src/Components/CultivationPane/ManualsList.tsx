import { Box, Button, Typography } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import PlayerStatsDictionary from "GameEngine/Player/PlayerStatsDictionary";
import React from "react";

export default function ManualsList() {
  const { manuals, updateContext } = React.useContext(PlayerContext);
  if (!manuals) return <Box />;
  const storedManuals = manuals.filter((item) => !item.isEquipped);

  const equipButtonClick = (name: string) => {
    const index = manuals.findIndex((item) => item.manual.name === name);
    if (index === -1) return;
    manuals[index].isEquipped = !manuals[index].isEquipped;
    updateContext({ manuals });
  };

  return (
    <Box>
      {storedManuals.map((item) => {
        const { manual, learningProgress } = item;
        const ManualStatsDescription: ManualStatsDescription[] = [];
        for (const [key, value] of Object.entries(manual.stats)) {
          ManualStatsDescription.push({
            text: PlayerStatsDictionary[key],
            effect: value * learningProgress.level,
          });
        }
        return (
          <Box key={manual.name}>
            <Typography>{manual.name}</Typography>
            <Typography>
              Level: {learningProgress.level} / {manual.maxLevel}
            </Typography>
            {ManualStatsDescription.map((stat) => {
              return (
                <Typography key={stat.text}>
                  {stat.text}: {stat.effect}
                </Typography>
              );
            })}
            <Button
              variant="outlined"
              onClick={() => equipButtonClick(manual.name)}
            >
              Select
            </Button>
          </Box>
        );
      })}
    </Box>
  );
}

type ManualStatsDescription = {
  text: string;
  effect: number;
};
