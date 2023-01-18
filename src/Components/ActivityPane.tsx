import { Box } from "@mui/material";
import Villages from "GameConstants/Villages";
import ActivityButton from "./ActivityPane/ActivityButton";

export default function ActivityPane() {
  const Activities = Villages[0].actions;

  return (
    <Box>
      <Box display="flex">
        {Activities &&
          Activities.map((activity) => (
            <ActivityButton action={activity} key={activity.name} />
          ))}
      </Box>
    </Box>
  );
}
