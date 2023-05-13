import { Box } from "@mui/material";

type Props = {
  progress: number;
  isHeavenly: boolean;
};

export default function BreakthroughAnimation(props: Props) {
  const { progress, isHeavenly } = props;
  const bar = 400 * progress || 0;
  return (
    <Box position={"relative"}>
      <Box
        bgcolor={"black"}
        height={400}
        maxHeight={400}
        overflow="hidden"
        width={100}
        position="absolute"
        top={0}
        left={0}
        zIndex={2}
        sx={{ opacity: 0.3 }}
        border="3px solid gray"
        borderRadius={4}
      />
      <Box
        height={400}
        maxHeight={400}
        overflow="hidden"
        width={100}
        display="flex"
        flexDirection={"column"}
        position="absolute"
        top={0}
        left={0}
        borderRadius={4}
      >
        <Box
          height={400 - bar}
          minHeight={400 - bar}
          maxHeight={400 - bar}
          bgcolor="lightgrey"
          sx={{ opacity: 0.3 }}
        />
        <Box
          height={bar}
          minHeight={bar}
          maxHeight={bar}
          bgcolor={isHeavenly ? "rgb(51,157,255)" : "rgb(0, 153, 0)"}
        />
      </Box>
    </Box>
  );
}
