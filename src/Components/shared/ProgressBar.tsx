import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";

export default function ProgressBar(
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
