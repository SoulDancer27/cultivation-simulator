/**
 * Redux state store for the application
 * @module Store
 */
import type {
  NumberNotation,
  SettingsState,
  settingsSlice,
} from "./features/settingsSlice";
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
  settingsSlice,
  store,
  useAppDispatch,
  useAppSelector,
};
export type { NumberNotation, SettingsState };
