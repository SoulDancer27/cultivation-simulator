import { Box, Typography } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import Trainings, { TrainingType } from "GameConstants/Trainings";
import { PlayerState } from "GameConstants/Player";
import PlayerStatsDictionary from "GameEngine/Player/PlayerStatsDictionary";
import TrainingButton from "./TrainingPane/TrainingButton";

export default function TrainingPane() {
  const { state } = React.useContext(PlayerContext);
  const currentTrainingName =
    state.action === "training" ? state.training?.name || "" : "";
  return (
    <Box>
      <Typography variant="h5">Train</Typography>
      <Box display="flex">
        {Trainings.map((training) => (
          <TrainingButton
            name={training.name}
            stats={training.stats}
            isActive={currentTrainingName === training.name}
            key={training.name}
          />
        ))}
      </Box>
    </Box>
  );
}
