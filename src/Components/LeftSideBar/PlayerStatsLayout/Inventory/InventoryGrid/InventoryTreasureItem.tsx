import {
  Box,
  Button,
  ClickAwayListener,
  Popper,
  Typography,
} from "@mui/material";
import CropSquareImage from "Components/shared/CropImage";

import React from "react";
import EmptyCell from "./EmptyCell";
import {
  useNumberParser,
  PlayerContext,
  playerStats,
  playerSkills,
  getStatName,
} from "GameEngine";
import {
  InventoryTreasure,
  CultivationRealms,
  TreasureType,
  isInventoryTreasure,
} from "GameConstants";

// Draw inventory treasure item
export default function InventoryTreasureItem(props: InventoryTreasure) {
  const { item: treasure } = props;

  const realmName = CultivationRealms[treasure.realmIndex].name;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const parse = useNumberParser();
  const player = React.useContext(PlayerContext);
  let { inventory, stats, skills, updateContext } = player;

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
        isInventoryTreasure(item) && item.isEquipped && item.item.type === type
    );
    // Unequip item of the same type
    if (equippedIndex !== -1)
      (inventory[equippedIndex] as InventoryTreasure).isEquipped = false;
    (inventory[index] as InventoryTreasure).isEquipped = true;
    stats = playerStats(player);
    skills = playerSkills(player);
    updateContext({ inventory, stats, skills });
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  if (!treasure) return <EmptyCell />;

  const TreasureDescription: TreasureDescriptionStatsLine[] = [];
  const { stats: itemStats } = treasure;
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
              path={treasure.image.path}
              size={treasure.image.sizeX}
              position={{ x: treasure.image.x, y: treasure.image.y }}
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
            {TreasureDescription.map((item, index) => (
              <Typography key={index} variant="body1">
                {item.text} {item.effect}
              </Typography>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={() => equipItem(props.id, props.item.type)}
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
  effect: string;
};
