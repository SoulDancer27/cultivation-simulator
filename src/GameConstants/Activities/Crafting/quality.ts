// An example function
export default function quality(
  realm: number,
  crafting: number,
  priceMulti?: number
) {
  const realmFactor = (realm + 1) / 10;
  const divider = expDivider((1 + crafting) / (10 * 8 ** realmFactor));
  return (
    baseQuality *
    (1 + 10 * crafting) * // Crafting impact
    divider * // Realm Impact
    (1 + 0.1 * (Math.sqrt(priceMulti || 1) - 1)) // Raw materials impact
  );
}

export function expDivider(x) {
  return 1 - Math.exp(-x);
}

const baseQuality = 10;
