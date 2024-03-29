import { Box, ClickAwayListener, Popper } from "@mui/material";
import React from "react";

export type WithTooltipType = {
  toggleTooltip: () => void;
  showTooltip: () => void;
  hideTooltip: () => void;
};

export default function withTooltip<P>(
  WrappedComponent: React.FunctionComponent<P & WithTooltipType>,
  Tooltip: (props: any) => JSX.Element
) {
  return (props: any) => {
    // For the tooltip handling
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleMouseOver = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClickAway = () => {
      setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;
    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <>
          <WrappedComponent
            toggleTooltip={handleClick}
            showTooltip={(event) => setAnchorEl(event.currentTarget)}
            hideTooltip={() => setAnchorEl(null)}
            {...props}
          />
          <Popper id={id} open={open} anchorEl={anchorEl}>
            {Tooltip && <Tooltip {...props} />}
          </Popper>
        </>
      </ClickAwayListener>
    );
  };
}
