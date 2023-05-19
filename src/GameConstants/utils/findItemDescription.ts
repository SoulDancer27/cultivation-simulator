import { Minerals } from "GameConstants/Minerals";
import Money from "GameConstants/Money";
import Treasures from "GameConstants/Treasures";

type ItemTypes = "treasure" | "money" | "mineral";
export default function findItemDescription(name: string, type: ItemTypes) {
  let description;
  if (type === "treasure")
    description = Treasures.find((item) => item.name === name);
  if (type === "money") description = Money.find((item) => item.name === name);
  if (type === "mineral")
    description = Minerals.find((item) => item.name === name);
  return description;
}
