import { Box, TooltipProps, Typography } from "@mui/material";
import CropSquareImage from "Components/shared/CropImage";
import HtmlTooltip from "Components/shared/HtmlTooltip";
import Money from "GameConstants/Money";
import { InventoryMineral, InventoryMoney } from "GameConstants/Player";
import EmptyCell from "./EmptyCell";
import { Minerals } from "GameConstants/Minerals";

export default function InventoryMineralItem(props: InventoryMineral) {
  const { name, amount } = props;
  // Find image
  const cellData = Minerals.find((item) => item.name === name);
  if (!cellData) return <EmptyCell />;
  return (
    <MineralCellTooltip name={cellData.name} description={cellData.description}>
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
            path={cellData.image.path}
            size={cellData.image.sizeX}
            position={{ x: cellData.image.x, y: cellData.image.y }}
          />
        </Box>
        <Box>
          <Typography variant="body2">{amount.toFixed(2)}</Typography>
        </Box>
      </Box>
    </MineralCellTooltip>
  );
}

type MineralTooltipProps = Omit<TooltipProps, "title"> & {
  name: string;
  description: string;
};

function MineralCellTooltip(props: MineralTooltipProps) {
  const { name, description } = props;
  return (
    <HtmlTooltip
      title={
        <>
          <Typography color="inherit">{name}</Typography>
          <Typography variant="body2">{description}</Typography>
        </>
      }
    >
      {props.children}
    </HtmlTooltip>
  );
}
