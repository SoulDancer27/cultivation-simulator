import { Activity } from "./Activities/Activities";

// ! Travelling mechanic is not implemented yet
// This is a total placeholder
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
        baseTime: 0.1,
        result: { items: [{ type: "money", name: "Copper Coin", amount: 1 }] },
      },
      {
        name: "Use Training Grounds",
        description: "",
        baseTime: 0.1,
        result: { baseStats: { attack: 0.07, defence: 0.07 } },
      },
      {
        name: "Help in the fields",
        description: "",
        baseTime: 10,
        result: {
          baseStats: { attack: 0.2, defence: 0.2 },
          items: [{ type: "money", name: "Copper Coin", amount: 5 }],
        },
      },
      {
        name: "Help in the forge",
        description: "",
        baseTime: 10,
        result: {
          baseStats: { attack: 0.2, defence: 0.2 },
          items: [
            { type: "treasure", name: "Rusty Sword", amount: 1 },
            { type: "treasure", name: "Rusty Armor", amount: 1 },
            { type: "treasure", name: "Rusty Helmet", amount: 1 },
            { type: "treasure", name: "Copper Ring", amount: 1 },
            { type: "treasure", name: "Copper Pendant", amount: 1 },
          ],
        },
      },
    ],
  },
];

type Village = {
  name: string;
  description: string;
  imagePath: string;
  activities?: Array<Activity>;
};

export default Villages;
