import { Box, Button, Typography, useTheme } from "@mui/material";
import CropSquareImage from "Components/shared/CropImage";
import { CultivationRealms } from "GameConstants/CultivationRealms";
import { InventoryTreasure, isInventoryTreasure } from "GameConstants/Player";
import { TreasureType } from "GameConstants/Treasures";
import PlayerContext from "GameEngine/Player/PlayerContext";
import { playerStats } from "GameEngine/Player/playerStats";
import PlayerStatsDictionary from "GameEngine/Player/PlayerStatsDictionary";
import React from "react";
import getSpacing from "Utils/getSpacing";

type Props = {
  treasure: InventoryTreasure | undefined;
  type: TreasureType;
};

// Player equipment card with its functionality
export default function EquipmentCard(props: Props) {
  const { treasure, type } = props;
  const theme = useTheme();
  const player = React.useContext(PlayerContext);
  let { inventory, stats, updateContext } = player;
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
  const { image, name, realmIndex } = treasure.stats;
  const { path, sizeX: size, x, y } = image;
  const realm = CultivationRealms[realmIndex];

  const TreasureDescription: TreasureDescriptionStatsLine[] = [];
  for (const [key, value] of Object.entries(treasure.stats.stats)) {
    TreasureDescription.push({
      text: PlayerStatsDictionary[key],
      effect: value,
    });
  }

  const unequipItem = (id: string) => {
    const index = inventory.findIndex((item) => item.id === id);
    if (index === -1) return;
    const treasure = inventory[index];
    if (!isInventoryTreasure(treasure)) return;
    treasure.isEquipped = false;
    stats = playerStats(player);
    updateContext({ inventory, stats });
    updateContext({ inventory });
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
        {TreasureDescription.map((item) => (
          <Typography
            key={item.text}
            variant="body1"
            marginLeft={`${32 + getSpacing(theme, 1)}px`}
          >
            {item.text} {item.effect.toFixed(2)}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

type TreasureDescriptionStatsLine = {
  text: string;
  effect: number;
};
