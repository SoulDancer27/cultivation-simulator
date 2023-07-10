import { createSlice } from "@reduxjs/toolkit";
import Trainings from "GameConstants/Activities/Trainings";
import { createNormalizedActivityState } from "./createNormalizedState";

let initialState = {
  trainings: createNormalizedActivityState(Trainings, "name"),
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
});

export default contentSlice.reducer;
