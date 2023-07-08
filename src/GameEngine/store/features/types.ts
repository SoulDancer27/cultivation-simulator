export interface NormalizedState<T> {
  byId: Record<string, T>;
  allIds: Array<string>;
}
