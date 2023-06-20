import quality from "./quality";
import power from "./power";
import CraftTreasure from "./CraftTreasure";
import {
  armorStats,
  helmetStats,
  pendantStats,
  ringStats,
  swordStats,
} from "./CraftingFunctions";

const CraftingFunctions = {
  Sword: CraftTreasure(swordStats),
  Armor: CraftTreasure(armorStats),
  Helmet: CraftTreasure(helmetStats),
  Ring: CraftTreasure(ringStats),
  Pendant: CraftTreasure(pendantStats),
};

export default CraftingFunctions;

export { quality, power };
