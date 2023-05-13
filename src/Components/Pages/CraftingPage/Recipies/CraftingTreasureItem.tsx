import {
  Box,
  Button,
  ClickAwayListener,
  Popper,
  Typography,
} from "@mui/material";
import CropSquareImage from "Components/shared/CropImage";
import { CultivationRealms } from "GameConstants/CultivationRealms";
import Treasures from "GameConstants/Treasures";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import EmptyCell from "./EmptyCell";
import { Activity, ActivityItem } from "GameConstants/Activities";
import parseTime from "Utils/parseTime";
import ActivityPrice from "./ActivityPrice";

type Props = {
  activity: Activity;
};

export default function CraftingTreasureItem(props: Props) {
  const { activity } = props;
  const { name, amount } = (activity.result.items as ActivityItem[])[0];
  const treasure = Treasures.find((treasure) => treasure.name === name);
  if (!treasure) return <EmptyCell />;
  const realmName = CultivationRealms[treasure.realmIndex].name;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const player = React.useContext(PlayerContext);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  if (!treasure) return <EmptyCell />;

  const craftTime =
    typeof activity.time === "function" ? activity.time() : activity.baseTime;

  const craftTimeLabel =
    craftTime < 1000
      ? (1000 / craftTime).toFixed(2) + "/s"
      : parseTime(craftTime);

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
            <Typography variant="h6">{treasure.name}</Typography>
            <Typography>Craft time: {craftTimeLabel}</Typography>
            {activity.price?.items ? (
              <ActivityPrice price={activity.price.items} />
            ) : (
              ""
            )}
          </Box>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}
