import { Box, Typography } from "@mui/material";

import CropSquareImage from "./CropImage";
import { ActivityItem } from "GameConstants/Activities/Activities";
import findItemDescription from "GameConstants/utils/findItemDescription";
import { useNumberParser } from "@SoulDancer27/idle-rpg-lib";

type Props = {
  items: ActivityItem[];
};

// Generates item descriptions in the format Image Name Amount
export default function ItemDescriptions(props: Props) {
  const { items } = props;
  const parse = useNumberParser();
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
          {item.name} {parse(item.amount)}
        </Typography>
      </Box>
    );
  }
  return <Box>{result.map((item) => item)}</Box>;
}
