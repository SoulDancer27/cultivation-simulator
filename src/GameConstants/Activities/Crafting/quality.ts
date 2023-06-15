// An example function
export default function quality(
  realm: number,
  crafting: number,
  priceMulti?: number
) {
  const realmFactor = (realm + 1) / 10;

  return (
    baseQuality *
    ((1 + crafting * 10) / 8 ** realmFactor) * // Crafting impact
    (1 + 0.1 * (Math.sqrt(priceMulti || 1) - 1)) // Raw materials impact
  );
}

const baseQuality = 10;
