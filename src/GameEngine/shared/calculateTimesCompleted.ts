import { Activity } from "GameConstants/Activities";
import calculateMaxActions from "./calculateMaxActions";
import { PlayerContextType } from "GameConstants/Interfaces";
import ActivitiesFunctions from "GameConstants/ActivitiesFunctions";

// Calculate how many times activity can be completed considering activity price
export default function calculateTimesCompleted(
  elapsedTime: number,
  activity: Activity,
  player: PlayerContextType
): { timesCompleted: number; currentTime: number } {
  let currentTime = activity.currentTime || 0;
  currentTime += elapsedTime;
  // Calculate overflow
  const requiredTime = activity.time
    ? ActivitiesFunctions[activity.time](activity, player)
    : activity.baseTime;
  let timesCompleted = Math.floor(currentTime / requiredTime);
  currentTime = currentTime - timesCompleted * requiredTime;
  // Limit if activity has a set price
  const maxActions = calculateMaxActions(player, activity);
  if (maxActions <= timesCompleted) currentTime = 0; // reset to the end of the last completed activity
  timesCompleted = Math.min(timesCompleted, maxActions);
  return { timesCompleted, currentTime };
}
