import { TooltipProps, Typography, useTheme } from "@mui/material";
import HtmlTooltip from "Components/shared/HtmlTooltip";
import PlayerContext from "GameEngine/Player/PlayerContext";
import { getStatStructure } from "GameEngine/Player/playerStats";
import React from "react";

export default function StatDetailsTooltip(
  props: Omit<TooltipProps, "title"> & { stat: string }
) {
  const player = React.useContext(PlayerContext);
  const statStructure = getStatStructure(props.stat, player);
  const theme = useTheme();
  return (
    <HtmlTooltip
      title={
        <>
          <Typography color="inherit">Character {props.stat}</Typography>
          <Typography>
            Base {props.stat}: {statStructure.base.toFixed(2)}
          </Typography>
          <Typography>
            Realm bonus:
            <Typography
              color={
                statStructure.realm >= 1
                  ? theme.palette.success.main
                  : theme.palette.error.main
              }
              display="inline"
            >
              {" "}
              x{statStructure.realm}
            </Typography>
          </Typography>
          <Typography>
            Manuals bonus:
            <Typography
              color={
                statStructure.manuals >= 1
                  ? theme.palette.success.main
                  : theme.palette.error.main
              }
              display="inline"
            >
              {" "}
              x{statStructure.manuals}
            </Typography>
          </Typography>
        </>
      }
    >
      {props.children}
    </HtmlTooltip>
  );
}
