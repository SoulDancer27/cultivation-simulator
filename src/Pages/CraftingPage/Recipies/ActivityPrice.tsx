import { Box, Typography } from "@mui/material";
import { CropSquareImage } from "Components";
import { ActivityItem } from "GameConstants/Activities/Activities";
import { Minerals } from "GameConstants/Items/Minerals";
import Money from "GameConstants/Items/Money";
import Treasures from "GameConstants/Items/Treasures";
import { useNumberParser } from "GameEngine/SettingsContext/SettingContext";

type Props = {
  price: ActivityItem[];
};
export default function ActivityPrice(props: Props) {
  const { price } = props;
  const parse = useNumberParser();
  return (
    <Box>
      {price.map((item) => {
        const { name, amount } = item;
        let imageData = {
          path: "",
          size: 0,
          x: 0,
          y: 0,
        };
        if (item.type === "money") {
          const result = Money.find((coin) => coin.name === name);
          if (result) {
            imageData = {
              path: result.image.path,
              size: result.image.sizeX,
              x: result.image.x,
              y: result.image.y,
            };
          }
        } else if (item.type === "mineral") {
          const result = Minerals.find((mineral) => mineral.name === name);
          if (result) {
            imageData = {
              path: result.image.path,
              size: result.image.sizeX,
              x: result.image.x,
              y: result.image.y,
            };
          }
        } else if (item.type === "treasure") {
          const result = Treasures.find((treasure) => treasure.name === name);
          if (result) {
            imageData = {
              path: result.image.path,
              size: result.image.sizeX,
              x: result.image.x,
              y: result.image.y,
            };
          }
        }
        return (
          <Box display="flex" alignItems={"center"}>
            <CropSquareImage
              path={imageData.path}
              size={imageData.size}
              position={{ x: imageData.x, y: imageData.y }}
            />
            <Typography marginLeft={1}>
              {name} x {parse(amount)}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
