export default function divisionCoeff(timesCompleted: number) {
  if (timesCompleted <= 10) return 1;
  return 0.233 * (1 + Math.sqrt(timesCompleted));
}
