import { Activity } from "./Activities";
import { day, month } from "./Constants";

// Placeholder activities
let Mining: Activity[] = [
  {
    name: "Copper",
    baseTime: 5 * day,
    result: {
      skills: {
        mining: 0.01,
      },
      items: [{ type: "mineral", name: "Copper", amount: 1 }],
    },
  },
  {
    name: "Iron",
    baseTime: month,
    result: {
      skills: {
        mining: 0.03,
      },
      items: [{ type: "mineral", name: "Iron", amount: 1 }],
    },
  },
  {
    name: "Steel",
    baseTime: 6 * month,
    result: {
      skills: {
        mining: 0.1,
      },
      items: [{ type: "mineral", name: "Steel", amount: 1 }],
    },
  },
];

Mining = Mining.map((item) => {
  if (!item.time) item.time = "mining time";
  if (item.result.baseStats && !item.result.baseStatsMulti)
    item.result.baseStatsMulti = "default";
  if (item.result.skills && !item.result.skillsMulti)
    item.result.skillsMulti = "default";
  return item;
});

export default Mining;
