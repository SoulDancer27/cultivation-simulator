import { Action } from "./Actions";

const Villages: Village[] = [
  {
    name: "Spring blossom village",
    description:
      "A tiny village in the fields. The villagers are poor, but kind and hardworking",
    imagePath: "village.png",
    actions: [
      {
        name: "Run Errands",
        description: "",
        result: { items: [{ type: "money", name: "Copper Coin", amount: 1 }] },
      },
    ],
  },
];

type Village = {
  name: string;
  description: string;
  imagePath: string;
  actions?: Array<Action>;
};

export default Villages;
