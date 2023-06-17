// An example function
export default function quality(
  realm: number,
  crafting: number,
  priceMulti?: number
) {
  const realmFactor = (realm + 1) / 10;
  const divider = 1 - Math.exp((-1 - crafting) / (10 * 8 ** realmFactor));
  return (
    baseQuality *
    (1 + 10 * crafting) *
    divider * // Crafting impact
    (1 + 0.1 * (Math.sqrt(priceMulti || 1) - 1)) // Raw materials impact
  );
}

const baseQuality = 10;
