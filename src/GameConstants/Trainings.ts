import { PlayerStats } from "./Player";

const Trainings: TrainingType[] = [
  {
    name: "Basic health training",
    stats: {
      health: 1,
      healthRegen: 0.01,
    },
  },
  {
    name: "Basic attack training",
    stats: {
      attack: 0.1,
    },
  },
  {
    name: "Basic defence training",
    stats: {
      defence: 0.1,
    },
  },
];

export default Trainings;

export type TrainingType = {
  name: string;
  stats: Partial<PlayerStats>;
};
