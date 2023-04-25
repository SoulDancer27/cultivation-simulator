import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";

type Props = {
  label: string;
  value: number;
  rightLabel?: boolean;
} & LinearProgressProps;

export default function ProgressBar(props: Props) {
  const { label, rightLabel, ...rest } = props;
  const isRight = rightLabel;
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {!isRight && (
        <Typography variant="body1" color="text.primary">
          {label}
        </Typography>
      )}
      <Box sx={{ width: "60%", m: 1 }}>
        <LinearProgress variant="determinate" color="primary" {...rest} />
      </Box>
      {isRight && (
        <Typography variant="body1" color="text.primary">
          {label}
        </Typography>
      )}
    </Box>
  );
}
