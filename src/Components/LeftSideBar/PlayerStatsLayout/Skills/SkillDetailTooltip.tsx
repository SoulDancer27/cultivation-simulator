import { TooltipProps, Typography, useTheme } from "@mui/material";
import HtmlTooltip from "Components/shared/HtmlTooltip";
import { usePlayerState } from "GameEngine/Player/PlayerContext";
import { getSkillStructure } from "GameEngine/Player/playerSkills";

// Provides description
export default function SkillDetailsTooltip(
  props: Omit<TooltipProps, "title"> & { skill: string }
) {
  const player = usePlayerState();
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
              x{skillStructure.manuals}
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
              x{skillStructure.treasuresMulti}
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
              +{skillStructure.treasures}
            </Typography>
          </Typography>
        </>
      }
    >
      {props.children}
    </HtmlTooltip>
  );
}
