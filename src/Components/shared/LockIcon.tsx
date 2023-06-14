import { Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

export default function LockIcon(props: {
  isLocked: boolean;
  fontSize?: "small" | "inherit" | "medium" | "large";
}) {
  const { isLocked, fontSize } = props;
  return (
    <Box>
      {isLocked ? (
        <LockOutlinedIcon fontSize={fontSize || "medium"} />
      ) : (
        <LockOpenOutlinedIcon fontSize={fontSize || "medium"} />
      )}
    </Box>
  );
}
