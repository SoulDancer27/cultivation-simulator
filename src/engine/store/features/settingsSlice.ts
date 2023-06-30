import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "engine/store/store";

/**
 * Number notation type to display on screen
 */
export type NumberNotation = "trivial" | "exponential";

/**
 * Settings State for the redux store
 */
export interface SettingsState {
  /** game data update frequency, nubmer of updates per second */
  tickRate: number;
  /** game speed, the timer is multiplied by this value */
  gameSpeed: number;
  /** see */
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
    /** Changes game data update interval. Tick rate is a number of updates per second.*/
    changeTickRate: (state, action: PayloadAction<{ tickRate: number }>) => {
      state.tickRate = action.payload.tickRate;
    },
    /** Changes game speed. Time passed since the last update is multiplied by game speed value*/
    changeGameSpeed: (state, action: PayloadAction<{ gameSpeed: number }>) => {
      state.gameSpeed = action.payload.gameSpeed;
    },
    /** Changes the way numbers are displayed on screen */
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
