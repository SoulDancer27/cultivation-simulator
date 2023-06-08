import { Box } from "@mui/material";
import CropSquareImage from "./CropImage";
import findItemDescription from "GameConstants/utils/findItemDescription";
import { ActivityItem } from "GameConstants/Activities/Activities";

// Generates item descriptions in the format Image Name Amount
export default function itemImages(items: ActivityItem[]): JSX.Element[] {
  let result: JSX.Element[] = [];
  let i = 0;
  for (let item of items) {
    i++;
    const description = findItemDescription(item.name, item.type);
    if (!description) continue;
    const { path, sizeX: size, x, y } = description.image;
    result.push(
      <Box key={i} display="flex">
        <CropSquareImage path={path} size={size} position={{ x, y }} />
      </Box>
    );
  }
  return result;
}
