/**
 * Creates a cookie which expires after a certain amount of days.
 * @param name - name for the cookie
 * @param value - value for the cookie
 * @param days - expires after certain amount of days
 */
export function createCookie(name: string, value: string, days: number): void {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  // Creates cookie
  document.cookie = name + "=" + value + expires + "; path=/";
}

/**
 * Gets specified cookie value or returns empty string if cookie doesn't exist.
 * @param cookieName - name of the cookie
 */
export function accessCookie(cookieName: string): string {
  const name: string = cookieName + "=";
  const allCookieArray = document.cookie.split(";");
  for (let i = 0; i < allCookieArray.length; i++) {
    const temp = allCookieArray[i].trim();
    if (temp.indexOf(name) === 0)
      return temp.substring(name.length, temp.length);
  }
  return "";
}
