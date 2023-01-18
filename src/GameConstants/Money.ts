const Money: MoneyType[] = [
  {
    name: "Copper Coin",
    description: "The most common currency of the Mortal World",
    imagePath: "money/coins.png",
    x: 0,
    y: 36,
    size: 36,
  },
];

type MoneyType = {
  name: string;
  description: string;
  imagePath: string;
  // coordinates of the top left corner
  x: number;
  y: number;
  size: number;
};

export default Money;
