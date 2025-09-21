/**
 * Utility functions for managing cookies.
 */

/**
 * Sets a cookie with the specified name, value, and options.
 * @param name The cookie name.
 * @param value The cookie value.
 * @param days The number of days until the cookie expires.
 */
export function setCookie(name: string, value: string, days: number = 365): void {
  if (typeof document === 'undefined') return

  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)

  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

/**
 * Gets a cookie value by name.
 * @param name The cookie name.
 * @returns The cookie value or null if not found.
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null

  const nameEQ = name + '='
  const ca = document.cookie.split(';')

  for (const cookie of ca) {
    let c = cookie
    while (c.startsWith(' ')) c = c.substring(1)
    if (c.startsWith(nameEQ)) return c.substring(nameEQ.length)
  }

  return null
}

/**
 * Removes a cookie by setting its expiration date to the past.
 * @param name The cookie name.
 */
export function removeCookie(name: string): void {
  if (typeof document === 'undefined') return

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}
