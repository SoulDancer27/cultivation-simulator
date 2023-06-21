import { Box, Typography } from "@mui/material";
import { PlayerContext } from "GameEngine";
import { Activity } from "GameConstants/Activities/Activities";
import findItemDescription from "GameConstants/utils/findItemDescription";
import { CropSquareImage } from "Components";
import { UniqueItems } from "GameConstants/Interfaces";
import { quality } from "GameConstants/Activities/Crafting";
import React from "react";
import power from "GameConstants/Activities/Crafting/power";
import { useNumberParser } from "@SoulDancer27/idle-rpg-lib";

type Props = {
  activity: Activity;
};

// Generates item descriptions in the format Image Name Amount
export default function ResultItemDescription(props: Props) {
  const { skills } = React.useContext(PlayerContext);
  const { activity } = props;
  const items = activity.result.items;
  if (!items) return <></>;
  const parse = useNumberParser();
  let result: JSX.Element[] = [];
  let i = 0;
  for (let item of items) {
    i++;
    const description = findItemDescription(item.name, item.type);
    if (!description) continue;
    const { path, sizeX: size, x, y } = description.image;
    let itemQuality, itemPower;
    if (UniqueItems.includes(item.type as any)) {
      itemQuality = quality(
        description.realmIndex,
        skills.crafting,
        activity.price?.priceMulti || 1
      );
      itemPower = power(itemQuality, description.realmIndex);
    }
    result.push(
      <Box display="flex" flexDirection={"column"} key={i}>
        <Box display="flex" alignItems={"center"} gap={1}>
          <CropSquareImage path={path} size={size} position={{ x, y }} />
          <Typography display="inline">
            {item.name} {parse(item.amount)}
          </Typography>
        </Box>
        {UniqueItems.includes(item.type as any) ? (
          <Typography>
            quality: {parse(itemQuality)} power: {parse(itemPower)}
          </Typography>
        ) : (
          ""
        )}
      </Box>
    );
  }
  return <Box>{result.map((item) => item)}</Box>;
}
