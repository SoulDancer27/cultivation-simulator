import { PlayerBaseStats } from "./Player";

export type Activity = {
  name: string;
  description?: string;
  time: number; // in seconds
  currentTime?: number;
  price?: {
    baseStats?: Partial<PlayerBaseStats>;
    items?: ActivityItem[];
  };
  result: {
    baseStats?: Partial<PlayerBaseStats>;
    items?: ActivityItem[];
  };
};

type TreasureReward = {
  type: "treasure";
  name: string;
  amount: number;
};

type ActivityItem = Omit<InventoryMoney, "id"> | TreasureReward;
