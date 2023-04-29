import {
  PlayerContextType,
  PlayerCultivationManual,
  PlayerSkills,
} from "GameConstants/Player";

export function playerTraining(player: PlayerContextType) {
  const cultivationMulti = manualsSkillsMultiplier("training", player.manuals);
  return player.baseSkills.training * cultivationMulti;
}

export function playerSkills(player: PlayerContextType): PlayerSkills {
  const skills = { ...player.skills };
  skills.training = playerTraining(player);
  return skills;
}

export function manualsSkillsMultiplier(
  skill: string,
  manuals: PlayerCultivationManual[] | undefined
) {
  // Calculate manuals multiplier
  let totalPower = 1;
  if (!manuals) return 1;
  manuals.forEach((value) => {
    try {
      if (!value.isEquipped || !value.manual.skills) throw new Error("skip");
      const manualPower =
        (value.manual.skills[skill] || 0) * value.learningProgress.level;
      totalPower += manualPower;
    } catch (error) {
      /* do nothing*/
    }
  });
  return totalPower;
}

type SkillStructure = {
  base: number;

  manuals: number;
};

export function getSkillStructure(
  skill: string,
  player: PlayerContextType
): SkillStructure {
  const { baseSkills, manuals } = player;
  const baseStat = baseSkills[skill];
  const manualsBonus = manualsSkillsMultiplier(skill, manuals);
  return {
    base: baseStat,
    manuals: manualsBonus,
  };
}
