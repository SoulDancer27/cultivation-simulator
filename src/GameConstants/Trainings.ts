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
    time: 1,
    result: {
      baseStats: {
        attack: 0.1,
      },
    },
  },
  {
    name: "Defence",
    time: 1,
    result: {
      baseStats: {
        defence: 0.1,
      },
    },
  },
];

export default Trainings;
