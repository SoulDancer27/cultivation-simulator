import { yearSpan, monthSpan } from "GameConstants/Constants";

export default function parseTime(time: number): string {
  const years = Math.floor(time / yearSpan);
  // Just in case to not overflow 12 due to rounding
  const months = Math.min((time - years * yearSpan) / monthSpan, 12);
  return years !== 0
    ? `${years} y ${months.toPrecision(2)} m`
    : `${months.toPrecision(2)} m`;
}
