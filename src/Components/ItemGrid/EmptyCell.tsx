import { Box } from "@mui/material";

type Props = {
  width: number;
  height: number;
};

// Just a placeholder white square for grids
export default function EmptyCell(props: Props) {
  const { width, height } = props;
  return <Box width={width} height={height} border="1px solid gray" />;
}
