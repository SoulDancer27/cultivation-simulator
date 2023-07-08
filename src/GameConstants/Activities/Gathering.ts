import { Activity } from "./Activities";
import { day, month } from "../Constants";

// Placeholder activities
let Gathering: Activity[] = [
  {
    name: "Collect grass",
    baseTime: 5 * day,
    result: {
      skills: {
        gathering: 0.01,
      },
      items: [{ type: "herb", name: "Grass Stalk", amount: 1 }],
    },
  },
  {
    name: "Pick tree leaves",
    baseTime: month,
    result: {
      skills: {
        gathering: 0.03,
      },
      items: [{ type: "herb", name: "Oak leaf", amount: 1 }],
    },
  },
];

Gathering = Gathering.map((item) => {
  if (!item.time) item.time = "gathering time";
  if (item.result.baseStats && !item.result.baseStatsMulti)
    item.result.baseStatsMulti = "default";
  if (item.result.skills && !item.result.skillsMulti)
    item.result.skillsMulti = "default";
  return item;
});

export default Gathering;
