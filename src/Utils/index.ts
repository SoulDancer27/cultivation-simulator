/**
 * Contatins functions to manipulate cokies, number parsers to display values on screen and other utility functions
 * @module Utilities
 */
import { accessCookie, createCookie } from "./Cookie";
import { loadState, saveState } from "./LocalStorage";
import getSpacing from "./getSpacing";
import { exponentialNumber, trivialNumber } from "./parseNumber";
import parseTime from "./parseTime";
import useWindowDimensions from "./useWindowDimensions";

export {
  accessCookie,
  createCookie,
  exponentialNumber,
  getSpacing,
  loadState,
  parseTime,
  saveState,
  trivialNumber,
  useWindowDimensions,
};
