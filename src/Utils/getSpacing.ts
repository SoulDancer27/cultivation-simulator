/**
 * Added due to mui behavior change on v5
 * The spacing return value was changed from number to string with 'px' at the end
 * @param theme - Mui theme object, typically a result of `useTheme()`
 * @param value - a multiplier to theme.spacing value from the theme object
 * @returns - a number, the pixels value of `theme.spacing() * value`
 */
export default function getSpacing(theme, value) {
  return Number(theme.spacing(value).slice(0, -2));
}
