import { Activity } from "GameConstants/Activities";
import { NormalizedState } from "./types";

export function createNormalizedState<T>(
  items: Array<T>,
  key: string
): NormalizedState<T> {
  let state;
  for (let item of items) {
    const id = item[key];
    state.allIds.push(id);
    state.byId[id] = item;
  }
  return state;
}

export type ActivityState = Activity & {
  progress: {
    // Values for action progress tracking
    currentTime: number; // for progress tracking
    timesCompleted: number; // total times completed
  };
};

export function createNormalizedActivityState(
  items: Array<Activity>,
  key: string
): NormalizedState<ActivityState> {
  let state;
  for (let item of items) {
    const id = item[key];
    state.allIds.push(id);
    state.byId[id] = item;
    state.byId[id].progress = {
      // Values for action progress tracking
      currentTime: 0, // for progress tracking
      timesCompleted: 0, // total times completed
    };
  }
  return state;
}
