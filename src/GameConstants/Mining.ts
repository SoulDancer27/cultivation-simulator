import { Activity } from "./Activities";
import { day, month } from "./Constants";
import { PlayerContextType } from "./Player";

let Mining: Activity[] = [
  {
    name: "Copper",
    baseTime: 5 * day,
    result: {
      skills: {
        mining: 0.01,
      },
      items: [{ type: "mineral", name: "Copper", amount: 1 }],
    },
  },
  {
    name: "Iron",
    baseTime: month,
    result: {
      skills: {
        mining: 0.03,
      },
      items: [{ type: "mineral", name: "Iron", amount: 1 }],
    },
  },
  {
    name: "Steel",
    baseTime: 6 * month,
    result: {
      skills: {
        mining: 0.1,
      },
      items: [{ type: "mineral", name: "Steel", amount: 1 }],
    },
  },
];

Mining = Mining.map((item) => {
  if (!item.time)
    item.time = function (player: PlayerContextType) {
      const { skills } = player;
      const multi = 1 + skills.mining;
      return this.baseTime / multi;
    };
  if (item.result.baseStats && !item.baseStatsMulti)
    item.baseStatsMulti = function (): number {
      return 1 / divisionCoeff(this.timesCompleted || 0);
    };
  if (item.result.skills && !item.skillsMulti)
    item.skillsMulti = function (): number {
      return 1 / divisionCoeff(this.timesCompleted || 0);
    };
  return item;
});

function divisionCoeff(timesCompleted: number) {
  if (timesCompleted <= 10) return 1;
  return 0.233 * (1 + Math.sqrt(timesCompleted));
}

export default Mining;
