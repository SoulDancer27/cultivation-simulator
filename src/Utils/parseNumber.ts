import { abbreviateNumber } from "js-abbreviation-number";

export function trivialNumber(num: number) {
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

export function exponentialNumber(num: number) {
  const abs = Math.abs(num);
  if (abs < 1000) {
    if (abs >= 10) return num.toFixed(2);

    if (abs < 10 && abs >= 0.01) return num.toFixed(3);
  }
  return num.toExponential(3);
}
