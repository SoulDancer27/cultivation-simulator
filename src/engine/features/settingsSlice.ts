import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "engine/store";

export type NumberNotation = "trivial" | "exponential";

export interface SettingsState {
  tickRate: number;
  gameSpeed: number;
  notation: NumberNotation;
}

const initialState: SettingsState = {
  tickRate: 100,
  gameSpeed: 1,
  notation: "trivial",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeTickRate: (state, action: PayloadAction<{ tickRate: number }>) => {
      state.tickRate = action.payload.tickRate;
    },
    changeGameSpeed: (state, action: PayloadAction<{ gameSpeed: number }>) => {
      state.gameSpeed = action.payload.gameSpeed;
    },
    changeNotation: (
      state,
      action: PayloadAction<{ notation: NumberNotation }>
    ) => {
      state.notation = action.payload.notation;
    },
  },
});

export const { changeGameSpeed, changeTickRate, changeNotation } =
  settingsSlice.actions;

export const selectTickRate = (state: RootState) => state.settings.tickRate;
export const selectGameSpeed = (state: RootState) => state.settings.gameSpeed;
export const selectNotation = (state: RootState) => state.settings.notation;

export default settingsSlice.reducer;
