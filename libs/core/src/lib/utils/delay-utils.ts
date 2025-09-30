/**
 * Utility functions for delays and timing.
 */

/**
 * Creates a delay for the specified number of milliseconds.
 * @param ms The number of milliseconds to delay.
 * @returns A promise that resolves after the delay.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
