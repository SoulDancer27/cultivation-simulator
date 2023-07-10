import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { Treasure } from "GameConstants/Items/Treasures";
import { RootState } from "../store";

/* ______________________________________________________________________
  Item types                                           
_________________________________________________________________________*/

export const CountableItems = <const>["money", "mineral", "herb"];
export type CountableItemType = (typeof CountableItems)[number];
export const UniqueItems = <const>["treasure", "potion"];
export type UniqueItemType = (typeof UniqueItems)[number];
export type ItemType = CountableItemType | UniqueItemType;

export type InventoryTreasure = {
  type: "treasure";
  id: string;
  isEquipped?: boolean;
  isLocked?: boolean;
  item: Required<Treasure>;
};

export type InventoryCountableItem = {
  type: CountableItemType;
  id: string;
  name: string;
  amount: number;
};

export type InventoryUniqueItem = InventoryTreasure;
export type InventoryItem = InventoryUniqueItem | InventoryCountableItem;

const inventoryAdapter = createEntityAdapter<InventoryItem>();
const initialState = inventoryAdapter.getInitialState({});

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
});

export default inventorySlice.reducer;

export const {
  selectAll: selectAllItems,
  selectById: selectItemById,
  selectIds: selectItemIds,
  // Pass in a selector that returns the posts slice of state
} = inventoryAdapter.getSelectors((state: RootState) => state.inventory);

// Item selectors
export const selectUniqueItems = createSelector(
  [selectAllItems],
  (items): Array<InventoryUniqueItem> =>
    items.filter((item) =>
      (UniqueItems as readonly string[]).includes(item.type)
    ) as Array<InventoryUniqueItem>
);
export const selectTreasures = createSelector(
  [selectAllItems],
  (items): Array<InventoryTreasure> =>
    items.filter((item) => item.type === "treasure") as Array<InventoryTreasure>
);

export const selectEquippedTreasures = createSelector(
  [selectTreasures],
  (items): Array<InventoryTreasure> => items.filter((item) => item.isEquipped)
);
