import Trainings from "GameConstants/Activities/Trainings";
import Mining from "GameConstants/Activities/Mining";
import Crafting from "GameConstants/Activities/Craft";
import { Activity } from "./Activities/Activities";
import {
  CultivationRealm,
  CultivationRealms,
} from "./Cultivation/CultivationRealms";
import Gathering from "./Activities/Gathering";
import { Enemies, EnemyType } from "./Fighting/Enemies";

// Declarations for the game mechanics
// Contains game data. Is stored to localStorage every autosave interval.
export type GameContent = {
  trainings: Activity[]; // List of available activities for training tab
  mining: Activity[]; // List of available activities for mining tab
  crafting: Activity[]; // List of available activities for crafting tab
  gathering: Activity[]; // List of activities for gathering tab
  cultivationRealms: CultivationRealm[]; // Player cultivation realms with all tribulations passed and stat modifiers
  enemies: EnemyType[];
};

export const gameContent: GameContent = {
  trainings: Trainings,
  mining: Mining,
  crafting: Crafting,
  gathering: Gathering,
  cultivationRealms: CultivationRealms,
  enemies: Enemies,
};

export const NavigationBarPages = [
  "Training",
  "Manuals",
  "Breakthrough",
  "Mining",
  "Crafting",
  "Gathering",
  "Fighting",
];
