import { abbreviateNumber } from "js-abbreviation-number";

/**
 * Function parses number to a format with a suffix.
 *
 * Is used to display game data on screen.
 *
 * For example 123000 turns into '123k' and 1.2e6 into '1.2m'
 * @param num - number to be parsed
 * @returns - parsing result
 * @group Parsing
 */
export function trivialNumber(num: number): string {
  const abs = Math.abs(num);
  // Limits for trivial numbers
  if (abs >= 10 ** 27 || abs <= 0.01) return exponentialNumber(num);
  if (abs < 1000) {
    if (abs >= 10) return num.toFixed(2);

    if (abs < 10 && abs >= 0.01) return num.toFixed(3);
  }
  const result = abbreviateNumber(num, 2, {
    padding: false,
    symbols: ["", "k", "m", "b", "t", "q", "qi", "sx", "sp"],
  });
  return result;
}

/**
 * Function parses number to exponential notation.
 *
 * Is used to display game data on screen.
 * @param num - number to be parsed
 * @returns - parsing result
 * @group Parsing
 */
export function exponentialNumber(num: number): string {
  const abs = Math.abs(num);
  if (abs < 1000) {
    if (abs >= 10) return num.toFixed(2);

    if (abs < 10 && abs >= 0.01) return num.toFixed(3);
  }
  return num.toExponential(3);
}
