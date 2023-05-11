import divisionCoeff from "GameEngine/shared/divisionCoeff";
import { Activity } from "./Activities";
import { day } from "./Constants";
import CraftSword from "./Crafting/CraftSword";
import { PlayerContextType } from "./Player";

let Crafting: Activity[] = [
  {
    name: "Craft Coins",
    baseTime: 10 * day,
    time: function (player: PlayerContextType) {
      const { skills } = player;
      const multi = 1 + skills.crafting;
      return this.baseTime / multi;
    },
    price: {
      items: [
        {
          name: "Copper",
          amount: 1,
          type: "mineral",
        },
      ],
    },
    result: {
      skills: { crafting: 0.01 },
      items: [{ name: "Copper Coin", amount: 1, type: "money" }],
    },
  },
  {
    name: "Iron Sword",
    baseTime: 30 * day,
    generators: { "Rusty Sword": CraftSword },
    price: {
      items: [
        {
          name: "Iron",
          amount: 3,
          type: "mineral",
        },
      ],
    },
    result: {
      skills: { crafting: 0.1 },
      items: [{ name: "Rusty Sword", amount: 1, type: "treasure" }],
    },
  },
];

Crafting = Crafting.map((item) => {
  if (item.result.skills && !item.skillsMulti)
    item.skillsMulti = function (): number {
      return 1 / divisionCoeff(this.timesCompleted || 0);
    };
  return item;
});

export default Crafting;
