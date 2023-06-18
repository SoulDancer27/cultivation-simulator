import { Box } from "@mui/material";
import GridItem from "./ItemGrid/GridItem";
import EmptyCell from "./ItemGrid/EmptyCell";
import { ItemType } from "GameConstants/Interfaces";

type Props = {
  cellWidth: number;
  cellHeight: number;
  sizeX: number;
  sizeY: number;
  items: Array<any>;
  // If Cell is defined, draws the same kind of cells for all items ignoring the itemTypes
  Cell?: (props: any) => JSX.Element;
  Tooltip?: (props: any) => JSX.Element;
  itemTypes?: {
    type: ItemType;
    Cell: (props: any) => JSX.Element;
    Tooltip: (props: any) => JSX.Element;
  }[];
  context?: any;
};

export default function ItemGrid(props: Props) {
  const {
    cellWidth,
    cellHeight,
    sizeX,
    sizeY,
    items,
    itemTypes,
    Cell,
    Tooltip,
  } = props;
  const tileIndex = Array(sizeX * sizeY)
    .fill(0)
    .map((element, index) => index);

  // Resolve cell contents and tooltips based on item types
  const Tiles = tileIndex.map((value) => {
    const item = items[value];
    if (!item) return { index: value, Cell: EmptyCell };
    if (Cell) return { index: value, Cell: Cell, Tooltip: Tooltip };
    if (!itemTypes) return { index: value, Cell: EmptyCell };
    const view = itemTypes.find((element) => element.type === item.type);
    if (!view) return { index: value, Cell: EmptyCell };
    return { index: value, Cell: view.Cell, Tooltip: view.Tooltip };
  });
  return (
    <Box
      width={sizeX * cellWidth}
      height={sizeY * cellHeight}
      display="flex"
      flexWrap="wrap"
    >
      {Tiles.map((tile) => {
        return (
          <GridItem
            width={cellWidth}
            height={cellHeight}
            item={items[tile.index]}
            Cell={tile.Cell}
            Tooltip={tile.Tooltip}
            key={tile.index}
            context={props.context}
          />
        );
      })}
    </Box>
  );
}
