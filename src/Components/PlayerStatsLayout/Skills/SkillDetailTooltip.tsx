import { TooltipProps, Typography, useTheme } from "@mui/material";
import HtmlTooltip from "Components/shared/HtmlTooltip";
import PlayerContext from "GameEngine/Player/PlayerContext";
import { getSkillStructure } from "GameEngine/Player/playerSkills";
import React from "react";

export default function SkillDetailsTooltip(
  props: Omit<TooltipProps, "title"> & { skill: string }
) {
  const player = React.useContext(PlayerContext);
  const skillStructure = getSkillStructure(props.skill, player);
  const theme = useTheme();

  return (
    <HtmlTooltip
      title={
        <>
          <Typography color="inherit">Character {props.skill}</Typography>
          <Typography>
            Base {props.skill}: {skillStructure.base.toFixed(2)}
          </Typography>

          <Typography>
            Manuals bonus:
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
              x{skillStructure.manuals}
            </Typography>
          </Typography>
        </>
      }
    >
      {props.children}
    </HtmlTooltip>
  );
}
