// Placeholder content
export const Minerals: Material[] = [
  {
    name: "Copper",
    description: "A good for nothing material",
    image: {
      path: "/minerals/icon48.png",
      x: 0,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
  },
  {
    name: "Iron",
    description: "The basic crafting necessity",
    image: {
      path: "/minerals/icon47.png",
      x: 0,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
  },
  {
    name: "Steel",
    description: "The best material",
    image: {
      path: "/minerals/icon2.png",
      x: 0,
      y: 0,
      sizeX: 32,
      sizeY: 32,
    },
  },
];

export type Material = {
  name: string;
  description: string;
  image: {
    path: string;
    x: number;
    y: number;
    sizeX: number;
    sizeY: number;
  };
};
