import {
  Box,
  Button,
  ClickAwayListener,
  Popper,
  Typography,
  useTheme,
} from "@mui/material";
import { PlayerCultivationManual } from "GameConstants/Player";
import { playerStats } from "GameEngine/Player/playerStats";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";

export default function EquippedManualCard(props: PlayerCultivationManual) {
  const { manual, learningProgress } = props;
  let player = React.useContext(PlayerContext);
  let { manuals, state, updateContext, stats } = player;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const selectButtonClick = () => {
    if (!manuals) return;
    const index = manuals.findIndex((item) => item.manual.name === manual.name);
    if (index === -1) return;
    updateContext({ state: { action: "cultivating", manual: manuals[index] } });
  };

  const unequipButtonClick = () => {
    if (!manuals) return;
    const index = manuals.findIndex((item) => item.manual.name === manual.name);
    if (index === -1) return;
    manuals[index].isEquipped = !manuals[index].isEquipped;
    if (state.manual && state.manual.manual.name === manual.name)
      state = { action: "idle" };
    stats = playerStats(player);
    updateContext({ manuals, state, stats });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        border="1px solid gray"
        width={120}
        height={200}
        borderRadius={theme.spacing(1)}
        onClick={handleClick}
      >
        <Box
          width={100}
          minHeight={60}
          marginY={theme.spacing(1)}
          display="flex"
          justifyContent={"center"}
        >
          <img
            src={manual.imagePath || "/manuals/placeholder.png"}
            width="60px"
            height="auto"
            alt=""
          ></img>
        </Box>
        <Box>
          <Typography variant="body2" marginLeft={theme.spacing(1)}>
            {manual.name}
          </Typography>
          <Typography variant="body2" marginLeft={theme.spacing(1)}>
            {learningProgress.level}/{manual.maxLevel}
          </Typography>
          <Typography variant="body2" marginLeft={theme.spacing(1)}>
            {manual.realm}
          </Typography>
        </Box>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
            <Button onClick={selectButtonClick} color="success">
              Study
            </Button>
            <Button onClick={unequipButtonClick} color="warning">
              Unequip
            </Button>
          </Box>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}
