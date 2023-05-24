import {
  LinearProgressProps,
  Box,
  Typography,
  LinearProgress,
} from "@mui/material";

export default function HealthBar(
  props: LinearProgressProps & { label: string; value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ minWidth: 200 }}>
        <Typography variant="body1" color="text.primary">
          {props.label}
        </Typography>
      </Box>
      <Box sx={{ width: "50%", m: 1 }}>
        <LinearProgress variant="determinate" color="success" {...props} />
      </Box>
    </Box>
  );
}
