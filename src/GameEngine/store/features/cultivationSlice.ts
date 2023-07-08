import { createSlice } from "@reduxjs/toolkit";
import { CultivationRealms } from "GameConstants/Cultivation/CultivationRealms";

export const cultivationSlice = createSlice({
  name: "cultivation",
  initialState: CultivationRealms,
  reducers: {},
});

export default cultivationSlice.reducer;
