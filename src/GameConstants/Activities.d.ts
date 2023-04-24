import { PlayerBaseStats } from "./Player";

export type Action = {
  name: string;
  description: string;
  time: number; // in seconds
  price?: {
    items?: Omit<InventoryItem, "id">[];
  };
  result: {
    baseStats?: Partial<PlayerBaseStats>;
    items?: Omit<InventoryItem, "id">[];
  };
};
