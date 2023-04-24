import { Box, Typography } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import Trainings from "GameConstants/Trainings";
import TrainingButton from "./TrainingPane/TrainingButton";
import GameContext from "GameEngine/GameContext/GameContext";

export default function TrainingPane() {
  /*
  const { state } = React.useContext(PlayerContext);
  const currentTrainingName =
    state.action === "activity" ? state?.activity?.name || "" : "";
  return (
    <Box>
      <Typography variant="h5">Train</Typography>
      <Box display="flex">
        {Trainings.map((training) => (
          <TrainingButton
            name={training.name}
            stats={training.result.baseStats}
            isActive={currentTrainingName === training.name}
            key={training.name}
          />
        ))}
      </Box>
    </Box>
  );
  */
}
