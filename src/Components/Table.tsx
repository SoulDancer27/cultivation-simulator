import {
  TableContainer,
  Paper,
  TableHead,
  TableBody,
  Table,
  TableRow,
  Popper,
  ClickAwayListener,
  SxProps,
  Theme,
} from "@mui/material";
import React from "react";

type TableProps = {
  width: string | number;
  height?: string | number;
  maxHeight?: string | number;
  items: any;
  HeaderRow: (props: any) => JSX.Element;
  Row: (props: any) => JSX.Element;
  RowTooltip?: (props: any) => JSX.Element;
  paper?: boolean;
};

export default function CustomTable(props: TableProps) {
  const { width, height, maxHeight, items, HeaderRow, Row, RowTooltip, paper } =
    props;
  return (
    <TableContainer
      component={paper ? Paper : "div"}
      sx={{ width: width, height: height, overflow: "auto" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <HeaderRow />
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRowWithTooltip
              Row={Row}
              item={item}
              key={index}
              Tooltip={RowTooltip}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

type TableRowProps = {
  item: any;
  Row: (props: any) => JSX.Element;
  Tooltip?: (props: any) => JSX.Element;
  context?: any;
};

function TableRowWithTooltip(props: TableRowProps) {
  const { item, Tooltip, Row } = props;

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
      <>
        <TableRow onClick={handleClick}>
          <Row item={item} />
        </TableRow>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          {Tooltip && <Tooltip item={item} context={props.context} />}
        </Popper>
      </>
    </ClickAwayListener>
  );
}
