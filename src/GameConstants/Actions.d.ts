import { PlayerBaseStats } from "./Player";

export type Action = {
  name: string;
  description: string;
  result: {
    baseStats?: Partial<PlayerBaseStats>;
    items?: Array<InventoryItem>;
  };
};
