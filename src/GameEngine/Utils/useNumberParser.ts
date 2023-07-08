import { useAppSelector } from "GameEngine/store";
import { selectNotation } from "GameEngine/store/features/settingsSlice";
import { exponentialNumber, trivialNumber } from "Utils";

export function useNumberParser() {
  const notation = useAppSelector(selectNotation);
  return (num: number): string => {
    if (notation === "trivial") return trivialNumber(num);
    if (notation === "exponential") return exponentialNumber(num);
    return num.toFixed(2);
  };
}
