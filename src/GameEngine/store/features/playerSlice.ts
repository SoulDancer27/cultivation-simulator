import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { year } from "GameConstants/Constants";
import {
  PlayerBaseStats,
  PlayerCurrentStats,
  baseStats,
  currentStats,
} from "GameConstants/Player";

/** Player state for the redux store */
export interface PlayerState {
  /** player age is a number in milliseconds */
  age: number;
  /** player stat values are calculated based on these and modifiers */
  baseStats: PlayerBaseStats;
  /** player stats that can have a value between min and max, like hp, mana etc */
  currentStats: PlayerCurrentStats;
}

const initialState = {
  age: 10 * year,
  baseStats,
  currentStats,
};

/** Slice for the redux store, contains player stats data */
export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    /** updates player age as time passes */
    changePlayerAge: (state, action: PayloadAction<number>) => {
      state.age += action.payload;
    },
  },
});

export const { changePlayerAge } = playerSlice.actions;

export default playerSlice.reducer;
