import { Box, Typography } from "@mui/material";

type Props = {
  data: any;
};

export default function TreasureTooltip(props: Props) {
  return (
    <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
      <Typography variant="h6">Test</Typography>
    </Box>
  );
}
