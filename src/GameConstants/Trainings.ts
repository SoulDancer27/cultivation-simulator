import { Activity } from "./Activities";

// Provide bonuses to base stats
const Trainings: Activity[] = [
  {
    name: "Breathing Practice",
    time: 1,
    result: {
      baseStats: {
        health: 1,
        healthRegen: 0.01,
      },
    },
  },
  {
    name: "Attack",
    time: 0.5,
    result: {
      baseStats: {
        attack: 0.1,
      },
    },
  },
  {
    name: "Defence",
    time: 0.5,
    result: {
      baseStats: {
        defence: 0.1,
      },
      items: [{ type: "treasure", name: "Rusty Sword", amount: 1 }],
    },
  },
  {
    name: "Run errands",
    time: 0.1,
    result: {
      items: [{ type: "money", name: "Copper Coin", amount: 1 }],
    },
  },
  {
    name: "Sacrifice Gold",
    time: 1,
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
    time: 1,
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

export default Trainings;
