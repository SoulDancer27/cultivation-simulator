import { Box, Typography } from "@mui/material";
import CropSquareImage from "../shared/CropImage";
import findItemDescription from "GameConstants/utils/findItemDescription";
import { ItemType } from "GameConstants/Interfaces";

type Props = {
  width: number;
  height: number;
  item: { name: string; type: ItemType };
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
      <Box maxWidth={width} overflow="auto" whiteSpace={"nowrap"}>
        <Typography>{item.name}</Typography>
      </Box>
    </Box>
  );
}
