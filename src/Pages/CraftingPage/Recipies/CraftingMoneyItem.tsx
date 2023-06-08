import { Box, TooltipProps, Typography } from "@mui/material";
import Money from "GameConstants/Items/Money";
import EmptyCell from "./EmptyCell";
import { Activity, ActivityItem } from "GameConstants/Activities/Activities";
import { CropSquareImage, HtmlTooltip } from "Components";

type Props = {
  activity: Activity;
};

export default function CraftingMoneyItem(props: Props) {
  const { activity } = props;
  const { name } = (activity.result.items as ActivityItem[])[0];
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
          <Typography color="inherit" variant="h6">
            {name}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </>
      }
    >
      {props.children}
    </HtmlTooltip>
  );
}
