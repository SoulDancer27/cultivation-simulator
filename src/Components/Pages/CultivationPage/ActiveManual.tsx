import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
  useTheme,
} from "@mui/material";
import { levelExp, totalExp } from "GameConstants/CultivationManuals";
import PlayerContext from "GameEngine/Player/PlayerContext";
import { getStatName } from "GameEngine/Player/PlayerStatsDictionary";
import React from "react";

export default function ActiveManual() {
  const { state } = React.useContext(PlayerContext);
  const theme = useTheme();
  if (state.action !== "cultivating" || !state.manual)
    return (
      <Box
        width="60%"
        border="1px solid gray"
        height={theme.spacing(10)}
        borderRadius={theme.spacing(1)}
      >
        <Typography
          variant="h5"
          marginTop={theme.spacing(2)}
          marginLeft={theme.spacing(2)}
        >
          No manual selected
        </Typography>
      </Box>
    );
  const { manual, learningProgress } = state.manual;
  const { rarity, realm, maxLevel } = manual;

  const { exp, level } = learningProgress;
  const expForPrevLevel = totalExp(level);
  const expForNextLevel = levelExp(level + 1, rarity, realm);

  const ManualStatsDescription: ManualStatsDescription[] = [];
  if (manual.stats)
    for (const [key, value] of Object.entries(manual.stats)) {
      ManualStatsDescription.push({
        text: getStatName(key),
        effect: value * learningProgress.level,
      });
    }
  return (
    <Box width="60%" border="1px solid gray" borderRadius={theme.spacing(1)}>
      <Box
        display={"flex"}
        marginTop={theme.spacing(2)}
        marginLeft={theme.spacing(2)}
        alignItems="center"
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
        <Typography variant="h5">{manual.name}</Typography>
        <Typography marginLeft={theme.spacing(2)}>
          Level: {level} / {maxLevel}
        </Typography>

        <Box width={400} marginLeft={theme.spacing(4)}>
          <ProgressBar
            value={((exp - expForPrevLevel) / expForNextLevel) * 100}
            label={
              level !== maxLevel
                ? `Exp: ${(exp - expForPrevLevel).toFixed(
                    2
                  )}/${expForNextLevel}`
                : ""
            }
          />
        </Box>
      </Box>
      <Box
        marginLeft={theme.spacing(2)}
        marginBottom={theme.spacing(2)}
        display="flex"
      >
        <Typography>
          {manual.realm} ({manual.rarity})
        </Typography>
        {ManualStatsDescription.map((stat) => {
          return (
            <Typography key={stat.text} marginLeft={theme.spacing(2)}>
              {stat.text}: +{(stat.effect * 100).toFixed(2)}%
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
}

function ProgressBar(
  props: LinearProgressProps & { label: string; value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="body1" color="text.primary">
        {props.label}
      </Typography>
      <Box sx={{ width: "60%", m: 1 }}>
        <LinearProgress variant="determinate" color="primary" {...props} />
      </Box>
    </Box>
  );
}

type ManualStatsDescription = {
  text: string;
  effect: number;
};
