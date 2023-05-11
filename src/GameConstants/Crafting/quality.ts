export default function quality(realm: number, crafting: number) {
  return (
    baseQuality * (1 + crafting) * 1.2 ** realm * (1 + Math.random() * 0.05)
  );
}

const baseQuality = 10;
