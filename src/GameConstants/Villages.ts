import { Action } from "./Actions";

const Villages: Village[] = [
  {
    name: "Spring blossom village",
    description:
      "A tiny village in the fields. The villagers are poor, but kind and hardworking",
    imagePath: "village.png",
  },
];

type Village = {
  name: string;
  description: string;
  imagePath: string;
  actions?: Array<Action>;
};

export default Villages;
