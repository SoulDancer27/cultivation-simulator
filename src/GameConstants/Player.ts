/* _____________________________________________________________________
If you want to add new player stats and skills change 
type declarations and default values here
  _____________________________________________________________________*/

export type PlayerBaseStats = {
  health: number;
  attack: number;
  healthRegen: number;
  defence: number;
  insight: number; // multiplier for cultivation manuals experience gain
};

export type PlayerCurrentStats = {
  health: number;
};

export type PlayerSkills = {
  training: number;
  mining: number;
  crafting: number;
};

export const baseStats: PlayerBaseStats = {
  attack: 1,
  health: 10,
  healthRegen: 0.5,
  defence: 0,
  insight: 1,
};

export const currentStats: PlayerCurrentStats = {
  health: 10,
};

export const playerSkills: PlayerSkills = {
  training: 0,
  mining: 0,
  crafting: 0,
};

// You can add player equipment types here
// They are dumb though so multiple slots for single weapon type are currently not possible
export const PlayerEquipment = ["weapon", "armor", "helmet", "ring", "pendant"];
