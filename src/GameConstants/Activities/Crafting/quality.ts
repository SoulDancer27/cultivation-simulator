// An example function
export default function quality(
  realm: number,
  crafting: number,
  priceMulti?: number
) {
  return (
    baseQuality *
    (1 + crafting) * // Crafting impact
    1.2 ** realm * // Item realm
    (1 + 0.1 * (Math.sqrt(priceMulti || 1) - 1)) * // Raw materials impact
    (1 + Math.random() * 0.05) // Random part
  );
}

const baseQuality = 10;
