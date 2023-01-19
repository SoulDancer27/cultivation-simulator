import { Action } from "./Activities";

const Villages: Village[] = [
  {
    name: "Spring blossom village",
    description:
      "A tiny village in the fields. The villagers are poor, but kind and hardworking",
    imagePath: "village.png",
    activities: [
      {
        name: "Run Errands",
        description: "",
        result: { items: [{ type: "money", name: "Copper Coin", amount: 1 }] },
      },
      {
        name: "Use Training Grounds",
        description: "",
        result: { baseStats: { attack: 0.07, defence: 0.07 } },
      },
      {
        name: "Help in the fields",
        description: "",
        requiredTime: 10,
        result: {
          baseStats: { attack: 0.2, defence: 0.2 },
          items: [{ type: "money", name: "Copper Coin", amount: 5 }],
        },
      },
      {
        name: "Help in the forge",
        description: "",
        requiredTime: 10,
        result: {
          baseStats: { attack: 0.2, defence: 0.2 },
          items: [{ type: "treasure", name: "Rusty Sword", amount: 1 }],
        },
      },
    ],
  },
];

type Village = {
  name: string;
  description: string;
  imagePath: string;
  activities?: Array<Action>;
};

export default Villages;
