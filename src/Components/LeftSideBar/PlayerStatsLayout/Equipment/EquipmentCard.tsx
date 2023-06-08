import { Box, Button, Typography, useTheme } from "@mui/material";
import CropSquareImage from "Components/shared/CropImage";

import React from "react";
import getSpacing from "Utils/getSpacing";
import {
  useNumberParser,
  getStatName,
  playerStats,
  playerSkills,
  PlayerContext,
} from "GameEngine";
import {
  InventoryTreasure,
  TreasureType,
  CultivationRealms,
  isInventoryTreasure,
} from "GameConstants";

type Props = {
  treasure: InventoryTreasure | undefined;
  type: TreasureType;
};

// Player equipment card with its functionality
export default function EquipmentCard(props: Props) {
  const { treasure, type } = props;
  const theme = useTheme();
  const player = React.useContext(PlayerContext);
  const parse = useNumberParser();
  let { inventory, stats, skills, updateContext } = player;
  if (!treasure)
    return (
      <Box width={512} border="1px solid gray" borderRadius={theme.spacing(1)}>
        <Box display="flex" margin={theme.spacing(1)}>
          <Box width={32} height={32} bgcolor="lightgray"></Box>
          <Box marginLeft={theme.spacing(1)} marginTop={theme.spacing(-1)}>
            <Typography>Nothing ({type})</Typography>
          </Box>
        </Box>
      </Box>
    );
  const { image, name, realmIndex, stats: itemStats } = treasure.item;
  const { path, sizeX: size, x, y } = image;
  const realm = CultivationRealms[realmIndex];

  // Prepare treausre description
  const TreasureDescription: TreasureDescriptionStatsLine[] = [];
  if (itemStats.stats) {
    for (const [key, value] of Object.entries(itemStats.stats)) {
      TreasureDescription.push({
        text: getStatName(key),
        effect: parse(value),
      });
    }
  }
  if (itemStats.skills) {
    for (const [key, value] of Object.entries(itemStats.skills)) {
      TreasureDescription.push({
        text: getStatName(key),
        effect: parse(value),
      });
    }
  }
  if (itemStats.statsMulti) {
    for (const [key, value] of Object.entries(itemStats.statsMulti)) {
      TreasureDescription.push({
        text: getStatName(key),
        effect: parse(value * 100) + "%",
      });
    }
  }
  if (itemStats.skillsMulti) {
    for (const [key, value] of Object.entries(itemStats.skillsMulti)) {
      TreasureDescription.push({
        text: getStatName(key),
        effect: parse(value * 100) + "%",
      });
    }
  }

  const unequipItem = (id: string) => {
    const index = inventory.findIndex((item) => item.id === id);
    if (index === -1) return;
    const treasure = inventory[index];
    if (!isInventoryTreasure(treasure)) return;
    treasure.isEquipped = false;
    stats = playerStats(player);
    skills = playerSkills(player);
    updateContext({ inventory, stats, skills });
  };
  return (
    <Box width={512} border="1px solid gray" borderRadius={theme.spacing(1)}>
      <Box margin={theme.spacing(1)}>
        <Box width={512} display="flex">
          <CropSquareImage path={path} size={size} position={{ x: x, y: y }} />
          <Box marginLeft={theme.spacing(1)} marginTop={theme.spacing(-1)}>
            <Typography>
              {name} ({type})
            </Typography>
            <Typography>{realm.name}</Typography>
          </Box>
          <Button
            variant="contained"
            color="warning"
            size="small"
            sx={{ maxHeight: 32, minHeight: 32, margin: "auto" }}
            onClick={() => unequipItem(treasure.id)}
          >
            Unequip
          </Button>
        </Box>
        {TreasureDescription.map((item, index) => (
          <Typography
            key={index}
            variant="body1"
            marginLeft={`${32 + getSpacing(theme, 1)}px`}
          >
            {item.text} {item.effect}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

type TreasureDescriptionStatsLine = {
  text: string;
  effect: string;
};
