import { createSlice } from "@reduxjs/toolkit";
import {
  CultivationManualType,
  CultivationManuals,
} from "GameConstants/Cultivation/CultivationManuals";
import { NormalizedState } from "./types";

export type ManualsState = NormalizedState<CultivationManualType>;

let initialState: ManualsState = { byId: {}, allIds: [] };
for (let manual of CultivationManuals) {
  const id = manual.name;
  initialState.allIds.push(id);
  initialState.byId[id] = manual;
}

export const manualsSlice = createSlice({
  name: "manuals",
  initialState: CultivationManuals,
  reducers: {},
});

export default manualsSlice.reducer;
