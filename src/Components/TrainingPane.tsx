import { Box, Typography } from "@mui/material";
import PlayerContext from "Context/PlayerContext/PlayerContext";
import React, { Dispatch, SetStateAction } from "react";
import PlayerStatsDictionary from "Utils/PlayerStatsDictionary";
import Trainings, { TrainingType } from "GameConstants/Trainings";
import { PlayerState } from "GameConstants/Player";

export default function TrainingPane() {
  const { state, updateContext } = React.useContext(PlayerContext);
  const currentTrainingName = state.training?.name || "";
  return (
    <Box>
      <Typography>Train</Typography>
      {Trainings.map((training) => (
        <TrainingButton
          name={training.name}
          stats={training.stats}
          isActive={currentTrainingName === training.name}
          key={training.name}
        />
      ))}
    </Box>
  );
}

type TrainingButtonProps = TrainingType & {
  isActive: boolean;
};

function TrainingButton(props: TrainingButtonProps) {
  const { name, stats, isActive } = props;
  const { updateContext } = React.useContext(PlayerContext);

  const TrainingDescription: TrainingButtonStatsLine[] = [];
  for (const [key, value] of Object.entries(stats)) {
    TrainingDescription.push({
      text: PlayerStatsDictionary[key],
      effect: value,
    });
  }

  const handleClick = () => {
    const newPlayerState: PlayerState = isActive
      ? { action: "idle" }
      : {
          action: "training",
          training: { name, stats },
        };
    updateContext({ state: newPlayerState });
  };
  return (
    <Box bgcolor={isActive ? "lightgray" : "white"} onClick={handleClick}>
      <Typography>{name}</Typography>
      {TrainingDescription.map((item) => (
        <Typography key={item.text}>
          {item.text} {item.effect}
        </Typography>
      ))}
    </Box>
  );
}

type TrainingButtonStatsLine = {
  text: string;
  effect: number;
};
