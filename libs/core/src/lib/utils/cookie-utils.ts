/**
 * Utility functions for managing secure cookies.
 */

/**
 * Sets a secure cookie with the specified name, value, and options.
 * @param name The cookie name.
 * @param value The cookie value.
 * @param options Cookie options for security.
 * @param options.days The number of days until the cookie expires.
 * @param options.secure Whether to set the Secure flag.
 * @param options.sameSite The SameSite attribute value.
 * @param options.path The cookie path.
 */
export function setSecureCookie(
  name: string,
  value: string,
  options: {
    days?: number
    secure?: boolean
    sameSite?: 'Strict' | 'Lax' | 'None'
    path?: string
  } = {}
): void {
  if (typeof document === 'undefined') return

  const { days = 7, secure = true, sameSite = 'Strict', path = '/' } = options

  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)

  let cookieString = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=${path};SameSite=${sameSite}`

  if (secure && window.location.protocol === 'https:') {
    cookieString += ';Secure'
  }

  document.cookie = cookieString
}

/**
 * Sets a cookie with the specified name, value, and options.
 * @param name The cookie name.
 * @param value The cookie value.
 * @param days The number of days until the cookie expires.
 * @deprecated Use setSecureCookie instead for better security.
 */
export function setCookie(name: string, value: string, days: number = 365): void {
  setSecureCookie(name, value, { days, secure: false, sameSite: 'Lax' })
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
    const c = cookie.trim()
    if (c.startsWith(nameEQ)) {
      return decodeURIComponent(c.substring(nameEQ.length))
    }
  }

  return null
}

/**
 * Parses a JWT token and returns its payload.
 * @param token The JWT token to parse.
 * @returns The decoded payload or null if invalid.
 */
export function parseJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

/**
 * Gets the expiration time from a JWT token.
 * @param token The JWT token.
 * @returns The expiration timestamp in seconds, or null if invalid.
 */
export function getJwtExpiration(token: string): number | null {
  const payload = parseJwtPayload(token)
  const exp = payload?.['exp']
  return typeof exp === 'number' ? exp : null
}

/**
 * Calculates days until expiration from JWT exp timestamp.
 * @param expTimestamp The expiration timestamp in seconds.
 * @returns Days until expiration, minimum 1 day.
 */
export function getDaysUntilExpiration(expTimestamp: number): number {
  const now = Math.floor(Date.now() / 1000)
  const secondsUntilExpiration = expTimestamp - now
  const daysUntilExpiration = Math.ceil(secondsUntilExpiration / (24 * 60 * 60))

  // Minimum 1 day to ensure cookie doesn't expire immediately
  return Math.max(daysUntilExpiration, 1)
}

/**
 * Removes a cookie by setting its expiration to the past.
 * @param name The cookie name to remove.
 * @param path The cookie path (default: '/').
 */
export function removeCookie(name: string, path: string = '/'): void {
  if (typeof document === 'undefined') return

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`
}

/**
 * Parses cookies from a cookie string (e.g., from request headers).
 * @param cookieString The cookie string to parse.
 * @returns An object with cookie names as keys and values as values.
 */
export function parseCookies(cookieString: string): Record<string, string> {
  const cookies: Record<string, string> = {}
  if (!cookieString) return cookies

  const cookiePairs = cookieString.split(';')
  for (const pair of cookiePairs) {
    const [name, ...valueParts] = pair.trim().split('=')
    if (name) {
      cookies[name] = decodeURIComponent(valueParts.join('='))
    }
  }
  return cookies
}

/**
 * Gets a cookie value by name from a cookie string.
 * @param cookieString The cookie string.
 * @param name The cookie name.
 * @returns The cookie value or null if not found.
 */
export function getCookieFromString(cookieString: string, name: string): string | null {
  const cookies = parseCookies(cookieString)
  return cookies[name] || null
}
