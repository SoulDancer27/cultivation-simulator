import CraftSword from "./CraftSword";
import CraftArmor from "./CraftArmor";
import quality from "./quality";
import CraftHelmet from "./CraftHelmet";
import CraftRing from "./CraftRing";
import CraftPendant from "./CraftPendant";

const CraftingFunctions = {
  Sword: CraftSword,
  Armor: CraftArmor,
  Helmet: CraftHelmet,
  Ring: CraftRing,
  Pendant: CraftPendant,
};

export default CraftingFunctions;

export { quality };
