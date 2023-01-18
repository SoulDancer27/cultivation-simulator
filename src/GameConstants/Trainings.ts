import { PlayerBaseStats } from "./Player";

// Provide bonuses to base stats
const Trainings: TrainingType[] = [
  {
    name: "Breathing Practice",
    stats: {
      health: 1,
      healthRegen: 0.01,
    },
  },
  {
    name: "Attack",
    stats: {
      attack: 0.1,
    },
  },
  {
    name: "Defence",
    stats: {
      defence: 0.1,
    },
  },
];

export default Trainings;

export type TrainingType = {
  name: string;
  stats: Partial<PlayerBaseStats>;
};
