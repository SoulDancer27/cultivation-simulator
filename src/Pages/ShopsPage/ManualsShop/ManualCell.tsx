import { Box, Typography } from "@mui/material";
import { BasicGridCell, CropSquareImage } from "Components";
import { Activity } from "GameConstants/Activities";
import { CultivationManualType } from "GameConstants/Items/CultivationManuals";
import findItemDescription from "GameConstants/utils/findItemDescription";

type Props = {
  width: number;
  height: number;
  item: CultivationManualType;
};

export default function ManualCell(props: Props) {
  const { width, height, item } = props;
  const { image } = item;

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
        <img
          src={image.path || "/manuals/placeholder.png"}
          width="60px"
          height="auto"
          alt=""
        ></img>
      </Box>
      <Box maxWidth={width} overflow="auto" whiteSpace={"nowrap"}>
        <Typography>{item.name}</Typography>
      </Box>
    </Box>
  );
}
