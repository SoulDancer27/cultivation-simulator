import { day, month } from "../Constants";
import { Activity } from "./Activities";

// Placeholder activities
let Gathering: Activity[] = [
  {
    name: "Collect grass",
    baseTime: 5 * day,
    result: {
      baseStats: {
        gathering: 0.01,
      },
      items: [{ type: "herb", name: "Grass Stalk", amount: 1 }],
    },
  },
  {
    name: "Pick tree leaves",
    baseTime: month,
    result: {
      baseStats: {
        gathering: 0.03,
      },
      items: [{ type: "herb", name: "Oak leaf", amount: 1 }],
    },
  },
];

Gathering = Gathering.map((item) => {
  if (!item.time) item.time = "gathering time";
  if (item.result.baseStats && !item.result.baseStatsFunc)
    item.result.baseStatsFunc = "default";
  return item;
});

export default Gathering;
