/**
 * Added due to mui behavior change on v5
 *
 * The `theme.spacing()` return value was changed from number to string with 'px' at the end
 *
 * The function returns the value as a number
 *
 * @param theme - Mui theme object, typically a result of `useTheme()`
 * @param value - a multiplier to theme.spacing value from the theme object
 * @returns - a number, the pixels value of `theme.spacing() * value`
 *
 * @example
 * ```
 * import { Box, useTheme } from "@mui/material"
 *
 * function Component(){
 * const theme = useTheme();
 * return <Box width={60 + getSpacing(theme, 8)}></Box>;
 * }
 *
 * ```
 */
export default function getSpacing(theme, value) {
  return Number(theme.spacing(value).slice(0, -2));
}
