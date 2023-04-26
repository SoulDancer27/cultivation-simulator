import { Activity } from "./Activities";
import { monthSpan } from "./Constants";
import { PlayerContextType } from "./Player";

// Provide bonuses to base stats
let Trainings: Activity[] = [
  {
    name: "Breathing Practice 1",
    baseTime: monthSpan,
    result: {
      baseStats: {
        health: 1,
        healthRegen: 0.01,
      },
      skills: {
        training: 0.01,
      },
    },
  },
  {
    name: "Breathing Practice 2",
    baseTime: 5 * monthSpan,
    result: {
      baseStats: {
        health: 5,
        healthRegen: 0.05,
      },
      skills: {
        training: 0.05,
      },
    },
  },
  {
    name: "Breathing Practice 3",
    baseTime: 25 * monthSpan,
    result: {
      baseStats: {
        health: 25,
        healthRegen: 0.25,
      },
      skills: {
        training: 0.25,
      },
    },
  },
  {
    name: "Attack",
    baseTime: 500,
    result: {
      baseStats: {
        attack: 0.1,
      },
    },
  },
  {
    name: "Defence",
    baseTime: 0.5,
    result: {
      baseStats: {
        defence: 0.1,
      },
      items: [{ type: "treasure", name: "Rusty Sword", amount: 1 }],
    },
  },
  {
    name: "Run errands",
    baseTime: 0.1,
    result: {
      items: [{ type: "money", name: "Copper Coin", amount: 1 }],
    },
  },
  {
    name: "Sacrifice Gold",
    baseTime: 1,
    result: {
      baseStats: {
        defence: 0.1,
        attack: 0.1,
        health: 1,
      },
    },
    price: {
      items: [
        {
          type: "money",
          name: "Copper Coin",
          amount: 1,
        },
      ],
    },
  },
  {
    name: "Sacrifice Sword",
    baseTime: 1,
    result: {
      baseStats: {
        attack: 10,
      },
    },
    price: {
      items: [
        {
          type: "treasure",
          name: "Rusty Sword",
          amount: 5,
        },
      ],
    },
  },
];

Trainings = Trainings.map((item) => {
  if (!item.time)
    item.time = function (player: PlayerContextType) {
      const { skills } = player;
      const multi = 1 + skills.training;
      return this.baseTime / multi;
    };
  return item;
});

export default Trainings;
