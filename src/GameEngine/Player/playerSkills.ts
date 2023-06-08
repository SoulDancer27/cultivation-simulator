import { isInventoryTreasure } from "GameConstants";
import {
  InventoryItem,
  PlayerContextType,
  PlayerCultivationManual,
} from "GameConstants/Interfaces";
import { PlayerSkills } from "GameConstants/Player";

// Functions that calculate total player skills values based on inGame variables
export function calculateSkill(skill: string, player: PlayerContextType) {
  const cultivationMulti = manualsSkillsMultiplier(skill, player.manuals);
  const treasuresMulti = treasuresSkillsMultiplier(skill, player.inventory);
  const treasuresPower = treasuresBonus(skill, player.inventory);
  return (
    player.baseSkills[skill] * cultivationMulti * treasuresMulti +
    treasuresPower
  );
}

// Returns all of the player stats
export function playerSkills(player: PlayerContextType): PlayerSkills {
  let currentSkills = { ...player.baseSkills };
  for (const [key] of Object.entries(player.baseSkills)) {
    currentSkills[key] = calculateSkill(key, player);
  }

  let skills = { ...player.skills, ...currentSkills };
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

// Treasures provide multiplier and flat bonus
export function treasuresSkillsMultiplier(
  skill: string,
  treasures: InventoryItem[] | undefined
) {
  let totalMulti = 1;
  if (!treasures) return 0;
  treasures.forEach((item) => {
    if (isInventoryTreasure(item) && item.isEquipped) {
      const skillsMulti = item.item.stats.skillsMulti;
      const itemMulti = (skillsMulti && skillsMulti[skill]) || 1;
      totalMulti *= 1 + itemMulti;
    }
  });
  return totalMulti;
}

export function treasuresBonus(
  skill: string,
  treasures: InventoryItem[] | undefined
) {
  let totalBonus = 0;
  if (!treasures) return 0;
  treasures.forEach((item) => {
    if (isInventoryTreasure(item) && item.isEquipped) {
      const skills = item.item.stats.skills;
      const itemBonus = (skills && skills[skill]) || 0;
      totalBonus += itemBonus;
    }
  });
  return totalBonus;
}

type SkillStructure = {
  base: number;
  manuals: number;
  treasuresMulti: number;
  treasures: number;
};

export function getSkillStructure(
  skill: string,
  player: PlayerContextType
): SkillStructure {
  const { baseSkills, manuals, inventory } = player;
  const baseStat = baseSkills[skill];
  const manualsBonus = manualsSkillsMultiplier(skill, manuals);
  const treasuresMulti = treasuresSkillsMultiplier(skill, inventory);
  const treasuresPower = treasuresBonus(skill, inventory);
  return {
    base: baseStat,
    manuals: manualsBonus,
    treasuresMulti,
    treasures: treasuresPower,
  };
}
