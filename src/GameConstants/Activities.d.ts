import { PlayerBaseStats } from "./Player";

export type Activity = {
  name: string;
  description?: string;
  time: number; // in seconds
  currentTime?: number;
  price?: {
    items?: Omit<InventoryItem, "id">[];
  };
  result: {
    baseStats?: Partial<PlayerBaseStats>;
    items?: Omit<InventoryItem, "id">[];
  };
};
