import { PlayerBaseStats } from "./Player";

export type Action = {
  name: string;
  description: string;
  requiredTime?: number; // in seconds
  result: {
    baseStats?: Partial<PlayerBaseStats>;
    items?: Omit<InventoryItem, "id">[];
  };
};
