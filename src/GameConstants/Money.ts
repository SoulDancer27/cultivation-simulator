import { Image } from "./Interfaces";
// Placeholder content
const Money: MoneyType[] = [
  {
    name: "Copper Coin",
    description: "The most common currency of the Mortal World",
    image: {
      path: "money/coins.png",
      x: 0,
      y: 36,
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
