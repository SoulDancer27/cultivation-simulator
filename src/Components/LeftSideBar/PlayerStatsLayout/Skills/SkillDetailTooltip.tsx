import { TooltipProps, Typography, useTheme } from "@mui/material";
import HtmlTooltip from "Components/shared/HtmlTooltip";
import { PlayerContext, getSkillStructure, useNumberParser } from "GameEngine";
import React from "react";

// Provides description
export default function SkillDetailsTooltip(
  props: Omit<TooltipProps, "title"> & { skill: string }
) {
  const player = React.useContext(PlayerContext);
  const skillStructure = getSkillStructure(props.skill, player);
  const parse = useNumberParser();
  const theme = useTheme();

  return (
    <HtmlTooltip
      title={
        <>
          <Typography color="inherit">Character {props.skill}</Typography>
          <Typography>
            Base {props.skill}: {parse(skillStructure.base)}
          </Typography>

          <Typography>
            Manuals multi:
            <Typography
              component="span"
              color={
                skillStructure.manuals >= 1
                  ? theme.palette.success.main
                  : theme.palette.error.main
              }
              display="inline"
            >
              {" "}
              x{parse(skillStructure.manuals)}
            </Typography>
          </Typography>
          <Typography>
            Treasures Multi:
            <Typography
              component="span"
              color={
                skillStructure.treasuresMulti >= 1
                  ? theme.palette.success.main
                  : theme.palette.error.main
              }
              display="inline"
            >
              {" "}
              x{parse(skillStructure.treasuresMulti)}
            </Typography>
          </Typography>
          <Typography>
            Treasures bonus:
            <Typography
              component="span"
              color={
                skillStructure.treasures >= 0
                  ? theme.palette.success.main
                  : theme.palette.error.main
              }
              display="inline"
            >
              {" "}
              +{parse(skillStructure.treasures)}
            </Typography>
          </Typography>
        </>
      }
    >
      {props.children}
    </HtmlTooltip>
  );
}
