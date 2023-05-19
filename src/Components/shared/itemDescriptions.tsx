import { Box, Typography } from "@mui/material";
import { ActivityItem } from "GameConstants/Activities";
import findItemDescription from "GameConstants/utils/findItemDescription";
import CropSquareImage from "./CropImage";

// Generates item descriptions in the format Image Name Amount
export default function itemDescriptions(items: ActivityItem[]): JSX.Element[] {
  let result: JSX.Element[] = [];
  let i = 0;
  for (let item of items) {
    i++;
    const description = findItemDescription(item.name, item.type);
    if (!description) continue;
    const { path, sizeX: size, x, y } = description.image;
    result.push(
      <Box key={i} display="flex" alignItems={"center"} gap={1}>
        <CropSquareImage path={path} size={size} position={{ x, y }} />
        <Typography display="inline">
          {item.name} {item.amount}
        </Typography>
      </Box>
    );
  }
  return result;
}
