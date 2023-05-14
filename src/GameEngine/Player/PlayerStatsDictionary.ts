// Transforms variable names to text displayed on screen
// Pretty useless thing actually and should be moved to the frontend implementation
const PlayerStatsDictionary = {
  age: "Age",
  health: "Hp",
  healthRegen: "Hp.regen",
  attack: "Atk",
  defence: "Def",
  training: "training",
  mining: "mining",
  crafting: "crafting",
};

export function getStatName(name: string) {
  return PlayerStatsDictionary[name] || name;
}

export default PlayerStatsDictionary;
