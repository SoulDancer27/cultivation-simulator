import { Box, Typography } from "@mui/material";
import CropSquareImage from "Components/shared/CropImage";
import { CultivationRealms } from "GameConstants/CultivationRealms";
import { InventoryTreasure } from "GameConstants/Player";
import EmptyCell from "./EmptyCell";

export default function InventoryTreasureItem(props: InventoryTreasure) {
  const { stats } = props;
  const realmName = CultivationRealms[stats.realmIndex].name;
  if (!stats) return <EmptyCell />;
  return (
    <Box
      width={64}
      height={64}
      border="1px solid gray"
      display="flex"
      flexDirection="column"
      sx={{ justifyContent: "space-around", alignItems: "center" }}
    >
      <Box>
        <CropSquareImage
          path={stats.imagePath}
          size={stats.size}
          position={{ x: stats.x, y: stats.y }}
        />
      </Box>
      <Box>
        <Typography variant="body2">{realmName}</Typography>
      </Box>
    </Box>
  );
}
