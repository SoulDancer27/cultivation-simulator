import { Box, Button, Typography, useTheme } from "@mui/material";
import { CultivationRealms } from "GameConstants/Cultivation/CultivationRealms";
import PlayerContext from "GameEngine/Player/PlayerContext";
import { playerStats } from "GameEngine/Player/playerStats";
import { getStatName } from "GameEngine/Player/PlayerStatsDictionary";
import React from "react";

export default function ManualsList() {
  const player = React.useContext(PlayerContext);
  let { manuals, updateContext, stats } = player;
  const theme = useTheme();
  if (!manuals) return <Box />;
  let storedManuals = manuals.filter((item) => !item.isEquipped);

  // Sort manuals by realm
  storedManuals.sort((a, b) => {
    const aIndex = CultivationRealms.findIndex(
      (item) => item.name === a.manual.realm
    );
    const bIndex = CultivationRealms.findIndex(
      (item) => item.name === b.manual.realm
    );
    return bIndex - aIndex;
  });
  const canSelect = manuals.filter((item) => item.isEquipped).length < 10;

  const equipButtonClick = (name: string) => {
    if (!canSelect || !manuals) return;
    const index = manuals.findIndex((item) => item.manual.name === name);
    if (index === -1) return;
    manuals[index].isEquipped = !manuals[index].isEquipped;
    stats = playerStats(player);
    updateContext({ manuals, stats });
  };

  return (
    <Box>
      <Typography variant="h5" marginY={theme.spacing(2)}>
        Known manuals
      </Typography>
      {storedManuals.map((item) => {
        const { manual, learningProgress } = item;
        const ManualStatsDescription: ManualStatsDescription[] = [];
        if (manual.stats)
          for (const [key, value] of Object.entries(manual.stats)) {
            ManualStatsDescription.push({
              text: getStatName(key),
              effect: value * learningProgress.level,
            });
          }
        const ManualSkillsDescription: ManualStatsDescription[] = [];
        if (manual.skills)
          for (const [key, value] of Object.entries(manual.skills)) {
            ManualSkillsDescription.push({
              text: getStatName(key),
              effect: value * learningProgress.level,
            });
          }
        return (
          <Box
            key={manual.name}
            display="flex"
            alignItems={"center"}
            width={500}
          >
            <Box>
              <Typography>
                {manual.name} {manual.realm} ({manual.rarity})
              </Typography>
              <Typography>
                Level: {learningProgress.level} / {manual.maxLevel}
              </Typography>
              {ManualStatsDescription.map((stat) => {
                return (
                  <Typography key={stat.text}>
                    {stat.text}: {(stat.effect * 100).toFixed(2)}%
                  </Typography>
                );
              })}
              {ManualSkillsDescription.map((skill) => {
                return (
                  <Typography key={skill.text}>
                    {skill.text}: {(skill.effect * 100).toFixed(2)}%
                  </Typography>
                );
              })}
            </Box>
            <Button
              variant="outlined"
              onClick={() => equipButtonClick(manual.name)}
              sx={{
                maxHeight: theme.spacing(4),
                minHeight: theme.spacing(4),
                margin: "auto",
              }}
              disabled={!canSelect}
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
