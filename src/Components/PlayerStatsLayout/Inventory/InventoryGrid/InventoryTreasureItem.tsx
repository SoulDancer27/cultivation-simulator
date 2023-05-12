import {
  Box,
  Button,
  ClickAwayListener,
  Popper,
  Typography,
} from "@mui/material";
import CropSquareImage from "Components/shared/CropImage";
import { CultivationRealms } from "GameConstants/CultivationRealms";
import { InventoryTreasure, isInventoryTreasure } from "GameConstants/Player";
import { TreasureType } from "GameConstants/Treasures";
import PlayerContext from "GameEngine/Player/PlayerContext";
import { playerStats } from "GameEngine/Player/playerStats";
import PlayerStatsDictionary from "GameEngine/Player/PlayerStatsDictionary";
import React from "react";
import EmptyCell from "./EmptyCell";

export default function InventoryTreasureItem(props: InventoryTreasure) {
  const { stats: treasure } = props;
  const realmName = CultivationRealms[treasure.realmIndex].name;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const player = React.useContext(PlayerContext);
  let { inventory, stats, updateContext } = player;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const dropItem = (id: string) => {
    const index = inventory.findIndex((item) => item.id === id);
    if (index === -1) return;
    inventory.splice(index, 1);
    updateContext({ inventory });
    setAnchorEl(null);
  };

  const equipItem = (id: string, type: TreasureType) => {
    const index = inventory.findIndex((item) => item.id === id);
    if (index === -1) return;
    // Check equipped items
    const equippedIndex = inventory.findIndex(
      (item) =>
        isInventoryTreasure(item) && item.isEquipped && item.stats.type === type
    );
    // Unequip item of the same type
    if (equippedIndex !== -1)
      (inventory[equippedIndex] as InventoryTreasure).isEquipped = false;
    (inventory[index] as InventoryTreasure).isEquipped = true;
    stats = playerStats(player);
    updateContext({ inventory, stats });
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  if (!treasure) return <EmptyCell />;

  const TreasureDescription: TreasureDescriptionStatsLine[] = [];
  for (const [key, value] of Object.entries(treasure.stats)) {
    TreasureDescription.push({
      text: PlayerStatsDictionary[key],
      effect: value,
    });
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <Box
          width={64}
          height={64}
          border="1px solid gray"
          display="flex"
          flexDirection="column"
          sx={{ justifyContent: "space-around", alignItems: "center" }}
          onClick={handleClick}
        >
          <Box>
            <CropSquareImage
              path={treasure.imagePath}
              size={treasure.size}
              position={{ x: treasure.x, y: treasure.y }}
            />
          </Box>
          <Box>
            <Typography variant="body2">{realmName}</Typography>
          </Box>
        </Box>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
            <Typography>{treasure.name}</Typography>
            <Typography>Quality: {treasure.quality.toFixed(2)}</Typography>
            {TreasureDescription.map((item) => (
              <Typography key={item.text} variant="body1">
                {item.text} {item.effect.toFixed(2)}
              </Typography>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={() => equipItem(props.id, props.stats.type)}
            >
              Equip
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => dropItem(props.id)}
            >
              Drop
            </Button>
          </Box>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}

type TreasureDescriptionStatsLine = {
  text: string;
  effect: number;
};
