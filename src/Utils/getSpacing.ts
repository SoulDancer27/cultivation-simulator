// Added due to mui behavior change on v5
export default function getSpacing(theme, value) {
  return Number(theme.spacing(value).slice(0, -2));
}
