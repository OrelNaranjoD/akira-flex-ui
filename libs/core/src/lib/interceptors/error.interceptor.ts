import { inject } from '@angular/core'
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http'
import { catchError, throwError } from 'rxjs'
import { isPlatformBrowser } from '@angular/common'
import { PLATFORM_ID } from '@angular/core'

/**
 * HTTP interceptor function for handling application errors and logging warnings.
 * @param req The outgoing HTTP request.
 * @param next The next interceptor in the chain.
 * @returns Observable of HTTP events.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      handleError(error, platformId)
      return throwError(() => error)
    })
  )
}

/**
 * Handles different types of errors and logs appropriate warnings.
 * @param error The HTTP error response.
 * @param platformId The platform ID to check if running in browser.
 */
function handleError(error: HttpErrorResponse, platformId: object): void {
  // Only log in browser environment
  if (!isPlatformBrowser(platformId)) return

  if (error.error instanceof ErrorEvent) {
    // Client-side error
    console.warn('Client-side error:', error.error.message)
  } else {
    // Server-side error
    handleServerError(error)
  }
}

/**
 * Handles server-side HTTP errors with appropriate warnings.
 * @param error The HTTP error response from server.
 */
function handleServerError(error: HttpErrorResponse): void {
  const { status, statusText, url } = error

  switch (status) {
    case 400:
      console.warn(`Bad Request (400) - ${url}:`, error.error?.message || statusText)
      break
    case 401:
      console.warn(`Unauthorized (401) - ${url}: Session expired or invalid credentials`)
      break
    case 403:
      console.warn(`Forbidden (403) - ${url}: Insufficient permissions`)
      break
    case 404:
      console.warn(`Not Found (404) - ${url}: Resource not found`)
      break
    case 422:
      console.warn(
        `Unprocessable Entity (422) - ${url}:`,
        error.error?.message || 'Validation error'
      )
      break
    case 500:
      console.warn(`Internal Server Error (500) - ${url}: Server error occurred`)
      break
    default:
      if (status >= 500) {
        console.warn(`Server Error (${status}) - ${url}:`, statusText)
      } else if (status >= 400) {
        console.warn(`Client Error (${status}) - ${url}:`, error.error?.message || statusText)
      }
  }
}
