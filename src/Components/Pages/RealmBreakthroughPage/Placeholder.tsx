import { Box, Typography, useTheme } from "@mui/material";
import HtmlTooltip from "Components/shared/HtmlTooltip";
import { PlayerBaseStats } from "GameConstants/Player";
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
                  <Typography>
                    Player stats: {item.statMulti.toFixed(2)}
                  </Typography>
                  <Typography>
                    Tribulation power: {item.tribulationMulti.toFixed(2)}
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
            <Typography>Health x {currentPower.health.toFixed(2)}</Typography>
            <Typography>
              Health regen x {currentPower.healthRegen.toFixed(2)}
            </Typography>
            <Typography>Attack x {currentPower.attack.toFixed(2)}</Typography>
            <Typography>Defence x {currentPower.defence.toFixed(2)}</Typography>
            <Typography>
              Insight x {currentPower.insight.toFixed(2)}{" "}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
