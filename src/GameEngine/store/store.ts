import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "Utils";
import cultivationReducer from "./features/cultivationSlice";
import inventoryReducer from "./features/inventorySlice";
import manualsReducer from "./features/manualsSlice";
import playerReducer from "./features/playerSlice";
import settingsReducer from "./features/settingsSlice";

// Redux store
const store = configureStore({
  reducer: {
    settings: settingsReducer,
    player: playerReducer,
    cultivation: cultivationReducer,
    manuals: manualsReducer,
    inventory: inventoryReducer,
  },
  preloadedState: {
    settings: loadState("settings"),
    player: loadState("player"),
    cultivation: loadState("cultivation"),
    manuals: loadState("manuals"),
    inventory: loadState("inventory"),
  },
});

export default store;

/** generic type for redux thunks*/
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

/** saves store data to the local storage */
export const saveStoreData = (): AppThunk<void> => {
  return function saveStoreDataThunk(dispatch, getState) {
    const state = getState();
    saveState(state.settings, "settings");
    saveState(state.player, "player");
    saveState(state.cultivation, "cultivation");
    saveState(state.manuals, "manuals");
    saveState(state.inventory, "inventory");
  };
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
