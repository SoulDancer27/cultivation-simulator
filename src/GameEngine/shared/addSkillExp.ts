import { PlayerSkills } from "GameConstants/Player";

// Function to increment player skill exp
export default function addSkillsExp(
  skills: PlayerSkills,
  reward: Partial<PlayerSkills>,
  times: number
): PlayerSkills {
  for (const [key, value] of Object.entries(reward)) {
    try {
      skills[key] += value * times;
    } catch (error) {
      console.log(`addSkillExp: ${error}`);
    }
  }
  return skills;
}
