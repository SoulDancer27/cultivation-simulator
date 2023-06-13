import { Activity } from "./Activities";
import { day } from "../Constants";

// Some example items for now
let Crafting: Activity[] = [
  {
    name: "Copper Sword",
    baseTime: 30 * day,

    price: {
      items: [
        {
          name: "Copper",
          amount: 3,
          type: "mineral",
        },
        {
          name: "Iron",
          amount: 1,
          type: "mineral",
        },
      ],
    },
    result: {
      skills: { crafting: 0.1 },
      items: [
        {
          name: "Copper Sword",
          amount: 1,
          type: "treasure",
          generator: "Sword",
        },
      ],
    },
  },
  {
    name: "Iron Sword",
    baseTime: 30 * day,

    price: {
      items: [
        {
          name: "Iron",
          amount: 3,
          type: "mineral",
        },
        {
          name: "Steel",
          amount: 1,
          type: "mineral",
        },
      ],
    },
    result: {
      skills: { crafting: 0.1 },
      items: [
        {
          name: "Iron Sword",
          amount: 1,
          type: "treasure",
          generator: "Sword",
        },
      ],
    },
  },
  {
    name: "Steel Sword",
    baseTime: 30 * day,

    price: {
      items: [
        {
          name: "Steel",
          amount: 5,
          type: "mineral",
        },
        {
          name: "Iron",
          amount: 3,
          type: "mineral",
        },
      ],
    },
    result: {
      skills: { crafting: 0.1 },
      items: [
        {
          name: "Steel Sword",
          amount: 1,
          type: "treasure",
          generator: "Sword",
        },
      ],
    },
  },
];

Crafting = Crafting.map((item) => {
  if (item.result.skills && !item.result.skillsMulti)
    item.result.skillsMulti = "crafting skill reward";
  return item;
});

export default Crafting;
