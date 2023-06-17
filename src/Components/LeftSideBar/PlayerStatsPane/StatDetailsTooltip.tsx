import { TooltipProps, Typography, useTheme } from "@mui/material";
import HtmlTooltip from "Components/shared/HtmlTooltip";
import { PlayerContext, getStatStructure, useNumberParser } from "GameEngine";

import React from "react";

export default function StatDetailsTooltip(
  props: Omit<TooltipProps, "title"> & { stat: string }
) {
  const player = React.useContext(PlayerContext);
  const statStructure = getStatStructure(props.stat, player);
  const parse = useNumberParser();
  const theme = useTheme();

  return (
    <HtmlTooltip
      title={
        <>
          <Typography color="inherit">Character {props.stat}</Typography>
          <Typography>
            Base {props.stat}: {parse(statStructure.base)}
          </Typography>
          <Typography>
            Realm bonus:
            <Typography
              component="span"
              color={
                statStructure.realm >= 1
                  ? theme.palette.success.main
                  : theme.palette.error.main
              }
              display="inline"
            >
              {" "}
              x{parse(statStructure.realm)}
            </Typography>
          </Typography>
          <Typography>
            Manuals bonus:
            <Typography
              component="span"
              color={
                statStructure.manuals >= 1
                  ? theme.palette.success.main
                  : theme.palette.error.main
              }
              display="inline"
            >
              {" "}
              x{parse(statStructure.manuals)}
            </Typography>
          </Typography>
          <Typography>
            Treasures multi:
            <Typography
              component="span"
              color={
                statStructure.treasuresMulti >= 1
                  ? theme.palette.success.main
                  : theme.palette.error.main
              }
              display="inline"
            >
              {" "}
              x{parse(statStructure.treasuresMulti)}
            </Typography>
          </Typography>
          <Typography>
            Treasures bonus:
            <Typography
              component="span"
              color={
                statStructure.treasures >= 0
                  ? theme.palette.success.main
                  : theme.palette.error.main
              }
              display="inline"
            >
              {" "}
              +{parse(statStructure.treasures)}
            </Typography>
          </Typography>
        </>
      }
    >
      {props.children}
    </HtmlTooltip>
  );
}
