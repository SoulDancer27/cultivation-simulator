import { Activity } from "./Activities";
import { day } from "../Constants";

// Some example items for now
let Crafting: Activity[] = [
  {
    name: "Copper Sword",
    baseTime: 30 * day,
    description: "boosts attack",
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
      skillsMulti: "crafting skill reward",
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
    name: "Copper Armor",
    baseTime: 30 * day,
    description: "boosts health",
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
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Copper Armor",
          amount: 1,
          type: "treasure",
          generator: "Armor",
        },
      ],
    },
  },
  {
    name: "Copper Helmet",
    baseTime: 30 * day,
    description: "boosts health and defence",
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
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Copper Helmet",
          amount: 1,
          type: "treasure",
          generator: "Helmet",
        },
      ],
    },
  },
  {
    name: "Copper Pendant",
    baseTime: 30 * day,
    description: "boosts health and regen",
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
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Copper Pendant",
          amount: 1,
          type: "treasure",
          generator: "Pendant",
        },
      ],
    },
  },
  {
    name: "Copper Ring",
    baseTime: 30 * day,
    description: "boosts attack and training",
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
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Copper Ring",
          amount: 1,
          type: "treasure",
          generator: "Ring",
        },
      ],
    },
  },
  {
    name: "Iron Sword",
    baseTime: 30 * day,
    description: "boosts attack",
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
      skillsMulti: "crafting skill reward",
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
    name: "Iron Armor",
    baseTime: 30 * day,
    description: "boosts health",
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
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Iron Armor",
          amount: 1,
          type: "treasure",
          generator: "Armor",
        },
      ],
    },
  },
  {
    name: "Iron Helmet",
    baseTime: 30 * day,
    description: "boosts health and defence",
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
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Iron Helmet",
          amount: 1,
          type: "treasure",
          generator: "Helmet",
        },
      ],
    },
  },
  {
    name: "Iron Pendant",
    baseTime: 30 * day,
    description: "boosts health and regen",
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
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Iron Pendant",
          amount: 1,
          type: "treasure",
          generator: "Pendant",
        },
      ],
    },
  },
  {
    name: "Iron Ring",
    baseTime: 30 * day,
    description: "boosts attack and training",
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
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Iron Ring",
          amount: 1,
          type: "treasure",
          generator: "Ring",
        },
      ],
    },
  },
  {
    name: "Steel Sword",
    baseTime: 30 * day,
    description: "boosts attack",
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
      skillsMulti: "crafting skill reward",
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
  {
    name: "Steel Armor",
    baseTime: 30 * day,
    description: "boosts health",
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
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Steel Armor",
          amount: 1,
          type: "treasure",
          generator: "Armor",
        },
      ],
    },
  },
  {
    name: "Steel Helmet",
    baseTime: 30 * day,
    description: "boosts health and defence",
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
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Steel Helmet",
          amount: 1,
          type: "treasure",
          generator: "Helmet",
        },
      ],
    },
  },
  {
    name: "Steel Pendant",
    baseTime: 30 * day,
    description: "boosts health and regen",
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
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Steel Pendant",
          amount: 1,
          type: "treasure",
          generator: "Pendant",
        },
      ],
    },
  },
  {
    name: "Steel Ring",
    baseTime: 30 * day,
    description: "boosts attack and training",
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
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Steel Ring",
          amount: 1,
          type: "treasure",
          generator: "Ring",
        },
      ],
    },
  },
  {
    name: "Cold Steel Sword",
    baseTime: 30 * day,
    description: "boosts attack",
    price: {
      items: [
        {
          name: "Cold Steel",
          amount: 3,
          type: "mineral",
        },
      ],
    },
    result: {
      skills: { crafting: 0.1 },
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Cold Steel Sword",
          amount: 1,
          type: "treasure",
          generator: "Sword",
        },
      ],
    },
  },
  {
    name: "Cold Steel Armor",
    baseTime: 30 * day,
    description: "boosts health",
    price: {
      items: [
        {
          name: "Cold Steel",
          amount: 3,
          type: "mineral",
        },
      ],
    },
    result: {
      skills: { crafting: 0.1 },
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Cold Steel Armor",
          amount: 1,
          type: "treasure",
          generator: "Armor",
        },
      ],
    },
  },
  {
    name: "Cold Steel Helmet",
    baseTime: 30 * day,
    description: "boosts health and defence",
    price: {
      items: [
        {
          name: "Cold Steel",
          amount: 3,
          type: "mineral",
        },
      ],
    },
    result: {
      skills: { crafting: 0.1 },
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Cold Steel Helmet",
          amount: 1,
          type: "treasure",
          generator: "Helmet",
        },
      ],
    },
  },
  {
    name: "Cold Steel Pendant",
    baseTime: 30 * day,
    description: "boosts health and regen",
    price: {
      items: [
        {
          name: "Cold Steel",
          amount: 3,
          type: "mineral",
        },
      ],
    },
    result: {
      skills: { crafting: 0.1 },
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Cold Steel Pendant",
          amount: 1,
          type: "treasure",
          generator: "Pendant",
        },
      ],
    },
  },
  {
    name: "Cold Steel Ring",
    baseTime: 30 * day,
    description: "boosts attack and training",
    price: {
      items: [
        {
          name: "Cold Steel",
          amount: 3,
          type: "mineral",
        },
      ],
    },
    result: {
      skills: { crafting: 0.1 },
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Cold Steel Ring",
          amount: 1,
          type: "treasure",
          generator: "Ring",
        },
      ],
    },
  },
  {
    name: "Golden Sword",
    baseTime: 30 * day,
    description: "boosts attack",
    price: {
      items: [
        {
          name: "Celestial Gold",
          amount: 3,
          type: "mineral",
        },
      ],
    },
    result: {
      skills: { crafting: 0.1 },
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Golden Sword",
          amount: 1,
          type: "treasure",
          generator: "Sword",
        },
      ],
    },
  },
  {
    name: "Golden Armor",
    baseTime: 30 * day,
    description: "boosts health",
    price: {
      items: [
        {
          name: "Celestial Gold",
          amount: 3,
          type: "mineral",
        },
      ],
    },
    result: {
      skills: { crafting: 0.1 },
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Golden Armor",
          amount: 1,
          type: "treasure",
          generator: "Armor",
        },
      ],
    },
  },
  {
    name: "Golden Helmet",
    baseTime: 30 * day,
    description: "boosts health and defence",
    price: {
      items: [
        {
          name: "Celestial Gold",
          amount: 3,
          type: "mineral",
        },
      ],
    },
    result: {
      skills: { crafting: 0.1 },
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Golden Helmet",
          amount: 1,
          type: "treasure",
          generator: "Helmet",
        },
      ],
    },
  },
  {
    name: "Golden Pendant",
    baseTime: 30 * day,
    description: "boosts health and regen",
    price: {
      items: [
        {
          name: "Celestial Gold",
          amount: 3,
          type: "mineral",
        },
      ],
    },
    result: {
      skills: { crafting: 0.1 },
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Golden Pendant",
          amount: 1,
          type: "treasure",
          generator: "Pendant",
        },
      ],
    },
  },
  {
    name: "Golden Ring",
    baseTime: 30 * day,
    description: "boosts attack and training",
    price: {
      items: [
        {
          name: "Celestial Gold",
          amount: 3,
          type: "mineral",
        },
      ],
    },
    result: {
      skills: { crafting: 0.1 },
      skillsMulti: "crafting skill reward",
      items: [
        {
          name: "Golden Ring",
          amount: 1,
          type: "treasure",
          generator: "Ring",
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
