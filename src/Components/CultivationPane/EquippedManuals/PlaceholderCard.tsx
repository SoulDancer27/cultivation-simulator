import { Box, useTheme } from "@mui/material";

export default function PlaceholderCard() {
  const theme = useTheme();
  return (
    <Box
      border="1px solid gray"
      width={100}
      height={150}
      borderRadius={theme.spacing(1)}
    ></Box>
  );
}
