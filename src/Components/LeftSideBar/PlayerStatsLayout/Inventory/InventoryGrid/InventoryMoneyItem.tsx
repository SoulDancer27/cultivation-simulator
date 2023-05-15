import { Box, TooltipProps, Typography } from "@mui/material";
import CropSquareImage from "Components/shared/CropImage";
import HtmlTooltip from "Components/shared/HtmlTooltip";
import Money from "GameConstants/Money";
import { InventoryMoney } from "GameConstants/Interfaces";
import EmptyCell from "./EmptyCell";

// Draw inventory money item
export default function InventoryMoneyItem(props: InventoryMoney) {
  const { name, amount } = props;
  // Find image
  const cellData = Money.find((coin) => coin.name === name);
  if (!cellData) return <EmptyCell />;
  return (
    <MoneyCellTooltip name={cellData.name} description={cellData.description}>
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
    </MoneyCellTooltip>
  );
}

type MoneyTooltipProps = Omit<TooltipProps, "title"> & {
  name: string;
  description: string;
};

function MoneyCellTooltip(props: MoneyTooltipProps) {
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
