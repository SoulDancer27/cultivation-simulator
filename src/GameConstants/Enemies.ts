export type EnemyType = {
  name: string;
  health: number;
  healthRegen: number;
  defence: number;
  attack: number;
};

// Total placeholder content
export const Enemies: EnemyType[] = [
  {
    name: "Random Nobody",
    health: 10,
    healthRegen: 0,
    defence: 0,
    attack: 1,
  },
  {
    name: "Street Thug",
    health: 20,
    healthRegen: 0,
    defence: 0,
    attack: 2,
  },
  {
    name: "Obscure Master",
    health: 50,
    healthRegen: 1,
    defence: 20,
    attack: 4,
  },
];
