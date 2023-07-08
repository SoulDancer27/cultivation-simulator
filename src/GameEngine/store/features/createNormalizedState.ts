import { NormalizedState } from "./types";

export default function createNormalizedState<T>(
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
