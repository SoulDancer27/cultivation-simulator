// Added due to mui behavior change on v5
// The spacing return value was changed from number to string with 'px' at the end
export default function getSpacing(theme, value) {
  return Number(theme.spacing(value).slice(0, -2));
}
