import { Box } from "@mui/material";

type CropImageProps = {
  path: string;
  box: { x: number; y: number };
  position: { x: number; y: number };
};
export function CropImage(props: CropImageProps) {
  const { path, box, position } = props;
  return (
    <Box width={box.x} height={box.y} overflow="hidden">
      <img
        src={path}
        alt="copper coin"
        style={{ top: -position.y, left: -position.x, position: "relative" }}
      />
    </Box>
  );
}

type CropSquareImageProps = {
  path: string;
  size: number;
  position: { x: number; y: number };
};

export default function CropSquareImage(props: CropSquareImageProps) {
  const { size, path, position } = props;
  return (
    <CropImage path={path} box={{ x: size, y: size }} position={position} />
  );
}
