import { Box } from "@mui/material";
import CropSquareImage from "../shared/CropImage";
import { GridItemType } from "Components/ItemGrid";
import { findItemDescription } from "GameConstants";

type Props = {
  width: number;
  height: number;
  item: GridItemType;
};

export default function BasicGridCell(props: Props) {
  const { width, height, item } = props;
  const description = findItemDescription(item.name, item.type);
  const { image } = description;

  return (
    <Box
      width={width}
      height={height}
      border="1px solid gray"
      display="flex"
      flexDirection="column"
      sx={{ justifyContent: "space-around", alignItems: "center" }}
    >
      <Box>
        <CropSquareImage
          path={image.path}
          size={image.sizeX}
          position={{ x: image.x, y: image.y }}
        />
      </Box>
      <Box>{item.name}</Box>
    </Box>
  );
}
