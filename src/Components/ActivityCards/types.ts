import { Activity } from "GameConstants";

export type ActivityCardProps = {
  activity: Activity;
  showTimesCompleted?: boolean;
  isActive: boolean;
  source: string;
};
