export default function power(quality: number, realm: number) {
  const realmFactor = (realm + 1) / 10;
  return quality * 6 ** realmFactor;
}
