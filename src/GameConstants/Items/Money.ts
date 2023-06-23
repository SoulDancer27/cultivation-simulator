import { Image } from "../Interfaces";
// Placeholder content
const Money: MoneyType[] = [
  {
    name: "Copper Coin",
    description: "The most common currency of the Mortal World",
    image: {
      path: "./money/coins.png",
      x: 0,
      y: 36,
      sizeX: 36,
      sizeY: 36,
    },
  },
  {
    name: "Silver Coin",
    description: "Currency for slighter wealthier mortals",
    image: {
      path: "./money/coins.png",
      x: 0,
      y: 72,
      sizeX: 36,
      sizeY: 36,
    },
  },
  {
    name: "Golden Coin",
    description: "The eternal store of value, at least for mortals",
    image: {
      path: "./money/coins.png",
      x: 0,
      y: 0,
      sizeX: 36,
      sizeY: 36,
    },
  },
];

export type MoneyType = {
  name: string;
  description: string;
  image: Image;
};

export default Money;
