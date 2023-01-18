import { Box, Typography } from "@mui/material";
import PlayerContext from "GameEngine/Player/PlayerContext";
import React from "react";
import Villages from "GameConstants/Villages";
import ActivityButton from "./ActivityPane/ActivityButton";

export default function ActivityPane() {
  const { state } = React.useContext(PlayerContext);
  const currentActivityName =
    state.action === "activity" ? state.activity?.name || "" : "";
  const Activities = Villages[0].actions;

  return (
    <Box>
      <Box display="flex">
        {Activities &&
          Activities.map((activity) => (
            <ActivityButton
              action={activity}
              isActive={activity.name === currentActivityName}
              key={activity.name}
            />
          ))}
      </Box>
    </Box>
  );
}
