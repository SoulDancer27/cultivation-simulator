import { Box, useTheme } from "@mui/material";

export default function PlaceholderCard() {
  const theme = useTheme();
  return (
    <Box
      border="1px solid gray"
      width={120}
      height={200}
      borderRadius={theme.spacing(1)}
    ></Box>
  );
}
