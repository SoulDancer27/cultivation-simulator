import { Box } from "@mui/material";
import { ItemType } from "GameConstants/Interfaces";
import EmptyItem from "./VerticalList/EmptyItem";
import ListItem from "./VerticalList/ListItem";

type Props = {
  itemWidth: number | string;
  itemHeight: number | string;
  listHeight: number | string;
  items: Array<any>;
  // If Item is specified it assumes that all of the elements have the same type and itemTypes is unneeded
  Item?: (props: any) => JSX.Element;
  Tooltip?: (props: any) => JSX.Element;
  itemTypes?: {
    type: string;
    Item: (props: any) => JSX.Element;
    Tooltip?: (props: any) => JSX.Element;
  }[];
  context?: any;
};

export default function VerticalList(props: Props) {
  const { itemWidth, itemHeight, listHeight, items, itemTypes, Item, Tooltip } =
    props;

  // Resolve cell contents and tooltips based on item types
  const Items = items.map((item, index) => {
    if (Item) return { index, Item, Tooltip };
    if (!item || !itemTypes) return { index, Item: EmptyItem };
    const view = itemTypes.find((element) => element.type === item.type);
    if (!view) return { index, Item: EmptyItem };
    return { index, Item: view.Item, Tooltip: view.Tooltip };
  });

  return (
    <Box
      width={itemWidth}
      height={listHeight}
      display="flex"
      flexDirection={"column"}
      overflow={"auto"}
    >
      {Items.map((item) => {
        return (
          <ListItem
            width={itemWidth}
            height={itemHeight}
            item={items[item.index]}
            Item={item.Item}
            Tooltip={item.Tooltip}
            key={item.index}
            context={props.context}
          />
        );
      })}
    </Box>
  );
}
