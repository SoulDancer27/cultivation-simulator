import { Activity } from "./Activities";
import { day } from "./Constants";

// Some example items for now
let Alchemy: Activity[] = [
  {
    name: "Create health potion",
    baseTime: 30 * day,

    price: {
      items: [
        {
          name: "Grass Stalk",
          amount: 3,
          type: "herb",
        },
        {
          name: "Oak Leaf",
          amount: 1,
          type: "herb",
        },
      ],
    },
    result: {
      skills: { crafting: 0.1 },
      items: [
        {
          name: "Health Potion",
          amount: 1,
          type: "potion",
        },
      ],
    },
  },
];

Alchemy = Alchemy.map((item) => {
  if (item.result.skills && !item.result.skillsMulti)
    item.result.skillsMulti = "crafting skill reward";
  return item;
});

export default Alchemy;
