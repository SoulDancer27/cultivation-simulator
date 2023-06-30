/**
 * Redux state store for the application
 * @module Store
 */
import type { NumberNotation, SettingsState } from "./features/settingsSlice";
import {
  changeGameSpeed,
  changeNotation,
  changeTickRate,
} from "./features/settingsSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import store from "./store";
export {
  changeGameSpeed,
  changeNotation,
  changeTickRate,
  store,
  useAppDispatch,
  useAppSelector,
};
export type { NumberNotation, SettingsState };
