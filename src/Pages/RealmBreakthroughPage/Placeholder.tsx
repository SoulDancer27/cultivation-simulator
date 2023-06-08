import { Box, Typography, useTheme } from "@mui/material";
import { HtmlTooltip } from "Components";
import { PlayerBaseStats } from "GameConstants/Player";
import { useNumberParser } from "GameEngine";
import getSpacing from "Utils/getSpacing";
import { getWindowDimensions } from "Utils/useWindowDimensions";

type Props = {
  PassedTribulations: Array<{
    name: string;
    stepReached: number;
    statMulti: number;
    tribulationMulti: number;
  }>;
  currentPower: PlayerBaseStats;
};

export default function Placeholder(props: Props) {
  const { PassedTribulations, currentPower } = props;
  const parse = useNumberParser();
  const theme = useTheme();
  const { height } = getWindowDimensions();
  return (
    <Box paddingLeft={theme.spacing(2)} paddingTop={theme.spacing(2)}>
      <Box
        height={height - getSpacing(theme, 16)}
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        maxWidth={600}
      >
        <Typography variant="h4" marginBottom={theme.spacing(2)}>
          You have reached the pinnacle of cultivation
        </Typography>
        <Typography variant="h6">Passed tribulations</Typography>
        {PassedTribulations.map((item) => {
          return (
            <HtmlTooltip
              key={item.name}
              title={
                <>
                  <Typography>Multipliers:</Typography>
                  <Typography>Player stats: {parse(item.statMulti)}</Typography>
                  <Typography>
                    Tribulation power: {parse(item.tribulationMulti)}
                  </Typography>
                </>
              }
            >
              <Box>
                <Typography>
                  {item.name}: {item.stepReached}
                </Typography>
              </Box>
            </HtmlTooltip>
          );
        })}
        <Box
          border="1px solid gray"
          borderRadius={4}
          display="flex"
          alignItems={"center"}
          padding={theme.spacing(2)}
          gap={theme.spacing(4)}
        >
          <Box>
            <Typography>Health x {parse(currentPower.health)}</Typography>
            <Typography>
              Health regen x {parse(currentPower.healthRegen)}
            </Typography>
            <Typography>Attack x {parse(currentPower.attack)}</Typography>
            <Typography>Defence x {parse(currentPower.defence)}</Typography>
            <Typography>Insight x {parse(currentPower.insight)}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
