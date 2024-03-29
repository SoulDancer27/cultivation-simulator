import React from "react";
import { Box, ClickAwayListener, Popper } from "@mui/material";
type GridItemProps = {
  width: number;
  height: number;
  item: any;
  Cell: (props: any) => JSX.Element;
  Tooltip?: (props: any) => JSX.Element;
  context?: any;
};

export default function GridItem(props: GridItemProps) {
  const { width, height, item, Cell, Tooltip } = props;

  // For the tooltip handling
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box width={width} height={height} onClick={handleClick}>
        <Cell
          width={width}
          height={height}
          item={item}
          context={props.context}
        />
        <Popper id={id} open={open} anchorEl={anchorEl}>
          {Tooltip && <Tooltip item={item} context={props.context} />}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}
