import { TreasureStats } from "GameConstants/Items/Treasures";

export function swordStats(power: number): TreasureStats {
  return {
    stats: {
      attack: power,
    },
    statsMulti: {
      attack: Math.sqrt(power) / 100,
    },
  };
}

export function armorStats(power: number): TreasureStats {
  return {
    stats: {
      health: power * 5,
    },
    statsMulti: {
      health: Math.sqrt(power) / 200,
    },
  };
}

export function helmetStats(power: number): TreasureStats {
  return {
    stats: {
      health: power,
      defence: Math.sqrt(power),
    },
    statsMulti: {
      health: Math.sqrt(power) / 200,
      defence: Math.sqrt(power) / 1000,
    },
  };
}

export function pendantStats(power: number): TreasureStats {
  return {
    stats: {
      health: power,
      healthRegen: power / 30,
    },
    statsMulti: {
      health: Math.sqrt(power) / 200,
      healthRegen: Math.sqrt(power) / 100,
    },
  };
}

export function ringStats(power: number): TreasureStats {
  return {
    stats: {
      attack: power / 2,
    },
    statsMulti: {
      attack: Math.sqrt(power) / 200,
    },
    skillsMulti: {
      training: Math.sqrt(power) / 200,
    },
  };
}
