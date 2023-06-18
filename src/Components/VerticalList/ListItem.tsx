import React from "react";
import { Box, ClickAwayListener, Popper } from "@mui/material";
type ListItemProps = {
  width: number | string;
  height: number | string;
  item: any;
  Item: (props: any) => JSX.Element;
  Tooltip?: (props: any) => JSX.Element;
  context?: any;
};

export default function ListItem(props: ListItemProps) {
  const { width, height, item, Item, Tooltip } = props;

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
        <Item
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
