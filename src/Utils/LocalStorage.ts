/**
 * Loads object from local storage
 * @param stateName - name of the object in local storage
 * @returns object or undefined
 */
export const loadState = (stateName: string) => {
  try {
    const serializedState = localStorage.getItem(stateName);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

/**
 * Saves serialized object version to local storage
 * @param state - state object to save
 * @param stateName - key for the local storage
 */
export const saveState = (state: object, stateName: string) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(stateName, serializedState);
  } catch (err) {
    throw new Error("Can't save changes in local storage");
  }
};
