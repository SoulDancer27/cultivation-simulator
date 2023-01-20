import {
  Box,
  Button,
  ClickAwayListener,
  Popper,
  Typography,
  useTheme,
} from "@mui/material";
import CropSquareImage from "Components/shared/CropImage";
import { CultivationRealms } from "GameConstants/CultivationRealms";
import { InventoryTreasure, isInventoryTreasure } from "GameConstants/Player";
import PlayerContext from "GameEngine/Player/PlayerContext";
import PlayerStatsDictionary from "GameEngine/Player/PlayerStatsDictionary";
import React from "react";
import EmptyCell from "./EmptyCell";

export default function InventoryTreasureItem(props: InventoryTreasure) {
  const { stats: treasure } = props;
  const realmName = CultivationRealms[treasure.realmIndex].name;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { inventory, updateContext } = React.useContext(PlayerContext);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const dropItem = (id: number) => {
    const index = inventory.findIndex((item) => item.id === id);
    if (index === -1) return;
    inventory.splice(index, 1);
    updateContext({ inventory });
    setAnchorEl(null);
  };

  const equipItem = (id: number) => {
    const index = inventory.findIndex((item) => item.id === id);
    if (index === -1) return;
    const item = inventory[index];
    if (!isInventoryTreasure(item)) return;
    item.isEquipped = !item.isEquipped;
    updateContext({ inventory });
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
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          onResize={undefined}
          onResizeCapture={undefined}
        >
          <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
            <Typography>{treasure.name}</Typography>
            {TreasureDescription.map((item) => (
              <Typography key={item.text} variant="body1">
                {item.text} {item.effect}
              </Typography>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={() => equipItem(props.id)}
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
