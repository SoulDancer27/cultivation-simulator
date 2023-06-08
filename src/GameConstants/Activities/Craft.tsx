import { Activity } from "./Activities";
import { day } from "../Constants";

// Some example items for now
let Crafting: Activity[] = [
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
          name: "Rusty Sword",
          amount: 1,
          type: "treasure",
          generator: "Rusty Sword",
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
