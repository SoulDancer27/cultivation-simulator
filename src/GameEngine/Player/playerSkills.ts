import {
  PlayerContextType,
  PlayerCultivationManual,
  PlayerSkills,
} from "GameConstants/Player";

// Functions that calculate total player skills values based on inGame variables
export function playerTraining(player: PlayerContextType) {
  const cultivationMulti = manualsSkillsMultiplier("training", player.manuals);
  return player.baseSkills.training * cultivationMulti;
}

export function playerMining(player: PlayerContextType) {
  const cultivationMulti = manualsSkillsMultiplier("mining", player.manuals);
  return player.baseSkills.mining * cultivationMulti;
}

export function playerCrafting(player: PlayerContextType) {
  const cultivationMulti = manualsSkillsMultiplier("crafting", player.manuals);
  return player.baseSkills.crafting * cultivationMulti;
}

export function playerSkills(player: PlayerContextType): PlayerSkills {
  const skills = { ...player.skills };
  skills.training = playerTraining(player);
  skills.mining = playerMining(player);
  skills.crafting = playerCrafting(player);
  return skills;
}

// Calculates effect on player skills from manuals
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
