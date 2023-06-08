import { Activity } from "GameConstants/Activities";

export type ActivityCardProps = {
  activity: Activity;
  showTimesCompleted?: boolean;
  isActive: boolean;
  source: string;
};
