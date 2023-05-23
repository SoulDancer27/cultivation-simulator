import { Activity } from "./Activities";
import { month, day } from "./Constants";

// Provide bonuses to base stats
// Placeholder values for now
let Trainings: Activity[] = [
  {
    // This one is totally overpowered, serves for test purposes :)
    name: "Running",
    baseTime: 0.5 * day,
    price: {
      items: [{ name: "Copper Coin", amount: 1, type: "money" }],
    },
    result: {
      baseStats: {
        health: 0.5,
        attack: 1,
        healthRegen: 0.1,
      },
      skills: {
        training: 0.01,
      },
    },
  },
  {
    name: "Breathing Practice",
    baseTime: 5 * day,
    result: {
      baseStats: {
        health: 1,
        healthRegen: 0.01,
      },
      skills: {
        training: 0.01,
      },
      items: [
        { name: "Rusty Sword", amount: 1, type: "treasure" },
        { name: "Rusty Armor", amount: 1, type: "treasure" },
      ],
    },
  },
  {
    name: "Squats",
    baseTime: 5 * day,
    result: {
      baseStats: {
        attack: 0.2,
      },
      skills: {
        training: 0.01,
      },
    },
  },
  {
    name: "Dodge",
    baseTime: 5 * day,
    result: {
      baseStats: {
        defence: 0.1,
      },
      skills: {
        training: 0.01,
      },
    },
  },
  {
    name: "Situps",
    baseTime: month,
    result: {
      baseStats: {
        health: 1.5,
        attack: 0.3,
      },
      skills: {
        training: 0.03,
      },
    },
  },
  {
    name: "Relaxation",
    baseTime: month,
    result: {
      baseStats: {
        health: 3,
        healthRegen: 0.03,
      },
      skills: {
        training: 0.03,
      },
    },
  },
  {
    name: "Basic Punch",
    baseTime: month,
    result: {
      baseStats: {
        attack: 0.6,
      },
      skills: {
        training: 0.03,
      },
    },
  },
  {
    name: "Block",
    baseTime: month,
    result: {
      baseStats: {
        defence: 0.3,
      },
      skills: {
        training: 0.03,
      },
    },
  },
  {
    name: "Swimming",
    baseTime: 5 * month,
    result: {
      baseStats: {
        health: 5,
        attack: 1,
      },
      skills: {
        training: 0.1,
      },
    },
  },
  {
    name: "Climb Mountains",
    baseTime: 5 * month,
    result: {
      baseStats: {
        health: 10,
        healthRegen: 0.1,
      },
      skills: {
        training: 0.1,
      },
    },
  },
  {
    name: "Hit the Scarecrows",
    baseTime: 5 * month,
    result: {
      baseStats: {
        attack: 2,
      },
      skills: {
        training: 0.1,
      },
    },
  },
  {
    name: "Defence Stance",
    baseTime: 5 * month,
    result: {
      baseStats: {
        defence: 1,
      },
      skills: {
        training: 0.1,
      },
    },
  },
];

Trainings = Trainings.map((item) => {
  if (!item.time) item.time = "training time";
  if (item.result.baseStats && !item.result.baseStatsMulti)
    item.result.baseStatsMulti = "default";
  if (item.result.skills && !item.result.skillsMulti)
    item.result.skillsMulti = "default";
  return item;
});

export default Trainings;
