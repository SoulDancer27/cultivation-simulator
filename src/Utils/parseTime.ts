import { month, year } from "GameConstants/Constants";

// Parses time from milliseconds to human readable ingame format
export default function parseTime(time: number): string {
  const years = Math.floor(time / year);
  // Just in case to not overflow 12 due to rounding
  const months = Math.min((time - years * year) / month, 12);
  return years !== 0
    ? `${years} y ${months.toPrecision(2)} m`
    : `${months.toPrecision(2)} m`;
}
