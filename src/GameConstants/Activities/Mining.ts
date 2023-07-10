import { day, month } from "../Constants";
import { Activity } from "./Activities";

// Placeholder activities
let Mining: Activity[] = [
  {
    name: "Copper",
    baseTime: 5 * day,
    result: {
      baseStats: {
        mining: 0.01,
      },
      items: [{ type: "mineral", name: "Copper", amount: 1 }],
    },
  },
  {
    name: "Iron",
    baseTime: month,
    result: {
      baseStats: {
        mining: 0.03,
      },
      items: [{ type: "mineral", name: "Iron", amount: 1 }],
    },
  },
  {
    name: "Steel",
    baseTime: 6 * month,
    result: {
      baseStats: {
        mining: 0.1,
      },
      items: [{ type: "mineral", name: "Steel", amount: 1 }],
    },
  },
  {
    name: "Cold Steel",
    baseTime: 30 * month,
    result: {
      baseStats: {
        mining: 0.3,
      },
      items: [{ type: "mineral", name: "Cold Steel", amount: 1 }],
    },
  },
  {
    name: "Celestial Gold",
    baseTime: 150 * month,
    result: {
      baseStats: {
        mining: 1,
      },
      items: [{ type: "mineral", name: "Celestial Gold", amount: 1 }],
    },
  },
];

Mining = Mining.map((item) => {
  if (!item.time) item.time = "mining time";
  if (item.result.baseStats && !item.result.baseStatsFunc)
    item.result.baseStatsFunc = "default";
  return item;
});

export default Mining;
