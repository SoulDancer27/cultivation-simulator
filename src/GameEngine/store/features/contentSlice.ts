import { createSlice } from "@reduxjs/toolkit";
import Trainings from "GameConstants/Activities/Trainings";
import createNormalizedState from "./createNormalizedState";

let initialState = {
  trainings: createNormalizedState(Trainings, "name"),
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
});

export default contentSlice.reducer;
